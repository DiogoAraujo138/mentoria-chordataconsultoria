import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp, Users, Sparkles } from "lucide-react";
import marianaBrinoImg from "@/assets/mentores/mariana-brino.jpeg";
import thalesImg from "@/assets/mentores/thales.png";
import elizImg from "@/assets/mentores/eliz.png";
import mikaelImg from "@/assets/mentores/mikael.png";
import diogoImg from "@/assets/mentores/diogo.png";

type Mentor = {
  name: string;
  role: string;
  image?: string;
  shortBio: string;
  fullBio: string[];
};

const chordataTeam: Mentor[] = [
  {
    name: "Mikael Nunes Cattani",
    role: "Administrador · Sócio-Diretor Chordata",
    image: mikaelImg,
    shortBio:
      "12 anos de experiência no mercado veterinário. Sócio-Diretor da Chordata e cofundador de Vet Connection, Mentall.vet e DescomplicaVet.",
    fullBio: [
      "Administrador, MBA em Consultoria Empresarial e MBA em Gestão de Clínicas e Hospitais Veterinários.",
      "12 anos de experiência no Mercado Veterinário.",
      "Sócio e Diretor na Chordata Consultoria, especializada em clínicas e hospitais veterinários.",
      "Cofundador e Sócio da Feira Vet Connection.",
      "Cofundador e Sócio da plataforma Mentall.vet.",
      "Cofundador do DescomplicaVet, startup de Tele Interconsulta entre Veterinários.",
    ],
  },
  {
    name: "Thales Altieri Rodrigues",
    role: "Administrador · Cofundador e Diretor Chordata",
    image: thalesImg,
    shortBio:
      "+6 anos no mercado veterinário e +8 em Gente & Gestão. Especialista em processos, fluxos de trabalho e eficiência operacional.",
    fullBio: [
      "Administrador (CRA Nº RS-055120/O), pós-graduado em Business Analytics.",
      "+6 anos de experiência no Mercado Veterinário.",
      "+8 anos de atuação nas áreas de Recursos Humanos, Gente & Gestão.",
      "Especialista em Gestão de Processos, fluxos de trabalho e eficiência operacional.",
      "Cofundador, diretor e consultor na Chordata Consultoria e Assessoria, especializada em clínicas e hospitais veterinários.",
      "Cofundador do Chordata Analytics, plataforma de análise de dados, indicadores e BI para o mercado veterinário.",
      "Cofundador, sócio, diretor de operações e consultor da Mentall Ltda e da plataforma Mentall.Vet.",
      "Cofundador, sócio e diretor financeiro da Feira e Congresso Vet Connection.",
      "Cofundador e sócio da plataforma Jurídico Pet Digital.",
    ],
  },
  {
    name: "Eliz Modena",
    role: "Psicóloga Organizacional (CRP 07/40461)",
    image: elizImg,
    shortBio:
      "+10 anos em RH e Psicologia Organizacional. Consultora Chordata e Psicóloga Organizacional da Mentall.Vet.",
    fullBio: [
      "Psicóloga (CRP 07/40461), pós-graduada em Gestão de Pessoas.",
      "Mais de 10 anos de experiência em Recursos Humanos e Psicologia Organizacional.",
      "Consultora na Chordata Consultoria.",
      "Psicóloga Organizacional da Mentall.Vet.",
      "Experiência em todos os subsistemas de Recursos Humanos.",
      "Facilitadora de treinamentos, desenvolvimento de equipes e comunicação organizacional.",
    ],
  },
  {
    name: "Diogo Araujo",
    role: "Consultor & Analista de Dados",
    image: diogoImg,
    shortBio:
      "Especialista em automação de processos e análise de dados aplicada ao setor veterinário. Cria dashboards e ferramentas de inteligência operacional.",
    fullBio: [
      "Graduação em Gestão Financeira | Pós-Graduação em Análise de Dados.",
      "3 anos de experiência no Mercado Veterinário.",
      "Consultor e Desenvolvedor de Soluções na Chordata Consultoria, especializado em automação de processos e análise de dados.",
      "Responsável pela criação de dashboards, automação de processos e ferramentas de inteligência operacional aplicadas ao setor veterinário.",
      "Trabalha para que gestores de clínicas e hospitais tomem decisões com base em dados reais do próprio negócio.",
    ],
  },
];

