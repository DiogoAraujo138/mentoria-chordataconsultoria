const WHATSAPP_URL =
  "https://wa.me/5551992358827?text=Ol%C3%A1!%20Quero%20garantir%20minha%20vaga%20na%20Mentoria%20RP3%20(turma%20Junho%2F2026).%20Pode%20me%20enviar%20os%20pr%C3%B3ximos%20passos%3F";

const CTASection = () => {
  return (
    <>
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
            as vagas fecham, fecham. Fale com a gente para uma conversa sem compromisso.
          </p>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
            style={{
              background: "#fff",
              color: "var(--blue-600)",
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              padding: "14px 32px",
              borderRadius: "var(--radius-full)",
              textDecoration: "none",
            }}
          >
            Quero garantir minha vaga
            <span className="material-icons-round" style={{ fontSize: 18 }}>arrow_forward</span>
          </a>

          <p className="mt-4" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>
            Sem taxa de inscrição. Uma conversa antes de qualquer decisão.
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
