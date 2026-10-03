import { AXIS_TEXT, GRID, INK, SERIES, fmt } from "./theme";

export interface PyramidRow {
  age: string;
  m2024: number;
  f2024: number;
  m2050: number;
  f2050: number;
}

// Population pyramid: filled bars for the first year, an outline for the comparison year.
export default function Pyramid({ data, unit = " m" }: { data: PyramidRow[]; unit?: string }) {
  const rows = [...data].reverse(); // oldest at the top
  const W = 680;
  const rowH = 18;
  const top = 26;
  const H = top + rows.length * rowH + 30;
  const mid = W / 2;
  const gutter = 36; // age labels sit in the middle
  const half = mid - gutter - 16;
  const vmax = Math.max(...data.flatMap((r) => [r.m2024, r.f2024, r.m2050, r.f2050]));
  const sx = (v: number) => (v / vmax) * half;
  const male = SERIES[1];
  const female = SERIES[0];

  const outline = (side: "m" | "f") => {
    let d = "";
    rows.forEach((r, i) => {
      const v = side === "m" ? r.m2050 : r.f2050;
      const x = side === "m" ? mid - gutter - sx(v) : mid + gutter + sx(v);
      const y0 = top + i * rowH;
      d += `${i ? "L" : "M"}${x.toFixed(1)},${y0} L${x.toFixed(1)},${y0 + rowH}`;
    });
    return d;
  };

  const ticks = [0, 20, 40, 60].filter((t) => t <= vmax);

  return (
    <div>
      <div className="flex flex-wrap gap-x-5 gap-y-1 mb-3 font-plex text-xs text-muted">
        <span className="inline-flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: male }} />Men, 2024</span>
        <span className="inline-flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: female }} />Women, 2024</span>
        <span className="inline-flex items-center gap-2">
          <svg width="18" height="10" aria-hidden><path d="M1,9 L1,1 L17,1" fill="none" stroke={INK} strokeWidth="1.5" /></svg>
          2050 (UN projection)
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Population pyramid">
        <text x={mid - gutter - half} y={14} fontSize={12} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">Men</text>
        <text x={mid + gutter + half} y={14} textAnchor="end" fontSize={12} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">Women</text>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={mid - gutter - sx(t)} x2={mid - gutter - sx(t)} y1={top} y2={top + rows.length * rowH} stroke={GRID} />
            <line x1={mid + gutter + sx(t)} x2={mid + gutter + sx(t)} y1={top} y2={top + rows.length * rowH} stroke={GRID} />
            <text x={mid - gutter - sx(t)} y={H - 12} textAnchor="middle" fontSize={11} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">{t}</text>
            <text x={mid + gutter + sx(t)} y={H - 12} textAnchor="middle" fontSize={11} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">{t}</text>
          </g>
        ))}
        {rows.map((r, i) => {
          const y = top + i * rowH + 2;
          const h = rowH - 4;
          return (
            <g key={r.age}>
              <title>{`Age ${r.age}. 2024: men ${fmt(r.m2024, 1)}${unit}, women ${fmt(r.f2024, 1)}${unit}. 2050: men ${fmt(r.m2050, 1)}${unit}, women ${fmt(r.f2050, 1)}${unit}`}</title>
              <rect x={mid - gutter - sx(r.m2024)} y={y} width={sx(r.m2024)} height={h} fill={male} rx={2} />
              <rect x={mid + gutter} y={y} width={sx(r.f2024)} height={h} fill={female} rx={2} />
              <text x={mid} y={y + h / 2} textAnchor="middle" dominantBaseline="middle" fontSize={10.5} fill={INK} fontFamily="var(--font-ibm-plex-sans)">
                {r.age}
              </text>
            </g>
          );
        })}
        <path d={outline("m")} fill="none" stroke={INK} strokeWidth={1.5} />
        <path d={outline("f")} fill="none" stroke={INK} strokeWidth={1.5} />
        <text x={mid} y={H - 12} textAnchor="middle" fontSize={11} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">millions</text>
      </svg>
    </div>
  );
}
