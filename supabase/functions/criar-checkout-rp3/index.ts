import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'npm:zod@3';

const ASAAS_ENV = Deno.env.get('ASAAS_ENV') ?? 'sandbox';
const ASAAS_API_KEY =
  ASAAS_ENV === 'production'
    ? Deno.env.get('ASAAS_API_KEY_CHORDATA_PROD')
    : Deno.env.get('ASAAS_API_KEY_CHORDATA_SANDBOX');

const ASAAS_BASE =
  ASAAS_ENV === 'production'
    ? 'https://api.asaas.com/v3'
    : 'https://sandbox.asaas.com/api/v3';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

const onlyDigits = (s: string) => (s ?? '').replace(/\D/g, '');

const Schema = z.object({
  nome: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  cpf: z.string().transform(onlyDigits).refine((v) => v.length === 11 || v.length === 14, 'CPF/CNPJ inválido'),
  telefone: z.string().transform(onlyDigits).refine((v) => v.length >= 10 && v.length <= 13, 'Telefone inválido'),
  parcelas: z.number().int().min(1).max(6).default(1),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

const VALOR_TOTAL = 2300; // BRL

async function asaas(path: string, init: RequestInit = {}) {
  const res = await fetch(`${ASAAS_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      access_token: ASAAS_API_KEY!,
      'User-Agent': 'ChordataMentoriaRP3/1.0',
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let json: any = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* keep text */ }
  if (!res.ok) {
    console.error('Asaas error', res.status, text);
    throw new Error(json?.errors?.[0]?.description ?? `Asaas ${res.status}: ${text.slice(0, 240)}`);
  }
  return json;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    if (!ASAAS_API_KEY) {
      return new Response(
        JSON.stringify({ error: `ASAAS_API_KEY_CHORDATA_${ASAAS_ENV === 'production' ? 'PROD' : 'SANDBOX'} não configurada` }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: 'Dados inválidos', details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const { nome, email, cpf, telefone, parcelas, successUrl, cancelUrl } = parsed.data;

    // 1. Insere inscrição pendente (gera id usado como externalReference)
    const { data: inscricao, error: insErr } = await supabase
      .from('inscricoes_rp3')
      .insert({
        nome, email, cpf, telefone,
        valor: VALOR_TOTAL,
        parcelas,
        status: 'PENDING',
        ambiente: ASAAS_ENV,
      })
      .select()
      .single();
    if (insErr) throw new Error(`DB insert: ${insErr.message}`);

    // 2. Cria Checkout Session no Asaas
    const checkoutPayload: Record<string, unknown> = {
      billingTypes: ['PIX', 'CREDIT_CARD', 'BOLETO'],
      chargeTypes: parcelas > 1 ? ['DETACHED', 'INSTALLMENT'] : ['DETACHED'],
      minutesToExpire: 1440,
      callback: {
        successUrl: `${successUrl}?insc=${inscricao.id}`,
        cancelUrl,
        expiredUrl: cancelUrl,
      },
      items: [
        {
          name: 'Mentoria RP3 — Gestão Clínica e Hospitalar Veterinária',
          description: 'Turma Junho 2026 · Chordata Consultoria',
          quantity: 1,
          value: VALOR_TOTAL,
        },
      ],
      customerData: {
        name: nome,
        email,
        cpfCnpj: cpf,
        phone: telefone,
      },
      externalReference: inscricao.id,
    };

    if (parcelas > 1) {
      (checkoutPayload as any).installment = { maxInstallmentCount: parcelas };
    }

    const checkout = await asaas('/checkoutSession', {
      method: 'POST',
      body: JSON.stringify(checkoutPayload),
    });

    const checkoutId = checkout?.id;
    if (!checkoutId) {
      console.error('Resposta Asaas sem id:', checkout);
      throw new Error('Asaas não retornou o checkout');
    }

    const baseUrl = ASAAS_ENV === 'production' ? 'https://asaas.com' : 'https://sandbox.asaas.com';
    const checkoutUrl = `${baseUrl}/checkoutSession/show?id=${checkoutId}`;

    await supabase
      .from('inscricoes_rp3')
      .update({ asaas_checkout_id: checkoutId, checkout_url: checkoutUrl })
      .eq('id', inscricao.id);

    return new Response(
      JSON.stringify({ checkoutUrl, inscricaoId: inscricao.id }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (e) {
    console.error('criar-checkout-rp3 erro:', e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : 'Erro inesperado' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
