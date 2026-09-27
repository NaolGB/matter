import { Fragment, type ReactNode } from "react";
import { Mark } from "./site";

/* Every mock below is drawn from the Mac app's own layout and strings. Tag and
   feed colours are the app's swatches (DukaPalette.tagPalette), which are Apple's
   system palette: the user's vocabulary for their categories, not the product's. */
const tag = { writing: "#0A84FF", admin: "#FF9F0A", feed: "#5E5CE6" };

type GlyphName =
  | "checklist"
  | "sunrise"
  | "calendar"
  | "book"
  | "gear"
  | "gauge"
  | "pin"
  | "play"
  | "pause"
  | "timer"
  | "grip";

export function Glyph({
  name,
  className = "size-[14px]",
}: {
  name: GlyphName;
  className?: string;
}) {
  const paths: Record<GlyphName, ReactNode> = {
    checklist: (
      <path d="M2.5 4.3l1.3 1.3L6 3.4M8 4.5h5.5M2.5 8.3l1.3 1.3L6 7.4M8 8.5h5.5M2.5 12.3l1.3 1.3L6 11.4M8 12.5h5.5" />
    ),
    sunrise: (
      <path d="M2.5 11.5h11M8 3.5v1.7M4.2 8.8a3.8 3.8 0 0 1 7.6 0M2 8.8h1.2M12.8 8.8H14M4.6 5.4l.9.9M11.4 5.4l-.9.9" />
    ),
    calendar: (
      <>
        <rect x="2.5" y="3.5" width="11" height="10" rx="2" />
        <path d="M2.5 7h11M5.5 2v3M10.5 2v3" />
      </>
    ),
    book: (
      <path d="M2.5 3.5h4A1.5 1.5 0 0 1 8 5v8.5a1 1 0 0 0-1-1H2.5zM13.5 3.5h-4A1.5 1.5 0 0 0 8 5v8.5a1 1 0 0 1 1-1h4.5z" />
    ),
    gear: (
      <>
        <circle cx="8" cy="8" r="2.2" />
        <path d="M8 1.8v2M8 12.2v2M1.8 8h2M12.2 8h2M3.6 3.6L5 5M11 11l1.4 1.4M3.6 12.4L5 11M11 5l1.4-1.4" />
      </>
    ),
    gauge: (
      <>
        <path d="M2.5 11.5a5.5 5.5 0 0 1 11 0" />
        <path d="M8 11.5l2.6-3.4" />
      </>
    ),
    pin: (
      <>
        <circle cx="8" cy="5.5" r="3" />
        <path d="M8 8.5V14" />
      </>
    ),
    play: <path d="M5 3.5v9l7.5-4.5z" fill="currentColor" stroke="none" />,
    pause: <path d="M5.5 3.5v9M10.5 3.5v9" strokeWidth="2" />,
    timer: (
      <>
        <circle cx="8" cy="9" r="5" />
        <path d="M8 6.5V9l1.8 1.2M6.5 2h3" />
      </>
    ),
    grip: (
      <path d="M6 4h.01M10 4h.01M6 8h.01M10 8h.01M6 12h.01M10 12h.01" strokeWidth="2" />
    ),
  };
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

export function Dot({ color, className = "" }: { color: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={`inline-block size-[7px] shrink-0 rounded-full ${className}`}
      style={{ background: color }}
    />
  );
}

function Circle({ done = false }: { done?: boolean }) {
  return (
    <span
      aria-hidden
      className={`flex size-[13px] shrink-0 items-center justify-center rounded-full border ${
        done ? "border-ink bg-ink text-[var(--base)]" : "border-ink-faint"
      }`}
    >
      {done && (
        <svg
          viewBox="0 0 10 10"
          className="size-[7px]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 5.2l2 2 4-4.4" />
        </svg>
      )}
    </span>
  );
}

function MiniButton({
  children,
  prominent = false,
  band = false,
  className = "",
}: {
  children: ReactNode;
  prominent?: boolean;
  band?: boolean;
  className?: string;
}) {
  const look = prominent
    ? band
      ? "bg-band-ink text-band"
      : "bg-ink text-[var(--base)]"
    : band
      ? "border border-band-hairline bg-band-card"
      : "border border-hairline bg-track";
  return (
    <span
      className={`inline-flex h-[24px] items-center justify-center gap-1 rounded-[7px] px-2.5 text-[11px] font-medium ${look} ${className}`}
    >
      {children}
    </span>
  );
}

function Chip({
  children,
  selected = false,
  color,
}: {
  children: ReactNode;
  selected?: boolean;
  color?: string;
}) {
  return (
    <span
      className={`inline-flex h-[24px] items-center gap-1.5 rounded-full border px-2.5 text-[11px] font-medium ${
        selected ? "border-ink bg-ink text-[var(--base)]" : "border-hairline bg-base text-ink"
      }`}
    >
      {color && <Dot color={color} />}
      {children}
    </span>
  );
}

export function CapacityChip({
  label,
  tone = "free",
}: {
  label: string;
  tone?: "free" | "over" | "full";
}) {
  const color = tone === "free" ? "text-free" : tone === "over" ? "text-over" : "text-ink-muted";
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-semibold ${color}`}>
      <Glyph name="gauge" className="size-[12px]" />
      {label}
    </span>
  );
}

// MARK: - The board

type Row = { title: string; meta: string; done?: boolean };
type Group = { title: string; color?: string; trailing: string; rows: Row[] };

const todayGroups: Group[] = [
  {
    title: "Writing",
    color: tag.writing,
    trailing: "1h 15m",
    rows: [
      { title: "Reply to the reviewer", meta: "30m" },
      { title: "Outline chapter 3", meta: "45m" },
    ],
  },
  {
    title: "Admin",
    color: tag.admin,
    trailing: "30m",
    rows: [
      { title: "Pay the electricity bill", meta: "15m" },
      { title: "Renew the domain", meta: "15m" },
    ],
  },
  {
    title: "No tag",
    trailing: "30m",
    rows: [{ title: "Standup", meta: "09:30" }],
  },
  {
    title: "Done",
    trailing: "20m",
    rows: [{ title: "Morning review", meta: "20m", done: true }],
  },
];

const upcomingGroups: Group[] = [
  {
    title: "Tomorrow",
    trailing: "1h 15m · 4h 45m free",
    rows: [
      { title: "Week review", meta: "45m" },
      { title: "Call the accountant", meta: "30m" },
    ],
  },
  {
    title: "Wednesday",
    trailing: "1h · 5h free",
    rows: [{ title: "Ship the release notes", meta: "1h" }],
  },
  {
    title: "October",
    trailing: "15m",
    rows: [{ title: "Renew the certificate", meta: "15m" }],
  },
];

function BoardColumn({
  title,
  groups,
  className = "",
}: {
  title: string;
  groups: Group[];
  className?: string;
}) {
  return (
    <div className={`min-w-0 ${className}`}>
      <p className="px-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
        {title}
      </p>
      {groups.map((group) => (
        <div key={group.title}>
          <div className="mt-3 flex items-center gap-2 px-2 pb-1">
            {group.color && <Dot color={group.color} />}
            <span className="text-[11.5px] font-semibold">{group.title}</span>
            <span className="h-px flex-1 bg-hairline" />
            <span className="text-[10.5px] tabular-nums text-ink-muted">{group.trailing}</span>
          </div>
          <ul>
            {group.rows.map((row) => (
              <li
                key={row.title}
                className={`flex items-center gap-2.5 rounded-md px-2 py-[6px] ${
                  row.done ? "text-ink-muted line-through decoration-ink-faint" : ""
                }`}
              >
                <Circle done={row.done} />
                <span className="min-w-0 flex-1 truncate">{row.title}</span>
                <span className="font-mono text-[11px] tabular-nums text-ink-muted">{row.meta}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** The work bucket: a wallet of cards, one per open session, the front one fully shown. */
export function BucketStack({ compact = false }: { compact?: boolean }) {
  return (
    <div className="relative" style={{ height: compact ? 138 : 150 }}>
      <div className="absolute inset-x-2 top-0 h-[120px] rounded-[12px] border border-hairline bg-card px-3 pt-2 text-[11.5px] text-ink-muted">
        <span className="flex items-center gap-2">
          <Dot color={tag.writing} />
          Reply to the reviewer
        </span>
      </div>
      <div className="absolute inset-x-0 top-[26px] flex h-[122px] flex-col rounded-[12px] border border-hairline bg-card p-3 shadow-[0_10px_24px_-14px_rgb(0_0_0/0.4)]">
        <div className="flex items-center gap-2">
          <Dot color={tag.writing} />
          <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium">
            Draft the capacity note
          </span>
        </div>
        <p className="mt-1.5 font-mono text-[26px] leading-none tabular-nums tracking-tight">23:41</p>
        <p className="mt-1 text-[10.5px] text-ink-muted">of 1h · Writing</p>
        <div className="mt-auto flex gap-1.5">
          <MiniButton>Pause</MiniButton>
          <MiniButton prominent>Complete</MiniButton>
        </div>
      </div>
    </div>
  );
}

const pages: { name: GlyphName; active?: boolean }[] = [
  { name: "checklist", active: true },
  { name: "sunrise" },
  { name: "calendar" },
  { name: "book" },
  { name: "gear" },
];

/** The main window: sidebar with the pages, the bucket and the capacity chip; the Tasks board beside it. */
export function MacWindow() {
  return (
    <div className="overflow-hidden rounded-[14px] border border-hairline bg-card text-[12.5px] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.35)]">
      <div className="flex h-[440px]">
        <aside className="hidden w-[228px] shrink-0 flex-col border-r border-hairline bg-track sm:flex">
          <div className="flex items-center px-3 pt-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-[11px] rounded-full bg-ink-faint" />
              <span className="size-[11px] rounded-full bg-ink-faint" />
              <span className="size-[11px] rounded-full bg-ink-faint" />
            </span>
            <span className="ml-auto flex items-center gap-0.5">
              {pages.map((page) => (
                <span
                  key={page.name}
                  className={`flex size-[24px] items-center justify-center rounded-[6px] ${
                    page.active
                      ? "bg-card text-ink shadow-[0_1px_2px_rgb(0_0_0/0.08)]"
                      : "text-ink-muted"
                  }`}
                >
                  <Glyph name={page.name} />
                </span>
              ))}
            </span>
          </div>
          <div className="mt-auto p-3">
            <div className="flex items-center justify-between px-1 pb-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                In progress
              </span>
              <CapacityChip label="2h 10m free" />
            </div>
            <BucketStack compact />
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
            <span className="text-[15px] font-semibold tracking-tight">Tasks</span>
            <span className="ml-auto flex items-center gap-1.5 text-[11px] text-ink-muted">
              <span className="rounded-[6px] border border-hairline px-2 py-1">Archive</span>
              <span className="rounded-[6px] border border-hairline px-2 py-1">Templates</span>
              <MiniButton prominent>New task</MiniButton>
            </span>
          </div>
          <div className="px-4 pt-3">
            <div className="flex h-[26px] items-center rounded-[7px] border border-hairline bg-base px-2.5 text-[11.5px] text-ink-faint">
              Quick find tasks…
            </div>
          </div>
          <div className="grid flex-1 grid-cols-1 gap-x-6 overflow-hidden px-4 pt-3 sm:grid-cols-2">
            <BoardColumn title="Today" groups={todayGroups} />
            <BoardColumn title="Upcoming" groups={upcomingGroups} className="hidden sm:block" />
          </div>
        </div>
      </div>
    </div>
  );
}

// MARK: - Capacity

/** The chip's hover table: the day as a whole against what is left of it. */
export function CapacityTable({ band = false }: { band?: boolean }) {
  const muted = band ? "text-band-muted" : "text-ink-muted";
  const rows = [
    { label: "Worked", dot: "var(--running)", all: "1h 20m", now: "—", free: false },
    { label: "Planned", dot: "currentColor", all: "4h 30m", now: "3h 10m", free: false },
    { label: "Free", dot: "var(--free)", all: "1h 30m", now: "2h 10m", free: true },
  ];
  return (
    <div
      className={`rounded-[12px] border p-4 text-[12px] ${
        band ? "border-band-hairline bg-band-card" : "border-hairline bg-card"
      }`}
    >
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-7 gap-y-2.5">
        <span />
        <span className={`text-[10px] font-semibold tracking-[0.08em] ${muted}`}>ALL DAY</span>
        <span className={`text-[10px] font-semibold tracking-[0.08em] ${muted}`}>FROM NOW</span>
        {rows.map((row) => (
          <Fragment key={row.label}>
            <span className="flex items-center gap-2">
              <span className="size-[6px] rounded-full" style={{ background: row.dot }} />
              {row.label}
            </span>
            <span className={`text-right font-mono tabular-nums ${row.free ? "text-free" : ""}`}>
              {row.all}
            </span>
            <span
              className={`text-right font-mono tabular-nums ${
                row.free ? "text-free" : row.now === "—" ? muted : ""
              }`}
            >
              {row.now}
            </span>
          </Fragment>
        ))}
        <span className={`col-span-3 my-0.5 h-px ${band ? "bg-band-hairline" : "bg-hairline"}`} />
        <span className={`text-[10px] font-semibold tracking-[0.08em] ${muted}`}>BUDGET</span>
        <span className="text-right font-mono font-semibold tabular-nums">6h</span>
        <span className="text-right font-mono font-semibold tabular-nums">5h 20m</span>
      </div>
    </div>
  );
}

/** The today gate, as the task editor shows it. */
export function GateNote({ band = false }: { band?: boolean }) {
  return (
    <div
      className={`rounded-[12px] border p-4 text-[12.5px] ${
        band ? "border-band-hairline bg-band-card" : "border-hairline bg-card"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span
          className={`size-[13px] shrink-0 rounded-full border ${
            band ? "border-band-muted" : "border-ink-faint"
          }`}
        />
        <span className="min-w-0 flex-1 truncate font-medium">Outline chapter 4</span>
        <span className="font-mono text-[11.5px] tabular-nums">1h 30m</span>
      </div>
      <p className="mt-3 text-over">Doesn&rsquo;t fit today — only 40m of headroom left.</p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <MiniButton prominent band={band}>
          Move to Thu Oct 2
        </MiniButton>
        <span className={`text-[11px] ${band ? "text-band-muted" : "text-ink-muted"}`}>
          the soonest day with room
        </span>
      </div>
    </div>
  );
}

// MARK: - The scheduler

type BlockKind = "event" | "personal" | "task" | "pinned" | "running";

const dayBlocks: { title: string; start: number; end: number; kind: BlockKind }[] = [
  { title: "Standup", start: 9.5, end: 10, kind: "event" },
  { title: "Outline chapter 3", start: 10, end: 10.75, kind: "task" },
  { title: "Draft the capacity note", start: 10.75, end: 11.75, kind: "running" },
  { title: "Lunch", start: 12.5, end: 13.25, kind: "personal" },
  { title: "Reply to the reviewer", start: 14, end: 14.5, kind: "pinned" },
  { title: "Renew the domain", start: 14.5, end: 15, kind: "task" },
];

const blockLook: Record<BlockKind, string> = {
  event: "border-transparent bg-track text-ink-muted",
  personal: "border-dashed border-hairline text-ink-faint",
  task: "border-hairline bg-base",
  pinned: "border-ink bg-base",
  running: "border-hairline bg-base",
};

/** One day as the calendar draws it: events, personal time, placed tasks, a pinned one, and now. */
export function DayTimeline() {
  const startHour = 9;
  const endHour = 17;
  const ph = 40;
  const now = 11.35;
  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);
  return (
    <div className="rounded-[12px] border border-hairline bg-card p-4 text-[11.5px]">
      <div className="relative" style={{ height: (endHour - startHour) * ph }}>
        {hours.map((hour) => (
          <div
            key={hour}
            className="absolute inset-x-0 flex items-center gap-2"
            style={{ top: (hour - startHour) * ph }}
          >
            <span className="w-9 text-right font-mono text-[10px] tabular-nums text-ink-faint">
              {hour}:00
            </span>
            <span className="h-px flex-1 bg-hairline" />
          </div>
        ))}
        {dayBlocks.map((block) => (
          <div
            key={block.title}
            className={`absolute left-12 right-0 overflow-hidden rounded-[6px] border px-2 ${blockLook[block.kind]}`}
            style={{
              top: (block.start - startHour) * ph + 1,
              height: (block.end - block.start) * ph - 2,
              borderLeftWidth: block.kind === "event" ? 3 : undefined,
              borderLeftColor: block.kind === "event" ? tag.feed : undefined,
            }}
          >
            <span className="flex h-full items-center gap-1.5 truncate">
              {block.kind === "pinned" && <Glyph name="pin" className="size-[11px]" />}
              {block.kind === "running" && <Dot color="var(--running)" />}
              {block.title}
            </span>
          </div>
        ))}
        <div
          className="absolute left-10 right-0 flex items-center"
          style={{ top: (now - startHour) * ph }}
        >
          <span className="size-[7px] -translate-x-1/2 rounded-full bg-running" />
          <span className="h-px flex-1 bg-running" />
        </div>
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[10.5px] text-ink-muted">
        <li className="flex items-center gap-1.5">
          <span className="h-[10px] w-[14px] rounded-[3px] border-l-[3px] bg-track" style={{ borderLeftColor: tag.feed }} />
          event from a feed
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-[10px] w-[14px] rounded-[3px] border border-dashed border-hairline" />
          personal, lowers the room
        </li>
        <li className="flex items-center gap-1.5">
          <span className="h-[10px] w-[14px] rounded-[3px] border border-hairline bg-base" />
          placed
        </li>
        <li className="flex items-center gap-1.5">
          <Glyph name="pin" className="size-[11px]" />
          pinned by you
        </li>
        <li className="flex items-center gap-1.5">
          <Dot color="var(--running)" />
          running
        </li>
      </ul>
    </div>
  );
}

