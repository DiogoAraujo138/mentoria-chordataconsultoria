# Backend — Pagamento Asaas + Chatwoot

## Fluxo

1. Landing (`CheckoutModal`) → `create-asaas-checkout`
2. Asaas Checkout hospedado (PIX + cartão até 6x)
3. Webhook Asaas → `asaas-webhook` → atualiza `inscricoes_rp3` + notifica Chatwoot

## Secrets (Supabase Edge Functions)

| Secret | Uso |
|--------|-----|
| `ASAASOFICIAL` | API key produção |
| `ASAAS_API_KEY_CHORDATA_SANDBOX` | API key sandbox |
| `ASAAS_ENV` | `production` ou `sandbox` |
| `ASAAS_WEBHOOK_TOKEN` | Header `asaas-access-token` |
| `CHATWOOT_URL` | `https://chordata-chatwoot.kk28lc.easypanel.host` |
| `CHATWOOT_ACCOUNT_ID` | `1` |
| `CHATWOOT_API_TOKEN` | token API |
| `CHATWOOT_INBOX_ID` | `9` (Chordata - Suporte) |

## Chatwoot / Evolution

- Inbox: **Chordata - Suporte** (`id=9`)
- Webhook Evolution: `https://chordata-evolution-api.kk28lc.easypanel.host/chatwoot/webhook/Chordata%20-%20Suporte`
- WhatsApp LP: centralizado em `src/lib/contact.ts`

## Deploy das functions

```bash
supabase functions deploy create-asaas-checkout --project-ref dqmoftaemhpaynxlaidd
supabase functions deploy asaas-webhook --project-ref dqmoftaemhpaynxlaidd
```

No painel Asaas → Webhooks:

- URL: `https://dqmoftaemhpaynxlaidd.supabase.co/functions/v1/asaas-webhook`
- Token: mesmo valor de `ASAAS_WEBHOOK_TOKEN`
- Eventos: `PAYMENT_CREATED`, `PAYMENT_CONFIRMED`, `PAYMENT_RECEIVED`, `PAYMENT_OVERDUE`, `PAYMENT_REFUNDED`

`verify_jwt = false` está em `supabase/config.toml` para ambas as functions.
