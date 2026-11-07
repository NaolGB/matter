import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Contents, GetMatter } from "@/components/blog";
import { Wrap } from "@/components/site";
import { getFeaturePage, getFeaturePages } from "@/content/feature-pages";
import { findFeature } from "@/content/feature-tree";

/* A feature's own page, written in MDX and laid out like a blog post: the header on a grey band, the
   text beside a rail that stays in view. It has no date or neighbours, since it says what the app
   does today and is found from /features. */

export async function generateStaticParams() {
  return (await getFeaturePages()).map(({ slug }) => ({ slug }));
}

// A feature with no file (or a draft, in the built site) is a 404, not a page.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/features/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = findFeature(slug);
  if (!found) return {};
  const { meta } = await getFeaturePage(slug);
  return {
    title: found.feature.name,
    description: meta.summary,
    // Setting openGraph here replaces the whole of the layout's, so the site's picture is named again.
    openGraph: {
      title: found.feature.name,
      description: meta.summary,
      images: [{ url: "/opengraph-image.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function FeaturePage({ params }: PageProps<"/features/[slug]">) {
  const { slug } = await params;
  const found = findFeature(slug);
  if (!found) notFound();
  const { meta, Body, headings } = await getFeaturePage(slug);
  const published = new Set((await getFeaturePages()).map((page) => page.slug));
  const related = (meta.related ?? []).filter((other) => published.has(other));
  return (
    <main className="flex-1">
      <article>
        <header className="bg-track pt-[clamp(3rem,7vw,5rem)] pb-[clamp(3rem,6vw,4.5rem)]">
          <Wrap wide>
            <p className="text-[13px] text-ink-muted">
              <Link href="/features" className="hover:text-ink">
                Features
              </Link>
              <span className="mx-2 text-ink-faint">·</span>
              <Link href={`/features#${found.group.id}`} className="hover:text-ink">
                {found.group.name}
              </Link>
              {meta.draft && <span className="ml-2 text-attention">Draft</span>}
            </p>
            <h1 className="mt-3 max-w-[900px] text-balance text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
              {found.feature.name}
            </h1>
            {!meta.hideSummary && (
              <p className="mt-5 max-w-[680px] text-[1.25rem] leading-snug text-ink-muted">{meta.summary}</p>
            )}
          </Wrap>
        </header>
        <Wrap wide className="py-[clamp(3rem,6vw,4.5rem)]">
          <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <aside className="hidden lg:block">
              <div className="sticky top-20 space-y-10">
                <Contents headings={headings} label="On this page" />
                <GetMatter />
              </div>
            </aside>
            <div>
              {/* The text keeps to a reading width; a <Figure> (class `wide`) takes the whole column. */}
              <div className="post text-[17px] leading-[1.6] [&>*]:max-w-[680px] [&>.wide]:max-w-none [&>:first-child]:mt-0">
                <Body />
              </div>
              {related.length > 0 && (
                <nav aria-label="Related features" className="mt-14 max-w-[680px] border-t border-hairline pt-6">
                  <p className="text-[13px] font-semibold">Related</p>
                  <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
                    {related.map((other) => (
                      <li key={other}>
                        <Link href={`/features/${other}`} className="font-medium underline-offset-4 hover:underline">
                          {findFeature(other)?.feature.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <GetMatter className="mt-16 max-w-[680px] lg:hidden" />
            </div>
          </div>
        </Wrap>
      </article>
    </main>
  );
}
