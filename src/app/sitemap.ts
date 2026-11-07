import type { MetadataRoute } from "next";
import { site } from "@/config";
import { getPosts } from "@/content/blog";
import { getFeaturePages } from "@/content/feature-pages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const features = ["/features", ...(await getFeaturePages()).map(({ slug }) => `/features/${slug}`)];
  const pages = ["", ...features, "/support", "/privacy", "/terms", "/press", ...(posts.length ? ["/blog"] : [])].map((path) => ({
    url: `${site.url}${path}`,
  }));
  return [
    ...pages,
    ...posts.map(({ slug, meta }) => ({ url: `${site.url}/blog/${slug}`, lastModified: meta.date })),
  ];
}
