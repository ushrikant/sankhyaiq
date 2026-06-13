"use client";

import { useState } from "react";

export default function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section className="border-y border-gray-100 bg-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p className="font-plex text-xs font-semibold uppercase tracking-widest text-cobalt mb-3">
          Weekly Newsletter
        </p>
        <h2 className="font-playfair text-2xl lg:text-3xl font-bold text-navy mb-3">
          Get one data story in your inbox every week.
        </h2>
        <p className="font-plex text-muted text-base mb-8">
          No noise, no roundups. One chart, one story, one insight. Free, every Friday.
        </p>

        {submitted ? (
          <div className="inline-flex items-center gap-2 bg-mint/30 text-forest px-6 py-3 rounded-full font-plex font-medium">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            You are on the list!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-full border border-gray-200 font-plex text-sm text-navy placeholder-muted/60 focus:outline-none focus:border-cobalt focus:ring-2 focus:ring-cobalt/20"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-cobalt text-white font-plex font-semibold text-sm rounded-full hover:bg-navy transition-colors whitespace-nowrap"
            >
              Subscribe free
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
