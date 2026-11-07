import type { Metadata } from "next";
import Link from "next/link";
import { answers } from "@/content/answers";
import { site } from "@/config";
import { Wrap } from "@/components/site";

export const metadata: Metadata = {
  title: "Support",
  description: "How to get help with Matter: common questions, a way to reach us, and where to read how each feature works.",
};

export default function SupportPage() {
  return (
    <main className="flex-1">
      <Wrap className="py-[clamp(3rem,7vw,5rem)]">
        <h1 className="max-w-[14ch] text-balance text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
          Support
        </h1>
        <p className="mt-5 max-w-[52ch] text-pretty text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.45] text-ink-muted">
          A few answers, and how to reach us. Matter’s Help menu opens this page.
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
            {Object.values(answers).map((item) => (
              <div key={item.question} className="grid gap-2 py-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] md:gap-10">
                <dt className="font-semibold tracking-[-0.01em]">{item.question}</dt>
                <dd className="leading-relaxed text-ink-muted">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="mt-14 text-[17px] leading-relaxed">
          For how each part of Matter works, on the Mac and the iPhone, see{" "}
          <Link href="/features" className="font-medium underline underline-offset-2">
            Features
          </Link>
          .
        </p>
      </Wrap>
    </main>
  );
}
