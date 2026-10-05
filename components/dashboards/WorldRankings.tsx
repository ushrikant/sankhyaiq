import data from "@/data/world-rankings.json";
import Figure from "@/components/charts/Figure";
import Kpis from "./Kpis";
import DataTable from "./DataTable";
import { AXIS_TEXT, GRID, INK, fmt } from "@/components/charts/theme";

type M = (typeof data)[number];

const ordinal = (n: number) => {
  const v = n % 100;
  if (v >= 11 && v <= 13) return `${n}th`;
  return `${n}${["th", "st", "nd", "rd"][n % 10 <= 3 ? n % 10 : 0]}`;
};
const find = (name: string) => data.find((m) => m.m === name) as M;

// One row per measure. The bar runs from rank 1 (left) to last place (right). The dot is India now, the ring is ten years earlier.
function RankStrips() {
  const W = 680;
  const labelW = Math.max(...data.map((m) => m.m.length)) * 9.6 + 14;
  const valueW = 140;
  const plotX = labelW;
  const plotW = W - labelW - valueW;
  const rowH = 38;
  const H = data.length * rowH + 26;
  const pos = (rank: number, of: number) => plotX + ((rank - 1) / Math.max(of - 1, 1)) * plotW;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label="India's rank on twelve measures">
      <text x={plotX} y={12} fontSize={11.5} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">Rank 1</text>
      <text x={plotX + plotW} y={12} fontSize={11.5} fill={AXIS_TEXT} textAnchor="end" fontFamily="var(--font-ibm-plex-sans)">Last</text>
      {data.map((m, i) => {
        const y = 26 + i * rowH + rowH / 2;
        const now = pos(m.rank, m.of);
        const then = pos(m.rank0, m.of);
        const top = m.rank <= 3;
        const colour = top ? "#2e7d32" : "#1565c0";
        return (
          <g key={m.m}>
            <title>{`${m.m}: ${ordinal(m.rank)} of ${m.of} in ${m.year}. ${ordinal(m.rank0)} in ${m.year0}.`}</title>
            <text x={labelW - 12} y={y} textAnchor="end" dominantBaseline="middle" fontSize={13} fill={INK} fontFamily="var(--font-ibm-plex-sans)">{m.m}</text>
            <line x1={plotX} x2={plotX + plotW} y1={y} y2={y} stroke={GRID} strokeWidth={8} strokeLinecap="round" />
            {m.rank0 !== m.rank && <line x1={then} x2={now} y1={y} y2={y} stroke={colour} strokeOpacity={0.35} strokeWidth={3} />}
            <circle cx={then} cy={y} r={6} fill="#fff" stroke={colour} strokeWidth={2} />
            <circle cx={now} cy={y} r={7.5} fill={colour} stroke="#fff" strokeWidth={2} />
            <text x={plotX + plotW + 14} y={y} dominantBaseline="middle" fontSize={13} fontWeight={600} fill={INK} fontFamily="var(--font-ibm-plex-sans)">
              {ordinal(m.rank)} <tspan fill={AXIS_TEXT} fontWeight={400}>of {m.of}</tspan>
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default function WorldRankings() {
  const pop = find("Population");
  const ppp = find("GDP (PPP)");
  const gdppc = find("GDP per person");
  const solar = find("Solar power");
  return (
    <>
      <Kpis
        accent="#1565c0"
        items={[
          { value: ordinal(pop.rank), label: `Population, ${fmt(pop.value, 0)} million in ${pop.year}`, delta: `${ordinal(pop.rank0)} in ${pop.year0}`, tone: "good" },
          { value: ordinal(ppp.rank), label: `Economy size (PPP), $${fmt(ppp.value, 1)} trillion in ${ppp.year}`, delta: "Unchanged in ten years", tone: "flat" },
          { value: ordinal(gdppc.rank), label: `Income per person, $${fmt(gdppc.value)} in ${gdppc.year}`, delta: `${ordinal(gdppc.rank0)} in ${gdppc.year0}`, tone: "good" },
          { value: ordinal(solar.rank), label: `Solar power, ${fmt(solar.value, 1)} TWh in ${solar.year}`, delta: `Up from ${ordinal(solar.rank0)} in ${solar.year0}`, tone: "good" },
        ]}
      />
      <Figure
        title="Big in total, low per person"
        subtitle="India's rank among countries with data. The ring marks the rank ten years earlier."
        source="Our World in Data (population, GDP, CO2 and energy datasets)"
        note="Totals put India near the top. Per person measures put it far down the list. Both are true at once."
      >
        <RankStrips />
      </Figure>
      <DataTable
        columns={["Measure", "Year", "India", "Rank", "Of", "Rank then", "Leaders"]}
        rows={data.map((m) => [
          m.m,
          m.year,
          `${fmt(m.value, m.value < 100 ? 1 : 0)} ${m.unit.toLowerCase()}`,
          ordinal(m.rank),
          m.of,
          `${ordinal(m.rank0)} (${m.year0})`,
          m.top.join(", "),
        ])}
        caption="Ranks count every country or territory with a reported figure for that year."
      />
    </>
  );
}
