import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import chordataLogo from "@/assets/logos/chordata-logo-white.png";

const CTASection = () => {
  return (
    <section className="py-24 px-4 relative">
      {/* Glow effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] bg-brand-teal/5 rounded-full blur-[100px]" />
      </div>

      <div data-animate className="opacity-0 relative z-10 max-w-3xl mx-auto text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Pronto para transformar a{" "}
          <span className="gradient-text">gestão do seu negócio</span>?
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Entre em contato para garantir sua vaga na próxima turma da mentoria Chordata.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" className="text-base px-8 py-6 bg-brand-teal hover:bg-brand-teal/90 text-primary-foreground">
            Quero Participar
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="text-base px-8 py-6 border-muted-foreground/20">
            <MessageCircle className="mr-2 w-5 h-5" />
            Falar no WhatsApp
          </Button>
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
