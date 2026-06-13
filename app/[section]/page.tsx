import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHero from "@/components/SectionHero";
import StoryCard from "@/components/StoryCard";
import NewsletterStrip from "@/components/NewsletterStrip";
import { getSectionBySlug, sections } from "@/lib/sections";
import { getStoriesBySection } from "@/lib/stories";

interface Props {
  params: { section: string };
}

export async function generateStaticParams() {
  return sections.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const section = getSectionBySlug(params.section);
  if (!section) return {};
  return {
    title: `${section.label} | SankhyaIQ`,
    description: section.descriptor,
  };
}

export default function SectionPage({ params }: Props) {
  const section = getSectionBySlug(params.section);
  if (!section) notFound();

  const stories = getStoriesBySection(section.slug);

  const otherSections = sections
    .filter((s) => s.slug !== section.slug)
    .slice(0, 2);

  return (
    <>
      <Navbar />
      <SectionHero section={section} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Stories grid */}
        {stories.length > 0 ? (
          <section className="mb-16">
            <h2 className="font-playfair text-2xl font-bold text-navy mb-6">
              Stories in {section.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          </section>
        ) : (
          <div className="text-center py-24">
            <p className="font-playfair text-2xl text-navy mb-3">Stories coming soon</p>
            <p className="font-plex text-muted text-base">
              We are working on the first stories for this section. Subscribe to the newsletter to be notified.
            </p>
          </div>
        )}

        {/* You might also like */}
        <section className="mt-8 pt-8 border-t border-gray-100">
          <h2 className="font-plex text-xs font-semibold uppercase tracking-widest text-muted mb-6">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherSections.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="group flex items-center gap-4 p-5 rounded-xl border border-gray-100 bg-white hover:shadow-md transition-shadow"
              >
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0"
                  style={{ background: `${s.accentColor}22` }}
                />
                <div>
                  <p
                    className="font-plex text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: s.accentColor }}
                  >
                    {s.label}
                  </p>
                  <p className="font-plex text-sm text-muted">{s.descriptor}</p>
                </div>
                <svg
                  className="w-5 h-5 text-muted ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <NewsletterStrip />
      <Footer />
    </>
  );
}
