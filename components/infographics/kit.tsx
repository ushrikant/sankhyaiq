import type { CSSProperties, ReactNode } from "react";

// One frame and one set of drawing parts for every infographic plate on the site.
// Colour rule: a plate is blue or green. Amber marks the single thing to look at.
// Text always wears ink or muted, never a data colour.

export type Tone = "blue" | "green";
export type Shade = "strong" | "deep" | "mid" | "soft" | "pale" | "hl" | "alt";

const TONES: Record<Tone, Record<string, string>> = {
  blue: {
    "--strong": "#1565c0",
    "--deep": "#0d2b52",
    "--mid": "#5b9fe3",
    "--soft": "#b9d7f4",
    "--wash": "#f2f7fd",
    "--alt": "#2e7d32",
  },
  green: {
    "--strong": "#2e7d32",
    "--deep": "#1b5e20",
    "--mid": "#66b36a",
    "--soft": "#c1e2c3",
    "--wash": "#f1f8f1",
    "--alt": "#1565c0",
  },
};
const SHARED = { "--hl": "#e8930c", "--pale": "#e3e9ee", "--ink": "#0d2b52", "--muted": "#546e7a" };

export const shade = (s: Shade = "strong") => `var(--${s})`;

const pct = (n: number) => `${Math.max(0, Math.min(100, n)).toFixed(2)}%`;

// ─── Gallery and plate frame ────────────────────────────────────────────────

export type PlateSpec = {
  topic: string;
  title: string;
  deck: string;
  takeaway: string;
  source: string;
  tone?: Tone;
  wide?: boolean;
  visual: ReactNode;
};

