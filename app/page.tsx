import Link from "next/link";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";
import ChartOfTheDay from "@/components/ChartOfTheDay";
import NewsletterStrip from "@/components/NewsletterStrip";
import SectionStrip from "@/components/SectionStrip";
import { getChartOfDay, getFeaturedStories, getLatestStories } from "@/lib/stories";

const MortalityMap = dynamic(() => import("@/components/MortalityMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 lg:h-80 rounded-2xl bg-surface border border-gray-100 flex items-center justify-center">
      <p className="font-plex text-sm text-muted animate-pulse">Loading world data…</p>
    </div>
  ),
});

export default function HomePage() {
  const chartOfDay = getChartOfDay();
  const featuredStories = getFeaturedStories().slice(0, 3);
  const latestStories = getLatestStories(6);

  return (
    <>
      <Navbar />

      {/* Hero — white background, animated infographic */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">

          {/* Text header */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <p className="font-plex text-xs font-semibold uppercase tracking-widest text-cobalt mb-3">
                Data Storytelling from India
              </p>
              <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-navy leading-tight mb-4">
                India&apos;s home for data stories. Numbers made visual. Facts made beautiful.
              </h1>
              <p className="font-plex text-base text-muted leading-relaxed">
                SankhyaIQ turns datasets into stories worth sharing — charts, maps and visual essays built from public data that anyone can understand.
              </p>
            </div>
            <Link
              href="#stories"
              className="self-start lg:self-auto inline-flex items-center gap-2 bg-cobalt text-white font-plex font-semibold px-6 py-3 rounded-full hover:bg-navy transition-colors text-sm shrink-0"
            >
              Explore stories
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
          </div>

          {/* Animated world map infographic */}
          <div className="mb-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-6 bg-cobalt rounded-full" />
              <h2 className="font-plex text-sm font-semibold text-navy uppercase tracking-widest">
                Live chart — Child mortality across the world, 1950–2023
              </h2>
            </div>
            <MortalityMap />
          </div>

          <p className="font-plex text-xs text-muted text-right">
            This is the kind of story SankhyaIQ tells. Data from{" "}
            <a
              href="https://ourworldindata.org/child-mortality"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-navy"
            >
              Our World in Data
            </a>
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14" id="stories">
        {/* Chart of the Day */}
        {chartOfDay && (
          <section className="mb-14">
            <ChartOfTheDay story={chartOfDay} />
          </section>
        )}

        {/* Featured stories */}
        <section className="mb-14">
          <h2 className="font-playfair text-2xl font-bold text-navy mb-6">Featured stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredStories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>

        {/* Section strip */}
        <SectionStrip />

        {/* Latest stories */}
        <section className="mb-14">
          <h2 className="font-playfair text-2xl font-bold text-navy mb-6">Latest stories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestStories.map((story) => (
              <StoryCard key={story.slug} story={story} />
            ))}
          </div>
        </section>
      </main>

      <NewsletterStrip />
      <Footer />
    </>
  );
}
