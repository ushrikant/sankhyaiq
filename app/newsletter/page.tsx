import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Newsletter | SankhyaIQ",
  description: "One data story. Every week. Free. Subscribe to the SankhyaIQ newsletter.",
};

const pastIssues = [
  {
    number: "003",
    title: "How India's tiger count tripled in 15 years",
    date: "8 November 2024",
    summary: "The Project Tiger census, why the methodology matters and what the numbers actually prove.",
  },
  {
    number: "002",
    title: "The EV adoption gap between Indian states",
    date: "1 November 2024",
    summary: "Goa and Kerala are far ahead. Bihar and UP are years behind. What drives the difference?",
  },
  {
    number: "001",
    title: "India's coastline paradox",
    date: "25 October 2024",
    summary: "Why the answer to 'how long is India's coastline' depends entirely on how you measure it.",
  },
];

export default function NewsletterPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <p className="font-plex text-xs font-semibold uppercase tracking-widest text-cobalt mb-4">
          Weekly newsletter
        </p>
        <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-navy mb-6">
          One data story.<br />Every week.<br />Free.
        </h1>
        <p className="font-plex text-lg text-muted leading-relaxed mb-4 max-w-md mx-auto">
          Every Friday, one chart, one story and one thing you will want to share. No sponsored content, no hot takes. Just data, carefully explained.
        </p>
        <p className="font-plex text-base text-muted mb-10">
          Sent to 3,400+ subscribers. Unsubscribe any time.
        </p>

        {/* Beehiiv embed placeholder */}
        <div className="bg-surface border border-gray-200 rounded-2xl p-8 mb-16 text-left">
          <p className="font-plex text-sm text-muted mb-2 text-center font-medium">
            Subscription form
          </p>
          {/* BEEHIIV_EMBED — replace this div with your Beehiiv embed script */}
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
            <p className="font-plex text-sm text-muted">
              Paste your Beehiiv embed code here. It will render the subscription form with your Beehiiv newsletter settings.
            </p>
            <code className="block mt-3 text-xs text-muted/70 bg-gray-100 px-3 py-2 rounded">
              {`<script src="https://embeds.beehiiv.com/..." ... />`}
            </code>
          </div>
        </div>

        {/* Past issues */}
        <div className="text-left">
          <h2 className="font-playfair text-2xl font-bold text-navy mb-6">Past issues</h2>
          <div className="flex flex-col gap-4">
            {pastIssues.map((issue) => (
              <div
                key={issue.number}
                className="flex gap-5 p-5 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-shadow"
              >
                <span className="font-playfair text-3xl font-bold text-gray-100 shrink-0 leading-none">
                  #{issue.number}
                </span>
                <div>
                  <p className="font-plex text-xs text-muted mb-1">{issue.date}</p>
                  <h3 className="font-playfair text-base font-semibold text-navy mb-1">
                    {issue.title}
                  </h3>
                  <p className="font-plex text-sm text-muted">{issue.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
