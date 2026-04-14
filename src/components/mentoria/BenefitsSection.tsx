import { Network, GraduationCap, Percent, ClipboardCheck, FileText, Video } from "lucide-react";

const benefits = [
  {
    icon: Network,
    title: "Networking de Alto Impacto",
    description: "Conecte-se com gestores do mercado veterinário e troque experiências reais.",
  },
  {
    icon: GraduationCap,
    title: "Especialistas em Gestão",
    description: "Encontros conduzidos por consultores com experiência prática no setor.",
  },
  {
    icon: Percent,
    title: "Descontos no Ecossistema",
    description: "Acesso a condições exclusivas em ferramentas e serviços da Chordata.",
  },
  {
    icon: ClipboardCheck,
    title: "Diagnóstico Gratuito",
    description: "Receba um diagnóstico completo da sua empresa antes de começar a mentoria.",
  },
  {
    icon: FileText,
    title: "Materiais Facilitadores",
    description: "Modelos prontos de POPs, fluxogramas e planilhas para aplicar imediatamente.",
  },
  {
    icon: Video,
    title: "Treinamentos Gravados",
    description: "Acesso a conteúdos complementares gravados para revisitar quando quiser.",
  },
];

const BenefitsSection = () => {
  return (
    <section className="py-24 px-4 section-gradient">
      <div className="max-w-6xl mx-auto">
        <div data-animate className="opacity-0 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O que você vai <span className="gradient-text">receber</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Muito mais do que encontros: uma experiência completa para transformar sua gestão.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              data-animate
              className="opacity-0 glass-card card-glow p-6 group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-brand-teal/10 flex items-center justify-center mb-4 group-hover:bg-brand-teal/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-brand-teal" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
