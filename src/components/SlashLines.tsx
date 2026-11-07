import lines from "@/content/app-lines.json";

/* The block editor at the moment "/" is typed, drawn close up for the Block types slot of the
   features containers (Naol, 2026-11-07): two lines of a note, then a third line holding only the
   slash and the caret, with the menu of what the line can become open under it. It is NoteSlash's
   moment without the note's head, larger, so the menu is the picture. The menu is the one thing a
   capture cannot show, because the app pops it as a native menu; its seven choices are the app's,
   from app-lines.json, and its highlight is a quiet fill, since the app has no accent colour. The
   two lines are the end of the demo's Q4 goals note, and they run off the card's right edge, which
   has no padding, and the card itself runs off the slot's right edge, with no corner there, so the
   picture is as close as it can be (Naol, 2026-11-07). It is a picture: nothing in it can be
   pressed. */

const choices = [
  lines.slashText.text,
  lines.slashHeading1.text,
  lines.slashHeading2.text,
  lines.slashHeading3.text,
  lines.slashBulleted.text,
  lines.slashNumbered.text,
  lines.slashTodo.text,
];
const picked = lines.slashBulleted.text;

export function SlashLines() {
  return (
    <div
      role="img"
      aria-label={`Two lines of a note, then a slash typed on a new line, with a menu open under it offering: ${choices.join(", ")}.`}
      className="h-full w-full select-none text-left text-ink [container-type:inline-size]"
    >
      <div
        aria-hidden
        className="relative h-full overflow-hidden rounded-tl-[16px] bg-base pl-6 pt-6 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline [--k:calc(100cqw/230)]"
      >
        <p className="flex gap-[0.6em] whitespace-nowrap text-[calc(var(--k)*16)] leading-[1.5]">
          <span className="tabular-nums text-ink-muted">3.</span>
          Hire the junior designer
        </p>
        <p className="mt-[0.35em] whitespace-nowrap text-[calc(var(--k)*16)] leading-[1.5]">
          Everything else is a <em>maybe</em>. Review at the offsite.
        </p>
        <p className="mt-[0.35em] flex items-center text-[calc(var(--k)*16)] leading-[1.5]">
          /<span className="ml-px h-[1.15em] w-[1.5px] bg-ink" />
        </p>

        <ul
          className="mt-[calc(var(--k)*6)] ml-[calc(var(--k)*6)] rounded-[calc(var(--k)*10)] bg-base p-[calc(var(--k)*5)] shadow-[0_14px_36px_-10px_rgb(0_0_0/0.32)] ring-1 ring-black/10"
          style={{ width: "calc(var(--k) * 180)" }}
        >
          {choices.map((choice) => (
            <li
              key={choice}
              className={`rounded-[calc(var(--k)*6)] px-[calc(var(--k)*10)] text-[calc(var(--k)*15)] leading-[calc(var(--k)*29)] ${choice === picked ? "bg-black/[0.07]" : ""}`}
            >
              {choice}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
