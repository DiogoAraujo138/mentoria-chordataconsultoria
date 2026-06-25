import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

const CTASection = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CheckoutModal open={open} onOpenChange={setOpen} />
      <section
        id="cta-final"
        className="px-6 py-24 text-center"
        style={{ background: "linear-gradient(135deg, #2563EB 0%, #1d4ed8 100%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <span
            className="inline-block mb-4"
            style={{
              color: "rgba(255,255,255,0.85)",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
            }}
          >
            Turma Junho 2026
          </span>
          <h2 className="text-white mb-5">Vagas limitadas. A turma começa em junho.</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "1.0625rem", lineHeight: 1.75 }} className="mb-8">
            A mentoria funciona em grupos pequenos para garantir acompanhamento real. Quando
            as vagas fecham, fecham. Garanta sua inscrição com pagamento seguro.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2"
            style={{
              background: "#fff",
              color: "var(--blue-600)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "14px 32px",
              borderRadius: "var(--radius-full)",
              border: "none",
              cursor: "pointer",
            }}
          >
            Inscrever-me agora
            <span className="material-icons-round" style={{ fontSize: 18 }}>arrow_forward</span>
          </button>

          <p className="mt-4" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>
            Pix, Boleto ou Cartão em até 6x sem juros · Processado pelo Asaas.
          </p>
        </div>
      </section>

      <footer style={{ backgroundColor: "var(--slate-950)", borderTop: "1px solid rgba(51,65,85,0.4)" }}>
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-heading font-bold text-white text-lg">Chordata</p>
            <p style={{ color: "var(--slate-500)", fontSize: "0.875rem" }}>
              Gestão para clínicas e hospitais veterinários
            </p>
          </div>
          <p style={{ color: "var(--slate-500)", fontSize: "0.875rem" }}>
            © {new Date().getFullYear()} Chordata Consultoria. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </>
  );
};

export default CTASection;
