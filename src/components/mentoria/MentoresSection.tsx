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
import { Users, Sparkles } from "lucide-react";
import marianaBrinoImg from "@/assets/mentores/mariana-brino.jpeg";
import thalesImg from "@/assets/mentores/thales.png";
import elizImg from "@/assets/mentores/eliz.png";
import mikaelImg from "@/assets/mentores/mikael.png";
import diogoImg from "@/assets/mentores/diogo.png";
import julianaHerrmannImg from "@/assets/mentores/juliana-herrmann.jpeg";

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
  {
    name: "Juliana Herrmann",
    role: "Contadora e Administradora",
    image: julianaHerrmannImg,
    shortBio:
      "Contadora especializada no segmento veterinário, com atuação em gestão, finanças, planejamento tributário e desenvolvimento de clínicas e hospitais veterinários.",
    fullBio: [
      "Contadora e Administradora especializada no segmento veterinário, com atuação em gestão, finanças, planejamento tributário e desenvolvimento de clínicas e hospitais veterinários.",
      "Formação:",
      "• Bacharelado em Ciências Contábeis",
      "• Bacharelado em Administração",
      "• Especialização em Controladoria e Finanças",
      "• Especialização em Gestão de Empresas Contábeis",
      "• Especialização em Tributação para a Área da Saúde",
      "• Formação em Educação Financeira",
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

const getInitialsBadge = (name: string) => getInitials(name);

/* ---------- Card: Equipe Chordata (destaque grande) ---------- */
const TeamCard = ({ mentor }: { mentor: Mentor }) => (
  <div
    className="group relative flex flex-col p-6 md:p-7 rounded-3xl bg-gradient-to-br from-card via-card to-brand-teal/5 border border-brand-teal/25 hover:border-brand-teal/60 transition-all duration-300 hover:shadow-[0_20px_60px_-20px_hsl(var(--brand-teal)/0.45)] hover:-translate-y-1 overflow-hidden"
    data-animate
  >
    <div className="absolute -top-20 -right-20 w-56 h-56 bg-brand-teal/10 rounded-full blur-3xl pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity" />

    <div className="relative flex items-start gap-4 mb-5">
      <div className="relative shrink-0">
        <div className="absolute -inset-1 bg-gradient-to-br from-brand-teal/40 to-brand-blue/30 rounded-2xl blur-md opacity-70" />
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-muted border-2 border-brand-teal/30">
          {mentor.image ? (
            <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-muted-foreground">
              {getInitialsBadge(mentor.name)}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-w-0 pt-1">
        <Badge
          variant="outline"
          className="mb-2 border-brand-teal/40 text-brand-teal gap-1 text-[10px] uppercase tracking-wider"
        >
          Consultor Chordata
        </Badge>
        <h3 className="text-lg font-bold leading-tight">{mentor.name}</h3>
        <p className="text-xs text-brand-teal mt-1 leading-snug">{mentor.role}</p>
      </div>
    </div>

    <p className="relative text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
      {mentor.shortBio}
    </p>

    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="relative self-start border-brand-teal/40 text-brand-teal hover:bg-brand-teal/10 hover:text-brand-teal"
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
);

/* ---------- Card: Convidados (médio — menor que o time, mas visível) ---------- */
const GuestCard = ({ mentor }: { mentor: Mentor }) => (
  <div
    className="group flex flex-col items-center text-center p-5 rounded-2xl bg-card/60 border border-border/60 hover:border-brand-blue/40 hover:bg-card transition-all duration-300 hover:-translate-y-0.5"
    data-animate
  >
    <div className="w-20 h-20 rounded-full overflow-hidden bg-muted border-2 border-brand-blue/25 mb-3">
      {mentor.image ? (
        <img
          src={mentor.image}
          alt={mentor.name}
          className="w-full h-full object-cover object-top"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-sm font-bold text-muted-foreground">
          {getInitials(mentor.name)}
        </div>
      )}
    </div>

    <Badge
      variant="outline"
      className="mb-2 border-brand-blue/30 text-brand-blue text-[9px] uppercase tracking-wider"
    >
      Convidado
    </Badge>
    <h4 className="text-sm font-bold leading-tight">{mentor.name}</h4>
    <p className="text-[11px] text-brand-blue mt-1 leading-snug">{mentor.role}</p>
    <p className="text-xs text-muted-foreground leading-relaxed mt-3 mb-4 line-clamp-3">
      {mentor.shortBio}
    </p>

    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="mt-auto text-brand-blue hover:bg-brand-blue/10 hover:text-brand-blue text-xs h-8"
        >
          Ver perfil
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
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-brand-teal/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-16">
        {/* Cabeçalho */}
        <div className="text-center space-y-4" data-animate>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-teal/10 text-sm text-brand-teal font-medium">
            <Users className="w-4 h-4" />
            Mentores
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Quem vai te <span className="gradient-text">mentorar</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A equipe de consultores da Chordata Consultoria — os mesmos profissionais que aplicam
            o Método RP3 em clínicas e hospitais veterinários todos os dias.
          </p>
        </div>

        {/* Equipe Chordata — DESTAQUE */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4" data-animate>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-brand-teal font-semibold mb-2">
                Equipe Chordata
              </p>
              <h3 className="text-2xl md:text-3xl font-bold">
                Consultores por trás do Método RP3
              </h3>
            </div>
            <div className="hidden sm:block h-px flex-1 max-w-xs bg-gradient-to-r from-brand-teal/40 to-transparent ml-6 mb-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {chordataTeam.map((m) => (
              <TeamCard key={m.name} mentor={m} />
            ))}
          </div>
        </div>

        {/* Convidados — compacto */}
        <div className="space-y-6 pt-4">
          <div className="text-center" data-animate>
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-medium mb-2 inline-flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-brand-blue" />
              Convidados especiais da turma
            </p>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              Profissionais parceiros que somam experiências complementares ao Método RP3.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {guestMentors.map((m) => (
              <GuestChip key={m.name} mentor={m} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentoresSection;

