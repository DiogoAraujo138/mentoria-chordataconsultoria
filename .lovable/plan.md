
## Escopo confirmado

1. **Checkout Asaas** — PIX + Cartão até 6x, produção (`ASAASOFICIAL`)
2. **Rotação automática** do mês da turma
3. **Mentores** — Chordata em destaque grande, convidados em faixa compacta
4. **Remover** bloco "Datas dos Encontros"
5. **Webhook Chatwoot** — cria contato/conversa a cada pagamento confirmado

Tabela `inscricoes_rp3` já existe com todos os campos necessários (incluindo cupons). Vou aproveitá-la.

---

## 1. Asaas — checkout

**Edge function `create-asaas-checkout`** (pública, sem JWT):
- Body: `{ nome, email, cpf, telefone, cupomCodigo? }`
- Valida Zod, sanitiza CPF/telefone
- Se cupom: valida em `cupons_rp3` (ativo, não expirado, dentro de `max_usos`) e aplica `percentual_desconto`
- Cria/reutiliza customer no Asaas (`GET /v3/customers?cpfCnpj=` → senão `POST /v3/customers`)
- Cria checkout `POST /v3/checkouts` com:
  - `billingTypes: ["PIX","CREDIT_CARD"]`, `chargeTypes: ["DETACHED","INSTALLMENT"]`
  - `value` (com desconto), `maxInstallments: 6`, `dueDateLimitDays: 3`
  - `callback.successUrl` e `cancelUrl` na LP
  - `externalReference: inscricao_id`
- Insere linha em `inscricoes_rp3` (status `PENDING`, guarda `checkout_url`, `asaas_customer_id`, `asaas_checkout_id`, valor original e desconto)
- Retorna `{ checkoutUrl }` → frontend faz `window.location`
- Usa `ASAAS_ENV` para escolher base URL (`api.asaas.com` vs `sandbox`)

**Edge function `asaas-webhook`** (pública):
- Valida header `asaas-access-token` === `ASAAS_WEBHOOK_TOKEN`
- Atualiza `inscricoes_rp3` por `asaas_payment_id`/`asaas_checkout_id`: status, forma_pagamento, parcelas, `raw_webhook`
- Em `PAYMENT_CONFIRMED`/`PAYMENT_RECEIVED`: incrementa `cupons_rp3.usos` se houver cupom e dispara **Chatwoot** (item 5)

**Frontend — `CheckoutModal.tsx`**:
- Dialog acionado por todos os CTAs de "vagas abertas" (Hero, Investimento, CTA final)
- Form shadcn: Nome, E-mail, CPF, Telefone, Cupom (opcional)
- Loading state → redireciona pro `checkoutUrl` Asaas
- Whats continua como botão secundário "Tirar dúvidas"

## 2. Rotação automática da turma

`src/lib/turma.ts`:
```ts
getProximaTurma() → { mes, ano, slug, inicioISO, fimISO, tercas: Date[] }
```
- Calcula sempre "mês corrente + 1"
- Encontra 4 primeiras terças do mês retornado
- Consumida por Hero, CTA, Investimento, Structure, SEO (Helmet no `Index`)
- SEO JSON-LD `Course.startDate` recebe `inicioISO` dinâmico
- `index.html` fica com título atemporal; Helmet sobrescreve por render

## 3. Mentores — novo layout

Reescrever `MentoresSection.tsx`:
- **Consultores Chordata** (destaque): grid 2 colunas com cards grandes, foto retrato 320px, bio completa aberta, borda `brand-teal` + glow forte. Ordem: Mikael, Thales, Eliz, Diogo.
- **Convidados**: título menor "Também participam da mentoria", faixa horizontal com cards compactos (foto 72px + nome + credencial curta) e `Dialog` "Ver bio". Mariana Brino e Juliana Herrmann.

## 4. Remover datas dos encontros

Deletar o bloco "Datas dos Encontros" (~linhas 68-100) de `StructureSection.tsx`. Mantém apenas o grid de 5 cards.

## 5. Webhook Chatwoot

Dentro de `asaas-webhook`, no evento de pagamento confirmado, POST para:
- `https://chordata-chatwoot.kk28lc.easypanel.host/api/v1/accounts/1/contacts` (upsert por email/telefone)
- `.../conversations` criando conversa com mensagem inicial contendo: nome, email, telefone, valor pago, forma de pagamento, turma, ID Asaas

Salvo credenciais como secrets:
- `CHATWOOT_URL` = `https://chordata-chatwoot.kk28lc.easypanel.host`
- `CHATWOOT_ACCOUNT_ID` = `1`
- `CHATWOOT_API_TOKEN` = `u3GAWzphXoVfimz5oebS7Ai5`
- Vou pedir também `CHATWOOT_INBOX_ID` (obrigatório na API de conversas) — se não souber, listo suas inboxes via API e escolhemos.

Erros do Chatwoot não bloqueiam o webhook (log + segue 200 pro Asaas).

---

## Pós-deploy (só ação sua)

No painel Asaas → Integrações → Webhooks:
- URL: `https://dqmoftaemhpaynxlaidd.supabase.co/functions/v1/asaas-webhook`
- Token: mesmo valor de `ASAAS_WEBHOOK_TOKEN`
- Eventos: `PAYMENT_CREATED`, `PAYMENT_CONFIRMED`, `PAYMENT_RECEIVED`, `PAYMENT_OVERDUE`, `PAYMENT_REFUNDED`
