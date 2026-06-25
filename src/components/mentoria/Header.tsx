import chordataLogo from "@/assets/logos/chordata-logo-white.png";

const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-md"
      style={{
        backgroundColor: "rgba(15,23,42,0.85)",
        borderBottom: "1px solid rgba(51,65,85,0.5)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center">
          <img src={chordataLogo} alt="Chordata Consultoria" className="h-9 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#metodo" className="text-sm font-medium" style={{ color: "var(--slate-400)" }}>O método</a>
          <a href="#para-quem" className="text-sm font-medium" style={{ color: "var(--slate-400)" }}>Para quem é</a>
          <a href="#entregaveis" className="text-sm font-medium" style={{ color: "var(--slate-400)" }}>Entregáveis</a>
          <a href="#investimento" className="text-sm font-medium" style={{ color: "var(--slate-400)" }}>Investimento</a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://portalrp3.lovable.app"
            target="_blank"
            rel="noopener"
            className="hidden sm:inline-flex items-center gap-2 text-sm"
            style={{ color: "var(--slate-400)" }}
          >
            <span className="material-icons-round" style={{ fontSize: 18 }}>login</span>
            Portal do aluno
          </a>
          <a href="#cta-final" className="btn-primary" style={{ padding: "10px 22px", fontSize: "0.9rem" }}>
            Inscreva-se
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
