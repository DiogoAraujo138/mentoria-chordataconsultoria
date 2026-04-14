import { Briefcase, GraduationCap, MapPin, Users } from "lucide-react";
import logoChordataConsultoria from "@/assets/logos/chordata-consultoria-new.png";
import logoAnalytics from "@/assets/logos/chordata-analytics-new2.png";
import logoMentall from "@/assets/logos/mentall-new.png";
import logoJuridicoPet from "@/assets/logos/juridico-pet-new.png";
import logoVetconnection from "@/assets/logos/vetconnection-new2.png";
import abhvLogo from "@/assets/logos/abhv-pave.jpg";

const stats = [
  { icon: Users, value: "+2.000", label: "Pessoas Movimentadas" },
  { icon: Briefcase, value: "+60", label: "Projetos de Consultoria" },
  { icon: GraduationCap, value: "+300", label: "Pessoas Capacitadas" },
  { icon: MapPin, value: "8", label: "Estados Atendidos" },
];

const brands = [
  {
    name: "Chordata Consultoria",
    description: "Consultoria estratégica em gestão",
    logo: logoChordataConsultoria,
    url: "https://chordataconsultoria.com/",
  },
  {
    name: "Chordata Analytics",
    description: "Inteligência de dados e Power BI",
    logo: logoAnalytics,
    url: "https://chordataanalytics.com.br/",
  },
  {
    name: "MentAll.Vet",
    description: "Saúde mental veterinária",
    logo: logoMentall,
    url: "https://www.mentall.vet/",
  },
  {
    name: "JurídicoPet Digital",
    description: "Assinatura eletrônica e conformidade jurídica digital",
    logo: logoJuridicoPet,
    url: "https://juridicopetdigital.com.br/",
  },
  {
    name: "VetConnection",
    description: "Feiras, congressos e eventos veterinários",
    logo: logoVetconnection,
    url: "https://brasilfeiras.vet/",
  },
];

const WhyChordataSection = () => {
  return (
    <section className="py-24 px-4 section-gradient">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div data-animate className="opacity-0 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Por que a <span className="gradient-text">Chordata</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Somos o maior ecossistema de soluções em gestão para o mercado veterinário do Brasil, com sede no Instituto Caldeira em Porto Alegre e presença em 8 estados.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
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

        {/* Brands Section — "Nossas Marcas" style from v1 */}
        <div data-animate className="opacity-0 text-center mb-14">
          <span className="text-sm text-brand-teal uppercase tracking-wider font-medium">— Nossas Marcas —</span>
          <h3 className="text-2xl md:text-3xl font-bold mt-3 mb-3">
            Marcas do Ecossistema{" "}
            <span className="gradient-text">Chordata</span>
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Cada marca com sua especialidade, todas conectadas por um propósito: transformar a gestão do mercado veterinário.
          </p>
        </div>

        <div data-animate className="opacity-0 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mb-16">
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={brand.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center no-underline"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center p-4 mb-3 transition-all duration-200
                  border shadow-sm group-hover:shadow-md group-hover:scale-105
                  bg-card border-border group-hover:border-brand-blue">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <h4 className="font-heading text-xs md:text-sm font-semibold text-foreground mb-0.5 group-hover:text-brand-blue transition-colors duration-200">
                {brand.name}
              </h4>
              <p className="text-[10px] md:text-xs text-muted-foreground leading-tight">
                {brand.description}
              </p>
            </a>
          ))}
        </div>

        {/* Partner logos */}
        <div data-animate className="opacity-0 text-center">
          <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">Parceiro oficial</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <img src={abhvLogo} alt="PAVE & ABHV" className="h-10 w-auto rounded" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChordataSection;
