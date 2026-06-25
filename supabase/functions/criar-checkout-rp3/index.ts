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
    : 'https://api-sandbox.asaas.com/v3';

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
  cupom: z.string().trim().max(60).optional().nullable(),
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

    const { nome, email, cpf, telefone, parcelas, successUrl, cancelUrl, cupom } = parsed.data;

    // 0. Valida cupom (se informado)
    let percentualDesconto = 0;
    let cupomCodigo: string | null = null;
    let cupomRow: any = null;
    if (cupom && cupom.trim()) {
      const codigo = cupom.trim().toUpperCase();
      const { data: c, error: cErr } = await supabase
        .from('cupons_rp3').select('*').eq('codigo', codigo).maybeSingle();
      if (cErr) throw new Error(`DB cupom: ${cErr.message}`);
      if (!c || !c.ativo) throw new Error('Cupom inválido.');
      if (c.expira_em && new Date(c.expira_em).getTime() < Date.now()) throw new Error('Cupom expirado.');
      if (c.max_usos != null && c.usos >= c.max_usos) throw new Error('Cupom esgotado.');
      percentualDesconto = Number(c.percentual_desconto);
      cupomCodigo = codigo;
      cupomRow = c;
    }

    const valorFinal = Math.max(0, Math.round((VALOR_TOTAL * (1 - percentualDesconto / 100)) * 100) / 100);
    const gratuito = valorFinal === 0;

    // 1. Insere inscrição pendente
    const { data: inscricao, error: insErr } = await supabase
      .from('inscricoes_rp3')
      .insert({
        nome, email, cpf, telefone,
        valor: valorFinal,
        valor_original: VALOR_TOTAL,
        cupom_codigo: cupomCodigo,
        percentual_desconto: percentualDesconto,
        parcelas: gratuito ? 1 : parcelas,
        status: gratuito ? 'PAID' : 'PENDING',
        forma_pagamento: gratuito ? 'CUPOM_100' : null,
        ambiente: ASAAS_ENV,
      })
      .select()
      .single();
    if (insErr) throw new Error(`DB insert: ${insErr.message}`);

    // Incrementa uso do cupom
    if (cupomRow) {
      await supabase.from('cupons_rp3')
        .update({ usos: (cupomRow.usos ?? 0) + 1 })
        .eq('id', cupomRow.id);
    }

    // 2a. Cupom 100% → pula Asaas, vai direto pro obrigado
    if (gratuito) {
      return new Response(
        JSON.stringify({ checkoutUrl: `${successUrl}?insc=${inscricao.id}&free=1`, inscricaoId: inscricao.id, gratuito: true }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    // 2b. Cria Checkout no Asaas com valor já com desconto
    const checkoutPayload: Record<string, unknown> = {
      billingTypes: ['PIX', 'CREDIT_CARD'],
      chargeTypes: parcelas > 1 ? ['DETACHED', 'INSTALLMENT'] : ['DETACHED'],
      minutesToExpire: 1440,
      callback: {
        successUrl: `${successUrl}?insc=${inscricao.id}`,
        cancelUrl,
        expiredUrl: cancelUrl,
      },
      items: [
        {
          name: 'Mentoria RP3' + (cupomCodigo ? ` (cupom ${cupomCodigo})` : ''),
          description: 'Mentoria RP3 — Gestao Clinica e Hospitalar Veterinaria (Turma Jun/2026)',
          quantity: 1,
          value: valorFinal,
        },
      ],
      customerData: {
        name: nome,
        email,
        cpfCnpj: cpf,
        phone: telefone,
        address: 'Rua nao informada',
        addressNumber: 0,
        province: 'Centro',
        postalCode: '90010000',
      },
      externalReference: inscricao.id,
    };

    if (parcelas > 1) {
      (checkoutPayload as any).installment = { maxInstallmentCount: parcelas };
    }

    const checkout = await asaas('/checkouts', {
      method: 'POST',
      body: JSON.stringify(checkoutPayload),
    });

    const checkoutId = checkout?.id;
    const checkoutUrl = checkout?.link;
    if (!checkoutId || !checkoutUrl) {
      console.error('Resposta Asaas sem id/link:', checkout);
      throw new Error('Asaas nao retornou o checkout');
    }

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
