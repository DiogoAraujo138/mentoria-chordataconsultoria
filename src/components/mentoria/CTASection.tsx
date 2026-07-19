import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, CalendarDays } from "lucide-react";
import chordataLogo from "@/assets/logos/chordata-logo-white.png";
import CheckoutModal from "./CheckoutModal";
import { getProximaTurma } from "@/lib/turma";

const WHATSAPP_DUVIDAS = (turma: string) =>
  `https://wa.me/5551992358827?text=${encodeURIComponent(
    `Olá! Gostaria de mais informações sobre a Mentoria RP3 (turma ${turma}) e como funciona o processo de inscrição.`,
  )}`;

const CTASection = () => {
  const turma = getProximaTurma();

  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[500px] h-[300px] bg-brand-teal/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-16">
        <div data-animate className="opacity-0 glass-card card-glow p-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 text-sm text-brand-teal font-medium">
            <CalendarDays className="w-4 h-4" />
            Próxima Turma
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Início em <span className="gradient-text">{turma.labelExtenso}</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A turma da Mentoria RP3 é limitada a 10 participantes. Garanta sua vaga agora e
            receba um diagnóstico gratuito da sua empresa antes do início.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <CheckoutModal
              trigger={
                <Button
                  size="lg"
                  className="text-base px-8 py-6 bg-brand-teal hover:bg-brand-teal/90 text-primary-foreground animate-pulse-glow"
                >
                  Próxima turma — vagas abertas
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              }
            />
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base px-8 py-6 border-muted-foreground/20"
            >
              <a href={WHATSAPP_DUVIDAS(turma.label)} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 w-5 h-5" />
                Tirar Dúvidas no WhatsApp
              </a>
            </Button>
          </div>
        </div>

        <div data-animate className="opacity-0 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Pronto para aplicar o{" "}
            <span className="gradient-text">Método RP3</span> no seu negócio?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Inscreva-se na turma de <strong>{turma.labelExtenso}</strong> e dê o próximo passo na profissionalização
            da sua gestão veterinária ao lado de outros gestores do setor.
          </p>
          <div className="flex justify-center pt-2">
            <CheckoutModal
              trigger={
                <Button
                  size="lg"
                  className="text-base px-8 py-6 bg-brand-teal hover:bg-brand-teal/90 text-primary-foreground"
                >
                  Iniciar minha inscrição
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              }
            />
          </div>
        </div>
      </div>

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
