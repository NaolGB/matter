import { site } from "@/config";
import { getPosts } from "@/content/blog";

// Written once at build time, like the pages.
export const dynamic = "force-static";

function escape(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export async function GET() {
  const posts = await getPosts();
  const items = posts
    .map(({ slug, meta }) => {
      const url = `${site.url}/blog/${slug}`;
      return `    <item>
      <title>${escape(meta.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(`${meta.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escape(meta.summary)}</description>
    </item>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Matter Blog</title>
    <link>${site.url}/blog</link>
    <description>Notes from making Matter, a planner for the Mac that knows how much a day holds.</description>
    <language>en</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
