import type { Metadata } from "next";
import Image from "next/image";
import lines from "@/content/app-lines.json";
import positioning from "@/content/positioning-lines.json";
import { guideBlock, guideBlocks } from "@/content/guide";
import { FeatureEnd, FeatureIntro } from "@/components/FeatureCard";
import { FeatureSection, MacWindow, Pair, Phone } from "@/components/FeatureSection";
import { InfoBlocks } from "@/components/InfoDoc";
import { loafyWords } from "@/config";

/* The others, in the order Naol gave them on 2026-11-06: the pin, analysis, Loafy, the journal and
   templates. The section ids are the ones the features grid links to (FeatureGroups), so change
   them there too.

   Where the words come from. The sentence at the top and the journal's first paragraph are Naol's,
   from the Positioning page (`npm run check:lines` checks them). The other paragraphs are the User
   Guide's own, quoted through `guideBlocks` and `guideBlock`; the one under the week's review is the
   app's own line; Loafy's is the home page's. All of them are stand-ins until Naol writes this
   page's words, and so are the section headings. The guide says nothing about the Week review yet.
   Do not polish any of it here.

   The app's own names differ from these: the pin opens the notebook, analysis is the Week review,
   and the journal is Standup (the positioning page says Daily Journal). Naming them is Naol's to
   settle.

   The pictures are real captures of both apps on the demo world, held at Tuesday 10 November 2026,
   9:41 (Screenshots/demo-2026-11-06). Loafy's house is the app's own painter's. */

export const metadata: Metadata = {
  title: "Notebook, week review, journal and templates",
  description: positioning.makeSense,
};

const shots = "/shots/v2";

export default function OthersPage() {
  return (
    <main className="flex-1">
      <FeatureIntro statement="Others" sentence={positioning.makeSense} />

      <FeatureSection
        id="pin"
        heading="A notebook that stays with you"
        band
        pictures={
          <Pair
            mac={
              <MacWindow
                keep="right"
                src={`${shots}/mac-notebook.webp`}
                alt="The notebook on the Mac, opened from the pin at the top of the sidebar: three loose lines and a to-do in a panel beside the Tasks board."
              />
            }
            phone={
              <Phone
                src={`${shots}/iphone-notebook.webp`}
                alt="The same notebook on the iPhone, opened from Pin: the same three lines and the to-do."
              />
            }
          />
        }
      >
        <InfoBlocks blocks={guideBlock("navigation", "The sidebar and toolbar", "The **pin**")} />
      </FeatureSection>

      <FeatureSection
        id="analysis"
        heading="A weekly review that writes itself"
        pictures={
          <Pair
            mac={
              <MacWindow
                keep="right"
                src={`${shots}/mac-week-review.webp`}
                alt="The Mac's Week panel beside the Tasks board: 7h 24m of a 12 hour focus budget, where the time went by day and by tag, when in the day the work happens, and how often tasks were pushed."
              />
            }
            phone={
              <Phone
                src={`${shots}/iphone-week-review.webp`}
                alt="The Week review on the iPhone: time against the focus budget, where it went by day and by tag, and when you work."
              />
            }
          />
        }
      >
        <p>{lines.reviewFills.text}</p>
      </FeatureSection>

      <FeatureSection
        id="loafy"
        heading={lines.loafyHome.text}
        band
        side={
          <Image
            src="/shots/loafy-house-light.webp"
            alt={`${lines.loafyHome.text}: a bedroom in the roof, a kitchen and a living room, one above the other, with Loafy napping in the mixing bowl on the kitchen counter.`}
            width={1024}
            height={1536}
            unoptimized
            className="mx-auto h-auto w-full max-w-[340px] rounded-[22px]"
          />
        }
      >
        <p>
          <span className="font-medium text-ink">{lines.loafy.text}</span> {loafyWords}
        </p>
      </FeatureSection>

      <FeatureSection
        id="journal"
        heading="A page for each day"
        pictures={
          <Pair
            mac={
              <MacWindow
                src={`${shots}/mac-standup.webp`}
                alt="A day's page on the Mac, Friday 6 November, under four prompts: what happened, to do today, how I am, and something I noticed, with the past days listed beside it."
              />
            }
            phone={
              <Phone
                src={`${shots}/iphone-standup.webp`}
                alt="The same log on the iPhone: today as a card with a dot for each prompt, then last week's days with the first lines of what was written."
              />
            }
          />
        }
      >
        <p>{positioning.daily}</p>
        <InfoBlocks blocks={guideBlocks("standup")} />
        <InfoBlocks blocks={guideBlocks("standup", "A day's entry")} />
      </FeatureSection>

      <FeatureSection
        id="templates"
        heading="Templates for the work you repeat"
        band
        pictures={
          <Pair
            mac={
              <MacWindow
                keep="right"
                src={`${shots}/mac-templates.webp`}
                alt="The Mac's Templates panel beside the Tasks board: weekly templates with their estimates, days and tags, and a row of squares showing which days of this week each has filled."
              />
            }
            phone={
              <Phone
                src={`${shots}/iphone-templates.webp`}
                alt="Templates on the iPhone: the same weekly templates, each with its estimate, its days and the week's squares."
              />
            }
          />
        }
      >
        <InfoBlocks blocks={guideBlocks("templates", "Creating a template")} />
        <InfoBlocks blocks={guideBlocks("templates", "Applying templates by hand")} />
        <InfoBlocks blocks={guideBlocks("templates", "What its tasks inherit")} />
      </FeatureSection>

      <FeatureEnd next={{ label: "Tasks", href: "/features/tasks" }} guide="/support" />
    </main>
  );
}
