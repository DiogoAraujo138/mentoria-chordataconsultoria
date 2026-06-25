# Webhooks — Confirmação de Pagamentos Asaas

Os webhooks permitem que seu sistema seja notificado automaticamente quando um pagamento é recebido, sem precisar ficar consultando a API.

## Configuração no Painel Asaas

1. Acesse **Asaas → Integrações → Webhooks**
2. Adicione a URL do seu endpoint: `https://seusite.com/webhooks/asaas`
3. Selecione os eventos desejados
4. Salve

## Eventos Principais

| Evento                    | Quando Dispara                          |
|---------------------------|-----------------------------------------|
| `PAYMENT_RECEIVED`        | Pagamento confirmado (Pix/boleto)       |
| `PAYMENT_CONFIRMED`       | Cartão aprovado                         |
| `PAYMENT_OVERDUE`         | Cobrança vencida                        |
| `PAYMENT_DELETED`         | Cobrança excluída                       |
| `PAYMENT_REFUNDED`        | Estorno processado                      |
| `SUBSCRIPTION_CREATED`    | Nova assinatura criada                  |
| `SUBSCRIPTION_CANCELLED`  | Assinatura cancelada                    |

## Estrutura do Payload

```json
{
  "event": "PAYMENT_RECEIVED",
  "payment": {
    "id": "pay_xxxxxxxxxxxx",
    "customer": "cus_000005219613",
    "paymentLink": "pln_xxxxxxxxxxxx",
    "value": 297.00,
    "netValue": 289.00,
    "billingType": "PIX",
    "status": "RECEIVED",
    "dueDate": "2025-02-15",
    "paymentDate": "2025-02-14",
    "description": "Ingresso Congresso VetConnection",
    "externalReference": "pedido_123"
  }
}
```

## Implementação do Endpoint (Node.js / Express)

```javascript
const express = require('express');
const app = express();

app.post('/webhooks/asaas', express.json(), (req, res) => {
  const { event, payment } = req.body;
  
  switch (event) {
    case 'PAYMENT_RECEIVED':
    case 'PAYMENT_CONFIRMED':
      console.log(`✅ Pagamento recebido: ${payment.id} — R$ ${payment.value}`);
      // Liberar acesso, emitir ingresso, ativar conta, etc.
      liberarAcessoCliente(payment.customer, payment.description);
      break;
      
    case 'PAYMENT_OVERDUE':
      console.log(`⚠️ Pagamento vencido: ${payment.id}`);
      // Suspender acesso, enviar lembrete, etc.
      break;
      
    case 'SUBSCRIPTION_CANCELLED':
      console.log(`❌ Assinatura cancelada`);
      // Revogar acesso, etc.
      break;
  }
  
  // Sempre responder 200 para o Asaas
  res.sendStatus(200);
});
```

## Implementação do Endpoint (Python / Flask)

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhooks/asaas', methods=['POST'])
def webhook_asaas():
    dados = request.get_json()
    evento = dados.get('event')
    pagamento = dados.get('payment', {})
    
    if evento in ('PAYMENT_RECEIVED', 'PAYMENT_CONFIRMED'):
        print(f"✅ Pagamento recebido: {pagamento['id']} — R$ {pagamento['value']}")
        # Lógica de liberação de acesso
        
    elif evento == 'PAYMENT_OVERDUE':
        print(f"⚠️ Vencido: {pagamento['id']}")
    
    return jsonify({"status": "ok"}), 200
```

## Dica: externalReference

Ao criar a cobrança ou o checkout, use o campo `externalReference` para associar ao seu sistema:

```json
{
  "items": [{ "name": "Ingresso", "value": 297.00, "quantity": 1 }],
  "externalReference": "inscricao_usuario_456"
}
```

No webhook, `payment.externalReference` terá o valor `inscricao_usuario_456`, facilitando vincular o pagamento ao seu banco de dados.

## Verificar Autenticidade do Webhook

Para validar que a requisição veio do Asaas, compare o IP de origem com os IPs publicados pelo Asaas (consulte a documentação de segurança) ou configure um token fixo na URL:

```
https://seusite.com/webhooks/asaas?token=SEU_TOKEN_SECRETO
```
