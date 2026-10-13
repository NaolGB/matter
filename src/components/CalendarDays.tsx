/* Three days of the Calendar's week, drawn in the app's own look (from the capture in
   Screenshots/hero-2026-10-12/cards): tasks as grey blocks, meetings from a subscribed calendar
   as light tints of its colour, each block led by its dot, the selected day's date in an ink
   circle, and the red line at the present minute. It is a picture: nothing in it can be pressed.

   The days are the demo world's, Tuesday 13 to Thursday 15 October at 9:41, the hero's moment.
   Finished tasks and anything under a quarter of an hour are left out. An hour is drawn nearly
   twice as tall as the app draws it, so a 15-minute block has room for its title on one line
   instead of a clipped sliver. On a phone, where the card is narrow, the picture is drawn smaller
   and shows two days, so Tuesday's side-by-side blocks keep their words. */

const START = 8 * 60 + 45;
const END = 13 * 60 + 30;
const HOUR = 80;
const NOW = 9 * 60 + 41;
const FEED = "#5e5ce6";

const days = [
  { name: "Tue", date: 13 },
  { name: "Wed", date: 14 },
  { name: "Thu", date: 15 },
];
const hours = [9, 10, 11, 12, 13];

/* `lane` is which half of the column a block takes when two things overlap. */
type Entry = { day: number; at: [number, number]; minutes: number; title: string; meeting?: boolean; lane?: 0 | 1 };

const entries: Entry[] = [
  { day: 0, at: [9, 0], minutes: 90, title: "Write the Mosaic pitch story", lane: 0 },
  { day: 0, at: [9, 30], minutes: 15, title: "Studio standup", meeting: true, lane: 1 },
  { day: 0, at: [10, 0], minutes: 60, title: "Larkspur weekly sync", meeting: true, lane: 1 },
  { day: 0, at: [11, 0], minutes: 30, title: "Update the studio wiki" },
  { day: 0, at: [11, 30], minutes: 30, title: "Reconcile the expense receipts" },

  { day: 1, at: [9, 30], minutes: 15, title: "Studio standup", meeting: true },
  { day: 1, at: [11, 0], minutes: 30, title: "Juniper portal review", meeting: true },
  { day: 1, at: [11, 30], minutes: 20, title: "Prepare the usability session room" },
  { day: 1, at: [12, 0], minutes: 15, title: "Check the Larkspur channel" },
  { day: 1, at: [12, 30], minutes: 15, title: "Shutdown review" },
  { day: 1, at: [12, 45], minutes: 15, title: "Inbox to zero" },
  { day: 1, at: [13, 0], minutes: 15, title: "Plan the day" },
  { day: 1, at: [13, 15], minutes: 15, title: "Triage the research inbox" },

  { day: 2, at: [9, 30], minutes: 15, title: "Studio standup", meeting: true },
  { day: 2, at: [10, 0], minutes: 45, title: "Larkspur usability session", meeting: true },
  { day: 2, at: [11, 0], minutes: 45, title: "Larkspur usability session", meeting: true },
  { day: 2, at: [11, 45], minutes: 15, title: "Shutdown review" },
  { day: 2, at: [12, 15], minutes: 15, title: "Inbox to zero" },
  { day: 2, at: [12, 30], minutes: 15, title: "Plan the day" },
  { day: 2, at: [13, 0], minutes: 45, title: "Debrief the usability sessions" },
];

const top = (minute: number) => ((minute - START) * HOUR) / 60;

/** A length the way the app says it everywhere (DESIGN.md, Words): 45m, 2h, 1h 30m. */
function length(minutes: number) {
  if (minutes < 60) return `${minutes}m`;
  const rest = minutes % 60;
  return rest === 0 ? `${minutes / 60}h` : `${Math.floor(minutes / 60)}h ${rest}m`;
}

function Block({ entry }: { entry: Entry }) {
  const height = (entry.minutes * HOUR) / 60 - 2;
  /* A short block has room for its title only. The length is added once there is a second line
     for it, and the title may take two lines once the block is taller still. */
  const tall = height >= 36;
  const wrap = height >= 70 ? "line-clamp-2" : "truncate";
  return (
    <div
      className={`absolute flex gap-[5px] overflow-hidden rounded-[6px] border px-[6px] text-[11.5px] leading-[15px] ${
        tall ? "py-[3px]" : "items-center"
      } ${entry.meeting ? "border-[#bdbdf3] bg-[#e8e8fc]" : "border-[#c8c8cc] bg-[#e5e5e7]"}`}
      style={{
        top: top(entry.at[0] * 60 + entry.at[1]) + 1,
        height,
        left: `calc(${(entry.lane ?? 0) * 50}% + 3px)`,
        width: `calc(${entry.lane === undefined ? 100 : 50}% - 6px)`,
      }}
    >
      <span
        className={`size-[5px] shrink-0 rounded-full ${tall ? "mt-[5px]" : ""}`}
        style={{ background: entry.meeting ? FEED : "var(--ink)" }}
      />
      <div className="min-w-0">
        <p className={wrap}>{entry.title}</p>
        {tall && <p className="whitespace-nowrap text-ink-muted">{length(entry.minutes)}</p>}
      </div>
    </div>
  );
}

export function CalendarDays() {
  return (
    <div
      role="img"
      aria-label="Three days of the Calendar's week, Tuesday 13 to Thursday 15 October: meetings from a subscribed calendar beside the day's tasks, and the red line at 9:41 on Tuesday."
      className="select-none overflow-hidden rounded-t-[16px] bg-base text-left shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline max-sm:[zoom:0.8]"
    >
      <div aria-hidden>
        <div className="flex border-b border-hairline pb-2.5 pl-10 pt-3">
          {days.map((day, index) => (
            <div key={day.name} className={`flex-1 text-center ${index === 2 ? "max-sm:hidden" : ""}`}>
              <p className="text-[12px] text-ink-muted">{day.name}</p>
              <p
                className={`mx-auto mt-0.5 flex size-7 items-center justify-center rounded-full text-[16px] font-medium ${
                  index === 0 ? "bg-ink text-[var(--base)]" : ""
                }`}
              >
                {day.date}
              </p>
            </div>
          ))}
        </div>

        <div className="relative flex" style={{ height: top(END) }}>
          {hours.map((hour) => (
            <div key={hour} className="absolute inset-x-0" style={{ top: top(hour * 60) }}>
              <span className="absolute left-0 w-10 -translate-y-1/2 pr-1.5 text-right text-[11px] tabular-nums text-ink-muted">
                {hour}:00
              </span>
              <span className="absolute left-10 right-0 h-px bg-hairline" />
            </div>
          ))}
          <div className="w-10 shrink-0" />
          {days.map((day, index) => (
            <div key={day.name} className={`relative flex-1 border-l border-hairline ${index === 2 ? "max-sm:hidden" : ""}`}>
              {entries
                .filter((entry) => entry.day === index)
                .map((entry) => (
                  <Block key={`${entry.at.join(":")}-${entry.title}`} entry={entry} />
                ))}
              {index === 0 && (
                <div className="absolute inset-x-0 z-10 h-[1.5px] bg-late" style={{ top: top(NOW) }}>
                  <span className="absolute -left-1 top-1/2 size-[7px] -translate-y-1/2 rounded-full bg-late" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
