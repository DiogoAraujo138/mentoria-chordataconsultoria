import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const onlyDigits = (s: string) => s.replace(/\D/g, "");

const maskCpf = (v: string) => {
  const d = onlyDigits(v).slice(0, 11);
  return d
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
};
const maskPhone = (v: string) => {
  const d = onlyDigits(v).slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim();
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim();
};

const CheckoutModal = ({ open, onOpenChange }: CheckoutModalProps) => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    parcelas: 1,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (form.nome.trim().length < 2 || !form.email.includes("@") || onlyDigits(form.cpf).length !== 11 || onlyDigits(form.telefone).length < 10) {
      toast.error("Confira seus dados antes de continuar.");
      return;
    }

    setLoading(true);
    try {
      const origin = window.location.origin;
      const { data, error } = await supabase.functions.invoke("criar-checkout-rp3", {
        body: {
          nome: form.nome.trim(),
          email: form.email.trim().toLowerCase(),
          cpf: onlyDigits(form.cpf),
          telefone: onlyDigits(form.telefone),
          parcelas: Number(form.parcelas) || 1,
          successUrl: `${origin}/obrigado`,
          cancelUrl: `${origin}/#investimento`,
        },
      });

      if (error) throw error;
      if (!data?.checkoutUrl) throw new Error("Não foi possível gerar o link de pagamento.");

      // Redireciona para o checkout seguro do Asaas
      window.location.href = data.checkoutUrl;
    } catch (err) {
      console.error(err);
      const msg = err instanceof Error ? err.message : "Erro ao iniciar o pagamento.";
      toast.error(msg);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !loading && onOpenChange(v)}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Inscrição · Mentoria RP3</DialogTitle>
          <DialogDescription>
            Turma Junho 2026 · R$ 2.300 à vista ou em até 6x sem juros. Preencha seus dados para gerar o pagamento.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="nome">Nome completo</Label>
            <Input id="nome" required maxLength={120} value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })} disabled={loading} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" required maxLength={255} value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={loading} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" required value={form.cpf}
                onChange={(e) => setForm({ ...form, cpf: maskCpf(e.target.value) })}
                placeholder="000.000.000-00" disabled={loading} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefone">WhatsApp</Label>
              <Input id="telefone" required value={form.telefone}
                onChange={(e) => setForm({ ...form, telefone: maskPhone(e.target.value) })}
                placeholder="(00) 00000-0000" disabled={loading} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="parcelas">Forma de pagamento</Label>
            <select
              id="parcelas"
              value={form.parcelas}
              onChange={(e) => setForm({ ...form, parcelas: Number(e.target.value) })}
              disabled={loading}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value={1}>Pix ou Boleto à vista — R$ 2.300,00</option>
              <option value={2}>Cartão 2x sem juros — R$ 1.150,00</option>
              <option value={3}>Cartão 3x sem juros — R$ 766,67</option>
              <option value={4}>Cartão 4x sem juros — R$ 575,00</option>
              <option value={5}>Cartão 5x sem juros — R$ 460,00</option>
              <option value={6}>Cartão 6x sem juros — R$ 383,33</option>
            </select>
            <p className="text-xs text-muted-foreground">
              Você escolhe a forma final (Pix, Boleto ou Cartão) na próxima tela, segura e processada pelo Asaas.
            </p>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-brand-teal hover:bg-brand-teal/90 text-primary-foreground py-6 text-base">
            {loading ? (
              <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Gerando pagamento...</>
            ) : (
              <><Lock className="mr-2 w-4 h-4" /> Ir para pagamento seguro</>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Pagamento processado pelo Asaas. Seus dados de cartão não passam por este site.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
