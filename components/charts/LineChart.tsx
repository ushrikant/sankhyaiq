import { AXIS_TEXT, GRID, INK, SERIES, fmt, niceMax, niceTicks } from "./theme";

export interface LineSeries {
  name: string;
  points: [number, number][];
  color?: string;
  dashed?: boolean; // used only for projections
  hideEndLabel?: boolean;
}

export interface LineMarker {
  x: number;
  label: string;
}

interface LineChartProps {
  series: LineSeries[];
  yUnit?: string;
  yPrefix?: string;
  digits?: number;
  log?: boolean;
  yMin?: number;
  yMax?: number;
  xMin?: number;
  xMax?: number;
  markers?: LineMarker[];
  yTickFormat?: "exp" | "num";
  legend?: boolean;
}

const W = 680;
const H = 360;
const PAD = { l: 64, r: 120, t: 16, b: 34 };

export default function LineChart({
  series,
  yUnit = "",
  yPrefix = "",
  digits = 0,
  log = false,
  yMin,
  yMax,
  xMin,
  xMax,
  markers = [],
  yTickFormat = "num",
  legend,
}: LineChartProps) {
  const all = series.flatMap((s) => s.points);
  const x0 = xMin ?? Math.min(...all.map((p) => p[0]));
  const x1 = xMax ?? Math.max(...all.map((p) => p[0]));
  const rawMin = yMin ?? (log ? Math.min(...all.map((p) => p[1])) : 0);
  const rawMax = yMax ?? Math.max(...all.map((p) => p[1]));

  let yTicks: number[];
  let ys: (v: number) => number;
  const plotH = H - PAD.t - PAD.b;
  const plotW = W - PAD.l - PAD.r;
  if (log) {
    const lo = Math.floor(Math.log10(rawMin));
    const hi = Math.ceil(Math.log10(rawMax));
    const step = Math.max(1, Math.ceil((hi - lo) / 6));
    yTicks = [];
    for (let e = hi; e >= lo; e -= step) yTicks.unshift(Math.pow(10, e));
    ys = (v) => PAD.t + plotH - ((Math.log10(v) - lo) / (hi - lo)) * plotH;
  } else {
    yTicks = niceTicks(rawMin, yMax ?? niceMax(rawMax), 5);
    const top = Math.max(rawMax, yTicks[yTicks.length - 1]);
    const bottom = Math.min(rawMin, yTicks[0]);
    ys = (v) => PAD.t + plotH - ((v - bottom) / (top - bottom)) * plotH;
  }
  const xs = (v: number) => PAD.l + ((v - x0) / (x1 - x0)) * plotW;
  const xTicks = niceTicks(x0, x1, 6).filter((t) => t >= x0 && t <= x1);

  const tickLabel = (v: number) => {
    if (yTickFormat === "exp") {
      const e = Math.round(Math.log10(v));
      return `10^${e}`;
    }
    const step = yTicks.length > 1 ? yTicks[1] - yTicks[0] : 1;
    return `${yPrefix}${fmt(v, step < 1 ? 1 : 0)}${yUnit}`;
  };

  const showLegend = legend ?? series.length > 1;
  const colorOf = (s: LineSeries, i: number) => s.color ?? SERIES[i % SERIES.length];

  // Spread end labels so they do not collide.
  const ends = series
    .map((s, i) => ({ s, i, y: ys(s.points[s.points.length - 1][1]) }))
    .filter((e) => !e.s.hideEndLabel)
    .sort((a, b) => a.y - b.y);
  for (let k = 1; k < ends.length; k++) {
    if (ends[k].y - ends[k - 1].y < 15) ends[k].y = ends[k - 1].y + 15;
  }

  return (
    <div>
      {showLegend && (
        <div className="flex flex-wrap gap-x-5 gap-y-1 mb-3">
          {series.map((s, i) => (
            <span key={s.name} className="inline-flex items-center gap-2 font-plex text-xs text-muted">
              <svg width="18" height="8" aria-hidden>
                <line x1="1" x2="17" y1="4" y2="4" stroke={colorOf(s, i)} strokeWidth="2.5" strokeDasharray={s.dashed ? "4 3" : undefined} strokeLinecap="round" />
              </svg>
              {s.name}
            </span>
          ))}
        </div>
      )}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label="Line chart">
        {yTicks.map((t) => (
          <g key={`y${t}`}>
            <line x1={PAD.l} x2={W - PAD.r} y1={ys(t)} y2={ys(t)} stroke={GRID} strokeWidth={1} />
            <text x={PAD.l - 8} y={ys(t)} textAnchor="end" dominantBaseline="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">
              {yTickFormat === "exp" ? (
                <>
                  10<tspan dy={-6} fontSize={9}>{Math.round(Math.log10(t))}</tspan>
                </>
              ) : (
                tickLabel(t)
              )}
            </text>
          </g>
        ))}
        {xTicks.map((t) => (
          <text key={`x${t}`} x={xs(t)} y={H - 10} textAnchor="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">
            {t}
          </text>
        ))}
        {markers.map((m) => (
          <g key={`m${m.x}`}>
            <line x1={xs(m.x)} x2={xs(m.x)} y1={PAD.t} y2={H - PAD.b} stroke="#cfd8dc" strokeWidth={1} />
            <text x={xs(m.x) + 4} y={H - PAD.b - 6} fontSize={11} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">
              {m.label}
            </text>
          </g>
        ))}
        {series.map((s, i) => {
          const d = s.points.map((p, j) => `${j ? "L" : "M"}${xs(p[0]).toFixed(1)},${ys(p[1]).toFixed(1)}`).join("");
          const last = s.points[s.points.length - 1];
          return (
            <g key={s.name}>
              <path d={d} fill="none" stroke={colorOf(s, i)} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={s.dashed ? "5 4" : undefined} />
              {s.points.map((p, j) => (
                <circle key={`${p[0]}-${j}`} cx={xs(p[0])} cy={ys(p[1])} r={6} fill="transparent">
                  <title>{`${s.name}, ${p[0]}: ${yPrefix}${fmt(p[1], digits)}${yUnit}`}</title>
                </circle>
              ))}
              <circle cx={xs(last[0])} cy={ys(last[1])} r={4} fill={colorOf(s, i)} stroke="#fff" strokeWidth={2} />
            </g>
          );
        })}
        {ends.map(({ s, y }) => {
          const last = s.points[s.points.length - 1];
          return (
            <text key={`e${s.name}`} x={xs(last[0]) + 9} y={y} dominantBaseline="middle" fontSize={12} fill={INK} fontFamily="var(--font-ibm-plex-sans)">
              {`${yPrefix}${fmt(last[1], digits)}${yUnit}`}
              {!showLegend && <tspan fill={AXIS_TEXT}>{` ${s.name}`}</tspan>}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
