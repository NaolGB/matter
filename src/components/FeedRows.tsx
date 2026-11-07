import lines from "@/content/app-lines.json";
import { SFCalendarBadgePlus, SFCheckmark } from "@/components/symbols";

/* The Feeds group of Settings ▸ Calendars close up, for the Add a feed slot of the features
   containers (Naol, 2026-11-07): two feeds, one treated as tasks and one not, with the checkbox that decides it, and the row that adds a feed. The same rows CalendarFeeds draws at
   page size, from CalendarSubscriptionsView.swift, with made-up feeds in the demo's calendar
   colours, because the demo's own have addresses nobody should read. Every word of the app's and
   its symbols come from the app (app-lines.json; eye, calendar.badge.plus, checkmark). The card
   runs off the slot's right edge and foot. It is a picture: nothing in it can be pressed.

   Every measure is in points, and one point is `--k`: the picture's width over 270. */

const u = (n: number) => `calc(var(--k) * ${n})`;
const FEEDS = [
  {
    name: "Studio",
    url: "calendars.example/studio.ics",
    color: "#5e5ce6",
    counts: true,
  },
  {
    name: "Home",
    url: "calendars.example/home.ics",
    color: "#34c759",
    counts: false,
  },
];

export function FeedRows() {
  return (
    <div
      role="img"
      aria-label={`Matter's calendar feeds: Studio treated as tasks, Home not, each with its checkbox, and a row to ${lines.calendar.text.toLowerCase()}.`}
      className="h-full w-full select-none text-left text-ink [container-type:inline-size]"
    >
      <div
        aria-hidden
        className="relative h-full overflow-hidden rounded-tl-[16px] bg-base shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline [--k:calc(100cqw/230)]"
        style={{ paddingTop: u(8) }}
      >
        {FEEDS.map((feed) => (
          <div
            key={feed.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: u(10),
              height: u(46),
              paddingLeft: u(16),
              paddingRight: u(14),
              borderBottom: "1px solid rgb(0 0 0 / 0.08)",
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                width: u(10),
                height: u(10),
                borderRadius: "50%",
                background: feed.color,
                flex: "none",
              }}
            />
            <span style={{ flex: 1, minWidth: 0, fontSize: u(15) }}>
              {feed.name}
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: u(7),
                fontSize: u(12.5),
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: u(16),
                  height: u(16),
                  borderRadius: u(4.5),
                  background: feed.counts ? "#1d1d1f" : "#fff",
                  boxShadow: feed.counts
                    ? "none"
                    : "inset 0 0 0 1px rgb(0 0 0 / 0.2)",
                  color: "#fff",
                }}
              >
                {feed.counts && (
                  <SFCheckmark style={{ width: u(10), height: u(10) }} />
                )}
              </span>
              {lines.treatAsTasks.text}
            </span>
          </div>
        ))}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: u(8),
            height: u(46),
            paddingLeft: u(16),
            fontSize: u(13.5),
            fontWeight: 500,
            whiteSpace: "nowrap",
          }}
        >
          <SFCalendarBadgePlus
            style={{ width: u(15), height: u(15), flex: "none" }}
          />
          {lines.calendar.text}…
        </div>
      </div>
    </div>
  );
}
