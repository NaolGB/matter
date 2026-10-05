"use client";

import { useRef, useState, type CSSProperties } from "react";
import lines from "@/content/app-lines.json";
import { Mark, Shot, StoreStatus, Wrap } from "@/components/site";

/* The hero, live. The day starts with 2h 10m free. Example tasks lie round the add-task field
   in rows, all pointing at it and fainter the further out they are: click one, or type your
   own, and it goes on the day the way the app's editor would put it there. One that fits takes
   its minutes off the number. One that does not is refused, with the next day offered instead.
   Every string the app would say comes from app-lines.json; the tasks themselves are examples.
   Nothing here moves. */

const START = 130;
const ESTIMATES = [15, 30, 45, 60, 120];
const facts = ["Works offline", "No account", "Syncs through your own iCloud"];

/** Inline style that also carries the custom properties a task reads. */
type ChipStyle = CSSProperties & { [key: `--${string}`]: string };

/* The example tasks. Together they come to far more than the day can hold, which is the point.
   Each wears a soft tint of a tag colour (the app's DukaPalette.tagPalette), as a tagged task
   does on the board.

   They lie round the add-task field and every one points at it. Each sits on a ray from the
   centre of the field: `bearing` is the ray's direction in degrees, clockwise from east with
   south down the page, so 180 is due left, 270 straight up and 360 due right, and `reach` is
   how far out the task's centre is, in px. The rays fan over the left, the top and the right.
   The quarter that points down is left empty, because the screenshots are there, and so is the
   ray straight up, where the mark is.

   There are three rows. The first hugs the words and is at full strength. The second sits
   between the rays of the first, further out and fainter, and the third is further and fainter
   again, so the whole thing thins out with distance. The layout is fixed in px round the field,
   so a wider window simply shows more of it and the edge of the window cuts off the rest. A
   task in an outer row waits for a window wide enough to show a good part of it (`from`): a
   sliver at the edge looks like a mistake.

   Placing from the field, not from the edges of the section, is what keeps the tasks clear of
   the words at any width. */
const tint = {
  blue: "#0A84FF",
  pink: "#FF375F",
  green: "#30D158",
  orange: "#FF9F0A",
  indigo: "#5E5CE6",
  teal: "#40C8E0",
  purple: "#BF5AF2",
  yellow: "#FFD60A",
  brown: "#AC8E68",
};

/** How strongly each row is drawn: the opacity of its tasks. */
const strengths = ["1", "0.5", "0.24"];

/** The narrowest window a task is drawn in. Whole class names, so Tailwind finds them. */
const shownFrom = {
  1200: "hidden min-[1200px]:block",
  1280: "hidden xl:block",
  1500: "hidden min-[1500px]:block",
};

const tasks: {
  name: string;
  length: number;
  hue: string;
  bearing: number;
  reach: number;
  row: 0 | 1 | 2;
  from?: keyof typeof shownFrom;
}[] = [
  // The first row, clockwise from the lower left. These eight are the ones the keyboard reaches.
  { name: "Write the report", length: 120, hue: tint.indigo, bearing: 170, reach: 392, row: 0 },
  { name: "Call the bank", length: 15, hue: tint.pink, bearing: 194, reach: 388, row: 0 },
  { name: "Week review", length: 45, hue: tint.blue, bearing: 217, reach: 485, row: 0 },
  { name: "Book flights", length: 30, hue: tint.teal, bearing: 240, reach: 525, row: 0 },
  { name: "Walk the dog", length: 30, hue: tint.orange, bearing: 300, reach: 525, row: 0 },
  { name: "Clear the inbox", length: 30, hue: tint.purple, bearing: 323, reach: 485, row: 0 },
  { name: "Draft the proposal", length: 60, hue: tint.green, bearing: 346, reach: 392, row: 0 },
  { name: "Prepare the slides", length: 60, hue: tint.yellow, bearing: 10, reach: 388, row: 0 },
  // The second row, between the rays of the first.
  { name: "Order groceries", length: 15, hue: tint.green, bearing: 158, reach: 604, row: 1, from: 1200 },
  { name: "Fix the login bug", length: 45, hue: tint.orange, bearing: 182, reach: 584, row: 1, from: 1200 },
  { name: "Read the contract", length: 30, hue: tint.brown, bearing: 205.5, reach: 618, row: 1, from: 1200 },
  { name: "Pay rent", length: 15, hue: tint.purple, bearing: 228.5, reach: 610, row: 1 },
  { name: "Go for a run", length: 30, hue: tint.blue, bearing: 311.5, reach: 612, row: 1 },
  { name: "Send the invoice", length: 15, hue: tint.pink, bearing: 334.5, reach: 618, row: 1, from: 1200 },
  { name: "Outline chapter 3", length: 45, hue: tint.indigo, bearing: 358, reach: 584, row: 1, from: 1200 },
  { name: "Water the plants", length: 15, hue: tint.teal, bearing: 22, reach: 604, row: 1, from: 1200 },
  // The third row, on the rays of the first again.
  { name: "Renew the passport", length: 30, hue: tint.pink, bearing: 146, reach: 800, row: 2, from: 1280 },
  { name: "Plan the offsite", length: 60, hue: tint.teal, bearing: 170, reach: 792, row: 2, from: 1500 },
  { name: "Review the budget", length: 45, hue: tint.green, bearing: 194, reach: 800, row: 2, from: 1500 },
  { name: "Tidy the desk", length: 15, hue: tint.orange, bearing: 217, reach: 812, row: 2, from: 1280 },
  { name: "Book the dentist", length: 15, hue: tint.yellow, bearing: 323, reach: 812, row: 2, from: 1280 },
  { name: "Update the roadmap", length: 30, hue: tint.blue, bearing: 346, reach: 800, row: 2, from: 1500 },
  { name: "Pick up the parcel", length: 15, hue: tint.purple, bearing: 10, reach: 792, row: 2, from: 1500 },
  { name: "Back up the laptop", length: 15, hue: tint.indigo, bearing: 34, reach: 800, row: 2, from: 1280 },
];

