import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer, Nav } from "@/components/site";
import { site } from "@/config";
import { getPosts } from "@/content/blog";
import "./globals.css";

// Apple hardware gets SF from the system stack in globals.css. Inter is the
// fallback for everyone else, so it is the only face worth downloading.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Matter: plan the day you actually have",
    template: "%s · Matter",
  },
  description:
    "Matter is a planner for the Mac and iPhone that knows how much a day holds. It works offline, with no account, and keeps everything on your devices and in your own iCloud.",
};

// Always light: see the note on :root in globals.css.
export const viewport: Viewport = {
  colorScheme: "only light",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // The bar and the footer link to the blog only once it has a post to show.
  const blog = (await getPosts()).length > 0;
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Nav blog={blog} />
        {children}
        <Footer blog={blog} />
      </body>
    </html>
  );
}
