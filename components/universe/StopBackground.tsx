import Image from "next/image";
import type { UniverseStop as UniverseStopData } from "@/lib/universe";

interface StopBackgroundProps {
  stop: UniverseStopData;
  isInView: boolean;
  reducedMotion: boolean;
}

function entranceAnimation(id: number) {
  switch (id) {
    case 1:
      return "animate-universe-burst";
    case 8:
      return "animate-universe-shake";
    case 13:
      return "animate-universe-rise";
    default:
      return "animate-universe-fade";
  }
}

// The illustrations are wide (landscape) but each stop renders in a tall
// mobile-first frame. A plain object-cover would crop most of the width
// away and lose the guide character at the edge of the frame, so the full
// image is shown "contained" over a blurred, scaled up copy of itself as a
// full bleed backdrop.
export default function StopBackground({ stop, isInView, reducedMotion }: StopBackgroundProps) {
  const motionClass = isInView
    ? reducedMotion
      ? "animate-universe-fade"
      : entranceAnimation(stop.id)
    : "opacity-0";
  const src = `/images/universe/${stop.image}`;

  return (
    <div className="absolute inset-0">
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes="200px"
        priority={stop.id === 0}
        className={`object-cover scale-110 blur-2xl opacity-70 ${motionClass}`}
      />
      <Image
        src={src}
        alt={stop.visual}
        fill
        sizes="100vw"
        priority={stop.id === 0}
        className={`object-contain ${motionClass}`}
      />
    </div>
  );
}
