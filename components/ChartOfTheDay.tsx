import Link from "next/link";
import { getSectionBySlug } from "@/lib/sections";
import type { Story } from "@/lib/stories";

interface ChartOfTheDayProps {
  story: Story;
}

export default function ChartOfTheDay({ story }: ChartOfTheDayProps) {
  const section = getSectionBySlug(story.section);
  const href = `/${story.section}/${story.slug}`;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">
      <div className="flex flex-col lg:flex-row">
        {/* Visual area */}
        <div
          className="lg:w-1/2 min-h-[260px] lg:min-h-[340px] relative flex items-center justify-center"
          style={{ background: section ? `${section.accentColor}12` : "#f0f4f8" }}
        >
          {/* Decorative pattern */}
          <svg
            className="absolute inset-0 w-full h-full opacity-5"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
          >
            {Array.from({ length: 10 }).map((_, i) => (
              <circle
                key={i}
                cx={40 * i + 20}
                cy={200}
                r={30 + i * 8}
                fill="none"
                stroke={section?.accentColor || "#1565c0"}
                strokeWidth="1"
              />
            ))}
          </svg>
          <div className="relative text-center p-8">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 opacity-30"
              style={{ background: section?.accentColor || "#1565c0" }}
            />
            <p className="font-plex text-sm text-muted">Chart placeholder: add your Datawrapper embed here</p>
          </div>
          {/* Chart of the Day label */}
          <div className="absolute top-4 left-4 bg-cobalt text-white text-xs font-plex font-semibold px-3 py-1 rounded-full">
            Chart of the Day
          </div>
        </div>

        {/* Content */}
        <div className="lg:w-1/2 p-8 flex flex-col justify-center gap-4">
          {section && (
            <span
              className="self-start text-xs font-plex font-medium px-3 py-1 rounded-full"
              style={{
                background: `${section.accentColor}18`,
                color: section.accentColor,
              }}
            >
              {section.label}
            </span>
          )}
          <h2 className="font-playfair text-2xl lg:text-3xl font-bold text-navy leading-snug">
            {story.title}
          </h2>
          <p className="font-plex text-base text-muted leading-relaxed">
            {story.excerpt}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={href}
              className="inline-flex items-center gap-2 bg-cobalt text-white font-plex font-medium text-sm px-5 py-2.5 rounded-full hover:bg-navy transition-colors"
            >
              Read the story
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <span className="font-plex text-sm text-muted">{story.readTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
}
