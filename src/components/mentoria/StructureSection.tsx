import { Users, User, UsersRound, ClipboardCheck, Clock, CalendarDays, Video } from "lucide-react";

const encontros = [
  { data: "09 de Junho", dia: "Terça-feira" },
  { data: "16 de Junho", dia: "Terça-feira" },
  { data: "23 de Junho", dia: "Terça-feira" },
  { data: "30 de Junho", dia: "Terça-feira" },
];

const items = [
  {
    icon: Clock,
    value: "20h",
    label: "De Treinamento",
    description: "Horas de conteúdo prático entre sessões ao vivo e treinamentos gravados.",
  },
  {
    icon: Users,
    value: "4",
    label: "Encontros em Grupo",
    description: "Sessões temáticas com todos os participantes da turma, conduzidas por especialistas.",
  },
  {
    icon: User,
    value: "4h",
    label: "Mentoria Individual",
    description: "Horas de mentoria personalizada para tratar os desafios específicos da sua empresa.",
  },
  {
    icon: UsersRound,
    value: "Máx. 10",
    label: "Integrantes por Turma",
    description: "Turmas reduzidas para garantir atenção personalizada e troca de qualidade.",
  },
  {
    icon: ClipboardCheck,
    value: "Incluso",
    label: "Diagnóstico Gratuito",
    description: "Análise completa do seu negócio antes do início da mentoria.",
  },
];

const StructureSection = () => {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div data-animate className="opacity-0 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Estrutura da <span className="gradient-text">Mentoria</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Um programa completo desenhado para entregar resultados práticos em cada etapa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {items.map((item, i) => (
            <div
              key={item.label}
              data-animate
              className="opacity-0 glass-card card-glow p-8 text-center group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-brand-teal/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-teal/20 transition-colors">
                <item.icon className="w-7 h-7 text-brand-teal" />
              </div>
              <div className="text-3xl font-bold mb-1 gradient-text">{item.value}</div>
              <div className="text-base font-semibold mb-2">{item.label}</div>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Datas dos encontros */}
        <div data-animate className="opacity-0 mt-16 glass-card card-glow p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 text-sm text-brand-teal font-medium mb-4">
              <CalendarDays className="w-4 h-4" />
              Datas dos Encontros
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              Todas as <span className="gradient-text">terças-feiras de Junho/2026</span>
            </h3>
            <p className="text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
              <Clock className="w-4 h-4 text-brand-teal" />
              <span>às 19h30 · 3h de duração</span>
              <span className="text-muted-foreground/50">·</span>
              <Video className="w-4 h-4 text-brand-teal" />
              <span>Encontros online ao vivo</span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {encontros.map((enc) => (
              <div
                key={enc.data}
                className="rounded-xl border border-border/50 bg-background/30 p-4 text-center hover:border-brand-teal/40 transition-colors"
              >
                <div className="text-xs text-muted-foreground mb-1">{enc.dia}</div>
                <div className="text-lg font-bold text-foreground">{enc.data}</div>
                <div className="text-sm text-brand-teal font-medium mt-1">19h30 · 3h</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StructureSection;
