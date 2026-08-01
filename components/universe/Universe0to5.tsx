"use client";

import { useRef } from "react";
import { universeStops0to5 } from "@/lib/universe";
import UniverseStop from "./UniverseStop";
import GuideCharacter from "./GuideCharacter";

export default function Universe0to5() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleReplay = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative h-full w-full">
      <GuideCharacter />
      <div
        ref={containerRef}
        className="h-full w-full overflow-y-scroll snap-y snap-mandatory overscroll-y-contain"
      >
        {universeStops0to5.map((stop) => (
          <UniverseStop
            key={stop.id}
            stop={stop}
            isLast={stop.id === universeStops0to5[universeStops0to5.length - 1].id}
            onReplay={handleReplay}
          />
        ))}
      </div>
    </div>
  );
}
