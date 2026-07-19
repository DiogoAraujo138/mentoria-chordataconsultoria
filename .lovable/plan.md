# Adicionar seção "Mentores" na Landing Page

## Objetivo
Criar nova seção apresentando os mentores da Mentoria RP3 — equipe Chordata + parceiros convidados, com Mariana Brino em destaque inicial e os demais colapsados em "Ver mais".

## Estrutura da seção

Nova seção `MentoresSection.tsx`, posicionada **entre `WhyChordataSection` e `CTASection`** no `Index.tsx`.

Layout:
- Título: "Quem vai te mentorar"
- Subtítulo curto sobre a equipe Chordata + convidados
- **Grid principal (visível)**: 5 cards — Thales, Mikael, Diogo, Eliz (equipe Chordata) + Mariana Brino (convidada, com badge "Convidada")
- Botão **"Ver mais mentores"** que expande/colapsa cards adicionais (inicialmente vazio, preparado para futuras adições)

## Card de mentor

Cada card contém:
- Foto circular (placeholder por enquanto — você enviará as imagens depois)
- Nome
- Cargo / título profissional curto
- Badge opcional: "Equipe Chordata" ou "Convidada"
- Bio resumida (2-4 linhas)
- Botão "Ver mais" → abre Dialog com bio completa, formação, experiência

## Conteúdo dos mentores (rascunho aprovado pelo usuário)

**Mariana Brino** — Convidada
Médica Veterinária. Especializada em Clínica de Pequenos Animais e Gestão de Clínicas e Hospitais Veterinários.
Formação: ULBRA, EQUALIS, MBA FAMESP, Pós MBA Mercado Pet FAMESP.
Cursos: Intensivet, Harvard Business Publishing, Disney.

**Mikael Nunes Cattani** — Equipe Chordata
Administrador. MBA Consultoria Empresarial e MBA Gestão de Clínicas e Hospitais Veterinários. 12 anos no mercado veterinário. Sócio/Diretor Chordata, cofundador Feira Vet Connection, Mentall.vet e DescomplicaVet.

**Diogo Araujo** — Equipe Chordata
Consultor & Analista de Dados. Gestão Financeira + Pós em Análise de Dados. 3 anos no mercado vet. Cria dashboards, automações e inteligência operacional para clínicas/hospitais.

**Eliz Modena** — Equipe Chordata
Psicóloga (CRP 07/40461). Pós em Gestão de Pessoas. +10 anos em RH e Psicologia Organizacional. Consultora Chordata, Psicóloga Org. Mentall.Vet. Facilitadora de treinamentos e desenvolvimento de equipes.

**Thales** — Equipe Chordata
*(faltam dados — usarei placeholder "Em breve" até você enviar bio)*

## Detalhes técnicos

- Componente: `src/components/mentoria/MentoresSection.tsx`
- Dialog do shadcn para bio completa
- Estrutura de dados: array `mentors` tipado para facilitar adicionar novos parceiros depois
- Imagens: placeholder cinza com iniciais até você enviar fotos; estrutura preparada para `import` de `src/assets/mentores/`
- Cores: `brand-teal`/`brand-blue` já existentes, sem cor nova
- Responsivo: 1 col mobile, 2 cols tablet, 3 cols desktop
- Animação fade-up via observer já existente

## Pendências para você

1. Foto de cada mentor (Thales, Mikael, Diogo, Eliz, Mariana)
2. Bio do Thales
3. Confirmar ordem dos cards
