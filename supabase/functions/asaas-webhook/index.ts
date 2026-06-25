import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';

const WEBHOOK_TOKEN = Deno.env.get('ASAAS_WEBHOOK_TOKEN');

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

const STATUS_MAP: Record<string, string> = {
  PAYMENT_CREATED: 'PENDING',
  PAYMENT_AWAITING_RISK_ANALYSIS: 'PENDING',
  PAYMENT_APPROVED_BY_RISK_ANALYSIS: 'PENDING',
  PAYMENT_RECEIVED: 'CONFIRMED',
  PAYMENT_CONFIRMED: 'CONFIRMED',
  PAYMENT_OVERDUE: 'OVERDUE',
  PAYMENT_DELETED: 'CANCELED',
  PAYMENT_REFUNDED: 'REFUNDED',
  PAYMENT_CHARGEBACK_REQUESTED: 'CHARGEBACK',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  // Asaas envia o token configurado no painel via header `asaas-access-token`
  const sent = req.headers.get('asaas-access-token');
  if (!WEBHOOK_TOKEN || sent !== WEBHOOK_TOKEN) {
    console.warn('Webhook com token inválido');
    return new Response(JSON.stringify({ error: 'invalid token' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const payload = await req.json();
    const event: string = payload?.event ?? '';
    const payment = payload?.payment ?? {};
    const externalReference: string | null = payment?.externalReference ?? null;
    const paymentId: string | null = payment?.id ?? null;
    const billingType: string | null = payment?.billingType ?? null;
    const newStatus = STATUS_MAP[event] ?? null;

    console.log('Webhook Asaas:', { event, paymentId, externalReference, newStatus });

    if (!externalReference && !paymentId) {
      return new Response(JSON.stringify({ ok: true, ignored: 'sem referência' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const update: Record<string, unknown> = {
      raw_webhook: payload,
      asaas_payment_id: paymentId,
    };
    if (billingType) update.forma_pagamento = billingType;
    if (newStatus) update.status = newStatus;

    const query = supabase.from('inscricoes_rp3').update(update);
    const { error } = externalReference
      ? await query.eq('id', externalReference)
      : await query.eq('asaas_payment_id', paymentId!);

    if (error) {
      console.error('Erro ao atualizar inscrição:', error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('asaas-webhook erro:', e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : 'erro' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
