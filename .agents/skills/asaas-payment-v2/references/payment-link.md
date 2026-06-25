# Payment Link — Asaas

Links permanentes de pagamento, sem necessidade de ter dados do cliente. O cliente preenche os dados no checkout do Asaas.

## Endpoint

```
POST /v3/paymentLinks
```

## Quando Usar

- Link fixo para um produto/serviço reutilizável
- Divulgação em redes sociais, e-mail, WhatsApp
- O cliente preenche os próprios dados
- Não precisa de integração de back-end avançada

## Diferença: Payment Link vs Checkout Session

| Feature                         | Payment Link | Checkout Session |
|---------------------------------|:------------:|:----------------:|
| Link permanente/reutilizável    | ✅           | ❌               |
| Cliente preenche os dados       | ✅           | ✅ (opcional)    |
| Pré-preenche dados do cliente   | ❌           | ✅               |
| Redirecionamento pós-pagamento  | ✅           | ✅               |
| Split de pagamento              | ❌           | ✅               |
| Parcelamento configurável       | ✅           | ✅               |

## Estrutura Base

```json
{
  "name": "Ingresso - Congresso VetConnection 2025",
  "description": "Acesso completo ao evento, 2 dias de palestras",
  "value": 297.00,
  "billingType": "UNDEFINED",
  "chargeType": "DETACHED",
  "dueDateLimitDays": 3
}
```

## Campos Principais

| Campo               | Tipo    | Obrigatório | Descrição                                        |
|---------------------|---------|-------------|--------------------------------------------------|
| `name`              | string  | ✅           | Nome do produto/serviço                          |
| `value`             | decimal | ✅           | Valor (0 = cliente define o valor)               |
| `billingType`       | string  | ✅           | `UNDEFINED`, `PIX`, `CREDIT_CARD`, `BOLETO`      |
| `chargeType`        | string  | ✅           | `DETACHED`, `INSTALLMENT`, `RECURRENT`           |
| `description`       | string  | ❌           | Descrição detalhada                              |
| `dueDateLimitDays`  | int     | ❌           | Dias até vencimento (necessário para boleto)     |
| `maxInstallmentCount`| int   | ❌           | Máx. parcelas (para INSTALLMENT)                |
| `subscriptionCycle` | string  | ❌           | `MONTHLY`, `WEEKLY`, etc. (para RECURRENT)       |
| `notificationEnabled`| bool  | ❌           | Enviar notificações ao cliente (padrão: true)    |

## Exemplos de Uso

### Ingresso de Evento (Pix ou Cartão)
```json
{
  "name": "Ingresso Congresso VetConnection 2025",
  "description": "Acesso completo — 2 dias, certificado incluso",
  "value": 297.00,
  "billingType": "UNDEFINED",
  "chargeType": "DETACHED",
  "dueDateLimitDays": 3
}
```

### Consultoria Parcelada
```json
{
  "name": "Pacote Consultoria Jurídica — 3 sessões",
  "description": "3 consultorias individuais, agendamento por e-mail",
  "value": 900.00,
  "billingType": "CREDIT_CARD",
  "chargeType": "INSTALLMENT",
  "maxInstallmentCount": 3
}
```

### Mentoria Recorrente (Assinatura Mensal)
```json
{
  "name": "Mentoria RPT — Mensal",
  "description": "Acompanhamento semanal + acesso ao grupo exclusivo",
  "value": 497.00,
  "billingType": "CREDIT_CARD",
  "chargeType": "RECURRENT",
  "subscriptionCycle": "MONTHLY",
  "notificationEnabled": true
}
```

### Palestra Avulsa (Valor Livre)
```json
{
  "name": "Palestra — Valor Livre",
  "description": "Contribuição voluntária para a palestra",
  "value": 0,
  "billingType": "PIX",
  "chargeType": "DETACHED"
}
```

## Resposta da API

```json
{
  "id": "pln_xxxxxxxxxxxx",
  "name": "Ingresso Congresso VetConnection 2025",
  "url": "https://asaas.com/p/pln_xxxxxxxxxxxx",
  ...
}
```

O campo `url` é o link direto para compartilhar com o cliente.

## Código JavaScript

```javascript
async function criarPaymentLink(apiKey, dados) {
  const response = await fetch("https://api.asaas.com/v3/paymentLinks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access_token": apiKey
    },
    body: JSON.stringify(dados)
  });
  const data = await response.json();
  return data.url; // Link de pagamento pronto
}
```

## Confirmação de Pagamento

Quando o link é pago, o Asaas dispara um webhook com:
- `event`: `PAYMENT_RECEIVED`
- `payment.paymentLink`: ID do payment link
- `payment.customer`: ID do cliente criado automaticamente

Configure o webhook no painel Asaas → Integrações → Webhooks.
