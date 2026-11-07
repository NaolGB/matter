import { Fragment } from "react";
import lines from "@/content/app-lines.json";
import { SFChevronRight } from "@/components/symbols";

/* The coming days with their room, drawn in the iPhone's look for the Upcoming capacity slot of the
   features containers (Naol, 2026-11-07). Measured from the capture in
   Screenshots/demo-2026-11-06/iphone/02-tasks-upcoming.png and built from TasksView.swift
   (`upcomingRows`, `daySummary`) and CapacityVerdict.swift: each day folded to its verdict, the
   planned time then the room left or the amount over, the figures in ink and only "over" in the
   app's orange, with the chevron that opens the day. It is a picture: nothing in it can be pressed.

   The days are the demo's week after Tuesday 10 November 2026, as both apps read them. Every word
   of the app's comes from app-lines.json.

   Every measure is in points, and one point is `--k`: the picture's width over 370, the list's
   width on the iPhone. */

const u = (n: number) => `calc(var(--k) * ${n})`;
const INK = "#1d1d1f";
const MUTED = "#86868b";
const FAINT = "#c7c7cc";
const ORANGE = "#f58a1f";

const DAYS: { name: string; planned: string; room: string; over?: boolean }[] =
  [
    { name: lines.tomorrow.text, planned: "5h 45m", room: "15m" },
    { name: "Thursday", planned: "6h 10m", room: "10m", over: true },
    { name: "Friday", planned: "5h 25m", room: "35m" },
    { name: "Saturday", planned: "1h 50m", room: "4h 10m" },
    { name: "Sunday", planned: "1h 5m", room: "4h 55m" },
    { name: "Monday", planned: "5h 40m", room: "20m" },
    { name: "Tuesday", planned: "5h 55m", room: "5m" },
  ];

export function UpcomingDays() {
  const said = DAYS.map(
    (d) =>
      `${d.name}, ${d.planned}, ${d.room} ${d.over ? lines.over.text : lines.free.text}`,
  ).join("; ");
  return (
    <div
      role="img"
      aria-label={`${lines.upcoming.text} on the iPhone, each coming day with the time planned and what is left: ${said}.`}
      className="w-full max-w-[370px] select-none text-left text-ink [container-type:inline-size]"
    >
      {/* On a white card, as a list sits on the phone's page; the columns share their edges, so the
          hours end together and the room ends at the chevron (Naol, 2026-11-07). */}
      <div
        aria-hidden
        className="rounded-t-[16px] bg-base shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline [--k:calc(100cqw/370)]"
        style={{ padding: `${u(18)} ${u(18)} 0` }}
      >
        <p
          style={{
            fontSize: u(22),
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            marginBottom: u(6),
          }}
        >
          {lines.upcoming.text}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) auto auto auto",
            gridAutoRows: u(44),
            alignItems: "center",
            columnGap: u(8),
            fontSize: u(17),
          }}
        >
          {DAYS.map((day) => (
            <Fragment key={day.name}>
              <span
                style={{
                  minWidth: 0,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {day.name}
              </span>
              <span
                style={{
                  justifySelf: "end",
                  fontSize: u(15),
                  color: MUTED,
                  fontVariantNumeric: "tabular-nums",
                  whiteSpace: "nowrap",
                }}
              >
                {day.planned} ·
              </span>
              <span
                style={{
                  justifySelf: "end",
                  fontSize: u(15),
                  color: MUTED,
                  fontVariantNumeric: "tabular-nums",
                  whiteSpace: "nowrap",
                }}
              >
                <span style={{ color: INK }}>{day.room}</span>{" "}
                <span style={{ color: day.over ? ORANGE : MUTED }}>
                  {day.over ? lines.over.text : lines.free.text}
                </span>
              </span>
              <SFChevronRight
                style={{ width: u(11), height: u(11), color: FAINT }}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
