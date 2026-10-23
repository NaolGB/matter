import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import lines from "@/content/app-lines.json";
import { Wrap } from "@/components/site";
import { site } from "@/config";

export const metadata: Metadata = {
  title: "Press kit",
  description: "Facts, a description, screenshots and the icon for writing about Matter, a planner for the Mac and iPhone.",
};

/* Laid out the way MacStories asks of a press kit: factsheet, description, history, features,
   images, logo, contact, all on one page so nothing has to be attached to an email. No person's name
   anywhere (Naol, 2026-10-19): the developer is "the founder", the address is hi@. */

const facts: [string, React.ReactNode][] = [
  ["Name", "Matter"],
  ["What it is", "A planner for the Mac and iPhone that knows how much a day holds."],
  ["Developer", "The founder, working alone, in London"],
  [
    "Platforms",
    `Mac (${site.macRequirement} or later) and iPhone (${site.iphoneRequirement} or later). Each works on its own; together they share one plan through the user's own iCloud.`,
  ],
  ["Price", site.price],
  ["Availability", "Coming to the App Store"],
  ["Website", <a key="w" href={site.url}>{site.url.replace("https://", "")}</a>],
  ["Press", <a key="p" href={`mailto:${site.pressEmail}`}>{site.pressEmail}</a>],
  ["Support", <a key="s" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>],
];

/* In the founder's casual voice, the way Why Matter lists them, and spoken to the reader as "you"
   (Naol, 2026-10-19: the first version "sounds super AI"; then "you, not me"). Each line was checked
   against the app's source on 2026-10-19. The quoted words come from app-lines.json, which
   `npm run check:lines` holds to the Swift source. */
const features = [
  `it tells you how much time you actually have left today, meetings included. Plan too much and it says "${lines.full.text}", or how far over you are`,
  `when something won't fit, it says "${lines.gate.text}" and offers to move it to a day that has room`,
  "your calendars come in as iCal feeds. Work ones count like tasks; personal ones still take their hours, so dinner never looks like free time",
  "tasks and meetings on one calendar, so you see the whole day in one place",
  "drag a task into the sidebar to start it, and a clock runs while you work",
  "a week review that shows where your week actually went, by tag (it's how you find out you've been avoiding the hard stuff)",
  "a daily journal called standup, so you start the day on purpose",
  "templates for the tasks that repeat",
  "notes flexible like Notion, without the 85% of features you never use, and a notebook one click away for random things",
  "it works offline, there's no account, and your data stays on your devices and in your own iCloud",
  "Loafy, a little dough creature who lives in a house in the sidebar. She doesn't need anything from you (she is the best)",
];

const shots = [
  { file: "01-today", label: "Today, with 2h 10m free", size: "2880 × 1800" },
  { file: "02-doesnt-fit", label: `A task that doesn't fit: "${lines.gate.text}"`, size: "1040 × 474" },
  { file: "03-calendar", label: "Tasks and meetings on three days of the calendar", size: "2880 × 1800" },
  { file: "04-running", label: "Three tasks running in the sidebar", size: "2880 × 1800" },
  { file: "05-week-review", label: "The week review: where the week went", size: "2880 × 1800" },
  { file: "06-loafy", label: "Loafy's house", size: "1024 × 1536" },
];

const marks = [
  { file: "matter-icon-1024.png", label: "App icon", size: "1024 × 1024 PNG", picture: "/press/matter-icon-1024.png", ground: "bg-track" },
  { file: "matter-mark-transparent.png", label: "Mark, transparent", size: "1024 × 1024 PNG", picture: "/press/matter-mark-transparent.png", ground: "bg-track" },
  { file: "matter-mark-on-white.png", label: "Mark on white", size: "1024 × 1024 PNG", picture: "/press/matter-mark-on-white.png", ground: "bg-base ring-1 ring-inset ring-hairline" },
];

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mt-16 scroll-mt-24">
      <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] font-semibold tracking-[-0.025em]">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

const link = "text-ink underline decoration-ink/25 underline-offset-[3px] transition-colors hover:decoration-ink";

