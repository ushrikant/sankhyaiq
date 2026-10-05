import data from "@/data/monsoon-2026.json";
import Figure from "@/components/charts/Figure";
import Kpis from "./Kpis";
import DataTable from "./DataTable";
import Tabs from "./Tabs";
import { ACCENT, AXIS_TEXT, GRID, INK, MUTED_MARK, fmt } from "@/components/charts/theme";

const FONT = "var(--font-ibm-plex-sans)";
const COLOURS = { Deficient: "#c56a1a", Normal: "#2e7d32", Excess: "#1565c0" } as const;
type Category = keyof typeof COLOURS;

const MINUS = "−";
const signed = (n: number) => (n > 0 ? `+${fmt(n)}` : n < 0 ? `${MINUS}${fmt(Math.abs(n))}` : "0");

const KEEP_UPPER = new Set(["NMMT", "SHWB"]);
const tidy = (s: string) =>
  s
    .split(" ")
    .map((w) => (KEEP_UPPER.has(w) ? w : w === "&" ? w : w === "AND" ? "and" : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(" ");

const SEASON_YEAR = 2026;
const years = [...data.history.map((h) => ({ label: String(h.year), value: h.pct })), { label: String(SEASON_YEAR), value: data.season.pct }];
const months = data.months.map((m) => ({ label: m.m, value: m.pct }));
const regions = data.regions.map((r) => ({ label: r.name, value: r.pct, mm: r.mm }));
const subs = [...data.subdivisions].sort((a, b) => a.departure_pct - b.departure_pct);
const countOf = (c: string) => data.subdivisions.filter((s) => s.category === c).length;
const deficient = countOf("Deficient");
const normal = countOf("Normal");
const excess = countOf("Excess");
const total = data.subdivisions.length;
const driest = regions.reduce((a, b) => (b.value < a.value ? b : a));
const wettest = regions.reduce((a, b) => (b.value > a.value ? b : a));
const gapMm = data.season.lpa_mm - data.season.mm;
const arunachal = data.subdivisions.find((s) => s.name === "ARUNACHAL PRADESH");

function niceTop(v: number) {
  return Math.ceil((v + 5) / 20) * 20;
}

// Columns of % of long period average with a dashed line at 100.
function RefColumns({ items, highlight }: { items: { label: string; value: number }[]; highlight?: string }) {
  const W = 680;
  const H = 320;
  const PAD = { l: 56, r: 12, t: 22, b: 34 };
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const vmax = niceTop(Math.max(...items.map((d) => d.value), 100));
  const ticks: number[] = [];
  for (let t = 0; t <= vmax; t += 20) ticks.push(t);
  const slot = plotW / items.length;
  const colW = Math.min(36, slot * 0.7);
  const ys = (v: number) => PAD.t + plotH - (v / vmax) * plotH;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label="Rainfall as a percentage of the long period average">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={PAD.l} x2={W - PAD.r} y1={ys(t)} y2={ys(t)} stroke={GRID} strokeWidth={1} />
          <text x={PAD.l - 8} y={ys(t)} textAnchor="end" dominantBaseline="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily={FONT}>{`${t}%`}</text>
        </g>
      ))}
      {items.map((d, i) => {
        const cx = PAD.l + slot * i + slot / 2;
        const x = cx - colW / 2;
        const h = Math.max(1.5, (d.value / vmax) * plotH);
        const y = PAD.t + plotH - h;
        const r = Math.min(4, colW / 2, h / 2);
        const path = `M${x},${y + h} v${-(h - r)} a${r},${r} 0 0 1 ${r},${-r} h${colW - 2 * r} a${r},${r} 0 0 1 ${r},${r} v${h - r} Z`;
        const on = !highlight || d.label === highlight;
        return (
          <g key={d.label}>
            <title>{`${d.label}: ${fmt(d.value)}% of the long period average`}</title>
            <rect x={cx - slot / 2} y={PAD.t} width={slot} height={plotH} fill="transparent" />
            <path d={path} fill={on ? ACCENT : MUTED_MARK} />
            <text x={cx} y={y - 6} textAnchor="middle" fontSize={11.5} fill={INK} fontFamily={FONT} fontWeight={on ? 600 : 400}>{`${fmt(d.value)}%`}</text>
            <text x={cx} y={H - 12} textAnchor="middle" fontSize={11.5} fill={on ? INK : AXIS_TEXT} fontWeight={on ? 600 : 400} fontFamily={FONT}>{d.label}</text>
          </g>
        );
      })}
      <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t + plotH} y2={PAD.t + plotH} stroke="#cfd8dc" strokeWidth={1} />
      <line x1={PAD.l} x2={W - PAD.r} y1={ys(100)} y2={ys(100)} stroke={INK} strokeWidth={1.25} strokeDasharray="5 4" />
    </svg>
  );
}

