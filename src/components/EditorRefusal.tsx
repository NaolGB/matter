import lines from "@/content/app-lines.json";
import { At, Glyph, INK, MUTED, ORANGE, Token, u } from "@/components/sheet";
import {
  SFArrowTurnDownRight,
  SFCalendar,
  SFCheckmark,
  SFClock,
  SFGearshape,
  SFHourglass,
  SFTag,
  SFXmark,
} from "@/components/symbols";

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

   Every position is in points, and one point is `--k`: the picture's width over 520 (the drawing
   parts are in sheet.tsx, shared with NewTaskSheet). Beside a
   wide enough card the picture is 520 pixels wide, the app's own size, and runs off the card's
   right edge by up to 76 pixels, which costs only Done and Open. Where the card is narrower it
   shrinks rather than run further off, so the refusal is always whole; on a phone it is the
   card's width. */

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
        <At
          x={17}
          y={21}
          style={{
            fontSize: u(18.5),
            fontWeight: 600,
            letterSpacing: "-0.01em",
            whiteSpace: "nowrap",
          }}
        >
          {lines.newTask.text}
        </At>
        <At
          x={346}
          y={16}
          h={34}
          style={{
            display: "flex",
            alignItems: "center",
            gap: u(7),
            paddingInline: u(8),
            fontSize: u(13),
            fontWeight: 500,
          }}
        >
          <Glyph symbol={SFXmark} size={11} />
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
          <Glyph symbol={SFCheckmark} size={11} />
          {lines.done.text}
        </At>

        {/* The title, mid-typing. */}
        <At
          x={20}
          y={67}
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: u(17.5),
            whiteSpace: "nowrap",
          }}
        >
          Draft the hiring plan
          <span
            style={{
              marginLeft: u(1),
              width: u(1.5),
              height: u(21),
              background: "#0a84ff",
            }}
          />
        </At>

        {/* The task's day, time, estimate and tags. */}
        <At
          x={21}
          y={105}
          style={{
            display: "flex",
            alignItems: "center",
            gap: u(20),
            fontSize: u(13.5),
            whiteSpace: "nowrap",
          }}
        >
          <Token symbol={SFCalendar}>{lines.today.text}</Token>
          <Token symbol={SFClock} quiet>
            {lines.addTime.text}
          </Token>
          <Token symbol={SFHourglass}>3h</Token>
          <Token symbol={SFTag} quiet>
            {lines.addTag.text}
          </Token>
        </At>

        {/* What the day has to say, and the way out of it. */}
        <At
          x={20}
          y={137}
          style={{ fontSize: u(10.5), color: ORANGE, whiteSpace: "nowrap" }}
        >
          {lines.gate.text} — only 2h 10m {lines.headroom.text}{" "}
          {lines.gateRest.text}
        </At>
        <At
          x={20}
          y={160}
          style={{
            display: "flex",
            alignItems: "center",
            gap: u(10),
            fontSize: u(11),
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          <Glyph symbol={SFArrowTurnDownRight} size={11} />
          {lines.moveTo.text} Sat, Oct 17
        </At>
        <At
          x={20}
          y={186}
          w={402}
          style={{ fontSize: u(10.5), lineHeight: 1.25, color: MUTED }}
        >
          {lines.daySettings.text}
        </At>
        <At
          x={420}
          y={193}
          style={{
            display: "flex",
            alignItems: "center",
            gap: u(8),
            fontSize: u(11),
            fontWeight: 500,
          }}
        >
          <Glyph symbol={SFGearshape} size={11} />
          {lines.open.text}
        </At>
      </div>
    </div>
  );
}
