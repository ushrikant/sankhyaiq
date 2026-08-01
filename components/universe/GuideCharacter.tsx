"use client";

import { usePrefersReducedMotion } from "@/lib/useInView";

// TODO: swap this placeholder comet for the final illustrated guide character.
export default function GuideCharacter() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      className={`absolute bottom-6 right-6 z-40 pointer-events-none ${
        prefersReducedMotion ? "" : "animate-universe-float"
      }`}
      aria-hidden="true"
    >
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="14" fill="#a5d6a7" stroke="#2e7d32" strokeWidth="2" />
        <circle cx="24" cy="24" r="3" fill="#0d2b52" />
        <circle cx="33" cy="24" r="3" fill="#0d2b52" />
        <path
          d="M23 33c2 2 8 2 10 0"
          stroke="#0d2b52"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M14 18 L2 12 M14 24 L1 24 M16 32 L6 40"
          stroke="#1565c0"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
