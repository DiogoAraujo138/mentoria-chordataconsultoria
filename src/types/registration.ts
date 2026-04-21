import { z } from 'zod';

export const registrationSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  telefone: z.string().min(10, 'Telefone inválido — informe DDD + número'),
  clinica_empresa: z.string().optional(),
  metodo_pagamento: z.enum(['pix', 'cartao_4x'], {
    required_error: 'Selecione a forma de pagamento',
  }),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
