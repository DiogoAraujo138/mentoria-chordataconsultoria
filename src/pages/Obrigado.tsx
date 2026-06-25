import { Helmet } from "react-helmet-async";
import { CheckCircle2, Calendar, MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Obrigado = () => {
  return (
    <>
      <Helmet>
        <title>Inscrição recebida · Mentoria RP3</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <main className="min-h-screen flex items-center justify-center px-4 py-16" style={{ background: "var(--slate-950)" }}>
        <div className="max-w-2xl w-full rounded-3xl p-8 md:p-12 text-center" style={{ background: "var(--slate-900)", border: "1px solid rgba(51,65,85,0.5)" }}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ background: "rgba(37,99,235,0.15)" }}>
            <CheckCircle2 className="w-8 h-8" style={{ color: "var(--blue-400)" }} />
          </div>

          <h1 className="font-heading text-white text-3xl md:text-4xl mb-4">
            Inscrição recebida!
          </h1>

          <p className="text-base md:text-lg mb-8" style={{ color: "var(--slate-400)", lineHeight: 1.7 }}>
            Recebemos sua inscrição na <strong className="text-white">Mentoria RP3 — Turma Junho 2026</strong>.
            Assim que o pagamento for confirmado, você recebe um e-mail com as informações de acesso e os próximos passos.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8 text-left">
            <div className="rounded-xl p-5" style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(51,65,85,0.4)" }}>
              <Calendar className="w-5 h-5 mb-2" style={{ color: "var(--blue-400)" }} />
              <p className="text-white font-semibold mb-1">Próximos encontros</p>
              <p className="text-sm" style={{ color: "var(--slate-400)" }}>
                Todas as terças de junho/2026, das 19:30 às 22:30 (online).
              </p>
            </div>
            <div className="rounded-xl p-5" style={{ background: "rgba(15,23,42,0.6)", border: "1px solid rgba(51,65,85,0.4)" }}>
              <MessageCircle className="w-5 h-5 mb-2" style={{ color: "var(--blue-400)" }} />
              <p className="text-white font-semibold mb-1">Dúvidas?</p>
              <p className="text-sm" style={{ color: "var(--slate-400)" }}>
                Fale com o Mikael: <a href="https://wa.me/5551992358827" className="underline hover:text-white" target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </p>
            </div>
          </div>

          <Link to="/" className="inline-flex items-center gap-2 text-sm hover:text-white" style={{ color: "var(--slate-400)" }}>
            <ArrowLeft className="w-4 h-4" /> Voltar para a landing
          </Link>
        </div>
      </main>
    </>
  );
};

export default Obrigado;
