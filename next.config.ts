import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  async redirects() {
    // The User Guide became the feature pages on 2026-11-07. The four feature pages of 2026-11-06
    // are split into a page per feature, listed on /features under these groups.
    return [
      { source: "/guide", destination: "/features", permanent: false },
      ...["tasks", "notes", "calendar", "others"].map((group) => ({
        source: `/features/${group}`,
        destination: `/features#${group}`,
        permanent: false,
      })),
    ];
  },
};

// Blog posts are .mdx files in src/content/blog, imported by app/blog/[slug]. They are not
// routes of their own, so `pageExtensions` stays as it is.
const withMDX = createMDX();

export default withMDX(nextConfig);
