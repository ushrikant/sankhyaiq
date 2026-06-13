export type Story = {
  slug: string;
  section: string;
  title: string;
  excerpt: string;
  readTime: number;
  publishedAt: string;
  image: string;
  featured?: boolean;
  chartOfDay?: boolean;
};

export const stories: Story[] = [
  {
    slug: "every-big-cat-in-india-mapped",
    section: "animals-and-nature",
    title: "Every big cat in India, mapped",
    excerpt: "From Gir's last lions to the leopard corridors of the Western Ghats, a complete census of India's wild cats.",
    readTime: 6,
    publishedAt: "2024-11-20",
    image: "/images/animals-and-nature/big-cats-india.jpg",
    featured: true,
    chartOfDay: true,
  },
  {
    slug: "indias-ev-takeover-state-by-state",
    section: "auto-and-ev",
    title: "India's EV takeover, state by state",
    excerpt: "Which states are leading the electric revolution and which are still decades behind, told through registration data.",
    readTime: 7,
    publishedAt: "2024-11-18",
    image: "/images/auto-and-ev/ev-state-map.jpg",
    featured: true,
  },
  {
    slug: "real-size-of-countries",
    section: "maps-and-geography",
    title: "The real size of countries",
    excerpt: "Mercator has been lying to us since 1569. Here is what the world actually looks like when you correct for projection.",
    readTime: 5,
    publishedAt: "2024-11-15",
    image: "/images/maps-and-geography/real-size.jpg",
    featured: true,
  },
  {
    slug: "how-long-animals-sleep",
    section: "animals-and-nature",
    title: "How long animals sleep",
    excerpt: "A brown bat sleeps 20 hours a day. An elephant barely manages 2. The science and data behind animal sleep.",
    readTime: 4,
    publishedAt: "2024-11-12",
    image: "/images/animals-and-nature/animal-sleep.jpg",
  },
  {
    slug: "ai-compute-vs-moores-law",
    section: "ai-and-technology",
    title: "AI compute growth vs Moore's Law",
    excerpt: "AI compute has been doubling every 3 to 4 months since 2012. Moore's Law looks modest in comparison.",
    readTime: 8,
    publishedAt: "2024-11-10",
    image: "/images/ai-and-technology/ai-compute.jpg",
  },
  {
    slug: "india-gdp-per-capita-journey",
    section: "money-and-economy",
    title: "India's GDP per capita journey since 1947",
    excerpt: "From Rs 250 per year at independence to crossing $2,000 — the long, uneven arc of Indian economic growth.",
    readTime: 9,
    publishedAt: "2024-11-08",
    image: "/images/money-and-economy/gdp-journey.jpg",
  },
  {
    slug: "isro-vs-nasa-budget",
    section: "science-and-space",
    title: "ISRO vs NASA — the budget that went to the Moon",
    excerpt: "Chandrayaan-3 cost less than many Hollywood blockbusters. A comparison of what space agencies spend and what they achieve.",
    readTime: 6,
    publishedAt: "2024-11-05",
    image: "/images/science-and-space/isro-nasa.jpg",
  },
  {
    slug: "india-population-pyramid-2024",
    section: "people-and-society",
    title: "India's population pyramid in 2024",
    excerpt: "We just overtook China. But the more interesting story is in the shape of the pyramid — and what it tells us about 2050.",
    readTime: 7,
    publishedAt: "2024-11-03",
    image: "/images/people-and-society/population-pyramid.jpg",
  },
  {
    slug: "india-coastline-true-length",
    section: "world-and-india",
    title: "Why India's coastline is longer than you think",
    excerpt: "Official records say 7,516 km. High-resolution measurements push it past 11,000 km. The paradox of coastline measurement.",
    readTime: 5,
    publishedAt: "2024-11-01",
    image: "/images/world-and-india/coastline.jpg",
  },
];

export function getFeaturedStories(): Story[] {
  return stories.filter((s) => s.featured);
}

export function getChartOfDay(): Story | undefined {
  return stories.find((s) => s.chartOfDay);
}

export function getStoriesBySection(sectionSlug: string): Story[] {
  return stories.filter((s) => s.section === sectionSlug);
}

export function getStoryBySlug(sectionSlug: string, storySlug: string): Story | undefined {
  return stories.find((s) => s.section === sectionSlug && s.slug === storySlug);
}

export function getLatestStories(count = 6): Story[] {
  return [...stories]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, count);
}