// Horizontal bars of % of average for the four regions, with a line at 100.
function RefBars({ items }: { items: { label: string; value: number; mm: number }[] }) {
  const rowH = 38;
  const barH = 22;
  const W = 640;
  const labelW = Math.max(...items.map((d) => d.label.length)) * 9.6 + 14;
  const valueRoom = 60;
  const plotW = W - labelW - valueRoom;
  const top = 22;
  const H = top + items.length * rowH + 4;
  const vmax = 120;
  const xs = (v: number) => labelW + (v / vmax) * plotW;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label="Rainfall by region as a percentage of the long period average">
      <line x1={labelW} x2={labelW} y1={top - 4} y2={H} stroke={GRID} strokeWidth={1} />
      {items.map((d, i) => {
        const y = top + i * rowH + (rowH - barH) / 2;
        const w = (d.value / vmax) * plotW;
        const r = 4;
        const path = `M${labelW},${y} h${w - r} a${r},${r} 0 0 1 ${r},${r} v${barH - 2 * r} a${r},${r} 0 0 1 -${r},${r} h-${w - r} Z`;
        const hl = d.label === driest.label || d.label === wettest.label;
        return (
          <g key={d.label}>
            <title>{`${d.label}: ${fmt(d.value)}% of the long period average, ${fmt(d.mm, 1)} mm`}</title>
            <text x={labelW - 10} y={y + barH / 2} dominantBaseline="middle" textAnchor="end" fontSize={13} fill={hl ? INK : AXIS_TEXT} fontWeight={hl ? 600 : 400} fontFamily={FONT}>{d.label}</text>
            <path d={path} fill={ACCENT} />
            <text x={labelW + w + 8} y={y + barH / 2} dominantBaseline="middle" fontSize={12.5} fill={INK} fontFamily={FONT} fontWeight={hl ? 600 : 400}>{`${fmt(d.value)}%`}</text>
          </g>
        );
      })}
      <line x1={xs(100)} x2={xs(100)} y1={top - 4} y2={H} stroke={INK} strokeWidth={1.25} strokeDasharray="5 4" />
      <text x={xs(100)} y={12} textAnchor="middle" fontSize={11} fill={INK} fontFamily={FONT}>Average = 100%</text>
    </svg>
  );
}

// Diverging bars around zero, one row per subdivision, sorted from driest to wettest.
function Diverging() {
  const W = 680;
  const labels = subs.map((s) => tidy(s.name));
  const labelW = Math.max(...labels.map((l) => l.length)) * 9.6 + 14;
  const rowH = 26;
  const barH = 16;
  const top = 24;
  const rightPad = 16;
  const vals = subs.map((s) => s.departure_pct);
  const lo = Math.floor((Math.min(...vals) - 10) / 10) * 10;
  const hi = Math.ceil((Math.max(...vals) + 10) / 10) * 10;
  const plotW = W - labelW - rightPad;
  const xs = (v: number) => labelW + ((v - lo) / (hi - lo)) * plotW;
  const H = top + subs.length * rowH + 6;
  const ticks: number[] = [];
  for (let t = Math.ceil(lo / 20) * 20; t <= hi; t += 20) ticks.push(t);
  const x0 = xs(0);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label="Departure from normal rainfall for 36 subdivisions">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={xs(t)} x2={xs(t)} y1={top - 4} y2={H} stroke={GRID} strokeWidth={1} />
          <text x={xs(t)} y={12} textAnchor="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily={FONT}>{`${signed(t)}%`}</text>
        </g>
      ))}
      {subs.map((s, i) => {
        const y = top + i * rowH + (rowH - barH) / 2;
        const v = s.departure_pct;
        const x1 = xs(Math.min(0, v));
        const w = Math.max(2, Math.abs(xs(v) - x0));
        const colour = COLOURS[s.category as Category];
        const label = `${signed(v)}%`;
        return (
          <g key={s.name}>
            <title>{`${labels[i]}: ${label} from normal (${s.category})`}</title>
            <text x={labelW - 10} y={y + barH / 2} dominantBaseline="middle" textAnchor="end" fontSize={13} fill={INK} fontFamily={FONT}>{labels[i]}</text>
            <rect x={v < 0 ? x0 - w : x0} y={y} width={w} height={barH} rx={3} fill={colour} />
            <text
              x={v < 0 ? x1 - 6 : x0 + w + 6}
              y={y + barH / 2}
              dominantBaseline="middle"
              textAnchor={v < 0 ? "end" : "start"}
              fontSize={12}
              fill={INK}
              fontFamily={FONT}
            >{label}</text>
          </g>
        );
      })}
      <line x1={x0} x2={x0} y1={top - 4} y2={H} stroke={INK} strokeWidth={1.25} />
    </svg>
  );
}

