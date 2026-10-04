"use client";

import { useRef, useState, type CSSProperties } from "react";
import lines from "@/content/app-lines.json";
import { Mark, Shot, StoreStatus, Wrap } from "@/components/site";

/* The hero, live. The day starts with 2h 10m free. A few example tasks lie either side of the
   add-task field: click one, or type your own, and it goes on the day the way the app's editor
   would put it there. One that fits takes its minutes off the number. One that does not is
   refused, with the next day offered instead. Every string the app would say comes from
   app-lines.json; the tasks themselves are examples. Nothing here moves. */

const START = 130;
const ESTIMATES = [15, 30, 45, 60, 120];
const facts = ["Works offline", "No account", "Syncs through your own iCloud"];

/** Inline style that also carries the custom properties a task reads. */
type ChipStyle = CSSProperties & { [key: `--${string}`]: string };

/* The example tasks. Together they come to far more than the day can hold, which is the point.
   Each wears a soft tint of a tag colour (the app's DukaPalette.tagPalette), as a tagged task
   does on the board.

   They lie in the two gutters beside the field and are placed from the centre of the field, so
   they keep clear of the words at any width. `y` is how far the task's centre sits below the
   field's centre, `out` how far across the gutter it sits (0 is against the column, 1 is the far
   side), `turn` its tilt in degrees. */
const tasks: { name: string; length: number; hue: string; side: "left" | "right"; y: number; out: number; turn: number }[] = [
  { name: "Week review", length: 45, hue: "#0A84FF", side: "left", y: -172, out: 0.6, turn: -5 },
  { name: "Call the bank", length: 15, hue: "#FF375F", side: "left", y: -84, out: 0.1, turn: 4 },
  { name: "Write the report", length: 120, hue: "#5E5CE6", side: "left", y: 8, out: 0.85, turn: -3 },
  { name: "Book flights", length: 30, hue: "#40C8E0", side: "left", y: 100, out: 0.35, turn: 6 },
  { name: "Draft the proposal", length: 60, hue: "#30D158", side: "right", y: -150, out: 0.25, turn: 5 },
  { name: "Water the plants", length: 15, hue: "#FF9F0A", side: "right", y: -58, out: 0.9, turn: -6 },
  { name: "Clear the inbox", length: 30, hue: "#BF5AF2", side: "right", y: 36, out: 0.05, turn: 3 },
  { name: "Prepare the slides", length: 60, hue: "#FFD60A", side: "right", y: 128, out: 0.6, turn: -4 },
];

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

          {/* The example tasks, on wide screens only: there is no gutter to lay them in on a
              phone. The list is a point on the centre of the field (26px is half the field's
              height) and each task is placed from it. It comes last in the form, so the
              keyboard reaches the field first. */}
          <ul aria-label="Example tasks" className="tasks absolute left-1/2 top-[26px] hidden size-0 lg:block">
            {tasks.map((task, index) => {
              const chipStyle: ChipStyle = { "--hue": task.hue, "--r": `${task.turn}deg` };
              return (
                <li
                  key={task.name}
                  className="absolute -translate-y-1/2"
                  style={{ top: task.y, [task.side === "left" ? "right" : "left"]: `calc(288px + var(--spread) * ${task.out})` }}
                >
                  <button
                    type="button"
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
