import { useEffect, useRef } from "react";
import HeroSection from "@/components/mentoria/HeroSection";
import AudienceSection from "@/components/mentoria/AudienceSection";
import ModulesSection from "@/components/mentoria/ModulesSection";
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
    <div ref={sectionsRef} className="min-h-screen bg-background overflow-x-hidden">
      <HeroSection />
      <AudienceSection />
      <ModulesSection />
      <WhyChordataSection />
      <CTASection />
    </div>
  );
};

export default Index;