function Legend() {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1 mb-3 font-plex text-xs text-muted">
      {(Object.keys(COLOURS) as Category[]).map((c) => (
        <span key={c} className="inline-flex items-center gap-1.5">
          <span aria-hidden className="inline-block w-3 h-3 rounded-sm" style={{ background: COLOURS[c] }} />
          {c} ({countOf(c)})
        </span>
      ))}
    </div>
  );
}

export default function MonsoonTracker() {
  const histSource = "IMD end of season reports for 2016 to 2020 and 2025, IndianAgri table for 2021 to 2024";
  return (
    <>
      <Kpis
        accent="#c56a1a"
        items={[
          { value: `${fmt(data.season.pct)}%`, label: `Season rainfall as a share of the long period average, ${fmt(data.season.mm, 1)} mm against ${fmt(data.season.lpa_mm, 1)} mm`, delta: `${fmt(gapMm, 1)} mm short`, tone: "bad" },
          { value: driest.label, label: `Driest region, ${fmt(driest.value)}% of average`, delta: `${fmt(driest.mm, 1)} mm`, tone: "bad" },
          { value: wettest.label, label: `Wettest region, ${fmt(wettest.value)}% of average`, delta: `${fmt(wettest.mm, 1)} mm`, tone: "flat" },
          { value: `${deficient} of ${total}`, label: "Subdivisions with deficient rainfall", delta: `${normal} normal and ${excess} excess`, tone: "bad" },
        ]}
      />
      <Tabs
        accent="#c56a1a"
        tabs={[
          {
            label: "Season by year",
            content: (
              <Figure
                title={`The ${SEASON_YEAR} season fell below the ten years before it`}
                subtitle="June to September rainfall as a share of the long period average, 2016 to 2026. The dashed line marks the average, 100%."
                source={histSource}
                note="IMD calls 90 to 110% of the average normal. The 2021 to 2024 values come from a secondary table and were not checked against IMD documents."
              >
                <RefColumns items={years} highlight={String(SEASON_YEAR)} />
              </Figure>
            ),
          },
          {
            label: "By region",
            content: (
              <Figure
                title="Every region ended below its average"
                subtitle="Season rainfall by IMD region as a share of the long period average."
                source="News reports citing IMD (ETV Bharat, Business Standard)"
                note="Regional figures come from news reports and not from an IMD primary release."
              >
                <RefBars items={regions} />
              </Figure>
            ),
          },
          {
            label: "By month",
            content: (
              <Figure
                title="June was the weakest month"
                subtitle="Monthly rainfall for the country as a share of the long period average."
                source="IMD figures as reported in the press"
                note="Only June has both rainfall and average in millimetres in the sources. They are in the table below."
              >
                <RefColumns items={months} />
              </Figure>
            ),
          },
          {
            label: "36 subdivisions",
            content: (
              <Figure
                title={`${deficient} of ${total} subdivisions were deficient`}
                subtitle="Departure from normal rainfall, season to date, sorted from driest to wettest."
                source="IMD subdivision cumulative departure table, 1 June to 30 September 2026"
                note={`${arunachal ? `Arunachal Pradesh at ${signed(arunachal.departure_pct)}% is labelled Large Deficient in the IMD table. That label does not match the IMD legend, so it is shown here as Deficient. ` : ""}Odisha is the only subdivision with excess rainfall.`}
              >
                <Legend />
                <Diverging />
              </Figure>
            ),
          },
        ]}
      />
      <DataTable
        columns={["Subdivision", "Departure from normal", "Category"]}
        rows={subs.map((s) => [tidy(s.name), `${signed(s.departure_pct)}%`, s.category])}
        caption={`${total} IMD meteorological subdivisions, season to date. June rainfall was ${fmt(data.months[0].mm ?? 0, 1)} mm against an average of ${fmt(data.months[0].lpa_mm ?? 0, 1)} mm. August rainfall was ${fmt(data.months[2].mm ?? 0, 1)} mm.`}
        summary="View subdivisions as a table"
      />
    </>
  );
}
