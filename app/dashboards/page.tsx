import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PageHero } from "@/components/SectionHero";
import NewsletterStrip from "@/components/NewsletterStrip";
import DashboardCard from "@/components/dashboards/DashboardCard";
import { dashboards } from "@/lib/dashboards";
import { sections } from "@/lib/sections";

export const metadata = {
  title: "Dashboards | SankhyaIQ",
  description: "Live trackers and rankings for India and the world. Headline numbers, one chart, the full table and the source.",
};

export default function DashboardsIndex() {
  return (
    <>
      <Navbar />
      <PageHero
        eyebrow="Dashboards"
        title="Trackers you can come back to"
        descriptor="Each dashboard has the headline numbers, one main chart, the full table and the source. Every page shows the date it was last checked."
        texture="money-and-economy"
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {sections.map((s) => {
          const list = dashboards.filter((d) => d.section === s.slug);
          if (!list.length) return null;
          return (
            <section key={s.slug} className="mb-16">
              <h2 className="font-playfair text-2xl font-bold text-navy mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 rounded-full" style={{ background: s.accentColor }} />
                {s.label}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((d) => (
                  <DashboardCard key={d.slug} d={d} />
                ))}
              </div>
            </section>
          );
        })}
      </main>
      <NewsletterStrip />
      <Footer />
    </>
  );
}
