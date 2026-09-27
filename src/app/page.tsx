const features = [
  {
    title: "It plans against real capacity",
    body: "Matter knows how much room a day still has once its events are in. Put more into a day than it holds and it says so, then names the task to move. Ask for the soonest day something fits and it finds one.",
  },
  {
    title: "The Mac decides, the phone does",
    body: "On the Mac you arrange a week: the board, notes, templates. On the phone you capture it, commit to it, work it, close it, and look back at the end of the day. Both halves write.",
  },
  {
    title: "It works while it is closed",
    body: "Widgets start and finish work from the home screen. A Live Activity counts the session down on the lock screen. There is a timer in Control Center, and Shortcuts can capture a task without opening anything.",
  },
  {
    title: "Your data stays yours",
    body: "Everything lives in a store on your device and syncs through your own iCloud. There is no account to create with us and no server of ours in the path. Matter is built for one person across their own devices.",
  },
];

const rows = [
  { title: "Draft the capacity note", meta: "24m", running: true },
  { title: "Review calendar feeds", meta: "30m", running: false },
  { title: "Standup", meta: "09:30", running: false },
];

export default function Home() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-24">
        <header className="flex items-baseline justify-between gap-4">
          <span className="text-lg font-semibold tracking-tight">Matter</span>
          <span className="text-sm text-ink-muted">Mac and iPhone</span>
        </header>

        <section className="mt-16 sm:mt-24">
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Plan the day your calendar actually has room for.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            Matter is a local-first planner for Mac and iPhone. It holds your
            tasks, notes and calendar on your own devices, and it refuses to let
            a day quietly hold more than it can.
          </p>
          <p className="mt-8 inline-flex items-center rounded-full border border-hairline bg-track px-3 py-1 text-sm text-ink-muted">
            Coming to the App Store
          </p>
        </section>

        <section
          aria-label="A day in Matter"
          className="mt-16 overflow-hidden rounded-xl border border-hairline bg-card"
        >
          <div className="flex items-baseline justify-between border-b border-hairline px-4 py-3 sm:px-5">
            <span className="text-sm font-medium">Thursday</span>
            <span className="text-sm text-ink-muted">2h 10m left</span>
          </div>
          <ul className="divide-y divide-hairline">
            {rows.map((row) => (
              <li
                key={row.title}
                className="flex items-center gap-3 px-4 py-3.5 sm:px-5"
              >
                <span
                  aria-hidden
                  className={`size-1.5 shrink-0 rounded-full ${
                    row.running ? "bg-running" : "bg-hairline"
                  }`}
                />
                <span className="min-w-0 flex-1 truncate text-[15px]">
                  {row.title}
                </span>
                <span
                  className={`font-mono text-sm tabular-nums ${
                    row.running ? "text-running" : "text-ink-muted"
                  }`}
                >
                  {row.meta}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-20 grid gap-10 sm:mt-24 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-14">
          {features.map((feature) => (
            <div key={feature.title}>
              <h2 className="text-base font-semibold tracking-tight">
                {feature.title}
              </h2>
              <p className="mt-3 leading-relaxed text-ink-muted">
                {feature.body}
              </p>
            </div>
          ))}
        </section>

        <footer className="mt-24 border-t border-hairline pt-8 text-sm text-ink-muted">
          Matter is one app for macOS and iOS, sold as a single purchase.
        </footer>
      </div>
    </main>
  );
}
