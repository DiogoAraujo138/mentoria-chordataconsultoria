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
            Início em <span className="gradient-text">11 de Maio de 2026</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Turmas limitadas a 8 participantes. Garanta sua vaga e receba um diagnóstico gratuito da sua empresa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Button size="lg" className="text-base px-8 py-6 bg-brand-teal hover:bg-brand-teal/90 text-primary-foreground animate-pulse-glow">
              Garantir Minha Vaga
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-base px-8 py-6 border-muted-foreground/20">
              <MessageCircle className="mr-2 w-5 h-5" />
              Falar no WhatsApp
            </Button>
          </div>
        </div>

        {/* CTA final */}
        <div data-animate className="opacity-0 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Pronto para transformar a{" "}
            <span className="gradient-text">gestão do seu negócio</span>?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Junte-se a gestores que já estão mudando a forma de administrar seus negócios veterinários.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-border/50">
        <div className="flex flex-col items-center gap-4">
          <img src={chordataLogo} alt="Chordata Consultoria" className="h-8 w-auto opacity-50" />
          <p className="text-sm text-muted-foreground/50">
            © {new Date().getFullYear()} Chordata Consultoria. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
