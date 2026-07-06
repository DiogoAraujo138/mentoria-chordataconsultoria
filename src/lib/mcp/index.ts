import { defineMcp } from "@lovable.dev/mcp-js";
import getProgramInfo from "./tools/get-program-info";
import validateCoupon from "./tools/validate-coupon";

export default defineMcp({
  name: "mentoria-rp3-mcp",
  title: "Mentoria RP3 — Chordata",
  version: "0.1.0",
  instructions:
    "Ferramentas do site da Mentoria RP3 (Chordata Consultoria). Use `get_program_info` para consultar dados do programa (método, valor, turma, inscrição) e `validate_coupon` para validar códigos de cupom de desconto.",
  tools: [getProgramInfo, validateCoupon],
});
