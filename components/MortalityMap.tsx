"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import mortData from "@/lib/mortality-data.json";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type MortData = {
  minYear: number;
  maxYear: number;
  countries: Record<string, Record<string, number>>;
};

const { countries } = mortData as MortData;
const START_YEAR = 1950;
const END_YEAR = 2023;
const SMILEY_THRESHOLD = 4; // ≤ 4% triggers smiley
const FRAME_MS = 280; // ms per year

function getRate(iso3: string, year: number): number | null {
  const c = countries[iso3];
  if (!c) return null;
  const r = c[String(year)];
  return r !== undefined ? r : null;
}

function mortalityColor(rate: number | null): string {
  if (rate === null) return "#d1d5db";
  if (rate > 40) return "#1c0a08";
  if (rate > 30) return "#7f1d1d";
  if (rate > 20) return "#c0392b";
  if (rate > 10) return "#d97706";
  if (rate > 6)  return "#ca8a04";
  if (rate > SMILEY_THRESHOLD) return "#84cc16";
  return "#16a34a"; // reached threshold — bright green
}

// Country centroids [lon, lat] for smiley placement
const CENTROIDS: Record<string, [number, number]> = {
  AFG: [67.7, 33.9], AGO: [17.8, -11.2], ALB: [20.2, 41.2], ARE: [53.8, 23.4],
  ARG: [-63.6, -38.4], ARM: [45.0, 40.1], AUS: [133.8, -25.7], AUT: [14.6, 47.7],
  AZE: [47.6, 40.1], BDI: [29.9, -3.4], BEL: [4.5, 50.5], BEN: [2.3, 9.3],
  BFA: [-1.6, 12.4], BGD: [90.4, 23.7], BGR: [25.5, 42.7], BHR: [50.6, 26.0],
  BIH: [17.7, 44.2], BLR: [28.0, 53.7], BLZ: [-88.5, 17.2], BOL: [-64.7, -16.3],
  BRA: [-51.9, -14.2], BTN: [90.4, 27.5], BWA: [24.7, -22.3], CAF: [20.9, 6.6],
  CAN: [-96.8, 56.1], CHE: [8.2, 46.8], CHL: [-71.5, -35.7], CHN: [104.2, 35.9],
  CIV: [-5.6, 7.5], CMR: [12.4, 5.7], COD: [24.0, -2.9], COG: [15.8, -0.2],
  COL: [-74.3, 4.1], COM: [43.3, -11.6], CPV: [-23.6, 14.9], CRI: [-84.0, 9.7],
  CUB: [-79.5, 21.5], CYP: [33.1, 35.0], CZE: [15.5, 49.8], DEU: [10.5, 51.2],
  DJI: [42.6, 11.8], DNK: [10.0, 56.3], DOM: [-70.2, 18.7], DZA: [2.6, 28.2],
  ECU: [-78.1, -1.8], EGY: [30.8, 26.8], ERI: [39.8, 15.2], ESP: [-3.7, 40.5],
  ETH: [39.6, 9.1], FIN: [26.0, 64.0], FJI: [178.1, -18.1], FRA: [2.2, 46.2],
  GAB: [11.6, -0.8], GBR: [-3.4, 55.4], GEO: [43.4, 42.3], GHA: [-1.0, 7.9],
  GIN: [-11.8, 10.9], GMB: [-15.3, 13.4], GNB: [-15.2, 12.0], GNQ: [10.3, 1.7],
  GRC: [22.0, 39.1], GTM: [-90.2, 15.8], GUY: [-58.9, 4.9], HND: [-86.2, 15.2],
  HRV: [16.0, 45.2], HTI: [-73.0, 18.9], HUN: [19.5, 47.2], IDN: [117.7, -0.8],
  IND: [78.9, 20.6], IRL: [-8.0, 53.4], IRN: [53.7, 32.4], IRQ: [43.7, 33.2],
  ISL: [-19.0, 65.0], ISR: [34.9, 31.5], ITA: [12.6, 42.8], JAM: [-77.3, 18.1],
  JOR: [36.2, 31.2], JPN: [138.3, 36.2], KAZ: [66.9, 48.0], KEN: [37.9, 0.0],
  KGZ: [74.8, 41.5], KHM: [104.9, 12.6], KWT: [47.5, 29.5], LAO: [103.9, 18.2],
  LBN: [35.9, 33.9], LBR: [-9.4, 6.4], LBY: [17.2, 26.3], LKA: [80.7, 7.9],
  LSO: [28.2, -29.6], LTU: [24.0, 56.0], LUX: [6.1, 49.8], LVA: [25.0, 56.9],
  MAR: [-6.8, 32.0], MDA: [28.4, 47.0], MDG: [46.9, -18.8], MEX: [-102.6, 23.6],
  MKD: [21.7, 41.6], MLI: [-2.0, 17.6], MMR: [96.7, 19.2], MNG: [103.8, 46.9],
  MOZ: [35.5, -18.7], MRT: [-11.8, 17.6], MWI: [34.3, -13.2], MYS: [109.7, 4.2],
  NAM: [18.5, -22.0], NER: [8.1, 16.1], NGA: [8.7, 9.1], NIC: [-85.2, 12.9],
  NLD: [5.3, 52.1], NOR: [8.5, 60.5], NPL: [84.1, 28.4], NZL: [172.0, -41.5],
  OMN: [57.0, 21.0], PAK: [69.3, 30.4], PAN: [-80.8, 8.5], PER: [-76.0, -9.2],
  PHL: [122.9, 12.9], PNG: [143.9, -6.3], POL: [20.0, 52.0], PRK: [127.5, 40.3],
  PRT: [-8.2, 39.4], PRY: [-58.4, -23.2], QAT: [51.2, 25.3], ROU: [25.0, 45.9],
  RUS: [105.3, 61.5], RWA: [29.9, -2.0], SAU: [44.5, 24.2], SDN: [30.2, 15.9],
  SEN: [-14.5, 14.5], SLE: [-11.8, 8.5], SLV: [-88.9, 13.8], SOM: [46.2, 6.1],
  SRB: [21.0, 44.0], SSD: [31.3, 7.0], STP: [6.6, 0.4], SUR: [-56.0, 4.0],
  SVK: [19.7, 48.7], SVN: [14.8, 46.2], SWE: [18.6, 60.1], SWZ: [31.5, -26.5],
  SYR: [38.0, 35.0], TCD: [18.7, 15.5], TGO: [1.0, 8.6], THA: [101.0, 15.9],
  TJK: [71.3, 38.9], TKM: [59.6, 40.5], TLS: [125.7, -8.9], TTO: [-61.2, 10.5],
  TUN: [9.5, 34.0], TUR: [35.2, 39.1], TZA: [34.9, -6.4], UGA: [32.3, 1.4],
  UKR: [31.2, 49.0], URY: [-55.8, -32.5], USA: [-100.4, 37.1], UZB: [63.9, 41.4],
  VEN: [-66.2, 6.4], VNM: [108.3, 14.1], YEM: [47.6, 15.9], ZAF: [25.1, -29.0],
  ZMB: [27.8, -13.5], ZWE: [30.0, -19.0],
};


