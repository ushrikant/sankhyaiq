import { ACCENT, AXIS_TEXT, GRID, INK, MUTED_MARK, fmt, niceMax, niceTicks } from "./theme";

export interface ColumnDatum {
  label: string;
  value: number;
  highlight?: boolean;
  showValue?: boolean;
  note?: string;
}

interface ColumnChartProps {
  data: ColumnDatum[];
  unit?: string;
  prefix?: string;
  digits?: number;
  color?: string;
  labelEvery?: number;
}

// Vertical columns over time or categories. Values shown only where flagged, plus the last column.
export default function ColumnChart({ data, unit = "", prefix = "", digits = 0, color = ACCENT, labelEvery = 1 }: ColumnChartProps) {
  const W = 680;
  const H = 320;
  const PAD = { l: 56, r: 12, t: 22, b: 34 };
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const vmax = niceMax(Math.max(...data.map((d) => d.value)));
  const ticks = niceTicks(0, vmax, 5);
  const slot = plotW / data.length;
  const colW = Math.min(24, slot * 0.7);
  const ys = (v: number) => PAD.t + plotH - (v / vmax) * plotH;
  const anyHighlight = data.some((d) => d.highlight);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label="Column chart">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={PAD.l} x2={W - PAD.r} y1={ys(t)} y2={ys(t)} stroke={GRID} strokeWidth={1} />
          <text x={PAD.l - 8} y={ys(t)} textAnchor="end" dominantBaseline="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">
            {`${prefix}${fmt(t)}${unit}`}
          </text>
        </g>
      ))}
      {data.map((d, i) => {
        const cx = PAD.l + slot * i + slot / 2;
        const x = cx - colW / 2;
        const h = Math.max(1.5, (d.value / vmax) * plotH);
        const y = PAD.t + plotH - h;
        const r = Math.min(4, colW / 2, h / 2);
        const path = `M${x},${y + h} v${-(h - r)} a${r},${r} 0 0 1 ${r},${-r} h${colW - 2 * r} a${r},${r} 0 0 1 ${r},${r} v${h - r} Z`;
        const fill = anyHighlight && !d.highlight ? MUTED_MARK : color;
        const showValue = d.showValue || i === data.length - 1;
        return (
          <g key={d.label}>
            <title>{`${d.label}: ${prefix}${fmt(d.value, digits)}${unit}${d.note ? ` (${d.note})` : ""}`}</title>
            <rect x={cx - slot / 2} y={PAD.t} width={slot} height={plotH} fill="transparent" />
            <path d={path} fill={fill} />
            {showValue && (
              <text x={cx} y={y - 6} textAnchor="middle" fontSize={11.5} fill={INK} fontFamily="var(--font-ibm-plex-sans)" fontWeight={600}>
                {`${prefix}${fmt(d.value, digits)}${unit}`}
              </text>
            )}
            {i % labelEvery === 0 && (
              <text x={cx} y={H - 12} textAnchor="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">
                {d.label}
              </text>
            )}
          </g>
        );
      })}
      <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t + plotH} y2={PAD.t + plotH} stroke="#cfd8dc" strokeWidth={1} />
    </svg>
  );
}
