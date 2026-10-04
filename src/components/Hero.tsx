"use client";

import { useRef, useState, type CSSProperties } from "react";
import lines from "@/content/app-lines.json";
import { Mark, Shot, StoreStatus, Wrap } from "@/components/site";

/* The hero, live. The day starts with 2h 10m free. Tasks stream in round the number, and
   each one is a task: click it, or type your own, and it goes on the day the way the app's
   editor would put it there. One that fits takes its minutes off the number. One that does not is
   refused, with the next day offered instead. Every string the app would say comes from
   app-lines.json; the tasks themselves are examples. */

const START = 130;
const ESTIMATES = [15, 30, 45, 60, 120];
const facts = ["Works offline", "No account", "Syncs through your own iCloud"];

/* The tasks in the air. There are always more of them than the day can hold, which is the
   point. Each wears a soft tint of a tag colour (the app's DukaPalette.tagPalette), as a tagged
   task does on the board, and each is a real task here: click one and it goes on the day. */
/** Inline style that also carries the custom properties the stream reads. */
type ChipStyle = CSSProperties & { [key: `--${string}`]: string };

const hues = ["#0A84FF", "#FF375F", "#30D158", "#FF9F0A", "#5E5CE6", "#40C8E0", "#BF5AF2", "#8E8E93", "#FFD60A", "#AC8E68"];

const pool: [string, number][] = [
  ["Reply to the reviewer", 30],
  ["Week review", 45],
  ["Outline chapter 3", 45],
  ["Draft the proposal", 60],
  ["Pay the electricity bill", 15],
  ["Book the dentist", 15],
  ["Call the bank", 15],
  ["Write the report", 120],
  ["Fix the login bug", 45],
  ["Plan the offsite", 60],
  ["Renew the domain", 15],
  ["Read the contract", 30],
  ["Prepare the slides", 60],
  ["Send the invoice", 15],
  ["Water the plants", 15],
  ["Review the budget", 45],
  ["Update the roadmap", 30],
  ["Call mum", 15],
  ["Book flights", 30],
  ["Clear the inbox", 30],
  ["Sketch the homepage", 60],
  ["Order groceries", 15],
  ["Write release notes", 30],
  ["Back up the laptop", 15],
  ["Prep for the interview", 45],
  ["File the expenses", 30],
  ["Tidy the desk", 15],
  ["Pick up the parcel", 15],
  ["Review the pull request", 30],
  ["Renew the passport", 30],
];

/* Where the tasks come from. The target is the centre of the add-task field, and the sources
   sit all round it on a circle, a little uneven so it does not look ruled. A slot is one
   bearing on that circle: its task appears out there, gathers speed towards the field,
   shrinks to a dot before it reaches the words, and is gone as it lands. Then the slot comes
   back as the next task from the pool. --cx and --cy are the bearing as a fraction of the
   circle's radius (--R, set on the layer), so the whole thing scales with the screen.

   A task coming in from the side, level with the field or below it, has the gutter to itself,
   so it is full size, readable and clickable. One coming from above would cross the number,
   the headline and the sentence (measured: anything more than about 20 degrees above level
   does), so it starts small and faint, as if further away, and is only there to be seen. No two slots
   take the same time, so the stream never repeats. */
const slots = Array.from({ length: 24 }, (_, slot) => {
  const bearing = (slot * 360) / 24 + ((slot * 37) % 11) - 5;
  const reach = 0.82 + ((slot * 29) % 30) / 100;
  const radians = (bearing * Math.PI) / 180;
  const far = Math.abs(Math.cos(radians)) < 0.6 || Math.sin(radians) < -0.34;
  const style: ChipStyle = {
    "--cx": (Math.cos(radians) * reach).toFixed(3),
    "--cy": (Math.sin(radians) * reach).toFixed(3),
    "--r": `${((slot * 7) % 9) - 4}deg`,
    "--size": far ? "0.5" : "1",
    "--strength": far ? "0.45" : "1",
    "--dur": `${(4.6 + ((slot * 13) % 19) / 10).toFixed(1)}s`,
    "--delay": `${((slot * 0.83) % 5).toFixed(2)}s`,
  };
  return { slot, far, style };
});

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
  | { kind: "refused"; title: string; day: string; slot?: number }
  | { kind: "moved"; title: string; day: string };

