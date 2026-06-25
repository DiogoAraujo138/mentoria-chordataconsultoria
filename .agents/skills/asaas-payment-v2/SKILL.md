---
name: asaas-payment-v2
description: >
  Integração completa com a API do Asaas para geração de cobranças, checkouts, links de pagamento e recebimento de vendas no Ecossistema Chordata. Use esta skill SEMPRE que o usuário mencionar: Asaas, cobrança, link de pagamento, checkout, ingresso, inscrição, mentoria, palestra, congresso, consultoria, recebimento via Pix/boleto/cartão, "criar página de pagamento", "gerar link de cobrança", "cobrar cliente". Cobre todo o fluxo: identificar empresa → selecionar conta Asaas correta → criar cliente → gerar cobrança/checkout/link → retornar URL de pagamento → confirmar via webhook. IMPORTANTE: cada empresa do ecossistema tem conta Asaas própria — a skill sempre identifica e confirma qual empresa está sendo trabalhada antes de gerar qualquer integração.
---

# Asaas Payment Integration — Ecossistema Chordata

Skill de integração com a API REST do Asaas para recebimento de pagamentos nas empresas do ecossistema Chordata.

---

## PASSO 0 — Identificar Empresa e Conta Asaas

**Esta é a primeira etapa obrigatória de qualquer fluxo.**

Cada empresa possui conta Asaas independente, com API Key própria. Antes de gerar qualquer código ou integração, perguntar:

> "Para qual empresa é essa integração de pagamento?"

### Contas por Empresa

| Empresa               | Uso Principal no Asaas                                      | Pedir confirmação de       |
|-----------------------|-------------------------------------------------------------|---------------------------|
| **Chordata Consultoria** | Mentorias RPT, consultorias avulsas, pacotes estratégicos | Qual a API Key da Chordata Consultoria? |
| **VetConnection**     | Ingressos de eventos, palestras, congressos, networking     | Qual a API Key da VetConnection? |
| **JurídicoPet Digital** | Consultorias jurídicas avulsas e pacotes parcelados       | Qual a API Key do JurídicoPet? |
| **MentAll.Vet**       | Programas de bem-estar, avaliações psicossociais, cursos   | Qual a API Key do MentAll.Vet? |
| **Chordata Analytics**| Relatórios pagos, dashboards sob demanda, BI contratado    | Qual a API Key da Chordata Analytics? |

### Regras de Detecção de Contexto

Antes de perguntar, tentar detectar automaticamente pela conversa:

- Mentoria, RPT, consultoria estratégica, gestão de clínicas → **Chordata Consultoria**
- Ingresso, evento, palestra, congresso, networking → **VetConnection**
- Jurídico, contrato, compliance, LGPD, termo → **JurídicoPet Digital**
- Saúde mental, bem-estar, burnout, NR-1, psicossocial → **MentAll.Vet**
- Dashboard, BI, análise de dados, indicadores → **Chordata Analytics**

Se detectado com confiança, confirmar brevemente:
> "Vou gerar essa integração para a **VetConnection**, certo? Me passa a API Key dessa conta no Asaas."

Se ambíguo, perguntar diretamente qual empresa.

### Variável de API Key no Código

Sempre gerar código com a API Key como variável de ambiente, nunca hardcoded:

```javascript
const API_KEY = process.env.ASAAS_API_KEY_VETCONNECTION; // ou _CHORDATA, _JURIDICOPET etc.
```

```python
import os
API_KEY = os.getenv("ASAAS_API_KEY_VETCONNECTION")
```

Nomear a variável com o sufixo da empresa para facilitar quando houver múltiplas contas no mesmo projeto.

---

## Ambientes e Autenticação

| Ambiente   | Base URL                           | Uso              |
|------------|------------------------------------|------------------|
| Sandbox    | `https://sandbox.asaas.com/api/v3` | Testes           |
| Produção   | `https://api.asaas.com/v3`         | Real             |

**Header obrigatório em todas as requisições:**
```
access_token: $API_KEY
Content-Type: application/json
```

