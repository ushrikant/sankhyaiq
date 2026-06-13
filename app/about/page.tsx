import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NewsletterStrip from "@/components/NewsletterStrip";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | SankhyaIQ",
  description: "Who is behind SankhyaIQ, why it exists and how we work with data.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16 lg:py-24">
        {/* Header */}
        <p className="font-plex text-xs font-semibold uppercase tracking-widest text-cobalt mb-4">
          About
        </p>
        <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-navy mb-8 leading-tight">
          Why I built<br />SankhyaIQ
        </h1>

        {/* Story */}
        <div className="prose max-w-none">
          <p className="font-plex text-lg text-navy/80 leading-relaxed mb-6">
            I have been fascinated by numbers since school. Not the kind you memorise for exams, the kind that describe the world around you. How many tigers are left in Madhya Pradesh. What percentage of India uses the internet. How much the rupee has moved against the dollar since liberalisation.
          </p>
          <p className="font-plex text-base text-muted leading-relaxed mb-6">
            The trouble is that most of this data sits in PDFs, government portals and academic papers that no one reads. It deserves better. A good chart can communicate in seconds what a paragraph struggles to say in 200 words. That is the idea behind SankhyaIQ.
          </p>
          <p className="font-plex text-base text-muted leading-relaxed mb-10">
            Sankhya (संख्या) is the Sanskrit word for number. IQ is self-explanatory. Together, they capture what I want this site to be: a place where numbers are given the respect and clarity they deserve.
          </p>

          <hr className="border-gray-100 my-10" />

          <h2 className="font-playfair text-2xl font-bold text-navy mb-5">How we work with data</h2>

          <h3 className="font-playfair text-lg font-semibold text-navy mb-3">Sourcing</h3>
          <p className="font-plex text-base text-muted leading-relaxed mb-5">
            Every story is built on publicly available data. We do not fabricate or estimate numbers when primary sources exist. Where estimates are used, we say so clearly and cite the methodology.
          </p>

          <h3 className="font-playfair text-lg font-semibold text-navy mb-3">Verification</h3>
          <p className="font-plex text-base text-muted leading-relaxed mb-5">
            Before any chart goes live, we cross-check the numbers against at least two independent sources where possible. If sources disagree, we note the discrepancy rather than picking the number that makes a better story.
          </p>

          <h3 className="font-playfair text-lg font-semibold text-navy mb-3">Visualisation</h3>
          <p className="font-plex text-base text-muted leading-relaxed mb-10">
            We use Datawrapper and Flourish for interactive charts. The goal is always clarity, not complexity. A chart that needs a legend longer than itself has failed its purpose.
          </p>

          <hr className="border-gray-100 my-10" />

          <h2 className="font-playfair text-2xl font-bold text-navy mb-5">Indian data sources we rely on</h2>
          <ul className="space-y-3 mb-10">
            {[
              "Census of India and ORGI (Office of the Registrar General)",
              "MOSPI (Ministry of Statistics and Programme Implementation)",
              "RBI Data Warehouse (banking, inflation, currency data)",
              "MoEFCC and Wildlife Institute of India (environment and wildlife)",
              "Ministry of Road Transport and Highways (vehicle data, VAHAN portal)",
              "NITI Aayog datasets and SDG India Index",
              "Open Government Data (OGD) Platform (data.gov.in)",
              "ISRO and DST for science and space stories",
            ].map((source) => (
              <li key={source} className="flex gap-3 items-start">
                <span
                  className="mt-1.5 w-2 h-2 rounded-full bg-cobalt shrink-0"
                  aria-hidden="true"
                />
                <span className="font-plex text-base text-muted">{source}</span>
              </li>
            ))}
          </ul>

          <hr className="border-gray-100 my-10" />

          <h2 className="font-playfair text-2xl font-bold text-navy mb-4">Corrections policy</h2>
          <p className="font-plex text-base text-muted leading-relaxed">
            If you spot an error, please reach out. We will correct it promptly and note the correction at the bottom of the story. Getting it right matters more than getting it first.
          </p>
        </div>
      </main>

      <NewsletterStrip />
      <Footer />
    </>
  );
}
