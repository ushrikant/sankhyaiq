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
  {
    slug: "jobs-pulse",
    section: "people-and-society",
    title: "Jobs pulse",
    excerpt: "India's unemployment rate was 5.0% in Aug 2026, down from 5.1% a year earlier. Participation rose to 55.6% and female participation to 34.8%.",
    kicker: "5.0% unemployment",
    updated: "2026-10-05",
    cadence: "Monthly",
    sources: [
      { name: "PIB: PLFS Monthly Bulletin April 2025", url: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/apr/doc202549537201.pdf", description: "Press note with the Apr 2025 monthly figures." },
      { name: "PIB: PLFS press note for Apr to Jun 2025", url: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2025/jul/doc2025715587001.pdf", description: "Monthly tables for persons aged 15 years and above, current weekly status." },
      { name: "PIB: PLFS Quarterly Bulletin Apr to Jun 2025 and Monthly Bulletin Jul 2025", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2157501", description: "Release covering Jul 2025 figures." },
      { name: "MoSPI: PLFS Monthly Bulletin press note, Jul 2026", url: "https://www.mospi.gov.in/uploads/latestReleases/latest_release_1786961114962_47b9343c-f726-4581-8440-c2f119a86ab6_Monthly_Press_note_July_2026.pdf", description: "Latest revised series for Jul 2025 to Jul 2026." },
      { name: "PIB: PLFS Monthly Bulletin press note, Jun 2026", url: "https://static.pib.gov.in/WriteReadData/specificdocs/documents/2026/jul/doc2026715921501.pdf", description: "Used to cross-check Jun 2025 and Jun 2026." },
      { name: "DD India: Aug 2026 PLFS figures", url: "https://ddindia.co.in/2026/09/indias-overall-labour-force-participation-rate-rises-to-55-6-in-august-plfs/", description: "Secondary report of the Aug 2026 release." },
      { name: "Upstox: Aug 2026 unemployment report", url: "https://upstox.com/news/business-news/economy/india-s-unemployment-rate-eases-to-5-in-august-on-stronger-rural-employment/article-200294/", description: "Secondary cross-check of the Aug 2026 figures." },
    ],
  },
  {
    slug: "monsoon-tracker",
    section: "maps-and-geography",
    title: "Monsoon tracker 2026",
    excerpt: "The 2026 monsoon ended at 87% of the long period average, 759.4 mm against 868.6 mm. 17 of 36 subdivisions were deficient.",
    kicker: "87% of average, 17 of 36 deficient",
    updated: "2026-10-05",
    cadence: "Daily in season, final in October",
    sources: [
      { name: "IMD subdivision cumulative departure, 1 June to 30 September 2026", url: "https://mausam.imd.gov.in/Rainfall/SUBDIVISION_RAINFALL_DEPARTURECUMULATIVE_COUNTRY_INDIA_c.pdf", description: "Departure from normal for all 36 subdivisions" },
      { name: "Business Standard, 2026 monsoon ends with nearly 13% deficit", url: "https://www.business-standard.com/industry/agriculture/2026-monsoon-ends-with-nearly-13-rain-deficit-worst-since-2015-imd-126093001389_1.html", description: "Season total, regional and monthly figures citing IMD" },
      { name: "ETV Bharat, Monsoon 2026 ends 13% below normal", url: "https://www.etvbharat.com/en/bharat/monsoon-2026-ends-13-percent-below-normal-fourth-lowest-since-2001-enn26093007819", description: "Regional rainfall and season ranking citing IMD" },
      { name: "IMD end of season report, 2025", url: "https://mausam.imd.gov.in/imd_latest/monsoon_report_2025_2.pdf", description: "Season rainfall history as a share of the average" },
      { name: "IndianAgri monsoon rainfall table", url: "https://indianagri.com/data/monsoon-rainfall", description: "Secondary table used for 2021 to 2024" },
    ],
  },
  {
    slug: "inflation-tracker",
    section: "money-and-economy",
    title: "India's retail inflation, month by month",
    excerpt: "Retail inflation was 4.82% in August 2026, above the RBI's 4% target. Headline, rural, urban and food rates, plus the groups behind the figure.",
    kicker: "4.82% in August, above the 4% target",
    updated: "2026-10-05",
    cadence: "Monthly",
    sources: [
      { name: "PIB, CPI press releases (base 2024=100)", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2298247&reg=48&lang=2", description: "Headline, rural, urban, food and group inflation, January to July 2026" },
      { name: "MoSPI, CPI press release for December 2025", url: "https://www.mospi.gov.in/uploads/latestReleases/latest_release_1768213461321_53cd35fd-1bbc-4b43-b92d-8fb67474ee74_Press_Release_of_CPI_for_December_2025.pdf", description: "Headline and food inflation on the old 2012=100 base, September 2024 to December 2025" },
      { name: "Business Standard, August 2026 retail inflation", url: "https://www.business-standard.com/economy/news/retail-inflation-rises-to-4-82-in-august-as-food-inflation-climbs-to-5-95-126091400495_1.html", description: "August 2026 figures and group inflation from a news report of the release" },
      { name: "Business Standard, weekly policy watch", url: "https://www.business-standard.com/amp/economy/news/weekly-policy-watch-rbi-mpc-gst-reforms-pmi-forex-reserves-october-2026-126100500213_1.html", description: "RBI repo rate of 5.25%" },
    ],
  },
  {
    slug: "telecom-pulse",
    section: "ai-and-technology",
    title: "Telecom pulse",
    excerpt: "India had 1,360.7 million telephone connections in August 2026. Monthly TRAI data on subscribers, wireless additions and the four largest operators.",
    kicker: "1,360.7 million connections",
    updated: "2026-10-05",
    cadence: "Monthly",
    sources: [
      { name: "TRAI Telecom Subscription Reports", url: "https://www.trai.gov.in/release-publication/reports/telecom-subscriptions-reports", description: "Monthly subscriber totals, wireless, wireline, broadband and tele-density" },
      { name: "TRAI press release, Aug 2026 (PR 125/2026)", url: "https://www.trai.gov.in/sites/default/files/2026-09/PR_No125of2026_0.pdf", description: "Latest month in the dashboard" },
      { name: "PIB highlights, Dec 2025", url: "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2225881&reg=3&lang=2", description: "Dec 2025 figures and the restated total that counts M2M connections" },
      { name: "TelecomTalk, Aug 2026 operator wireless subscribers", url: "https://telecomtalk.info/india-wireless-telecom-subscriber-base-130billion-august2026/1012285/", description: "News coverage of the TRAI release, used for operator figures" },
      { name: "Tele.net, TRAI subscription report for Aug 2026", url: "https://tele.net.in/national-news/trai-releases-telecom-subscription-report-for-august-2026-12589028", description: "News coverage used to cross-check operator figures and tele-density" },
    ],
  },
  {
    slug: "isro-launches",
    section: "science-and-space",
    title: "Every ISRO launch",
    excerpt: "One dot for each orbital launch attempt since 1979, by vehicle and year. 102 attempts: 85 successes, 5 partial and 12 failures.",
    kicker: "102 launches, 85 successes",
    updated: "2026-10-05",
    cadence: "After every launch",
    sources: [
      { name: "Wikipedia, List of PSLV launches", url: "https://en.wikipedia.org/wiki/List_of_PSLV_launches", description: "PSLV dates, missions and outcomes" },
      { name: "Wikipedia, List of GSLV launches", url: "https://en.wikipedia.org/wiki/List_of_GSLV_launches", description: "GSLV dates, missions and outcomes" },
      { name: "Wikipedia, List of LVM3 launches", url: "https://en.wikipedia.org/wiki/List_of_LVM3_launches", description: "LVM3 dates, missions and outcomes" },
      { name: "ISRO, LVM3 Launchers", url: "https://www.isro.gov.in/LVM3_Launchers.html", description: "Cross-check for LVM3 launches" },
      { name: "Wikipedia, SSLV", url: "https://en.wikipedia.org/wiki/SSLV", description: "SSLV launches" },
      { name: "Wikipedia, Satellite Launch Vehicle", url: "https://en.wikipedia.org/wiki/Satellite_Launch_Vehicle", description: "SLV launches" },
      { name: "Wikipedia, Augmented Satellite Launch Vehicle", url: "https://en.wikipedia.org/wiki/Augmented_Satellite_Launch_Vehicle", description: "ASLV launches" },
    ],
  },
  {
    slug: "wildlife-counts",
    section: "animals-and-nature",
    title: "India's wildlife counts",
    excerpt: "Tigers, elephants, lions, leopards, rhinos and more. Ten species counted in official surveys, with the year and the body behind each number.",
    kicker: "22,446 elephants, 3,682 tigers",
    updated: "2026-10-05",
    cadence: "When each census is released",
    sources: [
      { name: "National Tiger Conservation Authority", url: "https://ntca.gov.in", description: "Tiger census 2022 and leopard estimate with WII" },
      { name: "Wildlife Institute of India", url: "https://wii.gov.in", description: "Leopard estimate 2022 and Great Indian Bustard count 2026" },
      { name: "Press Information Bureau", url: "https://pib.gov.in", description: "Official releases on species counts" },
    ],
  },
  {
    slug: "ev-tracker",
    section: "auto-and-ev",
    title: "Monthly EV tracker",
    excerpt: "Electric vehicles registered each month in India, by vehicle type. 2026 against 2025, from the Vahan portal.",
    kicker: "23.6 lakh EVs registered in 2025",
    updated: "2026-10-05",
    cadence: "Monthly",
    sources: [
      { name: "Vahan dashboard, Ministry of Road Transport and Highways", url: "https://vahan.parivahan.gov.in/vahan4dashboard/", description: "Registrations by fuel type (ELECTRIC(BOV) and PURE EV) and vehicle category" },
    ],
  },
];

export const getDashboard = (slug: string) => dashboards.find((d) => d.slug === slug);
export const getDashboardsBySection = (section: string) => dashboards.filter((d) => d.section === section);

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
