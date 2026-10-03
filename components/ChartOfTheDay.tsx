import Link from "next/link";
import { getSectionBySlug } from "@/lib/sections";
import { storyHref, type Story } from "@/lib/stories";
import ColumnChart from "@/components/charts/ColumnChart";

// The chart shown on the home page for the current Chart of the Day story.
// Add an entry here when a new story is marked chartOfDay in lib/stories.ts.
const CHARTS: Record<string, { caption: string; source: string; node: React.ReactNode }> = {
  "every-big-cat-in-india-mapped": {
    caption: "India's wild tigers, all India estimate",
    source: "NTCA and Wildlife Institute of India, All India Tiger Estimation",
    node: (
      <ColumnChart
        color="#2e7d32"
        data={[
          { label: "2006", value: 1411, showValue: true },
          { label: "2010", value: 1706, showValue: true },
          { label: "2014", value: 2226, showValue: true },
          { label: "2018", value: 2967, showValue: true },
          { label: "2022", value: 3682, showValue: true },
        ]}
      />
    ),
  },
};

export default function ChartOfTheDay({ story }: { story: Story }) {
  const section = getSectionBySlug(story.section);
  const chart = CHARTS[story.slug];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
      <div className="flex flex-col lg:flex-row">
        <div className="lg:w-1/2 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-gray-100">
          <span className="inline-block bg-cobalt text-white text-xs font-plex font-semibold px-3 py-1 rounded-full mb-4">Chart of the Day</span>
          {chart ? (
            <>
              <p className="font-plex text-sm font-semibold text-navy mb-2">{chart.caption}</p>
              {chart.node}
              <p className="font-plex text-xs text-muted mt-2">Source: {chart.source}</p>
            </>
          ) : (
            <p className="font-playfair text-4xl font-bold text-navy">{story.kicker}</p>
          )}
        </div>

        <div className="lg:w-1/2 p-8 flex flex-col justify-center gap-4">
          {section && (
            <span
              className="self-start text-xs font-plex font-medium px-3 py-1 rounded-full"
              style={{ background: `${section.accentColor}18`, color: section.accentColor }}
            >
              {section.label}
            </span>
          )}
          <h2 className="font-playfair text-2xl lg:text-3xl font-bold text-navy leading-snug">{story.title}</h2>
          <p className="font-plex text-base text-muted leading-relaxed">{story.excerpt}</p>
          <div className="flex items-center gap-4">
            <Link
              href={storyHref(story)}
              className="inline-flex items-center gap-2 bg-cobalt text-white font-plex font-medium text-sm px-5 py-2.5 rounded-full hover:bg-navy transition-colors"
            >
              Read the story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <span className="font-plex text-sm text-muted">{story.readTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
}
