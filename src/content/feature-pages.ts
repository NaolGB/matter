import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import { headings, type Heading } from "@/content/blog";

/**
 * A feature page is one .mdx file in src/content/features, named for its address (`tags.mdx` is
 * /features/tags), set with the same components as a blog post. Its title comes from feature-tree.ts.
 * It opens with `export const meta` in this shape.
 *
 * Unlike a post, it says what the app does today. Its how-to text is written from the app's source
 * as a draft for Naol to edit (DESIGN.md), so it has to change when the app does: check a page
 * against the Swift before relying on it. Nothing checks its button names automatically.
 */
export type FeaturePageMeta = {
  /** One or two sentences, shown under the title and in the link preview. */
  summary: string;
  /** The text opens with the summary's own words, so it is only used for the link preview. */
  hideSummary?: boolean;
  /** The slugs of features to link to at the foot of the page. */
  related?: string[];
  /** Shown by `next dev` and left out of the built site, for a page that has no words yet. */
  draft?: boolean;
};

export type FeaturePage = { slug: string; meta: FeaturePageMeta; Body: MDXContent; headings: Heading[] };

const folder = path.join(process.cwd(), "src/content/features");
const showDrafts = process.env.NODE_ENV !== "production";

export async function getFeaturePage(slug: string): Promise<FeaturePage> {
  const file = await import(`@/content/features/${slug}.mdx`);
  const source = readFileSync(path.join(folder, `${slug}.mdx`), "utf8");
  return { slug, meta: file.meta as FeaturePageMeta, Body: file.default, headings: headings(source) };
}

/** Every feature page the site shows. */
export async function getFeaturePages(): Promise<FeaturePage[]> {
  const slugs = readdirSync(folder)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.slice(0, -".mdx".length));
  const pages = await Promise.all(slugs.map(getFeaturePage));
  return pages.filter((page) => showDrafts || !page.meta.draft);
}
