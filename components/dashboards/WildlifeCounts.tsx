import data from "@/data/wildlife-counts.json";
import Figure from "@/components/charts/Figure";
import BarChart from "@/components/charts/BarChart";
import ColumnChart from "@/components/charts/ColumnChart";
import { fmt } from "@/components/charts/theme";
import Kpis from "./Kpis";
import Tabs from "./Tabs";
import DataTable from "./DataTable";

const ACCENT = "#2e7d32";
const sp = (name: string) => data.species.find((s) => s.name === name)!;

export default function WildlifeCounts() {
  const tiger = sp("Tiger");
  const lion = sp("Asiatic lion");
  const leopard = sp("Leopard");
  const el = data.elephants;

  const sorted = [...data.species].sort((a, b) => b.count - a.count);

  const views = [
    {
      label: "All species",
      content: (
        <Figure
          title="Counts of ten species and populations"
          subtitle="Sorted from the largest count to the smallest. Each bar uses its own survey year."
          source="NTCA, WII, Gujarat Forest Department and other official releases"
          note="Survey years differ by species. Some counts cover one state only, such as lions in Gujarat and rhinos in Assam."
        >
          <BarChart
            color={ACCENT}
            labelWidth={170}
            data={sorted.map((s) => ({
              label: s.name,
              value: s.count,
              note: `${s.year === "Not stated" ? "survey year not stated" : `survey year ${s.year}`}${s.note ? `. ${s.note}` : ""}`,
            }))}
          />
        </Figure>
      ),
    },
    {
      label: "Elephants by state",
      content: (
        <Figure
          title="Where India's elephants are"
          subtitle={`Top five states in the count released in ${el.released}.`}
          source="Elephant count released October 2025"
          note={`The national count is ${fmt(el.total)}. The estimated range is ${fmt(el.low)} to ${fmt(el.high)}. The 2017 count was ${fmt(el.earlier.count)}.`}
        >
          <BarChart color={ACCENT} data={el.states.map((s) => ({ label: s.state, value: s.count }))} />
        </Figure>
      ),
    },
    {
      label: "Wild ass comeback",
      content: (
        <Figure
          title="Indian wild ass, 1976 to 2024"
          subtitle="Counts in the survey years shown. The gaps between surveys are uneven."
          source="Survey counts of the Indian wild ass"
          note="Only seven survey years are available, so the columns do not show every year in between."
        >
          <ColumnChart
            color={ACCENT}
            data={data.wildAss.map((w) => ({ label: String(w.year), value: w.count, showValue: true }))}
          />
        </Figure>
      ),
    },
  ];

  return (
    <>
      <Kpis
        accent={ACCENT}
        items={[
          { value: fmt(tiger.count), label: `Tigers, ${tiger.year} census`, delta: tiger.body, tone: "flat" },
          { value: fmt(el.total), label: `Asian elephants, ${el.released}`, delta: `Range ${fmt(el.low)} to ${fmt(el.high)}`, tone: "flat" },
          { value: fmt(lion.count), label: `Asiatic lions in Gujarat, ${lion.year}`, delta: lion.body, tone: "flat" },
          { value: fmt(leopard.count), label: `Leopards, ${leopard.year}`, delta: leopard.body, tone: "flat" },
        ]}
      />
      <Tabs tabs={views} accent={ACCENT} />
      <p className="font-plex text-sm text-muted leading-relaxed mt-6">
        These counts come from different surveys in different years. The methods differ too. Some use camera traps. Some use direct counts. Some use dung counts. So the numbers are not strictly comparable. Elephants and a few other species are reported with a range or an error margin. Read each figure as an estimate for its own survey.
      </p>
      <DataTable
        columns={["Species", "Count", "Survey year", "Counted by"]}
        rows={sorted.map((s) => [s.name, s.count, s.year, s.body])}
        caption="Where the survey year or the body is shown as not stated, it was not part of the figures used here."
      />
    </>
  );
}
