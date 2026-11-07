import type { CSSProperties, ReactNode } from "react";
import lines from "@/content/app-lines.json";
import { SFHourglass, SFRepeat, SFTag } from "@/components/symbols";

/* The moment a template's days are chosen, drawn in the app's look for the Recurring slot of the
   features containers (Naol, 2026-11-07: focus on the recurrence choice, the days of the week).
   Measured from the capture in Screenshots/demo-2026-11-06/mac/22-repeats-popover.png and built
   from TemplatePropertyLine.swift (RepeatsMenu, PropertyMenuRow, the day squares) and
   MonthDayGrid.swift. It is a picture: nothing in it can be pressed.

   On top, the template editor's line of tokens: Repeats, reading the days chosen, the estimate and
   the tag. Under the first token, its popover: Every day, Weekdays, the seven day squares with
   Monday, Wednesday and Friday lit, Monthly and the start of the month's dates, which the slot
   cuts off. The template is the demo's Check the Quarry board, 15 minutes on Mon, Wed, Fri for
   Quarry Freight. Every word of the app's comes from app-lines.json; the day letters are the
   first letters of the app's short day names.

   Every measure is in points, and one point is `--k`: the picture's width over 320, the width the
   popover and the tokens take together. The card runs to the foot of its slot, as the Upcoming
   list's does, and the tokens are set a little tighter than the sheet's so they fit its width
   (Naol, 2026-11-07). */

const u = (n: number) => `calc(var(--k) * ${n})`;
const INK = "#1d1d1f";
const MUTED = "#86868b";
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const LIT = new Set([0, 2, 4]);

function Row({
  children,
  selected = false,
}: {
  children: ReactNode;
  selected?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: u(26),
        paddingInline: u(8),
        fontSize: u(13),
      }}
    >
      <span>{children}</span>
      {selected && <span style={{ fontSize: u(11), fontWeight: 600 }}>✓</span>}
    </div>
  );
}

/** One square of a day or a date: lit in ink when the template lands on it. */
function Square({
  children,
  lit = false,
  style,
}: {
  children: ReactNode;
  lit?: boolean;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: u(30),
        height: u(26),
        borderRadius: u(6),
        fontSize: u(13),
        background: lit ? INK : "rgb(0 0 0 / 0.06)",
        color: lit ? "#fff" : INK,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function Token({
  symbol: S,
  children,
  quiet = false,
}: {
  symbol: typeof SFRepeat;
  children: ReactNode;
  quiet?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: u(7),
        color: quiet ? MUTED : INK,
        whiteSpace: "nowrap",
      }}
    >
      <S style={{ width: u(13), height: u(13), flex: "none" }} />
      {children}
    </span>
  );
}

export function RepeatPicker() {
  return (
    <div
      role="img"
      aria-label={`A template's Repeats token reading Mon, Wed, Fri, with its menu open: ${lines.everyDay.text}, ${lines.weekdays.text}, the seven days with Monday, Wednesday and Friday lit, ${lines.monthly.text}, and the month's dates.`}
      className="h-full w-full max-w-[320px] select-none text-left text-ink [container-type:inline-size]"
    >
      {/* On a white card, as the tokens sit on the sheet; the popover floats over it (Naol,
          2026-11-07). */}
      <div
        aria-hidden
        className="relative h-full rounded-t-[16px] bg-base shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline [--k:calc(100cqw/320)]"
        style={{ padding: `${u(14)} ${u(12)} 0` }}
      >
        {/* The editor's tokens, as they sit on the sheet. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: u(14),
            fontSize: u(13),
            height: u(22),
            whiteSpace: "nowrap",
          }}
        >
          <Token symbol={SFRepeat}>Mon, Wed, Fri</Token>
          <Token symbol={SFHourglass}>15m</Token>
          <Token symbol={SFTag}>Quarry Freight</Token>
        </div>

        {/* The popover under the first token, its arrow pointing at it. */}
        <div
          style={{
            position: "relative",
            marginTop: u(10),
            width: u(272),
            padding: u(6),
            borderRadius: u(10),
            background: "#fff",
            boxShadow:
              "0 0 0 1px rgb(0 0 0 / 0.1), 0 14px 32px -12px rgb(0 0 0 / 0.28)",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: u(-7),
              left: u(26),
              width: u(14),
              height: u(14),
              transform: "rotate(45deg)",
              background: "#fff",
              boxShadow: "-1px -1px 0 0 rgb(0 0 0 / 0.1)",
              borderRadius: u(2),
            }}
          />
          <Row>{lines.everyDay.text}</Row>
          <Row>{lines.weekdays.text}</Row>
          <div
            style={{ display: "flex", gap: u(4), padding: `${u(4)} ${u(8)}` }}
          >
            {DAYS.map((day, index) => (
              <Square key={index} lit={LIT.has(index)}>
                {day}
              </Square>
            ))}
          </div>
          <Row>{lines.monthly.text}</Row>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, auto)",
              justifyContent: "start",
              gap: u(4),
              padding: `${u(4)} ${u(8)}`,
            }}
          >
            {Array.from({ length: 14 }, (_, i) => (
              <Square key={i}>{i + 1}</Square>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
