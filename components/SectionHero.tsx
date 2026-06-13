import type { Section } from "@/lib/sections";

interface SectionHeroProps {
  section: Section;
}

function SectionTexture({ slug }: { slug: string }) {
  switch (slug) {
    case "world-and-india":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse key={i} cx="400" cy="150" rx={60 + i * 30} ry={20 + i * 10} fill="none" stroke="white" strokeWidth="0.8" />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`v${i}`} x1={100 * i} y1="0" x2={100 * i} y2="300" stroke="white" strokeWidth="0.5" />
          ))}
        </svg>
      );
    case "people-and-society":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 120 }).map((_, i) => (
            <circle
              key={i}
              cx={(i % 20) * 42 + 10}
              cy={Math.floor(i / 20) * 55 + 15}
              r="4"
              fill="white"
            />
          ))}
        </svg>
      );
    case "maps-and-geography":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`M ${i * 100} 0 Q ${i * 100 + 50} ${50 + i * 20} ${i * 100 + 100} 300`}
              fill="none"
              stroke="white"
              strokeWidth="1"
            />
          ))}
        </svg>
      );
    case "animals-and-nature":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 20 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 42}, ${i % 3 === 0 ? 50 : i % 3 === 1 ? 150 : 220})`}>
              <path d={`M 0 0 C 10 -20 20 -20 30 0 C 20 20 10 20 0 0`} fill="none" stroke="white" strokeWidth="0.8" />
            </g>
          ))}
        </svg>
      );
    case "auto-and-ev":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0 150 Q 200 50 400 150 Q 600 250 800 150" fill="none" stroke="white" strokeWidth="2" />
          <path d="M 0 100 Q 200 0 400 100 Q 600 200 800 100" fill="none" stroke="white" strokeWidth="1" />
          <path d="M 0 200 Q 200 100 400 200 Q 600 300 800 200" fill="none" stroke="white" strokeWidth="1" />
          {Array.from({ length: 16 }).map((_, i) => (
            <circle key={i} cx={50 * i} cy="150" r="3" fill="white" />
          ))}
        </svg>
      );
    case "money-and-economy":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={15 * i} x2="800" y2={15 * i} stroke="white" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 40 }).map((_, i) => (
            <line key={`v${i}`} x1={20 * i} y1="0" x2={20 * i} y2="300" stroke="white" strokeWidth="0.3" />
          ))}
          <path d="M 50 250 L 150 180 L 250 200 L 350 120 L 450 140 L 550 70 L 650 90 L 750 40" fill="none" stroke="white" strokeWidth="2" />
        </svg>
      );
    case "ai-and-technology":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
          {[
            [100, 150], [200, 80], [300, 200], [400, 120], [500, 60], [600, 180], [700, 100],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="6" fill="white" />
              {i > 0 && (
                <line
                  x1={[100, 200, 300, 400, 500, 600, 700][i - 1]}
                  y1={[150, 80, 200, 120, 60, 180, 100][i - 1]}
                  x2={x}
                  y2={y}
                  stroke="white"
                  strokeWidth="0.8"
                />
              )}
            </g>
          ))}
        </svg>
      );
    case "science-and-space":
      return (
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
          {Array.from({ length: 80 }).map((_, i) => (
            <circle
              key={i}
              cx={Math.sin(i * 2.5) * 400 + 400}
              cy={Math.cos(i * 1.7) * 150 + 150}
              r={i % 5 === 0 ? 2 : 1}
              fill="white"
              opacity={i % 3 === 0 ? 0.8 : 0.4}
            />
          ))}
        </svg>
      );
    default:
      return null;
  }
}

const heroColors: Record<string, string> = {
  "world-and-india": "from-cobalt to-navy",
  "people-and-society": "from-teal-600 to-teal-900",
  "maps-and-geography": "from-amber-700 to-amber-900",
  "animals-and-nature": "from-emerald to-forest",
  "auto-and-ev": "from-slate-600 to-slate-900",
  "money-and-economy": "from-navy to-blue-950",
  "ai-and-technology": "from-indigo-700 to-indigo-950",
  "science-and-space": "from-teal-800 to-teal-950",
};

export default function SectionHero({ section }: SectionHeroProps) {
  const gradient = heroColors[section.slug] || "from-navy to-cobalt";

  return (
    <div className={`relative bg-gradient-to-br ${gradient} py-16 lg:py-24 overflow-hidden`}>
      <SectionTexture slug={section.slug} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-plex text-sm font-medium text-white/60 uppercase tracking-widest mb-3">
          Section
        </p>
        <h1 className="font-playfair text-4xl lg:text-6xl font-bold text-white mb-4">
          {section.label}
        </h1>
        <p className="font-plex text-lg text-white/80 max-w-xl">
          {section.descriptor}
        </p>
      </div>
    </div>
  );
}