export default function MortalityMap() {
  const [year, setYear] = useState(START_YEAR);
  const [playing, setPlaying] = useState(true);
  const [, setSmileySeen] = useState<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Track which countries just crossed the threshold this year (flash)
  const [newlyClear, setNewlyClear] = useState<Set<string>>(new Set());

  const tick = useCallback((currentYear: number) => {
    const next = currentYear >= END_YEAR ? START_YEAR : currentYear + 1;
    setYear(next);

    // Find countries that just crossed threshold
    const justClear = new Set<string>();
    for (const iso of Object.keys(countries)) {
      const prev = getRate(iso, currentYear - 1);
      const curr = getRate(iso, currentYear);
      if (curr !== null && curr <= SMILEY_THRESHOLD && (prev === null || prev > SMILEY_THRESHOLD)) {
        justClear.add(iso);
      }
    }
    if (justClear.size > 0) {
      setNewlyClear(justClear);
      setSmileySeen((s) => { const n = new Set(s); justClear.forEach((v) => n.add(v)); return n; });
      setTimeout(() => setNewlyClear(new Set()), 800);
    }

    return next;
  }, []);

  useEffect(() => {
    if (!playing) return;
    let current = year;
    timerRef.current = setInterval(() => {
      current = tick(current);
    }, FRAME_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, tick]); // eslint-disable-line

  // Count countries that have achieved threshold
  const achieved = Object.keys(countries).filter((iso) => {
    const r = getRate(iso, year);
    return r !== null && r <= SMILEY_THRESHOLD;
  }).length;

  const happySmileyCountries = Object.entries(CENTROIDS).filter(([iso]) => {
    const r = getRate(iso, year);
    return r !== null && r <= SMILEY_THRESHOLD;
  });

  return (
    <div className="w-full">
      {/* Year counter */}
      <div className="flex items-end justify-between mb-3 px-2">
        <div>
          <span
            className="font-playfair text-6xl font-bold tabular-nums"
            style={{ color: "#0d2b52", lineHeight: 1 }}
          >
            {year}
          </span>
          <p className="font-plex text-sm text-muted mt-1">
            <span className="font-semibold text-forest">{achieved}</span> countries with child mortality below {SMILEY_THRESHOLD}%
          </p>
        </div>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-plex font-medium text-navy hover:bg-surface transition-colors"
        >
          {playing ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6zm8 0h4v16h-4z"/></svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          )}
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      {/* Map */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-[#f0f7ff]">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 120, center: [10, 20] }}
          width={800}
          height={420}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const iso = (geo as unknown as { id: string }).id;
                const rate = getRate(iso, year);
                const color = mortalityColor(rate);
                const isNew = newlyClear.has(iso);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={color}
                    stroke="#ffffff"
                    strokeWidth={0.3}
                    style={{
                      default: {
                        outline: "none",
                        transition: isNew ? "fill 0.1s" : "fill 0.25s",
                        filter: isNew ? "brightness(1.4)" : "none",
                      },
                      hover: { outline: "none", filter: "brightness(1.15)" },
                      pressed: { outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Smiley markers for threshold-reached countries */}
          {happySmileyCountries.map(([iso, coords]) => (
            <Marker key={iso} coordinates={coords}>
              <text
                textAnchor="middle"
                dominantBaseline="central"
                style={{ fontSize: 7, userSelect: "none", pointerEvents: "none" }}
              >
                😊
              </text>
            </Marker>
          ))}
        </ComposableMap>

        {/* Year progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100">
          <div
            className="h-full bg-cobalt transition-all duration-300"
            style={{ width: `${((year - START_YEAR) / (END_YEAR - START_YEAR)) * 100}%` }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 mt-4 px-1">
        <span className="font-plex text-xs text-muted font-medium">Child mortality rate:</span>
        {[
          { color: "#1c0a08", label: "> 40%" },
          { color: "#c0392b", label: "20–40%" },
          { color: "#d97706", label: "10–20%" },
          { color: "#ca8a04", label: "5–10%" },
          { color: "#16a34a", label: `≤ ${SMILEY_THRESHOLD}% 😊` },
          { color: "#d1d5db", label: "No data" },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1.5 font-plex text-xs text-muted">
            <span className="w-3 h-3 rounded-sm inline-block flex-shrink-0" style={{ background: color }} />
            {label}
          </span>
        ))}
        <span className="font-plex text-xs text-muted ml-auto">
          Source: Gapminder; UN IGME via Our World in Data
        </span>
      </div>
    </div>
  );
}
