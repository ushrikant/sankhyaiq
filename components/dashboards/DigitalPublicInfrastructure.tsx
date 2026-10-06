import data from "@/data/dpi.json";
import Figure from "@/components/charts/Figure";
import ColumnChart from "@/components/charts/ColumnChart";
import Kpis from "./Kpis";
import Tabs from "./Tabs";
import DataTable from "./DataTable";
import { fmt } from "@/components/charts/theme";

type Series = (typeof data.series)[number];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const short = (m: string) => `${MONTHS[+m.slice(5) - 1]} ${m.slice(2, 4)}`;
const long = (m: string) => `${MONTHS[+m.slice(5) - 1]} ${m.slice(0, 4)}`;
const get = (id: string) => data.series.find((s) => s.id === id) as Series;
const pts = (s: Series) => s.points as [string, number][];
const pct = (a: number, b: number) => ((a - b) / b) * 100;
const signed = (n: number) => `${n >= 0 ? "+" : "-"}${fmt(Math.abs(n), 1)}%`;

// Latest month, with change on the same month a year earlier when the series reaches back that far. Otherwise change on the earlier month stated.
function kpi(s: Series, shortLabel: string, prefix = "") {
  const p = pts(s);
  const [m, v] = p[p.length - 1];
  const yearAgo = `${+m.slice(0, 4) - 1}${m.slice(4)}`;
  const base = p.find((x) => x[0] === yearAgo);
  const ref = base ?? p[0];
  const ch = pct(v, ref[1]);
  const delta = `${signed(ch)} on ${long(ref[0])}${base ? "" : ", no year earlier figure"}`;
  return {
    value: `${prefix}${fmt(v, s.digits)}`,
    label: `${shortLabel}, ${s.unit} in ${long(m)}`,
    delta,
    tone: (ch >= 0 ? "good" : "bad") as "good" | "bad",
  };
}

export default function DigitalPublicInfrastructure() {
  const sets: [string, string, string][] = [
    ["upi-volume", "UPI transactions", "NPCI figures via news reports and Dataful"],
    ["upi-value", "UPI value", "NPCI figures via news reports and Dataful"],
    ["fastag-volume", "FASTag transactions", "NETC data via Dataful and Business Standard"],
    ["fastag-value", "FASTag value", "NETC data via Dataful and Business Standard"],
  ];
  return (
    <>
      <Kpis
        accent="#1565c0"
        items={[
          kpi(get("upi-volume"), "UPI transactions"),
          kpi(get("upi-value"), "UPI value", "₹"),
          kpi(get("fastag-volume"), "FASTag transactions"),
          kpi(get("fastag-value"), "FASTag value", "₹"),
        ]}
      />
      <Tabs
        tabs={sets.map(([id, title, source]) => {
          const s = get(id);
          const p = pts(s);
          const last = p[p.length - 1][0];
          return {
            label: title,
            content: (
              <>
                <Figure
                  title={`${title}, month by month`}
                  subtitle={`${s.label} in ${s.unit}, ${long(p[0][0])} to ${long(last)}.`}
                  source={source}
                  note={s.provenance}
                >
                  <ColumnChart
                    data={p.map(([m, v]) => ({ label: short(m), value: v, highlight: m === last }))}
                    digits={s.digits}
                    prefix={id.endsWith("value") ? "₹" : ""}
                  />
                </Figure>
                <DataTable
                  columns={["Month", s.unit]}
                  rows={p.map(([m, v]) => [long(m), fmt(v, s.digits)])}
                  caption={s.provenance}
                />
              </>
            ),
          };
        })}
      />
      <p className="font-plex text-xs text-muted mt-6 leading-relaxed">
        Left out for lack of monthly values: {data.dropped.join(". ")}.
      </p>
    </>
  );
}
