import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreditCard, QrCode, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { registrationSchema, type RegistrationFormValues } from '@/types/registration';
import { useRegistration } from '@/hooks/useRegistration';
import { formatPhone, stripPhone } from '@/lib/phone-format';

interface RegistrationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PAYMENT_OPTIONS = [
  {
    value: 'pix' as const,
    icon: QrCode,
    label: 'PIX à vista',
    description: 'Pagamento único instantâneo',
  },
  {
    value: 'cartao_4x' as const,
    icon: CreditCard,
    label: 'Cartão de crédito',
    description: '4x sem juros',
  },
];

export function RegistrationModal({ open, onOpenChange }: RegistrationModalProps) {
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      clinica_empresa: '',
      metodo_pagamento: 'pix',
    },
  });

  const { mutate, isPending } = useRegistration(() => {
    onOpenChange(false);
    form.reset();
  });

  function onSubmit(values: RegistrationFormValues) {
    mutate(values);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-background border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Garantir Minha Vaga</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha seus dados para confirmar a inscrição. Turma limitada a 10 participantes.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone / WhatsApp *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(51) 99999-9999"
                      value={formatPhone(field.value)}
                      onChange={(e) => field.onChange(stripPhone(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clinica_empresa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Clínica / Empresa</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do seu estabelecimento (opcional)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metodo_pagamento"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Forma de pagamento *</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-2 gap-3 mt-1">
                      {PAYMENT_OPTIONS.map((option) => {
                        const Icon = option.icon;
                        const selected = field.value === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => field.onChange(option.value)}
                            className={[
                              'flex flex-col items-center gap-2 p-4 rounded-lg border text-center transition-all',
                              selected
                                ? 'border-brand-teal bg-brand-teal/10 text-foreground'
                                : 'border-border/50 bg-card/30 text-muted-foreground hover:border-border',
                            ].join(' ')}
                          >
                            <Icon className={['w-6 h-6', selected ? 'text-brand-teal' : ''].join(' ')} />
                            <div>
                              <p className="font-semibold text-sm leading-tight">{option.label}</p>
                              <p className="text-xs opacity-70 mt-0.5">{option.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isPending}
              size="lg"
              className="w-full bg-brand-teal hover:bg-brand-teal/90 text-primary-foreground mt-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Processando...
                </>
              ) : (
                'Confirmar Inscrição'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
