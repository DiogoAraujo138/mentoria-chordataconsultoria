import { MapPin, Award, Briefcase, Globe } from "lucide-react";
import analyticsLogo from "@/assets/logos/chordata-analytics-new2.png";
import mentallLogo from "@/assets/logos/mentall-new.png";
import abhvLogo from "@/assets/logos/abhv-pave.jpg";

const stats = [
  { icon: MapPin, value: "15+", label: "Estados atendidos" },
  { icon: Briefcase, value: "200+", label: "Clientes impactados" },
  { icon: Award, value: "PAVE & ABHV", label: "Parceiro oficial" },
  { icon: Globe, value: "Ecossistema", label: "Integrado" },
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-animate
              className="opacity-0 glass-card card-glow p-6 text-center group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-lg bg-brand-teal/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-teal/20 transition-colors">
                <stat.icon className="w-5 h-5 text-brand-teal" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Ecosystem logos */}
        <div data-animate className="opacity-0 text-center">
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">Ecossistema integrado</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <img src={analyticsLogo} alt="Chordata Analytics" className="h-10 w-auto" />
            <img src={mentallLogo} alt="MentAll.Vet" className="h-10 w-auto" />
            <img src={abhvLogo} alt="PAVE & ABHV" className="h-10 w-auto rounded" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChordataSection;
