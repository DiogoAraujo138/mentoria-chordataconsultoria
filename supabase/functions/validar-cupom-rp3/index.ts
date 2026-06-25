import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { z } from 'npm:zod@3';

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

const VALOR_TOTAL = 2300;

const Schema = z.object({
  codigo: z.string().trim().min(1).max(60),
});

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return new Response(JSON.stringify({ valido: false, error: 'Código inválido' }), {
        status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const codigo = parsed.data.codigo.toUpperCase();

    const { data: cupom, error } = await supabase
      .from('cupons_rp3')
      .select('*')
      .eq('codigo', codigo)
      .maybeSingle();

    if (error) throw error;
    if (!cupom || !cupom.ativo) {
      return new Response(JSON.stringify({ valido: false, error: 'Cupom não encontrado.' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (cupom.expira_em && new Date(cupom.expira_em).getTime() < Date.now()) {
      return new Response(JSON.stringify({ valido: false, error: 'Cupom expirado.' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    if (cupom.max_usos != null && cupom.usos >= cupom.max_usos) {
      return new Response(JSON.stringify({ valido: false, error: 'Cupom esgotado.' }), {
        status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const percentual = Number(cupom.percentual_desconto);
    const valorFinal = Math.max(0, Math.round((VALOR_TOTAL * (1 - percentual / 100)) * 100) / 100);

    return new Response(JSON.stringify({
      valido: true,
      codigo,
      percentual,
      valorOriginal: VALOR_TOTAL,
      valorFinal,
      gratuito: valorFinal === 0,
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('validar-cupom-rp3:', e);
    return new Response(JSON.stringify({ valido: false, error: 'Erro ao validar cupom.' }), {
      status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
