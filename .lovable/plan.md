## Mentoria RP3 — Integração do Método e ajuste de turma

Três blocos de mudança baseados no site da Chordata Consultoria (chordataconsultoria.com) e no print de referência do Método RP3.

---

### 1. Renomear a mentoria para "RP3"

Atualizar headline e textos para reforçar o nome **Mentoria RP3 — Gestão Clínica e Hospitalar Veterinária**.

- `HeroSection.tsx`
  - Headline: **"Mentoria RP3"** com subtítulo **"Gestão Clínica e Hospitalar Veterinária"**
  - Subtitle: incluir menção ao método RP3 da Chordata Consultoria
- `index.html` — atualizar `<title>` e meta description (SEO)
- `CTASection.tsx` — pequeno ajuste no copy final mencionando RP3

---

### 2. Nova seção "Método RP3" (NOVA)

Arquivo novo: `src/components/mentoria/MetodoRP3Section.tsx`, inserida em `Index.tsx` **entre `BenefitsSection` e `StructureSection`**.

Estrutura inspirada no print de referência (3 cards numerados 01/02/03):

```text
— NOSSO MÉTODO —
Método Chordata · RP3
[descrição: metodologia proprietária aplicada aos 3 pilares...]

[Processos] → [Pessoas] → [Planejamento]   (chips/badges)

┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ 🔍   01     │  │ 🤝   02     │  │ 📋   03     │
│ Processos   │  │ Pessoas     │  │ Planejamento│
│ Medir e     │  │ Desenvolver │  │ Controlar e │
│ Analisar    │  │ e Engajar   │  │ Crescer     │
│             │  │             │  │             │
│ [parágrafo] │  │ [parágrafo] │  │ [parágrafo] │
│ ─────────── │  │ ─────────── │  │ ─────────── │
│ • tópico 1  │  │ • tópico 1  │  │ • tópico 1  │
│ • tópico 2  │  │ • tópico 2  │  │ • tópico 2  │
│ • tópico 3  │  │ • tópico 3  │  │ • tópico 3  │
└─────────────┘  └─────────────┘  └─────────────┘
```

Conteúdo dos 3 pilares (do print de referência):

- **01 · Processos — Medir e Analisar** (azul/brand-blue)
  - Diagnóstico de Precisão, Análise de Dados, Integração Comercial
- **02 · Pessoas — Desenvolver e Engajar** (teal/brand-teal)
  - Habilidade de Gestor, Solidificação da Base, Estruturação de Cargos
- **03 · Planejamento — Controlar e Crescer** (amarelo/âmbar)
  - Planejamento Operacional, Financeiro, Comercial

Estilo: cards `glass-card` no padrão do projeto, com número grande no canto superior direito (semelhante ao `ModulesSection`), ícones Lucide (`Search`, `Handshake`/`Users`, `LayoutGrid`/`Target`), e cor de destaque por pilar para o subtítulo de ação.

Por que adicionar: explica o "porquê" da mentoria — ela aplica a mesma metodologia proprietária usada nos projetos de consultoria da Chordata.

---

### 3. Próxima turma → Junho de 2026

`CTASection.tsx`:
- Trocar **"Início em 11 de Maio de 2026"** por **"Início em Junho de 2026"** (mantendo o destaque com `gradient-text`).

---

### Arquivos alterados / criados
- **novo:** `src/components/mentoria/MetodoRP3Section.tsx`
- editado: `src/pages/Index.tsx` (incluir a nova seção)
- editado: `src/components/mentoria/HeroSection.tsx` (renomear para RP3)
- editado: `src/components/mentoria/CTASection.tsx` (data Junho/2026 + copy)
- editado: `index.html` (title/meta SEO)
