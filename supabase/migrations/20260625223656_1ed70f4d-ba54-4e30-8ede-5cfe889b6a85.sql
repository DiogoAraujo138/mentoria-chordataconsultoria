
CREATE TABLE public.inscricoes_rp3 (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  cpf TEXT NOT NULL,
  telefone TEXT NOT NULL,
  asaas_customer_id TEXT,
  asaas_payment_id TEXT,
  asaas_checkout_id TEXT,
  valor NUMERIC(10,2) NOT NULL,
  parcelas INT NOT NULL DEFAULT 1,
  forma_pagamento TEXT,
  status TEXT NOT NULL DEFAULT 'PENDING',
  ambiente TEXT NOT NULL DEFAULT 'sandbox',
  checkout_url TEXT,
  raw_webhook JSONB
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.inscricoes_rp3 TO authenticated;
GRANT ALL ON public.inscricoes_rp3 TO service_role;

ALTER TABLE public.inscricoes_rp3 ENABLE ROW LEVEL SECURITY;

-- Sem políticas públicas: apenas service_role (edge functions) acessa.
-- authenticated tem GRANT mas sem policy = bloqueado por RLS, conforme desejado.

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_inscricoes_rp3_updated_at
BEFORE UPDATE ON public.inscricoes_rp3
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_inscricoes_rp3_email ON public.inscricoes_rp3(email);
CREATE INDEX idx_inscricoes_rp3_payment ON public.inscricoes_rp3(asaas_payment_id);
CREATE INDEX idx_inscricoes_rp3_status ON public.inscricoes_rp3(status);
