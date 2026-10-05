import data from "@/data/inflation.json";
import Figure from "@/components/charts/Figure";
import BarChart from "@/components/charts/BarChart";
import Kpis from "./Kpis";
import Tabs from "./Tabs";
import DataTable from "./DataTable";
import { ACCENT, AXIS_TEXT, GRID, INK, SERIES, fmt, niceTicks } from "@/components/charts/theme";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const FULL = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const short = (m: string) => `${MONTHS[+m.slice(5) - 1]} ${m.slice(2, 4)}`;
const long = (m: string) => `${FULL[+m.slice(5) - 1]} ${m.slice(0, 4)}`;
const BREAK = "2026-01";

const months = data.monthly;
const latest = months[months.length - 1];
const prev = months[months.length - 2];

const BREAK_NOTE =
  "Series break: months up to December 2025 are on CPI base 2012=100. From January 2026 the series is on base 2024=100. Year on year rates across the break are not strictly like for like.";
const SOURCE = "Ministry of Statistics and Programme Implementation (MoSPI) and PIB CPI press releases";

interface Line {
  name: string;
  color: string;
  values: (number | null)[];
}

// Monthly line chart with the RBI tolerance band, the 4% target and the base year break.
function MonthlyLines({ lines, label }: { lines: Line[]; label: string }) {
  const W = 680;
  const H = 330;
  const L = 44;
  const R = 112;
  const T = 24;
  const B = 36;
  const plotW = W - L - R;
  const plotH = H - T - B;
  const n = months.length;
  const all = lines.flatMap((l) => l.values).filter((v): v is number => v !== null);
  const lo = Math.min(...all);
  const yMin = lo < 0 ? Math.floor(lo) : 0;
  const yMax = Math.max(7, Math.ceil(Math.max(...all)));
  const x = (i: number) => L + (i / (n - 1)) * plotW;
  const y = (v: number) => T + (1 - (v - yMin) / (yMax - yMin)) * plotH;
  const ticks = niceTicks(yMin, yMax, 5);
  const [bandLo, bandHi] = data.rbi.tolerance_band;
  const breakIdx = months.findIndex((m) => m.m === BREAK);
  const font = "var(--font-ibm-plex-sans)";

  const paths = lines.map((l) => {
    let d = "";
    let pen = false;
    l.values.forEach((v, i) => {
      if (v === null) {
        pen = false;
        return;
      }
      d += `${pen ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)} `;
      pen = true;
    });
    return d.trim();
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label={label}>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={L} x2={L + plotW} y1={y(t)} y2={y(t)} stroke={GRID} strokeWidth={t === 0 ? 1.5 : 1} />
          <text x={L - 8} y={y(t)} textAnchor="end" dominantBaseline="middle" fontSize={12} fill={AXIS_TEXT} fontFamily={font}>{`${t}%`}</text>
        </g>
      ))}

      <rect x={L} y={y(bandHi)} width={plotW} height={y(bandLo) - y(bandHi)} fill={ACCENT} fillOpacity={0.08}>
        <title>{`RBI tolerance band: ${bandLo}% to ${bandHi}%`}</title>
      </rect>
      <line x1={L} x2={L + plotW} y1={y(data.rbi.cpi_target)} y2={y(data.rbi.cpi_target)} stroke={ACCENT} strokeWidth={1.5} strokeDasharray="6 4">
        <title>{`RBI inflation target: ${data.rbi.cpi_target}%`}</title>
      </line>
      <text x={x(6)} y={y(bandHi) + 14} fontSize={11.5} fill={ACCENT} fontFamily={font}>{`RBI band ${bandLo} to ${bandHi}%`}</text>
      <text x={x(6)} y={y(data.rbi.cpi_target) - 6} fontSize={11.5} fill={ACCENT} fontFamily={font}>{`Target ${data.rbi.cpi_target}%`}</text>

      {months.map((m, i) =>
        i % 3 === 0 ? (
          <text key={m.m} x={x(i)} y={H - 12} textAnchor="middle" fontSize={12} fill={AXIS_TEXT} fontFamily={font}>{short(m.m)}</text>
        ) : null
      )}

      {breakIdx > 0 && (
        <g>
          <title>{`Series break: base year changes from 2012 to 2024 in ${long(BREAK)}. Rates across the break are not strictly like for like.`}</title>
          <line x1={x(breakIdx)} x2={x(breakIdx)} y1={T - 6} y2={T + plotH} stroke={INK} strokeWidth={1.5} strokeDasharray="3 3" />
          <circle cx={x(breakIdx)} cy={T - 6} r={4} fill={INK} />
          <text x={x(breakIdx) - 8} y={T - 4} textAnchor="end" fontSize={11.5} fill={INK} fontFamily={font}>Base 2012</text>
          <text x={x(breakIdx) + 8} y={T - 4} fontSize={11.5} fill={INK} fontFamily={font}>Base 2024</text>
        </g>
      )}

      {lines.map((l, k) => {
        const lastIdx = l.values.length - 1;
        const lastVal = l.values[lastIdx];
        return (
          <g key={l.name}>
            <path d={paths[k]} fill="none" stroke={l.color} strokeWidth={2.5} strokeLinejoin="round" strokeLinecap="round" />
            {l.values.map((v, i) =>
              v === null ? null : (
                <circle key={i} cx={x(i)} cy={y(v)} r={i === lastIdx ? 4.5 : 3} fill={l.color} stroke="#fff" strokeWidth={1.5}>
                  <title>{`${l.name}, ${long(months[i].m)}: ${fmt(v, 2)}%`}</title>
                </circle>
              )
            )}
            {lastVal !== null && (
              <text x={x(lastIdx) + 10} y={y(lastVal)} dominantBaseline="middle" fontSize={12.5} fontWeight={600} fill={l.color} fontFamily={font}>
                {`${l.name} ${fmt(lastVal, 2)}`}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// Names shortened so the bars keep room. Full names sit in the tooltip and the table.
const SHORT: Record<string, string> = {
  "Personal care, social protection and miscellaneous": "Personal care and miscellaneous",
  "Housing, water, electricity, gas and fuels": "Housing, water and fuels",
  "Furnishings and household maintenance": "Furnishings and upkeep",
};

const points = (a: number, b: number) => {
  const d = a - b;
  return `${d >= 0 ? "Up" : "Down"} ${fmt(Math.abs(d), 2)} points on ${FULL[+prev.m.slice(5) - 1]}`;
};

export default function InflationTracker() {
  const groups = [...data.latest.groups].sort((a, b) => b.value - a.value);
  const bars = groups.map((g) => ({
    label: SHORT[g.name] ?? g.name,
    value: g.value,
    note: SHORT[g.name] ? g.name : undefined,
  }));
  const lm = long(latest.m);
  const upTone = "bad" as const;

  const headline = (
    <Figure
      title="Retail inflation is back above the 4% target"
      subtitle={`CPI headline inflation, year on year, ${short(months[0].m)} to ${short(latest.m)}. ${lm} is provisional.`}
      source={SOURCE}
      note={BREAK_NOTE}
    >
      <MonthlyLines lines={[{ name: "Headline", color: SERIES[1], values: months.map((m) => m.headline) }]} label="Headline CPI inflation by month" />
      <p className="mt-4 font-plex text-sm text-navy leading-relaxed">
        RBI repo rate: {fmt(data.rbi.repo_rate, 2)}%. {data.rbi.repo_rate_note}
      </p>
      <p className="mt-1 font-plex text-xs text-muted leading-relaxed">
        Caveat: the repo rate comes from a secondary news report (Business Standard). It was not read from an RBI page. The 2 to 6% band around a 4% target is the standard RBI framework, also not read from an RBI page.
      </p>
    </Figure>
  );

  const ruralUrban = (
    <Figure
      title="Rural inflation now runs above urban"
      subtitle="CPI inflation, year on year, rural and urban. Months without a figure are left blank."
      source={SOURCE}
      note={`${BREAK_NOTE} Rural and urban figures are missing from ${short("2025-01")} to ${short("2025-07")} because those releases were not fetched. ${short("2025-09")} rural and urban figures are from the first release and were not checked against later revisions.`}
    >
      <MonthlyLines
        lines={[
          { name: "Rural", color: SERIES[0], values: months.map((m) => m.rural) },
          { name: "Urban", color: SERIES[2], values: months.map((m) => m.urban) },
        ]}
        label="Rural and urban CPI inflation by month"
      />
    </Figure>
  );

  const groupFig = (
    <Figure
      title={`Which groups are driving prices, ${lm}`}
      subtitle="CPI inflation by group, year on year, sorted high to low."
      source={SOURCE}
      note={`${BREAK_NOTE} ${lm} group figures are from news reports of the release. The official press note was not read. The new series has no separate fuel and light group. It sits inside Housing, water, electricity, gas and fuels.`}
    >
      <BarChart data={bars} unit="%" digits={2} labelWidth={150} />
    </Figure>
  );

  return (
    <>
      <Kpis
        accent={ACCENT}
        items={[
          { value: `${fmt(latest.headline, 2)}%`, label: `Headline inflation, ${lm}`, delta: points(latest.headline, prev.headline), tone: upTone },
          { value: `${fmt(latest.rural as number, 2)}%`, label: `Rural inflation, ${lm}`, delta: points(latest.rural as number, prev.rural as number), tone: upTone },
          { value: `${fmt(latest.urban as number, 2)}%`, label: `Urban inflation, ${lm}`, delta: points(latest.urban as number, prev.urban as number), tone: upTone },
          { value: `${fmt(latest.food, 2)}%`, label: `Food inflation, ${lm}`, delta: points(latest.food, prev.food), tone: upTone },
        ]}
      />
      <Tabs
        accent={ACCENT}
        tabs={[
          { label: "Headline", content: headline },
          { label: "Rural and urban", content: ruralUrban },
          { label: "Groups", content: groupFig },
        ]}
      />
      <DataTable
        columns={["Month", "Headline", "Rural", "Urban", "Food", "Base year"]}
        rows={[...months].reverse().map((m) => [
          long(m.m),
          fmt(m.headline, 2),
          m.rural === null ? "Not available" : fmt(m.rural, 2),
          m.urban === null ? "Not available" : fmt(m.urban, 2),
          fmt(m.food, 2),
          m.m >= BREAK ? "2024=100" : "2012=100",
        ])}
        caption="CPI inflation, year on year, per cent. Food is the Consumer Food Price Index combined. Figures are the latest revised value where a later release gave one. July and August 2026 are provisional."
      />
      <DataTable
        summary={`View ${lm} group figures as table`}
        columns={["Group", "Inflation, %"]}
        rows={groups.map((g) => [g.name, fmt(g.value, 2)])}
        caption={`${lm} group figures are from news reports of the MoSPI release.`}
      />
    </>
  );
}
