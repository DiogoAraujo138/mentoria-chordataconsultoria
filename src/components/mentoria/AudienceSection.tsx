const items = [
  "Você é o maior gargalo da própria clínica: tudo passa por você",
  "A equipe não segue protocolo sem supervisão direta",
  "O faturamento oscila e você não sabe exatamente por que",
  "Você trabalha mais do que quando era só clínico",
  "Tem dificuldade de cobrar o que o serviço vale",
  "Crescer parece arriscado porque a estrutura não acompanha",
];

const AudienceSection = () => {
  return (
    <section id="para-quem" className="py-24 px-6" style={{ backgroundColor: "var(--slate-800)" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-start">
        <div data-animate className="opacity-0">
          <span className="section-label">Para quem é</span>
          <h2 className="text-white mb-5">
            Para o veterinário que virou gestor e quer fazer as duas coisas bem
          </h2>
          <p style={{ color: "var(--slate-400)", fontSize: "1.0625rem", lineHeight: 1.75 }}>
            Se você reconhece pelo menos três situações ao lado, o RP3 foi pensado para o seu momento.
          </p>
        </div>

        <ul data-animate className="opacity-0">
          {items.map((text, i) => (
            <li
              key={i}
              className="flex items-start gap-3 py-3"
              style={{
                borderBottom: i < items.length - 1 ? "1px solid rgba(51,65,85,0.4)" : "none",
              }}
            >
              <span
                className="material-icons-round shrink-0"
                style={{ color: "var(--blue-400)", fontSize: 22, marginTop: 2 }}
              >
                check_circle
              </span>
              <span style={{ color: "var(--slate-300)", fontSize: "1rem", lineHeight: 1.6 }}>
                {text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AudienceSection;
