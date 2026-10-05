import lines from "@/content/app-lines.json";

/* The Mac's task editor at the moment it refuses a task, drawn here and not photographed, so it
   stays sharp at any size and reflows on a phone. It is a picture: nothing in it can be pressed.
   Every word of the app's in it comes from app-lines.json, so the check that guards the page's
   headings guards this too. The task and the figures are the ones in the screenshots: three
   hours asked of a day with 2h 10m of headroom. */

const estimates = ["15m", "30m", "45m", "1h", "2h"];
const refusal = "text-[#e0700a]";

function Label({ children }: { children: string }) {
  return (
    <p className="flex items-center gap-3 text-[13px] font-semibold text-ink-muted">
      {children}
      <span className="h-px flex-1 bg-hairline" />
    </p>
  );
}

function Chip({ children, selected = false }: { children: string; selected?: boolean }) {
  return (
    <span
      className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium ${
        selected ? "bg-ink text-[var(--base)]" : "text-ink ring-1 ring-hairline"
      }`}
    >
      {children}
    </span>
  );
}

export function EditorRefusal() {
  return (
    <div
      role="img"
      aria-label={`The task editor refusing a three-hour task. ${lines.gate.text}: only 2h 10m ${lines.headroom.text} ${lines.gateRest.text}`}
      className="select-none rounded-t-[16px] bg-base px-6 pt-5 text-left shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline sm:px-7 sm:pt-6"
    >
      <div aria-hidden>
        <div className="flex items-center justify-between">
          <p className="text-[17px] font-semibold tracking-[-0.015em]">{lines.newTask.text}</p>
          <span className="rounded-[10px] bg-wash px-3.5 py-1.5 text-[13px] font-medium text-ink-faint">
            {lines.done.text}
          </span>
        </div>

        <p className="mt-4 flex items-center text-[19px] tracking-[-0.015em]">
          Draft the hiring plan
          <span className="ml-0.5 h-[1.15em] w-[1.5px] bg-[#0a84ff]" />
        </p>

        <div className="mt-5">
          <Label>{lines.schedule.text}</Label>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip selected>{lines.today.text}</Chip>
            <Chip>{lines.tomorrow.text}</Chip>
            <Chip>{lines.nextWeek.text}</Chip>
          </div>
        </div>

        {/* The refusal, in the app's orange. This is what the card is about, so it is set a
            little larger than the app sets it. */}
        <div className={`mt-4 text-[14.5px] leading-relaxed ${refusal}`}>
          <p>
            <span className="font-semibold">{lines.gate.text}</span> — only 2h 10m {lines.headroom.text}{" "}
            {lines.gateRest.text}
          </p>
          <p className="mt-1 flex items-center gap-1.5 font-semibold">
            <svg
              viewBox="0 0 16 16"
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3v5h9M9 5l3 3-3 3" />
            </svg>
            {lines.moveTo.text} Sat, Oct 10
          </p>
        </div>

        <div className="mt-5 pb-6">
          <Label>{lines.estimate.text}</Label>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {estimates.map((value) => (
              <Chip key={value}>{value}</Chip>
            ))}
            <span className="ml-auto">
              <Chip selected>3h</Chip>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
