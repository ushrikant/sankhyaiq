"use client";

import { useEffect, useRef, useCallback, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────
interface YearData {
  year: number;
  label: string;
  smallHydro: number;
  biomass: number;
  wind: number;
  solar: number;
}

// Cumulative capacity in GW at each financial year end (31 March), plus the latest month.
// Built from MNRE's "Year wise Achievements" (cumulative to March 2014 plus yearly additions)
// and the MNRE physical progress page as on 31 August 2026. Large hydro is excluded, as in MNRE's series.
// Biomass = bagasse and non-bagasse cogeneration plus waste to energy.
const RE_DATA: YearData[] = [
  { year: 2014, label: "2014", smallHydro: 3.80, biomass: 8.18,  wind: 21.04, solar: 2.82 },
  { year: 2015, label: "2015", smallHydro: 4.06, biomass: 8.55,  wind: 23.35, solar: 3.99 },
  { year: 2016, label: "2016", smallHydro: 4.27, biomass: 8.92,  wind: 26.78, solar: 7.12 },
  { year: 2017, label: "2017", smallHydro: 4.38, biomass: 9.12,  wind: 32.28, solar: 12.78 },
  { year: 2018, label: "2018", smallHydro: 4.49, biomass: 9.67,  wind: 34.15, solar: 22.35 },
  { year: 2019, label: "2019", smallHydro: 4.59, biomass: 10.10, wind: 35.63, solar: 29.10 },
  { year: 2020, label: "2020", smallHydro: 4.68, biomass: 10.22, wind: 37.74, solar: 35.61 },
  { year: 2021, label: "2021", smallHydro: 4.79, biomass: 10.53, wind: 39.25, solar: 41.24 },
  { year: 2022, label: "2022", smallHydro: 4.85, biomass: 10.68, wind: 40.36, solar: 54.00 },
  { year: 2023, label: "2023", smallHydro: 4.94, biomass: 10.80, wind: 42.63, solar: 66.78 },
  { year: 2024, label: "2024", smallHydro: 5.00, biomass: 10.94, wind: 45.89, solar: 81.81 },
  { year: 2025, label: "2025", smallHydro: 5.10, biomass: 11.58, wind: 50.04, solar: 105.65 },
  { year: 2026, label: "2026", smallHydro: 5.17, biomass: 11.75, wind: 56.09, solar: 150.26 },
  { year: 2027, label: "Aug 26", smallHydro: 5.18, biomass: 11.75, wind: 58.52, solar: 168.04 },
];

const CATEGORIES = [
  { key: "smallHydro", label: "Small Hydro", color: "#38bdf8" },
  { key: "biomass",    label: "Bio-power",   color: "#22c55e" },
  { key: "wind",       label: "Wind",        color: "#06b6d4" },
  { key: "solar",      label: "Solar",       color: "#fbbf24" },
] as const;

type CatKey = (typeof CATEGORIES)[number]["key"];

function totalGW(d: YearData) {
  return d.smallHydro + d.biomass + d.wind + d.solar;
}

// ─── Layout constants ─────────────────────────────────────────────────────────
const W = 780;
const H = 400;
const PAD_L = 55;
const PAD_R = 24;
const PAD_T = 60;
const PAD_B = 50;
const CW = W - PAD_L - PAD_R;
const CH = H - PAD_T - PAD_B;
const N = RE_DATA.length;
const SLOT = CW / N;
const BAR_W = Math.max(10, SLOT - 6);
const MAX_GW = 260;
const PX_PER_GW = CH / MAX_GW;

const SUN_R_NORMAL = 10;
const SUN_R_BIG = 18;
const BOUNCE_MS = 420;
const STEP_DELAY_MS = 160;
const ARC_FADE_MS = 900;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function barX(i: number) {
  return PAD_L + i * SLOT + (SLOT - BAR_W) / 2;
}
function barTopY(d: YearData) {
  return PAD_T + CH - totalGW(d) * PX_PER_GW;
}
function barCenterX(i: number) {
  return PAD_L + i * SLOT + SLOT / 2;
}
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ─── Sun rays path ────────────────────────────────────────────────────────────
function sunRays(cx: number, cy: number, r: number, big: boolean) {
  const count = big ? 10 : 8;
  const inner = r + (big ? 4 : 3);
  const outer = r + (big ? 10 : 7);
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2;
    const x1 = cx + Math.cos(angle) * inner;
    const y1 = cy + Math.sin(angle) * inner;
    const x2 = cx + Math.cos(angle) * outer;
    const y2 = cy + Math.sin(angle) * outer;
    parts.push(`M${x1.toFixed(1)},${y1.toFixed(1)}L${x2.toFixed(1)},${y2.toFixed(1)}`);
  }
  return parts.join(" ");
}

