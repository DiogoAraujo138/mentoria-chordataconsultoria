import { useEffect, useRef } from "react";
import Header from "@/components/mentoria/Header";
import HeroSection from "@/components/mentoria/HeroSection";
import MetodoRP3Section from "@/components/mentoria/MetodoRP3Section";
import AudienceSection from "@/components/mentoria/AudienceSection";
import BenefitsSection from "@/components/mentoria/BenefitsSection";
import MentoresSection from "@/components/mentoria/MentoresSection";
import InvestmentSection from "@/components/mentoria/InvestmentSection";
import WhyChordataSection from "@/components/mentoria/WhyChordataSection";
import CTASection from "@/components/mentoria/CTASection";

const Index = () => {
  const sectionsRef = useRef<HTMLDivElement>(null);

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
    <div ref={sectionsRef} className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "var(--slate-900)" }}>
      <Header />
      <HeroSection />
      <MetodoRP3Section />
      <AudienceSection />
      <BenefitsSection />
      <MentoresSection />
      <InvestmentSection />
      <WhyChordataSection />
      <CTASection />
    </div>
  );
};

export default Index;
