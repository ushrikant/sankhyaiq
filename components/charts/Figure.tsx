import type { ReactNode } from "react";

interface FigureProps {
  title: string;
  subtitle?: string;
  source?: string;
  note?: string;
  children: ReactNode;
}

// Wrapper every chart sits in: title, subtitle, chart, then source line.
export default function Figure({ title, subtitle, source, note, children }: FigureProps) {
  return (
    <figure className="not-prose my-10 rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-sm">
      <figcaption className="mb-4">
        <p className="font-plex text-base sm:text-lg font-semibold text-navy leading-snug">{title}</p>
        {subtitle && <p className="font-plex text-sm text-muted mt-1">{subtitle}</p>}
      </figcaption>
      <div className="w-full">{children}</div>
      {(source || note) && (
        <div className="mt-4 pt-3 border-t border-gray-100 font-plex text-xs text-muted leading-relaxed">
          {note && <p className="mb-1">{note}</p>}
          {source && <p>Source: {source}</p>}
        </div>
      )}
    </figure>
  );
}
