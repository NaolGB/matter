import type { CSSProperties } from "react";
import Link from "next/link";
import lines from "@/content/app-lines.json";
import { site } from "@/config";
import { CapacityDemo } from "@/components/CapacityDemo";
import { Shot, Statement, StoreStatus, Wordmark, Wrap } from "@/components/site";

/* Every heading on this page is a line the app says, taken from app-lines.json and checked
   against the Swift source by `npm run check:lines`. The sentences underneath are ours. */

const chips: { text: string; style: CSSProperties; quiet?: boolean }[] = [
  // Kept clear of the band the number sits in, so nothing runs under it at any width.
  { text: lines.usually.text, style: { left: "6%", top: 72, "--r": "-7deg", "--d": "0s" } as CSSProperties },
  { text: lines.chipPush.text, style: { left: "9%", top: 330, "--r": "5deg", "--d": "-2s" } as CSSProperties },
  { text: lines.chipStart.text, style: { left: "4%", top: 432, "--r": "6deg", "--d": "-4s" } as CSSProperties },
  { text: lines.chipRecurs.text, style: { left: "11%", top: 528, "--r": "-5deg", "--d": "-1s" } as CSSProperties, quiet: true },
  { text: lines.full.text, style: { right: "12%", top: 64, "--r": "-4deg", "--d": "-3s" } as CSSProperties },
  { text: lines.chipKeep.text, style: { right: "5%", top: 318, "--r": "8deg", "--d": "-5s" } as CSSProperties },
  { text: lines.over.text, style: { right: "12%", top: 420, "--r": "-6deg", "--d": "-1.5s" } as CSSProperties },
  { text: lines.chipFind.text, style: { right: "6%", top: 520, "--r": "4deg", "--d": "-3.5s" } as CSSProperties, quiet: true },
];

const cards = [
  {
    label: "Tasks",
    line: lines.gate.text,
    body: "Matter counts what you planned against the hours you have left, meetings included, and says when it is too much.",
    crop: "The editor refusing an estimate",
    href: "/support#capacity",
  },
  {
    label: "Work bucket",
    line: lines.bucket.text,
    body: "The clock counts down against your estimate and keeps going past it. Finishing records what the task really took.",
    crop: "A session counting down",
    href: "/support#tasks",
  },
  {
    label: "Estimates",
    line: lines.usually.text,
    body: "After enough finished work, Matter knows how long that kind of task runs and offers the number before you guess.",
    crop: "The week review",
    href: "/support#capacity",
  },
  {
    label: "Notes",
    line: lines.notes.text,
    body: "A fast editor, a notebook one click away, and room for longer thinking next to the plan.",
    crop: "A note",
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
    body: "Tasks, Calendar and Notes, and a widget for the room left in your day.",
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
      {/* Hero */}
      <section className="relative overflow-hidden pt-[clamp(3.5rem,8vw,6rem)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          {chips.map((chip) => (
            <span
              key={chip.text}
              style={chip.style}
              className={`chip absolute whitespace-nowrap rounded-[10px] border border-hairline bg-card px-3 py-1.5 text-[13px] ${
                chip.quiet ? "text-ink-faint" : "text-ink-muted"
              }`}
            >
              {chip.text}
            </span>
          ))}
        </div>

        <Wrap className="relative text-center">
          <Wordmark height={46} className="mx-auto" />
          <div className="mt-6">
            <CapacityDemo>
              <h1 className="mt-5 text-[clamp(1.3rem,2.6vw,1.75rem)] tracking-[-0.015em]">
                Plan the day you actually have
              </h1>
              <p className="mx-auto mt-3 max-w-[46ch] text-pretty text-[clamp(1rem,1.6vw,1.125rem)] leading-[1.5] text-ink-muted">
                Matter is a planner for Mac and iPhone that knows how much a day holds. When the
                plan stops fitting, it says so and offers the next day that will.
              </p>
            </CapacityDemo>
          </div>
          <p className="mt-2">
            <StoreStatus />
          </p>
        </Wrap>

        <Wrap className="mt-[clamp(3rem,6vw,4.5rem)]">
          <div className="h-[clamp(190px,36vw,380px)] overflow-hidden rounded-t-[18px]">
            <Shot
              label="The main window"
              capture="Tasks, with the capacity reading 2h 10m free and Loafy at home in the sidebar."
              className="rounded-t-[18px] border-b-0"
            />
          </div>
        </Wrap>
      </section>

      {/* The bento */}
      <section className="bg-track py-[clamp(4rem,9vw,7rem)]">
        <Wrap>
          <Statement className="max-w-[17ch]">{lines.tagline.text}</Statement>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {cards.map((card) => (
              <Link
                key={card.label}
                href={card.href}
                className="rise group flex flex-col overflow-hidden rounded-[22px] border border-hairline bg-base"
              >
                <div className="flex items-start justify-between gap-4 p-6 pb-5">
                  <div>
                    <p className="text-[13px] text-ink-muted">{card.label}</p>
                    <h3 className="mt-1 text-balance text-[1.25rem] font-semibold leading-snug tracking-[-0.015em]">
                      {card.line}
                    </h3>
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{card.body}</p>
                  </div>
                  <Arrow />
                </div>
                <Shot label={card.crop} aspect="16 / 8" className="mt-auto border-x-0 border-b-0" />
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
              aspect="1 / 2"
              className="rise mx-auto max-w-[220px] rounded-[18px]"
            />
            <p className="rise max-w-[34ch] text-[1.05rem] leading-relaxed text-ink-muted">
              She lives in the sidebar of the Mac app, in a house with three floors. There is no
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
              <li key={prompt} className="rise rounded-[18px] border border-hairline bg-base p-5">
                <p className="text-[0.95rem] font-semibold tracking-[-0.01em]">{prompt}</p>
                <div aria-hidden className="mt-4 space-y-2.5">
                  <span className="block h-px bg-hairline" />
                  <span className="block h-px bg-hairline" />
                  <span className="block h-px w-2/3 bg-hairline" />
                </div>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* The phone */}
      <section className="py-[clamp(4rem,9vw,7rem)]">
        <Wrap className="text-center">
          <Statement>{lines.widget.text}</Statement>
          <Shot
            label="The iPhone and its widget"
            capture="Tasks on the phone, and the widget that shows the room left in your day beside her house."
            aspect="16 / 8"
            className="rise mt-12 rounded-[18px]"
          />
          <p className="mx-auto mt-6 max-w-[44ch] text-[1.05rem] leading-relaxed text-ink-muted">
            Your tasks, your calendar, your notes. On the phone, on the Home Screen, in step with
            the Mac.
          </p>
        </Wrap>
      </section>

      {/* Privacy */}
      <section className="bg-track py-[clamp(4rem,9vw,7rem)]">
        <Wrap className="text-center">
          <Statement>{lines.privacy.text}</Statement>
          <p className="mx-auto mt-5 max-w-[42ch] text-[1.05rem] leading-relaxed text-ink-muted">
            Everything. No account to make, no server of ours. Your devices, your iCloud, yours.
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
              <div key={device.name} className="rise rounded-[22px] border border-hairline bg-card p-7">
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
