import { Building2, Users, Stethoscope } from "lucide-react";

const audiences = [
  {
    icon: Building2,
    title: "Donos de Clínicas e Hospitais",
    description:
      "Proprietários e sócios que precisam profissionalizar a gestão e escalar seus resultados com inteligência.",
  },
  {
    icon: Users,
    title: "Gestores e Gerentes",
    description:
      "Profissionais em cargos de liderança que buscam ferramentas práticas para gerir equipes e processos.",
  },
  {
    icon: Stethoscope,
    title: "Veterinários Empreendedores",
    description:
      "Médicos veterinários que empreendem ou desejam empreender e precisam dominar a gestão do negócio.",
  },
];

const AudienceSection = () => {
  return (
    <section className="py-24 px-4 section-gradient">
      <div className="max-w-6xl mx-auto">
        <div data-animate className="opacity-0 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Para quem é essa <span className="gradient-text">mentoria</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Se você atua no mercado veterinário e quer elevar o nível da sua gestão, esse programa é para você.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {audiences.map((item, i) => (
            <div
              key={item.title}
              data-animate
              className="opacity-0 glass-card p-8 hover:border-primary/40 transition-all duration-300 group"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
