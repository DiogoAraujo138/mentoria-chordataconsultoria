
# Plano — Pagamento direto na Landing RP3 via Asaas

Empresa: **Chordata Consultoria**. Produto: Mentoria RP3 — R$ 2.300 à vista ou 6x R$ 383,33 sem juros.

## Estratégia em 2 fases

**Fase 1 — Sandbox** (validar fluxo ponta-a-ponta sem dinheiro real)
**Fase 2 — Produção** (apenas trocar a API Key e a base URL, sem re-trabalho)

O código fica preparado para alternar com uma variável `ASAAS_ENV=sandbox|production`.

---

## O que muda na landing page

Substituir o botão atual "Próxima turma — vagas abertas" da seção Investimento por um **modal de checkout** com 3 passos curtos:

1. **Dados** — Nome, Email, CPF, Telefone (campos obrigatórios pelo Asaas)
2. **Forma de pagamento** — Pix, Cartão até 6x sem juros, ou Boleto
3. **Redireciona** para a página segura do Asaas para concluir o pagamento

Após o pagamento, o aluno volta para `/obrigado` com confirmação visual.

Os CTAs do Hero e do CTA final passam a abrir o mesmo modal (em vez de WhatsApp).
O botão "Falar com Mikael" continua existindo como alternativa.

---

## Backend (Lovable Cloud)

### 1. Tabela `inscricoes_rp3`
Armazena cada tentativa/inscrição:
- `id`, `created_at`
- `nome`, `email`, `cpf`, `telefone`
- `asaas_customer_id`, `asaas_payment_id`, `asaas_checkout_id`
- `valor`, `parcelas`, `forma_pagamento`
- `status` (`PENDING` | `CONFIRMED` | `OVERDUE` | `REFUNDED`)
- `ambiente` (`sandbox` | `production`)
- RLS: só `service_role` lê/escreve (apenas as edge functions acessam).

### 2. Edge function `criar-checkout-rp3`
- Recebe dados do formulário, valida com Zod.
- Cria/recupera customer no Asaas.
- Cria Checkout Session com `chargeTypes: [DETACHED]`, `billingTypes: [PIX, CREDIT_CARD, BOLETO]`, `installmentCount: 6`.
- Insere linha PENDING em `inscricoes_rp3` com `externalReference` = id da linha.
- Retorna a URL do checkout do Asaas para o frontend redirecionar.

### 3. Edge function `asaas-webhook` (pública, sem JWT)
- Recebe eventos `PAYMENT_CONFIRMED`, `PAYMENT_RECEIVED`, `PAYMENT_OVERDUE`, `PAYMENT_REFUNDED`.
- Valida o token de webhook (header `asaas-access-token`).
- Atualiza o status da inscrição correspondente pelo `externalReference`.

### 4. Página `/obrigado`
- Lê `?payment=<id>` da URL.
- Mostra mensagem de obrigado + próximos passos (próxima turma Junho/2026, encontros às terças 19:30, contato do Mikael para dúvidas).

---

## O que preciso de você

Para começar a Fase 1 (sandbox):

1. **API Key Sandbox da Chordata Consultoria**
   Painel Asaas → Modo Sandbox → Integrações → "Gerar nova chave de API". Eu vou pedir via secret seguro (você cola na caixa que aparece, não no chat).

2. **URL do webhook** — eu te entrego depois que a edge function estiver no ar. Você cola no painel Asaas Sandbox → Integrações → Webhooks, com os 4 eventos acima e um token (qualquer string aleatória; também salvo como secret).

Para a Fase 2 (produção), depois dos testes ok, repetimos os 2 passos acima com a API Key e o webhook da conta de produção.

---

## Detalhes técnicos (referência)

- **Secrets:** `ASAAS_API_KEY_CHORDATA_SANDBOX`, `ASAAS_API_KEY_CHORDATA_PROD`, `ASAAS_WEBHOOK_TOKEN`, `ASAAS_ENV`.
- **Base URLs:** `https://sandbox.asaas.com/api/v3` vs `https://api.asaas.com/v3` — selecionado pela `ASAAS_ENV`.
- **Header:** `access_token: $API_KEY`.
- **Checkout Session payload (resumo):**
  ```
  {
    chargeTypes: ["DETACHED"],
    billingTypes: ["PIX","CREDIT_CARD","BOLETO"],
    items: [{ name: "Mentoria RP3", value: 2300, quantity: 1 }],
    installmentCount: 6,
    customerData: { name, email, cpfCnpj, phone },
    callback: {
      successUrl: "https://mentoria-rp3.lovable.app/obrigado",
      cancelUrl:  "https://mentoria-rp3.lovable.app/#investimento"
    },
    externalReference: "<id da inscricao>"
  }
  ```
- **Validação:** CPF normalizado (só dígitos), email/telefone validados via Zod, erros retornados ao modal.
- **Idempotência:** se o usuário reenviar o form, reaproveitamos a inscrição PENDING dele (mesmo email + ambiente nas últimas 24h).

---

## Sequência de execução

1. Habilitar Lovable Cloud (se ainda não estiver).
2. Criar tabela `inscricoes_rp3` + RLS.
3. Salvar secrets (sandbox).
4. Criar as 2 edge functions.
5. Trocar CTAs da landing pelo modal de checkout + criar `/obrigado`.
6. Você cadastra o webhook no painel sandbox → testamos um Pix de R$ 5 (alterando o valor temporariamente).
7. Validado tudo → trocamos `ASAAS_ENV` para `production`, cadastramos secrets de produção e webhook de produção.

Pronto pra seguir? Se aprovar, no próximo passo já habilito o Cloud e peço a API Key sandbox.
