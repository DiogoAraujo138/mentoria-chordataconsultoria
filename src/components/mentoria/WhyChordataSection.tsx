import logoChordataConsultoria from "@/assets/logos/chordata-consultoria-new.png";
import logoAnalytics from "@/assets/logos/chordata-analytics-new2.png";
import logoMentall from "@/assets/logos/mentall-new.png";
import logoJuridicoPet from "@/assets/logos/juridico-pet-new.png";
import logoVetconnection from "@/assets/logos/vetconnection-new2.png";

const brands = [
  { name: "Chordata Consultoria", logo: logoChordataConsultoria, url: "https://chordataconsultoria.com/" },
  { name: "Chordata Analytics", logo: logoAnalytics, url: "https://chordataanalytics.com.br/" },
  { name: "MentAll.Vet", logo: logoMentall, url: "https://www.mentall.vet/" },
  { name: "JurídicoPet Digital", logo: logoJuridicoPet, url: "https://juridicopetdigital.com.br/" },
  { name: "VetConnection", logo: logoVetconnection, url: "https://brasilfeiras.vet/" },
];

const WhyChordataSection = () => {
  return (
    <section id="sobre" className="py-24 px-6" style={{ backgroundColor: "var(--slate-900)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-14 items-start mb-16">
          <div data-animate className="opacity-0">
            <span className="section-label">Quem faz</span>
            <h2 className="text-white mb-6">
              A Chordata existe para que boas clínicas se tornem negócios sustentáveis
            </h2>
          </div>
          <div data-animate className="opacity-0 space-y-5" style={{ color: "var(--slate-400)", fontSize: "1.0625rem", lineHeight: 1.8 }}>
            <p>
              Somos uma consultoria especializada em gestão de clínicas e hospitais
              veterinários. Não vendemos metodologia de prateleira: trabalhamos com o que é
              real na rotina de quem atende pets todos os dias. O Método RP3 é resultado de
              anos acompanhando de dentro as operações de diferentes tipos de
              estabelecimentos, do ambulatório pequeno ao hospital de referência.
            </p>
            <p>
              Chordata é o nome de um filo. O que une todos os animais vertebrados.
              Escolhemos esse nome porque acreditamos que estrutura é o que sustenta
              qualquer coisa que queira crescer.
            </p>
          </div>
        </div>

        <div data-animate className="opacity-0 pt-10" style={{ borderTop: "1px solid rgba(51,65,85,0.4)" }}>
          <p className="section-label">Ecossistema Chordata</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 mt-4">
            {brands.map((brand) => (
              <a
                key={brand.name}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center no-underline"
              >
                <div
                  className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center p-4 mb-3 transition-all duration-200"
                  style={{
                    background: "rgba(30,41,59,0.5)",
                    border: "1px solid rgba(51,65,85,0.5)",
                  }}
                >
                  <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" loading="lazy" />
                </div>
                <h4 className="font-heading text-xs md:text-sm font-semibold" style={{ color: "var(--slate-300)" }}>
                  {brand.name}
                </h4>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChordataSection;
