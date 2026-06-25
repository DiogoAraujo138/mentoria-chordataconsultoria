# Cobrança Direta — Asaas

Criação de cobranças para clientes já cadastrados na base. Requer `customerId`.

## Fluxo

1. Criar ou buscar cliente → obter `customer_id`
2. Criar cobrança com o `customer_id`
3. Retorna URL da fatura para o cliente pagar

---

## 1. Criar Cliente

```
POST /v3/customers
```

```json
{
  "name": "João da Silva",
  "cpfCnpj": "12345678909",
  "email": "joao@email.com",
  "mobilePhone": "47999998888"
}
```

Resposta:
```json
{
  "id": "cus_000005219613",
  "name": "João da Silva",
  ...
}
```

Salvar o `id` para usar nas cobranças.

---

## 2. Criar Cobrança

```
POST /v3/payments
```

### Via Pix
```json
{
  "customer": "cus_000005219613",
  "billingType": "PIX",
  "value": 297.00,
  "dueDate": "2025-02-15",
  "description": "Ingresso Congresso VetConnection"
}
```

### Via Boleto
```json
{
  "customer": "cus_000005219613",
  "billingType": "BOLETO",
  "value": 297.00,
  "dueDate": "2025-02-15",
  "description": "Consultoria JurídicoPet"
}
```

### Via Cartão de Crédito (com link de fatura)
```json
{
  "customer": "cus_000005219613",
  "billingType": "CREDIT_CARD",
  "value": 297.00,
  "dueDate": "2025-02-15",
  "description": "Mentoria Chordata Consultoria"
}
```

### Deixar Cliente Escolher o Método
```json
{
  "customer": "cus_000005219613",
  "billingType": "UNDEFINED",
  "value": 297.00,
  "dueDate": "2025-02-15",
  "description": "Palestra VetConnection"
}
```

---

## Resposta da Cobrança

```json
{
  "id": "pay_xxxxxxxxxxxx",
  "status": "PENDING",
  "invoiceUrl": "https://www.asaas.com/i/xxxxxxxxxxxx",
  "bankSlipUrl": "https://www.asaas.com/b/xxxxxxxxxxxx",
  "pixQrCode": { "encodedImage": "...", "payload": "..." },
  ...
}
```

Campos importantes:
- `invoiceUrl` → link da fatura completa (funciona para todos os métodos)
- `bankSlipUrl` → link do boleto
- `pixQrCode.payload` → código copia-e-cola do Pix

---

## Cobrança Parcelada

```
POST /v3/payments
```

```json
{
  "customer": "cus_000005219613",
  "billingType": "CREDIT_CARD",
  "value": 1200.00,
  "dueDate": "2025-02-15",
  "installmentCount": 4,
  "installmentValue": 300.00,
  "description": "Pacote Consultoria Premium"
}
```

---

## Buscar Cliente Existente (evitar duplicatas)

```
GET /v3/customers?cpfCnpj=12345678909
```

```javascript
async function buscarOuCriarCliente(apiKey, dadosCliente) {
  // Busca por CPF
  const busca = await fetch(
    `https://api.asaas.com/v3/customers?cpfCnpj=${dadosCliente.cpfCnpj}`,
    { headers: { "access_token": apiKey } }
  );
  const resultado = await busca.json();
  
  if (resultado.data && resultado.data.length > 0) {
    return resultado.data[0].id; // Retorna o primeiro encontrado
  }
  
  // Cria novo cliente
  const criacao = await fetch("https://api.asaas.com/v3/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access_token": apiKey
    },
    body: JSON.stringify(dadosCliente)
  });
  const cliente = await criacao.json();
  return cliente.id;
}
```

---

## Status das Cobranças

| Status       | Significado                                  |
|--------------|----------------------------------------------|
| `PENDING`    | Aguardando pagamento                         |
| `RECEIVED`   | Pago (dinheiro na conta)                     |
| `CONFIRMED`  | Confirmado (ainda processando)               |
| `OVERDUE`    | Vencido                                      |
| `REFUNDED`   | Estornado                                    |
| `CANCELLED`  | Cancelado                                    |
