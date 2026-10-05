import type { Source } from "./stories";

export type Dashboard = {
  slug: string;
  section: string;
  title: string;
  excerpt: string;
  // Headline number shown on the card.
  kicker: string;
  // ISO date the figures were last checked against the sources.
  updated: string;
  cadence: string;
  sources: Source[];
};

// Only dashboards that are built appear here. Add a component in components/dashboards
// and register it in components/dashboards/index.ts.
export const dashboards: Dashboard[] = [
  {
    slug: "world-rankings",
    section: "world-and-india",
    title: "India's rank among nations, on twelve measures",
    excerpt: "First in population, third in economy size and emissions, 109th in income per person. One page, twelve ranks, ten years apart.",
    kicker: "1st in people, 109th in income",
    updated: "2026-10-05",
    cadence: "Yearly",
    sources: [
      { name: "Our World in Data, CO2 and greenhouse gas emissions dataset", url: "https://github.com/owid/co2-data", description: "Population, GDP (PPP), CO2 and emissions per person" },
      { name: "Our World in Data, Energy dataset", url: "https://github.com/owid/energy-data", description: "Primary energy, electricity, solar, wind, coal and oil" },
    ],
  },
];

export const getDashboard = (slug: string) => dashboards.find((d) => d.slug === slug);
export const getDashboardsBySection = (section: string) => dashboards.filter((d) => d.section === section);

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
