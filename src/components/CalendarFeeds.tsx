import lines from "@/content/app-lines.json";
import { SFCalendarBadgePlus, SFCheckmark, SFEye } from "@/components/symbols";

/* The Feeds group of Settings ▸ Calendars, drawn in the app's look from
   CalendarSubscriptionsView.swift and the 2026-10-12 capture of the form (Screenshots/user-testing).
   It is a picture: nothing in it can be pressed. The feeds are made up, in the colours the demo
   world's calendars have in the captures. Every word of the app's comes from app-lines.json, and
   the symbols are the app's own (eye, calendar.badge.plus, checkmark; see DESIGN.md). */

const FEEDS = [
  {
    name: "Studio",
    url: "https://calendars.example/studio.ics",
    color: "#5e5ce6",
    counts: true,
  },
  {
    name: "Home",
    url: "https://calendars.example/home.ics",
    color: "#34c759",
    counts: false,
  },
];

export function CalendarFeeds() {
  return (
    <div
      role="img"
      aria-label={`Matter's calendar feeds: Studio treated as tasks, Home not, and a button to ${lines.calendar.text.toLowerCase()}.`}
      className="w-full max-w-[520px] select-none overflow-hidden rounded-[14px] bg-track text-left"
    >
      {FEEDS.map((feed) => (
        <div
          key={feed.name}
          className="flex items-center gap-3 border-b border-hairline px-4 py-3"
        >
          <span
            aria-hidden
            className="size-3 shrink-0 rounded-full"
            style={{ background: feed.color }}
          />
          <span className="min-w-0 flex-1">
            <span className="block text-[14px]">{feed.name}</span>
            <span className="block truncate text-[11px] text-ink-muted">
              {feed.url}
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-[13px]">
            <span
              aria-hidden
              className={`flex size-4 items-center justify-center rounded-[4px] ${feed.counts ? "bg-ink text-[var(--base)]" : "bg-base ring-1 ring-inset ring-black/15"}`}
            >
              {feed.counts && <SFCheckmark className="size-2.5" />}
            </span>
            <span className="max-[419px]:hidden">
              {lines.treatAsTasks.text}
            </span>
          </span>
          <SFEye aria-hidden className="size-4 shrink-0 text-ink-muted" />
        </div>
      ))}
      <div className="flex items-center gap-2 px-4 py-3 text-[13px] font-medium">
        <SFCalendarBadgePlus aria-hidden className="size-4" />
        {lines.calendar.text}…
      </div>
    </div>
  );
}
