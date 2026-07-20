import { corsHeaders } from "../_shared/cors.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const CHATWOOT_URL = Deno.env.get("CHATWOOT_URL");
const CHATWOOT_ACCOUNT_ID = Deno.env.get("CHATWOOT_ACCOUNT_ID");
const CHATWOOT_API_TOKEN = Deno.env.get("CHATWOOT_API_TOKEN");
/** Inbox "Chordata - Suporte" (Evolution webhook). Override via secret se necessário. */
const CHATWOOT_INBOX_ID =
  Deno.env.get("CHATWOOT_INBOX_ID") ?? "9";

const CONFIRMED_EVENTS = new Set([
  "PAYMENT_CONFIRMED",
  "PAYMENT_RECEIVED",
  "PAYMENT_RECEIVED_IN_CASH",
]);

const ALREADY_NOTIFIED = new Set(["CONFIRMED", "RECEIVED"]);

type Inscricao = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  valor: number;
  status: string;
  cupom_codigo: string | null;
  forma_pagamento: string | null;
  parcelas: number | null;
  asaas_payment_id: string | null;
  asaas_checkout_id: string | null;
  asaas_customer_id: string | null;
  chatwoot_notified_at?: string | null;
  cupom_aplicado?: boolean | null;
};

type AsaasPayment = {
  id?: string;
  customer?: string;
  externalReference?: string;
  billingType?: string;
  installmentCount?: number;
  checkoutSession?: string;
  checkout?: string;
};

