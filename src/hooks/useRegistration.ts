import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { PAYMENT_LINKS } from '@/lib/payment-links';
import type { RegistrationFormValues } from '@/types/registration';

async function insertRegistration(data: RegistrationFormValues) {
  const { error } = await supabase.from('registrations').insert({
    nome: data.nome,
    email: data.email,
    telefone: data.telefone,
    clinica_empresa: data.clinica_empresa || null,
    metodo_pagamento: data.metodo_pagamento,
  });
  if (error) throw error;
  return data.metodo_pagamento;
}

export function useRegistration(onSuccess: () => void) {
  return useMutation({
    mutationFn: insertRegistration,
    onSuccess: (metodo) => {
      onSuccess();
      toast.success('Inscrição confirmada! Redirecionando para o pagamento...');
      setTimeout(() => {
        window.open(PAYMENT_LINKS[metodo], '_blank');
      }, 800);
    },
    onError: () => {
      toast.error('Erro ao processar inscrição. Tente novamente ou entre em contato pelo WhatsApp.');
    },
  });
}
