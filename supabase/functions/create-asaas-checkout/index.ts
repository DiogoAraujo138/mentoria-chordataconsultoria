import { corsHeaders } from "../_shared/cors.ts";
import { asaasFetch, getAsaasConfig, MAX_INSTALLMENTS, PRICE } from "../_shared/asaas.ts";
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

type AsaasCustomer = { id: string };

type AsaasListResponse<T> = { data?: T[] };

type AsaasCheckout = {
  id?: string;
  link?: string;
  checkoutUrl?: string;
  url?: string;
};

async function findOrCreateCustomer(input: {
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
}): Promise<AsaasCustomer> {
  const list = (await asaasFetch(`/customers?cpfCnpj=${input.cpf}`, {
    method: "GET",
  })) as AsaasListResponse<AsaasCustomer>;

  if (list?.data?.length) return list.data[0];

  return (await asaasFetch(`/customers`, {
    method: "POST",
    body: JSON.stringify({
      name: input.nome,
      email: input.email,
      cpfCnpj: input.cpf,
      mobilePhone: input.telefone,
      notificationDisabled: false,
    }),
  })) as AsaasCustomer;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { env: ASAAS_ENV, key: ASAAS_KEY } = getAsaasConfig();
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

    const customer = await findOrCreateCustomer(input);

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

    let checkout: AsaasCheckout;
    try {
      checkout = (await asaasFetch(`/checkouts`, {
        method: "POST",
        body: JSON.stringify({
          billingTypes: ["PIX", "CREDIT_CARD"],
          chargeTypes: ["DETACHED", "INSTALLMENT"],
          minutesToExpire: 60,
          callback: {
            successUrl: `${origin}/?pagamento=sucesso`,
            cancelUrl: `${origin}/?pagamento=cancelado`,
            expiredUrl: `${origin}/?pagamento=expirado`,
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
            mobilePhone: input.telefone,
          },
          // Asaas exige o objeto singular `installment` quando INSTALLMENT está em chargeTypes
          installment: {
            maxInstallmentCount: MAX_INSTALLMENTS,
          },
          externalReference: inscricao.id,
        }),
      })) as AsaasCheckout;
    } catch (checkoutErr) {
      await supabase
        .from("inscricoes_rp3")
        .update({ status: "CHECKOUT_FAILED" })
        .eq("id", inscricao.id);
      throw checkoutErr;
    }

    const checkoutUrl: string | undefined =
      checkout?.link ?? checkout?.checkoutUrl ?? checkout?.url;
    const checkoutId: string | undefined = checkout?.id;

    if (!checkoutUrl) {
      await supabase
        .from("inscricoes_rp3")
        .update({ status: "CHECKOUT_FAILED" })
        .eq("id", inscricao.id);
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
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro interno";
    console.error("create-asaas-checkout error:", err);
    return new Response(
      JSON.stringify({ error: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
