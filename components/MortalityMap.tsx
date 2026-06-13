"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import mortData from "@/lib/mortality-data.json";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const START_YEAR = 1950;
const END_YEAR = 2024;
const SMILEY_THRESHOLD = 4;
const FRAME_MS = 340;
const END_PAUSE_MS = 4000;

const W = 800;
const H = 400;

const projection = geoMercator()
  .scale(118)
  .center([10, 20])
  .translate([W / 2, H / 2]);

const pathGen = geoPath(projection);

type MortData = {
  countries: Record<string, Record<string, number>>;
};

const { countries } = mortData as MortData;

function getRate(iso: string, year: number): number | null {
  const c = countries[iso];
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
  return "#16a34a";
}

// Approximate centroids [lon, lat] for smiley placement
const CENTROIDS: Record<string, [number, number]> = {
  AFG: [67.7, 33.9], AGO: [17.8, -11.2], ALB: [20.2, 41.2], ARE: [53.8, 23.4],
  ARG: [-63.6, -38.4], ARM: [45.0, 40.1], AUS: [133.8, -25.7], AUT: [14.6, 47.7],
  AZE: [47.6, 40.1], BDI: [29.9, -3.4], BEL: [4.5, 50.5], BEN: [2.3, 9.3],
  BFA: [-1.6, 12.4], BGD: [90.4, 23.7], BGR: [25.5, 42.7], BLR: [28.0, 53.7],
  BOL: [-64.7, -16.3], BRA: [-51.9, -14.2], BTN: [90.4, 27.5], BWA: [24.7, -22.3],
  CAF: [20.9, 6.6], CAN: [-96.8, 56.1], CHE: [8.2, 46.8], CHL: [-71.5, -35.7],
  CHN: [104.2, 35.9], CIV: [-5.6, 7.5], CMR: [12.4, 5.7], COD: [24.0, -2.9],
  COG: [15.8, -0.2], COL: [-74.3, 4.1], CRI: [-84.0, 9.7], CUB: [-79.5, 21.5],
  DEU: [10.5, 51.2], DJI: [42.6, 11.8], DNK: [10.0, 56.3], DOM: [-70.2, 18.7],
  DZA: [2.6, 28.2], ECU: [-78.1, -1.8], EGY: [30.8, 26.8], ERI: [39.8, 15.2],
  ESP: [-3.7, 40.5], ETH: [39.6, 9.1], FIN: [26.0, 64.0], FRA: [2.2, 46.2],
  GAB: [11.6, -0.8], GBR: [-3.4, 55.4], GEO: [43.4, 42.3], GHA: [-1.0, 7.9],
  GIN: [-11.8, 10.9], GMB: [-15.3, 13.4], GRC: [22.0, 39.1], GTM: [-90.2, 15.8],
  HND: [-86.2, 15.2], HRV: [16.0, 45.2], HTI: [-73.0, 18.9], HUN: [19.5, 47.2],
  IDN: [117.7, -0.8], IND: [78.9, 20.6], IRL: [-8.0, 53.4], IRN: [53.7, 32.4],
  IRQ: [43.7, 33.2], ISL: [-19.0, 65.0], ISR: [34.9, 31.5], ITA: [12.6, 42.8],
  JAM: [-77.3, 18.1], JOR: [36.2, 31.2], JPN: [138.3, 36.2], KAZ: [66.9, 48.0],
  KEN: [37.9, 0.0], KGZ: [74.8, 41.5], KHM: [104.9, 12.6], LAO: [103.9, 18.2],
  LBN: [35.9, 33.9], LBR: [-9.4, 6.4], LBY: [17.2, 26.3], LKA: [80.7, 7.9],
  MAR: [-6.8, 32.0], MDG: [46.9, -18.8], MEX: [-102.6, 23.6], MLI: [-2.0, 17.6],
  MMR: [96.7, 19.2], MNG: [103.8, 46.9], MOZ: [35.5, -18.7], MRT: [-11.8, 17.6],
  MWI: [34.3, -13.2], MYS: [109.7, 4.2], NAM: [18.5, -22.0], NER: [8.1, 16.1],
  NGA: [8.7, 9.1], NIC: [-85.2, 12.9], NLD: [5.3, 52.1], NOR: [8.5, 60.5],
  NPL: [84.1, 28.4], NZL: [172.0, -41.5], OMN: [57.0, 21.0], PAK: [69.3, 30.4],
  PAN: [-80.8, 8.5], PER: [-76.0, -9.2], PHL: [122.9, 12.9], POL: [20.0, 52.0],
  PRK: [127.5, 40.3], PRT: [-8.2, 39.4], PRY: [-58.4, -23.2], ROU: [25.0, 45.9],
  RUS: [105.3, 61.5], RWA: [29.9, -2.0], SAU: [44.5, 24.2], SDN: [30.2, 15.9],
  SEN: [-14.5, 14.5], SLE: [-11.8, 8.5], SLV: [-88.9, 13.8], SOM: [46.2, 6.1],
  SSD: [31.3, 7.0], SWE: [18.6, 60.1], SYR: [38.0, 35.0], TCD: [18.7, 15.5],
  TGO: [1.0, 8.6], THA: [101.0, 15.9], TJK: [71.3, 38.9], TKM: [59.6, 40.5],
  TUN: [9.5, 34.0], TUR: [35.2, 39.1], TZA: [34.9, -6.4], UGA: [32.3, 1.4],
  UKR: [31.2, 49.0], URY: [-55.8, -32.5], USA: [-100.4, 37.1], UZB: [63.9, 41.4],
  VEN: [-66.2, 6.4], VNM: [108.3, 14.1], YEM: [47.6, 15.9], ZAF: [25.1, -29.0],
  ZMB: [27.8, -13.5], ZWE: [30.0, -19.0],
};

