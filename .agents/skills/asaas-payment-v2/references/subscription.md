# Assinaturas e Recorrência — Asaas

Para mentorias, acompanhamento continuado, e qualquer produto com pagamento recorrente.

## Endpoint

```
POST /v3/subscriptions
```

## Estrutura Base

```json
{
  "customer": "cus_000005219613",
  "billingType": "CREDIT_CARD",
  "value": 497.00,
  "nextDueDate": "2025-02-15",
  "cycle": "MONTHLY",
  "description": "Mentoria RPT — Plano Mensal"
}
```

## Campos Principais

| Campo          | Tipo    | Obrigatório | Valores                                          |
|----------------|---------|-------------|--------------------------------------------------|
| `customer`     | string  | ✅           | ID do cliente (`cus_xxxxx`)                      |
| `billingType`  | string  | ✅           | `CREDIT_CARD`, `PIX`, `BOLETO`, `UNDEFINED`     |
| `value`        | decimal | ✅           | Valor de cada cobrança                           |
| `nextDueDate`  | string  | ✅           | Data da primeira cobrança (YYYY-MM-DD)           |
| `cycle`        | string  | ✅           | `WEEKLY`, `BIWEEKLY`, `MONTHLY`, `QUARTERLY`, `SEMIANNUALLY`, `YEARLY` |
| `description`  | string  | ❌           | Descrição que aparece na fatura                  |
| `endDate`      | string  | ❌           | Data de encerramento (omitir = sem fim)          |
| `maxPayments`  | int     | ❌           | Número máximo de cobranças                       |

## Exemplos por Caso de Uso

### Mentoria Mensal (Chordata Consultoria)
```json
{
  "customer": "cus_000005219613",
  "billingType": "CREDIT_CARD",
  "value": 497.00,
  "nextDueDate": "2025-02-01",
  "cycle": "MONTHLY",
  "description": "Mentoria RPT — Acompanhamento Mensal"
}
```

### Plano Anual com Desconto
```json
{
  "customer": "cus_000005219613",
  "billingType": "CREDIT_CARD",
  "value": 4970.00,
  "nextDueDate": "2025-02-01",
  "cycle": "YEARLY",
  "description": "Mentoria RPT — Plano Anual"
}
```

### Programa com Duração Definida (6 meses)
```json
{
  "customer": "cus_000005219613",
  "billingType": "CREDIT_CARD",
  "value": 297.00,
  "nextDueDate": "2025-02-01",
  "cycle": "MONTHLY",
  "maxPayments": 6,
  "description": "Programa Intensivo — 6 meses"
}
```

## Via Checkout Session (sem cadastro manual do cliente)

Para criar uma assinatura com página de pagamento direta:

```json
{
  "billingTypes": ["CREDIT_CARD"],
  "chargeTypes": ["RECURRENT"],
  "minutesToExpire": 60,
  "callback": {
    "successUrl": "https://chordata.com.br/obrigado",
    "cancelUrl": "https://chordata.com.br/cancelado",
    "expiredUrl": "https://chordata.com.br/expirado"
  },
  "items": [
    {
      "name": "Mentoria RPT Mensal",
      "description": "Acompanhamento semanal + grupo exclusivo",
      "quantity": 1,
      "value": 497.00
    }
  ],
  "subscription": {
    "cycle": "MONTHLY"
  }
}
```

## Gerenciar Assinaturas

### Listar assinaturas de um cliente
```
GET /v3/subscriptions?customer=cus_000005219613
```

### Cancelar assinatura
```
DELETE /v3/subscriptions/{subscriptionId}
```

### Atualizar valor da assinatura
```
PUT /v3/subscriptions/{subscriptionId}
```
```json
{ "value": 547.00 }
```

## Status da Assinatura

| Status     | Significado                          |
|------------|--------------------------------------|
| `ACTIVE`   | Ativa e cobrando normalmente          |
| `INACTIVE` | Cancelada/desativada                  |
| `EXPIRED`  | Encerrada por data ou maxPayments     |
