import type { AgeBand } from "@/lib/universe";

interface ComingSoonPlaceholderProps {
  band: AgeBand;
}

export default function ComingSoonPlaceholder({ band }: ComingSoonPlaceholderProps) {
  return (
    <div className="h-full w-full flex items-center justify-center bg-surface px-6">
      <div className="text-center">
        <p className="font-plex text-xs font-semibold uppercase tracking-widest text-cobalt mb-3">
          Ages {band.label}
        </p>
        <p className="font-playfair text-2xl sm:text-3xl font-bold text-navy mb-2">
          Coming soon
        </p>
        <p className="font-plex text-base text-muted max-w-sm">
          We are still building this part of the story. Check back soon.
        </p>
      </div>
    </div>
  );
}
