import Link from "next/link";
import lines from "@/content/app-lines.json";
import { site } from "@/config";
import { Hero } from "@/components/Hero";
import { Shot, Statement, StoreStatus, Wrap } from "@/components/site";

/* Every heading on this page is a line the app says, taken from app-lines.json and checked
   against the Swift source by `npm run check:lines`. The sentences underneath are ours. */

const cards = [
  {
    label: "Tasks",
    line: lines.gate.text,
    body: "Matter counts what you planned against the hours you have left, meetings included, and says when it is too much.",
    crop: "The editor refusing an estimate",
    shot: { name: "editor", width: 1024, height: 576 },
    href: "/support#capacity",
  },
  {
    label: "Work bucket",
    line: lines.bucket.text,
    body: "The clock counts down against your estimate and keeps going past it. Finishing records what the task really took.",
    crop: "A session counting down",
    shot: { name: "session", width: 928, height: 522 },
    href: "/support#tasks",
  },
  {
    label: "Estimates",
    line: lines.usually.text,
    body: "After enough finished work, Matter knows how long that kind of task runs and offers the number before you guess.",
    crop: "The week review",
    shot: { name: "week", width: 880, height: 495 },
    href: "/support#capacity",
  },
  {
    label: "Notes",
    line: lines.notes.text,
    body: "A fast editor, a notebook one click away, and room for longer thinking next to the plan.",
    crop: "A note",
    shot: { name: "note", width: 1408, height: 792 },
    href: "/support#notes",
  },
];

const prompts = [
  lines.promptHappened.text,
  lines.promptToday.text,
  lines.promptHow.text,
  lines.promptNoticed.text,
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

      {/* The bento */}
      <section className="bg-track py-[clamp(4rem,9vw,7rem)]">
        <Wrap>
          <Statement className="max-w-[17ch]">{lines.tagline.text}</Statement>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {cards.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className="rise group flex flex-col overflow-hidden rounded-[24px] bg-base"
              >
                <div className="flex items-start justify-between gap-4 p-7 pb-6">
                  <div>
                    <p className="text-[13px] text-ink-muted">{card.label}</p>
                    <h3 className="mt-1 text-balance text-[1.25rem] font-semibold leading-snug tracking-[-0.015em]">
                      {card.line}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{card.body}</p>
                  </div>
                  <Arrow />
                </div>
                <div className="mt-auto px-3 pb-3">
                  <Shot
                    label={card.crop}
                    src={`/shots/crop-${card.shot.name}-light.webp`}
                    width={card.shot.width}
                    height={card.shot.height}
                    className="rounded-[16px] ring-1 ring-hairline"
                  />
                </div>
              </Link>
            ))}
          </div>
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
        <Wrap>
          <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_220px_minmax(0,1fr)] md:gap-12">
            <Statement className="md:text-right">{lines.loafy.text}</Statement>
            <Shot
              label={lines.loafyHome.text}
              capture="Bedroom, kitchen, living room."
              src="/shots/loafy-home-light.webp"
              width={524}
              height={1202}
              className="rise mx-auto max-w-[220px] rounded-[20px]"
            />
            <p className="rise max-w-[34ch] text-[1.05rem] leading-relaxed text-ink-muted">
              Loafy lives in the sidebar of the Mac app, in a house with three floors. There is no
              clock in it, no score and no streak. You look in on her. That is all.
            </p>
          </div>
        </Wrap>
      </section>

      {/* The daily log */}
      <section className="bg-track py-[clamp(4rem,9vw,7rem)]">
        <Wrap className="text-center">
          <Statement>{lines.addToday.text}</Statement>
          <p className="mx-auto mt-4 max-w-[40ch] text-[1.05rem] leading-relaxed text-ink-muted">
            One entry a day, under the same four headings. A few lines is enough.
          </p>
          <ul className="mt-12 grid gap-3 text-left sm:grid-cols-2 lg:grid-cols-4">
            {prompts.map((prompt) => (
              <li key={prompt} className="rise rounded-[20px] bg-base p-6">
                <p className="text-[0.95rem] font-semibold tracking-[-0.01em]">{prompt}</p>
                <div aria-hidden className="mt-4 space-y-2.5">
                  <span className="block h-[5px] rounded-full bg-wash" />
                  <span className="block h-[5px] rounded-full bg-wash" />
                  <span className="block h-[5px] w-2/3 rounded-full bg-wash" />
                </div>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* The phone */}
      <section className="py-[clamp(4rem,9vw,7rem)]">
        <Wrap className="text-center">
          <Statement>{lines.phone.text}</Statement>
          {/* Five screens in a row. On a phone the row keeps a readable size and scrolls sideways. */}
          <div className="rise mt-12 overflow-x-auto rounded-[20px] bg-wash">
            <Shot
              label="The iPhone app and its widget"
              capture="Tasks, Calendar, a note and a standup entry on the phone, and the Home Screen widget that shows the room left in your day beside Loafy’s house."
              src="/shots/iphone-strip-light.webp"
              width={2400}
              height={1200}
              className="min-w-[720px]"
            />
          </div>
          <p className="mx-auto mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-muted">
            Tasks, Calendar, Notes and Standup on the iPhone, in step with the Mac. On the Home Screen, a
            widget shows the room left in your day beside Loafy’s house.
          </p>
        </Wrap>
      </section>

      {/* Offline and private */}
      <section className="bg-track py-[clamp(4rem,9vw,7rem)]">
        <Wrap className="text-center">
          <Statement>{lines.privacy.text}</Statement>
          <p className="mx-auto mt-5 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-muted">
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
        </Wrap>
      </section>

      {/* Getting started */}
      <section className="py-[clamp(4rem,9vw,7rem)]">
        <Wrap>
          <Statement>{lines.start.text}</Statement>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {devices.map((device) => (
              <div key={device.name} className="rise rounded-[24px] bg-track p-8">
                <h3 className="text-[1.25rem] font-semibold tracking-[-0.015em]">{device.name}</h3>
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
