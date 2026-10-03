import { AXIS_TEXT, INK, SERIES } from "./theme";

interface Shape {
  name: string;
  d: string;
  b: [[number, number], [number, number]];
}

interface PanelSpec {
  title: string;
  shapes: Shape[];
}

interface ShapeCompareProps {
  left: PanelSpec;
  right: PanelSpec;
}

// Country outlines in two projections, drawn in one SVG at one shared scale,
// so the reader can compare sizes across both panels directly.
export default function ShapeCompare({ left, right }: ShapeCompareProps) {
  const gap = 10;
  const panelGap = 34;
  const font = 6.5;
  const top = 14; // room for panel titles
  const labelRoom = 14;
  const panels = [left, right];
  const H = Math.max(...panels.flatMap((p) => p.shapes.map((s) => s.b[1][1] - s.b[0][1])));

  let cursor = 0;
  const layout = panels.map((p) => {
    const start = cursor;
    const items = p.shapes.map((s, i) => {
      const w = s.b[1][0] - s.b[0][0];
      const h = s.b[1][1] - s.b[0][1];
      const minW = s.name.length * font * 0.55; // keep space for the label
      const slot = Math.max(w, minW);
      const x = cursor + (slot - w) / 2;
      const item = { s, i, tx: x - s.b[0][0], ty: top + H - h - s.b[0][1], cx: cursor + slot / 2 };
      cursor += slot + gap;
      return item;
    });
    cursor += panelGap - gap;
    return { p, start, items };
  });
  const W = cursor - panelGap;

  return (
    <svg viewBox={`-2 0 ${W + 4} ${top + H + labelRoom}`} className="w-full h-auto" role="img" aria-label={`${left.title} compared with ${right.title}`}>
      {layout.map(({ p, start, items }, k) => (
        <g key={p.title}>
          <text x={start} y={font + 1} fontSize={font + 0.5} fontWeight={600} fill={INK}>
            {p.title}
          </text>
          {k > 0 && <line x1={start - panelGap / 2} x2={start - panelGap / 2} y1={0} y2={top + H + labelRoom} stroke="#e6ebef" strokeWidth={0.5} />}
          {items.map(({ s, i, tx, ty, cx }) => (
            <g key={s.name}>
              <path d={s.d} transform={`translate(${tx},${ty})`} fill={SERIES[i]} fillOpacity={0.9} stroke="#fff" strokeWidth={0.4} />
              <text x={cx} y={top + H + 9} textAnchor="middle" fontSize={font} fill={AXIS_TEXT}>
                {s.name}
              </text>
            </g>
          ))}
          <title>{`${p.title}: ${items.map((it) => it.s.name).join(" and ")}`}</title>
        </g>
      ))}
    </svg>
  );
}