// MARK: - Time

/** The status item: the mark, how many sessions are open, and the countdown of the one furthest along. */
export function MenuBarStrip() {
  return (
    <div className="flex items-center justify-end gap-4 rounded-[10px] border border-hairline bg-track px-3 py-1.5 text-[12px]">
      <span className="flex items-center gap-1.5 rounded-[6px] bg-base px-2 py-0.5 font-medium shadow-[0_1px_2px_rgb(0_0_0/0.08)]">
        <Mark className="h-[12px] w-[14px]" />
        <span className="font-mono tabular-nums">2 · 23:41</span>
      </span>
      <span className="text-ink-muted">Thu 11:21</span>
    </div>
  );
}

/** The menu bar panel: quick add above, what is running below. */
export function QuickPanel() {
  return (
    <div className="w-full max-w-[380px] overflow-hidden rounded-[14px] border border-hairline bg-card text-[12px] shadow-[0_30px_60px_-24px_rgb(0_0_0/0.35)]">
      <div className="flex items-center gap-2 border-b border-hairline px-3.5 py-2.5">
        <Mark className="h-[14px] w-[16px]" />
        <span className="text-[13px] font-semibold">Matter</span>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-track px-2 py-0.5 text-[10.5px] font-medium text-ink-muted">
          <Glyph name="gauge" className="size-[11px]" />
          2h 10m left today
        </span>
      </div>
      <div className="space-y-3 px-3.5 py-3">
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
          Quick add
        </p>
        <div className="rounded-[8px] border border-hairline bg-base px-3 py-2 text-[14px]">
          Renew the domain
        </div>
        <div className="text-[11px]">
          <p className="text-over">Might already be on the board:</p>
          <p className="text-ink-muted">Renew the certificate · Oct 14</p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {["Today", "Tomorrow", "Next week", "Someday"].map((chip, index) => (
            <Chip key={chip} selected={index === 0}>
              {chip}
            </Chip>
          ))}
          <span className="ml-auto rounded-[7px] border border-hairline px-2 py-1 text-[11px] text-ink-faint">
            fri 3pm
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="rounded-[7px] border border-hairline bg-base px-2.5 py-1 font-mono tabular-nums">
            15m
          </span>
          <Chip>Usually 20m</Chip>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-[10.5px] font-semibold text-ink-muted">Tags</span>
          <Chip selected color={tag.admin}>
            Admin
          </Chip>
          <Chip color={tag.writing}>Writing</Chip>
        </div>
        <MiniButton prominent className="h-[30px] w-full text-[12px]">
          Add task
        </MiniButton>
        <div className="h-px bg-hairline" />
        <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
          Now
        </p>
        <div className="flex items-center gap-2.5">
          <Dot color="var(--running)" />
          <span className="min-w-0 flex-1 truncate">Draft the capacity note</span>
          <span className="font-mono text-[11.5px] tabular-nums text-running">23:41</span>
          <MiniButton>Pause</MiniButton>
          <MiniButton>Complete</MiniButton>
        </div>
      </div>
      <div className="border-t border-hairline px-3.5 py-2 text-[11px] text-ink-muted">Open Matter</div>
    </div>
  );
}

