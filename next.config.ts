import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  async redirects() {
    // The guide used to have a page of its own. It lives on /support now.
    return [{ source: "/guide", destination: "/support", permanent: false }];
  },
};

// Blog posts are .mdx files in src/content/blog, imported by app/blog/[slug]. They are not
// routes of their own, so `pageExtensions` stays as it is.
const withMDX = createMDX();

export default withMDX(nextConfig);
