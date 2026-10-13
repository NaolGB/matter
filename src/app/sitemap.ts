import type { MetadataRoute } from "next";
import { site } from "@/config";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/support", "/privacy"].map((path) => ({ url: `${site.url}${path}` }));
}
