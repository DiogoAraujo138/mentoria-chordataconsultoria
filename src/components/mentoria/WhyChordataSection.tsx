import { Briefcase, GraduationCap, MapPin, Users } from "lucide-react";
import analyticsLogo from "@/assets/logos/chordata-analytics-new2.png";
import mentallLogo from "@/assets/logos/mentall-new.png";
import abhvLogo from "@/assets/logos/abhv-pave.jpg";

const stats = [
  { icon: Users, value: "+2.000", label: "Pessoas Movimentadas" },
  { icon: Briefcase, value: "+60", label: "Projetos de Consultoria" },
  { icon: GraduationCap, value: "+300", label: "Pessoas Capacitadas" },
  { icon: MapPin, value: "8", label: "Estados Atendidos" },
];

const ecosystem = [
  { name: "Chordata Consultoria", desc: "Estratégia e Gestão" },
  { name: "MentAll.Vet", desc: "Saúde Mental Veterinária" },
  { name: "Chordata Analytics", desc: "Inteligência de Dados" },
  { name: "JurídicoPet Digital", desc: "Conformidade Jurídica" },
  { name: "VetConnection", desc: "Feiras e Eventos" },
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
            Somos o maior ecossistema de soluções em gestão para o mercado veterinário do Brasil, com sede no Instituto Caldeira em Porto Alegre e presença em 8 estados.
          </p>
        </div>

        {/* Stats grid 2x2 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              data-animate
              className="opacity-0 glass-card card-glow p-8 text-center group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-teal/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-teal/20 transition-colors">
                <stat.icon className="w-6 h-6 text-brand-teal" />
              </div>
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Ecosystem solutions */}
        <div data-animate className="opacity-0 mb-12">
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider text-center">
            Ecossistema integrado de soluções
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {ecosystem.map((item) => (
              <div key={item.name} className="glass-card p-4 text-center">
                <div className="text-sm font-semibold mb-1">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Partner logos */}
        <div data-animate className="opacity-0 text-center">
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">Parceiro oficial</p>
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
