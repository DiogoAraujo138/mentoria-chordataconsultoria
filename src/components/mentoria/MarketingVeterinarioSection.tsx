import { Megaphone, Target, TrendingUp, Users, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProximaTurma } from "@/lib/turma";
import { whatsappVagaUrl } from "@/lib/contact";

const strategies = [
  {
    icon: Target,
    title: "Posicionamento de marca",
    description:
      "Defina o que torna sua clínica ou hospital veterinário único. Um posicionamento claro atrai o público certo e reduz a dependência de disputa por preço.",
  },
  {
    icon: Users,
    title: "Jornada do cliente veterinário",
    description:
      "Mapeie o caminho do tutor desde a primeira busca até o agendamento e a fidelização. Cada ponto de contato é uma oportunidade de comunicação.",
  },
  {
    icon: TrendingUp,
    title: "Indicadores de marketing",
    description:
      "Acompanhe CAC, taxa de agendamento, recorrência e ticket médio para investir nos canais que realmente trazem retorno ao negócio.",
  },
  {
    icon: MessageCircle,
    title: "Canais de comunicação",
    description:
      "Otimize WhatsApp, redes sociais, e-mail e site para converter mais leads em agendamentos sem perder a humanização do atendimento.",
  },
];

const MarketingVeterinarioSection = () => {
  const turma = getProximaTurma();
  return (
    <section className="py-24 px-4 section-gradient">
      <div className="max-w-6xl mx-auto">
        <div data-animate className="opacity-0 text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 text-sm text-brand-teal font-medium mb-4">
            <Megaphone className="w-4 h-4" />
            Marketing Veterinário
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Como o <span className="gradient-text">marketing veterinário</span> aumenta o faturamento da sua clínica
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Marketing veterinário não é apenas postar nas redes sociais. É estratégia, processos e dados aplicados ao
            dia a dia da clínica ou hospital veterinário — exatamente o que desenvolvemos no módulo de Gestão Comercial
            da Mentoria RP3.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {strategies.map((item, i) => (
            <div
              key={item.title}
              data-animate
              className="opacity-0 glass-card card-glow p-8 group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-brand-teal/10 flex items-center justify-center mb-4 group-hover:bg-brand-teal/20 transition-colors">
                <item.icon className="w-6 h-6 text-brand-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        <div data-animate className="opacity-0 glass-card card-glow p-8 md:p-10 text-center space-y-6">
          <h3 className="text-2xl md:text-3xl font-bold">
            Marketing + Gestão Comercial = <span className="gradient-text">resultado previsível</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Na Mentoria RP3 você aprende a unir estratégias de marketing veterinário com processos comerciais sólidos:
            atendimento treinado, scripts de conversão, acompanhamento de leads e metas claras para a equipe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-base px-8 py-6 bg-brand-teal hover:bg-brand-teal/90 text-primary-foreground">
              <a href={whatsappVagaUrl(turma.label)} target="_blank" rel="noopener noreferrer">
                Quero aplicar na minha clínica
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingVeterinarioSection;
