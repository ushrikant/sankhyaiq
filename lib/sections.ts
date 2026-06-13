export type Section = {
  slug: string;
  label: string;
  descriptor: string;
  color: string;
  bgClass: string;
  textClass: string;
  badgeClass: string;
  accentColor: string;
};

export const sections: Section[] = [
  {
    slug: "world-and-india",
    label: "World & India",
    descriptor: "How India fits in the world picture, and where the world is headed",
    color: "#1565c0",
    bgClass: "bg-cobalt",
    textClass: "text-cobalt",
    badgeClass: "bg-blue-100 text-blue-800",
    accentColor: "#1565c0",
  },
  {
    slug: "people-and-society",
    label: "People & Society",
    descriptor: "The numbers behind how we live, work and relate to each other",
    color: "#00695c",
    bgClass: "bg-teal-700",
    textClass: "text-teal-700",
    badgeClass: "bg-teal-100 text-teal-800",
    accentColor: "#00695c",
  },
  {
    slug: "maps-and-geography",
    label: "Maps & Geography",
    descriptor: "Borders, terrain and the stories that geography tells us",
    color: "#6d4c41",
    bgClass: "bg-amber-800",
    textClass: "text-amber-800",
    badgeClass: "bg-amber-100 text-amber-900",
    accentColor: "#6d4c41",
  },
  {
    slug: "animals-and-nature",
    label: "Animals & Nature",
    descriptor: "Data from the wild — population counts, migrations and the natural world",
    color: "#2e7d32",
    bgClass: "bg-forest",
    textClass: "text-forest",
    badgeClass: "bg-green-100 text-green-800",
    accentColor: "#2e7d32",
  },
  {
    slug: "auto-and-ev",
    label: "Auto & EV",
    descriptor: "India's electric transition, mapped through sales, infrastructure and policy",
    color: "#37474f",
    bgClass: "bg-slate-700",
    textClass: "text-slate-700",
    badgeClass: "bg-slate-200 text-slate-800",
    accentColor: "#37474f",
  },
  {
    slug: "money-and-economy",
    label: "Money & Economy",
    descriptor: "GDP, inflation, trade and the flow of money across India and the globe",
    color: "#0d2b52",
    bgClass: "bg-navy",
    textClass: "text-navy",
    badgeClass: "bg-blue-50 text-navy",
    accentColor: "#0d2b52",
  },
  {
    slug: "ai-and-technology",
    label: "AI & Technology",
    descriptor: "Compute curves, adoption charts and what the data says about our tech future",
    color: "#283593",
    bgClass: "bg-indigo-900",
    textClass: "text-indigo-900",
    badgeClass: "bg-indigo-100 text-indigo-900",
    accentColor: "#283593",
  },
  {
    slug: "science-and-space",
    label: "Science & Space",
    descriptor: "The universe in numbers, from exoplanets to protein folding",
    color: "#004d40",
    bgClass: "bg-teal-900",
    textClass: "text-teal-900",
    badgeClass: "bg-teal-50 text-teal-900",
    accentColor: "#004d40",
  },
];

export function getSectionBySlug(slug: string): Section | undefined {
  return sections.find((s) => s.slug === slug);
}
