import { BarChart3, Users, Heart, Lock } from "lucide-react";

const modules = [
  {
    number: "01",
    icon: BarChart3,
    title: "Gestão Financeira e Dados",
    subtitle: "Descomplique a gestão financeira tomando decisões baseadas em dados.",
    topics: [
      "Gestão financeira baseada em dados",
      "Análise de dados na prática",
      "Conceitos de Business Intelligence",
      "Ferramentas, relatórios e dashboards",
    ],
    ready: true,
  },
  {
    number: "02",
    icon: Users,
    title: "Gestão de Pessoas",
    subtitle: "Construa equipes engajadas e uma cultura organizacional forte.",
    topics: [
      "Liderança no ambiente veterinário",
      "Cultura organizacional e engajamento",
      "Gestão de equipes e processos",
      "Comunicação e feedback efetivo",
    ],
    ready: true,
  },
  {
    number: "03",
    icon: Heart,
    title: "Saúde e Bem-Estar",
    subtitle: "Cuide de quem cuida: saúde mental e equilíbrio na rotina veterinária.",
    topics: [
      "Saúde mental no ambiente veterinário",
      "Prevenção de burnout e fadiga",
      "Equilíbrio entre vida pessoal e profissional",
      "Conexão com o ecossistema MentAll.Vet",
    ],
    ready: true,
  },
  {
    number: "04",
    icon: Lock,
    title: "Em Breve",
    subtitle: "Estamos preparando um conteúdo especial para completar sua jornada.",
    topics: [],
    ready: false,
  },
];

const ModulesSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div data-animate className="opacity-0 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">4 Encontros</span> que transformam sua gestão
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Cada módulo foi desenhado para atacar uma área essencial do seu negócio veterinário.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((mod, i) => (
            <div
              key={mod.number}
              data-animate
              className={`opacity-0 glass-card card-glow p-8 relative overflow-hidden group ${
                !mod.ready ? "opacity-60" : ""
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Module number */}
              <span className="absolute top-6 right-6 text-6xl font-bold text-brand-teal/5 group-hover:text-brand-teal/10 transition-colors">
                {mod.number}
              </span>

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-brand-teal/10 flex items-center justify-center mb-6">
                  <mod.icon className="w-6 h-6 text-brand-teal" />
                </div>

                <h3 className="text-xl font-semibold mb-2">{mod.title}</h3>
                <p className="text-muted-foreground mb-6">{mod.subtitle}</p>

                {mod.topics.length > 0 && (
                  <ul className="space-y-2">
                    {mod.topics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-1.5 shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                )}

                {!mod.ready && (
                  <div className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground/60">
                    <Lock className="w-4 h-4" />
                    Conteúdo em desenvolvimento
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
