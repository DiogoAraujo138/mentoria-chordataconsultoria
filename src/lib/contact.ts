/** Contato comercial da Mentoria RP3 — canal Evolution → Chatwoot "Chordata - Suporte". */
export const WHATSAPP_E164 = "5551992358827";

export const CHATWOOT_INBOX = {
  id: 9,
  name: "Chordata - Suporte",
  evolutionWebhook:
    "https://chordata-evolution-api.kk28lc.easypanel.host/chatwoot/webhook/Chordata%20-%20Suporte",
} as const;

export function whatsappUrl(message: string) {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(message)}`;
}

export function whatsappDuvidasUrl(turmaLabel: string) {
  return whatsappUrl(
    `Olá! Gostaria de mais informações sobre a Mentoria RP3 (turma ${turmaLabel}) e como funciona o processo de inscrição.`,
  );
}

export function whatsappInteresseUrl(turmaLabel: string) {
  return whatsappUrl(
    `Olá! Tenho interesse na Mentoria RP3 — Gestão Clínica e Hospitalar Veterinária (turma ${turmaLabel}). Pode me enviar mais informações sobre o investimento e inscrição?`,
  );
}

export function whatsappVagaUrl(turmaLabel: string) {
  return whatsappUrl(
    `Olá! Quero garantir minha vaga na Mentoria RP3 — Gestão Clínica e Hospitalar Veterinária (turma ${turmaLabel}). Pode me enviar os próximos passos para inscrição?`,
  );
}
