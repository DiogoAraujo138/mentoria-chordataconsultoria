import { useEffect, useRef, useState } from "react";
import HeroSection from "@/components/mentoria/HeroSection";
import BenefitsSection from "@/components/mentoria/BenefitsSection";
import StructureSection from "@/components/mentoria/StructureSection";
import ModulesSection from "@/components/mentoria/ModulesSection";
import WhyChordataSection from "@/components/mentoria/WhyChordataSection";
import CTASection from "@/components/mentoria/CTASection";
import { RegistrationModal } from "@/components/mentoria/RegistrationModal";

const Index = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);
  const [registrationOpen, setRegistrationOpen] = useState(false);

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
      <HeroSection onOpenRegistration={() => setRegistrationOpen(true)} />
      <BenefitsSection />
      <StructureSection />
      <ModulesSection />
      <WhyChordataSection />
      <CTASection onOpenRegistration={() => setRegistrationOpen(true)} />
      <RegistrationModal
        open={registrationOpen}
        onOpenChange={setRegistrationOpen}
      />
    </div>
  );
};

export default Index;
