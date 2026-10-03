interface Stat {
  value: string;
  label: string;
}

// Headline numbers in a row of tiles. Use where a single figure tells the story better than a chart.
export default function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="not-prose my-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
          <p className="font-playfair text-2xl sm:text-3xl font-bold text-navy leading-none">{s.value}</p>
          <p className="font-plex text-xs sm:text-sm text-muted mt-2 leading-snug">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
