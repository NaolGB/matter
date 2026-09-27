import type { Metadata } from "next";
import { guide } from "@/content/guide";
import { InfoDoc } from "@/components/InfoDoc";
import { Wrap } from "@/components/site";

export const metadata: Metadata = {
  title: "User Guide",
  description: "How Matter works, page by page: the same guide that ships inside the app.",
};

export default function GuidePage() {
  return (
    <main className="flex-1">
      <Wrap className="py-[clamp(3rem,7vw,5rem)]">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          User Guide
        </p>
        <h1 className="mt-4 max-w-[16ch] text-balance text-[clamp(2.2rem,5.5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
          How Matter works.
        </h1>
        <p className="mt-5 max-w-[52ch] text-pretty text-[clamp(1.05rem,1.8vw,1.25rem)] leading-[1.45] text-ink-muted">
          The same guide that ships inside the app, under Help and in Settings ▸ About. It is
          written for the Mac; the iPhone app shares the same store and the same rules.
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-[200px_1fr]">
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-faint">
              Contents
            </p>
            <ul className="mt-3 space-y-2 text-[13.5px]">
              {guide.map((doc) => (
                <li key={doc.id}>
                  <a href={`#${doc.id}`} className="text-ink-muted transition-colors hover:text-ink">
                    {doc.title}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="/privacy" className="text-ink-muted transition-colors hover:text-ink">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </aside>
          <div className="min-w-0 space-y-16">
            {guide.map((doc) => (
              <InfoDoc key={doc.id} doc={doc} />
            ))}
          </div>
        </div>
      </Wrap>
    </main>
  );
}
