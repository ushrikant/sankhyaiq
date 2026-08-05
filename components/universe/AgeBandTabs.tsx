"use client";

import { useState } from "react";
import { ageBands } from "@/lib/universe";
import Universe0to5 from "./Universe0to5";
import Universe6to8 from "./Universe6to8";
import ComingSoonPlaceholder from "./ComingSoonPlaceholder";

export default function AgeBandTabs() {
  const [activeSlug, setActiveSlug] = useState(ageBands[0].slug);
  const activeBand = ageBands.find((b) => b.slug === activeSlug) ?? ageBands[0];

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)]">
      <div className="flex overflow-x-auto border-b border-gray-100 bg-white px-4 sm:px-6 lg:px-8 shrink-0">
        {ageBands.map((band) => (
          <button
            key={band.slug}
            onClick={() => setActiveSlug(band.slug)}
            className={`shrink-0 px-4 py-3 font-plex text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeSlug === band.slug
                ? "border-cobalt text-navy"
                : "border-transparent text-muted hover:text-navy"
            }`}
            aria-current={activeSlug === band.slug ? "page" : undefined}
          >
            {band.label}
          </button>
        ))}
      </div>

      <div className="flex-1 min-h-0">
        {activeBand.slug === "0-5" ? (
          <Universe0to5 />
        ) : activeBand.slug === "6-8" ? (
          <Universe6to8 />
        ) : (
          <ComingSoonPlaceholder band={activeBand} />
        )}
      </div>
    </div>
  );
}
