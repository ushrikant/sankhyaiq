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
      <StopBackground
        image={stop.image}
        alt={stop.caption}
        isInView={isInView}
        reducedMotion={reducedMotion}
        priority={stop.id === 1}
      />

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

      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

      <div className="relative h-full w-full flex flex-col items-center justify-end pb-16 px-6 text-center">
        <span className="mb-3 inline-block rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 font-plex text-xs font-medium text-white/90">
          {stop.timeAgo}, {stop.cosmicCalendar} on the cosmic calendar
        </span>
        <p className="font-playfair text-2xl sm:text-4xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] max-w-md">
          {stop.caption}
        </p>
        <p className="font-plex text-sm sm:text-base font-light text-white/90 mt-2 max-w-sm drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
          {stop.detail}
        </p>

        {isLast && (
          <button
            onClick={onReplay}
            className="mt-6 px-5 py-2 rounded-full bg-cobalt text-white font-plex text-sm font-medium hover:bg-navy transition-colors"
          >
            Start again
          </button>
        )}
      </div>
    </section>
  );
}
