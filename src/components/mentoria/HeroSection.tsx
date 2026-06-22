import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, LogIn } from "lucide-react";
import chordataLogo from "@/assets/logos/chordata-logo-white.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
      {/* Fixed Portal do Aluno button */}
      <a
        href="https://portalrp3.lovable.app"
        target="_blank"
        rel="noopener"
        className="fixed top-4 right-4 z-50 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 text-brand-teal text-sm font-medium hover:bg-brand-teal/20 transition-colors backdrop-blur-sm"
      >
        <LogIn className="w-4 h-4" />
        Portal do Aluno
      </a>
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
          Mentoria <span className="gradient-text">RP3</span>
          <br />
          Gestão Clínica e Hospitalar Veterinária
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Uma imersão baseada no Método RP3 da Chordata Consultoria — a mesma metodologia
          aplicada nos nossos projetos, integrando <strong>Processos, Pessoas e Planejamento</strong> para
          transformar a gestão do seu negócio veterinário.
        </p>

        {/* Gradient divider */}
        <div className="gradient-divider max-w-xs mx-auto rounded-full" />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button asChild size="lg" className="text-base px-8 py-6 bg-brand-teal hover:bg-brand-teal/90 text-primary-foreground animate-pulse-glow">
            <a href="https://wa.me/5551992358827?text=Ol%C3%A1!%20Quero%20garantir%20minha%20vaga%20na%20Mentoria%20RP3%20%E2%80%94%20Gest%C3%A3o%20Cl%C3%ADnica%20e%20Hospitalar%20Veterin%C3%A1ria%20(turma%20de%20Junho%2F2026).%20Pode%20me%20enviar%20os%20pr%C3%B3ximos%20passos%20para%20inscri%C3%A7%C3%A3o%3F" target="_blank" rel="noopener noreferrer">
              Próxima turma — vagas abertas
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
          <Button variant="outline" size="lg" className="text-base px-8 py-6 border-muted-foreground/20" onClick={() => document.getElementById('beneficios')?.scrollIntoView({ behavior: 'smooth' })}>
            Saiba Mais
          </Button>
        </div>

        {/* Discreet student portal link */}
        <div className="pt-2">
          <a
            href="https://portalrp3.lovable.app"
            target="_blank"
            rel="noopener"
            className="text-sm text-muted-foreground hover:text-brand-teal transition-colors"
          >
            Já é aluno? Entrar no portal →
          </a>
        </div>


        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">20h</span>
            <span>de Treinamento</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">4h</span>
            <span>Mentoria Individual</span>
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
