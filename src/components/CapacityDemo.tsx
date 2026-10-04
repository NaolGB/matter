"use client";

import { useRef, useState, type ReactNode } from "react";
import lines from "@/content/app-lines.json";

/* The hero number, live. It starts with the day the screenshot shows, 2h 10m free, and
   answers the way the app's task editor does: a task that fits takes its minutes off the
   number, and one that does not is refused with the next day offered instead. Every string
   the app would say is taken from app-lines.json. */

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

export function CapacityDemo({ children }: { children?: ReactNode }) {
  const [free, setFree] = useState(START);
  const [title, setTitle] = useState("");
  const [estimate, setEstimate] = useState(30);
  const [note, setNote] = useState<Note | null>(null);
  const input = useRef<HTMLInputElement>(null);

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
    setTitle("");
    setNote({ kind: "added", title: name });
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

  return (
    <div>
      <p
        aria-live="polite"
        className="text-[clamp(3.6rem,13vw,8.5rem)] font-normal leading-[0.95] tracking-[-0.05em]"
      >
        {free === 0 ? lines.full.text : `${minutes(free)} free`}
      </p>

      {children}

      <form
        onSubmit={(event) => {
          event.preventDefault();
          add();
        }}
        className="mx-auto mt-9 w-full max-w-[520px]"
      >
        <div className="flex items-center gap-2 rounded-full bg-wash p-1.5 pl-5 ring-1 ring-transparent transition-shadow focus-within:ring-ink-faint">
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

        <div role="radiogroup" aria-label="Estimate" className="mt-3 flex flex-wrap items-center justify-center gap-1.5">
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
          {note === null && <p className="text-ink-faint">Try it. Add tasks until the day is full.</p>}
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
    </div>
  );
}
