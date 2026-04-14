import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import chordataLogo from "@/assets/logos/chordata-logo-white.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-teal/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-brand-blue/6 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-teal/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Logo — destaque grande */}
        <div className="flex justify-center mb-6">
          <img src={chordataLogo} alt="Chordata Consultoria" className="h-20 md:h-28 lg:h-32 w-auto" />
        </div>


        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
          Mentoria em{" "}
          <span className="gradient-text">Gestão Clínica</span>
          <br />
          e Hospitalar
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Uma experiência imersiva com especialistas em gestão veterinária.
          Networking, conhecimento prático e ferramentas prontas para transformar sua empresa.
        </p>

        {/* Gradient divider */}
        <div className="gradient-divider max-w-xs mx-auto rounded-full" />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="text-base px-8 py-6 bg-brand-teal hover:bg-brand-teal/90 text-primary-foreground animate-pulse-glow">
            <a href="https://wa.me/5551976222707?text=Olá! Tenho interesse na Mentoria em Gestão Clínica e Hospitalar" target="_blank" rel="noopener noreferrer">
              Garantir Minha Vaga
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <Button variant="outline" size="lg" className="text-base px-8 py-6 border-muted-foreground/20" onClick={() => document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' })}>
            Saiba Mais
          </Button>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">4</span>
            <span>Encontros em Grupo</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">2</span>
            <span>Encontros Individuais</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">10</span>
            <span>Vagas por Turma</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
