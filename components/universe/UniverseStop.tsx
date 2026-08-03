"use client";

import { useRef, useState } from "react";
import type { UniverseStop as UniverseStopData } from "@/lib/universe";
import { useInView, usePrefersReducedMotion } from "@/lib/useInView";
import StopBackground from "./StopBackground";

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
      className="relative h-full w-full flex-shrink-0 snap-start snap-always overflow-hidden"
    >
      <StopBackground stop={stop} isInView={isInView} reducedMotion={reducedMotion} />

      <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

      <div className="relative h-full w-full flex flex-col items-center justify-end pb-16 px-6 text-center">
        <p className="font-playfair text-2xl sm:text-4xl font-bold text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] max-w-md">
          {stop.caption}
        </p>
        <p className="font-plex text-sm sm:text-base font-light text-white/90 mt-2 max-w-sm drop-shadow-[0_1px_8px_rgba(0,0,0,0.7)]">
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
            className="mt-6 px-5 py-2 rounded-full bg-cobalt text-white font-plex text-sm font-medium hover:bg-navy transition-colors"
          >
            Start again
          </button>
        )}
      </div>
    </section>
  );
}
