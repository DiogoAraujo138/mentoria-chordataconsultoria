import { Button } from "@/components/ui/button";
import { Check, CreditCard, MessageCircle, Sparkles, Tag } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5551992358827?text=Ol%C3%A1%20Mikael!%20Tenho%20interesse%20na%20Mentoria%20RP3%20%E2%80%94%20Gest%C3%A3o%20Cl%C3%ADnica%20e%20Hospitalar%20Veterin%C3%A1ria%20(turma%20Junho%2F2026).%20Pode%20me%20enviar%20mais%20informa%C3%A7%C3%B5es%20sobre%20o%20investimento%20e%20inscri%C3%A7%C3%A3o%3F";

const includes = [
  "20h de treinamento ao vivo com a equipe Chordata",
  "4h de mentoria individual com diagnóstico do seu negócio",
  "Materiais de diagnóstico gratuitos da Chordata",
  "Entregáveis e materiais de apoio durante as aulas",
  "Acesso aos mentores convidados e cases reais do mercado",
  "Aplicação prática do Método RP3 (Processos · Pessoas · Planejamento)",
];

const InvestmentSection = () => {
  return (
    <section id="investimento" className="py-24 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-brand-teal/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-brand-blue/8 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center space-y-4 mb-14" data-animate>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 text-sm text-brand-teal font-medium">
            <Tag className="w-4 h-4" />
            Investimento
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Um investimento na <span className="gradient-text">profissionalização</span> do seu negócio
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Toda a metodologia, mentoria individual e materiais entregáveis da Chordata em um único programa.
          </p>
        </div>

        {/* Card principal */}
        <div
          data-animate
          className="opacity-0 relative grid lg:grid-cols-[1.1fr_1fr] rounded-3xl border border-brand-teal/30 bg-gradient-to-br from-card via-card to-brand-teal/5 overflow-hidden shadow-[0_30px_80px_-30px_hsl(var(--brand-teal)/0.4)]"
        >
          {/* Glow interno */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-teal/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

          {/* Lado esquerdo: preço */}
          <div className="relative p-8 md:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border/50">
            <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-brand-blue/10 text-xs text-brand-blue font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Turma Junho/2026 · vagas limitadas
            </div>

            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground mb-3">
              Investimento total
            </p>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-semibold text-muted-foreground">R$</span>
              <span className="text-6xl md:text-7xl font-bold gradient-text leading-none">
                2.300
              </span>
            </div>

            <p className="text-base text-foreground/90 mb-1">
              ou em até <strong className="text-brand-teal">6x de R$ 383,33</strong> sem juros
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2 mb-8">
              <CreditCard className="w-4 h-4" />
              Parcelamento sem juros no cartão
            </p>

            <div className="flex flex-col gap-3">
              <Button
                asChild
                size="lg"
                className="text-base px-6 py-6 bg-brand-teal hover:bg-brand-teal/90 text-primary-foreground animate-pulse-glow"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Quero garantir minha vaga
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base px-6 py-6 border-muted-foreground/20"
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  Falar com Mikael no WhatsApp
                </a>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-5 text-center">
              Atendimento direto com o sócio-diretor da Chordata.
            </p>
          </div>

          {/* Lado direito: o que está incluso */}
          <div className="relative p-8 md:p-12 bg-background/30">
            <p className="text-xs uppercase tracking-[0.2em] text-brand-teal font-semibold mb-5">
              O que está incluso
            </p>
            <h3 className="text-2xl font-bold mb-6">
              Tudo o que você recebe na mentoria
            </h3>

            <ul className="space-y-4">
              {includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-brand-teal/15 border border-brand-teal/30 flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-brand-teal" />
                  </span>
                  <span className="text-sm md:text-base text-foreground/90 leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reforço final */}
        <p
          data-animate
          className="opacity-0 text-center text-sm text-muted-foreground mt-8 max-w-xl mx-auto"
        >
          Vagas limitadas a 10 participantes por turma para garantir a qualidade da mentoria
          individual e do acompanhamento próximo da equipe Chordata.
        </p>
      </div>
    </section>
  );
};

export default InvestmentSection;
