/* Lines from the demo's notes with the five ways a run of words can be set, drawn close up for the
   Inline formatting slot of the features containers (Naol, 2026-11-07): a highlight, a
   strikethrough, bold, italic and an underline, one each, from five different notes as the demo
   world writes them (DemoWorld+Content.swift). The highlight is the app's, system yellow at 30%
   (DukaPalette.noteHighlight); the rest are the type's own. The card runs off the slot's right
   edge, with no corner there, and the lines run off its foot. It is a picture: nothing in it can
   be pressed. */

const HIGHLIGHT = "rgb(255 204 0 / 0.3)";

export function InlineFormats() {
  return (
    <div
      role="img"
      aria-label="Five lines from notes, each with one kind of inline formatting: a phrase highlighted in yellow, a phrase struck through, a phrase in bold, a word in italic, and a phrase underlined."
      className="h-full w-full select-none text-left text-ink [container-type:inline-size]"
    >
      <div
        aria-hidden
        className="relative h-full space-y-[0.45em] overflow-hidden rounded-tl-[16px] bg-base pl-6 pr-4 pt-6 text-[calc(var(--k)*16)] leading-[1.5] shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline [--k:calc(100cqw/230)]"
      >
        <p>
          Newest first. Decisions in{" "}
          <mark style={{ background: HIGHLIGHT, color: "inherit" }}>
            yellow
          </mark>
          , so I can find them later.
        </p>
        <p>
          Pilot starts in <s>three clinics</s> two clinics
        </p>
        <p>
          Fixed fee, fixed length, named people. We sell{" "}
          <strong className="font-bold">an answer</strong>, not hours.
        </p>
        <p>
          Everything else is a <em>maybe</em>. Review at the offsite.
        </p>
        <p>
          If something here is wrong,{" "}
          <u className="underline-offset-2">fix it</u> rather than tell me.
        </p>
      </div>
    </div>
  );
}
