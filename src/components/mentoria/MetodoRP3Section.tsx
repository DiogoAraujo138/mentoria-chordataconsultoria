import { Search, Users, LayoutGrid, ArrowRight } from "lucide-react";

const pillars = [
  {
    number: "01",
    icon: Search,
    title: "Processos",
    action: "Medir e Analisar",
    accent: "text-brand-blue",
    accentBg: "bg-brand-blue/10",
    description:
      "O primeiro passo é enxergar com clareza. Mergulhamos nos dados e nos processos para identificar onde estão os gargalos.",
    topics: [
      { label: "Diagnóstico de Precisão", desc: "identifica pontos de ruptura no sistema financeiro e administrativo" },
      { label: "Análise de Dados", desc: "parâmetros estatísticos e controle sistêmico para decisões estratégicas" },
      { label: "Integração Comercial", desc: "controle inteligente de compras, estoques e vendas" },
    ],
  },
  {
    number: "02",
    icon: Users,
    title: "Pessoas",
    action: "Desenvolver e Engajar",
    accent: "text-brand-teal",
    accentBg: "bg-brand-teal/10",
    description:
      "Pessoas desenvolvem pessoas. Capacitamos líderes e equipes para que o negócio cresça de dentro para fora.",
    topics: [
      { label: "Habilidade de Gestor", desc: "capacidade gerencial, visão estratégica e liderança de alto impacto" },
      { label: "Solidificação da Base", desc: "engajamento, retenção e cultura organizacional" },
      { label: "Estruturação de Cargos", desc: "recrutamento focado em competências específicas do setor" },
    ],
  },
  {
    number: "03",
    icon: LayoutGrid,
    title: "Planejamento",
    action: "Controlar e Crescer",
    accent: "text-amber-400",
    accentBg: "bg-amber-400/10",
    description:
      "Com processos mapeados e pessoas preparadas, construímos o planejamento que transforma visão em resultado.",
    topics: [
      { label: "Planejamento Operacional", desc: "controle de compras, estoques e logística" },
      { label: "Planejamento Financeiro", desc: "projeção de despesas, receitas e metas de crescimento" },
      { label: "Planejamento Comercial", desc: "ações e campanhas estratégicas para maximizar lucratividade" },
    ],
  },
];

const MetodoRP3Section = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div data-animate className="opacity-0 text-center mb-12">
          <span className="text-sm text-brand-teal uppercase tracking-wider font-medium">
            — Nosso Método —
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
            Método Chordata · <span className="gradient-text">RP3</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nossa metodologia proprietária atua nos três pilares fundamentais de qualquer
            negócio veterinário — integrando processos, pessoas e planejamento para
            gerar resultados consistentes e sustentáveis.
          </p>
        </div>

        {/* Pillar chips with arrows */}
        <div data-animate className="opacity-0 flex flex-wrap justify-center items-center gap-3 mb-14">
          {pillars.map((p, i) => (
            <div key={p.title} className="flex items-center gap-3">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full border border-border ${p.accentBg}`}>
                <p.icon className={`w-4 h-4 ${p.accent}`} />
                <span className={`text-sm font-medium ${p.accent}`}>{p.title}</span>
              </div>
              {i < pillars.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          ))}
        </div>

        {/* Pillar cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <div
              key={p.title}
              data-animate
              className="opacity-0 glass-card card-glow p-8 relative overflow-hidden group"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <span className={`absolute top-6 right-6 text-5xl font-bold ${p.accent} opacity-10 group-hover:opacity-20 transition-opacity`}>
                {p.number}
              </span>

              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-lg ${p.accentBg} flex items-center justify-center mb-6`}>
                  <p.icon className={`w-6 h-6 ${p.accent}`} />
                </div>

                <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
                <p className={`text-sm font-medium mb-4 ${p.accent}`}>{p.action}</p>

                <p className="text-sm text-muted-foreground mb-5">{p.description}</p>

                <div className="h-px bg-border mb-5" />

                <ul className="space-y-3">
                  {p.topics.map((t) => (
                    <li key={t.label} className="flex items-start gap-2 text-sm">
                      <span className={`w-1.5 h-1.5 rounded-full ${p.accent.replace("text-", "bg-")} mt-1.5 shrink-0`} />
                      <span className="text-muted-foreground">
                        <span className="font-semibold text-foreground">{t.label}:</span> {t.desc}
                      </span>
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

export default MetodoRP3Section;
