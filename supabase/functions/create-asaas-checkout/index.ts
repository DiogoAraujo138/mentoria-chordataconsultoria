import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3";

const BodySchema = z.object({
  nome: z.string().min(2).max(120),
  email: z.string().email().max(150),
  cpf: z.string().regex(/^\d{11}$/, "CPF deve ter 11 dígitos"),
  telefone: z.string().regex(/^\d{10,11}$/, "Telefone inválido"),
  cupomCodigo: z.string().trim().min(1).max(40).optional(),
  turma: z.string().min(3).max(40).optional(),
});

const ASAAS_ENV = (Deno.env.get("ASAAS_ENV") ?? "production").toLowerCase();
const ASAAS_BASE =
  ASAAS_ENV === "sandbox"
    ? "https://api-sandbox.asaas.com/v3"
    : "https://api.asaas.com/v3";
const ASAAS_KEY =
  ASAAS_ENV === "sandbox"
    ? Deno.env.get("ASAAS_API_KEY_CHORDATA_SANDBOX")
    : Deno.env.get("ASAASOFICIAL");

const PRICE = 2300;
const MAX_INSTALLMENTS = 6;

async function asaas(path: string, init: RequestInit = {}) {
  const res = await fetch(`${ASAAS_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      access_token: ASAAS_KEY ?? "",
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
    console.error(`Asaas ${path} failed [${res.status}]:`, body);
    throw new Error(
      `Asaas ${res.status}: ${
        typeof body === "object"
          ? body?.errors?.[0]?.description ?? JSON.stringify(body)
          : body
      }`,
    );
  }
  return body;
}

async function findOrCreateCustomer(input: {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
}) {
  const list = await asaas(`/customers?cpfCnpj=${input.cpf}`, { method: "GET" });
  if (list?.data?.length) return list.data[0];
  return await asaas(`/customers`, {
    method: "POST",
    body: JSON.stringify({
      name: input.nome,
      email: input.email,
      cpfCnpj: input.cpf,
      mobilePhone: input.telefone,
      notificationDisabled: false,
    }),
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!ASAAS_KEY) {
      throw new Error("Configuração Asaas ausente (chave API).");
    }

    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Dados inválidos", details: parsed.error.flatten() }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
    const input = parsed.data;

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Cupom (opcional)
    let percentualDesconto = 0;
    let cupomCodigoValido: string | null = null;
    if (input.cupomCodigo) {
      const { data: cupom } = await supabase
        .from("cupons_rp3")
        .select("codigo, percentual_desconto, max_usos, usos, ativo, expira_em")
        .eq("codigo", input.cupomCodigo.toUpperCase())
        .maybeSingle();

      const agora = new Date();
      const valido =
        cupom?.ativo &&
        (!cupom.expira_em || new Date(cupom.expira_em) > agora) &&
        (!cupom.max_usos || cupom.usos < cupom.max_usos);

      if (!cupom || !valido) {
        return new Response(
          JSON.stringify({ error: "Cupom inválido ou expirado." }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }
      percentualDesconto = Number(cupom.percentual_desconto);
      cupomCodigoValido = cupom.codigo;
    }

    const valorFinal = Number(
      (PRICE * (1 - percentualDesconto / 100)).toFixed(2),
    );

    // Cliente Asaas
    const customer = await findOrCreateCustomer(input);

    // Registro pendente
    const origin =
      req.headers.get("origin") ?? "https://mentoria-rp3.lovable.app";
    const turmaSlug = input.turma ?? "atual";

    const { data: inscricao, error: insErr } = await supabase
      .from("inscricoes_rp3")
      .insert({
        nome: input.nome,
        email: input.email,
        cpf: input.cpf,
        telefone: input.telefone,
        valor: valorFinal,
        valor_original: PRICE,
        parcelas: 1,
        status: "PENDING",
        ambiente: ASAAS_ENV,
        cupom_codigo: cupomCodigoValido,
        percentual_desconto: percentualDesconto,
        asaas_customer_id: customer.id,
      })
      .select("id")
      .single();

    if (insErr) throw insErr;

    // Checkout Asaas
    const checkout = await asaas(`/checkouts`, {
      method: "POST",
      body: JSON.stringify({
        billingTypes: ["PIX", "CREDIT_CARD"],
        chargeTypes: ["DETACHED", "INSTALLMENT"],
        minutesToExpire: 60,
        callback: {
          successUrl: `${origin}/?pagamento=sucesso`,
          cancelUrl: `${origin}/?pagamento=cancelado`,
        },
        items: [
          {
            name: `Mentoria RP3 — Turma ${turmaSlug}`,
            description:
              "Gestão Clínica e Hospitalar Veterinária · Método RP3 da Chordata Consultoria",
            quantity: 1,
            value: valorFinal,
          },
        ],
        customerData: {
          name: input.nome,
          cpfCnpj: input.cpf,
          email: input.email,
          phone: input.telefone,
        },
        installments: {
          maxInstallmentCount: MAX_INSTALLMENTS,
        },
        externalReference: inscricao.id,
      }),
    });

    const checkoutUrl: string =
      checkout?.link ?? checkout?.checkoutUrl ?? checkout?.url;
    const checkoutId: string | undefined = checkout?.id;

    if (!checkoutUrl) {
      throw new Error("Asaas não retornou URL de checkout.");
    }

    await supabase
      .from("inscricoes_rp3")
      .update({
        checkout_url: checkoutUrl,
        asaas_checkout_id: checkoutId ?? null,
      })
      .eq("id", inscricao.id);

    return new Response(
      JSON.stringify({
        checkoutUrl,
        inscricaoId: inscricao.id,
        valor: valorFinal,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err: any) {
    console.error("create-asaas-checkout error:", err);
    return new Response(
      JSON.stringify({ error: err?.message ?? "Erro interno" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
