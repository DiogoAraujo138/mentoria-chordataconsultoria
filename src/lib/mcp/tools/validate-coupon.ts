import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const VALOR_TOTAL = 2300;

export default defineTool({
  name: "validate_coupon",
  title: "Validar cupom de desconto",
  description:
    "Valida um código de cupom da Mentoria RP3 e retorna se está ativo, o percentual de desconto e o valor final da inscrição.",
  inputSchema: {
    codigo: z.string().trim().min(1).max(60).describe("Código do cupom (ex: TESTE100)"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: true },
  handler: async ({ codigo }) => {
    const supabaseUrl = process.env.SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const code = codigo.toUpperCase();

    const res = await fetch(
      `${supabaseUrl}/rest/v1/cupons_rp3?codigo=eq.${encodeURIComponent(code)}&select=*`,
      {
        headers: {
          apikey: serviceKey,
          Authorization: `Bearer ${serviceKey}`,
        },
      },
    );
    if (!res.ok) {
      return { content: [{ type: "text", text: `Erro ao consultar cupom (${res.status}).` }], isError: true };
    }
    const rows = (await res.json()) as Array<any>;
    const cupom = rows[0];

    let resultado: Record<string, unknown>;
    if (!cupom || !cupom.ativo) {
      resultado = { valido: false, error: "Cupom não encontrado." };
    } else if (cupom.expira_em && new Date(cupom.expira_em).getTime() < Date.now()) {
      resultado = { valido: false, error: "Cupom expirado." };
    } else if (cupom.max_usos != null && cupom.usos >= cupom.max_usos) {
      resultado = { valido: false, error: "Cupom esgotado." };
    } else {
      const percentual = Number(cupom.percentual_desconto);
      const valorFinal = Math.max(0, Math.round(VALOR_TOTAL * (1 - percentual / 100) * 100) / 100);
      resultado = {
        valido: true,
        codigo: code,
        percentual,
        valorOriginal: VALOR_TOTAL,
        valorFinal,
        gratuito: valorFinal === 0,
      };
    }

    return {
      content: [{ type: "text", text: JSON.stringify(resultado, null, 2) }],
      structuredContent: resultado,
    };
  },
});
