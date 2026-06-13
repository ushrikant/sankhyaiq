"use client";

import Link from "next/link";
import { useState } from "react";
import { sections } from "@/lib/sections";

export default function SectionStrip() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="mb-14">
      <h2 className="font-plex text-xs font-semibold uppercase tracking-widest text-muted mb-4">
        Browse by section
      </h2>
      <div className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <Link
            key={s.slug}
            href={`/${s.slug}`}
            className="px-4 py-2 rounded-full text-sm font-plex font-medium border transition-colors"
            style={{
              borderColor: s.accentColor,
              color: hovered === s.slug ? "#ffffff" : s.accentColor,
              backgroundColor: hovered === s.slug ? s.accentColor : "transparent",
            }}
            onMouseEnter={() => setHovered(s.slug)}
            onMouseLeave={() => setHovered(null)}
          >
            {s.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
