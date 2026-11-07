import { SFBookPages } from "@/components/symbols";

/* A note's sentence with the two things a line can hold besides words, drawn close up for the
   Tokens slot of the features containers (Naol, 2026-11-07): a date set into the sentence as a
   chip, and a link to another note. Measured from the iPhone capture in
   Screenshots/demo-2026-11-06/iphone/12-note-tokens.png and built from InlineAttributedMapper.swift:
   the chip is the app's quiet grey pill, label and fill as alpha over the text colour, and the link
   is the app's book.pages symbol and the note's title in its link ink, the label at 60%. The
   sentence is the demo's Larkspur usability test plan. The card runs off the slot's right edge, with
   no corner there, so the words are as large as the slot allows. It is a picture: nothing in it can
   be pressed. */

const LINK = "rgb(29 29 31 / 0.6)";

function Chip({ children }: { children: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "0 0.5em",
        borderRadius: "999px",
        background: "rgb(0 0 0 / 0.07)",
        color: "rgb(0 0 0 / 0.55)",
        lineHeight: 1.3,
        verticalAlign: "baseline",
      }}
    >
      {children}
    </span>
  );
}

export function InlineTokens() {
  return (
    <div
      role="img"
      aria-label="A sentence from a note: Three sessions at the Saldanha clinic on Thursday, with Thursday set in as a date chip, and at its end a link to another note, Recruiting tracker, with the app's book symbol."
      className="h-full w-full select-none text-left text-ink [container-type:inline-size]"
    >
      <div
        aria-hidden
        className="relative h-full overflow-hidden rounded-tl-[16px] bg-base pl-6 pr-4 pt-6 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline [--k:calc(100cqw/230)]"
      >
        <p className="text-[calc(var(--k)*16)] leading-[1.5]">
          Three sessions at the Saldanha clinic on <Chip>Thursday</Chip>.
          Forty-five minutes each, with ten between. Who is coming is in the{" "}
          <span className="whitespace-nowrap" style={{ color: LINK }}>
            <SFBookPages className="mr-[0.2em] inline-block size-[0.95em] align-[-0.12em]" />
            Recruiting tracker
          </span>
          .
        </p>
      </div>
    </div>
  );
}
