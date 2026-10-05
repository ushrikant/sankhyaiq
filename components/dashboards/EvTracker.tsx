import raw from "@/data/ev-registrations.json";
import Figure from "@/components/charts/Figure";
import BarChart from "@/components/charts/BarChart";
import { AXIS_TEXT, GRID, INK, SERIES, fmt, niceMax, niceTicks } from "@/components/charts/theme";
import Kpis from "./Kpis";
import DataTable from "./DataTable";
import Tabs from "./Tabs";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// Complete months in 2026. October is only partly counted at the time of checking.
const FULL_2026 = 9;

const GROUPS: { name: string; match: (c: string) => boolean }[] = [
  { name: "Two wheelers", match: (c) => c.startsWith("TWO WHEELER") },
  { name: "Three wheelers", match: (c) => c.startsWith("THREE WHEELER") },
  { name: "Cars and light vehicles", match: (c) => ["LIGHT MOTOR VEHICLE", "LIGHT PASSENGER VEHICLE", "FOUR WHEELER (INVALID CARRIAGE)"].includes(c) },
  { name: "Goods vehicles", match: (c) => ["LIGHT GOODS VEHICLE", "MEDIUM GOODS VEHICLE", "HEAVY GOODS VEHICLE"].includes(c) },
  { name: "Buses", match: (c) => ["HEAVY PASSENGER VEHICLE", "MEDIUM PASSENGER VEHICLE"].includes(c) },
];

type YearData = Record<string, number[]>;
const data = raw.data as Record<string, YearData>;

function monthly(year: string, group?: string): number[] {
  const rows = data[year];
  const n = year === "2025" ? 12 : 10;
  const out = Array(n).fill(0);
  for (const [cat, vals] of Object.entries(rows)) {
    const g = GROUPS.find((x) => x.match(cat));
    const name = g ? g.name : "Other";
    if (group && name !== group) continue;
    vals.forEach((v, i) => (out[i] += v));
  }
  return out;
}
const sum = (a: number[], n = a.length) => a.slice(0, n).reduce((x, y) => x + y, 0);
const pct = (a: number, b: number) => `${a >= b ? "Up" : "Down"} ${fmt(Math.abs((a / b - 1) * 100), 0)}%`;

// Two years side by side, one pair of columns per month.
function PairedColumns({ a, b }: { a: number[]; b: number[] }) {
  const W = 680;
  const H = 340;
  const PAD = { l: 62, r: 12, t: 20, b: 34 };
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const vmax = niceMax(Math.max(...a, ...b));
  const ticks = niceTicks(0, vmax, 5);
  const slot = plotW / 12;
  const colW = Math.min(14, slot * 0.38);
  const ys = (v: number) => PAD.t + plotH - (v / vmax) * plotH;
  const bar = (x: number, v: number, fill: string, label: string) => {
    if (v == null) return null;
    const h = Math.max(1.5, (v / vmax) * plotH);
    return (
      <g key={label}>
        <title>{label}</title>
        <rect x={x} y={PAD.t + plotH - h} width={colW} height={h} rx={2.5} fill={fill} />
      </g>
    );
  };
  return (
    <div>
      <div className="flex gap-5 mb-3 font-plex text-xs text-muted">
        <span className="inline-flex items-center gap-2"><i className="inline-block w-3 h-3 rounded-sm" style={{ background: "#b8c4cc" }} />2025</span>
        <span className="inline-flex items-center gap-2"><i className="inline-block w-3 h-3 rounded-sm" style={{ background: SERIES[0] }} />2026</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label="Monthly electric vehicle registrations, 2025 and 2026">
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.l} x2={W - PAD.r} y1={ys(t)} y2={ys(t)} stroke={GRID} />
            <text x={PAD.l - 8} y={ys(t)} textAnchor="end" dominantBaseline="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">{t === 0 ? "0" : `${fmt(t / 100000, 1)} lakh`}</text>
          </g>
        ))}
        {MONTHS.map((m, i) => {
          const cx = PAD.l + slot * i + slot / 2;
          return (
            <g key={m}>
              {bar(cx - colW - 1, a[i], "#b8c4cc", `${m} 2025: ${fmt(a[i])}`)}
              {i < FULL_2026 && bar(cx + 1, b[i], SERIES[0], `${m} 2026: ${fmt(b[i])}`)}
              <text x={cx} y={H - 12} textAnchor="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">{m}</text>
            </g>
          );
        })}
        <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t + plotH} y2={PAD.t + plotH} stroke="#cfd8dc" />
        <text x={PAD.l + slot * (FULL_2026 - 1) + slot / 2 + colW + 6} y={ys(b[FULL_2026 - 1]) - 6} fontSize={11.5} fontWeight={600} fill={INK} textAnchor="middle" fontFamily="var(--font-ibm-plex-sans)">{fmt(b[FULL_2026 - 1])}</text>
      </svg>
    </div>
  );
}

