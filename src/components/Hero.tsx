"use client";

import { useRef, useState } from "react";
import lines from "@/content/app-lines.json";
import { Shot, Wrap } from "@/components/site";

/* The hero, live. The headline says what the app is for and carries the day's figure inside it,
   in the words of the app's own capacity chip: 2h 10m free to begin with. Type a task, give it
   an estimate, and it goes on the day the way the app's editor would put it there. One that fits
   takes its minutes off the figure. One that does not is refused, with the next day offered
   instead. Every string the app would say comes from app-lines.json. */

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
        {/* The figure sits in the headline as a pill, the one coloured thing in the hero. It is
            lighter than the words round it, and its dot keeps to the middle while its text keeps
            to the headline's baseline. */}
        <h1 className="text-balance text-[clamp(2.5rem,6.2vw,4.75rem)] font-bold leading-[1.14] tracking-[-0.045em]">
          Plan the day you <br className="hidden sm:inline" />
          actually have{" "}
          <span
            aria-live="polite"
            className={`inline-flex items-baseline gap-[0.2em] whitespace-nowrap rounded-full pl-[0.3em] pr-[0.4em] font-normal leading-[1.08] transition-colors ${
              full ? "bg-wash" : "bg-[color-mix(in_srgb,var(--free)_18%,white)]"
            }`}
          >
            <span
              aria-hidden
              className={`size-[0.28em] shrink-0 self-center rounded-full ${full ? "bg-ink-faint" : "bg-free"}`}
            />
            {full ? lines.full.text : `${minutes(free)} free`}
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-[62ch] text-pretty text-[clamp(1.05rem,1.7vw,1.3rem)] leading-[1.45] text-ink-muted">
          Matter is a planner for Mac and iPhone that knows how much a day holds.
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            add();
          }}
          className="mx-auto mt-8 w-full max-w-[520px]"
        >
          <div className="flex items-center gap-1 rounded-full bg-track p-1.5 pl-4 ring-1 ring-transparent transition-shadow focus-within:ring-ink-faint sm:pl-5">
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
                className="h-10 cursor-pointer appearance-none rounded-full bg-transparent pl-2 pr-6 text-[14px] text-ink-muted outline-none transition-colors hover:text-ink focus-visible:ring-1 focus-visible:ring-ink-faint sm:pl-3 sm:pr-7"
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
                className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-ink-faint sm:right-2.5"
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
              className="h-10 shrink-0 rounded-full bg-ink px-4 text-[14px] font-medium text-[var(--base)] sm:px-5"
            >
              {lines.addTask.text}
            </button>
          </div>

          <div aria-live="polite" className="mt-3 min-h-[3.25rem] text-[14px] leading-relaxed">
            {note === null && <p className="text-ink-faint">Try it. Add a task and the number answers.</p>}
            {note?.kind === "added" && (
              <p className="text-ink-muted">
                {lines.added.text} “{note.title}”
              </p>
            )}
            {note?.kind === "refused" && (
              <p>
                <span className="font-medium">{lines.gate.text}</span> — only {minutes(free)} of headroom
                left. {lines.gateRest.text}{" "}
                <button
                  type="button"
                  onClick={move}
                  className="ml-1 mt-1 rounded-full bg-ink px-3 py-1 text-[13px] font-medium text-[var(--base)]"
                >
                  {lines.moveTo.text} {note.day}
                </button>
              </p>
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
                className="mt-1 text-[13px] text-ink-faint underline-offset-2 hover:underline"
              >
                Start over
              </button>
            )}
          </div>
        </form>

      </Wrap>

      {/* The Mac at the full width of the page, big enough to read, with the iPhone standing in
          front of it on a ring of page colour. */}
      <Wrap wide className="mt-[clamp(1.5rem,3.5vw,2.75rem)]">
        <div className="relative pb-[6%] pr-[7%] sm:pr-[9%]">
          <Shot
            label="The Mac app"
            capture="Tasks, with the capacity reading 2h 10m free and Loafy at home in the sidebar."
            src="/shots/mac-tasks-light.webp"
            width={2400}
            height={1500}
            className="rounded-[12px] shadow-[0_50px_100px_-60px_rgb(0_0_0/0.45)] ring-1 ring-hairline sm:rounded-[20px]"
          />
          <div className="absolute bottom-0 right-0 w-[24%] min-w-[104px] rounded-[24px] bg-base p-[5px] sm:w-[17%] sm:rounded-[30px] sm:p-[6px]">
            <Shot
              label="The iPhone app"
              capture="Tasks, with 2h 10m free and one task running."
              src="/shots/iphone-tasks-light.webp"
              width={480}
              height={1043}
              className="rounded-[19px] ring-1 ring-hairline sm:rounded-[24px]"
            />
          </div>
        </div>
      </Wrap>
    </section>
  );
}
