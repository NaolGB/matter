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
    question: "Where is my data kept?",
    answer:
      "On your devices. Matter has no account system and no server of ours. Your devices keep in step through your private iCloud database, and nothing is sent to us.",
  },
  {
    question: "My Mac and iPhone are not in step.",
    answer:
      "Both need to be signed in to the same iCloud account. Settings ▸ General shows when iCloud last synced, and the reason if it did not. On a metered connection, such as a personal hotspot, uploads can wait a few minutes.",
  },
  {
    question: "How do I bring my calendar in?",
    answer:
      "Matter reads calendars as iCal feeds. In Settings ▸ Calendars, paste the feed link your calendar provider gives you: a read-only iCal link, which can start with webcal. It has to be the feed itself, not the address of the calendar’s web page. Matter only reads the feed and never writes back.",
  },
  {
    question: "Do I need the Mac app to use the iPhone app?",
    answer:
      "No. The iPhone app keeps its own copy of your tasks, calendar and notes and works on its own. The guide below is written for the Mac, so a few steps name controls the phone lays out differently.",
  },
  {
    question: "What does Matter need?",
    answer: `${site.macRequirement} on the Mac, and ${site.iphoneRequirement} on the iPhone.`,
  },
];

export default function SupportPage() {
  return (
    <main className="flex-1">
      <Wrap className="py-[clamp(3rem,7vw,5rem)]">
        <h1 className="max-w-[14ch] text-balance text-[clamp(2.4rem,6vw,4rem)] font-normal leading-[1.04] tracking-[-0.035em]">
          Support
        </h1>
        <p className="mt-5 max-w-[52ch] text-pretty text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.45] text-ink-muted">
          A few answers first, then the full User Guide. It is the same guide that ships inside the
          app, under Help.
        </p>

        <section className="mt-12 rounded-[22px] border border-hairline bg-card p-7">
          <h2 className="text-[1.25rem] font-semibold tracking-[-0.015em]">Reach us</h2>
          {site.supportEmail ? (
            <p className="mt-2 leading-relaxed text-ink-muted">
              Write to{" "}
              <a href={`mailto:${site.supportEmail}`} className="font-medium text-ink underline underline-offset-2">
                {site.supportEmail}
              </a>
              . Say which device you are on and what you expected to happen.
            </p>
          ) : (
            <p className="mt-2 leading-relaxed text-ink-muted">
              A contact address will be listed here before Matter is on the App Store.
            </p>
          )}
        </section>

        <section className="mt-14">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-normal tracking-[-0.02em]">Common questions</h2>
          <dl className="mt-6 divide-y divide-hairline border-y border-hairline">
            {answers.map((item) => (
              <div key={item.question} className="grid gap-2 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-10">
                <dt className="font-semibold tracking-[-0.01em]">{item.question}</dt>
                <dd className="leading-relaxed text-ink-muted">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-16">
          <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-normal tracking-[-0.02em]">User Guide</h2>
          <div className="mt-8 grid gap-12 lg:grid-cols-[200px_1fr]">
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">Contents</p>
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
