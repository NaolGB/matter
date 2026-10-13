"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import lines from "@/content/app-lines.json";
import { Wrap } from "@/components/site";

/* The hero, live. The headline says what the app is for and carries the day's figure inside it,
   in the words of the app's own capacity chip: 2h 10m free to begin with. Type a task, give it
   an estimate, and it goes on the day the way the app's editor would put it there. One that fits
   takes its minutes off the figure. One that does not is refused, with the next day offered
   instead. Every string the app would say comes from app-lines.json. */

/** Why Matter over another planner, in one line under the sentence that says what it is. */
const FACTS = ["Works offline", "No account", "Kept in your own iCloud"];

const START = 130;
const ESTIMATES = [15, 30, 45, 60, 120];

/** Minutes the way the app says them: 45m, 2h, 2h 15m (CapacityFormat.minutes). */
function minutes(value: number) {
  const hours = Math.floor(value / 60);
  const rest = value % 60;
  if (hours === 0) return `${rest}m`;
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`;
}

/** Tomorrow, as the app formats a day on its Move button: Sun, Oct 4. */
function tomorrow() {
  const day = new Date();
  day.setDate(day.getDate() + 1);
  return new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric" }).format(day);
}

type Note =
  | { kind: "added"; title: string }
  | { kind: "refused"; title: string; day: string }
  | { kind: "moved"; title: string; day: string };

export function Hero() {
  const [free, setFree] = useState(START);
  const [title, setTitle] = useState("");
  const [estimate, setEstimate] = useState(30);
  const [note, setNote] = useState<Note | null>(null);
  const input = useRef<HTMLInputElement>(null);

  /** Put the typed task on today if it fits; otherwise refuse it the way the app's editor does. */
  function add() {
    const name = title.trim();
    if (!name) {
      input.current?.focus();
      return;
    }
    if (estimate > free) {
      setNote({ kind: "refused", title: name, day: tomorrow() });
      return;
    }
    setFree(free - estimate);
    setNote({ kind: "added", title: name });
    setTitle("");
    input.current?.focus();
  }

  function move() {
    if (note?.kind !== "refused") return;
    setTitle("");
    setNote({ kind: "moved", title: note.title, day: note.day });
  }

  function reset() {
    setFree(START);
    setTitle("");
    setEstimate(30);
    setNote(null);
  }

  const touched = free !== START || note !== null;
  const full = free === 0;

  return (
    <section className="pt-[clamp(3.5rem,8vw,6.5rem)] pb-[clamp(3.5rem,8vw,6rem)]">
      <Wrap wide className="text-center">
        {/* The figure sits in the headline as a green pill, smaller and semibold, with the app's
            timer glyph before it as its capacity reading has. Green is the site's own "free": the
            app is monochrome and has no tinted pills, so this is a choice for the page (Naol's,
            2026-10-12), and the one coloured thing in the hero. Its text is a deeper green than the
            tint so it reads. A full day turns it grey. It is as tall as the headline's letters: its
            foot on their baseline (an inline-block with overflow hidden takes its bottom edge as its
            baseline; an inline-flex would take its text's) and its top at the height of an h, about 0.705 of the headline, which at the
            pill's own 0.42 size is 1.68em (measured in Chrome, 2026-10-12). */}
        <h1 className="text-balance text-[clamp(2.5rem,6.2vw,4.75rem)] font-bold leading-[1.14] tracking-[-0.045em]">
          Plan the day you <br className="hidden sm:inline" />
          actually have{" "}
          <span
            aria-live="polite"
            className={`inline-block h-[1.68em] overflow-hidden whitespace-nowrap rounded-full pl-[0.5em] pr-[0.62em] align-baseline text-[0.42em] font-semibold leading-[1.68em] tracking-[-0.02em] transition-colors ${
              full ? "bg-wash text-ink-muted" : "bg-free-tint text-free-ink"
            }`}
          >
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              className="mr-[0.3em] inline-block size-[0.95em] align-[-0.16em]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 14.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM8 6v3l2 1.2M6.3 1.5h3.4" />
            </svg>
            {full ? lines.full.text : `${minutes(free)} free`}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-[62ch] text-pretty text-[clamp(1.05rem,1.7vw,1.3rem)] leading-[1.45] text-ink-muted">
          Matter is a planner for the Mac that knows how much a day holds.
        </p>
        <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[15px] text-ink-muted">
          {/* The dot ends an item rather than starting the next, so a line that wraps never
              begins with one. */}
          {FACTS.map((fact, index) => (
            <li key={fact} className="flex items-center gap-2">
              {fact}
              {index < FACTS.length - 1 && <span aria-hidden>·</span>}
            </li>
          ))}
        </ul>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            add();
          }}
          className="mx-auto mt-8 w-full max-w-[520px]"
        >
          {/* Two words, so the field reads as something to try and not as a form that keeps
              what is typed into it. */}
          <p className="mb-2.5 text-[13px] text-ink-muted">Try it</p>
          <div className="flex items-center gap-1 rounded-full bg-track p-1.5 pl-4 ring-1 max-[359px]:pl-3 max-[359px]:gap-0.5 ring-transparent transition-shadow focus-within:ring-ink-faint sm:pl-5">
            <input
              ref={input}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={lines.prompt.text}
              aria-label="A task to add to the day"
              className="min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-ink-faint"
            />
            <label className="relative shrink-0">
              <span className="sr-only">Estimate</span>
              <select
                value={estimate}
                onChange={(event) => setEstimate(Number(event.target.value))}
                className="h-10 cursor-pointer appearance-none rounded-full bg-transparent pl-2 pr-6 max-[359px]:pl-0.5 max-[359px]:pr-4 max-[359px]:text-[13px] text-[14px] text-ink-muted outline-none transition-colors hover:text-ink focus-visible:ring-1 focus-visible:ring-ink-faint sm:pl-3 sm:pr-7"
              >
                {ESTIMATES.map((value) => (
                  <option key={value} value={value}>
                    {minutes(value)}
                  </option>
                ))}
              </select>
              <svg
                aria-hidden
                viewBox="0 0 12 12"
                className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-ink-faint max-[359px]:right-1 sm:right-2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 4.5 6 7.5l3-3" />
              </svg>
            </label>
            <button
              type="submit"
              className="h-10 shrink-0 rounded-full bg-ink px-4 text-[14px] font-medium text-[var(--base)] max-[359px]:px-2.5 max-[359px]:text-[13px] sm:px-5"
            >
              {lines.addTask.text}
            </button>
          </div>

          <div aria-live="polite" className="mt-3 min-h-[3.25rem] text-[14px] leading-relaxed">
            {note?.kind === "added" && (
              <p className="text-ink-muted">
                {lines.added.text} “{note.title}”
              </p>
            )}
            {/* The refusal in the app's orange, and the way out of it as an ordinary action: in the
                app the one ink capsule on a surface is its main action, here Add task. */}
            {note?.kind === "refused" && (
              <div>
                <p className="text-attention">
                  {lines.gate.text} — only {minutes(free)} {lines.headroom.text} {lines.gateRest.text}
                </p>
                <button
                  type="button"
                  onClick={move}
                  className="mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-medium transition-colors hover:bg-wash"
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className="size-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 3v5.5h9.5M9.5 5.5l3 3-3 3" />
                  </svg>
                  {lines.moveTo.text} {note.day}
                </button>
              </div>
            )}
            {note?.kind === "moved" && (
              <p className="text-ink-muted">
                “{note.title}” moved to {note.day}.
              </p>
            )}
            {touched && (
              <button
                type="button"
                onClick={reset}
                className="mt-1 text-[13px] text-ink-muted underline-offset-2 hover:underline"
              >
                Start over
              </button>
            )}
          </div>
        </form>

      </Wrap>

      {/* The Mac app itself: a capture of the Tasks page with the demo world at 9:41, its chip at
          the same 2h 10m free as the pill above (Screenshots/hero-2026-10-12, which can retake it).
          The window has its own rounded, transparent corners, so its shadow is a drop-shadow that
          follows them. On a phone it is shown larger and cut at the right, past the Today column,
          so its words stay readable; the cut fades so it reads as more window, not text cut short. */}
      <Wrap wide className="mt-[clamp(1.5rem,3.5vw,2.75rem)]">
        <div className="max-sm:-mx-5 max-sm:overflow-hidden max-sm:px-5 max-sm:pb-10 max-sm:[mask-image:linear-gradient(to_right,#000_75%,transparent)]">
          <Image
            src="/shots/mac-tasks-light.webp"
            alt="Matter on the Mac at 9:41 on a Tuesday: Loafy at home in her house in the sidebar, 2h 10m free, Write the Mosaic pitch story running in the work bucket, and the Tasks page with today's tasks under their tags and tomorrow's under Upcoming."
            width={2400}
            height={1500}
            unoptimized
            priority
            className="h-auto w-full max-w-none drop-shadow-[0_24px_40px_rgb(0_0_0/0.18)] max-sm:w-[175%] max-sm:drop-shadow-[0_10px_20px_rgb(0_0_0/0.14)]"
          />
        </div>
      </Wrap>
    </section>
  );
}