> ⚠️ Nunca expor a API Key no front-end. Sempre via back-end ou variável de ambiente.

---

## Fluxos Disponíveis

### 1. Checkout Session (recomendado — página de pagamento gerada na hora)
Cria uma sessão com URL única para redirecionar o cliente.
→ Ver `references/checkout-session.md`

### 2. Payment Link (link permanente e reutilizável)
Ideal para divulgar nas redes sociais, WhatsApp, e-mail.
→ Ver `references/payment-link.md`

### 3. Cobrança Direta (cliente já cadastrado na base)
Para clientes existentes — gera boleto, Pix ou link de cartão.
→ Ver `references/direct-charge.md`

### 4. Assinatura / Recorrência (mentorias e programas continuados)
Cobra automaticamente todo mês/semana/ano.
→ Ver `references/subscription.md`

---

## Decisão de Fluxo

```
Tenho dados do cliente?
│
├── NÃO → Payment Link ou Checkout Session sem customerData
│
└── SIM
    ├── Pagamento único (ingresso, consultoria avulsa)
    │   └── Checkout Session com customerData
    ├── Parcelamento (pacote acima de R$300)
    │   └── Checkout Session com INSTALLMENT
    └── Recorrência (mentoria mensal)
        └── Checkout Session RECURRENT ou Subscription API

Quero link permanente reutilizável?
└── Payment Link
```

---

## Produtos por Empresa

| Empresa               | Produto                       | Cobrança          | billingType sugerido       |
|-----------------------|-------------------------------|-------------------|----------------------------|
| Chordata Consultoria  | Mentoria RPT mensal           | RECURRENT         | CREDIT_CARD                |
| Chordata Consultoria  | Consultoria avulsa            | DETACHED          | UNDEFINED                  |
| Chordata Consultoria  | Pacote estratégico            | INSTALLMENT       | CREDIT_CARD                |
| VetConnection         | Ingresso congresso            | DETACHED          | PIX, CREDIT_CARD           |
| VetConnection         | Palestra avulsa / gravada     | DETACHED          | PIX, UNDEFINED             |
| VetConnection         | Patrocínio / expositor        | DETACHED          | CREDIT_CARD, PIX           |
| JurídicoPet Digital   | Consultoria jurídica 1x       | DETACHED          | PIX, CREDIT_CARD           |
| JurídicoPet Digital   | Pacote consultorias parcelado | INSTALLMENT       | CREDIT_CARD                |
| MentAll.Vet           | Programa bem-estar            | RECURRENT         | CREDIT_CARD                |
| MentAll.Vet           | Avaliação psicossocial        | DETACHED          | PIX, CREDIT_CARD           |
| Chordata Analytics    | Dashboard sob demanda         | DETACHED          | PIX, CREDIT_CARD           |

---

## Webhooks

Para confirmar pagamentos automaticamente:
- Configurar no painel Asaas → Integrações → Webhooks
- **Cada conta Asaas tem seu próprio webhook configurado**
- Eventos: `PAYMENT_RECEIVED`, `PAYMENT_CONFIRMED`, `PAYMENT_OVERDUE`
- Usar `externalReference` para identificar o produto/empresa no payload

→ Ver `references/webhooks.md`

---

## Erros Comuns

| Código | Motivo                              | Solução                                           |
|--------|-------------------------------------|---------------------------------------------------|
| 401    | API Key errada ou ambiente errado   | Verificar se Sandbox vs Produção, e qual empresa  |
| 400    | Campo obrigatório ausente           | Conferir `items`, `billingTypes`, `chargeTypes`   |
| 422    | CPF/CNPJ inválido                   | Validar formato antes de enviar                   |

---

## Referências

- `references/checkout-session.md` — Checkout Sessions (fluxo principal, com código JS e Python)
- `references/payment-link.md` — Payment Links permanentes
- `references/direct-charge.md` — Cobranças diretas por método
- `references/subscription.md` — Assinaturas recorrentes
- `references/webhooks.md` — Confirmação de pagamentos via webhook
- `references/examples.md` — Exemplos completos prontos por empresa
