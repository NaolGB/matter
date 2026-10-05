import Link from "next/link";
import lines from "@/content/app-lines.json";
import { site } from "@/config";
import { CalendarDays } from "@/components/CalendarDays";
import { EditorRefusal } from "@/components/EditorRefusal";
import { Hero } from "@/components/Hero";
import { NoteSlash } from "@/components/NoteSlash";
import { SessionDrop } from "@/components/SessionDrop";
import { Shot, Statement, StoreStatus, Wrap } from "@/components/site";

/* Every heading on this page is a line the app says, taken from app-lines.json and checked
   against the Swift source by `npm run check:lines`. The sentences underneath are ours. */

const facts = ["Works offline", "No account", "Syncs through your own iCloud"];

/* The four cards. Each picture is drawn on the page in the app's own look, not photographed, so
   it stays sharp at any size. `span` is the card's share of the twelve columns on a wide screen:
   the wide ones sit on a diagonal. `frame` is the room the picture gets. On a wide screen every
   picture has the same height and runs off the foot of its card. */
const cards = [
  {
    label: "Tasks",
    line: lines.gate.text,
    body: "Matter counts what you planned against the hours you have left, meetings included, and says when it is too much.",
    picture: <EditorRefusal />,
    frame: "lg:h-[360px]",
    span: "lg:col-span-7",
    href: "/support#capacity",
  },
  {
    label: "Sessions",
    line: lines.dropToStart.text,
    body: "Drag a task into the sidebar and its clock starts. It counts down against your estimate, then keeps going past it.",
    picture: <SessionDrop />,
    frame: "flex items-end lg:h-[360px]",
    span: "lg:col-span-5",
    href: "/support#tasks",
  },
  {
    label: "Calendar",
    line: lines.calendar.text,
    body: "Subscribe to the calendars you already keep. Meetings sit beside your tasks and count against the day.",
    picture: <CalendarDays />,
    frame: "h-[340px] lg:h-[360px]",
    span: "lg:col-span-5",
    href: "/support#calendar",
  },
  {
    label: "Notes",
    line: lines.notes.text,
    body: "A fast editor, a notebook one click away, and room for longer thinking next to the plan.",
    picture: <NoteSlash />,
    frame: "lg:h-[360px]",
    span: "lg:col-span-7",
    href: "/support#notes",
  },
];

/* Five more, small. Each has a mark in one of the app's tag colours, what it is, the app's own
   words for it and a line of ours. They are laid out unevenly on purpose: a small one beside a
   wide one, then a wide one beside two small ones. */
const more = [
  {
    label: "Estimates",
    line: lines.usually.text,
    body: "After enough finished work, Matter suggests how long that kind of task runs.",
    href: "/support#capacity",
    icon: "M10 5.5V10l3 2M10 2.75a7.25 7.25 0 1 0 0 14.5 7.25 7.25 0 0 0 0-14.5z",
    hue: "#0A84FF",
    glyph: "#ffffff",
    span: "lg:col-span-4",
  },
  {
    label: "Standup",
    line: lines.addToday.text,
    body: "One entry a day, under the same four headings. A few lines is enough.",
    href: "/support#standup",
    icon: "M5 6h10M5 10h10M5 14h6",
    hue: "#FF9F0A",
    glyph: "#1d1d1f",
    span: "lg:col-span-8",
  },
  {
    label: "Week review",
    line: lines.week.text,
    body: "The week's hours by tag and by day, set against what you planned.",
    href: "/support#capacity",
    icon: "M4.5 16V9.5M10 16V4M15.5 16v-4.5",
    hue: "#30D158",
    glyph: "#1d1d1f",
    span: "lg:col-span-6",
  },
  {
    label: "Templates",
    line: lines.templates.text,
    body: "Routines you set once and drop onto the week in one go.",
    href: "/support#templates",
    icon: "M7 7V4.5h8.5V13H13M4.5 7H13v8.5H4.5z",
    hue: "#5E5CE6",
    glyph: "#ffffff",
    span: "lg:col-span-3",
  },
  {
    label: "Home Screen widget",
    line: lines.widget.text,
    body: "The room left in your day, beside Loafy’s house.",
    href: "/support#capacity",
    icon: "M4 4h12v12H4zM4 10h12M10 4v12",
    hue: "#FF375F",
    glyph: "#ffffff",
    span: "sm:col-span-2 lg:col-span-3",
  },
];

