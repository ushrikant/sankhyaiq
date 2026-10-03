import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { getFeaturedStories, storyHref } from "@/lib/stories";

export const metadata: Metadata = {
  title: "Newsletter | SankhyaIQ",
  description: "One data story. Every week. Free. The SankhyaIQ newsletter.",
};

export default function NewsletterPage() {
  const firstIssues = getFeaturedStories().slice(0, 4);

  return (
    <>
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="font-plex text-xs font-semibold uppercase tracking-widest text-cobalt mb-4">Weekly newsletter</p>
        <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-navy mb-6">
          One data story.
          <br />
          Every week.
          <br />
          Free.
        </h1>
        <p className="font-plex text-lg text-muted leading-relaxed mb-10 max-w-md mx-auto">
          Every Friday, one chart, one story and one thing you will want to share. No sponsored content, no hot takes. Just data, carefully explained.
        </p>

        <div className="bg-surface border border-gray-200 rounded-2xl p-8 mb-16">
          {site.beehiivEmbedUrl ? (
            <iframe
              src={site.beehiivEmbedUrl}
              title="Subscribe to the SankhyaIQ newsletter"
              className="mx-auto w-full max-w-md"
              height={52}
              frameBorder={0}
              scrolling="no"
              style={{ background: "transparent" }}
            />
          ) : (
            <>
              <p className="font-playfair text-xl font-semibold text-navy mb-2">Sign-ups open soon</p>
              <p className="font-plex text-sm text-muted">
                The first issue goes out once the subscription form is live. Until then, every story is free to read on the site.
              </p>
            </>
          )}
        </div>

        <div className="text-left">
          <h2 className="font-playfair text-2xl font-bold text-navy mb-2">What the first issues will cover</h2>
          <p className="font-plex text-sm text-muted mb-6">Each issue picks one story from the site and the one chart that explains it.</p>
          <div className="flex flex-col gap-4">
            {firstIssues.map((s, i) => (
              <Link
                key={s.slug}
                href={storyHref(s)}
                className="flex gap-5 p-5 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-shadow"
              >
                <span className="font-playfair text-3xl font-bold text-gray-200 shrink-0 leading-none">#{String(i + 1).padStart(3, "0")}</span>
                <div>
                  <h3 className="font-playfair text-base font-semibold text-navy mb-1">{s.title}</h3>
                  <p className="font-plex text-sm text-muted">{s.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
