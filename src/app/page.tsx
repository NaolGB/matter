import Link from "next/link";
import lines from "@/content/app-lines.json";
import { site } from "@/config";
import { Hero } from "@/components/Hero";
import { Shot, Statement, StoreStatus, Wrap } from "@/components/site";

/* Every heading on this page is a line the app says, taken from app-lines.json and checked
   against the Swift source by `npm run check:lines`. The sentences underneath are ours. */

const facts = ["Works offline", "No account", "Syncs through your own iCloud"];

/* The four cards. `span` is the card's share of the twelve columns on a wide screen: the two
   with the most to show get seven, and they sit on a diagonal. */
const cards = [
  {
    label: "Tasks",
    line: lines.gate.text,
    body: "Matter counts what you planned against the hours you have left, meetings included, and says when it is too much.",
    crop: "The editor refusing an estimate",
    shot: { name: "editor", width: 1040, height: 800 },
    span: "lg:col-span-7",
    href: "/support#capacity",
  },
  {
    label: "Estimates",
    line: lines.usually.text,
    body: "After enough finished work, Matter knows how long that kind of task runs and offers the number before you guess.",
    crop: "The week review",
    shot: { name: "week", width: 880, height: 880 },
    span: "lg:col-span-5",
    href: "/support#capacity",
  },
  {
    label: "Work bucket",
    line: lines.bucket.text,
    body: "The clock counts down against your estimate and keeps going past it. Finishing records what the task really took.",
    crop: "A session counting down",
    shot: { name: "session", width: 840, height: 784 },
    span: "lg:col-span-5",
    href: "/support#tasks",
  },
  {
    label: "Notes",
    line: lines.notes.text,
    body: "A fast editor, a notebook one click away, and room for longer thinking next to the plan.",
    crop: "A note",
    shot: { name: "note", width: 1400, height: 940 },
    span: "lg:col-span-7",
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

      {/* The four cards. Each picture is a piece of the app's window standing at the foot of its
          card and running off the bottom, so it is shown large enough to read. */}
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
                  <div className="aspect-[16/9] min-h-0 lg:aspect-auto lg:h-[340px]">
                    <Shot
                      label={card.crop}
                      src={`/shots/crop-${card.shot.name}-light.webp`}
                      width={card.shot.width}
                      height={card.shot.height}
                      className="rounded-t-[12px] shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline"
                    />
                  </div>
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

      {/* The daily log */}
      <section className="bg-track py-[clamp(4rem,9vw,7rem)]">
        <Wrap wide>
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <Statement>{lines.addToday.text}</Statement>
              <p className="rise mt-5 max-w-[36ch] text-[1.1rem] leading-relaxed text-ink-muted">
                One entry a day, under the same four headings. A few lines is enough.
              </p>
              <ol className="rise mt-8 max-w-[26rem]">
                {prompts.map((prompt) => (
                  <li
                    key={prompt}
                    className="border-t border-hairline py-4 text-[1.15rem] font-semibold tracking-[-0.015em] last:border-b"
                  >
                    {prompt}
                  </li>
                ))}
              </ol>
            </div>
            <Shot
              label="A standup entry on the iPhone"
              capture="The day's entry under its four headings."
              src="/shots/iphone-standup-light.webp"
              width={480}
              height={1043}
              className="rise mx-auto max-w-[300px] rounded-[40px] shadow-[0_40px_90px_-50px_rgb(0_0_0/0.45)] ring-1 ring-hairline"
            />
          </div>
        </Wrap>
      </section>

      {/* The phone */}
      <section className="py-[clamp(4rem,9vw,7rem)]">
        <Wrap wide>
          <Statement>{lines.phone.text}</Statement>
          <p className="rise mt-5 max-w-[52ch] text-[1.1rem] leading-relaxed text-ink-muted">
            Tasks, Calendar, Notes and Standup on the iPhone, in step with the Mac. On the Home Screen, a
            widget shows the room left in your day beside Loafy’s house.
          </p>
          {/* Five screens in a row. On a phone the row keeps a readable size and scrolls sideways. */}
          <div className="rise mt-12 overflow-x-auto rounded-[28px] bg-wash">
            <Shot
              label="The iPhone app and its widget"
              capture="Tasks, Calendar, a note and the standup list on the phone, and the Home Screen widget that shows the room left in your day beside Loafy’s house."
              src="/shots/iphone-strip-light.webp"
              width={2400}
              height={1200}
              className="min-w-[720px]"
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
