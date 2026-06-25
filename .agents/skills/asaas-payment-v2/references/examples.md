# Exemplos Completos por Empresa — Ecossistema Chordata

Cada exemplo já inclui a variável de ambiente correta para a conta Asaas de cada empresa.

---

## 1. VetConnection — Ingresso de Congresso

**Conta:** `ASAAS_API_KEY_VETCONNECTION`  
**Cenário:** Compra de ingresso com Pix ou cartão, redirecionamento para página de confirmação.

```javascript
async function gerarIngressoVetConnection(dadosComprador) {
  const API_KEY = process.env.ASAAS_API_KEY_VETCONNECTION;

  const response = await fetch("https://api.asaas.com/v3/checkoutSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "access_token": API_KEY
    },
    body: JSON.stringify({
      billingTypes: ["PIX", "CREDIT_CARD"],
      chargeTypes: ["DETACHED"],
      minutesToExpire: 30,
      callback: {
        successUrl: "https://vetconnection.com.br/inscricao/confirmada",
        cancelUrl: "https://vetconnection.com.br/inscricao/cancelada",
        expiredUrl: "https://vetconnection.com.br/inscricao/expirada"
      },
      items: [{
        name: "Ingresso — Congresso VetConnection 2025",
        description: "Acesso completo: 2 dias, 20+ palestras, certificado digital",
        quantity: 1,
        value: 297.00
      }],
      customerData: {
        name: dadosComprador.nome,
        email: dadosComprador.email,
        cpfCnpj: dadosComprador.cpf,
        phone: dadosComprador.telefone
      },
      externalReference: `vc_ingresso_${dadosComprador.cpf}_2025`
    })
  });

  const data = await response.json();
  return `https://asaas.com/checkoutSession/show?id=${data.id}`;
}
```

**Payment Link alternativo (para divulgação em redes):**
```javascript
async function criarLinkIngressoVetConnection() {
  const API_KEY = process.env.ASAAS_API_KEY_VETCONNECTION;

  const response = await fetch("https://api.asaas.com/v3/paymentLinks", {
    method: "POST",
    headers: { "Content-Type": "application/json", "access_token": API_KEY },
    body: JSON.stringify({
      name: "Ingresso Congresso VetConnection 2025",
      description: "Acesso completo ao evento. 2 dias de palestras + certificado.",
      value: 297.00,
      billingType: "UNDEFINED",
      chargeType: "DETACHED",
      dueDateLimitDays: 3
    })
  });

  const data = await response.json();
  return data.url; // Compartilhar no Instagram, WhatsApp, e-mail
}
```

---

## 2. VetConnection — Palestra Avulsa

**Conta:** `ASAAS_API_KEY_VETCONNECTION`  
**Cenário:** Palestra gravada ou ao vivo, venda individual.

```javascript
async function criarLinkPalestraVetConnection(palestra) {
  const API_KEY = process.env.ASAAS_API_KEY_VETCONNECTION;

  const response = await fetch("https://api.asaas.com/v3/paymentLinks", {
    method: "POST",
    headers: { "Content-Type": "application/json", "access_token": API_KEY },
    body: JSON.stringify({
      name: palestra.titulo,
      description: palestra.descricao,
      value: palestra.valor,
      billingType: "UNDEFINED",
      chargeType: "DETACHED",
      dueDateLimitDays: 3,
      notificationEnabled: true
    })
  });

  const data = await response.json();
  return data.url;
}
```

---

## 3. Chordata Consultoria — Mentoria RPT (Recorrente Mensal)

**Conta:** `ASAAS_API_KEY_CHORDATA`  
**Cenário:** Cliente assina mentoria mensal, cobrança automática no cartão.

```javascript
// Checkout direto — cliente preenche os dados e assina
async function checkoutMentoriaRPT() {
  const API_KEY = process.env.ASAAS_API_KEY_CHORDATA;

  const response = await fetch("https://api.asaas.com/v3/checkoutSession", {
    method: "POST",
    headers: { "Content-Type": "application/json", "access_token": API_KEY },
    body: JSON.stringify({
      billingTypes: ["CREDIT_CARD"],
      chargeTypes: ["RECURRENT"],
      minutesToExpire: 1440,
      callback: {
        successUrl: "https://chordata.com.br/mentoria/bem-vindo",
        cancelUrl: "https://chordata.com.br/mentoria",
        expiredUrl: "https://chordata.com.br/mentoria"
      },
      items: [{
        name: "Mentoria RPT — Mensal",
        description: "Acompanhamento semanal + grupo WhatsApp exclusivo + materiais",
        quantity: 1,
        value: 497.00
      }],
      subscription: { cycle: "MONTHLY" }
    })
  });

  const data = await response.json();
  return `https://asaas.com/checkoutSession/show?id=${data.id}`;
}
```

**Alternativa: criar assinatura direta para cliente já cadastrado:**
```javascript
async function assinarMentoriaRPT(customerId) {
  const API_KEY = process.env.ASAAS_API_KEY_CHORDATA;

  const response = await fetch("https://api.asaas.com/v3/subscriptions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "access_token": API_KEY },
    body: JSON.stringify({
      customer: customerId,
      billingType: "CREDIT_CARD",
      value: 497.00,
      nextDueDate: new Date().toISOString().split('T')[0],
      cycle: "MONTHLY",
      description: "Mentoria RPT — Acompanhamento Mensal Chordata"
    })
  });

  return response.json();
}
```

---

## 4. Chordata Consultoria — Consultoria Avulsa

**Conta:** `ASAAS_API_KEY_CHORDATA`  
**Cenário:** Sessão única de consultoria estratégica, cliente escolhe como pagar.

```javascript
async function gerarCheckoutConsultoriaAvulsa(dadosCliente, valor, descricao) {
  const API_KEY = process.env.ASAAS_API_KEY_CHORDATA;

  const response = await fetch("https://api.asaas.com/v3/checkoutSession", {
    method: "POST",
    headers: { "Content-Type": "application/json", "access_token": API_KEY },
    body: JSON.stringify({
      billingTypes: ["PIX", "CREDIT_CARD"],
      chargeTypes: ["DETACHED"],
      minutesToExpire: 1440,
      callback: {
        successUrl: "https://chordata.com.br/consultoria/agendada",
        cancelUrl: "https://chordata.com.br/consultoria",
        expiredUrl: "https://chordata.com.br/consultoria"
      },
      items: [{
        name: "Consultoria Estratégica — Chordata Consultoria",
        description: descricao,
        quantity: 1,
        value: valor
      }],
      customerData: dadosCliente,
      externalReference: `chordata_consultoria_${Date.now()}`
    })
  });

  const data = await response.json();
  return `https://asaas.com/checkoutSession/show?id=${data.id}`;
}
```

---

## 5. JurídicoPet Digital — Consultoria Jurídica Parcelada

**Conta:** `ASAAS_API_KEY_JURIDICOPET`  
**Cenário:** Pacote de consultorias jurídicas em até 3x no cartão.

```javascript
async function gerarCheckoutConsultoriaJuridica() {
  const API_KEY = process.env.ASAAS_API_KEY_JURIDICOPET;

  const response = await fetch("https://api.asaas.com/v3/checkoutSession", {
    method: "POST",
    headers: { "Content-Type": "application/json", "access_token": API_KEY },
    body: JSON.stringify({
      billingTypes: ["PIX", "CREDIT_CARD"],
      chargeTypes: ["DETACHED", "INSTALLMENT"],
      minutesToExpire: 1440,
      installment: { maxInstallmentCount: 3 },
      callback: {
        successUrl: "https://juridicopet.com.br/consulta/agendada",
        cancelUrl: "https://juridicopet.com.br/consulta",
        expiredUrl: "https://juridicopet.com.br/consulta"
      },
      items: [{
        name: "Pacote Consultoria Jurídica — 3 Sessões",
        description: "3 consultorias individuais, 60min cada. Agendamento por e-mail.",
        quantity: 1,
        value: 900.00
      }],
      externalReference: `jp_consultoria_${Date.now()}`
    })
  });

  const data = await response.json();
  return `https://asaas.com/checkoutSession/show?id=${data.id}`;
}
```

---

## 6. MentAll.Vet — Programa de Bem-Estar (Recorrente)

**Conta:** `ASAAS_API_KEY_MENTALLVET`  
**Cenário:** Clínica assina programa mensal de bem-estar para equipe.

```javascript
async function assinarProgramaBemEstar(dadosContratante) {
  const API_KEY = process.env.ASAAS_API_KEY_MENTALLVET;

  const response = await fetch("https://api.asaas.com/v3/checkoutSession", {
    method: "POST",
    headers: { "Content-Type": "application/json", "access_token": API_KEY },
    body: JSON.stringify({
      billingTypes: ["CREDIT_CARD"],
      chargeTypes: ["RECURRENT"],
      minutesToExpire: 1440,
      callback: {
        successUrl: "https://mentall.vet/programa/bem-vindo",
        cancelUrl: "https://mentall.vet/programa",
        expiredUrl: "https://mentall.vet/programa"
      },
      items: [{
        name: "Programa Bem-Estar Veterinário — Mensal",
        description: "Avaliações mensais + suporte contínuo + relatórios NR-1",
        quantity: 1,
        value: 347.00
      }],
      subscription: { cycle: "MONTHLY" },
      customerData: dadosContratante
    })
  });

  const data = await response.json();
  return `https://asaas.com/checkoutSession/show?id=${data.id}`;
}
```

---

## 7. Webhook Unificado — Múltiplas Empresas

Um endpoint que distingue qual empresa recebeu o pagamento pelo `externalReference`:

```javascript
app.post('/webhooks/asaas', express.json(), async (req, res) => {
  const { event, payment } = req.body;
  const ref = payment?.externalReference || '';

  if (event === 'PAYMENT_RECEIVED' || event === 'PAYMENT_CONFIRMED') {
    
    if (ref.startsWith('vc_')) {
      // VetConnection — liberar ingresso ou acesso à palestra
      await processarPagamentoVetConnection(payment);

    } else if (ref.startsWith('chordata_')) {
      // Chordata Consultoria — agendar sessão ou ativar mentoria
      await processarPagamentoChordata(payment);

    } else if (ref.startsWith('jp_')) {
      // JurídicoPet — agendar consultoria jurídica
      await processarPagamentoJuridicoPet(payment);

    } else if (ref.startsWith('mv_')) {
      // MentAll.Vet — ativar programa de bem-estar
      await processarPagamentoMentAllVet(payment);
    }
  }

  res.sendStatus(200);
});
```

---

## Variáveis de Ambiente (resumo)

```env
# .env — nunca versionar este arquivo

