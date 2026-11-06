import type { Metadata } from "next";
import positioning from "@/content/positioning-lines.json";
import { guideBlock, guideBlocks } from "@/content/guide";
import { FeatureEnd, FeatureIntro } from "@/components/FeatureCard";
import { Crop, FeatureSection, MacWindow, Pair, Phone } from "@/components/FeatureSection";
import { InfoBlocks } from "@/components/InfoDoc";
import { NoteSlash } from "@/components/NoteSlash";
import { Wrap } from "@/components/site";

/* Notes, with Naol's three features first (2026-11-06): block types, tokens and inline formatting.
   The section ids are the ones the features containers link to (FeatureGroups), so change them
   there too. The page for each day moved to /features/others with the journal.

   Where the words come from. The statement, the sentence under it and the first paragraph of the
   first section are Naol's, from the Positioning page (`npm run check:lines` checks them). Every
   other paragraph is the User Guide's own, quoted through `guideBlocks` and `guideBlock`: a
   stand-in until Naol writes this page's words. The section headings are stand-ins too. Do not
   polish any of it here.

   The guide does not yet cover links between notes, highlights or find, which the captures show.

   The pictures are real captures of both apps on the demo world, held at Tuesday 10 November 2026,
   9:41 (Screenshots/demo-2026-11-06). The slash menu is drawn, because the app pops it as a native
   menu a capture cannot hold. */

export const metadata: Metadata = {
  title: "Notes",
  description: positioning.together,
};

const shots = "/shots/v2";

/** The guide's lines about the editor that begin with one of `starts`, as the guide has them. */
function editor(...starts: string[]) {
  return guideBlocks("notes", "The block editor").filter((block) => starts.some((start) => block.text.startsWith(start)));
}

export default function NotesPage() {
  return (
    <main className="flex-1">
      <FeatureIntro statement={positioning.notJustTasks} sentence={positioning.together} />

      <section className="pb-[clamp(3.5rem,8vw,6.5rem)]">
        <Wrap wide>
          <Pair
            mac={
              <MacWindow
                src={`${shots}/mac-note.webp`}
                alt="A note on the Mac, Larkspur weekly sync notes: headings, bullets, decisions highlighted in yellow, a ticked to-do with one nested under it, a struck-through phrase and a link to another note, beside the list of folders and notes."
              />
            }
            phone={
              <Phone
                src={`${shots}/iphone-note.webp`}
                alt="The same note on the iPhone, with its highlights, to-dos and the link to another note."
              />
            }
          />
        </Wrap>
      </section>

      <FeatureSection
        id="block-types"
        heading="A notes app beside your tasks"
        band
        side={
          // The picture stands at the foot of a white card and runs off it, as it does on the home page.
          <div className="overflow-hidden rounded-[28px] bg-base px-8 pt-8">
            <div className="overflow-hidden lg:h-[380px]">
              <NoteSlash />
            </div>
          </div>
        }
      >
        <p>{positioning.notes}</p>
        <InfoBlocks blocks={editor("Notes (and Standup)", "**Block types:**", "**Indent**")} />
      </FeatureSection>

      <FeatureSection
        id="tokens"
        heading="Dates and links inside a note"
        side={
          <Crop
            className="mx-auto w-full max-w-[480px]"
            src={`${shots}/tile-tokens.webp`}
            width={1158}
            height={410}
            caption="A date and a link to another note, on the iPhone"
            alt="A note on the iPhone, Usability test plan: a date set into its sentence as a chip, Thursday, and a link to another note, Recruiting tracker."
          />
        }
      >
        <InfoBlocks blocks={guideBlock("notes", "The block editor", "**Date chips:**")} />
      </FeatureSection>

      <FeatureSection
        id="inline-formatting"
        heading="Inline formatting"
        band
        side={
          <Crop
            className="mx-auto w-full max-w-[560px]"
            src={`${shots}/tile-formatting.webp`}
            width={1040}
            height={310}
            caption="Mac"
            alt="Lines of a note on the Mac: one highlighted in yellow, one with a phrase struck through, and a link to another note."
          />
        }
      >
        <InfoBlocks blocks={guideBlock("notes", "The block editor", "**Inline formatting:**")} />
        <InfoBlocks blocks={guideBlock("notes", "The block editor", "**Keyboard:**")} />
        <InfoBlocks blocks={guideBlock("notes", "The block editor", "Your edits save")} />
      </FeatureSection>

      <FeatureSection
        id="folders-and-search"
        heading="Folders, and search across every note"
        pictures={
          <Pair
            mac={
              <MacWindow
                src={`${shots}/mac-notes-folders.webp`}
                alt="Notes on the Mac: folders in the sidebar with one open, and a note that lists links to four other notes."
              />
            }
            phone={
              <Phone
                src={`${shots}/iphone-notes.webp`}
                alt="Notes on the iPhone: recent notes as cards, then the folders with how many notes each holds, then the notes in no folder."
              />
            }
          />
        }
      >
        <InfoBlocks blocks={guideBlocks("notes")} />
        <InfoBlocks blocks={guideBlocks("notes", "Organizing notes")} />
      </FeatureSection>

      <FeatureEnd next={{ label: "Calendar", href: "/features/calendar" }} guide="/support#notes" />
    </main>
  );
}
