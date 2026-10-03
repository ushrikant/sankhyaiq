import Link from "next/link";
import { site } from "@/lib/site";

// Newsletter call to action. Shows the Beehiiv form only once a real embed URL is set,
// so visitors never see a form that does not actually subscribe them.
export default function NewsletterStrip() {
  return (
    <section className="border-y border-gray-100 bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-plex text-xs font-semibold uppercase tracking-widest text-cobalt mb-3">Weekly Newsletter</p>
        <h2 className="font-playfair text-2xl lg:text-3xl font-bold text-navy mb-3">One data story in your inbox every week.</h2>
        <p className="font-plex text-muted text-base mb-8">No noise, no roundups. One chart, one story, one insight. Free, every Friday.</p>
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
          <Link
            href="/newsletter"
            className="inline-flex px-6 py-3 bg-cobalt text-white font-plex font-semibold text-sm rounded-full hover:bg-navy transition-colors"
          >
            Launching soon. See what is coming
          </Link>
        )}
      </div>
    </section>
  );
}
