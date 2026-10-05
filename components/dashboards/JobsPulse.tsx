import data from "@/data/jobs-pulse.json";
import Figure from "@/components/charts/Figure";
import Kpis from "./Kpis";
import DataTable from "./DataTable";
import Tabs from "./Tabs";
import { AXIS_TEXT, GRID, INK, SERIES, fmt, niceTicks } from "@/components/charts/theme";

type Month = (typeof data.months)[number];
type Key = Exclude<keyof Month, "m">;

const MONTHS = data.months as Month[];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const GREEN = SERIES[0];
const BLUE = SERIES[1];
const ORANGE = SERIES[2];
const PURPLE = SERIES[3];

// "2026-08" becomes "Aug 2026" (long) or "Aug 26" (short axis label).
const long = (m: string) => `${MON[Number(m.slice(5)) - 1]} ${m.slice(0, 4)}`;
const short = (m: string) => `${MON[Number(m.slice(5)) - 1]} ${m.slice(2, 4)}`;
const pct = (n: number) => `${fmt(n, 1)}%`;

interface Line {
  name: string;
  key: Key;
  color: string;
}

// Line chart over months. The last month is secondary data, so its segment is dashed and its marker is hollow.
function MonthLines({ lines, label }: { lines: Line[]; label: string }) {
  const W = 680;
  const H = 340;
  const PAD = { l: 54, r: 70, t: 16, b: 34 };
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const n = MONTHS.length;
  const vals = lines.flatMap((l) => MONTHS.map((m) => m[l.key]));
  const lo = Math.floor(Math.min(...vals) - 0.5);
  const hi = Math.ceil(Math.max(...vals) + 0.5);
  const ticks = niceTicks(lo, hi, 5);
  const bottom = Math.min(lo, ticks[0]);
  const top = Math.max(hi, ticks[ticks.length - 1]);
  const xs = (i: number) => PAD.l + (i / (n - 1)) * plotW;
  const ys = (v: number) => PAD.t + plotH - ((v - bottom) / (top - bottom)) * plotH;
  const step = ticks.length > 1 ? ticks[1] - ticks[0] : 1;

  // Spread end labels so they do not collide.
  const ends = lines
    .map((l) => ({ l, y: ys(MONTHS[n - 1][l.key]) }))
    .sort((a, b) => a.y - b.y);
  for (let k = 1; k < ends.length; k++) {
    if (ends[k].y - ends[k - 1].y < 15) ends[k].y = ends[k - 1].y + 15;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-x-5 gap-y-1 mb-3">
        {lines.map((l) => (
          <span key={l.key} className="inline-flex items-center gap-2 font-plex text-xs text-muted">
            <svg width="18" height="8" aria-hidden>
              <line x1="1" x2="17" y1="4" y2="4" stroke={l.color} strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            {l.name}
          </span>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label={label}>
        {ticks.map((t) => (
          <g key={`y${t}`}>
            <line x1={PAD.l} x2={W - PAD.r} y1={ys(t)} y2={ys(t)} stroke={GRID} strokeWidth={1} />
            <text x={PAD.l - 8} y={ys(t)} textAnchor="end" dominantBaseline="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">
              {fmt(t, step < 1 ? 1 : 0)}%
            </text>
          </g>
        ))}
        {MONTHS.map((m, i) =>
          i % 2 === 0 ? (
            <text key={m.m} x={xs(i)} y={H - 10} textAnchor="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily="var(--font-ibm-plex-sans)">
              {short(m.m)}
            </text>
          ) : null
        )}
        {lines.map((l) => {
          const solid = MONTHS.slice(0, n - 1).map((m, i) => `${i ? "L" : "M"}${xs(i).toFixed(1)},${ys(m[l.key]).toFixed(1)}`).join("");
          const tail = `M${xs(n - 2).toFixed(1)},${ys(MONTHS[n - 2][l.key]).toFixed(1)}L${xs(n - 1).toFixed(1)},${ys(MONTHS[n - 1][l.key]).toFixed(1)}`;
          return (
            <g key={l.key}>
              <path d={solid} fill="none" stroke={l.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
              <path d={tail} fill="none" stroke={l.color} strokeWidth={2} strokeLinecap="round" strokeDasharray="4 3" />
              {MONTHS.map((m, i) => (
                <circle key={m.m} cx={xs(i)} cy={ys(m[l.key])} r={6} fill="transparent">
                  <title>{`${l.name}, ${long(m.m)}: ${pct(m[l.key])}${i === n - 1 ? " (press reports)" : ""}`}</title>
                </circle>
              ))}
              <circle cx={xs(n - 1)} cy={ys(MONTHS[n - 1][l.key])} r={4.5} fill="#fff" stroke={l.color} strokeWidth={2} />
            </g>
          );
        })}
        {ends.map(({ l, y }) => (
          <text key={`e${l.key}`} x={xs(n - 1) + 10} y={y} dominantBaseline="middle" fontSize={12} fill={INK} fontFamily="var(--font-ibm-plex-sans)">
            {pct(MONTHS[n - 1][l.key])}
          </text>
        ))}
      </svg>
    </div>
  );
}

// Change in percentage points, with a tone. "up" is good for participation and bad for unemployment.
function change(now: number, then: number, versus: string, higherIsGood: boolean) {
  const d = Math.round((now - then) * 10) / 10;
  if (d === 0) return { delta: `Unchanged vs ${versus}`, tone: "flat" as const };
  const word = d > 0 ? "Up" : "Down";
  const good = d > 0 === higherIsGood;
  return { delta: `${word} ${fmt(Math.abs(d), 1)} pts vs ${versus}`, tone: (good ? "good" : "bad") as "good" | "bad" };
}

export default function JobsPulse() {
  const last = MONTHS[MONTHS.length - 1];
  const yearAgo = MONTHS[MONTHS.length - 13];
  const latest = long(last.m);
  const prior = long(yearAgo.m);
  const kpi = (key: Key, label: string, higherIsGood: boolean) => ({
    value: pct(last[key]),
    label: `${label}, ${latest}`,
    ...change(last[key], yearAgo[key], prior, higherIsGood),
  });

  const first = long(MONTHS[0].m);
  const subtitle = (what: string) => `${what}, persons aged 15 years and above, ${first} to ${latest}.`;
  const source = "PIB and MoSPI, Periodic Labour Force Survey monthly bulletins (current weekly status)";
  const note = `${latest} comes from press reports of the PIB and MoSPI release (secondary source). It is shown dashed with a hollow marker. The male and female unemployment rates for ${latest} appear in one report only. Earlier months may be revised in the ${latest} bulletin.`;

  const views = [
    {
      label: "Unemployment rate",
      content: (
        <Figure title="Rural unemployment swings more than urban" subtitle={subtitle("Unemployment rate, overall, rural and urban")} source={source} note={note}>
          <MonthLines
            label="Monthly unemployment rate, overall, rural and urban"
            lines={[
              { name: "Overall", key: "ur", color: BLUE },
              { name: "Rural", key: "ur_rural", color: GREEN },
              { name: "Urban", key: "ur_urban", color: ORANGE },
            ]}
          />
        </Figure>
      ),
    },
    {
      label: "Participation",
      content: (
        <Figure title="Participation dipped in mid 2026 and has recovered" subtitle={subtitle("Labour force participation rate, overall, rural, urban and female")} source={source} note={note}>
          <MonthLines
            label="Monthly labour force participation rate, overall, rural, urban and female"
            lines={[
              { name: "Overall", key: "lfpr", color: BLUE },
              { name: "Rural", key: "lfpr_rural", color: GREEN },
              { name: "Urban", key: "lfpr_urban", color: ORANGE },
              { name: "Female", key: "lfpr_female", color: PURPLE },
            ]}
          />
        </Figure>
      ),
    },
    {
      label: "Gender",
      content: (
        <Figure title="Female unemployment runs above male in most months" subtitle={subtitle("Unemployment rate, male and female")} source={source} note={note}>
          <MonthLines
            label="Monthly unemployment rate, male and female"
            lines={[
              { name: "Male", key: "ur_male", color: BLUE },
              { name: "Female", key: "ur_female", color: PURPLE },
            ]}
          />
        </Figure>
      ),
    },
  ];

  return (
    <>
      <Kpis
        accent="#1565c0"
        items={[
          kpi("ur", "Unemployment rate", false),
          kpi("lfpr", "Labour force participation rate", true),
          kpi("lfpr_female", "Female participation rate", true),
          kpi("wpr", "Worker population ratio", true),
        ]}
      />
      <Tabs tabs={views} />
      <DataTable
        summary="View all months as a table"
        columns={["Month", "Unemployment", "UR rural", "UR urban", "UR male", "UR female", "Participation", "LFPR rural", "LFPR urban", "LFPR female", "Worker ratio"]}
        rows={MONTHS.map((m, i) => [
          i === MONTHS.length - 1 ? `${long(m.m)} (press reports)` : long(m.m),
          pct(m.ur), pct(m.ur_rural), pct(m.ur_urban), pct(m.ur_male), pct(m.ur_female),
          pct(m.lfpr), pct(m.lfpr_rural), pct(m.lfpr_urban), pct(m.lfpr_female), pct(m.wpr),
        ])}
        caption="UR is unemployment rate. LFPR is labour force participation rate. All figures are percentages of persons aged 15 years and above."
        open
      />
    </>
  );
}
