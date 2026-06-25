
CREATE TABLE public.cupons_rp3 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo text NOT NULL UNIQUE,
  percentual_desconto numeric NOT NULL CHECK (percentual_desconto > 0 AND percentual_desconto <= 100),
  max_usos integer,
  usos integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  expira_em timestamptz,
  observacao text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.cupons_rp3 TO service_role;
ALTER TABLE public.cupons_rp3 ENABLE ROW LEVEL SECURITY;
-- Sem políticas: apenas service_role (edge functions) acessa.

CREATE TRIGGER cupons_rp3_set_updated_at
BEFORE UPDATE ON public.cupons_rp3
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

ALTER TABLE public.inscricoes_rp3
  ADD COLUMN IF NOT EXISTS cupom_codigo text,
  ADD COLUMN IF NOT EXISTS percentual_desconto numeric NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS valor_original numeric;
