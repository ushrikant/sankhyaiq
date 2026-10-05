export interface Kpi {
  value: string;
  label: string;
  // Small line under the label, e.g. change since last reading.
  delta?: string;
  tone?: "good" | "bad" | "flat";
}

const TONE = { good: "#2e7d32", bad: "#b3261e", flat: "#546e7a" } as const;

// Headline numbers across the top of every dashboard.
export default function Kpis({ items, accent = "#1565c0" }: { items: Kpi[]; accent?: string }) {
  const cols = items.length >= 5 ? "lg:grid-cols-5" : items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <div className={`grid grid-cols-2 ${cols} gap-3 mb-8`}>
      {items.map((k) => (
        <div key={k.label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm" style={{ borderTop: `3px solid ${accent}` }}>
          <p className="font-playfair text-2xl sm:text-3xl font-bold text-navy leading-none">{k.value}</p>
          <p className="font-plex text-xs sm:text-sm text-muted mt-2 leading-snug">{k.label}</p>
          {k.delta && (
            <p className="font-plex text-xs font-semibold mt-1.5" style={{ color: TONE[k.tone ?? "flat"] }}>{k.delta}</p>
          )}
        </div>
      ))}
    </div>
  );
}
