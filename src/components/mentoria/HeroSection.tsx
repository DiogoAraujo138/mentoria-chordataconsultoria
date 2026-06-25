const WHATSAPP_URL =
  "https://wa.me/5551992358827?text=Ol%C3%A1!%20Quero%20participar%20da%20pr%C3%B3xima%20turma%20da%20Mentoria%20RP3%20(Junho%2F2026).%20Pode%20me%20enviar%20os%20pr%C3%B3ximos%20passos%3F";

const HeroSection = () => {
  return (
    <section id="top" className="relative hero-gradient overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
        <span className="section-label">Mentoria RP3</span>

        <h1 className="font-heading text-white mb-6">
          Gestão de clínica veterinária com método, não com achismo
        </h1>

        <p
          className="max-w-2xl mx-auto mb-10"
          style={{ color: "var(--slate-400)", fontSize: "1.125rem", lineHeight: 1.75 }}
        >
          O Método RP3 organiza Processos, Pessoas e Planejamento para que você deixe
          de apagar incêndios e comece a crescer com consistência. Turma Junho 2026.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
            Quero participar desta turma
            <span className="material-icons-round" style={{ fontSize: 18 }}>arrow_forward</span>
          </a>
          <a href="#metodo" className="btn-outline-rp3">
            Como funciona o RP3
          </a>
        </div>

        <div className="pt-6">
          <a
            href="https://portalrp3.lovable.app"
            target="_blank"
            rel="noopener"
            className="text-sm"
            style={{ color: "var(--slate-500)" }}
          >
            Já é aluno? Entrar no portal
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
