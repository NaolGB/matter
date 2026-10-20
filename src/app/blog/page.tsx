import type { Metadata } from "next";
import Link from "next/link";
import { CoverBox } from "@/components/blog";
import { Wrap } from "@/components/site";
import { formatDate, getPosts, type PostMeta } from "@/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes from making Matter, a planner for the Mac and iPhone that knows how much a day holds.",
  alternates: { types: { "application/rss+xml": "/blog/rss.xml" } },
};

function Dateline({ meta }: { meta: PostMeta }) {
  return (
    <p className="text-[13px] text-ink-muted">
      <time dateTime={meta.date}>{formatDate(meta.date)}</time>
      {meta.draft && <span className="ml-2 text-attention">Draft</span>}
    </p>
  );
}

/* The newest post is one wide card, its words beside its cover; the older ones sit under it in a
   grid of three. Taken from Ramp's blog, without its categories, search and carousel, which need
   more posts than this blog will have for a long while. */
export default async function BlogPage() {
  const [latest, ...older] = await getPosts();
  return (
    <main className="flex-1">
      <Wrap wide className="py-[clamp(3rem,7vw,5rem)]">
        <h1 className="text-balance text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
          Blog
        </h1>
        {!latest ? (
          <p className="mt-8 text-[17px] text-ink-muted">Nothing here yet.</p>
        ) : (
          <>
            <Link
              href={`/blog/${latest.slug}`}
              className="group mt-10 grid items-center gap-8 overflow-hidden rounded-[28px] bg-track p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14"
            >
              <div className="max-w-[520px]">
                <Dateline meta={latest.meta} />
                <h2 className="mt-2 text-balance text-[clamp(1.75rem,3vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.03em] group-hover:underline group-hover:decoration-ink/25 group-hover:underline-offset-4">
                  {latest.meta.title}
                </h2>
                <p className="mt-4 text-[17px] leading-relaxed text-ink-muted">{latest.meta.summary}</p>
              </div>
              {/* The card is already grey, so the cover sits on it directly, not in a second box. */}
              <CoverBox cover={latest.meta.cover} priority className="!overflow-visible !bg-transparent !p-0" />
            </Link>
            {older.length > 0 && (
              <ul className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {older.map(({ slug, meta }) => (
                  <li key={slug}>
                    <Link href={`/blog/${slug}`} className="group block">
                      <CoverBox cover={meta.cover} />
                      <div className="mt-4">
                        <Dateline meta={meta} />
                        <h2 className="mt-1 text-balance text-[1.25rem] font-semibold leading-snug tracking-[-0.015em] group-hover:underline group-hover:decoration-ink/25 group-hover:underline-offset-4">
                          {meta.title}
                        </h2>
                        <p className="mt-1.5 text-[15px] leading-relaxed text-ink-muted">{meta.summary}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </Wrap>
    </main>
  );
}
