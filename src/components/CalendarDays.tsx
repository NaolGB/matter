/* Three days of the calendar, drawn in the app's own look: tasks in grey, meetings in their
   calendar's colour, and the red line at the present minute. It is a picture: nothing in it can
   be pressed. The days are the demo's, at the minute the screenshots are taken, with the
   finished tasks and everything under half an hour left out, so the rest can be read. An hour
   is drawn taller than the app draws it, for the same reason. On a phone, where the card is
   narrow, the whole picture is drawn smaller. */

const START = 8 * 60 + 45;
const HOUR = 80;
const NOW = 9 * 60 + 41;
const FEED = "#5E5CE6";

const days = [
  { name: "Tue", date: 6 },
  { name: "Wed", date: 7 },
  { name: "Thu", date: 8 },
];
const hours = [9, 10, 11, 12, 13];

/* `lane` is which half of the column a block takes when two things overlap. */
type Entry = { day: number; at: [number, number]; minutes: number; title: string; meeting?: boolean; lane?: 0 | 1 };

const entries: Entry[] = [
  { day: 0, at: [9, 0], minutes: 90, title: "Write the Mosaic pitch story", lane: 0 },
  { day: 0, at: [10, 0], minutes: 60, title: "Larkspur weekly sync", meeting: true, lane: 1 },
  { day: 0, at: [11, 0], minutes: 30, title: "Prioritise the dashboard backlog with Ravi" },
  { day: 1, at: [11, 0], minutes: 30, title: "Juniper portal review", meeting: true },
  { day: 1, at: [12, 15], minutes: 120, title: "Draft the Mosaic proposal" },
  { day: 2, at: [10, 0], minutes: 45, title: "Larkspur usability session", meeting: true },
  { day: 2, at: [11, 0], minutes: 45, title: "Larkspur usability session", meeting: true },
  { day: 2, at: [11, 45], minutes: 60, title: "Write the usability test script" },
  { day: 2, at: [12, 45], minutes: 45, title: "Debrief the usability sessions" },
];

const top = (minute: number) => ((minute - START) * HOUR) / 60;

/** A length the way the app's blocks say it: 45min, 2h, 1h 30m. */
function length(minutes: number) {
  if (minutes < 60) return `${minutes}min`;
  const rest = minutes % 60;
  return rest === 0 ? `${minutes / 60}h` : `${Math.floor(minutes / 60)}h ${rest}m`;
}

function Block({ entry }: { entry: Entry }) {
  const height = (entry.minutes * HOUR) / 60 - 2;
  const hue = entry.meeting ? FEED : "var(--ink)";
  /* A short block has room for its title only. The length is added once there is a second
     line for it, and the title may take two lines once the block is taller still: three in a
     long block, which the app does not need but a half-width column here does. */
  const tall = height >= 32;
  const wrap = height >= 100 ? "line-clamp-3" : height >= 50 ? "line-clamp-2" : "truncate";
  return (
    <div
      className="absolute overflow-hidden rounded-[7px] border px-[5px] py-[1px] text-[11.5px] leading-[15px]"
      style={{
        top: top(entry.at[0] * 60 + entry.at[1]),
        height,
        left: `calc(${(entry.lane ?? 0) * 50}% + 2px)`,
        width: `calc(${entry.lane === undefined ? 100 : 50}% - 4px)`,
        background: `color-mix(in srgb, ${hue} 14%, transparent)`,
        borderColor: `color-mix(in srgb, ${hue} 30%, transparent)`,
      }}
    >
      <p className={wrap}>{entry.title}</p>
      {tall && <p className="whitespace-nowrap text-[10.5px] text-ink-faint">{length(entry.minutes)}</p>}
    </div>
  );
}

export function CalendarDays() {
  return (
    <div
      role="img"
      aria-label="Three days of the calendar, Tuesday to Thursday, with tasks and meetings side by side and a line at the present time, 9:41."
      className="select-none overflow-hidden rounded-t-[16px] bg-base text-left shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline max-sm:[zoom:0.8]"
    >
      <div aria-hidden>
        <div className="flex border-b border-hairline pb-2.5 pl-8 pt-3">
          {days.map((day, index) => (
            <div key={day.name} className="flex-1 text-center">
              <p className="text-[12px] text-ink-faint">{day.name}</p>
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

        <div className="relative flex" style={{ height: top(13 * 60 + 30) }}>
          {hours.map((hour) => (
            <div key={hour} className="absolute inset-x-0" style={{ top: top(hour * 60) }}>
              <span className="absolute left-0 w-8 -translate-y-1/2 pr-1.5 text-right text-[11px] tabular-nums text-ink-faint">
                {String(hour).padStart(2, "0")}
              </span>
              <span className="absolute left-8 right-0 h-px bg-hairline" />
            </div>
          ))}
          <div className="w-8 shrink-0" />
          {days.map((day, index) => (
            <div key={day.name} className="relative flex-1 border-l border-hairline">
              {entries
                .filter((entry) => entry.day === index)
                .map((entry) => (
                  <Block key={`${entry.at.join(":")}-${entry.title}`} entry={entry} />
                ))}
              {index === 0 && (
                <div className="absolute inset-x-0 h-[1.5px] bg-[#ff3b30]" style={{ top: top(NOW) }}>
                  <span className="absolute -left-1 top-1/2 size-[7px] -translate-y-1/2 rounded-full bg-[#ff3b30]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
