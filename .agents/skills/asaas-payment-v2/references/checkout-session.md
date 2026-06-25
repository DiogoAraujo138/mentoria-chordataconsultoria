# Checkout Session — Asaas

O **Checkout Session** é o fluxo principal para criar páginas de pagamento. Gera uma URL única que você redireciona o cliente para pagar.

## Endpoint

```
POST /v3/checkoutSession
```

## Estrutura Base

```json
{
  "billingTypes": ["PIX", "CREDIT_CARD"],
  "chargeTypes": ["DETACHED"],
  "minutesToExpire": 60,
  "callback": {
    "successUrl": "https://seusite.com/obrigado",
    "cancelUrl": "https://seusite.com/cancelado",
    "expiredUrl": "https://seusite.com/expirado"
  },
  "items": [
    {
      "name": "Nome do produto",
      "description": "Descrição",
      "quantity": 1,
      "value": 297.00
    }
  ],
  "customerData": {
    "name": "João da Silva",
    "cpfCnpj": "12345678909",
    "email": "joao@email.com",
    "phone": "47999998888"
  }
}
```

## Campos Principais

| Campo            | Tipo     | Obrigatório | Descrição                                         |
|------------------|----------|-------------|---------------------------------------------------|
| `billingTypes`   | array    | ✅           | `PIX`, `CREDIT_CARD`, `BOLETO`, ou `UNDEFINED`    |
| `chargeTypes`    | array    | ✅           | `DETACHED` (único), `INSTALLMENT`, `RECURRENT`    |
| `minutesToExpire`| int      | ✅           | Tempo de validade do checkout (ex: 60, 1440)      |
| `items`          | array    | ✅           | Lista de produtos/serviços                        |
| `callback`       | object   | ✅           | URLs de redirecionamento pós-pagamento             |
| `customerData`   | object   | ❌           | Pré-preenche dados do cliente no checkout          |
| `installment`    | object   | ❌           | Parcelamento (maxInstallmentCount)                |

## Resposta da API

```json
{
  "id": "c7b1c696-b27b-4d3d-80b9-d1c018e387f8",
  ...
}
```

## Montar a URL de Pagamento

```
https://asaas.com/checkoutSession/show?id=ID_RETORNADO
```

Essa URL é o que você compartilha com o cliente ou redireciona no site.

---

## Variações Comuns

### Apenas Pix (ingresso rápido)
```json
{
  "billingTypes": ["PIX"],
  "chargeTypes": ["DETACHED"],
  "minutesToExpire": 30,
  "callback": { "successUrl": "...", "cancelUrl": "...", "expiredUrl": "..." },
  "items": [{ "name": "Ingresso Congresso", "quantity": 1, "value": 150.00 }]
}
```

### Pix + Cartão com Parcelamento
```json
{
  "billingTypes": ["PIX", "CREDIT_CARD"],
  "chargeTypes": ["DETACHED", "INSTALLMENT"],
  "minutesToExpire": 1440,
  "installment": { "maxInstallmentCount": 6 },
  "callback": { "successUrl": "...", "cancelUrl": "...", "expiredUrl": "..." },
  "items": [{ "name": "Consultoria Premium", "quantity": 1, "value": 1200.00 }]
}
```

### Assinatura Recorrente (Mentoria Mensal)
```json
{
  "billingTypes": ["CREDIT_CARD"],
  "chargeTypes": ["RECURRENT"],
  "minutesToExpire": 60,
  "callback": { "successUrl": "...", "cancelUrl": "...", "expiredUrl": "..." },
  "items": [{ "name": "Mentoria Mensal RPT", "quantity": 1, "value": 497.00 }],
  "subscription": { "cycle": "MONTHLY" }
}
```

---

## Código JavaScript (Fetch)

```javascript
async function criarCheckoutAsaas({ apiKey, items, successUrl, produto }) {
  const response = await fetch("https://api.asaas.com/v3/checkoutSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access_token": apiKey
    },
    body: JSON.stringify({
      billingTypes: ["PIX", "CREDIT_CARD"],
      chargeTypes: ["DETACHED"],
      minutesToExpire: 60,
      callback: {
        successUrl,
        cancelUrl: `${new URL(successUrl).origin}/cancelado`,
        expiredUrl: `${new URL(successUrl).origin}/expirado`
      },
      items
    })
  });

  const data = await response.json();
  return `https://asaas.com/checkoutSession/show?id=${data.id}`;
}
```

---

## Código Python (requests)

```python
import requests

def criar_checkout_asaas(api_key, items, success_url):
    response = requests.post(
        "https://api.asaas.com/v3/checkoutSession",
        headers={
            "Content-Type": "application/json",
            "access_token": api_key
        },
        json={
            "billingTypes": ["PIX", "CREDIT_CARD"],
            "chargeTypes": ["DETACHED"],
            "minutesToExpire": 60,
            "callback": {
                "successUrl": success_url,
                "cancelUrl": success_url.replace("/obrigado", "/cancelado"),
                "expiredUrl": success_url.replace("/obrigado", "/expirado")
            },
            "items": items
        }
    )
    data = response.json()
    return f"https://asaas.com/checkoutSession/show?id={data['id']}"
```
