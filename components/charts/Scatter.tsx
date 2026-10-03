import { ACCENT, AXIS_TEXT, GRID, INK, MUTED_MARK, fmt, niceMax, niceTicks } from "./theme";

export interface ScatterPoint {
  label: string;
  x: number;
  y: number;
  highlight?: boolean;
}

interface ScatterProps {
  points: ScatterPoint[];
  xLabel: string;
  yLabel: string;
  logX?: boolean;
  xUnit?: string;
  yUnit?: string;
}

// Scatter with optional log x axis. Highlighted points are labelled; the rest recede.
export default function Scatter({ points, xLabel, yLabel, logX = false, xUnit = "", yUnit = "" }: ScatterProps) {
  const W = 680;
  const H = 400;
  const PAD = { l: 52, r: 24, t: 16, b: 50 };
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const xsVals = points.map((p) => p.x);
  const ysVals = points.map((p) => p.y);
  let xs: (v: number) => number;
  let xTicks: number[];
  if (logX) {
    const lo = Math.floor(Math.log10(Math.min(...xsVals)));
    const hi = Math.ceil(Math.log10(Math.max(...xsVals)));
    xTicks = [];
    for (let e = lo; e <= hi; e++) xTicks.push(Math.pow(10, e));
    xs = (v) => PAD.l + ((Math.log10(v) - lo) / (hi - lo)) * plotW;
  } else {
    xTicks = niceTicks(0, Math.max(...xsVals));
    const max = xTicks[xTicks.length - 1];
    xs = (v) => PAD.l + (v / max) * plotW;
  }
  const yTicks = niceTicks(0, niceMax(Math.max(...ysVals)));
  const yMax = yTicks[yTicks.length - 1];
  const ys = (v: number) => PAD.t + plotH - (v / yMax) * plotH;
  const sorted = [...points].sort((a, b) => Number(!!a.highlight) - Number(!!b.highlight));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label="Scatter chart">
      {yTicks.map((t) => (
        <g key={`y${t}`}>
          <line x1={PAD.l} x2={W - PAD.r} y1={ys(t)} y2={ys(t)} stroke={GRID} />
          <text x={PAD.l - 8} y={ys(t)} textAnchor="end" dominantBaseline="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">{fmt(t)}{yUnit}</text>
        </g>
      ))}
      {xTicks.map((t) => (
        <text key={`x${t}`} x={xs(t)} y={H - 30} textAnchor="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">
          {t < 1 ? t.toString() : fmt(t)}{xUnit}
        </text>
      ))}
      <text x={PAD.l + plotW / 2} y={H - 8} textAnchor="middle" fontSize={12} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">{xLabel}</text>
      <text x={14} y={PAD.t + plotH / 2} textAnchor="middle" fontSize={12} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)" transform={`rotate(-90 14 ${PAD.t + plotH / 2})`}>{yLabel}</text>
      {sorted.map((p) => (
        <g key={p.label}>
          <title>{`${p.label}: ${fmt(p.y, 1)}${yUnit}, ${p.x < 1 ? p.x : fmt(p.x, 1)}${xUnit}`}</title>
          <circle cx={xs(p.x)} cy={ys(p.y)} r={p.highlight ? 5.5 : 4.5} fill={p.highlight ? ACCENT : MUTED_MARK} stroke="#fff" strokeWidth={2} />
          {p.highlight && (
            <text x={xs(p.x) > W - 140 ? xs(p.x) - 8 : xs(p.x) + 8} y={ys(p.y) - 7} textAnchor={xs(p.x) > W - 140 ? "end" : "start"} fontSize={11.5} fill={INK}>{p.label}</text>
          )}
        </g>
      ))}
    </svg>
  );
}