/** Where a task's centre goes, measured from the centre of the field, and how far to turn the
    task so it lies along its ray. It is turned whichever way keeps the text upright: a task on
    the left reads towards the field, one on the right reads away from it. Whole pixels, so the
    server and the browser agree on them. */
function place(bearing: number, reach: number) {
  const radians = (bearing * Math.PI) / 180;
  return {
    left: Math.round(Math.cos(radians) * reach),
    top: Math.round(Math.sin(radians) * reach),
    turn: bearing > 270 ? bearing - 360 : bearing > 90 ? bearing - 180 : bearing,
  };
}

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
  | { kind: "refused"; title: string; day: string; task?: number }
  | { kind: "moved"; title: string; day: string };

export function Hero() {
  const [free, setFree] = useState(START);
  const [title, setTitle] = useState("");
  const [estimate, setEstimate] = useState(30);
  const [note, setNote] = useState<Note | null>(null);
  /** Example tasks that have left the pile: put on today, or moved to tomorrow. */
  const [taken, setTaken] = useState<number[]>([]);
  const input = useRef<HTMLInputElement>(null);

  /** Put a task on today if it fits; otherwise refuse it the way the app's editor does. */
  function commit(name: string, length: number, task?: number) {
    if (length > free) {
      setNote({ kind: "refused", title: name, day: tomorrow(), task });
      return false;
    }
    setFree(free - length);
    if (task !== undefined) setTaken((list) => [...list, task]);
    setNote({ kind: "added", title: name });
    return true;
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
    const task = note.task;
    if (task !== undefined) setTaken((list) => [...list, task]);
    else setTitle("");
    setNote({ kind: "moved", title: note.title, day: note.day });
  }

  function reset() {
    setFree(START);
    setTitle("");
    setEstimate(30);
    setNote(null);
    setTaken([]);
  }

  const touched = free !== START || note !== null;

  return (
    <section className="relative overflow-hidden pt-[clamp(3.5rem,8vw,6rem)] pb-[clamp(3.5rem,8vw,6rem)]">
      <Wrap className="relative text-center">
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
          className="relative mx-auto mt-9 w-full max-w-[520px]"
        >
          <div className="flex items-center gap-2 rounded-full bg-track p-1.5 pl-5 ring-1 ring-transparent transition-shadow focus-within:ring-ink-faint">
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

          <div role="radiogroup" aria-label="Estimate" className="mx-auto mt-3 flex w-fit flex-wrap items-center justify-center gap-1.5">
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

          <div aria-live="polite" className="mt-4 min-h-[4.5rem] text-[14px] leading-relaxed">
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

          {/* The example tasks, on wide screens only: there is no room round the field on a
              phone. The list is a point on the centre of the field (26px is half the field's
              height) and each task is placed from it. It comes last in the form, so the
              keyboard reaches the field first. The outer rows are more of the same, drawn
              fainter, so they are for the pointer only: eight tasks are enough for the keyboard
              and a screen reader. */}
          <ul aria-label="Example tasks" className="absolute left-1/2 top-[26px] hidden size-0 lg:block">
            {tasks.map((task, index) => {
              const { left, top, turn } = place(task.bearing, task.reach);
              const outer = task.row > 0;
              const chipStyle: ChipStyle = { "--hue": task.hue, "--r": `${turn}deg`, "--strength": strengths[task.row] };
              return (
                <li
                  key={task.name}
                  aria-hidden={outer || undefined}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 ${task.from ? shownFrom[task.from] : ""}`}
                  style={{ left, top }}
                >
                  <button
                    type="button"
                    tabIndex={outer ? -1 : undefined}
                    disabled={taken.includes(index)}
                    onClick={() => commit(task.name, task.length, index)}
                    style={chipStyle}
                    className="chip flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-medium"
                  >
                    <span aria-hidden className="size-[11px] rounded-full border-[1.5px] border-current opacity-70" />
                    {task.name}{" "}
                    <span className="font-normal opacity-80">{minutes(task.length)}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </form>

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
            src="/shots/mac-tasks-light.webp"
            width={1680}
            height={1050}
            className="rounded-[18px] shadow-[0_40px_90px_-50px_rgb(0_0_0/0.45)] ring-1 ring-hairline"
          />
          <div className="absolute bottom-0 right-0 w-[27%] min-w-[104px] rounded-[26px] bg-base p-[5px] sm:w-[21%]">
            <Shot
              label="The iPhone app"
              capture="Tasks, with 2h 10m free and one task running."
              src="/shots/iphone-tasks-light.webp"
              width={480}
              height={1043}
              className="rounded-[22px] ring-1 ring-hairline"
            />
          </div>
        </div>
      </Wrap>
    </section>
  );
}