type CountryFeature = {
  id: string;
  d: string;
};

export default function MortalityMap() {
  const [year, setYear] = useState(START_YEAR);
  const [playing, setPlaying] = useState(true);
  const [geoFeatures, setGeoFeatures] = useState<CountryFeature[]>([]);
  const [newlyClear, setNewlyClear] = useState<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const yearRef = useRef(START_YEAR);

  // Load and project world atlas once
  useEffect(() => {
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((topo) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { features } = feature(topo, (topo as any).objects.countries) as { features: any[] };
        const projected = features
          .map((f) => {
            const d = pathGen(f);
            const iso = String(f.id).padStart(3, "0");
            // world-atlas uses numeric codes — build a lookup
            return d ? { id: iso, numId: f.id, d } : null;
          })
          .filter(Boolean) as CountryFeature[];
        setGeoFeatures(projected);
      });
  }, []);

  const tick = useCallback(() => {
    const atEnd = yearRef.current >= END_YEAR;

    if (atEnd) {
      // Pause for END_PAUSE_MS then restart
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      setTimeout(() => {
        yearRef.current = START_YEAR;
        setYear(START_YEAR);
        timerRef.current = setInterval(tick, FRAME_MS);
      }, END_PAUSE_MS);
      return;
    }

    yearRef.current = yearRef.current + 1;
    const y = yearRef.current;
    setYear(y);

    const justClear = new Set<string>();
    for (const iso3 of Object.keys(countries)) {
      const prev = getRate(iso3, y - 1);
      const curr = getRate(iso3, y);
      if (curr !== null && curr <= SMILEY_THRESHOLD && (prev === null || prev > SMILEY_THRESHOLD)) {
        justClear.add(iso3);
      }
    }
    if (justClear.size > 0) {
      setNewlyClear(justClear);
      setTimeout(() => setNewlyClear(new Set()), 700);
    }
  }, []);

  useEffect(() => {
    if (!playing) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(tick, FRAME_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [playing, tick]);

  // Map numeric world-atlas IDs to ISO3 via a known lookup
  // world-atlas uses ISO numeric codes; we store ISO3 in mortality data
  // Build a numeric→ISO3 map from our centroid keys (approximate)
  // For coloring we match by name via a static numeric→alpha3 map
  const numericToIso3 = useNumericToIso3();

  const achieved = Object.keys(countries).filter((iso) => {
    const r = getRate(iso, year);
    return r !== null && r <= SMILEY_THRESHOLD;
  }).length;

  return (
    <div className="w-full">
      {/* Controls row */}
      <div className="flex items-end justify-between mb-3 px-1">
        <div>
          <span className="font-playfair text-6xl font-bold text-navy tabular-nums" style={{ lineHeight: 1 }}>
            {year}
          </span>
          <p className="font-plex text-sm text-muted mt-1">
            <span className="font-semibold text-forest">{achieved}</span> countries with child mortality ≤ {SMILEY_THRESHOLD}%
          </p>
        </div>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-plex font-medium text-navy hover:bg-surface transition-colors"
        >
          {playing ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6zm8 0h4v16h-4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      {/* Map */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-[#e8f4fd]">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          {/* Ocean background */}
          <rect width={W} height={H} fill="#e8f4fd" />

          {/* Country paths */}
          {geoFeatures.map(({ id: numId, d }) => {
            const iso3 = numericToIso3[numId] ?? null;
            const rate = iso3 ? getRate(iso3, year) : null;
            const fill = mortalityColor(rate);
            const flash = iso3 ? newlyClear.has(iso3) : false;
            return (
              <path
                key={numId}
                d={d}
                fill={fill}
                stroke="#ffffff"
                strokeWidth={0.3}
                style={{
                  transition: "fill 0.25s ease",
                  filter: flash ? "brightness(1.5) saturate(1.5)" : "none",
                }}
              />
            );
          })}

          {/* Smiley markers */}
          {Object.entries(CENTROIDS).map(([iso3, [lon, lat]]) => {
            const rate = getRate(iso3, year);
            if (rate === null || rate > SMILEY_THRESHOLD) return null;
            const pt = projection([lon, lat]);
            if (!pt) return null;
            return (
              <text
                key={iso3}
                x={pt[0]}
                y={pt[1]}
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={7}
                style={{ userSelect: "none", pointerEvents: "none" }}
              >
                😊
              </text>
            );
          })}
        </svg>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/30">
          <div
            className="h-full bg-cobalt transition-all"
            style={{ width: `${((year - START_YEAR) / (END_YEAR - START_YEAR)) * 100}%`, transitionDuration: `${FRAME_MS}ms` }}
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
        <span className="font-plex text-xs text-muted/70 ml-auto">
          Source: Gapminder; UN IGME via Our World in Data
        </span>
      </div>
    </div>
  );
}

// ISO numeric (world-atlas) → ISO alpha-3 lookup
function useNumericToIso3(): Record<string, string> {
  return NUM_TO_ALPHA3;
}

// Condensed ISO 3166 numeric→alpha3 map (countries present in world-atlas 110m)
const NUM_TO_ALPHA3: Record<string, string> = {
  "004": "AFG", "008": "ALB", "012": "DZA", "024": "AGO", "032": "ARG",
  "036": "AUS", "040": "AUT", "031": "AZE", "050": "BGD", "056": "BEL",
  "064": "BTN", "068": "BOL", "070": "BIH", "072": "BWA", "076": "BRA",
  "100": "BGR", "854": "BFA", "108": "BDI", "116": "KHM", "120": "CMR",
  "124": "CAN", "140": "CAF", "148": "TCD", "152": "CHL", "156": "CHN",
  "170": "COL", "178": "COG", "180": "COD", "188": "CRI", "191": "HRV",
  "192": "CUB", "203": "CZE", "208": "DNK", "262": "DJI", "214": "DOM",
  "218": "ECU", "818": "EGY", "222": "SLV", "232": "ERI", "231": "ETH",
  "246": "FIN", "250": "FRA", "266": "GAB", "276": "DEU", "288": "GHA",
  "300": "GRC", "320": "GTM", "324": "GIN", "624": "GNB", "332": "HTI",
  "340": "HND", "348": "HUN", "356": "IND", "360": "IDN", "364": "IRN",
  "368": "IRQ", "372": "IRL", "376": "ISR", "380": "ITA", "388": "JAM",
  "392": "JPN", "400": "JOR", "398": "KAZ", "404": "KEN", "408": "PRK",
  "410": "KOR", "417": "KGZ", "418": "LAO", "422": "LBN", "430": "LBR",
  "434": "LBY", "426": "LSO", "440": "LTU", "442": "LUX", "450": "MDG",
  "454": "MWI", "458": "MYS", "466": "MLI", "484": "MEX", "496": "MNG",
  "504": "MAR", "508": "MOZ", "516": "NAM", "524": "NPL", "528": "NLD",
  "554": "NZL", "558": "NIC", "562": "NER", "566": "NGA", "578": "NOR",
  "512": "OMN", "586": "PAK", "591": "PAN", "598": "PNG", "600": "PRY",
  "604": "PER", "608": "PHL", "616": "POL", "620": "PRT", "642": "ROU",
  "643": "RUS", "646": "RWA", "682": "SAU", "686": "SEN", "694": "SLE",
  "706": "SOM", "710": "ZAF", "728": "SSD", "724": "ESP", "144": "LKA",
  "729": "SDN", "752": "SWE", "756": "CHE", "760": "SYR", "762": "TJK",
  "764": "THA", "768": "TGO", "788": "TUN", "792": "TUR", "795": "TKM",
  "800": "UGA", "804": "UKR", "784": "ARE", "826": "GBR", "840": "USA",
  "858": "URY", "860": "UZB", "862": "VEN", "704": "VNM", "887": "YEM",
  "894": "ZMB", "716": "ZWE", "660": "SRB",
  "807": "MKD", "051": "ARM", "112": "BLR", "703": "SVK", "705": "SVN",
  "428": "LVA", "233": "EST", "352": "ISL", "470": "MLT", "196": "CYP",
  "090": "SLB", "242": "FJI", "626": "TLS", "780": "TTO",
};
