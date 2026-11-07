import { SFCalendar, SFCrossCase } from "@/components/symbols";

/* Today's list close up with a meeting in it, for the Task list with calendars slot of the features
   containers (Naol, 2026-11-07): one tag's group as the Mac's Tasks page draws it, the tag's
   symbol and name with the group's time on the rule, then a meeting from a calendar feed, marked
   with the calendar symbol and its place, sitting among the tasks under the same tag. Measured from
   the 2026-11-06 capture (Screenshots/demo-2026-11-06/mac/01-tasks) and the demo's Tuesday:
   Larkspur Health, the weekly sync at 10:00 on Zoom, then the channel check. The card runs off the
   slot's right edge and foot. It is a picture: nothing in it can be pressed.

   Every measure is in points, and one point is `--k`: the picture's width over 270. */

const u = (n: number) => `calc(var(--k) * ${n})`;
const MUTED = "#86868b";
const FEED = "#5856d6";

function Row({
  title,
  detail,
  meeting = false,
}: {
  title: string;
  detail: string;
  meeting?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: u(10),
        paddingLeft: u(6),
        marginTop: u(14),
      }}
    >
      <span
        style={{
          width: u(13),
          height: u(13),
          marginTop: u(3),
          borderRadius: "50%",
          boxShadow: "inset 0 0 0 1.2px rgb(0 0 0 / 0.35)",
          flex: "none",
        }}
      />
      <span style={{ minWidth: 0 }}>
        <span
          style={{
            display: "block",
            fontSize: u(14),
            lineHeight: 1.25,
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: u(4),
            marginTop: u(3),
            fontSize: u(11),
            color: MUTED,
            whiteSpace: "nowrap",
          }}
        >
          {meeting && (
            <SFCalendar style={{ width: u(11), height: u(11), color: FEED }} />
          )}
          {detail}
        </span>
      </span>
    </div>
  );
}

export function TodayMix() {
  return (
    <div
      role="img"
      aria-label="Today on the Mac under the tag Larkspur Health, 1h 15m: a meeting from a calendar, Larkspur weekly sync at 10:00 for an hour on Zoom, marked with a calendar symbol, and under it a task, Check the Larkspur channel at 11:00 for 15 minutes."
      className="h-full w-full select-none text-left text-ink [container-type:inline-size]"
    >
      <div
        aria-hidden
        className="relative h-full overflow-hidden rounded-tl-[16px] bg-base shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline [--k:calc(100cqw/270)]"
        style={{ padding: `${u(16)} 0 0 ${u(16)}` }}
      >
        {/* The tag's group heading: symbol, name, the rule, and the group's time. */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: u(8),
            fontSize: u(11.5),
            color: MUTED,
            whiteSpace: "nowrap",
          }}
        >
          <SFCrossCase style={{ width: u(13), height: u(13) }} />
          <span>Larkspur Health</span>
          <span
            style={{ flex: 1, height: 1, background: "rgb(0 0 0 / 0.12)" }}
          />
          <span style={{ paddingRight: u(12) }}>1h 15m</span>
        </div>
        <Row title="Larkspur weekly sync" detail="10:00 · 1h · Zoom" meeting />
        <Row title="Check the Larkspur channel" detail="11:00 · 15m" />
        <Row title="Call Marta about the consent copy" detail="11:30 · 10m" />
      </div>
    </div>
  );
}
