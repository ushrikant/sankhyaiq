import data from "@/data/isro-launches.json";
import Figure from "@/components/charts/Figure";
import BarChart from "@/components/charts/BarChart";
import Kpis from "./Kpis";
import Tabs from "./Tabs";
import DataTable from "./DataTable";
import { AXIS_TEXT, GRID, INK, fmt, niceMax, niceTicks } from "@/components/charts/theme";

type Outcome = "success" | "partial" | "failure";
type Launch = { date: string; vehicle: string; mission: string; outcome: string; note: string };

const COLOUR: Record<Outcome, string> = { success: "#2e7d32", partial: "#c56a1a", failure: "#8e5a9e" };
const LABEL: Record<Outcome, string> = { success: "Success", partial: "Partial", failure: "Failure" };
const OUTCOMES: Outcome[] = ["success", "partial", "failure"];
const VEHICLES = ["SLV", "ASLV", "PSLV", "GSLV", "LVM3", "SSLV"] as const;
const FONT = "var(--font-ibm-plex-sans)";

const launches = (data.launches as Launch[])
  .map((l) => ({
    ...l,
    vehicle: l.vehicle === "GSLV Mk III/LVM3" ? "LVM3" : l.vehicle,
    outcome: l.outcome as Outcome,
    year: Number(l.date.slice(0, 4)),
    uncertain: l.note.startsWith("UNCERTAIN"),
  }))
  .sort((a, b) => a.date.localeCompare(b.date));

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const longDate = (iso: string) => `${Number(iso.slice(8))} ${MONTHS[Number(iso.slice(5, 7)) - 1]} ${iso.slice(0, 4)}`;
const tip = (l: (typeof launches)[number]) =>
  `${longDate(l.date)}: ${l.mission} (${l.vehicle}), ${LABEL[l.outcome].toLowerCase()}${l.uncertain ? ". Date uncertain by one day" : ""}`;

const count = (f: (l: (typeof launches)[number]) => boolean) => launches.filter(f).length;
const firstYear = launches[0].year;
const lastYear = launches[launches.length - 1].year;

function Legend({ y = 12 }: { y?: number }) {
  return (
    <g>
      {OUTCOMES.map((o, i) => (
        <g key={o} transform={`translate(${70 + i * 100},${y})`}>
          <circle r={5} fill={COLOUR[o]} />
          <text x={10} dominantBaseline="middle" fontSize={12} fill={INK} fontFamily={FONT}>{LABEL[o]}</text>
        </g>
      ))}
    </g>
  );
}

// One dot per launch. Rows are vehicles. Launches in the same year stack upward.
function LaunchStrip() {
  const W = 680;
  const labelW = 62;
  const plotX = labelW;
  const plotR = W - 14;
  const years = lastYear - firstYear + 1;
  const slot = (plotR - plotX) / years;
  const step = 8.5;
  const dot = 3.6;
  const x = (yr: number) => plotX + slot * (yr - firstYear) + slot / 2;

  const rows = VEHICLES.map((v) => {
    const ls = launches.filter((l) => l.vehicle === v);
    const perYear = new Map<number, number>();
    ls.forEach((l) => perYear.set(l.year, (perYear.get(l.year) ?? 0) + 1));
    const maxStack = Math.max(1, ...Array.from(perYear.values()));
    return { v, ls, h: maxStack * step + 16 };
  });
  const top = 34;
  let acc = top;
  const placed = rows.map((r) => {
    const y0 = acc;
    acc += r.h;
    return { ...r, y0 };
  });
  const axisY = acc + 4;
  const H = axisY + 26;
  const ticks: number[] = [];
  for (let y = Math.ceil(firstYear / 5) * 5; y <= lastYear; y += 5) ticks.push(y);
  if (!ticks.includes(firstYear) && firstYear < ticks[0] - 2) ticks.unshift(firstYear);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label="Every ISRO orbital launch by vehicle and year">
      <Legend />
      {ticks.map((t) => (
        <line key={t} x1={x(t)} x2={x(t)} y1={top} y2={axisY} stroke={GRID} strokeWidth={1} />
      ))}
      {placed.map((r) => {
        const base = r.y0 + r.h - 8;
        const seen = new Map<number, number>();
        return (
          <g key={r.v}>
            <line x1={plotX} x2={plotR} y1={r.y0 + r.h} y2={r.y0 + r.h} stroke={GRID} strokeWidth={1} />
            <text x={labelW - 8} y={base - dot} textAnchor="end" dominantBaseline="middle" fontSize={13} fill={INK} fontWeight={600} fontFamily={FONT}>{r.v}</text>
            {r.ls.map((l) => {
              const k = seen.get(l.year) ?? 0;
              seen.set(l.year, k + 1);
              return (
                <circle key={l.date + l.mission} cx={x(l.year)} cy={base - k * step} r={dot} fill={COLOUR[l.outcome]} stroke="#fff" strokeWidth={0.8}>
                  <title>{tip(l)}</title>
                </circle>
              );
            })}
          </g>
        );
      })}
      <line x1={plotX} x2={plotR} y1={axisY} y2={axisY} stroke="#cfd8dc" strokeWidth={1} />
      {ticks.map((t) => (
        <text key={t} x={x(t)} y={axisY + 16} textAnchor="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily={FONT}>{t}</text>
      ))}
    </svg>
  );
}

