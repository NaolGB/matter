import lines from "@/content/app-lines.json";

/* A task just dropped into the Mac's session well, drawn in the app's own look: the well and its
   card on the left, the board the task came from on the right, with a gap where it was. It is a
   picture: nothing in it can be pressed. The gap and the arrow are ours, since the app closes up
   the list as a task leaves it. The task, its tags and the figures are the demo's, at the minute
   the screenshots are taken. A phone's card has no room for the list beside the well, so there
   it shows the well alone, and the words above it say where the task came from. */

const tags = { mosaic: "#FF375F", larkspur: "#30D158", quarry: "#FF9F0A", juniper: "#5E5CE6" };

function Group({ hue, children }: { hue: string; children: string }) {
  return (
    <p className="flex h-5 items-center gap-2 whitespace-nowrap text-[12.5px] font-semibold text-ink-faint">
      <span className="size-[7px] shrink-0 rounded-full" style={{ background: hue }} />
      {children}
      <span className="h-px min-w-10 flex-1 bg-hairline" />
    </p>
  );
}

function Row({ title, detail, meeting = false }: { title: string; detail: string; meeting?: boolean }) {
  return (
    <div className="mt-3.5 flex items-start gap-2.5 whitespace-nowrap">
      <span className="mt-[2px] size-4 shrink-0 rounded-full border-[1.5px] border-ink-faint" />
      <div>
        <p className="text-[15px] leading-[1.3]">{title}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-ink-faint">
          {meeting && (
            <svg viewBox="0 0 12 12" className="size-3 text-[#5E5CE6]" fill="none" stroke="currentColor" strokeWidth="1.3">
              <rect x="1.25" y="2" width="9.5" height="8.75" rx="2" />
              <path d="M1.5 4.75h9" />
            </svg>
          )}
          {detail}
        </p>
      </div>
    </div>
  );
}

function Action({ icon, children }: { icon: string; children: string }) {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-[#efeeec] pl-2.5 pr-3 text-[12.5px] font-medium">
      <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d={icon} />
      </svg>
      {children}
    </span>
  );
}

export function SessionDrop() {
  return (
    <div
      role="img"
      aria-label={`A task dragged from the list into the sidebar, where its session has started: Write the Mosaic pitch story, 1:29:58 left, ${lines.started.text} 9:41, 90m ${lines.est.text}`}
      className="relative h-[328px] w-full select-none text-left max-sm:h-[300px]"
    >
      <div aria-hidden>
        {/* The board, running off the card to the right and at the foot. It fades out before the
            card's edge, so what is cut off reads as more of the list and not as text cut short. */}
        <div
          className="absolute -right-24 left-[280px] top-0 max-sm:hidden"
          style={{
            maskImage: "linear-gradient(to right, #000 calc(100% - 190px), transparent calc(100% - 96px))",
          }}
        >
          <Group hue={tags.mosaic}>Mosaic Grocers</Group>
          <div className="mt-3 h-[52px] rounded-[12px] border-[1.5px] border-dashed border-[#d2d2d7]" />
          <div className="mt-6">
            <Group hue={tags.larkspur}>Larkspur Health</Group>
          </div>
          <Row title="Larkspur weekly sync" detail="10:00 · 1h · Zoom" meeting />
          <Row title="Check the Larkspur channel" detail="11:30 · 15m" />
          <div className="mt-6">
            <Group hue={tags.quarry}>Quarry Freight</Group>
          </div>
          <Row title="Prioritise the dashboard backlog with Ravi" detail="11:00 · 30m" />
          <div className="mt-6">
            <Group hue={tags.juniper}>Juniper Schools</Group>
          </div>
          <Row title="Reply to Juniper's feedback round" detail="12:00 · 15m" />
        </div>

        <svg
          viewBox="0 0 120 90"
          className="absolute left-[196px] top-3 z-10 h-[90px] w-[120px] text-[#a1a1a6] max-sm:hidden"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M100 46C90 8 46 6 32 72" strokeDasharray="4 5" />
          <path d="M29 61.4 32 72l7.1-8.4" />
        </svg>

        {/* The well: the day's figure above, and the session's card in it. */}
        <div className="absolute left-0 top-[52px] w-[262px] rounded-[20px] bg-base p-3 ring-1 ring-hairline max-sm:left-1/2 max-sm:top-6 max-sm:-translate-x-1/2">
          <p className="flex h-[26px] items-center gap-2 pl-1 text-[13px] font-semibold text-ink-faint">
            <svg viewBox="0 0 14 14" className="size-3.5" fill="none" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="7" cy="7" r="5.6" stroke="#d2d2d7" />
              <path d="M7 1.4a5.6 5.6 0 0 1 4.8 8.5" stroke="currentColor" />
            </svg>
            {lines.hero.text}
          </p>
          <div className="mt-2 rounded-[14px] bg-[#fdfcfa] px-3.5 pb-3.5 pt-3 shadow-[0_10px_24px_-12px_rgb(0_0_0/0.3)] ring-1 ring-[#e9e7e3]">
            <p className="truncate text-[13.5px] font-medium">Write the Mosaic pitch story</p>
            <p className="mt-8 text-[32px] font-semibold leading-none tracking-[-0.02em] tabular-nums">1:29:58</p>
            <p className="mt-1.5 text-[12.5px] text-ink-faint">
              {lines.started.text} 9:41 · 90m {lines.est.text}
            </p>
            <div className="mt-5 flex gap-1.5">
              <Action icon="M4 2.5v7M8 2.5v7">{lines.pause.text}</Action>
              <Action icon="M2.5 6.5 5 9l4.5-6">{lines.complete.text}</Action>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
