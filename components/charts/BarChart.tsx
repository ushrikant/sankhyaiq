import { ACCENT, AXIS_TEXT, GRID, INK, MUTED_MARK, fmt, niceMax } from "./theme";

export interface BarDatum {
  label: string;
  value: number;
  highlight?: boolean;
  note?: string;
}

interface BarChartProps {
  data: BarDatum[];
  unit?: string;
  digits?: number;
  color?: string;
  max?: number;
  // When some bars are highlighted, the rest recede to grey.
  labelWidth?: number;
}

// Horizontal bar chart. Value sits at the bar tip; a native tooltip carries the exact number.
export default function BarChart({ data, unit = "", digits = 0, color = ACCENT, max, labelWidth = 150 }: BarChartProps) {
  const rowH = 30;
  const barH = 18;
  const W = 640;
  const valueRoom = 90;
  // Leave room for the longest label at the larger phone font size.
  labelWidth = Math.max(labelWidth, Math.max(...data.map((d) => d.label.length)) * 9.6 + 14);
  const plotW = W - labelWidth - valueRoom;
  const top = 6;
  const H = top + data.length * rowH + 4;
  const vmax = max ?? niceMax(Math.max(...data.map((d) => d.value)));
  const anyHighlight = data.some((d) => d.highlight);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label="Bar chart">
      <line x1={labelWidth} x2={labelWidth} y1={0} y2={H} stroke={GRID} strokeWidth={1} />
      {data.map((d, i) => {
        const y = top + i * rowH + (rowH - barH) / 2;
        const w = Math.max(2, (d.value / vmax) * plotW);
        const fill = anyHighlight && !d.highlight ? MUTED_MARK : color;
        const r = Math.min(4, w / 2);
        // square at the baseline, rounded at the data end
        const path = `M${labelWidth},${y} h${w - r} a${r},${r} 0 0 1 ${r},${r} v${barH - 2 * r} a${r},${r} 0 0 1 -${r},${r} h-${w - r} Z`;
        const valueText = `${fmt(d.value, digits)}${unit}`;
        return (
          <g key={d.label}>
            <title>{`${d.label}: ${valueText}${d.note ? ` (${d.note})` : ""}`}</title>
            <text x={labelWidth - 10} y={y + barH / 2} dominantBaseline="middle" textAnchor="end" fontSize={13} fill={d.highlight ? INK : AXIS_TEXT} fontWeight={d.highlight ? 600 : 400} fontFamily="var(--font-ibm-plex-sans)">
              {d.label}
            </text>
            <path d={path} fill={fill} />
            <text x={labelWidth + w + 8} y={y + barH / 2} dominantBaseline="middle" fontSize={12.5} fill={INK} fontFamily="var(--font-ibm-plex-sans)" fontWeight={d.highlight ? 600 : 400}>
              {valueText}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
