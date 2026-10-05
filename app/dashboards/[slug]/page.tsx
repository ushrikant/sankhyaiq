import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DataSources from "@/components/DataSources";
import ShareButtons from "@/components/ShareButtons";
import NewsletterStrip from "@/components/NewsletterStrip";
import { dashboardBodies } from "@/components/dashboards";
import { dashboards, formatDate, getDashboard } from "@/lib/dashboards";
import { getSectionBySlug } from "@/lib/sections";

interface Props {
  params: { slug: string };
}

export const dynamicParams = false;

export function generateStaticParams() {
  return dashboards.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: Props) {
  const d = getDashboard(params.slug);
  if (!d) return {};
  return {
    title: `${d.title} | SankhyaIQ`,
    description: d.excerpt,
    openGraph: { title: d.title, description: d.excerpt },
  };
}

export default function DashboardPage({ params }: Props) {
  const d = getDashboard(params.slug);
  const Body = dashboardBodies[params.slug];
  if (!d || !Body) notFound();
  const section = getSectionBySlug(d.section);
  const accent = section?.accentColor ?? "#1565c0";

  return (
    <>
      <Navbar />
      <header className="border-b border-gray-100" style={{ background: `${accent}0d` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 pb-8">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <Link href="/dashboards" className="text-xs font-plex font-semibold text-muted hover:text-navy">Dashboards</Link>
            {section && (
              <Link href={`/${section.slug}`} className="text-xs font-plex font-semibold px-3 py-1 rounded-full" style={{ background: `${accent}18`, color: accent }}>
                {section.label}
              </Link>
            )}
            <span className="font-plex text-xs text-muted">Updated {d.cadence.toLowerCase()}</span>
          </div>
          <h1 className="font-playfair text-3xl lg:text-[40px] font-bold text-navy leading-tight mb-3">{d.title}</h1>
          <p className="font-plex text-lg text-muted leading-relaxed max-w-3xl">{d.excerpt}</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <Body />
        <ShareButtons title={d.title} url={`https://www.sankhyaiq.in/dashboards/${d.slug}`} />
        <DataSources sources={d.sources} />
        <p className="mt-8 font-plex text-xs text-muted leading-relaxed">
          Figures were last checked against the sources above on {formatDate(d.updated)}. Refresh cycle: {d.cadence.toLowerCase()}.
        </p>
      </main>

      <NewsletterStrip />
      <Footer />
    </>
  );
}
