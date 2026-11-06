import type { MetadataRoute } from "next";
import { site } from "@/config";
import { getPosts } from "@/content/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const features = ["", "/tasks", "/notes", "/calendar", "/others"].map((path) => `/features${path}`);
  const pages = ["", ...features, "/support", "/privacy", "/terms", "/press", ...(posts.length ? ["/blog"] : [])].map((path) => ({
    url: `${site.url}${path}`,
  }));
  return [
    ...pages,
    ...posts.map(({ slug, meta }) => ({ url: `${site.url}/blog/${slug}`, lastModified: meta.date })),
  ];
}
