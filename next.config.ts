import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The guide used to have a page of its own. It lives on /support now.
    return [{ source: "/guide", destination: "/support", permanent: false }];
  },
};

export default nextConfig;
