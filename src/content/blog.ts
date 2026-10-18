import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import { slugify } from "@/content/slug";

/**
 * A post is one .mdx file in src/content/blog, named for its address (`first-week.mdx` is
 * /blog/first-week). It opens with `export const meta = { ... }` in this shape.
 *
 * A post is dated and says what was true that day, so it may describe the app as it was. That is
 * why posts are not checked by `check:lines`: only the home page has to match the app of today.
 */
export type PostMeta = {
  title: string;
  /** The day it is published, as YYYY-MM-DD. Posts are listed newest first by this. */
  date: string;
  /** One or two sentences, shown in the list, the feed and the link preview. */
  summary: string;
  /** The picture at the top of the post and beside it in the list: a path in public/, its size in pixels (shown at half). */
  cover?: { src: string; width: number; height: number; alt: string };
  /** The link-preview picture, a path in public/ at 1200 x 630. Without it, the site's own. */
  image?: string;
  /** Shown by `next dev` and left out of the built site. */
  draft?: boolean;
};

export type Heading = { id: string; text: string };

export type Post = { slug: string; meta: PostMeta; Body: MDXContent; headings: Heading[] };

const folder = path.join(process.cwd(), "src/content/blog");
const showDrafts = process.env.NODE_ENV !== "production";

function slugs() {
  return readdirSync(folder)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.slice(0, -".mdx".length));
}

/**
 * The post's `##` sections, read from its source for the list beside the text. The ids match the
 * ones the h2 in mdx-components.tsx gives itself. Lines inside code blocks are skipped.
 */
function headings(source: string): Heading[] {
  const found: Heading[] = [];
  let code = false;
  for (const line of source.split("\n")) {
    if (line.startsWith("```")) code = !code;
    if (code || !line.startsWith("## ")) continue;
    const text = line
      .slice(3)
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    found.push({ id: slugify(text), text });
  }
  return found;
}

export async function getPost(slug: string): Promise<Post> {
  const file = await import(`@/content/blog/${slug}.mdx`);
  const source = readFileSync(path.join(folder, `${slug}.mdx`), "utf8");
  return { slug, meta: file.meta as PostMeta, Body: file.default, headings: headings(source) };
}

/** Every post the site shows, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await Promise.all(slugs().map(getPost));
  return posts
    .filter((post) => showDrafts || !post.meta.draft)
    .sort((a, b) => b.meta.date.localeCompare(a.meta.date));
}

/** "17 October 2026", the way /privacy writes its date. */
export function formatDate(date: string) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
