"use client";

import { useRef, useState } from "react";
import type { UniverseStop as UniverseStopData } from "@/lib/universe";
import { useInView, usePrefersReducedMotion } from "@/lib/useInView";
import StopBackground, { entranceAnimation } from "./StopBackground";

interface UniverseStopProps {
  stop: UniverseStopData;
  isLast: boolean;
  onReplay: () => void;
}

export default function UniverseStop({ stop, isLast, onReplay }: UniverseStopProps) {
  const { ref, isInView } = useInView<HTMLElement>(0.5);
  const reducedMotion = usePrefersReducedMotion();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      id={`universe-stop-${stop.id}`}
      ref={ref}
      className="relative h-full w-full flex-shrink-0 snap-start snap-always overflow-hidden flex flex-col md:flex-row"
    >
      {/* Image gets its own region instead of a full-bleed backdrop with text
          overlaid on top, so the art is never covered up. */}
      <div className="relative w-full h-[58%] md:h-full md:w-1/2 lg:w-3/5 shrink-0 overflow-hidden">
        <StopBackground
          image={stop.image}
          alt={stop.visual}
          isInView={isInView}
          reducedMotion={reducedMotion}
          entranceClass={entranceAnimation(stop.id)}
          priority={stop.id === 0}
        />
      </div>

      <div className="relative flex-1 min-h-0 flex flex-col justify-center items-center md:items-start px-6 py-6 md:px-10 lg:px-14 text-center md:text-left bg-navy overflow-y-auto">
        <p className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-white max-w-md">
          {stop.caption}
        </p>
        <p className="font-plex text-sm sm:text-base font-light text-white/80 mt-3 max-w-sm">
          {stop.narration}
        </p>

        {stop.audioSrc && (
          <>
            <audio
              ref={audioRef}
              src={stop.audioSrc}
              onEnded={() => setIsPlaying(false)}
            />
            <button
              onClick={toggleAudio}
              className="mt-4 w-11 h-11 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label={isPlaying ? "Pause narration" : "Play narration"}
            >
              <span className="text-white text-lg">{isPlaying ? "II" : "▶"}</span>
            </button>
          </>
        )}

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
