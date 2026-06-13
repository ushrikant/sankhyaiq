import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";
import ChartOfTheDay from "@/components/ChartOfTheDay";
import NewsletterStrip from "@/components/NewsletterStrip";
import SectionStrip from "@/components/SectionStrip";
import { getChartOfDay, getFeaturedStories, getLatestStories } from "@/lib/stories";

export default function HomePage() {
  const chartOfDay = getChartOfDay();
  const featuredStories = getFeaturedStories().slice(0, 3);
  const latestStories = getLatestStories(6);

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-navy overflow-hidden">
        {/* Background texture: data scatter dots */}
        <svg
          className="absolute inset-0 w-full h-full opacity-5"
          viewBox="0 0 1200 500"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <circle
              key={i}
              cx={Math.sin(i * 1.3) * 600 + 600}
              cy={Math.cos(i * 0.9) * 250 + 250}
              r={i % 7 === 0 ? 4 : i % 3 === 0 ? 2 : 1}
              fill="white"
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={`l${i}`}
              x1={150 * i}
              y1="0"
              x2={150 * i + 200}
              y2="500"
              stroke="white"
              strokeWidth="0.4"
            />
          ))}
        </svg>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <p className="font-plex text-sm font-semibold uppercase tracking-widest text-sky mb-4">
            Data Storytelling from India
          </p>
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl mb-6">
            India&apos;s home for data stories. Numbers made visual. Facts made beautiful.
          </h1>
          <p className="font-plex text-lg text-white/75 max-w-xl mb-10 leading-relaxed">
            SankhyaIQ turns datasets into stories worth sharing. We take public data from government portals, research institutions and open sources, then turn them into charts, maps and visual essays that anyone can understand.
          </p>
          <Link
            href="#stories"
            className="inline-flex items-center gap-2 bg-sky text-navy font-plex font-semibold px-7 py-3.5 rounded-full hover:bg-white transition-colors text-sm"
          >
            Explore stories
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
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
