import Link from "next/link";
import lines from "@/content/app-lines.json";
import { CalendarDays } from "@/components/CalendarDays";
import { EditorRefusal } from "@/components/EditorRefusal";
import { Hero } from "@/components/Hero";
import { LoafyHome } from "@/components/LoafyHome";
import { LoafyLadder } from "@/components/LoafyLadder";
import { NoteSlash } from "@/components/NoteSlash";
import { SessionDrop } from "@/components/SessionDrop";
import { MoreCards, type MoreCard } from "@/components/MoreCards";
import { Statement, Wrap } from "@/components/site";

/* Every heading on this page is a line the app says, taken from app-lines.json and checked
   against the Swift source by `npm run check:lines`. The sentences underneath are ours. */

const facts = ["Works offline", "No account", "Syncs through your own iCloud"];

/* The four cards. Each picture is drawn on the page in the app's own look, not photographed, so
   it stays sharp at any size. `span` is the card's share of the twelve columns on a wide screen:
   the wide ones sit on a diagonal, and go to the two pictures that need the room, the list beside
   the session and the three days of the calendar. `frame` is the room the picture gets. On a wide screen every
   picture has the same height and runs off the foot of its card. */
const cards = [
  {
    label: "Tasks",
    line: lines.gate.text,
    body: "Matter counts what you planned against the hours you have left, meetings included, and says when it is too much.",
    picture: <EditorRefusal />,
    frame: "lg:h-[360px]",
    span: "lg:col-span-5",
    href: "/support#capacity",
  },
  {
    label: "Sessions",
    line: lines.dropToStart.text,
    body: "Drag a task into the sidebar and its clock starts. It counts down against your estimate, then keeps going past it.",
    picture: <SessionDrop />,
    frame: "flex items-end lg:h-[360px]",
    span: "lg:col-span-7",
    href: "/support#tasks",
  },
  {
    label: "Calendar",
    line: lines.calendar.text,
    body: "Subscribe to the calendars you already keep. Meetings sit beside your tasks and count against the day.",
    picture: <CalendarDays />,
    frame: "h-[340px] lg:h-[360px]",
    span: "lg:col-span-7",
    href: "/support#calendar",
  },
  {
    label: "Notes",
    line: lines.notes.text,
    body: "A fast editor, a notebook one click away, and room for longer thinking next to the plan.",
    picture: <NoteSlash />,
    frame: "lg:h-[360px]",
    span: "lg:col-span-5",
    href: "/support#notes",
  },
];

/* Under the four cards, two by two: what else is in the app, each with a real capture. Estimates
   ("Usually 45m") is not here because no capture shows it yet. */
const more: MoreCard[] = [
  {
    label: "Week review",
    line: lines.week.text,
    body: "The week's hours by tag and by day, set against what you planned.",
    href: "/support#capacity",
    shot: { src: "/shots/more-week-light.webp", alt: "The week review on the Mac", width: 880, height: 800, phone: false },
  },
  {
    label: "Templates",
    line: lines.templates.text,
    body: "Routines you set once, on the days you pick, and drop onto the week in one go.",
    href: "/support#templates",
    shot: { src: "/shots/more-templates-light.webp", alt: "Weekly templates on the Mac", width: 880, height: 800, phone: false },
  },
  {
    label: "Standup",
    line: lines.addToday.text,
    body: "One entry a day, under the same four headings. A few lines is enough.",
    href: "/support#standup",
    shot: { src: "/shots/more-standup-light.webp", alt: "A standup entry on the iPhone", width: 480, height: 1043, phone: true },
  },
  {
    label: "Home Screen widget",
    line: lines.widget.text,
    body: "The room left in your day, beside Loafy’s house.",
    href: "/support#capacity",
    shot: { src: "/shots/more-widget-light.webp", alt: "The Today widget on the iPhone Home Screen", width: 480, height: 1043, phone: true },
  },
];

function Arrow() {
  return (
    <span
      aria-hidden
      className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-[var(--base)] transition-transform group-hover:translate-x-0.5"
    >
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
    </span>
  );
}

export default function Home() {
  return (
    <main className="flex-1">
      <LoafyLadder />
      <Hero />

      {/* The four cards. Each picture stands at the foot of its card and runs off the bottom, so
          it is shown large enough to read. */}
      <section className="bg-track py-[clamp(4rem,9vw,7rem)]">
        <Wrap wide>
          {/* Centred, like the hero above it and Loafy below. */}
          <Statement className="mx-auto max-w-[17ch] text-center">{lines.tagline.text}</Statement>
          <ul className="rise mt-5 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[15px] text-ink-muted">
            {/* The dot ends an item rather than starting the next, so a line that wraps never
                begins with one. */}
            {facts.map((fact, index) => (
              <li key={fact} className="flex items-center gap-2">
                {fact}
                {index < facts.length - 1 && (
                  <span aria-hidden className="text-ink-faint">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-12 grid gap-4 lg:grid-cols-12">
            {cards.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className={`rise group flex flex-col overflow-hidden rounded-[28px] bg-base ${card.span}`}
              >
                <div className="flex items-start justify-between gap-4 p-8 pb-0">
                  <div>
                    <p className="text-[14px] text-ink-muted">{card.label}</p>
                    <h3 className="mt-1.5 text-balance text-[clamp(1.35rem,2.2vw,1.65rem)] font-semibold leading-[1.15] tracking-[-0.025em]">
                      {card.line}
                    </h3>
                    <p className="mt-3 max-w-[44ch] text-[1rem] leading-relaxed text-ink-muted">{card.body}</p>
                  </div>
                  <Arrow />
                </div>
                <div className="mt-auto px-8 pt-8">
                  <div className={`min-h-0 ${card.frame}`}>{card.picture}</div>
                </div>
              </Link>
            ))}
          </div>

          <MoreCards title="Also in Matter" cards={more} />
        </Wrap>
      </section>

      {/* Loafy, last: the page ends in her house, as wide as the window. The picture is drawn by
          the app's own painter into a box wider than the house, so its floors and roof run out to
          both edges (Screenshots/app-store/tools/loaf-render). The band is about a screen tall,
          so the whole house is in view at once, and a wider window shows more of the floors
          either side of it. */}
      <section className="pt-[clamp(4rem,9vw,7rem)]">
        <div className="px-5 text-center sm:px-6">
          <Statement className="mx-auto max-w-[16ch]">{lines.loafy.text}</Statement>
          <p className="rise mx-auto mt-6 max-w-[44ch] text-[1.1rem] leading-relaxed text-ink-muted">
            Loafy lives in the sidebar of the Mac app, in a house with three floors. There is no
            clock in it, no score and no streak. You look in on her. That is all.
          </p>
        </div>
        <LoafyHome
          alt={`${lines.loafyHome.text}: a bedroom in the roof, a kitchen and a living room, one above the other, with Loafy napping in the mixing bowl on the kitchen counter.`}
        />
      </section>
    </main>
  );
}
