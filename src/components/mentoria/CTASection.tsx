import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, CalendarDays } from "lucide-react";
import chordataLogo from "@/assets/logos/chordata-logo-white.png";

const CTASection = () => {
  return (
    <section className="py-24 px-4 relative">
      {/* Glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] bg-brand-teal/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-16">
        {/* Próxima turma */}
        <div data-animate className="opacity-0 glass-card card-glow p-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 text-sm text-brand-teal font-medium">
            <CalendarDays className="w-4 h-4" />
            Próxima Turma
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Início em <span className="gradient-text">Junho de 2026</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A turma da Mentoria RP3 é limitada a 10 participantes. Garanta sua vaga agora e
            receba um diagnóstico gratuito da sua empresa antes do início.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button asChild size="lg" className="text-base px-8 py-6 bg-brand-teal hover:bg-brand-teal/90 text-primary-foreground animate-pulse-glow">
              <a href="https://wa.me/5551992358827?text=Ol%C3%A1!%20Quero%20garantir%20minha%20vaga%20na%20Mentoria%20RP3%20%E2%80%94%20Gest%C3%A3o%20Cl%C3%ADnica%20e%20Hospitalar%20Veterin%C3%A1ria%20(turma%20de%20Junho%2F2026).%20Pode%20me%20enviar%20os%20pr%C3%B3ximos%20passos%20para%20inscri%C3%A7%C3%A3o%3F" target="_blank" rel="noopener noreferrer">
                Próxima turma — vagas abertas
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 border-muted-foreground/20">
              <a href="https://wa.me/5551992358827?text=Ol%C3%A1!%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es%20sobre%20a%20Mentoria%20RP3%20(turma%20de%20Junho%2F2026)%20e%20como%20funciona%20o%20processo%20de%20inscri%C3%A7%C3%A3o." target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 w-5 h-5" />
                Tirar Dúvidas no WhatsApp
              </a>
            </Button>
          </div>
        </div>

        {/* CTA final */}
        <div data-animate className="opacity-0 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Pronto para aplicar o{" "}
            <span className="gradient-text">Método RP3</span> no seu negócio?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Inscreva-se na turma de <strong>Junho de 2026</strong> e dê o próximo passo na profissionalização
            da sua gestão veterinária ao lado de outros gestores do setor.
          </p>
          <div className="flex justify-center pt-2">
            <Button asChild size="lg" className="text-base px-8 py-6 bg-brand-teal hover:bg-brand-teal/90 text-primary-foreground">
              <a href="https://wa.me/5551992358827?text=Ol%C3%A1!%20Quero%20garantir%20minha%20vaga%20na%20Mentoria%20RP3%20%E2%80%94%20Gest%C3%A3o%20Cl%C3%ADnica%20e%20Hospitalar%20Veterin%C3%A1ria%20(turma%20de%20Junho%2F2026).%20Pode%20me%20enviar%20os%20pr%C3%B3ximos%20passos%20para%20inscri%C3%A7%C3%A3o%3F" target="_blank" rel="noopener noreferrer">
                Iniciar minha inscrição
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-border/50">
        <div className="flex flex-col items-center gap-4">
          <img src={chordataLogo} alt="Chordata Consultoria" className="h-8 w-auto opacity-50" />
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Chordata Consultoria. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
