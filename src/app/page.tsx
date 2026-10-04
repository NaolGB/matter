import type { CSSProperties } from "react";
import Link from "next/link";
import lines from "@/content/app-lines.json";
import { site } from "@/config";
import { CapacityDemo } from "@/components/CapacityDemo";
import { Mark, Shot, Statement, StoreStatus, Wrap } from "@/components/site";

/* Every heading on this page is a line the app says, taken from app-lines.json and checked
   against the Swift source by `npm run check:lines`. The sentences underneath are ours. */

/* The hues are swatches from the app's tag palette (DukaPalette.tagPalette). Two chips carry a
   state and keep the app's colour for it: Over in orange, Full in grey. The rest are there to
   draw the eye. Each flies in from its own side (--from), a beat after the one before (--in). */
const chips: { text: string; style: CSSProperties }[] = [
  { text: lines.usually.text, style: { left: "6%", top: 72, "--r": "-7deg", "--hue": "#0A84FF", "--from": "-45vw", "--in": "0.15s" } as CSSProperties },
  { text: lines.full.text, style: { right: "12%", top: 64, "--r": "-4deg", "--hue": "#8E8E93", "--from": "45vw", "--in": "0.25s" } as CSSProperties },
  { text: lines.chipPush.text, style: { left: "9%", top: 330, "--r": "5deg", "--hue": "#5E5CE6", "--from": "-45vw", "--in": "0.35s" } as CSSProperties },
  { text: lines.chipKeep.text, style: { right: "5%", top: 318, "--r": "8deg", "--hue": "#30D158", "--from": "45vw", "--in": "0.45s" } as CSSProperties },
  { text: lines.chipStart.text, style: { left: "4%", top: 432, "--r": "6deg", "--hue": "#40C8E0", "--from": "-45vw", "--in": "0.55s" } as CSSProperties },
  { text: lines.over.text, style: { right: "12%", top: 420, "--r": "-6deg", "--hue": "#FF9F0A", "--from": "45vw", "--in": "0.65s" } as CSSProperties },
  { text: lines.chipRecurs.text, style: { left: "11%", top: 528, "--r": "-5deg", "--hue": "#FF375F", "--from": "-45vw", "--in": "0.75s" } as CSSProperties },
  { text: lines.chipFind.text, style: { right: "6%", top: 520, "--r": "4deg", "--hue": "#BF5AF2", "--from": "45vw", "--in": "0.85s" } as CSSProperties },
];

const facts = ["Works offline", "No account", "Syncs through your own iCloud"];

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
      <section className="relative overflow-hidden pt-[clamp(3.5rem,8vw,6rem)] pb-[clamp(3.5rem,8vw,6rem)]">
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
          {chips.map((chip) => (
            <span
              key={chip.text}
              style={chip.style}
              className="chip absolute whitespace-nowrap rounded-[10px] px-3 py-1.5 text-[13px] font-medium"
            >
              {chip.text}
            </span>
          ))}
        </div>

        <Wrap className="relative text-center">
          <div className="flex flex-col items-center gap-2">
            <Mark size={46} />
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink-muted">Matter</p>
          </div>
          <div className="mt-5">
            <CapacityDemo>
              <h1 className="mt-5 text-[clamp(1.3rem,2.6vw,1.75rem)] tracking-[-0.015em]">
                Plan the day you actually have
              </h1>
              <p className="mx-auto mt-3 max-w-[46ch] text-pretty text-[clamp(1rem,1.6vw,1.125rem)] leading-[1.5] text-ink-muted">
                Matter is a planner for Mac and iPhone that knows how much a day holds. When the
                plan stops fitting, it says so and offers the next day that will.
              </p>
              <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-ink-muted">
                {facts.map((fact, index) => (
                  <li key={fact} className="flex items-center gap-2">
                    {index > 0 && <span aria-hidden className="text-ink-faint">·</span>}
                    {fact}
                  </li>
                ))}
              </ul>
            </CapacityDemo>
          </div>
          <p className="mt-2">
            <StoreStatus />
          </p>
        </Wrap>

        {/* The Mac and the iPhone together. The phone stands in front, on a ring of page colour. */}
        <Wrap className="mt-[clamp(3rem,6vw,4.5rem)]">
          <div className="relative mx-auto max-w-[900px] pb-[7%] pr-[10%] sm:pr-[12%]">
            <Shot
              label="The Mac app"
              capture="Tasks, with the capacity reading 2h 10m free and Loafy at home in the sidebar."
              className="rounded-[18px] pr-[32%] sm:pr-6"
            />
            <div className="absolute bottom-0 right-0 w-[27%] min-w-[104px] rounded-[26px] bg-base p-[5px] sm:w-[21%]">
              <Shot label="The iPhone app" aspect="9 / 19" compact className="rounded-[22px]" />
            </div>
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
                  <Shot label={card.crop} aspect="16 / 8" className="rounded-[16px]" />
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
              aspect="1 / 2"
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
          <Shot
            label="The iPhone app and its widget"
            capture="Tasks on the phone, and the widget that shows the room left in your day beside Loafy’s house."
            aspect="16 / 8"
            className="rise mt-12 rounded-[20px]"
          />
          <p className="mx-auto mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-ink-muted">
            Tasks, Calendar and Notes on the iPhone, in step with the Mac. On the Home Screen, a
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