export function Hero() {
  const [free, setFree] = useState(START);
  const [title, setTitle] = useState("");
  const [estimate, setEstimate] = useState(30);
  const [note, setNote] = useState<Note | null>(null);
  /** The task each slot is showing, as an index into the pool. */
  const [shown, setShown] = useState<number[]>(() => slots.map((entry) => entry.slot));
  /** Slots whose task has been taken: put on today, or moved to tomorrow. */
  const [gone, setGone] = useState<number[]>([]);
  const input = useRef<HTMLInputElement>(null);

  /** Put a task on today if it fits; otherwise refuse it the way the app's editor does. */
  function commit(name: string, length: number, slot?: number) {
    if (length > free) {
      setNote({ kind: "refused", title: name, day: tomorrow(), slot });
      return false;
    }
    setFree(free - length);
    if (slot !== undefined) setGone((list) => [...list, slot]);
    setNote({ kind: "added", title: name });
    return true;
  }

  /** A slot has finished a pass: it comes back as the next task nobody else is showing. */
  function recycle(slot: number) {
    setShown((current) => {
      let next = (current[slot] + 1) % pool.length;
      while (current.includes(next)) next = (next + 1) % pool.length;
      const copy = [...current];
      copy[slot] = next;
      return copy;
    });
    setGone((list) => list.filter((entry) => entry !== slot));
  }

  function addTyped() {
    const name = title.trim();
    if (!name) {
      input.current?.focus();
      return;
    }
    if (commit(name, estimate)) {
      setTitle("");
      input.current?.focus();
    }
  }

  function move() {
    if (note?.kind !== "refused") return;
    const slot = note.slot;
    if (slot !== undefined) setGone((list) => [...list, slot]);
    else setTitle("");
    setNote({ kind: "moved", title: note.title, day: note.day });
  }

  function reset() {
    setFree(START);
    setTitle("");
    setEstimate(30);
    setNote(null);
    setGone([]);
    setShown(slots.map((entry) => entry.slot));
  }

  const touched = free !== START || note !== null;

  return (
    <section className="relative isolate overflow-hidden pt-[clamp(3.5rem,8vw,6rem)] pb-[clamp(3.5rem,8vw,6rem)]">
      {/* The words let the pointer through to the tasks passing behind them. The controls
          take it back. */}
      <Wrap className="pointer-events-none relative text-center">
        <div className="flex flex-col items-center gap-2">
          <Mark size={46} />
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink-muted">Matter</p>
        </div>

        <p
          aria-live="polite"
          className="mt-5 text-[clamp(3.6rem,13vw,8.5rem)] font-normal leading-[0.95] tracking-[-0.05em]"
        >
          {free === 0 ? (
            <span className="text-ink-muted">{lines.full.text}</span>
          ) : (
            <>
              {minutes(free)} <span className="text-free">free</span>
            </>
          )}
        </p>

        <h1 className="mt-5 text-[clamp(1.3rem,2.6vw,1.75rem)] tracking-[-0.015em]">
          Plan the day you actually have
        </h1>
        <p className="mx-auto mt-3 max-w-[46ch] text-pretty text-[clamp(1rem,1.6vw,1.125rem)] leading-[1.5] text-ink-muted">
          Matter is a planner for Mac and iPhone that knows how much a day holds. When the plan
          stops fitting, it says so and offers the next day that will.
        </p>
        <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[13px] text-ink-muted">
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

        <form
          onSubmit={(event) => {
            event.preventDefault();
            addTyped();
          }}
          className="mx-auto mt-9 w-full max-w-[520px]"
        >
          <div className="pointer-events-auto relative flex items-center gap-2 rounded-full bg-track p-1.5 pl-5 ring-1 ring-transparent transition-shadow focus-within:ring-ink-faint">
            {/* The tasks in the air, anchored on the centre of this field and drawn behind
                everything in the hero. They are a pointer's shortcut to what the field does and
                they change every few seconds, so they stay out of the keyboard order and away
                from a screen reader; the field is the way in for both. */}
            <div aria-hidden className="stream pointer-events-none absolute left-1/2 top-1/2 -z-10 size-0">
              {slots.map(({ slot, far, style }) => {
                // `?? slot` only matters while editing: hot reload keeps the old state, which
                // may have fewer entries than there are slots now.
                const index = shown[slot] ?? slot;
                const [name, length] = pool[index];
                const chipStyle: ChipStyle = { ...style, "--hue": hues[index % hues.length] };
                return (
                  <button
                    key={slot}
                    type="button"
                    tabIndex={-1}
                    data-gone={gone.includes(slot)}
                    data-far={far}
                    onClick={() => commit(name, length, slot)}
                    onAnimationIteration={() => recycle(slot)}
                    style={chipStyle}
                    className="chip pointer-events-auto absolute left-0 top-0 flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium"
                  >
                    <span className="size-[11px] rounded-full border-[1.5px] border-current opacity-70" />
                    {name}
                    <span className="font-normal opacity-80">{minutes(length)}</span>
                  </button>
                );
              })}
            </div>
            <input
              ref={input}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={lines.prompt.text}
              aria-label="A task to add to the day"
              className="min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-ink-faint"
            />
            <button
              type="submit"
              className="h-10 shrink-0 rounded-full bg-ink px-5 text-[14px] font-medium text-[var(--base)]"
            >
              {lines.addTask.text}
            </button>
          </div>

          <div role="radiogroup" aria-label="Estimate" className="pointer-events-auto mx-auto mt-3 flex w-fit flex-wrap items-center justify-center gap-1.5">
            {ESTIMATES.map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={estimate === value}
                onClick={() => setEstimate(value)}
                className={`h-8 rounded-full px-3 text-[13px] transition-colors ${
                  estimate === value
                    ? "bg-ink text-[var(--base)]"
                    : "bg-wash text-ink-muted hover:text-ink"
                }`}
              >
                {minutes(value)}
              </button>
            ))}
          </div>

          <div aria-live="polite" className="mt-4 min-h-[4.5rem] text-[14px] leading-relaxed [&_button]:pointer-events-auto">
            {note === null && (
              <p className="text-ink-faint">
                <span className="lg:hidden">Try it. Add tasks until the day is full.</span>
                <span className="hidden lg:inline">Try it. Pick a task, or type your own.</span>
              </p>
            )}
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

        <p className="mt-2">
          <StoreStatus className="pointer-events-auto" />
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
  );
}
