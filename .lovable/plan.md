

## Ajustes na Landing Page — Mentoria Chordata

Três blocos de alterações baseados no seu feedback e nas referências do site do ecossistema.

---

### 1. Estrutura da Mentoria — Números atualizados

Arquivo: `StructureSection.tsx`

- Adicionar card **"20h de Treinamento"** — horas totais de conteúdo gravado/ao vivo
- Alterar Encontros Individuais de **2** para **4 horas de mentoria individual personalizada**
- Alterar máximo de integrantes de **8** para **10**
- Manter Diagnóstico Gratuito incluso

---

### 2. Seção "Por que a Chordata" — Redesign completo

Arquivo: `WhyChordataSection.tsx`

Baseado nas imagens de referência (image.png e image-3.png) e nos dados reais do site do ecossistema:

**Números corrigidos (conforme referência visual):**
- **+2.000** Pessoas Movimentadas
- **+60** Projetos de Consultoria
- **+300** Pessoas Capacitadas
- **8** Estados Atendidos

**Novo layout:** Grid 2x2 com os números em destaque (texto grande azul, como na image-3.png), substituindo o layout atual de 4 cards com ícones. Design mais impactante, com os valores numéricos em `text-brand-blue` grande e labels abaixo.

**Ecossistema integrado:** Manter os logos (Chordata Analytics, MentAll.Vet, ABHV) na parte inferior, como já existe.

---

### 3. Seção "Por que a Chordata" — Conteúdo expandido

Além dos números, adicionar contexto do ecossistema referenciando as 5 soluções integradas:
- Chordata Consultoria (Estratégia e Gestão)
- MentAll.Vet (Saúde Mental)
- Chordata Analytics (Inteligência de Dados)
- JurídicoPet Digital (Conformidade Jurídica)
- VetConnection (Feiras e Eventos)

Menção à presença em **8 estados**, sede no Instituto Caldeira (Porto Alegre), e parceria PAVE/ABHV.

---

### Arquivos alterados
- `StructureSection.tsx` — novos cards (20h treinamento, 4h individual, 10 integrantes)
- `WhyChordataSection.tsx` — números corrigidos, layout redesenhado estilo referência

