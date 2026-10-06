import data from "@/data/repo-rate.json";
import inflation from "@/data/inflation.json";
import Figure from "@/components/charts/Figure";
import Kpis from "./Kpis";
import Tabs from "./Tabs";
import DataTable from "./DataTable";
import { ACCENT, AXIS_TEXT, GRID, INK, SERIES, fmt, niceTicks } from "@/components/charts/theme";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const day = (d: string) => `${+d.slice(8)} ${MONTHS[+d.slice(5, 7) - 1]} ${d.slice(0, 4)}`;
const mon = (d: string) => `${MONTHS[+d.slice(5, 7) - 1]} ${d.slice(2, 4)}`;
const t = (d: string) => new Date(`${d}T00:00:00Z`).getTime();
const bpsText = (b: number) => (b === 0 ? "Held" : b < 0 ? `Cut ${-b} bps` : `Hike ${b} bps`);
const FONT = "var(--font-ibm-plex-sans)";
const CUT = SERIES[0];
const HIKE = "#b3261e";

const changes = data.changes;
const meetings = data.meetings;
const cuts = changes.filter((c) => c.bps < 0).length;
const hikes = changes.filter((c) => c.bps > 0).length;
const last = changes[changes.length - 1];
const startDate = "2015-01-01";
const endDate = data.updated;

function StepLine() {
  const W = 680, H = 340;
  const L = 46, R = 18, T = 18, B = 34;
  const x0 = t(startDate), x1 = t(endDate);
  const X = (d: string) => L + ((t(d) - x0) / (x1 - x0)) * (W - L - R);
  const yMin = 4, yMax = 8;
  const Y = (v: number) => T + (1 - (v - yMin) / (yMax - yMin)) * (H - T - B);
  const pts: [number, number][] = [[X(startDate), Y(data.startRate.rate)]];
  let prev = data.startRate.rate;
  for (const c of changes) {
    pts.push([X(c.date), Y(prev)], [X(c.date), Y(c.rate)]);
    prev = c.rate;
  }
  pts.push([X(endDate), Y(prev)]);
  const path = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const yTicks = niceTicks(yMin, yMax, 4);
  const years = [2015, 2017, 2019, 2021, 2023, 2025];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label="RBI repo rate since January 2015, a step line with a marker at each change">
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={Y(v)} y2={Y(v)} stroke={GRID} />
          <text x={L - 8} y={Y(v)} textAnchor="end" dominantBaseline="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily={FONT}>{fmt(v, 1)}%</text>
        </g>
      ))}
      {years.map((y) => (
        <text key={y} x={X(`${y}-01-01`)} y={H - 10} textAnchor="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily={FONT}>{y}</text>
      ))}
      <path d={path} fill="none" stroke={ACCENT} strokeWidth={2.5} strokeLinejoin="round" />
      {changes.map((c) => (
        <g key={c.date}>
          <title>{`${day(c.date)}: ${bpsText(c.bps)} to ${fmt(c.rate, 2)}%`}</title>
          <circle cx={X(c.date)} cy={Y(c.rate)} r={4.5} fill={c.bps < 0 ? CUT : HIKE} stroke="#fff" strokeWidth={1.5} />
        </g>
      ))}
      <text x={X(endDate)} y={Y(last.rate) - 12} textAnchor="end" fontSize={12.5} fontWeight={600} fill={INK} fontFamily={FONT}>{fmt(last.rate, 2)}%</text>
      <circle cx={L + 8} cy={8} r={4.5} fill={CUT} />
      <text x={L + 18} y={8} dominantBaseline="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily={FONT}>Cut</text>
      <circle cx={L + 58} cy={8} r={4.5} fill={HIKE} />
      <text x={L + 68} y={8} dominantBaseline="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily={FONT}>Hike</text>
    </svg>
  );
}

