// Shared chart tokens. Categorical order validated for colour-blind separation
// (green, blue, orange, purple). Never cycle: a fifth series folds into "Other".
export const SERIES = ["#2e7d32", "#1565c0", "#c56a1a", "#8e5a9e"] as const;
export const ACCENT = "#1565c0";
export const MUTED_MARK = "#b8c4cc";
export const GRID = "#e6ebef";
export const AXIS_TEXT = "#546e7a";
export const INK = "#0d2b52";

export function fmt(n: number, digits = 0): string {
  return n.toLocaleString("en-IN", { maximumFractionDigits: digits, minimumFractionDigits: digits });
}

// Clean tick values for a linear domain.
export function niceTicks(min: number, max: number, count = 5): number[] {
  const span = max - min || 1;
  const raw = span / count;
  const pow = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * pow).find((s) => span / s <= count) ?? 10 * pow;
  const start = Math.ceil(min / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= max + step * 1e-9; v += step) ticks.push(+v.toFixed(10));
  return ticks;
}

export function niceMax(max: number): number {
  const t = niceTicks(0, max, 5);
  const last = t[t.length - 1];
  return last >= max ? last : last + (t[1] - t[0]);
}
