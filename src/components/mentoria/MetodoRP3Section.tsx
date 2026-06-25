const pillars = [
  {
    icon: "account_tree",
    title: "Processos",
    text: "Fluxos clínicos e administrativos que funcionam mesmo quando você não está presente. Protocolos que a equipe segue de verdade.",
  },
  {
    icon: "groups",
    title: "Pessoas",
    text: "Contratação, treinamento, gestão de desempenho e cultura. Equipe engajada não acontece por acaso: é construída com método.",
  },
  {
    icon: "insights",
    title: "Planejamento",
    text: "Metas que fazem sentido para o tamanho da sua clínica, indicadores que você realmente usa e um plano de crescimento que sai do papel.",
  },
];

const MetodoRP3Section = () => {
  return (
    <section id="metodo" className="py-24 px-6" style={{ backgroundColor: "var(--slate-900)" }}>
      <div className="max-w-6xl mx-auto">
        <div data-animate className="opacity-0 max-w-3xl mb-14">
          <span className="section-label">O método</span>
          <h2 className="text-white mb-5">Três pilares que organizam sua clínica de verdade</h2>
          <p style={{ color: "var(--slate-400)", fontSize: "1.0625rem", lineHeight: 1.75 }}>
            A maioria dos gestores veterinários aprendeu a clinicar muito bem. A gestão veio
            depois, na marra. O RP3 resolve isso sem fórmula genérica: parte do diagnóstico da
            sua realidade e constrói estrutura onde ela faz falta.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div key={p.title} data-animate className="opacity-0 card-dark" style={{ animationDelay: `${i * 120}ms` }}>
              <div className="icon-circle mb-5">
                <span className="material-icons-round">{p.icon}</span>
              </div>
              <h3 className="text-white mb-3">{p.title}</h3>
              <p style={{ color: "var(--slate-400)", lineHeight: 1.75 }}>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MetodoRP3Section;
