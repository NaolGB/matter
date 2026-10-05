import lines from "@/content/app-lines.json";

/* A note at the moment "/" is typed, drawn in the app's own look: the icon and title, the tags,
   a heading, a list, and the menu of what the line can become. It is a picture: nothing in it
   can be pressed. The note is one of the demo's, cut short. The menu's seven choices are the
   app's, from app-lines.json. On a wide screen the card cuts the picture off part way down the
   menu; on a narrow one it is shown whole. */

const tags = [
  { label: "Larkspur Health", hue: "#30D158" },
  { label: "Research", hue: "#40C8E0" },
];

const items = [
  "Walk me through the last time you saw a new doctor.",
  "What did you have to bring, and how did you know?",
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
      aria-label={`A note called Interview guide: intake, with a heading and a numbered list. A slash has been typed on a new line and a menu offers: ${choices.join(", ")}.`}
      className="select-none rounded-t-[16px] bg-base px-6 pb-6 pt-5 text-left shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline sm:px-7"
    >
      <div aria-hidden>
        <p className="flex items-center gap-3 text-[clamp(1.25rem,2.4vw,1.5rem)] font-bold leading-tight tracking-[-0.02em]">
          <span className="text-[1.05em]">🎙️</span>
          Interview guide: intake
        </p>
        <p className="mt-2.5 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className="rounded-full px-2.5 py-[3px] text-[12.5px] font-semibold"
              style={{
                background: `color-mix(in srgb, ${tag.hue} 16%, transparent)`,
                color: `color-mix(in srgb, ${tag.hue} 78%, black)`,
              }}
            >
              {tag.label}
            </span>
          ))}
        </p>

        <div className="pl-3.5">
          <p className="mt-5 text-[22px] font-bold leading-tight tracking-[-0.02em]">Intake interviews</p>
          <ol className="mt-2 space-y-1 text-[14.5px] leading-[1.5]">
            {items.map((item, index) => (
              <li key={item} className="flex gap-2.5">
                <span className="tabular-nums text-ink-muted">{index + 1}.</span>
                {item}
              </li>
            ))}
          </ol>
          <p className="mt-0.5 flex items-center text-[14.5px] leading-[1.5]">
            /<span className="ml-px h-[1.15em] w-[1.5px] bg-[#0a84ff]" />
          </p>

          <ul className="ml-2 mt-1 w-[188px] rounded-[10px] bg-base p-[5px] shadow-[0_14px_36px_-10px_rgb(0_0_0/0.32)] ring-1 ring-black/10">
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
