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
import { ChevronDown, ChevronUp, Users } from "lucide-react";
import marianaBrinoImg from "@/assets/mentores/mariana-brino.jpeg";
import thalesImg from "@/assets/mentores/thales.png";
import elizImg from "@/assets/mentores/eliz.png";

type Mentor = {
  name: string;
  role: string;
  affiliation: "Equipe Chordata" | "Convidado(a)";
  image?: string;
  shortBio: string;
  fullBio: string[];
  highlighted?: boolean;
};

const mentors: Mentor[] = [
  {
    name: "Mikael Nunes Cattani",
    role: "Administrador · Sócio-Diretor Chordata",
    affiliation: "Equipe Chordata",
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
    name: "Diogo Araujo",
    role: "Consultor & Analista de Dados",
    affiliation: "Equipe Chordata",
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
  {
    name: "Eliz Modena",
    role: "Psicóloga Organizacional (CRP 07/40461)",
    affiliation: "Equipe Chordata",
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
    name: "Thales Altieri Rodrigues",
    role: "Administrador · Cofundador e Diretor Chordata",
    affiliation: "Equipe Chordata",
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
    name: "Mariana Brino",
    role: "Médica Veterinária",
    affiliation: "Convidado(a)",
    image: marianaBrinoImg,
    highlighted: true,
    shortBio:
      "Especializada em Clínica de Pequenos Animais e Gestão de Clínicas e Hospitais Veterinários.",
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

const MentorCard = ({ mentor }: { mentor: Mentor }) => (
  <div
    className="group relative flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-brand-teal/40 transition-all duration-300 hover:shadow-[0_10px_40px_-15px_hsl(var(--brand-teal)/0.3)]"
    data-animate
  >
    <div className="relative mb-5">
      <div className="w-28 h-28 rounded-full overflow-hidden bg-muted border-2 border-brand-teal/20 group-hover:border-brand-teal/60 transition-colors">
        {mentor.image ? (
          <img
            src={mentor.image}
            alt={mentor.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
            {getInitials(mentor.name)}
          </div>
        )}
      </div>
    </div>

    <Badge
      variant="outline"
      className={
        mentor.affiliation === "Convidado(a)"
          ? "mb-3 border-brand-blue/40 text-brand-blue"
          : "mb-3 border-brand-teal/40 text-brand-teal"
      }
    >
      {mentor.affiliation}
    </Badge>

    <h3 className="text-lg font-semibold mb-1">{mentor.name}</h3>
    <p className="text-sm text-muted-foreground mb-3">{mentor.role}</p>
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

const MentoresSection = () => {
  const [showAll, setShowAll] = useState(false);

  // Mostrar todos por padrão (são 5). Botão fica preparado para futuros mentores.
  const visibleMentors = mentors;
  const extraMentors: Mentor[] = []; // adicionar parceiros convidados aqui

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-brand-teal/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-14 space-y-4" data-animate>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleMentors.map((m) => (
            <MentorCard key={m.name} mentor={m} />
          ))}
          {showAll && extraMentors.map((m) => <MentorCard key={m.name} mentor={m} />)}
        </div>

        {extraMentors.length > 0 && (
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll((v) => !v)}
              className="gap-2"
            >
              {showAll ? (
                <>
                  Mostrar menos <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Ver mais mentores <ChevronDown className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground/70 mt-10">
          Novos mentores convidados serão anunciados em breve.
        </p>
      </div>
    </section>
  );
};

export default MentoresSection;
