import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: {
    id: string;
    nome: string;
    email: string;
    telefone: string;
    clinica_empresa: string | null;
    metodo_pagamento: 'pix' | 'cartao_4x';
    created_at: string;
  };
}

serve(async (req: Request) => {
  try {
    const payload: WebhookPayload = await req.json();
    const { record } = payload;

    const paymentLabel =
      record.metodo_pagamento === 'pix' ? 'PIX à vista' : 'Cartão de crédito 4x';

    const dataFormatada = new Date(record.created_at).toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
    });

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const notificationEmail = Deno.env.get('NOTIFICATION_EMAIL') ?? 'contato@chordataconsultoria.com';
    const fromEmail = Deno.env.get('FROM_EMAIL') ?? 'mentoria@chordataconsultoria.com';

    const emailHtml = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a2e;">
        <div style="background: #0d9488; padding: 24px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Nova inscrição na Mentoria</h1>
        </div>
        <div style="background: #f9fafb; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; font-weight: 600; width: 160px; color: #6b7280;">Nome</td>
              <td style="padding: 10px 0;">${record.nome}</td>
            </tr>
            <tr style="border-top: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">E-mail</td>
              <td style="padding: 10px 0;"><a href="mailto:${record.email}" style="color: #0d9488;">${record.email}</a></td>
            </tr>
            <tr style="border-top: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">Telefone</td>
              <td style="padding: 10px 0;">${record.telefone}</td>
            </tr>
            ${record.clinica_empresa ? `
            <tr style="border-top: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">Clínica/Empresa</td>
              <td style="padding: 10px 0;">${record.clinica_empresa}</td>
            </tr>` : ''}
            <tr style="border-top: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">Pagamento</td>
              <td style="padding: 10px 0;"><strong style="color: #0d9488;">${paymentLabel}</strong></td>
            </tr>
            <tr style="border-top: 1px solid #e5e7eb;">
              <td style="padding: 10px 0; font-weight: 600; color: #6b7280;">Data</td>
              <td style="padding: 10px 0;">${dataFormatada}</td>
            </tr>
          </table>
        </div>
        <p style="color: #9ca3af; font-size: 12px; margin-top: 16px; text-align: center;">
          Chordata Consultoria — Mentoria em Gestão Clínica e Hospitalar
        </p>
      </div>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: notificationEmail,
        subject: `Nova inscrição: ${record.nome} — ${paymentLabel}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      console.error('Resend error:', await response.text());
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Edge Function error:', err);
    // Retorna 200 para evitar reenvio infinito pelo webhook
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
