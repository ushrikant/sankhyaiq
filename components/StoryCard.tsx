import Link from "next/link";
import { getSectionBySlug } from "@/lib/sections";
import type { Story } from "@/lib/stories";

interface StoryCardProps {
  story: Story;
  variant?: "default" | "compact";
}

export default function StoryCard({ story, variant = "default" }: StoryCardProps) {
  const section = getSectionBySlug(story.section);
  const href = `/${story.section}/${story.slug}`;

  return (
    <Link href={href} className="group block">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full flex flex-col">
        {/* Image placeholder */}
        <div
          className="relative w-full overflow-hidden"
          style={{ paddingBottom: variant === "compact" ? "52%" : "58%" }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: section ? `${section.accentColor}18` : "#f0f4f8" }}
          >
            <div
              className="w-12 h-12 rounded-full opacity-20"
              style={{ background: section?.accentColor || "#546e7a" }}
            />
            <span className="absolute bottom-3 right-3 text-xs font-plex text-white/80 bg-black/20 px-2 py-0.5 rounded">
              Visual coming soon
            </span>
          </div>
        </div>

        <div className="p-4 flex flex-col flex-1 gap-2">
          {/* Badge */}
          {section && (
            <span
              className="self-start text-xs font-plex font-medium px-2.5 py-0.5 rounded-full"
              style={{
                background: `${section.accentColor}18`,
                color: section.accentColor,
              }}
            >
              {section.label}
            </span>
          )}

          {/* Title */}
          <h3 className="font-playfair text-base font-semibold text-navy leading-snug group-hover:text-cobalt transition-colors">
            {story.title}
          </h3>

          {/* Excerpt */}
          <p className="font-plex text-sm text-muted leading-relaxed flex-1">
            {story.excerpt}
          </p>

          {/* Read time */}
          <p className="font-plex text-xs text-muted/70 mt-auto">
            {story.readTime} min read
          </p>
        </div>
      </article>
    </Link>
  );
}
