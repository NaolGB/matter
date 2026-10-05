import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Footer, Nav } from "@/components/site";
import "./globals.css";

// Apple hardware gets SF from the system stack in globals.css. Inter is the
// fallback for everyone else, so it is the only face worth downloading.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Matter: plan the day you actually have",
    template: "%s · Matter",
  },
  description:
    "Matter is a planner for Mac and iPhone that knows how much a day holds. It works offline, with no account, and keeps everything on your own devices.",
};

// Always light: see the note on :root in globals.css.
export const viewport: Viewport = {
  colorScheme: "only light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
