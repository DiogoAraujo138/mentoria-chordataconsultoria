import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CreditCard, Landmark } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { getProximaTurma } from "@/lib/turma";

type Props = {
  trigger: ReactNode;
};

function maskCPF(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskPhone(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

const CheckoutModal = ({ trigger }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    cupom: "",
  });

  const turma = getProximaTurma();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome || !form.email || !form.cpf || !form.telefone) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-asaas-checkout", {
        body: {
          nome: form.nome.trim(),
          email: form.email.trim(),
          cpf: form.cpf.replace(/\D/g, ""),
          telefone: form.telefone.replace(/\D/g, ""),
          cupomCodigo: form.cupom.trim() || undefined,
          turma: turma.slug,
        },
      });

      if (data?.error) throw new Error(data.error);
      if (error) throw new Error(error.message);
      if (!data?.checkoutUrl) throw new Error("Checkout indisponível no momento.");

      window.location.href = data.checkoutUrl;
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message ?? "Não foi possível iniciar o pagamento.");
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Garantir vaga — Turma {turma.label}</DialogTitle>
          <DialogDescription>
            Preencha seus dados para iniciar o pagamento seguro pelo Asaas (PIX ou Cartão em até 6x sem juros).
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="nome">Nome completo *</Label>
            <Input
              id="nome"
              required
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              disabled={loading}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">E-mail *</Label>
            <Input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={loading}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="cpf">CPF *</Label>
              <Input
                id="cpf"
                required
                inputMode="numeric"
                value={form.cpf}
                onChange={(e) => setForm({ ...form, cpf: maskCPF(e.target.value) })}
                disabled={loading}
                placeholder="000.000.000-00"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="telefone">Telefone *</Label>
              <Input
                id="telefone"
                required
                inputMode="tel"
                value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: maskPhone(e.target.value) })}
                disabled={loading}
                placeholder="(00) 00000-0000"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="cupom">Cupom de desconto (opcional)</Label>
            <Input
              id="cupom"
              value={form.cupom}
              onChange={(e) => setForm({ ...form, cupom: e.target.value.toUpperCase() })}
              disabled={loading}
              placeholder="Se você tem um cupom, cole aqui"
            />
          </div>

          <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5" /> PIX
            </div>
            <div className="flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5" /> Cartão até 6x sem juros
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full bg-brand-teal hover:bg-brand-teal/90 text-primary-foreground"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Redirecionando…
              </>
            ) : (
              "Ir para o pagamento"
            )}
          </Button>

          <p className="text-[11px] text-muted-foreground text-center">
            Pagamento processado pelo Asaas com criptografia bancária. Você será redirecionado para concluir.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
