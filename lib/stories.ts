export type Source = {
  name: string;
  url: string;
  description?: string;
};

export type Story = {
  slug: string;
  section: string;
  title: string;
  excerpt: string;
  readTime: number;
  publishedAt: string;
  sources: Source[];
  // Short label shown on the card instead of an image, e.g. the headline number.
  kicker: string;
  featured?: boolean;
  chartOfDay?: boolean;
  // Stories that live outside the MDX pipeline (an interactive page) link straight to it.
  href?: string;
};

const LAUNCH = "2026-10-03";

export const stories: Story[] = [
  // World & India
  {
    slug: "indias-share-of-the-world-economy",
    section: "world-and-india",
    title: "India's share of the world economy, 1850 to 2022",
    excerpt: "In 1850 India produced a seventh of the world's output. By 1950 its share had fallen to one twenty fourth. The climb back is still under way.",
    readTime: 5,
    publishedAt: LAUNCH,
    kicker: "14.4% to 4.2% to 8.1%",
    featured: true,
    sources: [
      { name: "Maddison Project Database 2023, University of Groningen", url: "https://www.rug.nl/ggdc/historicaldevelopment/maddison/", description: "Historical GDP in 2011 international dollars" },
      { name: "Our World in Data, CO2 and GHG dataset (GDP series)", url: "https://github.com/owid/co2-data", description: "Machine-readable copy of the Maddison series used for the chart" },
    ],
  },
  {
    slug: "india-co2-per-person",
    section: "world-and-india",
    title: "India's carbon footprint, person by person",
    excerpt: "India is the world's third largest emitter. Per person, it emits less than half the world average and about a sixth of an American.",
    readTime: 4,
    publishedAt: LAUNCH,
    kicker: "2.2 tonnes per person",
    sources: [
      { name: "Global Carbon Budget 2025, via Our World in Data", url: "https://github.com/owid/co2-data", description: "Fossil CO2 emissions per person and cumulative emissions" },
    ],
  },
  {
    slug: "india-china-population-crossover",
    section: "world-and-india",
    title: "The year India passed China and what comes next",
    excerpt: "China was the world's most populous country for as long as anyone has counted. The lines have now crossed. By 2100 India could have more than twice China's people.",
    readTime: 4,
    publishedAt: LAUNCH,
    kicker: "1,451 m vs 1,419 m",
    sources: [
      { name: "UN World Population Prospects 2024", url: "https://population.un.org/wpp/", description: "Estimates to 2023 and medium variant projections to 2100" },
      { name: "wpp2024 data package, UN Population Division", url: "https://github.com/PPgp/wpp2024", description: "Machine-readable WPP 2024 files used for the projections" },
    ],
  },

  // People & Society
  {
    slug: "india-population-pyramid-2024",
    section: "people-and-society",
    title: "India's population pyramid, 2024 and 2050",
    excerpt: "Today India's widest bands are people in their late teens and early twenties. By 2050 the pyramid turns into a column and the over 65s double their share.",
    readTime: 5,
    publishedAt: LAUNCH,
    kicker: "7% over 65 today, 15% by 2050",
    featured: true,
    sources: [
      { name: "UN World Population Prospects 2024", url: "https://population.un.org/wpp/", description: "Population by single year of age, estimates and medium variant" },
      { name: "wpp2024 data package, UN Population Division", url: "https://github.com/PPgp/wpp2024" },
    ],
  },
  {
    slug: "how-india-spends-its-day",
    section: "people-and-society",
    title: "How India spends its day",
    excerpt: "Nine in ten working age women do unpaid housework every day, for about five hours. Three in ten men do, for under an hour and a half.",
    readTime: 4,
    publishedAt: LAUNCH,
    kicker: "305 vs 86 minutes",
    sources: [
      { name: "Time Use Survey 2024, MoSPI press note (28 March 2025)", url: "https://www.mospi.gov.in/sites/default/files/press_release/Press_Note_28.03.2025-1.pdf", description: "Participation and minutes per day, ages 15 to 59" },
      { name: "PIB release on Time Use Survey 2024", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2106113", description: "Comparison with the 2019 survey" },
    ],
  },

  // Maps & Geography
  {
    slug: "real-size-of-countries",
    section: "maps-and-geography",
    title: "The real size of countries",
    excerpt: "Greenland and Congo cover almost the same area. On the map in your school atlas, Greenland looks 15 times bigger. Here is why.",
    readTime: 4,
    publishedAt: LAUNCH,
    kicker: "Greenland, inflated 16x",
    featured: true,
    sources: [
      { name: "Natural Earth country boundaries (via world-atlas)", url: "https://www.naturalearthdata.com/", description: "Country shapes used to compute true and Mercator areas" },
      { name: "d3-geo projection library", url: "https://d3js.org/d3-geo", description: "Area calculations and projections" },
    ],
  },
  {
    slug: "india-coastline-true-length",
    section: "maps-and-geography",
    title: "Why India's coastline is longer than you think",
    excerpt: "The official number was 7,516 km for fifty years. A fresh measurement at a finer scale puts it at 11,099 km. No new land was added.",
    readTime: 4,
    publishedAt: LAUNCH,
    kicker: "7,516.6 km to 11,098.8 km",
    sources: [
      { name: "Survey of India, Length of Coastline of India", url: "https://surveyofindia.gov.in/UserFiles/files/Length%20of%20Coastline%20of%20India.pdf", description: "Re-verified coastline by state and UT" },
      { name: "Ministry of Ports, Shipping and Waterways circular, 29 April 2025 (as reported)", url: "https://www.manoramayearbook.in/current-affairs/india/2025/12/05/india-revised-coastline-length.html" },
    ],
  },

  // Animals & Nature
  {
    slug: "every-big-cat-in-india-mapped",
    section: "animals-and-nature",
    title: "India's big cats, counted",
    excerpt: "Tigers have more than doubled since 2006. Gir's lions have crossed 890. Leopards number nearly 14,000. The latest official count for every big cat in India.",
    readTime: 6,
    publishedAt: LAUNCH,
    kicker: "3,682 tigers · 891 lions",
    featured: true,
    chartOfDay: true,
    sources: [
      { name: "Status of Tigers 2022, NTCA and Wildlife Institute of India (PIB)", url: "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=1943922", description: "National and state tiger estimates" },
      { name: "Status of Leopards in India 2022, NTCA and WII", url: "https://v1.wii.gov.in/images//images/documents/images_2024/leopard_status_2022a.pdf" },
      { name: "Status of Snow Leopards in India (SPAI), PIB", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2000545" },
      { name: "16th Asiatic Lion Population Estimation 2025, Global Ecology and Conservation", url: "https://www.sciencedirect.com/science/article/pii/S2351989425006109" },
    ],
  },
  {
    slug: "indias-river-dolphins-counted",
    section: "animals-and-nature",
    title: "India's river dolphins, counted for the first time",
    excerpt: "The first national survey found 6,327 river dolphins across 28 rivers. Three in four live in Uttar Pradesh and Bihar.",
    readTime: 3,
    publishedAt: LAUNCH,
    kicker: "6,327 dolphins",
    sources: [
      { name: "Riverine Dolphin Estimation, MoEFCC and WII (as reported by Down To Earth)", url: "https://www.downtoearth.org.in/wildlife-biodiversity/india-has-an-estimated-6327-river-dolphins-across-eight-states-centre" },
      { name: "DD News report on the estimation", url: "https://ddnews.gov.in/en/indias-river-dolphin-population-stands-at-6327-survey-finds/" },
    ],
  },
  {
    slug: "how-long-animals-sleep",
    section: "animals-and-nature",
    title: "How long animals sleep",
    excerpt: "A little brown bat sleeps about 20 hours a day. A giraffe manages under two. Data on 83 mammals shows big bodies sleep less.",
    readTime: 4,
    publishedAt: LAUNCH,
    kicker: "19.9 hours vs 1.9 hours",
    sources: [
      { name: "Savage and West (2007), A quantitative, theoretical framework for understanding mammalian sleep, PNAS", url: "https://www.pnas.org/doi/10.1073/pnas.0610080104" },
      { name: "msleep dataset (ggplot2), derived from Savage and West", url: "https://github.com/tidyverse/ggplot2/blob/main/data-raw/msleep.csv" },
    ],
  },

  // Auto & EV
  {
    slug: "indias-ev-takeover-state-by-state",
    section: "auto-and-ev",
    title: "India's EV shift, state by state",
    excerpt: "India registered nearly 20 lakh electric vehicles in FY2025. Seven states bought nearly two thirds of them.",
    readTime: 5,
    publishedAt: LAUNCH,
    kicker: "19.65 lakh EVs in FY2025",
    featured: true,
    sources: [
      { name: "Vahan dashboard, MoRTH (FY2025 state data as compiled by Autocar Professional)", url: "https://www.autocarpro.in/analysis-sales/exclusive-up-maharashtra-karnataka-and-tamil-nadu-drive-double-digit-ev-sales-growth-in-fy2025-125759" },
      { name: "JMK Research, Annual India EV Report Card FY2026", url: "https://jmkresearch.com/annual-india-ev-report-card-fy2026/" },
    ],
  },

  // Money & Economy
  {
    slug: "india-gdp-per-capita-journey",
    section: "money-and-economy",
    title: "India's income per person, 1850 to 2022",
    excerpt: "Average income in 1947 was about what it had been in 1850. Since then it has grown nearly eight times, most of it after 1991.",
    readTime: 5,
    publishedAt: LAUNCH,
    kicker: "$948 to $7,350",
    sources: [
      { name: "Maddison Project Database 2023, University of Groningen", url: "https://www.rug.nl/ggdc/historicaldevelopment/maddison/", description: "GDP per person in 2011 international dollars" },
      { name: "Our World in Data, CO2 and GHG dataset (GDP and population series)", url: "https://github.com/owid/co2-data" },
    ],
  },
  {
    slug: "rupee-vs-dollar-since-1947",
    section: "money-and-economy",
    title: "The rupee against the dollar, 1947 to 2025",
    excerpt: "A dollar cost Rs 3.31 at independence and Rs 87 in 2025. Most of the fall came in three moments: 1966, 1991 and the long slide after 2008.",
    readTime: 5,
    publishedAt: LAUNCH,
    kicker: "Rs 3.31 to Rs 87.15",
    sources: [
      { name: "US Federal Reserve H.10 annual rates, via datasets/exchange-rates", url: "https://github.com/datasets/exchange-rates", description: "Annual average rupees per US dollar, 1973 to 2025" },
      { name: "Exchange rate history of the Indian rupee (pre-1973 official parities)", url: "https://en.wikipedia.org/wiki/Exchange_rate_history_of_the_Indian_rupee" },
    ],
  },
  {
    slug: "upi-decade-in-numbers",
    section: "money-and-economy",
    title: "UPI's first decade in numbers",
    excerpt: "Two crore payments in its first year. 24,162 crore in FY2026. UPI now handles about half the world's real-time payments.",
    readTime: 3,
    publishedAt: LAUNCH,
    kicker: "24,162 crore payments",
    sources: [
      { name: "PIB, UPI completes 10 years (Ministry of Finance)", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2257087" },
      { name: "PIB, UPI transactions FY2017-18 to FY2022-23", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=1987764" },
      { name: "PIB, Digital payments FY2017-18 to FY2023-24", url: "https://www.pib.gov.in/PressReleaseIframePage.aspx?PRID=2057013" },
    ],
  },

  // AI & Technology
  {
    slug: "ai-compute-vs-moores-law",
    section: "ai-and-technology",
    title: "AI compute growth vs Moore's Law",
    excerpt: "The biggest AI training run has grown about 18 billion fold since 2010. Moore's Law would have delivered 256 fold over the same years.",
    readTime: 5,
    publishedAt: LAUNCH,
    kicker: "4 to 5x a year",
    sources: [
      { name: "Epoch AI, Data on Notable AI Models", url: "https://epoch.ai/data/ai-models", description: "Training compute estimates (CC BY 4.0), accessed 3 October 2026" },
      { name: "Epoch AI, Training compute of frontier AI models grows by 4 to 5x per year", url: "https://epoch.ai/publications/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year" },
    ],
  },
  {
    slug: "india-mobile-data-price-collapse",
    section: "ai-and-technology",
    title: "The 97% fall in the price of mobile data",
    excerpt: "One GB cost Rs 269 in 2014. By 2024 it cost Rs 8.31. Internet users went from 25 crore to 97 crore over the same decade.",
    readTime: 3,
    publishedAt: LAUNCH,
    kicker: "Rs 269 to Rs 8.31 per GB",
    sources: [
      { name: "Statement by the Minister of State for Communications, as reported by All India Radio (5 December 2024)", url: "https://newsonair.gov.in/cost-of-data-drastically-reduced-from-%E2%82%B9269-gb-in-march-2014-to-%E2%82%B98-31-gb-in-june-2024-govt/" },
      { name: "TRAI, Indian Telecom Services Performance Indicators", url: "https://www.trai.gov.in/release-publication/reports/performance-indicators-reports" },
    ],
  },

  // Science & Space
  {
    slug: "exoplanets-discovered-by-year",
    section: "science-and-space",
    title: "6,375 worlds beyond our Sun",
    excerpt: "The first planet around another star was confirmed in 1992. Two space telescopes turned a trickle into a flood. Here is every discovery, year by year.",
    readTime: 4,
    publishedAt: LAUNCH,
    kicker: "6,375 confirmed planets",
    featured: true,
    sources: [
      { name: "NASA Exoplanet Archive, Planetary Systems Composite table", url: "https://exoplanetarchive.ipac.caltech.edu/", description: "Confirmed planets by discovery year and method, queried 3 October 2026" },
    ],
  },
  {
    slug: "history-of-the-universe",
    section: "science-and-space",
    title: "The history of the universe, for young readers",
    excerpt: "From the Big Bang to today, told stop by stop for children aged up to 8. An interactive timeline with illustrations.",
    readTime: 6,
    publishedAt: LAUNCH,
    kicker: "13.8 billion years",
    href: "/universe",
    sources: [],
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

export function storyHref(s: Story): string {
  return s.href ?? `/${s.section}/${s.slug}`;
}

// MDX-backed stories only (excludes linked interactive pages).
export function getArticleStories(): Story[] {
  return stories.filter((s) => !s.href);
}

export function getLatestStories(count = 6): Story[] {
  // All launch stories share a date, so keep a mix across sections rather than list order.
  const bySection = new Map<string, Story[]>();
  for (const s of stories) {
    if (!bySection.has(s.section)) bySection.set(s.section, []);
    bySection.get(s.section)!.push(s);
  }
  const out: Story[] = [];
  let round = 0;
  while (out.length < count) {
    let added = false;
    for (const list of Array.from(bySection.values())) {
      if (list[round] && !list[round].featured && out.length < count) {
        out.push(list[round]);
        added = true;
      }
    }
    if (!added && round > 4) break;
    round++;
  }
  return out;
}
