import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, BadgePercent, Check, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const onlyDigits = (s: string) => s.replace(/\D/g, "");
const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

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

const VALOR_BASE = 2300;

type CupomState = {
  codigo: string;
  percentual: number;
  valorFinal: number;
  gratuito: boolean;
};

const CheckoutModal = ({ open, onOpenChange }: CheckoutModalProps) => {
  const [loading, setLoading] = useState(false);
  const [cupomInput, setCupomInput] = useState("");
  const [validandoCupom, setValidandoCupom] = useState(false);
  const [cupom, setCupom] = useState<CupomState | null>(null);
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    parcelas: 1,
  });

  const valorFinal = cupom ? cupom.valorFinal : VALOR_BASE;
  const parcelaValor = valorFinal / (form.parcelas || 1);

  const aplicarCupom = async () => {
    const codigo = cupomInput.trim();
    if (!codigo) return;
    setValidandoCupom(true);
    try {
      const { data, error } = await supabase.functions.invoke("validar-cupom-rp3", {
        body: { codigo },
      });
      if (error) throw error;
      if (!data?.valido) {
        toast.error(data?.error ?? "Cupom inválido.");
        setCupom(null);
        return;
      }
      setCupom({
        codigo: data.codigo,
        percentual: data.percentual,
        valorFinal: data.valorFinal,
        gratuito: data.gratuito,
      });
      toast.success(
        data.gratuito
          ? "Cupom de 100% aplicado! Inscrição gratuita."
          : `Cupom aplicado: ${data.percentual}% de desconto.`,
      );
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível validar o cupom.");
    } finally {
      setValidandoCupom(false);
    }
  };

  const removerCupom = () => {
    setCupom(null);
    setCupomInput("");
  };

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
          parcelas: cupom?.gratuito ? 1 : Number(form.parcelas) || 1,
          successUrl: `${origin}/obrigado`,
          cancelUrl: `${origin}/#investimento`,
          cupom: cupom?.codigo ?? null,
        },
      });

      if (error) throw error;
      if (!data?.checkoutUrl) throw new Error("Não foi possível gerar o link de pagamento.");

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
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Inscrição · Mentoria RP3</DialogTitle>
          <DialogDescription>
            Turma Junho 2026. Preencha seus dados para gerar o pagamento.
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

          {/* Cupom */}
          <div className="grid gap-2 rounded-md border border-dashed p-3">
            <Label htmlFor="cupom" className="flex items-center gap-2">
              <BadgePercent className="w-4 h-4 text-brand-teal" /> Cupom de desconto (opcional)
            </Label>
            {cupom ? (
              <div className="flex items-center justify-between bg-brand-teal/10 rounded-md px-3 py-2">
                <div className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-brand-teal" />
                  <span className="font-semibold">{cupom.codigo}</span>
                  <span className="text-muted-foreground">— {cupom.percentual}% off</span>
                </div>
                <button type="button" onClick={removerCupom} disabled={loading}
                  className="text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input id="cupom" value={cupomInput}
                  onChange={(e) => setCupomInput(e.target.value.toUpperCase())}
                  placeholder="Digite seu cupom" maxLength={60}
                  disabled={loading || validandoCupom} />
                <Button type="button" variant="outline" onClick={aplicarCupom}
                  disabled={loading || validandoCupom || !cupomInput.trim()}>
                  {validandoCupom ? <Loader2 className="w-4 h-4 animate-spin" /> : "Aplicar"}
                </Button>
              </div>
            )}
          </div>

          {!cupom?.gratuito && (
            <div className="grid gap-2">
              <Label htmlFor="parcelas">Forma de pagamento</Label>
              <select
                id="parcelas"
                value={form.parcelas}
                onChange={(e) => setForm({ ...form, parcelas: Number(e.target.value) })}
                disabled={loading}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n === 1 ? `Pix ou Boleto à vista — ${brl(valorFinal)}` : `Cartão ${n}x sem juros — ${brl(valorFinal / n)}`}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">
                Você escolhe a forma final (Pix, Boleto ou Cartão) na próxima tela, segura e processada pelo Asaas.
              </p>
            </div>
          )}

          {/* Resumo */}
          <div className="rounded-md bg-muted/40 p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span>Valor original</span>
              <span className={cupom ? "line-through text-muted-foreground" : ""}>{brl(VALOR_BASE)}</span>
            </div>
            {cupom && (
              <div className="flex justify-between text-brand-teal font-medium">
                <span>Desconto ({cupom.percentual}%)</span>
                <span>− {brl(VALOR_BASE - valorFinal)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold pt-1 border-t">
              <span>Total</span>
              <span>{brl(valorFinal)}</span>
            </div>
            {!cupom?.gratuito && form.parcelas > 1 && (
              <p className="text-xs text-muted-foreground">{form.parcelas}x de {brl(parcelaValor)} sem juros</p>
            )}
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-brand-teal hover:bg-brand-teal/90 text-primary-foreground py-6 text-base">
            {loading ? (
              <><Loader2 className="mr-2 w-4 h-4 animate-spin" /> Processando...</>
            ) : cupom?.gratuito ? (
              <><Check className="mr-2 w-4 h-4" /> Confirmar inscrição gratuita</>
            ) : (
              <><Lock className="mr-2 w-4 h-4" /> Ir para pagamento seguro</>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            {cupom?.gratuito
              ? "Sua inscrição será confirmada imediatamente."
              : "Pagamento processado pelo Asaas. Seus dados de cartão não passam por este site."}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
