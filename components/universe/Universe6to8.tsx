"use client";

import { useRef } from "react";
import { universeStops6to8 } from "@/lib/universe";
import UniverseStop6to8 from "./UniverseStop6to8";

export default function Universe6to8() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleReplay = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory overscroll-y-contain"
      >
        {universeStops6to8.map((stop) => (
          <UniverseStop6to8
            key={stop.id}
            stop={stop}
            isLast={stop.id === universeStops6to8[universeStops6to8.length - 1].id}
            onReplay={handleReplay}
          />
        ))}
      </div>
    </div>
  );
}
