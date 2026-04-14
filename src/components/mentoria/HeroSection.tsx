import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground">
          <Sparkles className="w-4 h-4 text-primary" />
          <span>Novo Produto — Chordata Consultoria</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
          Mentoria para{" "}
          <span className="gradient-text">Gestores</span>
          <br />
          do Mercado Veterinário
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          4 encontros práticos para transformar a gestão do seu negócio veterinário.
          Decisões baseadas em dados, pessoas e bem-estar.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" className="text-base px-8 py-6 animate-pulse-glow">
            Quero Participar
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-base px-8 py-6 border-muted-foreground/20">
            Saiba Mais
          </Button>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">4</span>
            <span>Encontros</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">100%</span>
            <span>Prático</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">Online</span>
            <span>& Ao vivo</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