async function chatwoot(path: string, init: RequestInit = {}) {
  const res = await fetch(`${CHATWOOT_URL}/api/v1${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      api_access_token: CHATWOOT_API_TOKEN ?? "",
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let body: unknown = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  if (!res.ok) {
    console.error(`Chatwoot ${path} failed [${res.status}]:`, body);
    return null;
  }
  return body as Record<string, unknown>;
}

async function notifyChatwoot(inscricao: Inscricao, payment: AsaasPayment) {
  if (!CHATWOOT_URL || !CHATWOOT_ACCOUNT_ID || !CHATWOOT_API_TOKEN) {
    console.log("Chatwoot não configurado — pulando.");
    return false;
  }

  try {
    const contactRes = await chatwoot(
      `/accounts/${CHATWOOT_ACCOUNT_ID}/contacts`,
      {
        method: "POST",
        body: JSON.stringify({
          name: inscricao.nome,
          email: inscricao.email,
          phone_number: `+55${inscricao.telefone}`,
          identifier: inscricao.email,
        }),
      },
    );

    let contactId: number | undefined =
      (contactRes?.payload as { contact?: { id?: number } } | undefined)?.contact
        ?.id;

    if (!contactId) {
      const search = await chatwoot(
        `/accounts/${CHATWOOT_ACCOUNT_ID}/contacts/search?q=${encodeURIComponent(inscricao.email)}`,
      );
      const payload = search?.payload as Array<{ id?: number }> | undefined;
      contactId = payload?.[0]?.id;
    }

    if (!contactId) {
      console.error("Chatwoot: contato não pôde ser resolvido.");
      return false;
    }

    const valorFmt = Number(inscricao.valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    const mensagem = [
      `🎉 *Nova inscrição confirmada — Mentoria RP3*`,
      ``,
      `👤 *Nome:* ${inscricao.nome}`,
      `📧 *E-mail:* ${inscricao.email}`,
      `📱 *Telefone:* ${inscricao.telefone}`,
      `💳 *Forma:* ${inscricao.forma_pagamento ?? payment?.billingType ?? "-"}`,
      `💰 *Valor:* ${valorFmt} (${inscricao.parcelas ?? 1}x)`,
      inscricao.cupom_codigo ? `🎟️ *Cupom:* ${inscricao.cupom_codigo}` : null,
      `🆔 *Pagamento Asaas:* ${payment?.id ?? "-"}`,
      `📥 *Inbox:* Chordata - Suporte`,
    ]
      .filter(Boolean)
      .join("\n");

    const inboxId = Number(CHATWOOT_INBOX_ID);
    const conv = await chatwoot(
      `/accounts/${CHATWOOT_ACCOUNT_ID}/conversations`,
      {
        method: "POST",
        body: JSON.stringify({
          source_id: `asaas-${payment?.id ?? inscricao.id}`,
          inbox_id: inboxId,
          contact_id: contactId,
          status: "open",
          message: { content: mensagem },
        }),
      },
    );

    if (!conv) {
      console.warn(
        "Chatwoot: conversa não criada — verifique CHATWOOT_INBOX_ID e Evolution webhook.",
      );
      return false;
    }

    return true;
  } catch (err) {
    console.error("Chatwoot notify error:", err);
    return false;
  }
}

async function findInscricao(
  supabase: ReturnType<typeof createClient>,
  payment: AsaasPayment,
  checkoutId?: string,
) {
  const externalRef = payment?.externalReference;
  if (externalRef) {
    const { data } = await supabase
      .from("inscricoes_rp3")
      .select("*")
      .eq("id", externalRef)
      .maybeSingle();
    if (data) return data as Inscricao;
  }

  if (payment?.id) {
    const { data } = await supabase
      .from("inscricoes_rp3")
      .select("*")
      .eq("asaas_payment_id", payment.id)
      .maybeSingle();
    if (data) return data as Inscricao;
  }

  const sessionId =
    checkoutId ?? payment?.checkoutSession ?? payment?.checkout;
  if (sessionId) {
    const { data } = await supabase
      .from("inscricoes_rp3")
      .select("*")
      .eq("asaas_checkout_id", sessionId)
      .maybeSingle();
    if (data) return data as Inscricao;
  }

  if (payment?.customer) {
    const { data } = await supabase
      .from("inscricoes_rp3")
      .select("*")
      .eq("asaas_customer_id", payment.customer)
      .eq("status", "PENDING")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data) return data as Inscricao;
  }

  return null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const expected = Deno.env.get("ASAAS_WEBHOOK_TOKEN");
    const received = req.headers.get("asaas-access-token");
    if (!expected) {
      console.error("ASAAS_WEBHOOK_TOKEN não configurado.");
      return new Response(JSON.stringify({ error: "misconfigured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (received !== expected) {
      console.warn("Token de webhook inválido.");
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = await req.json();
    const event: string = payload?.event ?? "";
    const payment: AsaasPayment = payload?.payment ?? {};
    const checkout = payload?.checkout ?? payload?.checkoutSession ?? {};
    const checkoutId: string | undefined =
      typeof checkout === "string" ? checkout : checkout?.id;

    console.log(
      `Asaas webhook: ${event} · ref=${payment?.externalReference} · payment=${payment?.id} · checkout=${checkoutId}`,
    );

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const inscricao = await findInscricao(supabase, payment, checkoutId);

    if (!inscricao) {
      console.warn("Inscrição não encontrada para webhook.");
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const statusMap: Record<string, string> = {
      PAYMENT_CREATED: "PENDING",
      PAYMENT_AWAITING_RISK_ANALYSIS: "PENDING",
      PAYMENT_APPROVED_BY_RISK_ANALYSIS: "PENDING",
      PAYMENT_CONFIRMED: "CONFIRMED",
      PAYMENT_RECEIVED: "RECEIVED",
      PAYMENT_RECEIVED_IN_CASH: "RECEIVED",
      PAYMENT_OVERDUE: "OVERDUE",
      PAYMENT_REFUNDED: "REFUNDED",
      PAYMENT_DELETED: "CANCELED",
      PAYMENT_CHARGEBACK_REQUESTED: "CHARGEBACK",
      CHECKOUT_PAID: "CONFIRMED",
    };
    const newStatus = statusMap[event] ?? inscricao.status;

    await supabase
      .from("inscricoes_rp3")
      .update({
        status: newStatus,
        forma_pagamento: payment?.billingType ?? inscricao.forma_pagamento,
        parcelas: payment?.installmentCount ?? inscricao.parcelas,
        asaas_payment_id: payment?.id ?? inscricao.asaas_payment_id,
        asaas_checkout_id: checkoutId ?? inscricao.asaas_checkout_id,
        raw_webhook: payload,
      })
      .eq("id", inscricao.id);

    const isConfirmed = CONFIRMED_EVENTS.has(event) || event === "CHECKOUT_PAID";
    if (isConfirmed) {
      // Idempotência: não reprocessa cupom/Chatwoot se já confirmado
      const alreadyHandled = ALREADY_NOTIFIED.has(inscricao.status);

      if (!alreadyHandled && inscricao.cupom_codigo) {
        const { data: cupom } = await supabase
          .from("cupons_rp3")
          .select("id, usos")
          .eq("codigo", inscricao.cupom_codigo)
          .maybeSingle();
        if (cupom) {
          await supabase
            .from("cupons_rp3")
            .update({ usos: (cupom.usos ?? 0) + 1 })
            .eq("id", cupom.id);
        }
      }

      if (!alreadyHandled) {
        const notified = await notifyChatwoot(
          {
            ...inscricao,
            forma_pagamento: payment?.billingType ?? inscricao.forma_pagamento,
            parcelas: payment?.installmentCount ?? inscricao.parcelas,
          },
          payment,
        );
        if (notified) {
          console.log(`Chatwoot notificado para inscrição ${inscricao.id}`);
        }
      } else {
        console.log(
          `Inscrição ${inscricao.id} já estava ${inscricao.status} — skip cupom/Chatwoot.`,
        );
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro interno";
    console.error("asaas-webhook error:", err);
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
