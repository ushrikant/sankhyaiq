import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";
import DataSources from "@/components/DataSources";
import ShareButtons from "@/components/ShareButtons";
import { getSectionBySlug } from "@/lib/sections";
import { getStoryBySlug, getStoriesBySection, stories } from "@/lib/stories";

interface Props {
  params: { section: string; story: string };
}

export async function generateStaticParams() {
  return stories.map((s) => ({ section: s.section, story: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const story = getStoryBySlug(params.section, params.story);
  if (!story) return {};
  return {
    title: `${story.title} | SankhyaIQ`,
    description: story.excerpt,
  };
}

const placeholderSources = [
  {
    name: "Ministry of Environment, Forest and Climate Change (MoEFCC)",
    url: "https://moef.gov.in",
    description: "India's official forest and wildlife data",
  },
  {
    name: "Wildlife Institute of India",
    url: "https://wii.gov.in",
    description: "Species surveys and population estimates",
  },
  {
    name: "IUCN Red List",
    url: "https://iucnredlist.org",
    description: "Global conservation status data",
  },
];

export default function StoryPage({ params }: Props) {
  const section = getSectionBySlug(params.section);
  if (!section) notFound();

  const story = getStoryBySlug(params.section, params.story);
  if (!story) notFound();

  const relatedStories = getStoriesBySection(params.section)
    .filter((s) => s.slug !== params.story)
    .slice(0, 3);

  const otherSectionStories = relatedStories.length < 3
    ? stories.filter((s) => s.section !== params.section).slice(0, 3 - relatedStories.length)
    : [];

  const moreStories = [...relatedStories, ...otherSectionStories].slice(0, 3);

  const publishedDate = new Date(story.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const storyUrl = `https://sankhyaiq.in/${params.section}/${params.story}`;

  return (
    <>
      <Navbar />

      {/* Hero image area */}
      <div
        className="w-full h-64 lg:h-80 flex items-center justify-center relative overflow-hidden"
        style={{ background: `${section.accentColor}15` }}
      >
        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 1200 400"
          preserveAspectRatio="xMidYMid slice"
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <circle
              key={i}
              cx={60 * i}
              cy={Math.sin(i * 0.6) * 100 + 200}
              r={30 + i * 4}
              fill="none"
              stroke={section.accentColor}
              strokeWidth="0.8"
            />
          ))}
        </svg>
        <div className="relative text-center">
          <div
            className="w-20 h-20 rounded-full mx-auto mb-3 opacity-20"
            style={{ background: section.accentColor }}
          />
          <p className="font-plex text-sm text-muted">Hero image coming soon</p>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        {/* Section badge + meta */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <Link
            href={`/${section.slug}`}
            className="text-xs font-plex font-semibold px-3 py-1 rounded-full"
            style={{
              background: `${section.accentColor}18`,
              color: section.accentColor,
            }}
          >
            {section.label}
          </Link>
          <span className="font-plex text-xs text-muted">{story.readTime} min read</span>
          <span className="font-plex text-xs text-muted">{publishedDate}</span>
        </div>

        {/* Title */}
        <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-navy leading-snug mb-6">
          {story.title}
        </h1>

        {/* Lead paragraph */}
        <p className="font-plex text-lg text-muted leading-relaxed mb-8 border-l-4 border-cobalt pl-5">
          {story.excerpt}
        </p>

        {/* Story body placeholder */}
        <div className="prose max-w-none">
          <p className="font-plex text-base text-navy/80 leading-relaxed mb-5">
            This is where the full story content goes. Add an <code>.mdx</code> file at <code>content/{params.section}/{params.story}.mdx</code> and wire up the MDX reader to replace this placeholder.
          </p>
          <h2 className="font-playfair text-2xl font-bold text-navy mt-10 mb-4">
            What the data says
          </h2>
          <p className="font-plex text-base text-navy/80 leading-relaxed mb-5">
            Once the MDX pipeline is connected, your DataViz embeds and chart components will render here. The <code>&lt;DataViz /&gt;</code> component accepts any Datawrapper or Flourish iframe URL.
          </p>

          {/* DataViz placeholder */}
          <div className="my-8 rounded-xl border border-gray-100 bg-surface p-8 text-center">
            <p className="font-plex text-sm text-muted">
              {"{/* DATAVIZ_EMBED — replace with <DataViz src=\"...\" /> */}"}
            </p>
          </div>

          <h2 className="font-playfair text-2xl font-bold text-navy mt-10 mb-4">
            The numbers behind it
          </h2>
          <p className="font-plex text-base text-navy/80 leading-relaxed">
            More story content continues here. Add your analysis, charts and context in the MDX file.
          </p>
        </div>

        {/* Share buttons */}
        <ShareButtons title={story.title} url={storyUrl} />

        {/* Data sources */}
        <DataSources sources={placeholderSources} />
      </main>

      {/* More from this section */}
      {moreStories.length > 0 && (
        <section className="bg-surface border-t border-gray-100 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-playfair text-2xl font-bold text-navy mb-6">More stories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {moreStories.map((s) => (
                <StoryCard key={s.slug} story={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