// ─── Ghost arc path (quadratic bezier) ───────────────────────────────────────
function arcPath(x0: number, y0: number, x1: number, y1: number) {
  const mx = (x0 + x1) / 2;
  const peakY = Math.min(y0, y1) - 36;
  return { path: `M${x0},${y0} Q${mx},${peakY} ${x1},${y1}`, peakX: mx, peakY };
}

// ─── Component ────────────────────────────────────────────────────────────────
interface Ghost {
  path: string;
  label: string;
  peakX: number;
  peakY: number;
  opacity: number;
}

interface SunPos { x: number; y: number }

type Phase = "idle" | "animating" | "complete";

export default function IndiaREChart() {
  const [idx, setIdx] = useState(0);
  const [sunPos, setSunPos] = useState<SunPos>({ x: barCenterX(0), y: barTopY(RE_DATA[0]) });
  const [phase, setPhase] = useState<Phase>("idle");
  const [ghost, setGhost] = useState<Ghost | null>(null);
  const [sunR, setSunR] = useState(SUN_R_NORMAL);
  const [smiling, setSmiling] = useState(false);
  const [visibleBars, setVisibleBars] = useState(1);

  const idxRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const stepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ghostTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    if (stepTimerRef.current) { clearTimeout(stepTimerRef.current); stepTimerRef.current = null; }
    if (ghostTimerRef.current) { clearTimeout(ghostTimerRef.current); ghostTimerRef.current = null; }
  }, []);

  const bounceToNext = useCallback((fromIdx: number, toIdx: number, onDone: () => void) => {
    const x0 = barCenterX(fromIdx);
    const y0 = barTopY(RE_DATA[fromIdx]);
    const x1 = barCenterX(toIdx);
    const y1 = barTopY(RE_DATA[toIdx]);
    const startTime = performance.now();
    const { path, peakX, peakY } = arcPath(x0, y0, x1, y1);

    // pct growth label
    const prevTotal = totalGW(RE_DATA[fromIdx]);
    const nextTotal = totalGW(RE_DATA[toIdx]);
    const pct = prevTotal > 0
      ? `+${Math.round(((nextTotal - prevTotal) / prevTotal) * 100)}%`
      : "";

    setGhost({ path, label: pct, peakX, peakY, opacity: 1 });

    const frame = (now: number) => {
      const t = Math.min(1, (now - startTime) / BOUNCE_MS);
      const ease = easeInOut(t);
      const arcH = Math.abs(x1 - x0) * 0.35 + 20;
      const sx = x0 + (x1 - x0) * ease;
      const sy = y0 + (y1 - y0) * ease - arcH * Math.sin(Math.PI * t);
      setSunPos({ x: sx, y: sy });
      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        setSunPos({ x: x1, y: y1 });
        // fade ghost
        ghostTimerRef.current = setTimeout(() => {
          setGhost(prev => prev ? { ...prev, opacity: 0 } : null);
          ghostTimerRef.current = setTimeout(() => setGhost(null), ARC_FADE_MS);
        }, 300);
        onDone();
      }
    };
    rafRef.current = requestAnimationFrame(frame);
  }, []);

  const advance = useCallback(() => {
    const current = idxRef.current;
    const next = current + 1;
    if (next >= N) {
      // reached end — complete state
      setPhase("complete");
      setSunR(SUN_R_BIG);
      setSmiling(true);
      return;
    }
    idxRef.current = next;
    setIdx(next);
    setVisibleBars(next + 1);
    bounceToNext(current, next, () => {
      stepTimerRef.current = setTimeout(advance, STEP_DELAY_MS);
    });
  }, [bounceToNext]);

  const startAnimation = useCallback(() => {
    cleanup();
    idxRef.current = 0;
    setIdx(0);
    setVisibleBars(1);
    setPhase("animating");
    setGhost(null);
    setSunR(SUN_R_NORMAL);
    setSmiling(false);
    setSunPos({ x: barCenterX(0), y: barTopY(RE_DATA[0]) });
    stepTimerRef.current = setTimeout(advance, STEP_DELAY_MS);
  }, [cleanup, advance]);

  // auto-start (StrictMode-safe: cleanup cancels timer, second run starts it for real)
  useEffect(() => {
    const t = setTimeout(startAnimation, 800);
    return () => { clearTimeout(t); cleanup(); };
  }, [startAnimation, cleanup]);

  // ─── Y-axis ticks ──────────────────────────────────────────────────────────
  const yTicks = [0, 50, 100, 150, 200, 250];

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="w-full">
      {/* Legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1 mb-3">
        {[...CATEGORIES].reverse().map(cat => (
          <div key={cat.key} className="flex items-center gap-1.5">
            <span className="inline-block w-3 h-3 rounded-sm" style={{ background: cat.color }} />
            <span className="font-plex text-xs text-muted">{cat.label}</span>
          </div>
        ))}
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          style={{ minWidth: 400, display: "block" }}
          aria-label="India renewable energy capacity, March 2014 to August 2026"
        >
          {/* ── Y gridlines & labels ── */}
          {yTicks.map(gw => {
            const y = PAD_T + CH - gw * PX_PER_GW;
            return (
              <g key={gw}>
                <line x1={PAD_L} y1={y} x2={PAD_L + CW} y2={y}
                  stroke="#e2e8f0" strokeWidth="1" strokeDasharray={gw === 0 ? "0" : "4,3"} />
                <text x={PAD_L - 6} y={y + 4} textAnchor="end"
                  className="font-plex" fontSize={10} fill="#94a3b8">{gw}</text>
              </g>
            );
          })}

          {/* Y-axis label */}
          <text
            x={12} y={PAD_T + CH / 2}
            textAnchor="middle"
            fontSize={10} fill="#64748b"
            transform={`rotate(-90, 12, ${PAD_T + CH / 2})`}
            fontFamily="'IBM Plex Sans', sans-serif"
          >
            Installed capacity (GW)
          </text>

          {/* ── Stacked bars ── */}
          {RE_DATA.slice(0, visibleBars).map((d, i) => {
            const bx = barX(i);
            let stackY = PAD_T + CH;
            return (
              <g key={d.label}>
                {CATEGORIES.map(cat => {
                  const gw = d[cat.key as CatKey];
                  const barH = gw * PX_PER_GW;
                  stackY -= barH;
                  return (
                    <rect
                      key={cat.key}
                      x={bx} y={stackY}
                      width={BAR_W} height={barH}
                      fill={cat.color}
                      opacity={phase === "complete" ? 1 : i === idx ? 1 : 0.7}
                    />
                  );
                })}
                {/* X-axis year label — show every 5 years or at last bar */}
                {(d.year % 2 === 0 || i === N - 1) && (
                  <text
                    x={bx + BAR_W / 2} y={PAD_T + CH + 14}
                    textAnchor="middle" fontSize={9} fill="#64748b"
                    fontFamily="'IBM Plex Sans', sans-serif"
                  >
                    {d.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* ── Ghost arc ── */}
          {ghost && (
            <g style={{ transition: `opacity ${ARC_FADE_MS}ms ease`, opacity: ghost.opacity }}>
              <path
                d={ghost.path}
                fill="none" stroke="#fbbf24" strokeWidth="1.5"
                strokeDasharray="5,4" opacity={0.7}
              />
              {ghost.label && (
                <text
                  x={ghost.peakX} y={ghost.peakY - 6}
                  textAnchor="middle" fontSize={9} fill="#d97706" fontWeight="600"
                  fontFamily="'IBM Plex Sans', sans-serif"
                >
                  {ghost.label}
                </text>
              )}
            </g>
          )}

          {/* ── Sun ── */}
          <g>
            {/* glow */}
            {smiling && (
              <circle
                cx={sunPos.x} cy={sunPos.y} r={sunR + 10}
                fill="#fef08a" opacity={0.35}
              />
            )}
            {/* rays */}
            <path
              d={sunRays(sunPos.x, sunPos.y, sunR, smiling)}
              stroke="#f59e0b" strokeWidth={smiling ? 2.2 : 1.8} strokeLinecap="round"
            />
            {/* body */}
            <circle cx={sunPos.x} cy={sunPos.y} r={sunR} fill="#fbbf24" />
            {/* eyes */}
            <circle cx={sunPos.x - sunR * 0.3} cy={sunPos.y - sunR * 0.2} r={sunR * 0.12} fill="#78350f" />
            <circle cx={sunPos.x + sunR * 0.3} cy={sunPos.y - sunR * 0.2} r={sunR * 0.12} fill="#78350f" />
            {/* smile */}
            {smiling ? (
              <path
                d={`M${sunPos.x - sunR * 0.38},${sunPos.y + sunR * 0.18}
                    Q${sunPos.x},${sunPos.y + sunR * 0.6}
                    ${sunPos.x + sunR * 0.38},${sunPos.y + sunR * 0.18}`}
                fill="none" stroke="#78350f" strokeWidth={sunR * 0.1} strokeLinecap="round"
              />
            ) : (
              <path
                d={`M${sunPos.x - sunR * 0.3},${sunPos.y + sunR * 0.25}
                    Q${sunPos.x},${sunPos.y + sunR * 0.45}
                    ${sunPos.x + sunR * 0.3},${sunPos.y + sunR * 0.25}`}
                fill="none" stroke="#78350f" strokeWidth={sunR * 0.09} strokeLinecap="round"
              />
            )}
          </g>

          {/* ── Complete callout ── */}
          {phase === "complete" && (
            <g>
              <rect x={PAD_L + 6} y={PAD_T + 4} width={160} height={48} rx={8}
                fill="#fef9c3" stroke="#fde68a" strokeWidth={1} />
              <text x={PAD_L + 86} y={PAD_T + 22}
                textAnchor="middle" fontSize={11} fontWeight="700" fill="#92400e"
                fontFamily="'IBM Plex Sans', sans-serif"
              >
                243.5 GW, Aug 2026
              </text>
              <text x={PAD_L + 86} y={PAD_T + 38}
                textAnchor="middle" fontSize={10} fill="#b45309"
                fontFamily="'IBM Plex Sans', sans-serif"
              >
                295.6 GW with large hydro
              </text>
            </g>
          )}

          {/* ── Current year badge ── */}
          {phase === "animating" && (
            <text x={PAD_L + 6} y={PAD_T - 8}
              fontSize={13} fontWeight="700" fill="#1d4ed8"
              fontFamily="'Playfair Display', serif"
            >
              {RE_DATA[idx].label}: {totalGW(RE_DATA[idx]).toFixed(1)} GW
            </text>
          )}
        </svg>
      </div>

      {/* Replay button */}
      {phase === "complete" && (
        <div className="flex justify-center mt-3">
          <button
            onClick={startAnimation}
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-500 text-amber-900 font-plex font-semibold text-sm px-5 py-2 rounded-full transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Replay
          </button>
        </div>
      )}
    </div>
  );
}
