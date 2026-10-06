import data from "@/data/birds.json";
import Figure from "@/components/charts/Figure";
import { AXIS_TEXT, INK, fmt } from "@/components/charts/theme";
import Kpis from "./Kpis";
import Tabs from "./Tabs";
import DataTable from "./DataTable";

const ACCENT = "#2e7d32";
const FONT = "var(--font-ibm-plex-sans)";
const TREND_COLOURS: Record<string, string> = { Declined: "#c56a1a", Stable: "#b8c4cc", Increased: "#2e7d32" };
const PRIORITY_COLOURS: Record<string, string> = { High: "#b3261e", Moderate: "#c56a1a", Low: "#2e7d32" };

interface Group {
  assessed: number;
  categories: { label: string; count: number }[];
}

const pct = (n: number, total: number) => `${fmt((n / total) * 100, 0)}%`;

// One stacked bar split into categories, with a labelled key row under it.
function Stacked({ group, colours, label }: { group: Group; colours: Record<string, string>; label: string }) {
  const W = 680;
  const x0 = 10;
  const w = W - 20;
  const barY = 14;
  const barH = 44;
  const H = 150;
  let acc = 0;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto chart-scale" role="img" aria-label={label}>
      {group.categories.map((c) => {
        const sw = (c.count / group.assessed) * w;
        const x = x0 + (acc / group.assessed) * w;
        acc += c.count;
        const mid = x + sw / 2;
        const dark = colours[c.label] !== "#b8c4cc";
        return (
          <g key={c.label}>
            <title>{`${c.label}: ${c.count} of ${group.assessed} species`}</title>
            <rect x={x} y={barY} width={sw} height={barH} fill={colours[c.label]} stroke="#fff" strokeWidth={2} />
            {sw > 40 && (
              <text x={mid} y={barY + barH / 2} textAnchor="middle" dominantBaseline="middle" fontSize={14} fontWeight={600} fill={dark ? "#fff" : INK} fontFamily={FONT}>
                {pct(c.count, group.assessed)}
              </text>
            )}
          </g>
        );
      })}
      {group.categories.map((c, i) => {
        const colW = w / group.categories.length;
        const x = x0 + i * colW;
        return (
          <g key={c.label}>
            <rect x={x} y={86} width={12} height={12} rx={2} fill={colours[c.label]} />
            <text x={x + 20} y={92} dominantBaseline="middle" fontSize={13} fill={AXIS_TEXT} fontFamily={FONT}>{c.label}</text>
            <text x={x} y={124} fontSize={22} fontWeight={700} fill={INK} fontFamily={FONT}>{fmt(c.count)}</text>
            <text x={x + 52} y={124} fontSize={12} fill={AXIS_TEXT} fontFamily={FONT}>species</text>
          </g>
        );
      })}
    </svg>
  );
}

export default function IndiaBirds() {
  const lt = data.longTerm;
  const cur = data.current;
  const pr = data.priority;
  const n = (g: Group, l: string) => g.categories.find((c) => c.label === l)!.count;
  const source = "State of India's Birds partnership, SoIB 2023 counts as reported by Factly and IAS Score";

  const tableRows = (g: Group) => g.categories.map((c) => [c.label, c.count, pct(c.count, g.assessed)]);

  const views = [
    {
      label: "Long term trend",
      content: (
        <>
          <Figure
            title="Six in ten assessed species have declined over the long term"
            subtitle={`${lt.assessed} species with enough data for a long term trend, covering more than 25 years.`}
            source={source}
            note="Long term trend could be assessed for only a part of the 942 species."
          >
            <Stacked group={lt} colours={TREND_COLOURS} label="Species by long term trend category" />
          </Figure>
          <DataTable columns={["Category", "Species", "Share"]} rows={tableRows(lt)} caption={`Out of ${lt.assessed} species assessed.`} />
        </>
      ),
    },
    {
      label: "Current trend",
      content: (
        <>
          <Figure
            title="Four in ten assessed species are declining now"
            subtitle={`${cur.assessed} species with enough data for a current annual trend, covering the period since 2015.`}
            source={source}
            note="The current trend covers a shorter period than the long term trend."
          >
            <Stacked group={cur} colours={TREND_COLOURS} label="Species by current annual trend category" />
          </Figure>
          <DataTable columns={["Category", "Species", "Share"]} rows={tableRows(cur)} caption={`Out of ${cur.assessed} species assessed.`} />
        </>
      ),
    },
    {
      label: "Conservation priority",
      content: (
        <>
          <Figure
            title="178 species are of high conservation priority"
            subtitle={`All ${pr.assessed} assessed species, placed in three priority classes for India.`}
            source={source}
            note="The report finds that many common and widespread species are of high conservation priority."
          >
            <Stacked group={pr} colours={PRIORITY_COLOURS} label="Species by conservation priority" />
          </Figure>
          <DataTable columns={["Priority", "Species", "Share"]} rows={tableRows(pr)} caption={`Out of ${pr.assessed} species assessed.`} />
        </>
      ),
    },
  ];

  return (
    <>
      <Kpis
        accent={ACCENT}
        items={[
          { value: fmt(data.speciesAssessed), label: "Species assessed in India", tone: "flat" },
          { value: pct(n(lt, "Declined"), lt.assessed), label: `Declined over the long term, ${n(lt, "Declined")} of ${lt.assessed}`, tone: "bad" },
          { value: pct(n(cur, "Declined"), cur.assessed), label: `Declining now, ${n(cur, "Declined")} of ${cur.assessed}`, tone: "bad" },
          { value: fmt(n(pr, "High")), label: "Species of high conservation priority", tone: "bad" },
        ]}
      />
      <Tabs accent={ACCENT} tabs={views} />
      <DataTable
        open
        summary="Reported declines by group"
        columns={["Group", "Decline"]}
        rows={data.groupDeclines.map((g) => [g.group, g.decline])}
        caption="Stated loosely in the source, so shown as text. Read from one secondary report."
      />
      <p className="font-plex text-xs text-muted mt-4 leading-relaxed">
        These are SoIB 2023 counts. {data.newerEditionNote}
      </p>
    </>
  );
}
