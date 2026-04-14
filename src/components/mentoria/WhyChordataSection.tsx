import { MapPin, Award, Briefcase, Globe } from "lucide-react";

const stats = [
  { icon: MapPin, value: "15+", label: "Estados atendidos" },
  { icon: Briefcase, value: "200+", label: "Clientes impactados" },
  { icon: Award, value: "PAVE & ABHV", label: "Parceiro oficial" },
  { icon: Globe, value: "Ecossistema", label: "Integrado (Analytics, MentAll.Vet)" },
];

const WhyChordataSection = () => {
  return (
    <section className="py-24 px-4 section-gradient">
      <div className="max-w-6xl mx-auto">
        <div data-animate className="opacity-0 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Por que a <span className="gradient-text">Chordata</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Somos especialistas em gestão no mercado veterinário, com um ecossistema completo de soluções.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-animate
              className="opacity-0 glass-card p-6 text-center group hover:border-primary/40 transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChordataSection;
