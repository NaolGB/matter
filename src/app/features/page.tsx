import type { Metadata } from "next";
import positioning from "@/content/positioning-lines.json";
import { FeatureIntro } from "@/components/FeatureCard";
import { FeatureGroups } from "@/components/FeatureGroups";
import { Download, Wrap } from "@/components/site";

/* The way in to the four feature pages, kept thin on purpose: the containers are the home page's
   own (FeatureGroups), and the only sentence is Naol's, from the Positioning page. The bar's
   Features link comes here. */

export const metadata: Metadata = {
  title: "Features",
  description: positioning.whatItIs,
};

export default function FeaturesPage() {
  return (
    <main className="flex-1">
      <FeatureIntro statement="Features" sentence={positioning.whatItIs} />

      <section className="bg-track py-[clamp(4rem,9vw,7rem)]">
        <Wrap wide>
          <FeatureGroups />
        </Wrap>
      </section>

      <section className="py-[clamp(3rem,6vw,5rem)]">
        <Wrap wide className="flex flex-wrap justify-center gap-3">
          <Download primary />
          <Download device="iphone" />
        </Wrap>
      </section>
    </main>
  );
}
