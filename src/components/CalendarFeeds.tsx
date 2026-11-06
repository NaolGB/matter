import lines from "@/content/app-lines.json";

/* The Feeds group of Settings ▸ Calendars, drawn in the app's look from
   CalendarSubscriptionsView.swift and the 2026-10-12 capture of the form (Screenshots/user-testing).
   It is a picture: nothing in it can be pressed. The feeds are made up, in the colours the demo
   world's calendars have in the captures. Every word of the app's comes from app-lines.json. */

const FEEDS = [
  { name: "Studio", url: "https://calendars.example/studio.ics", color: "#5e5ce6", counts: true },
  { name: "Home", url: "https://calendars.example/home.ics", color: "#34c759", counts: false },
];

function Eye() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-4 shrink-0 text-ink-muted" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1.5 8S4 3.5 8 3.5 14.5 8 14.5 8 12 12.5 8 12.5 1.5 8 1.5 8z" />
      <circle cx="8" cy="8" r="1.8" />
    </svg>
  );
}

export function CalendarFeeds() {
  return (
    <div
      role="img"
      aria-label={`Matter's calendar feeds: Studio counts toward load, Home does not, and a button to ${lines.calendar.text.toLowerCase()}.`}
      className="w-full max-w-[520px] select-none overflow-hidden rounded-[14px] bg-track text-left"
    >
      {FEEDS.map((feed) => (
        <div key={feed.name} className="flex items-center gap-3 border-b border-hairline px-4 py-3">
          <span aria-hidden className="size-3 shrink-0 rounded-full" style={{ background: feed.color }} />
          <span className="min-w-0 flex-1">
            <span className="block text-[14px]">{feed.name}</span>
            <span className="block truncate text-[11px] text-ink-muted">{feed.url}</span>
          </span>
          <span className="flex shrink-0 items-center gap-1.5 text-[13px]">
            <span
              aria-hidden
              className={`flex size-4 items-center justify-center rounded-[4px] ${feed.counts ? "bg-ink text-[var(--base)]" : "bg-base ring-1 ring-inset ring-black/15"}`}
            >
              {feed.counts && (
                <svg viewBox="0 0 12 12" className="size-2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2.5 6.5 5 9l4.5-6" />
                </svg>
              )}
            </span>
            <span className="max-[419px]:hidden">{lines.countsTowardLoad.text}</span>
          </span>
          <Eye />
        </div>
      ))}
      <div className="flex items-center gap-2 px-4 py-3 text-[13px] font-medium">
        <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 4.5h11v9h-11zM2.5 7h11M5.5 2.5v3M10.5 2.5v3M10.5 9v3M9 10.5h3" />
        </svg>
        {lines.calendar.text}…
      </div>
    </div>
  );
}