// Stacked columns, launches per year split by outcome.
function YearColumns() {
  const W = 680;
  const H = 340;
  const PAD = { l: 40, r: 12, t: 34, b: 34 };
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const yrs = Array.from({ length: lastYear - firstYear + 1 }, (_, i) => firstYear + i);
  const per = yrs.map((y) => {
    const o = { success: 0, partial: 0, failure: 0 } as Record<Outcome, number>;
    launches.filter((l) => l.year === y).forEach((l) => (o[l.outcome] += 1));
    return { y, o, total: o.success + o.partial + o.failure };
  });
  const vmax = niceMax(Math.max(...per.map((p) => p.total)));
  const ticks = niceTicks(0, vmax, 5);
  const slot = plotW / yrs.length;
  const colW = Math.max(3, slot * 0.72);
  const ys = (v: number) => PAD.t + plotH - (v / vmax) * plotH;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label="ISRO orbital launches per year">
      <Legend />
      {ticks.map((t) => (
        <g key={t}>
          <line x1={PAD.l} x2={W - PAD.r} y1={ys(t)} y2={ys(t)} stroke={GRID} strokeWidth={1} />
          <text x={PAD.l - 8} y={ys(t)} textAnchor="end" dominantBaseline="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily={FONT}>{fmt(t)}</text>
        </g>
      ))}
      {per.map((p, i) => {
        const cx = PAD.l + slot * i + slot / 2;
        let cum = 0;
        const text = `${p.y}: ${p.total} ${p.total === 1 ? "launch" : "launches"}. ${p.o.success} success, ${p.o.partial} partial, ${p.o.failure} failure.`;
        return (
          <g key={p.y}>
            <title>{text}</title>
            <rect x={cx - slot / 2} y={PAD.t} width={slot} height={plotH} fill="transparent" />
            {OUTCOMES.map((o) => {
              const v = p.o[o];
              if (!v) return null;
              const y = ys(cum + v);
              const h = ys(cum) - y;
              cum += v;
              return <rect key={o} x={cx - colW / 2} y={y} width={colW} height={h} fill={COLOUR[o]} stroke="#fff" strokeWidth={0.6} />;
            })}
            {(p.y % 5 === 0 || p.y === firstYear || p.y === lastYear) && (
              <text x={cx} y={H - 12} textAnchor="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily={FONT}>{p.y}</text>
            )}
          </g>
        );
      })}
      <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t + plotH} y2={PAD.t + plotH} stroke="#cfd8dc" strokeWidth={1} />
    </svg>
  );
}

export default function IsroLaunches() {
  const total = launches.length;
  const ok = count((l) => l.outcome === "success");
  const partial = count((l) => l.outcome === "partial");
  const fail = count((l) => l.outcome === "failure");
  const latest = launches[launches.length - 1];
  const pct = (n: number) => `${fmt((n / total) * 100, 0)}% of attempts`;

  const byVehicle = VEHICLES.map((v) => {
    const ls = launches.filter((l) => l.vehicle === v);
    const s = ls.filter((l) => l.outcome === "success").length;
    const p = ls.filter((l) => l.outcome === "partial").length;
    const f = ls.filter((l) => l.outcome === "failure").length;
    return { label: v, value: ls.length, note: `${s} success, ${p} partial, ${f} failure` };
  });

  const newestFirst = [...launches].reverse();
  const flagged = launches.filter((l) => l.uncertain);

  return (
    <>
      <Kpis
        accent="#1565c0"
        items={[
          { value: fmt(total), label: `Orbital launch attempts, ${firstYear} to ${lastYear}`, delta: "Counted from a list of every attempt", tone: "flat" },
          { value: fmt(ok), label: "Successes", delta: pct(ok), tone: "good" },
          { value: fmt(partial), label: "Partial successes", delta: pct(partial), tone: "flat" },
          { value: fmt(fail), label: "Failures", delta: pct(fail), tone: "bad" },
          { value: longDate(latest.date), label: `Latest launch: ${latest.mission}`, delta: LABEL[latest.outcome], tone: latest.outcome === "success" ? "good" : "bad" },
        ]}
      />
      <Figure
        title="Every ISRO launch, one dot each"
        subtitle={`${total} orbital launch attempts from ${firstYear} to ${lastYear}. Hover or tap a dot for the date and mission.`}
        source="Wikipedia launch lists for each vehicle, cross-checked with ISRO pages where available"
        note={`Counts are orbital launch attempts only. Secondary payloads are not listed. Dates are UTC and can differ from the Indian date by one day. ${flagged.map((l) => `The date of ${l.mission.split(" / ")[0]} is uncertain by one day.`).join(" ")}`}
      >
        <Tabs
          tabs={[
            { label: "By vehicle", content: <LaunchStrip /> },
            { label: "By year", content: <YearColumns /> },
            { label: "By outcome", content: <BarChart data={byVehicle} unit=" launches" /> },
          ]}
        />
      </Figure>
      <DataTable
        columns={["Date (UTC)", "Vehicle", "Mission", "Outcome"]}
        rows={newestFirst.map((l) => [
          longDate(l.date),
          l.vehicle,
          l.uncertain ? `${l.mission} (date uncertain by one day)` : l.mission,
          LABEL[l.outcome],
        ])}
        caption="Newest first. Orbital launch attempts only."
      />
    </>
  );
}
