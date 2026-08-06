"use client";

import type { UniverseStop6to8 as UniverseStop6to8Data } from "@/lib/universe";
import { useInView, usePrefersReducedMotion } from "@/lib/useInView";
import StopBackground from "./StopBackground";

interface UniverseStop6to8Props {
  stop: UniverseStop6to8Data;
  isLast: boolean;
  onReplay: () => void;
}

export default function UniverseStop6to8({ stop, isLast, onReplay }: UniverseStop6to8Props) {
  const { ref, isInView } = useInView<HTMLElement>(0.5);
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section
      id={`universe-6to8-stop-${stop.id}`}
      ref={ref}
      className="relative h-full w-full flex-shrink-0 snap-start snap-always overflow-hidden"
    >
      <div className="absolute inset-0">
        <StopBackground
          image={stop.image}
          alt={stop.caption}
          isInView={isInView}
          reducedMotion={reducedMotion}
          priority={stop.id === 1}
        />
      </div>

      {stop.id === 16 && (
        <div
          className={`absolute top-4 inset-x-0 flex justify-center px-6 transition-opacity duration-700 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2 rounded-full bg-black/50 backdrop-blur-sm px-4 py-1.5">
            <span
              className={reducedMotion ? "" : "inline-block animate-universe-shrink"}
              aria-hidden="true"
            >
              ⏳
            </span>
            <span className="font-plex text-xs font-medium text-white/90 whitespace-nowrap">
              Time speeds up from here
            </span>
          </div>
        </div>
      )}

      {/* Bottom scrim holds the caption directly on the art instead of a
          separate flat-navy panel, so the image is never boxed off. */}
      <div className="absolute inset-x-0 bottom-0 h-[60%] md:h-[55%] bg-gradient-to-t from-navy via-navy/85 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center md:items-start text-center md:text-left px-6 py-8 md:px-14 md:py-12">
        <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 font-plex text-xs font-medium text-sky">
          {stop.timeAgo}, {stop.cosmicCalendar} on the cosmic calendar
        </span>
        <p className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          {stop.caption}
        </p>
        <p className="font-plex text-sm sm:text-base font-light text-white/85 mt-3 max-w-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)]">
          {stop.detail}
        </p>

        {isLast && (
          <button
            onClick={onReplay}
            className="mt-6 px-5 py-2 rounded-full bg-cobalt text-white font-plex text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Start again
          </button>
        )}
      </div>
    </section>
  );
}
