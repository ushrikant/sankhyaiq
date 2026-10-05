import data from "@/data/telecom.json";
import Figure from "@/components/charts/Figure";
import BarChart from "@/components/charts/BarChart";
import Kpis from "./Kpis";
import Tabs from "./Tabs";
import DataTable from "./DataTable";
import { AXIS_TEXT, GRID, INK, SERIES, fmt, niceMax, niceTicks } from "@/components/charts/theme";

type Row = (typeof data.months)[number];

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const short = (m: string) => `${MON[Number(m.slice(5)) - 1]} ${m.slice(2, 4)}`;
const long = (m: string) => `${MON[Number(m.slice(5)) - 1]} ${m.slice(0, 4)}`;
const BREAK = "2025-12";

interface Col {
  m: string;
  value: number;
}

// Monthly columns. Months before the break are drawn in one colour and months after in another.
function MonthlyColumns({ cols, digits, label, breakAt }: { cols: Col[]; digits: number; label: string; breakAt?: string }) {
  const W = 680;
  const H = 320;
  const PAD = { l: 56, r: 12, t: 30, b: 34 };
  const plotW = W - PAD.l - PAD.r;
  const plotH = H - PAD.t - PAD.b;
  const vmax = niceMax(Math.max(...cols.map((c) => c.value)));
  const ticks = niceTicks(0, vmax, 5);
  const slot = plotW / cols.length;
  const colW = Math.min(24, slot * 0.7);
  const ys = (v: number) => PAD.t + plotH - (v / vmax) * plotH;
  const bi = breakAt ? cols.findIndex((c) => c.m === breakAt) : -1;
  const font = "var(--font-ibm-plex-sans)";
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label={label}>
      {ticks.map((t) => (
        <g key={t}>
          <line x1={PAD.l} x2={W - PAD.r} y1={ys(t)} y2={ys(t)} stroke={GRID} strokeWidth={1} />
          <text x={PAD.l - 8} y={ys(t)} textAnchor="end" dominantBaseline="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily={font}>
            {fmt(t)}
          </text>
        </g>
      ))}
      {cols.map((c, i) => {
        const cx = PAD.l + slot * i + slot / 2;
        const h = Math.max(1.5, (c.value / vmax) * plotH);
        const y = PAD.t + plotH - h;
        const after = bi >= 0 && i >= bi;
        const last = i === cols.length - 1;
        const showLabel = (cols.length - 1 - i) % 2 === 0;
        const tip =
          `${long(c.m)}: ${fmt(c.value, digits)}` +
          (bi >= 0 ? (after ? ". Includes M2M connections." : ". Excludes M2M connections.") : "");
        return (
          <g key={c.m}>
            <title>{tip}</title>
            <rect x={cx - slot / 2} y={PAD.t} width={slot} height={plotH} fill="transparent" />
            <rect x={cx - colW / 2} y={y} width={colW} height={h} rx={3} fill={after ? SERIES[2] : SERIES[1]} />
            {last && (
              <text x={cx} y={y - 6} textAnchor="middle" fontSize={11.5} fontWeight={600} fill={INK} fontFamily={font}>
                {fmt(c.value, digits)}
              </text>
            )}
            {showLabel && (
              <text x={cx} y={H - 12} textAnchor="middle" fontSize={11.5} fill={AXIS_TEXT} fontFamily={font}>
                {short(c.m)}
              </text>
            )}
          </g>
        );
      })}
      <line x1={PAD.l} x2={W - PAD.r} y1={PAD.t + plotH} y2={PAD.t + plotH} stroke="#cfd8dc" strokeWidth={1} />
      {bi >= 0 && (
        <g>
          <line x1={PAD.l + slot * bi} x2={PAD.l + slot * bi} y1={PAD.t - 8} y2={PAD.t + plotH} stroke={INK} strokeWidth={1} strokeDasharray="4 3" />
          <text x={PAD.l + slot * bi - 6} y={PAD.t - 12} textAnchor="end" fontSize={11.5} fill={AXIS_TEXT} fontFamily={font}>
            Before: M2M not counted
          </text>
          <text x={PAD.l + slot * bi + 6} y={PAD.t - 12} textAnchor="start" fontSize={11.5} fill={AXIS_TEXT} fontFamily={font}>
            From Dec 2025: M2M counted
          </text>
        </g>
      )}
    </svg>
  );
}

