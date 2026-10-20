import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CoverBox } from "@/components/blog";
import { Download, Mark, Wrap } from "@/components/site";
import { site } from "@/config";
import { formatDate, getPost, getPosts, type Heading, type Post } from "@/content/blog";

export async function generateStaticParams() {
  return (await getPosts()).map(({ slug }) => ({ slug }));
}

// A post the list does not have (a draft, in the built site) is a 404, not a page.
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { meta } = await getPost((await params).slug);
  return {
    title: meta.title,
    description: meta.summary,
    // Setting openGraph here replaces the whole of the layout's, picture included, so the site's
    // picture (app/opengraph-image.jpg) is named again for a post that has none of its own.
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.summary,
      publishedTime: meta.date,
      images: [{ url: meta.image ?? "/opengraph-image.jpg", width: 1200, height: 630 }],
    },
  };
}

/** The way to get the app, kept in view beside a long read. Ramp's sign-up card, made ours. */
function GetMatter({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-[20px] bg-track p-5 ${className}`}>
      <p className="flex items-center gap-1.5 text-[13px] font-semibold">
        <Mark size={14} />
        Matter
      </p>
      <p className="mt-2 text-[17px] font-semibold leading-snug tracking-[-0.01em]">Plan the day you actually have.</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
        For the Mac and iPhone. It works offline, with no account.
      </p>
      <Download primary className="mt-4 w-full !h-10 !px-4 !text-[14px]" />
      <Download device="iphone" className="mt-2 w-full !h-10 !px-4 !text-[14px]" />
      {!site.appStore.mac && !site.appStore.iphone && (
        <p className="mt-2 text-center text-[12px] text-ink-faint">Coming to the App Store</p>
      )}
    </div>
  );
}

/** The post's sections, when it has enough of them to be worth a list. */
function Contents({ headings }: { headings: Heading[] }) {
  if (headings.length < 2) return null;
  return (
    <nav aria-label="In this post">
      <p className="text-[13px] font-semibold">In this post</p>
      <ul className="mt-3 space-y-2 text-[13px] leading-snug text-ink-muted">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} className="transition-colors hover:text-ink">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** The way to the posts on either side. The list runs newest first, so the previous post is the older one. */
function Neighbours({ previous, next }: { previous?: Post; next?: Post }) {
  if (!previous && !next) return null;
  const link = "group flex items-center gap-4 rounded-[20px] bg-track p-3 pr-5 transition-colors hover:bg-[#ececef]";
  return (
    <nav aria-label="More posts" className="mt-20 grid max-w-[680px] gap-3 sm:grid-cols-2">
      {previous && (
        <Link href={`/blog/${previous.slug}`} className={link}>
          <CoverBox cover={previous.meta.cover} small className="w-[72px] shrink-0 !bg-base" />
          <span>
            <span className="text-[13px] text-ink-muted">← Previous</span>
            <span className="mt-0.5 block text-[15px] font-semibold leading-snug tracking-[-0.01em]">{previous.meta.title}</span>
          </span>
        </Link>
      )}
      {next && (
        <Link href={`/blog/${next.slug}`} className={`${link} flex-row-reverse pr-3 pl-5 text-right sm:col-start-2`}>
          <CoverBox cover={next.meta.cover} small className="w-[72px] shrink-0 !bg-base" />
          <span>
            <span className="text-[13px] text-ink-muted">Next →</span>
            <span className="mt-0.5 block text-[15px] font-semibold leading-snug tracking-[-0.01em]">{next.meta.title}</span>
          </span>
        </Link>
      )}
    </nav>
  );
}

/* After Ramp's post page: the header on a grey band, the cover standing over the band's lower edge
   the way the hero's window does, and the text beside a rail that stays in view while it is read.
   No author anywhere (Naol, 2026-10-17): a post signs itself in its last lines if it wants to. */
export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const { meta, Body, headings } = await getPost(slug);
  const posts = await getPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  return (
    <main className="flex-1">
      <article>
        <header
          className={`bg-track pt-[clamp(3rem,7vw,5rem)] ${
            meta.cover ? "pb-[clamp(7rem,15vw,13rem)]" : "pb-[clamp(3rem,6vw,4.5rem)]"
          }`}
        >
          <Wrap wide>
            <p className="text-[13px] text-ink-muted">
              <Link href="/blog" className="hover:text-ink">
                Blog
              </Link>
              <span className="mx-2 text-ink-faint">·</span>
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
              {meta.draft && <span className="ml-2 text-attention">Draft</span>}
            </p>
            <h1 className="mt-3 max-w-[900px] text-balance text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
              {meta.title}
            </h1>
            <p className="mt-5 max-w-[680px] text-[1.25rem] leading-snug text-ink-muted">{meta.summary}</p>
          </Wrap>
        </header>
        {meta.cover && (
          <Wrap wide className="-mt-[clamp(5rem,11vw,10rem)]">
            {/* A window capture has transparent corners, so the shadow is a drop-shadow that follows them. */}
            <Image
              src={meta.cover.src}
              alt={meta.cover.alt}
              width={meta.cover.width / 2}
              height={meta.cover.height / 2}
              unoptimized
              priority
              className="h-auto w-full drop-shadow-[0_24px_40px_rgb(0_0_0/0.18)] max-sm:drop-shadow-[0_10px_20px_rgb(0_0_0/0.14)]"
            />
          </Wrap>
        )}
        <Wrap wide className="py-[clamp(3rem,6vw,4.5rem)]">
          <div className="grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <aside className="hidden lg:block">
              <div className="sticky top-20 space-y-10">
                <Contents headings={headings} />
                <GetMatter />
              </div>
            </aside>
            <div>
              {/* The text keeps to a reading width; a <Figure> (class `wide`) takes the whole column. */}
              <div className="post text-[17px] leading-[1.6] [&>*]:max-w-[680px] [&>.wide]:max-w-none [&>:first-child]:mt-0">
                <Body />
              </div>
              <GetMatter className="mt-16 max-w-[680px] lg:hidden" />
              <Neighbours previous={posts[index + 1]} next={index > 0 ? posts[index - 1] : undefined} />
            </div>
          </div>
        </Wrap>
      </article>
    </main>
  );
}
