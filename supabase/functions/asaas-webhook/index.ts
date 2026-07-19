import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const CHATWOOT_URL = Deno.env.get("CHATWOOT_URL");
const CHATWOOT_ACCOUNT_ID = Deno.env.get("CHATWOOT_ACCOUNT_ID");
const CHATWOOT_API_TOKEN = Deno.env.get("CHATWOOT_API_TOKEN");
const CHATWOOT_INBOX_ID = Deno.env.get("CHATWOOT_INBOX_ID"); // opcional

const CONFIRMED = new Set([
  "PAYMENT_CONFIRMED",
  "PAYMENT_RECEIVED",
  "PAYMENT_RECEIVED_IN_CASH",
]);

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
  let body: any = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  if (!res.ok) {
    console.error(`Chatwoot ${path} failed [${res.status}]:`, body);
    return null;
  }
  return body;
}

async function notifyChatwoot(inscricao: any, payment: any) {
  if (!CHATWOOT_URL || !CHATWOOT_ACCOUNT_ID || !CHATWOOT_API_TOKEN) {
    console.log("Chatwoot não configurado — pulando.");
    return;
  }

  try {
    // 1) Cria contato (idempotente por identifier = email)
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

    let contactId: number | undefined = contactRes?.payload?.contact?.id;

    // 2) Se já existir (409/422), busca
    if (!contactId) {
      const search = await chatwoot(
        `/accounts/${CHATWOOT_ACCOUNT_ID}/contacts/search?q=${encodeURIComponent(inscricao.email)}`,
      );
      contactId = search?.payload?.[0]?.id;
    }

    if (!contactId) {
      console.error("Chatwoot: contato não pôde ser resolvido.");
      return;
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
    ]
      .filter(Boolean)
      .join("\n");

    // 3) Cria conversa
    const conv = await chatwoot(
      `/accounts/${CHATWOOT_ACCOUNT_ID}/conversations`,
      {
        method: "POST",
        body: JSON.stringify({
          source_id: `asaas-${payment?.id ?? inscricao.id}`,
          inbox_id: CHATWOOT_INBOX_ID ? Number(CHATWOOT_INBOX_ID) : undefined,
          contact_id: contactId,
          status: "open",
          message: { content: mensagem },
        }),
      },
    );

    if (!conv) {
      // Fallback: se sem inbox, tenta apenas mensagem em uma conversa existente
      console.warn("Chatwoot: conversa não criada — verifique CHATWOOT_INBOX_ID.");
    }
  } catch (err) {
    console.error("Chatwoot notify error:", err);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Validação por token
    const expected = Deno.env.get("ASAAS_WEBHOOK_TOKEN");
    const received = req.headers.get("asaas-access-token");
    if (expected && received !== expected) {
      console.warn("Token de webhook inválido.");
      return new Response(JSON.stringify({ error: "unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = await req.json();
    const event: string = payload?.event ?? "";
    const payment = payload?.payment ?? {};
    const externalRef: string | undefined = payment?.externalReference;

    console.log(`Asaas webhook: ${event} · ref=${externalRef} · id=${payment?.id}`);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Localiza inscrição por externalReference (id da linha)
    let inscricaoId: string | undefined = externalRef;
    let inscricao: any = null;

    if (inscricaoId) {
      const { data } = await supabase
        .from("inscricoes_rp3")
        .select("*")
        .eq("id", inscricaoId)
        .maybeSingle();
      inscricao = data;
    }

    if (!inscricao && payment?.customer) {
      const { data } = await supabase
        .from("inscricoes_rp3")
        .select("*")
        .eq("asaas_customer_id", payment.customer)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      inscricao = data;
      inscricaoId = data?.id;
    }

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
    };
    const newStatus = statusMap[event] ?? "UNKNOWN";

    await supabase
      .from("inscricoes_rp3")
      .update({
        status: newStatus,
        forma_pagamento: payment?.billingType ?? inscricao.forma_pagamento,
        parcelas: payment?.installmentCount ?? inscricao.parcelas,
        asaas_payment_id: payment?.id ?? inscricao.asaas_payment_id,
        raw_webhook: payload,
      })
      .eq("id", inscricao.id);

    // Ações em pagamento confirmado
    if (CONFIRMED.has(event)) {
      // Incrementa uso do cupom
      if (inscricao.cupom_codigo) {
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

      // Notifica Chatwoot
      await notifyChatwoot(
        {
          ...inscricao,
          forma_pagamento: payment?.billingType ?? inscricao.forma_pagamento,
          parcelas: payment?.installmentCount ?? inscricao.parcelas,
        },
        payment,
      );
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("asaas-webhook error:", err);
    return new Response(
      JSON.stringify({ error: err?.message ?? "Erro interno" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