const devices = [
  {
    name: "Matter for Mac",
    body: "The board, the calendar, notes and the daily log.",
    requires: site.macRequirement,
  },
  {
    name: "Matter for iPhone",
    body: "Tasks, Calendar, Notes and Standup, and a widget for the room left in your day.",
    requires: site.iphoneRequirement,
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
      <Hero />

      {/* The four cards. Each picture stands at the foot of its card and runs off the bottom, so
          it is shown large enough to read. */}
      <section className="bg-track py-[clamp(4rem,9vw,7rem)]">
        <Wrap wide>
          <Statement className="max-w-[17ch]">{lines.tagline.text}</Statement>
          <ul className="rise mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-ink-muted">
            {facts.map((fact, index) => (
              <li key={fact} className="flex items-center gap-2">
                {index > 0 && (
                  <span aria-hidden className="text-ink-faint">
                    ·
                  </span>
                )}
                {fact}
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

          <p className="rise mt-12 text-[15px] text-ink-muted">Also in Matter</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
            {more.map((item) => (
              <li key={item.label} className={`rise ${item.span}`}>
                <Link href={item.href} className="group flex h-full flex-col rounded-[22px] bg-base p-6">
                  <span
                    aria-hidden
                    className="flex size-11 items-center justify-center rounded-full"
                    style={{ background: item.hue, color: item.glyph }}
                  >
                    <svg viewBox="0 0 20 20" className="size-[22px]" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      <path d={item.icon} />
                    </svg>
                  </span>
                  <span className="mt-5 text-[13px] text-ink-muted">{item.label}</span>
                  <span className="mt-1 text-balance text-[1.1rem] font-semibold leading-snug tracking-[-0.015em]">
                    {item.line}{" "}
                    <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                  <span className="mt-2 max-w-[46ch] text-[0.92rem] leading-relaxed text-ink-muted">{item.body}</span>
                </Link>
              </li>
            ))}
          </ul>

          <figure className="rise mx-auto mt-16 max-w-[30ch] text-center">
            <blockquote className="font-serif text-[clamp(1.35rem,2.6vw,1.75rem)] leading-snug">
              “{lines.limit.text}”
            </blockquote>
            <figcaption className="mt-3 text-[13px] text-ink-muted">From Settings ▸ Day, in the app</figcaption>
          </figure>
        </Wrap>
      </section>

      {/* Loafy */}
      <section className="py-[clamp(4rem,9vw,7rem)]">
        <Wrap wide>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Statement className="max-w-[12ch]">{lines.loafy.text}</Statement>
              <p className="rise mt-6 max-w-[38ch] text-[1.1rem] leading-relaxed text-ink-muted">
                Loafy lives in the sidebar of the Mac app, in a house with three floors. There is no
                clock in it, no score and no streak. You look in on her. That is all.
              </p>
            </div>
            <Shot
              label={lines.loafyHome.text}
              capture="Bedroom, kitchen, living room."
              src="/shots/loafy-home-light.webp"
              width={524}
              height={1202}
              className="rise mx-auto max-w-[320px] rounded-[26px] shadow-[0_40px_90px_-50px_rgb(0_0_0/0.4)]"
            />
          </div>
        </Wrap>
      </section>

      {/* Offline and private */}
      <section className="bg-track py-[clamp(4rem,9vw,7rem)]">
        <Wrap wide>
          <div className="grid gap-8 md:grid-cols-2 md:gap-12">
            <Statement className="max-w-[12ch]">{lines.privacy.text}</Statement>
            <div className="rise">
              <p className="max-w-[46ch] text-[1.1rem] leading-relaxed text-ink-muted">
                Everything. Matter works with no connection at all. There is no account to make and no
                server of ours. The network is only ever used for two things, and both are yours:
                keeping your own devices in step through your iCloud, and fetching the calendar feeds
                you add.
              </p>
              <p className="mt-6 text-[16px]">
                <Link href="/privacy" className="group inline-flex items-center gap-1 font-medium">
                  Read the privacy policy
                  <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                    ›
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </Wrap>
      </section>

      {/* Getting started: the page closes in the middle, as it opened. */}
      <section className="py-[clamp(4rem,9vw,7rem)]">
        <Wrap wide className="text-center">
          <Statement>{lines.start.text}</Statement>
          <div className="mx-auto mt-12 grid max-w-[880px] gap-4 text-left sm:grid-cols-2">
            {devices.map((device) => (
              <div key={device.name} className="rise rounded-[28px] bg-track p-8">
                <h3 className="text-[1.35rem] font-semibold tracking-[-0.02em]">{device.name}</h3>
                <p className="mt-2 leading-relaxed text-ink-muted">{device.body}</p>
                <p className="mt-5">
                  <StoreStatus />
                </p>
                <p className="mt-3 text-[12.5px] text-ink-faint">Requires {device.requires}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-[13px] text-ink-faint">
            Every heading on this page is a line from the app.{" "}
            <Link href="/support" className="underline underline-offset-2 hover:text-ink">
              The guide says what each one does.
            </Link>
          </p>
        </Wrap>
      </section>
    </main>
  );
}
