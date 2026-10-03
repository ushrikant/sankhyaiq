import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StoryCard from "@/components/StoryCard";
import DataSources from "@/components/DataSources";
import ShareButtons from "@/components/ShareButtons";
import NewsletterStrip from "@/components/NewsletterStrip";
import { getSectionBySlug } from "@/lib/sections";
import { getArticleStories, getStoryBySlug, getStoriesBySection, stories } from "@/lib/stories";
import { site } from "@/lib/site";

interface Props {
  params: { section: string; story: string };
}

export const dynamicParams = false;

export async function generateStaticParams() {
  return getArticleStories().map((s) => ({ section: s.section, story: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const story = getStoryBySlug(params.section, params.story);
  if (!story) return {};
  return {
    title: `${story.title} | SankhyaIQ`,
    description: story.excerpt,
    openGraph: { title: story.title, description: story.excerpt, type: "article" },
  };
}

export default async function StoryPage({ params }: Props) {
  const section = getSectionBySlug(params.section);
  if (!section) notFound();

  const story = getStoryBySlug(params.section, params.story);
  if (!story || story.href) notFound();

  const { default: Body } = await import(`@/content/${params.section}/${params.story}.mdx`);

  const relatedStories = getStoriesBySection(params.section)
    .filter((s) => s.slug !== params.story)
    .slice(0, 3);
  const otherSectionStories =
    relatedStories.length < 3
      ? stories.filter((s) => s.section !== params.section && s.featured).slice(0, 3 - relatedStories.length)
      : [];
  const moreStories = [...relatedStories, ...otherSectionStories].slice(0, 3);

  const publishedDate = new Date(story.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const storyUrl = `https://www.sankhyaiq.in/${params.section}/${params.story}`;

  return (
    <>
      <Navbar />

      <header className="border-b border-gray-100" style={{ background: `${section.accentColor}0d` }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Link
              href={`/${section.slug}`}
              className="text-xs font-plex font-semibold px-3 py-1 rounded-full"
              style={{ background: `${section.accentColor}18`, color: section.accentColor }}
            >
              {section.label}
            </Link>
            <span className="font-plex text-xs text-muted">{story.readTime} min read</span>
            <span className="font-plex text-xs text-muted">{publishedDate}</span>
          </div>
          <h1 className="font-playfair text-3xl lg:text-[42px] font-bold text-navy leading-tight mb-5">{story.title}</h1>
          <p className="font-plex text-lg text-muted leading-relaxed border-l-4 pl-5" style={{ borderColor: section.accentColor }}>
            {story.excerpt}
          </p>
          {site.author && <p className="font-plex text-sm text-muted mt-6">By {site.author}</p>}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <article>
          <Body />
        </article>

        <ShareButtons title={story.title} url={storyUrl} />

        <DataSources sources={story.sources} />

        <p className="mt-8 font-plex text-xs text-muted leading-relaxed">
          {site.contactEmail ? (
            <>
              Spotted an error? Write to{" "}
              <a href={`mailto:${site.contactEmail}`} className="underline underline-offset-2 hover:text-navy">
                {site.contactEmail}
              </a>
              .{" "}
            </>
          ) : null}
          Figures were checked against the sources above on {publishedDate}. Any correction is noted at the end of the story.
        </p>
      </main>

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

      <NewsletterStrip />
      <Footer />
    </>
  );
}
