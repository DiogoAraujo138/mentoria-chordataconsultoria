import { Users, ShoppingCart, BarChart3, FileCheck } from "lucide-react";

const modules = [
  {
    number: "01",
    icon: Users,
    title: "Gestão de Pessoas",
    subtitle: "Construa equipes engajadas e reduza o turnover no seu negócio veterinário.",
    topics: [
      "Redução de turnover e retenção de talentos",
      "Recrutamento e seleção no mercado vet",
      "Desenvolvimento de lideranças internas",
      "Cultura organizacional e engajamento",
    ],
  },
  {
    number: "02",
    icon: ShoppingCart,
    title: "Gestão Comercial",
    subtitle: "Transforme o atendimento e aumente o faturamento com processos claros.",
    topics: [
      "Atendimento ao cliente como diferencial",
      "Sistemas de gestão e automação comercial",
      "Treinamento de equipe de recepção",
      "Estratégias de vendas e fidelização",
    ],
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Gestão de Dados e Finanças",
    subtitle: "Descomplique a gestão financeira tomando decisões baseadas em dados.",
    topics: [
      "Gestão financeira baseada em dados",
      "Análise de dados na prática",
      "Conceitos de Business Intelligence",
      "Ferramentas, relatórios e dashboards",
    ],
  },
  {
    number: "04",
    icon: FileCheck,
    title: "Gestão de Fluxogramas e POPs",
    subtitle: "Padronize processos e ganhe eficiência com documentação pronta para uso.",
    topics: [
      "Criação e implementação de POPs",
      "Fluxogramas de processos internos",
      "Metodologia de padronização",
      "Modelos prontos para aplicar",
    ],
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
              className="opacity-0 glass-card card-glow p-8 relative overflow-hidden group"
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

                <ul className="space-y-2">
                  {mod.topics.map((topic) => (
                    <li key={topic} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-teal mt-1.5 shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
