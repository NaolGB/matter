import Link from "next/link";
import lines from "@/content/app-lines.json";
import positioning from "@/content/positioning-lines.json";
import { FeatureGroups } from "@/components/FeatureGroups";
import { Hero } from "@/components/Hero";
import { LoafyHome } from "@/components/LoafyHome";
import { LoafyLadder } from "@/components/LoafyLadder";
import { Download, Statement, Wrap } from "@/components/site";
import { loafyWords } from "@/config";

/* The words on this page come from two places. Lines the app says come from app-lines.json.
   Everything marked `positioning` is Naol's, word for word from Scout's Positioning page, through
   positioning-lines.json. `npm run check:lines` fails when either source
   has moved on. Do not write new sentences here; add them to the Positioning page first. */

export default function Home() {
  return (
    <main className="flex-1">
      <LoafyLadder />
      <Hero />

      {/* The features, labeled as such (Naol, 2026-11-06): three containers, Tasks across the top
          and Notes and Calendar under it, and the others in a grid (see FeatureGroups). Each
          picture opens its part of the feature's page. */}
      <section id="features" className="scroll-mt-12 bg-track py-[clamp(4rem,9vw,7rem)]">
        <Wrap wide>
          <div className="mb-[clamp(1.75rem,3.5vw,2.75rem)] flex items-end justify-between gap-6">
            <Statement>Features</Statement>
            <Link href="/features" className="shrink-0 pb-1.5 text-[15px] text-ink-muted transition-colors hover:text-ink">
              All features
            </Link>
          </div>
          <FeatureGroups />
        </Wrap>
      </section>

      {/* The foot of the page (Naol, 2026-11-06): the problem in Naol's words on one side and
          Loafy's house on the other, sharing the width, and then the way to get the app. The house
          is the app's own painter's, with her napping in the mixing bowl once the reader reaches
          the end of the page (see LoafyHome). On a narrow screen the house goes under the words. */}
      <section className="pt-[clamp(4rem,9vw,7rem)]">
        <Wrap wide>
          <div className="grid items-center gap-x-12 gap-y-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div>
              <Statement as="p" className="max-w-[22ch]">
                {positioning.problemLead}
              </Statement>
              <div className="rise mt-8 max-w-[56ch] space-y-4 text-[1.1rem] leading-relaxed text-ink-muted">
                <p>{positioning.problemKnows}</p>
                <p>{positioning.problemEnd}</p>
                <p className="font-medium text-ink">{positioning.problemTurn}</p>
              </div>
            </div>
            <div>
              <LoafyHome
                className="mx-auto w-full max-w-[400px]"
                alt={`${lines.loafyHome.text}: a bedroom in the roof, a kitchen and a living room, one above the other, with Loafy napping in the mixing bowl on the kitchen counter.`}
              />
              <p className="rise mx-auto mt-5 max-w-[400px] text-center text-[15px] leading-relaxed text-ink-muted">
                <span className="font-medium text-ink">{lines.loafy.text}</span> {loafyWords}
              </p>
            </div>
          </div>
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
