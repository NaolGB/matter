import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Apple hardware gets SF from the system stack in globals.css. Inter is the
// fallback for everyone else, so it is the only face worth downloading.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matter",
  description:
    "A local-first planner for Mac and iPhone. Plans against the room a day actually has, and keeps your data on your own devices.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
