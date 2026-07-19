// Rotação automática da turma da Mentoria RP3.
// Regra: sempre vendemos a turma do MÊS SEGUINTE ao mês atual.
// Ex.: em Julho vendemos Agosto; em Agosto vendemos Setembro.

const MESES_PT = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

const MESES_SLUG = [
  "janeiro",
  "fevereiro",
  "marco",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
];

export type Turma = {
  mes: string;              // "Agosto"
  mesSlug: string;          // "agosto"
  ano: number;              // 2026
  slug: string;             // "agosto-2026"
  label: string;            // "Agosto/2026"
  labelExtenso: string;     // "Agosto de 2026"
  inicioISO: string;        // "2026-08-04"
  fimISO: string;           // "2026-08-25"
  tercas: Array<{ dia: number; label: string; dataExtensa: string }>;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// Retorna as 4 primeiras terças-feiras do mês/ano informado
function tercasDoMes(ano: number, mesIndex0: number) {
  const primeira = new Date(ano, mesIndex0, 1);
  const diaSemana = primeira.getDay(); // 0=dom, 2=terça
  const offset = (2 - diaSemana + 7) % 7;
  const primeiraTerca = 1 + offset;
  return [0, 1, 2, 3].map((i) => {
    const dia = primeiraTerca + i * 7;
    return {
      dia,
      label: `${pad(dia)} de ${MESES_PT[mesIndex0]}`,
      dataExtensa: `${pad(dia)}/${pad(mesIndex0 + 1)}/${ano}`,
    };
  });
}

export function getProximaTurma(referencia: Date = new Date()): Turma {
  // "Vendemos o próximo mês": sempre olha 1 mês à frente
  const alvo = new Date(referencia.getFullYear(), referencia.getMonth() + 1, 1);
  const mesIndex0 = alvo.getMonth();
  const ano = alvo.getFullYear();
  const tercas = tercasDoMes(ano, mesIndex0);

  return {
    mes: MESES_PT[mesIndex0],
    mesSlug: MESES_SLUG[mesIndex0],
    ano,
    slug: `${MESES_SLUG[mesIndex0]}-${ano}`,
    label: `${MESES_PT[mesIndex0]}/${ano}`,
    labelExtenso: `${MESES_PT[mesIndex0]} de ${ano}`,
    inicioISO: `${ano}-${pad(mesIndex0 + 1)}-${pad(tercas[0].dia)}`,
    fimISO: `${ano}-${pad(mesIndex0 + 1)}-${pad(tercas[3].dia)}`,
    tercas,
  };
}
