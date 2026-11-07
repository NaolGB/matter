import type { Metadata } from "next";
import Link from "next/link";
import positioning from "@/content/positioning-lines.json";
import { getFeaturePages } from "@/content/feature-pages";
import { featureTree } from "@/content/feature-tree";
import { Wrap } from "@/components/site";

/* The full list of features, which the bar's Features link opens. The home page has the highlights
   and the pictures, so this page is plain rows, for finding one feature. It has no one-line
   summaries yet: those are Naol's words. A feature whose page is not out yet has no link. */

export const metadata: Metadata = {
  title: "Features",
  description: positioning.whatItIs,
};

export default async function FeaturesPage() {
  const published = new Set((await getFeaturePages()).map((page) => page.slug));
  return (
    <main className="flex-1">
      <Wrap wide className="py-[clamp(3rem,7vw,5rem)]">
        <h1 className="text-balance text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
          Features
        </h1>
        <div className="mt-10 divide-y divide-hairline border-t border-hairline">
          {featureTree.map((group) => (
            <section
              key={group.id}
              id={group.id}
              className="grid scroll-mt-12 gap-4 py-8 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10"
            >
              <h2 className="text-[1.25rem] font-semibold leading-snug tracking-[-0.015em]">{group.name}</h2>
              <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {group.features.map((feature) => (
                  <li key={feature.slug} className="text-[17px] leading-snug">
                    {published.has(feature.slug) ? (
                      <Link href={`/features/${feature.slug}`} className="font-medium underline-offset-4 hover:underline">
                        {feature.name}
                      </Link>
                    ) : (
                      <span className="text-ink-muted">{feature.name}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Wrap>
    </main>
  );
}
