import type { CSSProperties, ReactNode } from "react";
import lines from "@/content/app-lines.json";

/* The Mac's New task sheet at the moment it refuses a task, drawn as close to the app as a page
   can: measured from the capture in Screenshots/hero-2026-10-12/cards and built from
   TaskEditorSheet.swift and TaskPropertyLine.swift. It is a picture: nothing in it can be pressed.

   The sheet is 520 points wide. Its head is New task, Cancel (secondary) and Done, the ink
   primary, at 40% because a task that doesn't fit can't be saved there. Then the title being
   typed, with the system's caret; the day, time, estimate and tags as one line of quiet tokens,
   unset ones in grey; the refusal in the app's orange; Move to as a small secondary button; and
   the line saying where the rules live, with Open. The task and the figures are the demo's at the
   hero's moment: three hours asked of a day with 2h 10m of headroom, on Tuesday 13 October, so
   the soonest day with room is Saturday. Every word of the app's comes from app-lines.json.

   Every position is in points, and one point is `--k`: the picture's width over 520. Beside a
   wide enough card the picture is 520 pixels wide, the app's own size, and runs off the card's
   right edge by up to 76 pixels, which costs only Done and Open. Where the card is narrower it
   shrinks rather than run further off, so the refusal is always whole; on a phone it is the
   card's width. */

const u = (n: number) => `calc(var(--k) * ${n})`;

const INK = "#1d1d1f";
const MUTED = "#86868b";
const ORANGE = "#f58a1f";

function At({ x, y, w, h, style, children }: { x: number; y: number; w?: number; h?: number; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div
      className="absolute"
      style={{ left: u(x), top: u(y), width: w === undefined ? undefined : u(w), height: h === undefined ? undefined : u(h), ...style }}
    >
      {children}
    </div>
  );
}

function Icon({ d, size, width = 1.5 }: { d: string; size: number; width?: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      style={{ width: u(size), height: u(size), flex: "none" }}
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

const glyph = {
  xmark: "M4 4l8 8M12 4l-8 8",
  checkmark: "M3 8.5l3 3 7-7.5",
  calendar: "M2.5 3.5h11v10h-11zM2.5 6.5h11M5 6.5v.01M8 6.5v.01M11 6.5v.01M5 9.5h.01M8 9.5h.01M11 9.5h.01M5 12h.01M8 12h.01",
  clock: "M8 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8 4.8V8l-2.2 1.4",
  hourglass: "M4.5 2h7M4.5 14h7M5.5 2c0 3.5 5 3.5 5 6s-5 2.5-5 6M10.5 2c0 3.5-5 3.5-5 6s5 2.5 5 6",
  tag: "M2.5 2.5h5.2l5.8 5.8-5.2 5.2-5.8-5.8zM5.4 5.4h.01",
  move: "M3 3v5.5h9.5M9.5 5.5l3 3-3 3",
  gearshape:
    "M8 10.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4zM8 1.8v1.8M8 12.4v1.8M1.8 8h1.8M12.4 8h1.8M3.6 3.6l1.3 1.3M11.1 11.1l1.3 1.3M3.6 12.4l1.3-1.3M11.1 4.9l1.3-1.3",
};

/** One property's answer: a glyph and a few words, with no edge. `quiet` is an unset one. */
function Token({ icon, children, quiet = false }: { icon: string; children: ReactNode; quiet?: boolean }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: u(7), color: quiet ? MUTED : INK }}>
      <Icon d={icon} size={14} width={1.3} />
      {children}
    </span>
  );
}

export function EditorRefusal() {
  return (
    <div
      role="img"
      aria-label={`The New task sheet refusing Draft the hiring plan, three hours on Today. ${lines.gate.text} — only 2h 10m ${lines.headroom.text} ${lines.gateRest.text} Below it, ${lines.moveTo.text} Sat, Oct 17.`}
      className="w-full shrink-0 select-none [container-type:inline-size] sm:w-[min(520px,calc(100%+76px))] sm:max-w-none"
    >
      <div
        aria-hidden
        className="relative overflow-hidden rounded-[14px] bg-base text-left text-ink shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline [--k:calc(100cqw/520)] [aspect-ratio:520/237]"
      >
        {/* The head: the sheet's title, Cancel, and Done, which can't be pressed yet. */}
        <At x={17} y={21} style={{ fontSize: u(18.5), fontWeight: 600, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
          {lines.newTask.text}
        </At>
        <At x={346} y={16} h={34} style={{ display: "flex", alignItems: "center", gap: u(7), paddingInline: u(8), fontSize: u(13), fontWeight: 500 }}>
          <Icon d={glyph.xmark} size={11} width={1.6} />
          {lines.cancel.text}
        </At>
        <At
          x={428}
          y={16}
          w={76}
          h={34}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: u(6),
            borderRadius: u(17),
            background: INK,
            color: "#fff",
            opacity: 0.4,
            fontSize: u(12.5),
            fontWeight: 500,
          }}
        >
          <Icon d={glyph.checkmark} size={11} width={1.8} />
          {lines.done.text}
        </At>

        {/* The title, mid-typing. */}
        <At x={20} y={67} style={{ display: "flex", alignItems: "center", fontSize: u(17.5), whiteSpace: "nowrap" }}>
          Draft the hiring plan
          <span style={{ marginLeft: u(1), width: u(1.5), height: u(21), background: "#0a84ff" }} />
        </At>

        {/* The task's day, time, estimate and tags. */}
        <At x={21} y={105} style={{ display: "flex", alignItems: "center", gap: u(20), fontSize: u(13.5), whiteSpace: "nowrap" }}>
          <Token icon={glyph.calendar}>{lines.today.text}</Token>
          <Token icon={glyph.clock} quiet>
            {lines.addTime.text}
          </Token>
          <Token icon={glyph.hourglass}>3h</Token>
          <Token icon={glyph.tag} quiet>
            {lines.addTag.text}
          </Token>
        </At>

        {/* What the day has to say, and the way out of it. */}
        <At x={20} y={137} style={{ fontSize: u(10.5), color: ORANGE, whiteSpace: "nowrap" }}>
          {lines.gate.text} — only 2h 10m {lines.headroom.text} {lines.gateRest.text}
        </At>
        <At x={20} y={160} style={{ display: "flex", alignItems: "center", gap: u(10), fontSize: u(11), fontWeight: 500, whiteSpace: "nowrap" }}>
          <Icon d={glyph.move} size={11} width={1.6} />
          {lines.moveTo.text} Sat, Oct 17
        </At>
        <At x={20} y={186} w={402} style={{ fontSize: u(10.5), lineHeight: 1.25, color: MUTED }}>
          {lines.daySettings.text}
        </At>
        <At x={420} y={193} style={{ display: "flex", alignItems: "center", gap: u(8), fontSize: u(11), fontWeight: 500 }}>
          <Icon d={glyph.gearshape} size={11} width={1.4} />
          {lines.open.text}
        </At>
      </div>
    </div>
  );
}