function MeetingBars() {
  const W = 680, H = 300;
  const L = 52, R = 16, T = 26, B = 40;
  const n = meetings.length;
  const slot = (W - L - R) / n;
  const bw = Math.min(40, slot * 0.6);
  const yMin = -60, yMax = 20;
  const Y = (v: number) => T + (1 - (v - yMin) / (yMax - yMin)) * (H - T - B);
  const ticks = [-50, -25, 0];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label="Change in the repo rate at each MPC meeting in 2025 and 2026">
      {ticks.map((v) => (
        <g key={v}>
          <line x1={L} x2={W - R} y1={Y(v)} y2={Y(v)} stroke={v === 0 ? AXIS_TEXT : GRID} />
          <text x={L - 8} y={Y(v)} textAnchor="end" dominantBaseline="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily={FONT}>{v} bps</text>
        </g>
      ))}
      {meetings.map((m, i) => {
        const cx = L + slot * i + slot / 2;
        const top = Math.min(Y(0), Y(m.bps));
        const h = Math.abs(Y(m.bps) - Y(0));
        return (
          <g key={m.date}>
            <title>{`${day(m.date)}: ${bpsText(m.bps)}. Rate ${fmt(m.rate, 2)}%.`}</title>
            {m.bps === 0 ? (
              <line x1={cx - bw / 2} x2={cx + bw / 2} y1={Y(0)} y2={Y(0)} stroke={INK} strokeWidth={3} />
            ) : (
              <rect x={cx - bw / 2} y={top} width={bw} height={h} fill={CUT} rx={2} />
            )}
            <text x={cx} y={m.bps === 0 ? Y(0) - 8 : top + h + 14} textAnchor="middle" fontSize={11.5} fontWeight={600} fill={INK} fontFamily={FONT}>{m.bps === 0 ? "Held" : m.bps}</text>
            <text x={cx} y={H - 20} textAnchor="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily={FONT}>{mon(m.date)}</text>
            <text x={cx} y={H - 6} textAnchor="middle" fontSize={11} fill={AXIS_TEXT} fontFamily={FONT}>{fmt(m.rate, 2)}%</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function RepoRate() {
  const cpi = inflation.latest;
  const real = data.current.rate - cpi.headline;
  const sinceLast = meetings.filter((m) => m.date > last.date).length;
  const over = (
    <Figure
      title="Repo rate since 2015"
      subtitle={`Each marker is a change. The rate was ${fmt(data.startRate.rate, 2)}% before January 2015.`}
      source="BankBazaar, Finnovate, Bricksnwall, indiainflation.com, Global Rates. Dates cross checked across sites."
      note="The line runs to 6 October 2026. The 7 October decision is not part of it."
    >
      <StepLine />
    </Figure>
  );
  const meet = (
    <Figure
      title="Change at each meeting, 2025 and 2026"
      subtitle="Basis points. The rate after the meeting is shown under each month."
      source="indiainflation.com and Bricksnwall"
      note="Four cuts in 2025 took the rate from 6.50% to 5.25%. The last four meetings held it."
    >
      <MeetingBars />
    </Figure>
  );
  return (
    <>
      <Kpis
        accent={ACCENT}
        items={[
          { value: `${fmt(data.current.rate, 2)}%`, label: "Repo rate now", delta: `${data.current.stance} stance, August 2026`, tone: "flat" },
          { value: day(last.date), label: `Last change, a cut of ${-last.bps} bps`, delta: `Held at ${sinceLast} meetings since`, tone: "flat" },
          { value: `${cuts} cuts, ${hikes} hikes`, label: "Rate changes since January 2015", delta: `${changes.length} changes in all`, tone: "flat" },
          { value: `${fmt(cpi.headline, 2)}%`, label: `CPI inflation, ${cpi.month}`, delta: `Repo rate is ${fmt(real, 2)} points above it`, tone: "flat" },
        ]}
      />
      <p className="font-plex text-sm text-muted mb-6">
        The next decision is due on {day(data.nextDecision.date)}. As of {day(data.updated)} it has not been announced. Economists polled expect a hike, but that is a forecast.
      </p>
      <Tabs
        accent={ACCENT}
        tabs={[
          { label: "Repo rate over time", content: over },
          { label: "Meetings", content: meet },
        ]}
      />
      <DataTable
        columns={["Date", "Change", "New rate"]}
        rows={[...changes].reverse().map((c) => [day(c.date), bpsText(c.bps), `${fmt(c.rate, 2)}%`])}
        caption="Every change since January 2015. Meetings that held the rate are not listed."
      />
      <DataTable
        columns={["Meeting", "Decision", "Rate", "Stance"]}
        rows={[...meetings].reverse().map((m) => [day(m.date), bpsText(m.bps), `${fmt(m.rate, 2)}%`, m.stance ?? "Not verified"])}
        caption="Stance is shown only where a fetched page confirmed it."
        summary="View meetings as table"
      />
    </>
  );
}
