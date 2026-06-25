const deliverables = [
  {
    title: "Diagnóstico completo da sua clínica",
    text: "Mapeamento de processos, equipe e finanças antes de começar. Você sabe onde está antes de planejar para onde vai.",
  },
  {
    title: "Encontros ao vivo semanais",
    text: "Sessões em grupo com foco em implementação. Não é aula: é trabalho feito junto, todas as terças de junho.",
  },
  {
    title: "Trilha de conteúdo estruturada",
    text: "Material organizado por módulo, no ritmo da mentoria. Sem vídeo de quatro horas para assistir sozinho.",
  },
  {
    title: "Comunidade de gestores veterinários",
    text: "Acesso a uma rede de profissionais com os mesmos desafios. O que funciona em uma clínica chega na sua.",
  },
  {
    title: "Suporte entre sessões",
    text: "Canal direto para dúvidas durante a implementação. Porque os problemas reais não esperam o próximo encontro.",
  },
  {
    title: "Plano de 90 dias personalizado",
    text: "Sai da mentoria com prioridades definidas e ações mapeadas para o seu contexto.",
  },
];

const BenefitsSection = () => {
  return (
    <section id="entregaveis" className="py-24 px-6" style={{ backgroundColor: "var(--slate-900)" }}>
      <div className="max-w-6xl mx-auto">
        <div data-animate className="opacity-0 max-w-2xl mb-14">
          <span className="section-label">Entregáveis</span>
          <h2 className="text-white mb-4">O que está incluído na mentoria</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deliverables.map((d, i) => (
            <div key={d.title} data-animate className="opacity-0 card-dark" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="icon-circle mb-5">
                <span className="material-icons-round">task_alt</span>
              </div>
              <h3 className="text-white mb-3">{d.title}</h3>
              <p style={{ color: "var(--slate-400)", lineHeight: 1.75 }}>{d.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
