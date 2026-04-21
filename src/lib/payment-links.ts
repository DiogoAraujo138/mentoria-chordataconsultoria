export const PAYMENT_LINKS = {
  pix: import.meta.env.VITE_ASAAS_LINK_PIX as string,
  cartao_4x: import.meta.env.VITE_ASAAS_LINK_CARTAO as string,
} as const;