/** An estimate field with the chip calibration offers. */
export function EstimateRow() {
  return (
    <div className="rounded-[12px] border border-hairline bg-card p-4 text-[12.5px]">
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
        Estimate
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="rounded-[7px] border border-hairline bg-base px-2.5 py-1 font-mono tabular-nums">
          30m
        </span>
        <Chip>Usually 45m</Chip>
        <Chip color={tag.writing}>Writing</Chip>
      </div>
    </div>
  );
}

// MARK: - Notes and Standup

function NoteLine({
  children,
  bullet = false,
  check = false,
  checked = false,
  grip = false,
}: {
  children: ReactNode;
  bullet?: boolean;
  check?: boolean;
  checked?: boolean;
  grip?: boolean;
}) {
  return (
    <div className="flex items-start gap-2">
      <span className="mt-[3px] w-[12px] shrink-0 text-ink-faint">
        {grip && <Glyph name="grip" className="size-[12px]" />}
      </span>
      {bullet && <span className="mt-[1px] w-3 shrink-0 text-center text-ink-muted">•</span>}
      {check && (
        <span
          className={`mt-[3px] flex size-[13px] shrink-0 items-center justify-center rounded-[4px] border ${
            checked ? "border-ink bg-ink text-[var(--base)]" : "border-ink-faint"
          }`}
        >
          {checked && (
            <svg viewBox="0 0 10 10" className="size-[8px]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 5.2l2 2 4-4.4" />
            </svg>
          )}
        </span>
      )}
      <span className={`min-w-0 flex-1 ${checked ? "text-ink-muted line-through decoration-ink-faint" : ""}`}>
        {children}
      </span>
    </div>
  );
}

function DateChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-[5px] border border-hairline bg-track px-1.5 py-0.5 text-[11.5px] font-medium">
      {children}
    </span>
  );
}

/** A note in the block editor. */
export function NoteMock() {
  return (
    <div className="rounded-[12px] border border-hairline bg-card p-5 text-[13px] leading-relaxed">
      <p className="text-[18px] font-semibold tracking-tight">Capacity, from now</p>
      <div className="mt-3 space-y-1.5">
        <NoteLine>
          <span className="text-[15px] font-semibold">Why the morning is gone</span>
        </NoteLine>
        <NoteLine>
          Budget is the smaller of the cap and the room the day has left. A spent hour is spent.
        </NoteLine>
        <NoteLine bullet grip>
          Personal events lower the room, not the cap
        </NoteLine>
        <NoteLine bullet>Work events count as planned work, like a task</NoteLine>
        <NoteLine check checked>
          Read <code className="rounded-[4px] bg-track px-1 font-mono text-[12px]">CapacityMath</code>
        </NoteLine>
        <NoteLine check>Ship the chip</NoteLine>
        <NoteLine>
          Review with Ada <DateChip>Fri Oct 3, 3:00pm</DateChip>
        </NoteLine>
      </div>
    </div>
  );
}

const prompts: [string, string][] = [
  ["What happened", "Shipped the capacity chip. The hover table took longer than the chip."],
  ["To do today", "Outline chapter 3, then the reviewer."],
  ["How I am", "Rested. A little behind."],
  ["Something I noticed", "Afternoons are for writing, apparently. The scheduler agrees."],
];

