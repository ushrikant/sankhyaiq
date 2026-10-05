import Link from "next/link";
import { formatDate, type Dashboard } from "@/lib/dashboards";
import { getSectionBySlug } from "@/lib/sections";

export default function DashboardCard({ d }: { d: Dashboard }) {
  const section = getSectionBySlug(d.section);
  const accent = section?.accentColor ?? "#1565c0";
  return (
    <Link href={`/dashboards/${d.slug}`} className="group block h-full">
      <article className="h-full flex flex-col rounded-xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <div className="p-5" style={{ background: `${accent}12`, borderBottom: `3px solid ${accent}` }}>
          <p className="font-playfair text-2xl font-bold leading-tight" style={{ color: accent }}>{d.kicker}</p>
        </div>
        <div className="p-4 flex flex-col gap-2 flex-1">
          <h3 className="font-playfair text-base font-semibold text-navy leading-snug group-hover:text-cobalt transition-colors">{d.title}</h3>
          <p className="font-plex text-sm text-muted leading-relaxed flex-1">{d.excerpt}</p>
          <p className="font-plex text-xs text-muted/70 mt-auto">Checked {formatDate(d.updated)}</p>
        </div>
      </article>
    </Link>
  );
}
