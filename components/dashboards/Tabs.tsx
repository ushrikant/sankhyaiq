"use client";

import { useState, type ReactNode } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

// Switches between server rendered views (a measure, a region, a year). Only the active view shows.
export default function Tabs({ tabs, accent = "#1565c0" }: { tabs: Tab[]; accent?: string }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-2 mb-4">
        {tabs.map((t, k) => (
          <button
            key={t.label}
            role="tab"
            aria-selected={k === i}
            onClick={() => setI(k)}
            className="font-plex text-sm px-3.5 py-1.5 rounded-full border transition-colors"
            style={k === i ? { background: accent, color: "#fff", borderColor: accent } : { background: "#fff", color: "#546e7a", borderColor: "#dfe6ea" }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{tabs[i].content}</div>
    </div>
  );
}
