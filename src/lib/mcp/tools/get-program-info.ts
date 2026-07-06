import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const INFO = {
  nome: "Mentoria RP3 — Chordata Consultoria",
  metodo: "Método RP3 (Processos, Pessoas e Planejamento)",
  publico: "Gestores, sócios e líderes de clínicas e hospitais veterinários",
  turma: "Junho 2026",
  formato: "Turmas reduzidas, mentoria em grupo + individual, diagnóstico gratuito",
  valorBRL: 2300,
  parcelamento: "Pix ou Boleto à vista, ou Cartão em até 6x sem juros",
  inscricoesUrl: "https://mentoria-rp3.lovable.app/#investimento",
  site: "https://mentoria-rp3.lovable.app",
};

export default defineTool({
  name: "get_program_info",
  title: "Informações da Mentoria RP3",
  description:
    "Retorna informações institucionais do programa Mentoria RP3: método, público-alvo, turma vigente, formato, valor e link de inscrição.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(INFO, null, 2) }],
    structuredContent: INFO,
  }),
});
