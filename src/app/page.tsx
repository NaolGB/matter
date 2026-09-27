import Link from "next/link";
import { Key, Mark, Section, Spec, Wrap } from "@/components/site";
import {
  BucketStack,
  CapacityTable,
  ControlToggle,
  DayTimeline,
  EstimateRow,
  GateNote,
  LiveActivityCard,
  MacWindow,
  MenuBarStrip,
  NoteMock,
  QuickPanel,
  ReviewFigure,
  StandupMock,
} from "@/components/mocks";

const schedulerRules = [
  ["Never in the past.", "On today, nothing movable lands before now."],
  ["Inside your active day.", "Every slot sits between the hours you set."],
  ["Never on top of anything.", "An event, a pinned task, or work that is running is an obstacle, not a suggestion."],
  ["Calm.", "A slot that still holds keeps it. Adding one task does not reshuffle its neighbours."],
  ["Owed work first.", "A task carried over from an earlier day goes before today’s."],
  ["Each kind of work at its hour.", "After a few sessions Matter learns when a tag’s work usually starts, and looks there first."],
  ["Same tag together.", "Related work lands next to each other."],
];

const details = [
  {
    term: "Navigation is a trail.",
    detail: (
      <>
        Every page and note you visit joins a trail in the sidebar. <Key>⌘[</Key> and <Key>⌘]</Key>{" "}
        walk it. A compass lists the last twenty places.
      </>
    ),
  },
  {
    term: "Keyboard.",
    detail: (
      <>
        <Key>⌘,</Key> opens Settings. <Key>⌘F</Key> finds a note. <Key>Esc</Key> closes any drawer or
        panel.
      </>
    ),
  },
  {
    term: "Monochrome by design.",
    detail:
      "No accent colour. Ink carries emphasis, colour means your tags and your feeds, and one blue marks work that is running.",
  },
  {
    term: "Help built in.",
    detail: "The User Guide and the privacy policy open in a window inside the app.",
  },
  {
    term: "Launch at login.",
    detail: "One switch in Settings ▸ General. Matter keeps running in the menu bar after the last window closes.",
  },
  {
    term: "Sync you can see.",
    detail:
      "Settings says when iCloud last synced, and names the reason if it stopped, so a quiet failure is never quiet for long.",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="pt-[clamp(4rem,10vw,7rem)] pb-[clamp(3rem,7vw,5rem)]">
        <Wrap className="text-center">
          <Mark className="mx-auto h-[52px] w-[58px]" />
          <p className="mt-4 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            Matter for Mac and iPhone
          </p>
          <h1 className="mx-auto mt-5 max-w-[19ch] text-balance text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[1.04] tracking-[-0.032em]">
            Plan the day your calendar actually has room for.
          </h1>
          <p className="mx-auto mt-7 max-w-[50ch] text-pretty text-[clamp(1.1rem,2.1vw,1.45rem)] leading-[1.38] text-ink-muted">
            A calm, local-first place for your tasks and time. Matter keeps your tasks, notes, calendar
            feeds and daily log on your own Mac, tells you whether the day fits before you commit to
            it, and keeps the clock running while you work.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[17px]">
            <span className="text-ink-muted">Coming to the App Store</span>
            <a href="#tasks" className="group inline-flex items-center gap-1 font-medium">
              See how it works
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                ›
              </span>
            </a>
          </div>
        </Wrap>
        <Wrap className="mt-[clamp(3.5rem,7vw,6rem)]">
          <MacWindow />
          <p className="mx-auto mt-5 max-w-[60ch] text-center text-[13px] leading-relaxed text-ink-muted">
            The board. Today grouped by tag, Upcoming by day, the work in progress in the bucket at
            the foot of the sidebar, and the day’s headroom beside it.
          </p>
        </Wrap>
      </section>

      {/* Tasks */}
      <Section
        id="tasks"
        title="A board with one question: does it fit."
        lede="Two columns. Today holds what you owe and what you chose for the day, grouped by tag with the group’s planned time beside it. Upcoming holds the next seven days one by one, then the months after."
      >
        <Spec
          className="mt-12"
          items={[
            {
              term: "Overdue work carries forward",
              detail: "An unfinished task stays in Today until you deal with it. A past meeting does not.",
            },
            {
              term: "Push, three times, then a question",
              detail:
                "Push to tomorrow, out three days, or to next week. After the third push Matter asks whether to keep it, push anyway, or delete it.",
            },
            {
              term: "Duplicates, caught while typing",
              detail:
                "A title that resembles an open task is flagged before a second copy lands, with where the first one sits.",
            },
            {
              term: "Nothing is lost",
              detail:
                "Deleting moves a task to the Archive. Done tasks age off the board after a day and wait there too, one click from coming back.",
            },
          ]}
        />
      </Section>

      {/* Capacity */}
      <Section
        id="capacity"
        band
        title="It knows what the day has left."
        lede="Set your active day and a focus cap once. Budget is the smaller of the cap and the room the day has left after your personal events, counted from now rather than from midnight. The chip in the sidebar reads out free time in green, or the overage in orange."
      >
        <div className="reveal mt-12 grid gap-4 md:grid-cols-2">
          <CapacityTable band />
          <GateNote band />
        </div>
        <Spec
          band
          className="mt-4"
          items={[
            {
              term: "Active day",
              detail: "8:00 to 20:00 by default. Time outside it does not exist to the plan.",
            },
            {
              term: "Focus cap",
              detail:
                "6 hours by default. A ceiling on focused work, separate from the room personal time takes.",
            },
            {
              term: "The gate",
              detail:
                "An estimate that does not fit today is refused, or only flagged if you prefer, and the soonest day with room is offered instead.",
            },
            {
              term: "Feeds that count",
              detail: "Each calendar feed either counts toward the load or sits beside it as context.",
            },
          ]}
        />
      </Section>

      {/* Scheduling */}
      <Section
        id="scheduling"
        title="Placed, not piled."
        lede="A task with a day but no time is placed for you on a quarter-hour grid. Give it a time and it is pinned: the scheduler routes around it and never moves it. Placement follows seven rules, in this order."
      >
        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
          <ol className="reveal space-y-4">
            {schedulerRules.map(([rule, why], index) => (
              <li key={rule} className="flex gap-4">
                <span className="w-5 shrink-0 font-mono text-[13px] tabular-nums text-ink-faint">
                  {index + 1}
                </span>
                <p className="text-[1.02rem] leading-relaxed">
                  <span className="font-semibold">{rule}</span>{" "}
                  <span className="text-ink-muted">{why}</span>
                </p>
              </li>
            ))}
            <li className="flex gap-4 pt-2">
              <span className="w-5 shrink-0" />
              <p className="text-[0.95rem] leading-relaxed text-ink-muted">
                Reshuffle on the Calendar page lays the whole day out afresh. Opening the app re-places
                whatever is left of today from now, so a slot that slid into the past is never mistaken
                for a plan.
              </p>
            </li>
          </ol>
          <div className="reveal">
            <DayTimeline />
          </div>
        </div>
      </Section>

      {/* Time */}
      <Section
        id="time"
        title="Drag a task onto the bucket. The clock starts."
        lede="The work bucket sits at the foot of the sidebar on every page. Drop a task or a meeting on it and a session opens. The card counts down against the estimate and keeps going past zero, because time owed is the useful reading."
      >
        <div className="reveal mt-12 grid gap-6 md:grid-cols-[300px_1fr] md:items-start">
          <BucketStack />
          <div className="space-y-4">
            <MenuBarStrip />
            <p className="text-[0.95rem] leading-relaxed text-ink-muted">
              The menu bar shows how many sessions are open and the countdown of the one furthest
              along, so the clock is in view with the window closed.
            </p>
          </div>
        </div>
        <Spec
          className="mt-12"
          items={[
            {
              term: "Pause and resume",
              detail:
                "A pause closes the session and a restart opens a new one. The countdown carries the total, so ten minutes in stays ten minutes in.",
            },
            {
              term: "Finish, and it remembers",
              detail:
                "Completing a task closes its sessions and records the actual minutes against the estimate.",
            },
            {
              term: "Meetings count too",
              detail:
                "An event from a feed can be tracked and marked done the same way, so time in a meeting is time you can see.",
            },
            {
              term: "Three at once is a nudge",
              detail:
                "Matter never refuses a session, but past three open at once it says so.",
            },
          ]}
        />
      </Section>

      {/* Calibration */}
      <Section
        id="calibration"
        band
        title="It learns how long your work really takes."
        lede="Every finished task with tracked time teaches the tag it carries. Once a tag has eight of them, a new task with that tag starts at the length such tasks usually run, offered as a chip you can take or leave."
      >
        <div className="reveal mt-12 grid gap-10 md:grid-cols-[360px_1fr] md:items-center md:gap-14">
          <div className="text-ink">
            <EstimateRow />
          </div>
          <div className="space-y-5 text-[1.02rem] leading-relaxed text-band-muted">
            <p>
              Book 30 minutes on a tag that usually runs longer and the editor says so. On a tag
              where one task in ten runs past double its estimate, a typical number would be a guess
              dressed up as a forecast, so Matter offers a cautious booking at the 75th percentile
              instead.
            </p>
            <p>
              Only estimates you typed are graded. A number the tool suggested and you accepted counts
              toward how long the work takes, never toward how well you estimate, so the feature
              cannot mark its own homework. Only the most recent twenty tasks per tag count, so
              getting better shows up rather than being held against you.
            </p>
          </div>
        </div>
      </Section>

      {/* Templates and tags */}
      <Section
        id="templates"
        title="Work you do every week, in one click."
        lede="Templates and tags are how the board stays organised without you organising it."
      >
        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          <div className="reveal rounded-[22px] border border-hairline bg-card p-8 sm:p-10">
            <h3 className="text-balance text-[clamp(1.4rem,2.6vw,1.85rem)] font-semibold leading-tight tracking-[-0.02em]">
              Templates
            </h3>
            <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
              Daily, weekly on the day you pick, or monthly. Apply spawns real tasks for the period,
              already carrying the template’s estimate and tags, and applying again creates nothing.
              A red dot means not yet applied this period; a green check means done.
            </p>
          </div>
          <div className="reveal rounded-[22px] border border-hairline bg-card p-8 sm:p-10">
            <h3 className="text-balance text-[clamp(1.4rem,2.6vw,1.85rem)] font-semibold leading-tight tracking-[-0.02em]">
              Tags
            </h3>
            <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
              A label, a colour and an order, grouped into types. The Today column is sectioned by
              them, with each group’s planned time at its edge. Every task carries a tag. Events and
              notes can carry them too.
            </p>
          </div>
        </div>
      </Section>

      {/* Calendar */}
      <Section
        id="calendar"
        title="Your calendar, read-only, next to your work."
        lede="Subscribe to any iCal feed. Matter fetches it directly from the URL you give, mirrors the events, expands repeats including edited occurrences, and never writes back."
      >
        <Spec
          className="mt-12"
          items={[
            {
              term: "Kept fresh",
              detail:
                "Every 10 minutes while the app is open, every 15 in the background, on waking, and whenever you hit Refresh. A feed that comes back unchanged costs nothing.",
            },
            {
              term: "A rolling window",
              detail: "30 days back and 30 days ahead, reconciled on every sync.",
            },
            {
              term: "A grid that shows the conflict",
              detail:
                "Daily and weekly views draw tasks and events as blocks on the same hours, with a strip above for anything untimed.",
            },
            {
              term: "Reminders",
              detail:
                "30, 5 and 2 minutes before a timed event, into the bell in the toolbar and, if you allow it, as macOS notifications.",
            },
          ]}
        />
        <p className="reveal mt-8 max-w-[60ch] text-[1.02rem] leading-relaxed text-ink-muted">
          Tag an event, start a session on it, mark it done. Time on a meeting is tracked the same way
          as time on a task, and a feed you mark as not work lowers the day’s room instead of filling
          it.
        </p>
      </Section>

      {/* Notes */}
      <Section
        id="notes"
        band
        title="A block editor for longer thinking."
        lede="Notes is a list on the left and an editor on the right, with folders and a search that reads titles and bodies. Every line is a block."
      >
        <div className="reveal mt-12 grid gap-8 md:grid-cols-[1fr_1fr] md:items-start">
          <div className="text-ink">
            <NoteMock />
          </div>
          <dl className="space-y-5 text-[0.98rem] leading-relaxed">
            <div>
              <dt className="font-semibold text-band-ink">Blocks</dt>
              <dd className="text-band-muted">
                Paragraphs, three heading levels, bullets, numbers and checkboxes. Type{" "}
                <code className="font-mono">#</code>, <code className="font-mono">-</code>,{" "}
                <code className="font-mono">1.</code> or <code className="font-mono">[ ]</code> at
                the start of a line.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-band-ink">Structure</dt>
              <dd className="text-band-muted">
                Tab and Shift-Tab nest up to eight levels. Return continues a list, Backspace on an
                empty item peels it back to a paragraph, and the grip drags a block anywhere.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-band-ink">Inline</dt>
              <dd className="text-band-muted">
                Bold, italic, strikethrough, underline and code. Paste a URL and it becomes a link.
                Paste Markdown and it becomes blocks. Brackets and quotes close themselves.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-band-ink">Date chips</dt>
              <dd className="text-band-muted">
                Type @ and a date: @fri, @aug 5, @3:30pm. The chip is frozen to the day you meant when
                you wrote it.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-band-ink">Everywhere</dt>
              <dd className="text-band-muted">
                The pin in the toolbar opens a scratchpad notebook over any page. Edits save a moment
                after you stop typing, and Notes reopens where you left off.
              </dd>
            </div>
          </dl>
        </div>
      </Section>

      {/* Standup */}
      <Section
        id="standup"
        title="One entry a day. Four prompts. A north star."
        lede="Standup is a daily log built for a quick check-in with yourself. Each day has the same four sections, written in the same editor as Notes, and a streak that counts the days you wrote."
      >
        <div className="reveal mt-12">
          <StandupMock />
        </div>
        <p className="reveal mt-8 max-w-[60ch] text-[1.02rem] leading-relaxed text-ink-muted">
          The north star is one standing note beside every day, edited in place. A blank today does
          not break the streak; two blank days do.
        </p>
      </Section>

      {/* Week review */}
      <Section
        id="review"
        title="Did it fit? The week’s answer."
        lede="The capacity chip asks whether the day fits. Click it and the week review asks whether it did: tracked time against planned time, by tag and by day, for this week, last week or the last 30 days."
      >
        <div className="reveal mt-12">
          <ReviewFigure />
        </div>
        <Spec
          className="mt-4"
          items={[
            {
              term: "Delivered",
              detail:
                "Tracked over planned, and against the budget your focus cap allowed for the days that have passed.",
            },
            {
              term: "Switches",
              detail:
                "Consecutive sessions on different kinds of work, counted apart from bouncing between tasks of one kind. A gap over 30 minutes is a break, not a switch.",
            },
            {
              term: "Longest block",
              detail:
                "The longest unbroken stretch on one thing, with pauses under five minutes joined.",
            },
            {
              term: "Chronic pushes",
              detail:
                "Open tasks deferred three times or more are listed, because they need a decision rather than another push.",
            },
          ]}
        />
      </Section>

      {/* Menu bar */}
      <Section
        id="menubar"
        band
        title="Capture without opening the window."
        lede="The menu bar item opens a small panel: one field, the day, an estimate and a tag. Type fri 3pm and it is understood. The pill says what is left today, and a task that does not fit is added with the soonest day that would take it."
      >
        <div className="reveal mt-12 grid gap-10 md:grid-cols-[380px_1fr] md:items-center md:gap-14">
          <div className="text-ink">
            <QuickPanel />
          </div>
          <div className="space-y-5 text-[1.02rem] leading-relaxed text-band-muted">
            <p>
              The same duplicate check, the same calibration chip and the same capacity gate as the
              full editor, because a task added here goes through the same commit as one added on the
              board.
            </p>
            <p>
              Below the field, the sessions in progress with Pause and Complete. The panel opens from
              the status item, which stays in the menu bar after the last window closes.
            </p>
          </div>
        </div>
      </Section>

      {/* iPhone */}
      <Section
        id="iphone"
        title="The phone is a working surface."
        lede="One app, one store, synced through your own iCloud. On the iPhone the same tasks, sessions and notes arrive, and the parts you reach for in a corridor work without opening anything."
      >
        <div className="reveal mt-12 flex flex-wrap items-start gap-6">
          <LiveActivityCard />
          <div className="flex flex-wrap gap-3">
            <ControlToggle />
            <ControlToggle running />
          </div>
        </div>
        <Spec
          className="mt-12"
          items={[
            {
              term: "Live Activity",
              detail:
                "A running session on the Lock Screen and in the Dynamic Island, counting down, with Pause and Done on the card.",
            },
            {
              term: "Control Center",
              detail: "A timer toggle: Start next, or Running. It fits the Action button too.",
            },
            {
              term: "Widgets",
              detail:
                "Now shows what is running or what to start, with the button that changes it. Today lists what is open with a tick on each row. Streak shows the log’s run of days.",
            },
            {
              term: "Siri and Shortcuts",
              detail:
                "Capture in Matter. Start my next task in Matter. Stop my timer in Matter. Complete a task in Matter.",
            },
          ]}
        />
        <p className="reveal mt-8 max-w-[62ch] text-[1.02rem] leading-relaxed text-ink-muted">
          What is next is decided once, owed work first and then the day in order, so the widget, the
          toggle and Siri never disagree. A captured task lands in the inbox with no day and no tag,
          and triage happens when you sit down. Feeds and reminders refresh in the background. The
          phone’s screens are being rebuilt against the Mac one at a time; the Lock Screen, Control
          Center, widgets and Siri are how it works today.
        </p>
      </Section>

      {/* Privacy */}
      <Section
        id="privacy"
        band
        center
        title="Your day never leaves your devices."
        lede="Matter has no account system, no analytics, no advertising and no tracking. Tasks, notes, calendars and settings live on your Mac and reach your other devices through your private iCloud database. Calendar feeds are fetched directly from the URL you provide, not through any server of ours. What you export or share is yours."
      >
        <p className="reveal mt-8 text-center text-[17px]">
          <Link href="/privacy" className="group inline-flex items-center gap-1 font-medium">
            Read the privacy policy
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              ›
            </span>
          </Link>
        </p>
      </Section>

      {/* Details */}
      <Section id="details" title="The small things." lede="The rest of what is in the box.">
        <Spec className="mt-12" columns={3} items={details} />
        <div className="reveal mt-14 flex flex-col items-start gap-3 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[1.02rem]">
            Coming to the App Store for macOS 26 and iOS 26.5. One purchase, both devices.
          </p>
          <Link href="/guide" className="group inline-flex items-center gap-1 text-[17px] font-medium">
            Read the User Guide
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              ›
            </span>
          </Link>
        </div>
      </Section>
    </main>
  );
}
