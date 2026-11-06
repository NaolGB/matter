import Link from "next/link";
import { Download, Statement, Wrap } from "@/components/site";

/** The top of a feature page: a statement and the sentence under it. */
export function FeatureIntro({ statement, sentence }: { statement: string; sentence: string }) {
  return (
    <section className="pt-[clamp(3.5rem,8vw,6.5rem)] pb-[clamp(3.5rem,7vw,5.5rem)]">
      <Wrap wide>
        <Statement as="h1" className="max-w-[20ch]">
          {statement}
        </Statement>
        <p className="rise mt-6 max-w-[58ch] text-[clamp(1.05rem,1.7vw,1.3rem)] leading-[1.45] text-ink-muted">
          {sentence}
        </p>
      </Wrap>
    </section>
  );
}

/** The end of a feature page: the way to get the app, the next feature and this one's part of the guide. */
export function FeatureEnd({ next, guide }: { next: { label: string; href: string }; guide: string }) {
  return (
    <section className="py-[clamp(3rem,6vw,5rem)]">
      <Wrap wide className="flex flex-col items-center gap-6 text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <Download primary />
          <Download device="iphone" />
        </div>
        <p className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-[14px] text-ink-muted">
          <Link href={next.href} className="transition-colors hover:text-ink">
            Next: {next.label}
          </Link>
          <Link href={guide} className="transition-colors hover:text-ink">
            Read the guide
          </Link>
        </p>
      </Wrap>
    </section>
  );
}