export function Gallery({
  id, accent, kicker, title, intro, index, children,
}: {
  id: string; accent: string; kicker: string; title: string; intro: string;
  index: { n: number; label: string }[]; children: ReactNode;
}) {
  return (
    <section id={id} className="mb-20 scroll-mt-24">
      <div className="mb-7 border-t-4 pt-6" style={{ borderColor: accent }}>
        <p className="font-plex text-sm font-semibold mb-2" style={{ color: accent }}>{kicker}</p>
        <h2 className="font-playfair text-3xl lg:text-[40px] font-bold text-navy leading-tight max-w-3xl">{title}</h2>
        <p className="font-plex text-base lg:text-lg text-muted max-w-2xl mt-3 leading-relaxed">{intro}</p>
      </div>
      <nav aria-label={`${title}: jump to an infographic`} className="mb-8">
        <ol className="flex flex-wrap gap-2">
          {index.map((it) => (
            <li key={it.n}>
              <a
                href={`#${id}-${it.n}`}
                className="inline-flex items-center gap-2 rounded-full border border-[#dbe3ea] bg-white pl-1 pr-3 py-1 font-plex text-[13px] text-navy hover:border-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-cobalt transition-colors"
              >
                <span className="grid place-items-center w-6 h-6 rounded-full text-[11px] font-semibold text-white" style={{ background: accent }}>
                  {it.n}
                </span>
                {it.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{children}</div>
    </section>
  );
}

export function Plate({
  id, n, topic, title, deck, takeaway, source, tone = "blue", wide = false, children,
}: {
  id: string; n: number; topic: string; title: string; deck: string; takeaway: string;
  source?: string; tone?: Tone; wide?: boolean; children: ReactNode;
}) {
  const vars = { ...TONES[tone], ...SHARED, fontFeatureSettings: '"lnum" 1' } as CSSProperties;
  const head = (
    <header>
      <div className="flex items-center gap-2.5 mb-4">
        <span className="grid place-items-center w-8 h-8 rounded-full bg-[var(--strong)] font-playfair text-[15px] font-bold text-white leading-none">
          {n}
        </span>
        <span className="font-plex text-[13px] font-semibold text-[var(--deep)]">{topic}</span>
      </div>
      <h3 className="font-playfair text-[22px] sm:text-2xl lg:text-[26px] font-bold text-navy leading-[1.2] text-balance">{title}</h3>
      <p className="font-plex text-[15px] text-muted leading-relaxed mt-2.5">{deck}</p>
    </header>
  );
  const foot = (
    <footer>
      <p className="font-plex text-sm text-navy/90 leading-relaxed border-l-[3px] border-[var(--hl)] pl-3">{takeaway}</p>
      {source && <p className="font-plex text-[11.5px] text-muted leading-relaxed mt-3">Source: {source}</p>}
    </footer>
  );
  const panel = (
    <div className="rounded-xl bg-[var(--wash)] p-4 sm:p-5 flex items-center min-w-0 w-full">
      <div className="w-full min-w-0">{children}</div>
    </div>
  );
  return (
    <article
      id={id}
      style={vars}
      className={`scroll-mt-24 flex flex-col rounded-2xl bg-white border border-[#e1e8ee] shadow-[0_1px_2px_rgba(13,43,82,0.05)] overflow-hidden ${wide ? "lg:col-span-2" : ""}`}
    >
      <div className="h-1.5 bg-[var(--strong)]" />
      {wide ? (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-10 gap-y-6 p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-6 lg:justify-between">
            {head}
            <div className="hidden lg:block">{foot}</div>
          </div>
          {panel}
          <div className="lg:hidden">{foot}</div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-6 p-5 sm:p-7">
          {head}
          <div className="flex-1 flex">{panel}</div>
          {foot}
        </div>
      )}
    </article>
  );
}

// Lays a list of plate specs into the grid. A half plate that would sit alone in a row is widened.
export function PlateList({ id, plates }: { id: string; plates: PlateSpec[] }) {
  const wide = plates.map((p) => !!p.wide);
  let col = 0;
  for (let i = 0; i < plates.length; i++) {
    if (wide[i]) { col = 0; continue; }
    if (col === 0 && (i === plates.length - 1 || wide[i + 1])) { wide[i] = true; continue; }
    col = col === 0 ? 1 : 0;
  }
  return (
    <>
      {plates.map((p, i) => (
        <Plate
          key={p.title}
          id={`${id}-${i + 1}`}
          n={i + 1}
          topic={p.topic}
          title={p.title}
          deck={p.deck}
          takeaway={p.takeaway}
          source={p.source}
          tone={p.tone ?? (i % 2 === 0 ? "blue" : "green")}
          wide={wide[i]}
        >
          {p.visual}
        </Plate>
      ))}
    </>
  );
}

// ─── Small shared parts ─────────────────────────────────────────────────────

export function Note({ children }: { children: ReactNode }) {
  return <p className="font-plex text-[11.5px] text-muted leading-relaxed mt-3">{children}</p>;
}

export function Legend({ items }: { items: { label: string; shade: Shade }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1.5 mb-3">
      {items.map((it) => (
        <li key={it.label} className="flex items-center gap-1.5 font-plex text-xs text-navy">
          <span className="w-2.5 h-2.5 rounded-[3px]" style={{ background: shade(it.shade) }} />
          {it.label}
        </li>
      ))}
    </ul>
  );
}

export function Big({ value, unit, caption }: { value: string; unit?: string; caption?: string }) {
  return (
    <div>
      <p className="font-playfair font-bold text-navy leading-none text-[44px] sm:text-[56px]">
        {value}
        {unit && <span className="font-plex font-medium text-lg sm:text-xl text-muted ml-2">{unit}</span>}
      </p>
      {caption && <p className="font-plex text-sm text-muted mt-2 leading-snug">{caption}</p>}
    </div>
  );
}

export function Facts({ items, cols = 2 }: { items: { value: string; label: string; hl?: boolean }[]; cols?: 2 | 3 }) {
  return (
    <dl className={`grid gap-2.5 ${cols === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}>
      {items.map((f) => (
        <div key={f.label} className="rounded-lg bg-white px-3 py-2.5 border-l-[3px]" style={{ borderColor: shade(f.hl ? "hl" : "strong") }}>
          <dd className="font-playfair text-xl sm:text-[22px] font-bold text-navy leading-tight">{f.value}</dd>
          <dt className="font-plex text-xs text-muted mt-1 leading-snug">{f.label}</dt>
        </div>
      ))}
    </dl>
  );
}

// ─── Bars: horizontal, one row per item ─────────────────────────────────────

export type BarRow = { label: string; value: number; display?: string; sub?: string; hl?: boolean; dim?: boolean };

export function Bars({ rows, max, unit }: { rows: BarRow[]; max?: number; unit?: string }) {
  const top = max ?? Math.max(...rows.map((r) => r.value));
  return (
    <div>
      <ul className="flex flex-col gap-2.5">
        {rows.map((r) => (
          <li key={r.label} className="grid grid-cols-[minmax(92px,34%)_1fr_auto] items-center gap-3" title={`${r.label}: ${r.display ?? r.value}`}>
            <div className="min-w-0">
              <p className={`font-plex text-[13px] leading-tight text-navy ${r.hl ? "font-semibold" : ""}`}>{r.label}</p>
              {r.sub && <p className="font-plex text-[11px] text-muted leading-tight mt-0.5">{r.sub}</p>}
            </div>
            <div className="h-3.5 rounded-r-[4px] bg-white">
              <div
                className="h-full rounded-r-[4px]"
                style={{ width: pct(Math.max((r.value / top) * 100, 0.8)), background: shade(r.hl ? "hl" : r.dim ? "soft" : "strong") }}
              />
            </div>
            <p className="font-plex text-[13px] font-semibold text-navy tabular-nums text-right min-w-[44px]">{r.display ?? r.value}</p>
          </li>
        ))}
      </ul>
      {unit && <Note>{unit}</Note>}
    </div>
  );
}

// ─── Columns: vertical bars, optional log scale or mountain shape ───────────

export type Col = { label: string; value: number; display?: string; sub?: string; hl?: boolean; dim?: boolean; hideValue?: boolean };

export function Columns({
  items, height = 170, log, floor, shape = "bar", unit,
}: { items: Col[]; height?: number; log?: boolean; floor?: number; shape?: "bar" | "peak"; unit?: string }) {
  const vals = items.map((i) => i.value);
  const hi = Math.max(...vals);
  const lo = floor ?? (log ? Math.min(...vals) / 3 : 0);
  const frac = (v: number) => (log ? (Math.log(v) - Math.log(lo)) / (Math.log(hi) - Math.log(lo)) : (v - lo) / (hi - lo));
  return (
    <div>
      <div className="flex items-end gap-1.5 sm:gap-2.5">
        {items.map((it) => (
          <div key={it.label} className="flex-1 min-w-0 flex flex-col items-center" title={`${it.label}: ${it.display ?? it.value}`}>
            <p className={`font-plex text-[11px] sm:text-xs font-semibold text-navy tabular-nums mb-1 text-center leading-tight ${it.hideValue ? "invisible" : ""}`}>
              {it.display ?? it.value}
            </p>
            <div
              className={shape === "peak" ? "w-full" : "w-full max-w-[42px] rounded-t-[4px]"}
              style={{
                height: Math.max(3, Math.round(frac(it.value) * height)),
                background: shade(it.hl ? "hl" : it.dim ? "soft" : "strong"),
                clipPath: shape === "peak" ? "polygon(50% 0, 100% 100%, 0 100%)" : undefined,
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 sm:gap-2.5 border-t border-[var(--pale)] pt-1.5">
        {items.map((it) => (
          <div key={it.label} className="flex-1 min-w-0 text-center">
            <p className={`font-plex text-[10.5px] sm:text-[11.5px] leading-tight text-navy ${it.hl ? "font-semibold" : ""}`}>{it.label}</p>
            {it.sub && <p className="font-plex text-[10px] sm:text-[10.5px] text-muted leading-tight mt-0.5">{it.sub}</p>}
          </div>
        ))}
      </div>
      {unit && <Note>{unit}</Note>}
    </div>
  );
}

// ─── Waffle: 100 cells, each one per cent ───────────────────────────────────

export type Part = { label: string; value: number; display?: string; shade: Shade };

function cellsFor(parts: Part[]) {
  const total = parts.reduce((s, p) => s + p.value, 0);
  const raw = parts.map((p) => (p.value / total) * 100);
  const cells = raw.map(Math.floor);
  let left = 100 - cells.reduce((s, c) => s + c, 0);
  const order = raw.map((r, i) => [r - Math.floor(r), i] as const).sort((a, b) => b[0] - a[0] || a[1] - b[1]);
  for (const [, i] of order) { if (left <= 0) break; cells[i]++; left--; }
  return cells;
}

export function Waffle({ parts, legend = true, size = 190 }: { parts: Part[]; legend?: boolean; size?: number }) {
  const cells = cellsFor(parts);
  const fills: Shade[] = [];
  cells.forEach((c, i) => { for (let k = 0; k < c; k++) fills.push(parts[i].shade); });
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
      <div className="grid grid-cols-10 gap-[3px] shrink-0 w-full" style={{ maxWidth: size }} role="img" aria-label={parts.map((p) => `${p.label} ${p.display ?? p.value}`).join(", ")}>
        {fills.map((f, i) => (
          <span key={i} className="aspect-square rounded-[3px]" style={{ background: shade(f) }} />
        ))}
      </div>
      {legend && (
        <ul className="flex flex-col gap-2 min-w-[130px] flex-1">
          {parts.map((p) => (
            <li key={p.label} className="flex items-start gap-2">
              <span className="w-3 h-3 rounded-[3px] mt-1 shrink-0" style={{ background: shade(p.shade) }} />
              <span className="font-plex text-[13px] text-navy leading-snug">
                <b className="font-semibold tabular-nums">{p.display ?? `${p.value}%`}</b> {p.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// ─── Rings: a share out of 100 ──────────────────────────────────────────────

export function Rings({ items, cols = 4 }: { items: { label: string; value: number; display?: string; sub?: string; hl?: boolean }[]; cols?: 2 | 3 | 4 }) {
  const C = 2 * Math.PI * 40;
  const grid = cols === 4 ? "grid-cols-2 sm:grid-cols-4" : cols === 3 ? "grid-cols-3" : "grid-cols-2";
  return (
    <div className={`grid ${grid} gap-x-4 gap-y-5`}>
      {items.map((it) => (
        <div key={it.label} className="text-center" title={`${it.label}: ${it.display ?? it.value}`}>
          <div className="relative mx-auto w-[92px] sm:w-[104px]">
            <svg viewBox="0 0 100 100" className="w-full h-auto block -rotate-90" aria-hidden>
              <circle cx={50} cy={50} r={40} fill="none" stroke="#fff" strokeWidth={11} />
              <circle
                cx={50} cy={50} r={40} fill="none" strokeWidth={11} strokeLinecap="butt"
                stroke={shade(it.hl ? "hl" : "strong")} strokeDasharray={`${(it.value / 100) * C} ${C}`}
              />
            </svg>
            <p className="absolute inset-0 grid place-items-center font-playfair text-xl font-bold text-navy">{it.display ?? `${it.value}%`}</p>
          </div>
          <p className="font-plex text-[13px] text-navy leading-tight mt-2">{it.label}</p>
          {it.sub && <p className="font-plex text-[11px] text-muted leading-tight mt-0.5">{it.sub}</p>}
        </div>
      ))}
    </div>
  );
}

// ─── Scaled shapes: circles, squares or eggs drawn to true relative size ────

export function Shapes({
  items, by = "area", shape = "circle", maxPx = 140, unit,
}: {
  items: { label: string; value: number; display?: string; hl?: boolean; dim?: boolean }[];
  by?: "area" | "width"; shape?: "circle" | "square" | "egg"; maxPx?: number; unit?: string;
}) {
  const hi = Math.max(...items.map((i) => i.value));
  const size = (v: number) => Math.max(3, Math.round((by === "area" ? Math.sqrt(v / hi) : v / hi) * maxPx));
  return (
    <div>
      <div className="flex flex-wrap items-end justify-around gap-x-2 gap-y-5">
        {items.map((it) => {
          const s = size(it.value);
          return (
            <div key={it.label} className="flex flex-col items-center min-w-[52px]" title={`${it.label}: ${it.display ?? it.value}`}>
              <div
                style={{
                  width: shape === "egg" ? Math.max(3, Math.round(s * 0.74)) : s,
                  height: s,
                  background: shade(it.hl ? "hl" : it.dim ? "soft" : "strong"),
                  borderRadius: shape === "square" ? 4 : shape === "egg" ? "50% 50% 50% 50% / 60% 60% 40% 40%" : "50%",
                }}
              />
              <p className={`font-plex text-xs text-navy leading-tight mt-2 text-center ${it.hl ? "font-semibold" : ""}`}>{it.label}</p>
              <p className="font-plex text-[11.5px] font-semibold text-navy tabular-nums leading-tight mt-0.5">{it.display ?? it.value}</p>
            </div>
          );
        })}
      </div>
      {unit && <Note>{unit}</Note>}
    </div>
  );
}

// ─── Ladder: a vertical scale with labelled marks (depth, height, heat) ─────

export function Ladder({
  items, min, max, log, top = "max", height = 400, capTop, capBottom,
}: {
  items: { label: string; value: number; display: string; hl?: boolean; dim?: boolean }[];
  min: number; max: number; log?: boolean; top?: "max" | "min"; height?: number; capTop?: string; capBottom?: string;
}) {
  const f = (v: number) => {
    const t = log ? (Math.log(v) - Math.log(min)) / (Math.log(max) - Math.log(min)) : (v - min) / (max - min);
    return top === "max" ? 1 - t : t;
  };
  const GAP = 34;
  const pts = items.map((it) => ({ ...it, y: 12 + f(it.value) * (height - 24) })).sort((a, b) => a.y - b.y);
  const ly: number[] = [];
  pts.forEach((p, i) => { ly[i] = i === 0 ? p.y : Math.max(p.y, ly[i - 1] + GAP); });
  for (let i = pts.length - 1; i >= 0; i--) {
    const cap = i === pts.length - 1 ? height - 12 : ly[i + 1] - GAP;
    if (ly[i] > cap) ly[i] = cap;
  }
  return (
    <div>
      {capTop && <p className="font-plex text-[11px] text-muted mb-1.5 pl-1">{capTop}</p>}
      <div className="relative" style={{ height }}>
        <div className="absolute left-[11px] top-0 bottom-0 w-[6px] rounded-full" style={{ background: `linear-gradient(${top === "max" ? "to top" : "to bottom"}, var(--soft), var(--strong))` }} />
        <svg className="absolute left-0 top-0" width={64} height={height} aria-hidden>
          {pts.map((p, i) => (
            <g key={p.label}>
              <line x1={14} y1={p.y} x2={58} y2={ly[i]} stroke={shade(p.hl ? "hl" : "strong")} strokeWidth={1} opacity={0.7} />
              <circle cx={14} cy={p.y} r={6} fill={shade(p.hl ? "hl" : p.dim ? "mid" : "strong")} stroke="#fff" strokeWidth={2} />
            </g>
          ))}
        </svg>
        {pts.map((p, i) => (
          <p key={p.label} className="absolute left-[64px] right-0 -translate-y-1/2 font-plex text-[13px] text-navy leading-tight" style={{ top: ly[i] }}>
            <b className="font-semibold tabular-nums">{p.display}</b>
            <span className={`ml-2 ${p.hl ? "font-semibold" : ""}`}>{p.label}</span>
          </p>
        ))}
      </div>
      {capBottom && <p className="font-plex text-[11px] text-muted mt-1.5 pl-1">{capBottom}</p>}
    </div>
  );
}

// ─── Timeline: dated steps down a rail ──────────────────────────────────────

export function Timeline({ items, whenWidth = 58 }: { items: { when: string; title: string; text?: string; hl?: boolean }[]; whenWidth?: number }) {
  return (
    <ol className="relative">
      <span className="absolute top-2 bottom-2 w-[2px] bg-[var(--soft)]" style={{ left: whenWidth + 16 }} aria-hidden />
      {items.map((it) => (
        <li key={it.when + it.title} className="relative grid items-start gap-x-3 py-[7px]" style={{ gridTemplateColumns: `${whenWidth}px 10px 1fr` }}>
          <p className="font-playfair text-[15px] font-bold text-navy text-right leading-tight tabular-nums">{it.when}</p>
          <span className="w-[10px] h-[10px] rounded-full mt-[5px] ring-2 ring-white" style={{ background: shade(it.hl ? "hl" : "strong") }} />
          <div>
            <p className={`font-plex text-[13px] text-navy leading-snug ${it.hl ? "font-semibold" : ""}`}>{it.title}</p>
            {it.text && <p className="font-plex text-[11.5px] text-muted leading-snug mt-0.5">{it.text}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

// ─── Stack: one bar split into parts, widths to scale ───────────────────────

const RAMP = [1, 0.8, 0.62, 0.46, 0.34, 0.25, 0.18, 0.13];

export function Stack({ parts, cols = 2, height = 30 }: { parts: { label: string; value: number; display?: string; shade?: Shade }[]; cols?: 1 | 2; height?: number }) {
  const total = parts.reduce((s, p) => s + p.value, 0);
  const fill = (p: { shade?: Shade }, i: number): CSSProperties =>
    p.shade ? { background: shade(p.shade) } : { background: "var(--strong)", opacity: RAMP[Math.min(i, RAMP.length - 1)] };
  return (
    <div>
      <div className="flex gap-[2px] rounded-[5px] overflow-hidden bg-white" style={{ height }} role="img" aria-label={parts.map((p) => `${p.label} ${p.display ?? p.value}`).join(", ")}>
        {parts.map((p, i) => (
          <span key={p.label} title={`${p.label}: ${p.display ?? p.value}`} style={{ width: pct((p.value / total) * 100), minWidth: 2, ...fill(p, i) }} />
        ))}
      </div>
      <ul className={`grid ${cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"} gap-x-5 gap-y-1.5 mt-4`}>
        {parts.map((p, i) => (
          <li key={p.label} className="flex items-baseline gap-2 font-plex text-[13px] text-navy">
            <span className="w-2.5 h-2.5 rounded-[3px] shrink-0 translate-y-[1px]" style={fill(p, i)} />
            <span className="flex-1 leading-snug">{p.label}</span>
            <b className="font-semibold tabular-nums">{p.display ?? p.value}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Trend: a line over evenly spaced points ────────────────────────────────

export function Trend({
  points, yMin = 0, yMax, height = 170, unit,
}: { points: { x: string; y: number; display?: string; show?: boolean; hl?: boolean }[]; yMin?: number; yMax?: number; height?: number; unit?: string }) {
  const hi = yMax ?? Math.max(...points.map((p) => p.y));
  const n = points.length;
  const X = (i: number) => (i / (n - 1)) * 100;
  const Y = (v: number) => (1 - (v - yMin) / (hi - yMin)) * 100;
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"} ${X(i).toFixed(2)} ${Y(p.y).toFixed(2)}`).join(" ");
  const align = (i: number) => (i === 0 ? "translate-x-0" : i === n - 1 ? "-translate-x-full" : "-translate-x-1/2");
  return (
    <div>
      <div className="px-2 pt-7">
        <div className="relative" style={{ height }}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible" aria-hidden>
            <path d={`${line} L 100 100 L 0 100 Z`} fill="var(--strong)" opacity={0.1} />
            <path d={line} fill="none" stroke="var(--strong)" strokeWidth={2} vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
          </svg>
          {points.map((p, i) => (
            <span key={p.x} title={`${p.x}: ${p.display ?? p.y}`}>
              <span
                className="absolute w-[10px] h-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-white"
                style={{ left: `${X(i)}%`, top: `${Y(p.y)}%`, background: shade(p.hl ? "hl" : "strong") }}
              />
              {p.show !== false && (
                <span
                  className={`absolute -translate-y-[calc(100%+8px)] font-plex text-xs font-semibold text-navy tabular-nums whitespace-nowrap ${align(i)}`}
                  style={{ left: `${X(i)}%`, top: `${Y(p.y)}%` }}
                >
                  {p.display ?? p.y}
                </span>
              )}
            </span>
          ))}
        </div>
        <div className="relative h-5 mt-2 border-t border-[var(--pale)]">
          {points.map((p, i) => (
            <span key={p.x} className={`absolute top-1.5 font-plex text-[11px] text-muted whitespace-nowrap ${align(i)}`} style={{ left: `${X(i)}%` }}>
              {p.x}
            </span>
          ))}
        </div>
      </div>
      {unit && <Note>{unit}</Note>}
    </div>
  );
}

// ─── Dots: a count of people or things, some picked out ─────────────────────

export function Dots({ total, filled, cols = 10, label }: { total: number; filled: number; cols?: number; label?: string }) {
  return (
    <div>
      <div className="grid gap-2 max-w-[340px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }} role="img" aria-label={label ?? `${filled} of ${total}`}>
        {Array.from({ length: total }).map((_, i) => (
          <svg key={i} viewBox="0 0 24 40" className="w-full h-auto" aria-hidden>
            <circle cx={12} cy={7} r={6} fill={shade(i < filled ? "hl" : "soft")} />
            <path d="M2 22a10 10 0 0 1 20 0v16H2z" fill={shade(i < filled ? "hl" : "soft")} />
          </svg>
        ))}
      </div>
      {label && <Note>{label}</Note>}
    </div>
  );
}

// ─── Versus: two values per row on one track ────────────────────────────────

export function Versus({
  rows, max, a, b,
}: { rows: { label: string; a: number; b: number; da?: string; db?: string }[]; max: number; a: string; b: string }) {
  return (
    <div>
      <Legend items={[{ label: a, shade: "soft" }, { label: b, shade: "strong" }]} />
      <ul className="flex flex-col gap-3">
        {rows.map((r) => (
          <li key={r.label} title={`${r.label}: ${r.da ?? r.a} and ${r.db ?? r.b}`}>
            <p className="font-plex text-[13px] text-navy mb-1">{r.label}</p>
            <div className="grid grid-cols-[1fr_auto] items-center gap-3">
              <div className="h-3 bg-white rounded-r-[4px]"><div className="h-full rounded-r-[4px] bg-[var(--soft)]" style={{ width: pct((r.a / max) * 100) }} /></div>
              <p className="font-plex text-[13px] font-semibold text-navy tabular-nums min-w-[44px] text-right">{r.da ?? r.a}</p>
              <div className="h-3 bg-white rounded-r-[4px]"><div className="h-full rounded-r-[4px] bg-[var(--strong)]" style={{ width: pct((r.b / max) * 100) }} /></div>
              <p className="font-plex text-[13px] font-semibold text-navy tabular-nums min-w-[44px] text-right">{r.db ?? r.b}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
