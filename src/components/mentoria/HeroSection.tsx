import { useState } from "react";
import CheckoutModal from "./CheckoutModal";

const HeroSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section id="top" className="relative hero-gradient overflow-hidden">
      <CheckoutModal open={open} onOpenChange={setOpen} />
      <div className="max-w-5xl mx-auto px-6 py-24 md:py-32 text-center">
        <span className="section-label">Mentoria RP3</span>

        <h1 className="font-heading text-white mb-6">
          Gestão de clínica veterinária com método, não com achismo
        </h1>

        <p
          className="max-w-2xl mx-auto mb-10"
          style={{ color: "var(--slate-400)", fontSize: "1.125rem", lineHeight: 1.75 }}
        >
          O Método RP3 organiza Processos, Pessoas e Planejamento para que você deixe
          de apagar incêndios e comece a crescer com consistência. Turma Junho 2026.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => setOpen(true)} className="btn-primary">
            Inscrever-me agora
            <span className="material-icons-round" style={{ fontSize: 18 }}>arrow_forward</span>
          </button>
          <a href="#metodo" className="btn-outline-rp3">
            Como funciona o RP3
          </a>
        </div>

        <div className="pt-6">
          <a
            href="https://portalrp3.lovable.app"
            target="_blank"
            rel="noopener"
            className="text-sm"
            style={{ color: "var(--slate-500)" }}
          >
            Já é aluno? Entrar no portal
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