export default function TelecomPulse() {
  const months = data.months as Row[];
  const latest = months[months.length - 1];
  const prev = months[months.length - 2];
  const prevLabel = long(prev.m);
  const up = (a: number, b: number, d = 2) => {
    const diff = a - b;
    return `${diff >= 0 ? "Up" : "Down"} ${fmt(Math.abs(diff), d)} from ${prevLabel}`;
  };
  const tone = (a: number, b: number) => (a > b ? ("good" as const) : a < b ? ("bad" as const) : ("flat" as const));

  const breakNote =
    "Series break: from Dec 2025 the total counts M2M connections. The jump from Nov 2025 to Dec 2025 comes from that change in definition. It is not growth.";
  const source = "TRAI monthly telecom subscription reports and press releases";

  const ops = data.operators.items.filter((o) => o.name !== "MTNL");
  const complete = months.every((m) => typeof m.wireless_net_add === "number");

  const tabs = [
    {
      label: "Subscribers",
      content: (
        <Figure
          title="Total telecom subscribers by month"
          subtitle="Wireless and wireline together, in millions. Orange columns count M2M connections."
          source={source}
          note={breakNote}
        >
          <MonthlyColumns cols={months.map((m) => ({ m: m.m, value: m.total }))} digits={2} label="Total subscribers by month" breakAt={BREAK} />
        </Figure>
      ),
    },
    ...(complete
      ? [
          {
            label: "Wireless net additions",
            content: (
              <Figure
                title="Wireless net additions by month"
                subtitle="Subscribers added in the month, in millions."
                source={source}
                note="Net additions are as reported by TRAI or worked out from monthly differences. The series break in the total (M2M counted from Dec 2025) does not drive these figures."
              >
                <MonthlyColumns cols={months.map((m) => ({ m: m.m, value: m.wireless_net_add }))} digits={2} label="Wireless net additions by month" />
              </Figure>
            ),
          },
        ]
      : []),
    {
      label: "Operators",
      content: (
        <Figure
          title={`Wireless subscribers by operator, ${long(data.operators.month)}`}
          subtitle="In millions. Four largest operators."
          source={`${source}. Operator figures are from news coverage of the TRAI release (TelecomTalk and Tele.net).`}
          note={`${breakNote} Operator broadband series are not shown because the extracted figures are unreliable.`}
        >
          <BarChart data={ops.map((o, i) => ({ label: o.name, value: o.subs, highlight: i === 0 }))} digits={2} color={SERIES[1]} />
        </Figure>
      ),
    },
  ];

  return (
    <>
      <Kpis
        accent="#1565c0"
        items={[
          { value: fmt(latest.total, 1), label: `Total subscribers in millions, ${long(latest.m)}`, delta: up(latest.total, prev.total), tone: tone(latest.total, prev.total) },
          { value: fmt(latest.wireless, 1), label: `Wireless subscribers in millions, ${long(latest.m)}`, delta: up(latest.wireless, prev.wireless), tone: tone(latest.wireless, prev.wireless) },
          { value: fmt(latest.broadband, 1), label: `Broadband subscribers in millions, ${long(latest.m)}`, delta: up(latest.broadband, prev.broadband), tone: tone(latest.broadband, prev.broadband) },
          { value: `${fmt(latest.teledensity, 2)}%`, label: `Tele-density, ${long(latest.m)}`, delta: `${latest.teledensity >= prev.teledensity ? "Up" : "Down"} ${fmt(Math.abs(latest.teledensity - prev.teledensity), 2)} points from ${prevLabel}`, tone: tone(latest.teledensity, prev.teledensity) },
        ]}
      />
      <Tabs tabs={tabs} accent="#1565c0" />
      <DataTable
        columns={["Month", "Total", "Wireless", "Wireline", "Broadband", "Tele-density %", "Wireless net add", "M2M counted"]}
        rows={[...months].reverse().map((m) => [
          long(m.m),
          fmt(m.total, 2),
          fmt(m.wireless, 2),
          fmt(m.wireline, 2),
          fmt(m.broadband, 2),
          fmt(m.teledensity, 2),
          fmt(m.wireless_net_add, 2),
          m.m >= BREAK ? "Yes" : "No",
        ])}
        caption="Figures in millions except tele-density. M2M connections are counted in the total from Dec 2025. The Dec 2025 broadband figure is as first released and does not compare with Jan 2026 onward. Wireline rose in Jun 2025 as reported by TRAI."
      />
    </>
  );
}
