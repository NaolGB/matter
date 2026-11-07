import lines from "@/content/app-lines.json";
import { SFCalendar, SFWrenchAndScrewdriver } from "@/components/symbols";

/* A note at the moment "/" is typed, drawn in the app's own look (from the capture in
   Screenshots/hero-2026-10-12/cards): the emoji and title, the tags as symbol and name, a heading,
   a numbered list, a line of text, and the menu of what the new line can become. It is a picture:
   nothing in it can be pressed. The note is the demo world's Q4 goals. The menu is the one thing
   the capture could not show, because the app pops it as a native menu; its seven choices are
   the app's, from app-lines.json. Its highlight is a quiet fill, since the app has no accent
   colour. On a wide screen the card cuts the picture off part way down the menu. */

const tags = [
  { label: "Studio ops", symbol: SFWrenchAndScrewdriver },
  { label: "Q4 planning", symbol: SFCalendar },
];

const items = [
  "Ship the Larkspur intake handoff without a scramble",
  "Win Mosaic, or learn exactly why not",
  "Hire the junior designer",
];

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

export function NoteSlash() {
  return (
    <div
      role="img"
      aria-label={`A note called Q4 goals, with the heading Q4, three things and a numbered list. A slash has been typed on a new line and a menu offers: ${choices.join(", ")}.`}
      className="select-none rounded-t-[16px] bg-base px-6 pb-6 pt-5 text-left shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline sm:px-7"
    >
      <div aria-hidden>
        <p className="flex items-center gap-2.5 text-[clamp(1.25rem,2.4vw,1.5rem)] font-bold leading-tight tracking-[-0.02em]">
          <span className="text-[1.05em]">🎯</span>
          Q4 goals
        </p>
        <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-muted"
            >
              <tag.symbol className="size-[13px]" />
              {tag.label}
            </span>
          ))}
        </p>

        <div className="pl-3.5">
          <p className="mt-5 text-[22px] font-bold leading-tight tracking-[-0.02em]">
            Q4, three things
          </p>
          <ol className="mt-2 space-y-1 text-[14.5px] leading-[1.5]">
            {items.map((item, index) => (
              <li key={item} className="flex gap-2.5">
                <span className="tabular-nums text-ink-muted">
                  {index + 1}.
                </span>
                {item}
              </li>
            ))}
          </ol>
          <p className="mt-1 text-[14.5px] leading-[1.5]">
            Everything else is a <em>maybe</em>. Review at the offsite.
          </p>
          <p className="mt-0.5 flex items-center text-[14.5px] leading-[1.5]">
            /<span className="ml-px h-[1.15em] w-[1.5px] bg-ink" />
          </p>

          <ul className="ml-2 mt-1 w-[188px] max-w-[calc(100%-0.5rem)] rounded-[10px] bg-base p-[5px] shadow-[0_14px_36px_-10px_rgb(0_0_0/0.32)] ring-1 ring-black/10">
            {choices.map((choice) => (
              <li
                key={choice}
                className={`rounded-[6px] px-2.5 text-[13.5px] leading-[25px] ${choice === picked ? "bg-black/[0.07]" : ""}`}
              >
                {choice}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
