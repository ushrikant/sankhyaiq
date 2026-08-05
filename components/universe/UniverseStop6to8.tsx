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
      className="relative h-full w-full flex-shrink-0 snap-start snap-always overflow-hidden flex flex-col md:flex-row"
    >
      {/* Image gets its own region instead of a full-bleed backdrop with text
          overlaid on top, so the art is never covered up. */}
      <div className="relative w-full h-[58%] md:h-full md:w-1/2 lg:w-3/5 shrink-0 overflow-hidden">
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
      </div>

      <div className="relative flex-1 min-h-0 flex flex-col justify-center items-center md:items-start px-6 py-6 md:px-10 lg:px-14 text-center md:text-left bg-navy overflow-y-auto">
        <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 font-plex text-xs font-medium text-sky">
          {stop.timeAgo}, {stop.cosmicCalendar} on the cosmic calendar
        </span>
        <p className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-md">
          {stop.caption}
        </p>
        <p className="font-plex text-sm sm:text-base font-light text-white/80 mt-3 max-w-sm">
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
