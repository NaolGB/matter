import Link from "next/link";
import lines from "@/content/app-lines.json";
import { CalendarDays } from "@/components/CalendarDays";
import { EditorRefusal } from "@/components/EditorRefusal";
import { Hero } from "@/components/Hero";
import { LoafyHome } from "@/components/LoafyHome";
import { LoafyLadder } from "@/components/LoafyLadder";
import { NoteSlash } from "@/components/NoteSlash";
import { SessionDrop } from "@/components/SessionDrop";
import { CardArrow, Statement, Wrap } from "@/components/site";
import { placeholder } from "@/config";

/* Every heading on this page is a line the app says, taken from app-lines.json and checked
   against the Swift source by `npm run check:lines`. The sentences underneath are ours. */

/* The four cards, all at the hero's moment (the demo world on Tuesday 13 October at 9:41, with the
   story running since 9:21). Each picture is drawn on the page in the app's look, measured from
   real captures (Screenshots/hero-2026-10-12/cards) and built from the app's own views, so it can
   show what a capture cannot (a drag in progress, a native menu, a week legible at card size) and
   can be changed here when the app changes. `span` is the card's share of the twelve columns on a
   wide screen: the wide ones sit on a diagonal, and go to the two pictures that need the room, the
   session beside its list and the three days of the calendar. `frame` is the room the picture
   gets. The task sheet is drawn at the app's own size and runs off the card's right edge on any
   screen wider than a phone; the others stand at the foot of the card and run off it. */
const cards = [
  {
    label: "Tasks",
    line: lines.gate.text,
    body: "Matter counts what you planned against the hours you have left, meetings included, and says when it is too much.",
    picture: <EditorRefusal />,
    frame: "flex items-center pb-8 sm:-mr-8 lg:h-[360px]",
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
    frame: "overflow-hidden lg:h-[360px]",
    span: "lg:col-span-7",
    href: "/support#calendar",
  },
  {
    label: "Notes",
    line: placeholder.notes,
    body: "A fast editor, a notebook one click away, and room for longer thinking next to the plan.",
    picture: <NoteSlash />,
    frame: "overflow-hidden lg:h-[360px]",
    span: "lg:col-span-5",
    href: "/support#notes",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <LoafyLadder />
      <Hero />

      {/* The four cards. The pictures cut from the window stand at the foot of their card and run
          off it, so each is shown large enough to read. */}
      <section className="bg-track py-[clamp(4rem,9vw,7rem)]">
        <Wrap wide>
          <div className="grid gap-4 lg:grid-cols-12">
            {cards.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className={`rise group flex flex-col overflow-hidden rounded-[28px] bg-base ${card.span}`}
              >
                <div className="flex items-start justify-between gap-4 p-8 pb-0">
                  <div>
                    <p className="text-[13px] text-ink-muted">{card.label}</p>
                    <h3 className="mt-1.5 text-balance text-[clamp(1.35rem,2.2vw,1.65rem)] font-semibold leading-[1.15] tracking-[-0.025em]">
                      {card.line}
                    </h3>
                    <p className="mt-3 max-w-[44ch] text-[1rem] leading-relaxed text-ink-muted">{card.body}</p>
                  </div>
                  <CardArrow />
                </div>
                <div className="mt-auto px-8 pt-8">
                  <div className={`min-h-0 ${card.frame}`}>
                    {card.picture}
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </Wrap>
      </section>

      {/* Loafy, last: the page ends in her house, as the app's own painter draws it, with her
          napping in the mixing bowl (see LoafyHome). */}
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
