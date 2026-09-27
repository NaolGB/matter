import type { Metadata } from "next";
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
    default: "Matter",
    template: "%s · Matter",
  },
  description:
    "A calm, local-first place for your tasks and time on the Mac and iPhone. Matter plans against the room a day actually has, keeps the clock running while you work, and keeps your data on your own devices.",
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