export default function EvTracker() {
  const a = monthly("2025");
  const b = monthly("2026");
  const ytd25 = sum(a, FULL_2026);
  const ytd26 = sum(b, FULL_2026);
  const sep25 = a[FULL_2026 - 1];
  const sep26 = b[FULL_2026 - 1];
  const g = [...GROUPS.map((x) => x.name), "Other"];
  const byGroup26 = g.map((n) => ({ n, v26: sum(monthly("2026", n), FULL_2026), v25: sum(monthly("2025", n), FULL_2026) }));
  const twoW = byGroup26.find((x) => x.n === "Two wheelers")!;
  const threeW = byGroup26.find((x) => x.n === "Three wheelers")!;
  const cars = byGroup26.find((x) => x.n === "Cars and light vehicles")!;
  const bars = byGroup26.filter((x) => x.v26 > 0).sort((x, y) => y.v26 - x.v26);

  return (
    <>
      <Kpis
        accent="#2e7d32"
        items={[
          { value: fmt(ytd26), label: "Electric vehicles registered, Jan to Sep 2026", delta: `${pct(ytd26, ytd25)} on Jan to Sep 2025`, tone: "good" },
          { value: fmt(sep26), label: "Registered in September 2026", delta: `${pct(sep26, sep25)} on September 2025`, tone: "good" },
          { value: `${fmt((twoW.v26 / ytd26) * 100, 0)}%`, label: `Two wheelers, ${fmt(twoW.v26)} in Jan to Sep 2026`, delta: `${pct(twoW.v26, twoW.v25)} on 2025`, tone: "good" },
          { value: fmt(cars.v26), label: "Electric cars and light vehicles, Jan to Sep 2026", delta: `${pct(cars.v26, cars.v25)} on 2025`, tone: "good" },
        ]}
      />
      <Tabs
        accent="#2e7d32"
        tabs={[
          {
            label: "Month by month",
            content: (
              <Figure
                title="Electric registrations are running well ahead of last year"
                subtitle="All electric vehicles registered each month, 2025 against 2026. October 2026 is not shown as the month is not complete."
                source="Vahan dashboard, Ministry of Road Transport and Highways"
                note="Fuel types counted: ELECTRIC(BOV) and PURE EV. All vehicle categories, all states shown by the portal."
              >
                <PairedColumns a={a} b={b} />
              </Figure>
            ),
          },
          {
            label: "By vehicle type",
            content: (
              <Figure
                title="Two wheelers are most of the electric fleet being added"
                subtitle="Electric registrations by vehicle type, January to September 2026"
                source="Vahan dashboard, Ministry of Road Transport and Highways"
                note={`Three wheelers: ${fmt(threeW.v26)} registered, ${pct(threeW.v26, threeW.v25).toLowerCase()} on the same months of 2025. Groups are built from Vahan vehicle categories.`}
              >
                <BarChart data={bars.map((x) => ({ label: x.n, value: x.v26, highlight: true }))} />
              </Figure>
            ),
          },
        ]}
      />
      <DataTable
        columns={["Month", "2025 total", "2026 total", "2026 two wheelers", "2026 three wheelers", "2026 cars and light"]}
        rows={MONTHS.map((m, i) => [
          m + (i === 9 ? " (to 5 Oct)" : ""),
          a[i],
          i < b.length ? b[i] : "",
          i < b.length ? monthly("2026", "Two wheelers")[i] : "",
          i < b.length ? monthly("2026", "Three wheelers")[i] : "",
          i < b.length ? monthly("2026", "Cars and light vehicles")[i] : "",
        ])}
        caption="Registrations in each month. Registration data can be revised as late entries come in."
      />
    </>
  );
}