export default function PressPage() {
  return (
    <main className="flex-1">
      <Wrap className="py-[clamp(3rem,7vw,5rem)]">
        <h1 className="text-balance text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
          Press kit
        </h1>
        <p className="mt-5 max-w-[680px] text-[1.25rem] leading-snug text-ink-muted">
          Everything needed to write about Matter, free to use. For anything else, write to{" "}
          <a href={`mailto:${site.pressEmail}`} className={link}>
            {site.pressEmail}
          </a>
          .
        </p>
        <a
          href="/press/matter-press-kit.zip"
          download
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-[15px] font-medium text-[var(--base)] transition-opacity hover:opacity-85"
        >
          Download everything
          <span className="font-normal opacity-70">ZIP, 8 MB</span>
        </a>

        <Section id="factsheet" title="Factsheet">
          <dl className="max-w-[760px] divide-y divide-hairline text-[16px] leading-relaxed">
            {facts.map(([term, value]) => (
              <div key={term} className="grid gap-1 py-3 sm:grid-cols-[160px_1fr] sm:gap-6">
                <dt className="text-ink-muted">{term}</dt>
                <dd className="[&_a]:underline [&_a]:decoration-ink/25 [&_a]:underline-offset-[3px] [&_a:hover]:decoration-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="description" title="Description">
          <p className="max-w-[680px] text-[17px] leading-[1.6]">
            A to-do list accepts anything you type. A day has a fixed number of hours, and the list never
            mentions it. So you plan ten hours of work into four free hours, and at six o’clock the list
            says you fell short. Matter plans the day you actually have. It reads your calendar, counts
            the hours that are already spoken for, shows how much time is left, and when something won’t
            fit it says so and offers a day where it will. It runs on your Mac and your iPhone, works
            offline, needs no account, and keeps your data in your own iCloud.
          </p>
        </Section>

        <Section id="history" title="History">
          <p className="max-w-[680px] text-[17px] leading-[1.6]">
            Why it exists, in the founder’s words:{" "}
            <Link href="/blog/why-matter" className={link}>
              Why Matter
            </Link>
            .
          </p>
        </Section>

        <Section id="features" title="Features">
          <ul className="max-w-[680px] list-disc space-y-2 pl-6 text-[17px] leading-[1.6] marker:text-ink-faint">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </Section>

        <Section id="images" title="Screenshots">
          <p className="max-w-[680px] text-[15px] leading-relaxed text-ink-muted">
            Real captures of the Mac app at twice its size, in light mode, with sample data. Click one for
            the full-size PNG.
          </p>
          <ul className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2">
            {shots.map((shot) => (
              <li key={shot.file}>
                <a href={`/press/matter-${shot.file}.png`} className="group block">
                  <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[20px] bg-track p-[6%]">
                    <Image
                      src={`/press/preview/${shot.file}.webp`}
                      alt={shot.label}
                      width={1200}
                      height={750}
                      unoptimized
                      className="h-full w-auto max-w-full object-contain drop-shadow-[0_8px_16px_rgb(0_0_0/0.14)] transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <p className="mt-3 text-[15px] font-medium">{shot.label}</p>
                  <p className="text-[13px] text-ink-muted">PNG, {shot.size}</p>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="logo" title="Icon and mark">
          <ul className="grid gap-6 sm:grid-cols-3">
            {marks.map((mark) => (
              <li key={mark.file}>
                <a href={`/press/${mark.file}`} className="group block">
                  <div className={`flex aspect-square items-center justify-center rounded-[20px] p-[18%] ${mark.ground}`}>
                    <Image src={mark.picture} alt={mark.label} width={512} height={512} unoptimized className="h-auto w-full" />
                  </div>
                  <p className="mt-3 text-[15px] font-medium">{mark.label}</p>
                  <p className="text-[13px] text-ink-muted">{mark.size}</p>
                </a>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="contact" title="Contact">
          <p className="max-w-[680px] text-[17px] leading-[1.6]">
            For press, interviews and review copies:{" "}
            <a href={`mailto:${site.pressEmail}`} className={link}>
              {site.pressEmail}
            </a>
            . For help with the app:{" "}
            <a href={`mailto:${site.supportEmail}`} className={link}>
              {site.supportEmail}
            </a>
            .
          </p>
        </Section>
      </Wrap>
    </main>
  );
}