const written = [true, true, false, true, true, true, true];

/** A day in Standup, with the north star and the streak beside it. */
export function StandupMock() {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_210px]">
      <div className="rounded-[12px] border border-hairline bg-card p-5 text-[13px]">
        <p className="text-[18px] font-semibold tracking-tight">Thursday, October 2</p>
        <dl className="mt-4 space-y-4">
          {prompts.map(([prompt, text]) => (
            <div key={prompt}>
              <dt className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                {prompt}
              </dt>
              <dd className="mt-1 leading-relaxed">{text}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex flex-col gap-4">
        <div className="rounded-[12px] border border-hairline bg-card p-4 text-[13px]">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
            North star
          </p>
          <p className="mt-1.5 leading-relaxed">Finish the book before the next job starts.</p>
        </div>
        <div className="rounded-[12px] border border-hairline bg-card p-4">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
            Streak
          </p>
          <div className="mt-2 flex items-center gap-1.5">
            {written.map((day, index) => (
              <span
                key={index}
                className={`size-[9px] rounded-full ${day ? "bg-ink" : "border border-ink-faint"}`}
              />
            ))}
          </div>
          <p className="mt-2 text-[12px]">
            <span className="font-semibold">4 days</span>{" "}
            <span className="text-ink-muted">· longest 12</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// MARK: - Week review

const week = [
  { day: "Mon", tracked: 310, planned: 360 },
  { day: "Tue", tracked: 250, planned: 300 },
  { day: "Wed", tracked: 400, planned: 360 },
  { day: "Thu", tracked: 180, planned: 240 },
  { day: "Fri", tracked: 0, planned: 300, future: true },
  { day: "Sat", tracked: 0, planned: 0, future: true },
  { day: "Sun", tracked: 0, planned: 0, future: true },
];

function minutes(value: number) {
  const hours = Math.floor(value / 60);
  const rest = value % 60;
  if (hours === 0) return `${rest}m`;
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`;
}

/** The week's tracked time by day, with the planned tick over each column. One series, so no legend. */
export function ReviewFigure() {
  // Seven equal columns, so a plain HTML grid underneath lines up with the bars
  // and the day labels stay readable at any width instead of scaling with the SVG.
  const width = 560;
  const height = 150;
  const pad = { top: 14, bottom: 4 };
  const max = 420;
  const column = width / week.length;
  const barWidth = 40;
  const plotHeight = height - pad.top - pad.bottom;
  const y = (value: number) => pad.top + plotHeight - (value / max) * plotHeight;
  const stats = [
    ["Tracked", "19h"],
    ["Planned", "21h"],
    ["Budget", "24h"],
    ["Delivered", "90%"],
    ["Switches", "14"],
    ["Longest block", "1h 50m"],
  ];
  return (
    <div className="rounded-[12px] border border-hairline bg-card p-4 text-[12px]">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-2 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
          This week
        </span>
        {["This week", "Last week", "Last 30 days"].map((span, index) => (
          <Chip key={span} selected={index === 0}>
            {span}
          </Chip>
        ))}
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="mt-4 w-full"
        role="img"
        aria-label="Tracked time by day, with the planned time marked over each column"
      >
        <line x1={0} x2={width} y1={y(0)} y2={y(0)} stroke="var(--hairline)" />
        {week.map((entry, index) => {
          const x = index * column + (column - barWidth) / 2;
          return (
            <g key={entry.day}>
              <title>{`${entry.day}: ${minutes(entry.tracked)} tracked of ${minutes(entry.planned)} planned`}</title>
              {entry.tracked > 0 && (
                <rect
                  x={x}
                  y={y(entry.tracked)}
                  width={barWidth}
                  height={y(0) - y(entry.tracked)}
                  rx="4"
                  fill="currentColor"
                />
              )}
              {entry.planned > 0 && (
                <line
                  x1={x - 4}
                  x2={x + barWidth + 4}
                  y1={y(entry.planned)}
                  y2={y(entry.planned)}
                  stroke="var(--ink-muted)"
                  strokeWidth="2"
                  strokeDasharray={entry.future ? "3 3" : undefined}
                />
              )}
            </g>
          );
        })}
      </svg>
      <div className="mt-1.5 grid grid-cols-7 text-center text-[11px]">
        {week.map((entry) => (
          <span key={entry.day} className={entry.future ? "text-ink-faint" : "text-ink-muted"}>
            {entry.day}
          </span>
        ))}
      </div>
      <p className="mt-1 text-[10.5px] text-ink-muted">
        Columns are tracked time. The line over each is what was planned; dashed where the day has not happened yet.
      </p>
      <dl className="mt-4 grid grid-cols-3 gap-y-3 border-t border-hairline pt-4 sm:grid-cols-6">
        {stats.map(([term, value]) => (
          <div key={term}>
            <dt className="text-[10.5px] text-ink-muted">{term}</dt>
            <dd className="font-mono text-[14px] font-semibold tabular-nums">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// MARK: - iPhone

/** The Lock Screen card for a running session. */
export function LiveActivityCard() {
  return (
    <div className="w-full max-w-[360px] rounded-[22px] border border-hairline bg-card p-4 text-[13px] shadow-[0_30px_60px_-24px_rgb(0_0_0/0.35)]">
      <div className="flex items-center gap-3">
        <Mark className="h-[20px] w-[22px]" />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium">Draft the capacity note</p>
          <p className="text-[11px] text-ink-muted">Writing · of 1h</p>
        </div>
        <span className="font-mono text-[24px] tabular-nums tracking-tight">23:41</span>
      </div>
      <div className="mt-3 flex gap-2">
        <MiniButton className="h-[30px] flex-1 text-[12px]">
          <Glyph name="pause" className="size-[12px]" />
          Pause
        </MiniButton>
        <MiniButton prominent className="h-[30px] flex-1 text-[12px]">
          Done
        </MiniButton>
      </div>
    </div>
  );
}

/** The Control Center toggle, in both of its states. */
export function ControlToggle({ running = false }: { running?: boolean }) {
  return (
    <div
      className={`flex h-[76px] w-[168px] items-center gap-3 rounded-[20px] border px-4 ${
        running ? "border-ink bg-ink text-[var(--base)]" : "border-hairline bg-track"
      }`}
    >
      <span
        className={`flex size-[34px] shrink-0 items-center justify-center rounded-full ${
          running ? "bg-[rgb(255_255_255/0.18)]" : "bg-base"
        }`}
      >
        <Glyph name={running ? "timer" : "play"} className="size-[16px]" />
      </span>
      <span className="text-[13px] font-medium leading-tight">
        {running ? "Running" : "Start next"}
        <br />
        <span className={`text-[10.5px] font-normal ${running ? "opacity-70" : "text-ink-muted"}`}>
          Timer
        </span>
      </span>
    </div>
  );
}
