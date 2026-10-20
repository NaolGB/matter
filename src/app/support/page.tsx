import type { Metadata } from "next";
import Link from "next/link";
import { guide } from "@/content/guide";
import { site } from "@/config";
import { InfoDoc } from "@/components/InfoDoc";
import { Wrap } from "@/components/site";

export const metadata: Metadata = {
  title: "Support",
  description: "How to get help with Matter: common questions, a way to reach us, and the full User Guide.",
};

const answers = [
  {
    question: "Does Matter work offline?",
    answer:
      "Yes, completely. Tasks, notes, the daily log and the calendar you have already fetched all work with no connection. Two things use the network when it is there: iCloud, to keep your Mac and iPhone in step, and the calendar feeds you subscribe to.",
  },
  {
    question: "Where is my data kept?",
    answer:
      "On your devices. Matter has no account system and no server of ours. Your Mac and iPhone keep in step through your private iCloud database, and nothing is sent to us.",
  },
  {
    question: "Does Matter sync between my Mac and iPhone?",
    answer:
      "Yes, through your own private iCloud database, when each device is signed in to the same iCloud account. On the Mac, Settings ▸ General shows when iCloud last synced, and the reason if it did not.",
  },
  {
    question: "How do I bring my calendar in?",
    answer:
      "Matter reads calendars as iCal feeds. In Settings ▸ Calendars, choose Add a feed and paste the link your calendar provider gives you: a read-only iCal link, which can start with webcal. It has to be the feed itself, not the address of the calendar’s web page. Matter only reads the feed and never writes back.",
  },
  {
    question: "Do I need a Mac to use the iPhone app?",
    answer: "No. Matter for iPhone works on its own. With both, they share one plan through your iCloud.",
  },
  {
    question: "Do I pay for the Mac and iPhone apps separately?",
    answer: "No. One purchase covers both.",
  },
  {
    question: "What does Matter need?",
    answer: `A Mac with ${site.macRequirement} or later, or an iPhone or iPad with ${site.iphoneRequirement} or later.`,
  },
];

export default function SupportPage() {
  return (
    <main className="flex-1">
      <Wrap className="py-[clamp(3rem,7vw,5rem)]">
        <h1 className="max-w-[14ch] text-balance text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
          Support
        </h1>
        <p className="mt-5 max-w-[52ch] text-pretty text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.45] text-ink-muted">
          A few answers first, then the full User Guide. Matter’s Help menu opens this page.
        </p>

        <section className="mt-12 rounded-[24px] bg-track p-8">
          <h2 className="text-[1.25rem] font-semibold tracking-[-0.015em]">Reach us</h2>
          {site.supportEmail ? (
            <p className="mt-2 leading-relaxed text-ink-muted">
              Write to{" "}
              <a href={`mailto:${site.supportEmail}`} className="font-medium text-ink underline underline-offset-2">
                {site.supportEmail}
              </a>
              . Say which device and version of macOS or iOS you are on and what you expected to happen.
            </p>
          ) : (
            <p className="mt-2 leading-relaxed text-ink-muted">
              A contact address will be listed here before Matter is on the App Store.
            </p>
          )}
          <p className="mt-3 text-[14px] leading-relaxed text-ink-muted">
            Writing about Matter? See the{" "}
            <Link href="/press" className="text-ink underline underline-offset-2">
              press kit
            </Link>
            , or write to{" "}
            <a href={`mailto:${site.pressEmail}`} className="text-ink underline underline-offset-2">
              {site.pressEmail}
            </a>
            .
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] font-semibold tracking-[-0.025em]">Common questions</h2>
          <dl className="mt-4 divide-y divide-hairline">
            {answers.map((item) => (
              <div key={item.question} className="grid gap-2 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-10">
                <dt className="font-semibold tracking-[-0.01em]">{item.question}</dt>
                <dd className="leading-relaxed text-ink-muted">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16">
          <h2 className="text-[clamp(1.6rem,3vw,2.1rem)] font-semibold tracking-[-0.025em]">User Guide</h2>
          <div className="mt-8 grid gap-12 lg:grid-cols-[200px_1fr]">
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <p className="text-[13px] text-ink-muted">Contents</p>
              <ul className="mt-3 space-y-2 text-[13.5px]">
                {guide.map((doc) => (
                  <li key={doc.id}>
                    <a href={`#${doc.id}`} className="text-ink-muted transition-colors hover:text-ink">
                      {doc.title}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <Link href="/privacy" className="text-ink-muted transition-colors hover:text-ink">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </aside>
            <div className="min-w-0 space-y-16">
              {guide.map((doc) => (
                <InfoDoc key={doc.id} doc={doc} />
              ))}
            </div>
          </div>
        </section>
      </Wrap>
    </main>
  );
}
