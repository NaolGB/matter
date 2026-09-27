const nav = [
  { label: "Capacity", href: "#capacity" },
  { label: "Devices", href: "#devices" },
  { label: "Privacy", href: "#privacy" },
];

const boardRows = [
  { title: "Draft the capacity note", meta: "24m", running: true },
  { title: "Review calendar feeds", meta: "30m", running: false },
  { title: "Standup", meta: "09:30", running: false },
  { title: "Week review", meta: "45m", running: false },
];

const capacitySpecs = [
  { term: "Headroom", detail: "counted from the events you already have" },
  { term: "Over-planned days", detail: "flagged with the task to move" },
  { term: "Soonest fit", detail: "found for you, not guessed at" },
];

const devices = [
  {
    title: "On the Mac you decide.",
    body: "The board, the notes, the templates, the shape of a week. This is where a day gets arranged on purpose.",
  },
  {
    title: "On the phone you do it.",
    body: "Capture it, commit to it, work it, close it, then look back at the end of the day. Every one of those writes. The phone is not a viewer.",
  },
];

const closedSurfaces = [
  "Home screen widgets",
  "Live Activity",
  "Control Center timer",
  "Shortcuts and App Intents",
];

function Wrap({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[980px] px-5 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

function RunningDot({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden
      className={`size-[7px] shrink-0 rounded-full ${
        on ? "bg-running" : "bg-ink-faint"
      }`}
    />
  );
}

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-hairline bg-chrome backdrop-blur-xl backdrop-saturate-150">
        <Wrap className="flex h-12 items-center justify-between">
          <a href="#top" className="text-[15px] font-semibold tracking-tight">
            Matter
          </a>
          <nav>
            <ul className="flex items-center gap-5 text-[12px] text-ink-muted sm:gap-8">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Wrap>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="pt-[clamp(4rem,11vw,8rem)] pb-[clamp(3rem,7vw,5rem)]">
          <Wrap className="text-center">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
              Matter
            </p>
            <h1 className="mx-auto mt-5 max-w-[19ch] text-balance text-[clamp(2.6rem,7vw,5rem)] font-semibold leading-[1.04] tracking-[-0.032em]">
              Plan the day your calendar actually has room for.
            </h1>
            <p className="mx-auto mt-7 max-w-[46ch] text-pretty text-[clamp(1.1rem,2.1vw,1.45rem)] leading-[1.38] text-ink-muted">
              A local-first planner for Mac and iPhone. It holds your tasks,
              notes and calendar on your own devices, and it will not let a day
              quietly hold more than it can.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[17px]">
              <span className="text-ink-muted">Coming to the App Store</span>
              <a
                href="#capacity"
                className="group inline-flex items-center gap-1 font-medium"
              >
                See what it does
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  ›
                </span>
              </a>
            </div>
          </Wrap>

          {/* Product shot */}
          <Wrap className="mt-[clamp(3.5rem,7vw,6rem)]">
            <div className="relative lg:pr-16">
              <div className="overflow-hidden rounded-[14px] border border-hairline bg-card shadow-[0_40px_90px_-30px_rgb(0_0_0/0.35)]">
                <div className="flex items-center gap-2 border-b border-hairline px-4 py-3">
                  <RunningDot on={false} />
                  <RunningDot on={false} />
                  <RunningDot on={false} />
                  <span className="mx-auto pr-10 text-[12px] text-ink-muted">
                    Matter
                  </span>
                </div>
                <div className="flex">
                  <div className="hidden w-44 shrink-0 border-r border-hairline bg-track p-4 sm:block">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
                      This week
                    </p>
                    <ul className="mt-3 space-y-2.5 text-[13px] text-ink-muted">
                      <li className="font-medium text-ink">Thursday</li>
                      <li>Friday</li>
                      <li>Monday</li>
                    </ul>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between border-b border-hairline px-4 py-3 sm:px-5">
                      <span className="text-[13px] font-medium">Thursday</span>
                      <span className="text-[13px] text-ink-muted">
                        2h 10m left
                      </span>
                    </div>
                    <ul className="divide-y divide-hairline">
                      {boardRows.map((row) => (
                        <li
                          key={row.title}
                          className="flex items-center gap-3 px-4 py-3.5 sm:px-5"
                        >
                          <RunningDot on={row.running} />
                          <span className="min-w-0 flex-1 truncate text-[14px]">
                            {row.title}
                          </span>
                          <span
                            className={`font-mono text-[13px] tabular-nums ${
                              row.running ? "text-running" : "text-ink-muted"
                            }`}
                          >
                            {row.meta}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* The phone sits beside the Mac only where there is room for it. */}
              <div
                aria-hidden
                className="absolute -bottom-10 right-0 hidden w-[184px] overflow-hidden rounded-[2rem] border border-hairline bg-card p-2 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.4)] lg:block"
              >
                <div className="overflow-hidden rounded-[1.6rem] bg-base">
                  <div className="flex justify-center py-2">
                    <span className="h-[5px] w-14 rounded-full bg-ink-faint" />
                  </div>
                  <div className="px-3 pb-4">
                    <p className="text-[15px] font-semibold tracking-tight">
                      Today
                    </p>
                    <p className="mt-0.5 text-[11px] text-ink-muted">
                      2h 10m left
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {boardRows.slice(0, 3).map((row) => (
                        <li key={row.title} className="flex items-center gap-2">
                          <RunningDot on={row.running} />
                          <span className="min-w-0 flex-1 truncate text-[11px]">
                            {row.title}
                          </span>
                          <span
                            className={`font-mono text-[10px] tabular-nums ${
                              row.running ? "text-running" : "text-ink-faint"
                            }`}
                          >
                            {row.meta}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Wrap>
        </section>

        {/* Capacity band */}
        <section
          id="capacity"
          className="mt-[clamp(5rem,10vw,9rem)] bg-band py-[clamp(4.5rem,10vw,8rem)] text-band-ink"
        >
          <Wrap>
            <div className="reveal">
              <h2 className="max-w-[16ch] text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.028em]">
                It knows what the day has left.
              </h2>
              <p className="mt-6 max-w-[52ch] text-pretty text-[clamp(1.05rem,1.8vw,1.3rem)] leading-[1.45] text-band-muted">
                Matter reads the events you already have and works out the hours
                that remain. Put more into a day than it holds and it says so,
                then names the task to move. Ask for the soonest day something
                fits and it finds one.
              </p>
            </div>
            <dl className="reveal mt-[clamp(3rem,6vw,4.5rem)] grid gap-px overflow-hidden rounded-2xl border border-band-hairline bg-band-hairline sm:grid-cols-3">
              {capacitySpecs.map((spec) => (
                <div key={spec.term} className="bg-band p-6 sm:p-7">
                  <dt className="text-[1.05rem] font-semibold tracking-tight">
                    {spec.term}
                  </dt>
                  <dd className="mt-1.5 text-[0.95rem] leading-relaxed text-band-muted">
                    {spec.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </Wrap>
        </section>

        {/* Devices */}
        <section id="devices" className="py-[clamp(4.5rem,10vw,8rem)]">
          <Wrap>
            <h2 className="reveal text-balance text-center text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.028em]">
              Two devices. One loop.
            </h2>
            <div className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-4 sm:grid-cols-2">
              {devices.map((device) => (
                <div
                  key={device.title}
                  className="reveal rounded-[22px] border border-hairline bg-card p-8 sm:p-10"
                >
                  <h3 className="text-balance text-[clamp(1.4rem,2.6vw,1.85rem)] font-semibold leading-tight tracking-[-0.02em]">
                    {device.title}
                  </h3>
                  <p className="mt-4 text-pretty leading-relaxed text-ink-muted">
                    {device.body}
                  </p>
                </div>
              ))}
            </div>
          </Wrap>
        </section>

        {/* Closed */}
        <section className="border-y border-hairline bg-track py-[clamp(4.5rem,10vw,8rem)]">
          <Wrap>
            <div className="reveal grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-16">
              <div>
                <h2 className="text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.028em]">
                  It works while it is closed.
                </h2>
                <p className="mt-6 max-w-[46ch] text-pretty text-[1.05rem] leading-[1.5] text-ink-muted">
                  Start and finish work without opening anything. A session
                  counts down on the lock screen, the timer sits in Control
                  Center, and a shortcut can capture a task while the app is
                  nowhere in sight.
                </p>
              </div>
              <ul className="divide-y divide-hairline border-y border-hairline">
                {closedSurfaces.map((surface) => (
                  <li
                    key={surface}
                    className="flex items-center gap-3 py-4 text-[1.05rem]"
                  >
                    <RunningDot on={false} />
                    {surface}
                  </li>
                ))}
              </ul>
            </div>
          </Wrap>
        </section>

        {/* Privacy */}
        <section id="privacy" className="py-[clamp(5rem,11vw,9rem)]">
          <Wrap className="text-center">
            <h2 className="reveal mx-auto max-w-[18ch] text-balance text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.06] tracking-[-0.028em]">
              Your day never leaves your devices.
            </h2>
            <p className="reveal mx-auto mt-7 max-w-[58ch] text-pretty text-[clamp(1.05rem,1.9vw,1.3rem)] leading-[1.45] text-ink-muted">
              Everything lives in a store on your Mac and your iPhone and syncs
              through your own iCloud. There is no account to create with us and
              no server of ours in the path. Matter is built for one person
              across their own devices, so there is nothing to share and nobody
              to share it with.
            </p>
          </Wrap>
        </section>
      </main>

      <footer className="border-t border-hairline py-10">
        <Wrap className="flex flex-col gap-2 text-[12px] leading-relaxed text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Matter is one app for macOS and iOS, sold as a single purchase.</p>
          <p className="text-ink-faint">Copyright 2026 Matter</p>
        </Wrap>
      </footer>
    </>
  );
}
