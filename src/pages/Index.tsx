import { useEffect, useRef } from "react";
import { toast } from "sonner";
import HeroSection from "@/components/mentoria/HeroSection";
import BenefitsSection from "@/components/mentoria/BenefitsSection";
import MetodoRP3Section from "@/components/mentoria/MetodoRP3Section";
import StructureSection from "@/components/mentoria/StructureSection";
import ModulesSection from "@/components/mentoria/ModulesSection";
import MarketingVeterinarioSection from "@/components/mentoria/MarketingVeterinarioSection";
import WhyChordataSection from "@/components/mentoria/WhyChordataSection";
import MentoresSection from "@/components/mentoria/MentoresSection";
import InvestmentSection from "@/components/mentoria/InvestmentSection";
import CTASection from "@/components/mentoria/CTASection";

const Index = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pagamento = params.get("pagamento");
    if (pagamento === "sucesso") {
      toast.success("Pagamento recebido! Em breve a equipe Chordata entra em contato.");
    } else if (pagamento === "cancelado") {
      toast.message("Pagamento cancelado. Você pode tentar novamente quando quiser.");
    } else if (pagamento === "expirado") {
      toast.message("O link de pagamento expirou. Abra novamente o formulário de inscrição.");
    }
    if (pagamento) {
      params.delete("pagamento");
      const next = `${window.location.pathname}${params.toString() ? `?${params}` : ""}${window.location.hash}`;
      window.history.replaceState({}, "", next);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            entry.target.classList.remove("opacity-0");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    const elements = sectionsRef.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionsRef} className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <BenefitsSection />
      <MetodoRP3Section />
      <StructureSection />
      <ModulesSection />
      <MarketingVeterinarioSection />
      <WhyChordataSection />
      <MentoresSection />
      <InvestmentSection />
      <CTASection />
    </div>
  );
};

export default Index;