const guestMentors: Mentor[] = [
  {
    name: "Mariana Brino",
    role: "Médica Veterinária",
    image: marianaBrinoImg,
    shortBio:
      "Especializada em Clínica de Pequenos Animais e Gestão de Clínicas e Hospitais Veterinários. Formação ULBRA, EQUALIS, FAMESP, Harvard e Disney.",
    fullBio: [
      "Médica Veterinária especializada em Clínica de Pequenos Animais e Gestão de Clínicas e Hospitais Veterinários.",
      "Formação:",
      "• Bacharelado em Medicina Veterinária — ULBRA",
      "• Pós-Graduação Lato Sensu em Clínica de Pequenos Animais — EQUALIS",
      "• MBA em Gestão de Clínicas e Hospitais Veterinários — FAMESP",
      "• Pós MBA Mercado Pet — FAMESP",
      "Cursos adicionais:",
      "• MI Emergência e Intensivismo — INTENSIVET",
      "• Business for All — Harvard Business Publishing",
      "• Magia do Mundo dos Negócios — Disney",
    ],
  },
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/* ---------- Card: Equipe Chordata (vertical, compacto) ---------- */
const TeamCard = ({ mentor }: { mentor: Mentor }) => (
  <div
    className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-brand-teal/40 transition-all duration-300 hover:shadow-[0_10px_40px_-15px_hsl(var(--brand-teal)/0.3)] hover:-translate-y-1"
    data-animate
  >
    <div className="relative mb-5">
      <div className="absolute -inset-1 bg-gradient-to-br from-brand-teal/30 to-brand-blue/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative w-28 h-28 rounded-full overflow-hidden bg-muted border-2 border-brand-teal/20 group-hover:border-brand-teal/60 transition-colors">
        {mentor.image ? (
          <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
            {getInitials(mentor.name)}
          </div>
        )}
      </div>
    </div>

    <h3 className="text-lg font-semibold mb-1">{mentor.name}</h3>
    <p className="text-sm text-brand-teal mb-3">{mentor.role}</p>
    <p className="text-sm text-muted-foreground/90 leading-relaxed mb-5 flex-1">
      {mentor.shortBio}
    </p>

    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="mt-auto">
          Ver mais
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{mentor.name}</DialogTitle>
          <DialogDescription>{mentor.role}</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          {mentor.fullBio.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  </div>
);

/* ---------- Card: Convidados (horizontal, spotlight) ---------- */
const GuestCard = ({ mentor }: { mentor: Mentor }) => (
  <div
    className="group relative flex flex-col sm:flex-row gap-6 items-center sm:items-stretch p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-blue/5 via-card to-brand-teal/5 border border-brand-blue/20 hover:border-brand-blue/50 transition-all duration-300 hover:shadow-[0_20px_60px_-20px_hsl(var(--brand-blue)/0.35)] overflow-hidden"
    data-animate
  >
    <div className="absolute -top-16 -right-16 w-48 h-48 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />

    <div className="relative shrink-0">
      <div className="absolute -inset-1.5 bg-gradient-to-br from-brand-blue/40 to-brand-teal/30 rounded-2xl blur-md opacity-60" />
      <div className="relative w-40 h-52 sm:w-48 sm:h-60 rounded-2xl overflow-hidden bg-muted border border-brand-blue/30">
        {mentor.image ? (
          <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-muted-foreground">
            {getInitials(mentor.name)}
          </div>
        )}
      </div>
    </div>

    <div className="relative flex-1 flex flex-col text-center sm:text-left">
      <Badge
        variant="outline"
        className="self-center sm:self-start mb-3 border-brand-blue/40 text-brand-blue gap-1.5"
      >
        <Sparkles className="w-3 h-3" />
        Mentora Convidada
      </Badge>
      <h3 className="text-xl sm:text-2xl font-bold mb-1">{mentor.name}</h3>
      <p className="text-sm text-brand-blue mb-3">{mentor.role}</p>
      <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
        {mentor.shortBio}
      </p>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="self-center sm:self-start border-brand-blue/40 text-brand-blue hover:bg-brand-blue/10 hover:text-brand-blue"
          >
            Ver perfil completo
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{mentor.name}</DialogTitle>
            <DialogDescription>{mentor.role}</DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
            {mentor.fullBio.map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  </div>
);

const MentoresSection = () => {
  const [showAllGuests, setShowAllGuests] = useState(false);

  // Estrutura preparada para receber novos convidados
  const visibleGuests = guestMentors;
  const extraGuests: Mentor[] = [];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-brand-teal/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-20">
        {/* Cabeçalho geral */}
        <div className="text-center space-y-4" data-animate>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 text-sm text-brand-teal font-medium">
            <Users className="w-4 h-4" />
            Mentores
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Quem vai te <span className="gradient-text">mentorar</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A equipe da Chordata Consultoria e parceiros convidados que vivem a
            gestão clínica e hospitalar veterinária na prática — todos os dias,
            em projetos reais.
          </p>
        </div>

        {/* Equipe Chordata */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4" data-animate>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-teal font-semibold mb-2">
                Equipe Chordata
              </p>
              <h3 className="text-2xl md:text-3xl font-bold">
                Os consultores por trás do Método RP3
              </h3>
            </div>
            <div className="hidden sm:block h-px flex-1 max-w-xs bg-gradient-to-r from-brand-teal/40 to-transparent ml-6 mb-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {chordataTeam.map((m) => (
              <TeamCard key={m.name} mentor={m} />
            ))}
          </div>
        </div>

        {/* Convidados */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4" data-animate>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-blue font-semibold mb-2">
                Convidados Especiais
              </p>
              <h3 className="text-2xl md:text-3xl font-bold">
                Vozes que somam ao Método RP3
              </h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                Profissionais de referência convidados para enriquecer a mentoria
                com experiências e perspectivas complementares.
              </p>
            </div>
            <div className="hidden sm:block h-px flex-1 max-w-xs bg-gradient-to-r from-brand-blue/40 to-transparent ml-6 mb-3" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {visibleGuests.map((m) => (
              <GuestCard key={m.name} mentor={m} />
            ))}
            {showAllGuests && extraGuests.map((m) => <GuestCard key={m.name} mentor={m} />)}
          </div>

          {extraGuests.length > 0 ? (
            <div className="flex justify-center pt-2">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowAllGuests((v) => !v)}
                className="gap-2"
              >
                {showAllGuests ? (
                  <>
                    Mostrar menos <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Ver mais convidados <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          ) : (
            <p className="text-center text-sm text-muted-foreground/70 pt-2">
              Novos mentores convidados serão anunciados em breve.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default MentoresSection;
