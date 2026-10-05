import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      <header className="bg-surface border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-10">
          <p className="font-plex text-xs font-semibold uppercase tracking-widest text-muted mb-3">Dashboards</p>
          <h1 className="font-playfair text-3xl lg:text-[42px] font-bold text-navy leading-tight mb-3">Trackers you can come back to</h1>
          <p className="font-plex text-lg text-muted max-w-2xl leading-relaxed">
            Each dashboard has the headline numbers, one main chart, the full table and the source. Every page shows the date it was last checked.
          </p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {sections.map((s) => {
          const list = dashboards.filter((d) => d.section === s.slug);
          if (!list.length) return null;
          return (
            <section key={s.slug} className="mb-14">
              <h2 className="font-playfair text-2xl font-bold mb-5" style={{ color: s.accentColor }}>{s.label}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
