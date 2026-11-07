import lines from "@/content/app-lines.json";
import { At, Glyph, INK, MUTED, ORANGE, Token, u } from "@/components/sheet";
import {
  SFArrowTurnDownRight,
  SFCalendar,
  SFCheckmark,
  SFClock,
  SFHourglass,
  SFTag,
  SFXmark,
} from "@/components/symbols";

/* The Mac's New task sheet, drawn the way EditorRefusal draws it (measured from the same capture,
   built from TaskEditorSheet.swift and TaskPropertyLine.swift), for the Tasks container (Naol,
   2026-11-07: try a component before shooting it). It is a picture: nothing in it can be pressed.

   Two moments of the same sheet. Plain, a task being added: the head, the title being typed, one
   line of tokens and, under them, what the tag's history says about the estimate, "These usually
   take 45m" in grey with a chip to use that number (TaskEditorSheet's `offer`, DukaChip); Done is
   live, in ink. `refused`, the capacity limit: three hours asked of the demo Tuesday's 2h 10m,
   so the refusal in the app's orange and Move to the soonest day with room, Saturday; Done at
   40%, since the task can't be saved there. The line saying where the rules live, with Open, is
   left out of the refused one so it fits its slot.

   The rows sit a little further apart than the app's, so the picture breathes (Naol, 2026-11-07).
   The tasks are the demo's: half an hour for Juniper Schools, which fits and whose tag's finished
   work says 45, and the three-hour hiring plan, which doesn't. Every word of the app's comes from
   app-lines.json. */

export function NewTaskSheet({ refused = false }: { refused?: boolean }) {
  const label = refused
    ? `The New task sheet refusing Draft the hiring plan, three hours on ${lines.today.text}. ${lines.gate.text} — only 2h 10m ${lines.headroom.text} ${lines.gateRest.text} Below it, ${lines.moveTo.text} Sat, Nov 14.`
    : `The New task sheet with Reply to Juniper's feedback round being typed: ${lines.today.text}, 30m, tagged Juniper Schools, and ${lines.done.text} ready to press. Under it, in grey: ${lines.usuallyTake.text} 45m, with a chip, ${lines.useMinutes.text} 45m.`;
  return (
    <div
      role="img"
      aria-label={label}
      className="w-full max-w-[520px] select-none [container-type:inline-size]"
    >
      <div
        aria-hidden
        className={`relative overflow-hidden rounded-[14px] bg-base text-left text-ink shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline [--k:calc(100cqw/520)] ${
          refused ? "[aspect-ratio:520/242]" : "[aspect-ratio:520/224]"
        }`}
      >
        <At
          x={17}
          y={25}
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
          y={20}
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
          y={20}
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
            opacity: refused ? 0.4 : 1,
            fontSize: u(12.5),
            fontWeight: 500,
          }}
        >
          <Glyph symbol={SFCheckmark} size={11} />
          {lines.done.text}
        </At>

        <At
          x={20}
          y={78}
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: u(17.5),
            whiteSpace: "nowrap",
          }}
        >
          {refused
            ? "Draft the hiring plan"
            : "Reply to Juniper\u2019s feedback round"}
          <span
            style={{
              marginLeft: u(1),
              width: u(1.5),
              height: u(21),
              background: "#0a84ff",
            }}
          />
        </At>

        <At
          x={21}
          y={124}
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
          <Token symbol={SFHourglass}>{refused ? "3h" : "30m"}</Token>
          {refused ? (
            <Token symbol={SFTag} quiet>
              {lines.addTag.text}
            </Token>
          ) : (
            <Token symbol={SFTag}>Juniper Schools</Token>
          )}
        </At>

        {refused ? (
          <>
            {/* What the day has to say, and the way out of it. */}
            <At
              x={20}
              y={164}
              style={{ fontSize: u(10.5), color: ORANGE, whiteSpace: "nowrap" }}
            >
              {lines.gate.text} — only 2h 10m {lines.headroom.text}{" "}
              {lines.gateRest.text}
            </At>
            <At
              x={20}
              y={192}
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
              {lines.moveTo.text} Sat, Nov 14
            </At>
          </>
        ) : (
          // What the tag's history says, and the chip that acts on it.
          <At
            x={20}
            y={166}
            w={480}
            h={26}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: u(10.5),
              color: MUTED,
              whiteSpace: "nowrap",
            }}
          >
            <span>{lines.usuallyTake.text} 45m</span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                height: u(26),
                paddingInline: u(10),
                borderRadius: u(13),
                color: INK,
                boxShadow: "inset 0 0 0 1px rgb(0 0 0 / 0.12)",
                fontSize: u(10.5),
              }}
            >
              {lines.useMinutes.text} 45m
            </span>
          </At>
        )}
      </div>
    </div>
  );
}
