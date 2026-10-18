import type { MetadataRoute } from "next";
import { site } from "@/config";
import { getPosts } from "@/content/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const pages = ["", "/support", "/privacy", ...(posts.length ? ["/blog"] : [])].map((path) => ({
    url: `${site.url}${path}`,
  }));
  return [
    ...pages,
    ...posts.map(({ slug, meta }) => ({ url: `${site.url}/blog/${slug}`, lastModified: meta.date })),
  ];
}
