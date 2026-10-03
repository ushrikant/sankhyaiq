import Link from "next/link";
import { getSectionBySlug } from "@/lib/sections";
import { storyHref, type Story } from "@/lib/stories";

interface StoryCardProps {
  story: Story;
  variant?: "default" | "compact";
}

// Card with a typographic panel: the story's headline number stands in for an image.
export default function StoryCard({ story, variant = "default" }: StoryCardProps) {
  const section = getSectionBySlug(story.section);
  const accent = section?.accentColor || "#1565c0";

  return (
    <Link href={storyHref(story)} className="group block h-full">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col">
        <div className="relative w-full overflow-hidden" style={{ paddingBottom: variant === "compact" ? "44%" : "50%", background: `${accent}12` }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden>
            {[40, 80, 120, 160].map((y) => (
              <line key={y} x1="0" x2="400" y1={y} y2={y} stroke={accent} strokeOpacity="0.08" />
            ))}
          </svg>
          <div className="absolute inset-0 flex items-end p-5">
            <p className="font-playfair text-2xl sm:text-[26px] font-bold leading-tight" style={{ color: accent }}>
              {story.kicker}
            </p>
          </div>
          {story.href && (
            <span className="absolute top-3 right-3 text-[11px] font-plex font-semibold text-white px-2 py-0.5 rounded-full" style={{ background: accent }}>
              Interactive
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col flex-1 gap-2">
          {section && (
            <span className="self-start text-xs font-plex font-medium px-2.5 py-0.5 rounded-full" style={{ background: `${accent}18`, color: accent }}>
              {section.label}
            </span>
          )}
          <h3 className="font-playfair text-base font-semibold text-navy leading-snug group-hover:text-cobalt transition-colors">{story.title}</h3>
          <p className="font-plex text-sm text-muted leading-relaxed flex-1">{story.excerpt}</p>
          <p className="font-plex text-xs text-muted/70 mt-auto">{story.readTime} min read</p>
        </div>
      </article>
    </Link>
  );
}