ASAAS_API_KEY_VETCONNECTION=sua_key_da_conta_vetconnection
ASAAS_API_KEY_CHORDATA=sua_key_da_conta_chordata_consultoria
ASAAS_API_KEY_JURIDICOPET=sua_key_da_conta_juridicopet
ASAAS_API_KEY_MENTALLVET=sua_key_da_conta_mentallvet
ASAAS_API_KEY_ANALYTICS=sua_key_da_conta_chordata_analytics
```

---

## Tabela Rápida de Configuração

| Empresa               | Variável ENV                    | billingTypes              | chargeTypes                   |
|-----------------------|---------------------------------|---------------------------|-------------------------------|
| VetConnection         | `ASAAS_API_KEY_VETCONNECTION`  | PIX, CREDIT_CARD          | DETACHED                      |
| Chordata Consultoria  | `ASAAS_API_KEY_CHORDATA`       | CREDIT_CARD, PIX          | DETACHED, INSTALLMENT, RECURRENT |
| JurídicoPet Digital   | `ASAAS_API_KEY_JURIDICOPET`    | PIX, CREDIT_CARD          | DETACHED, INSTALLMENT         |
| MentAll.Vet           | `ASAAS_API_KEY_MENTALLVET`     | CREDIT_CARD               | RECURRENT, DETACHED           |
| Chordata Analytics    | `ASAAS_API_KEY_ANALYTICS`      | PIX, CREDIT_CARD          | DETACHED                      |
