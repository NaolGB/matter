import type { Metadata } from "next";
import Link from "next/link";
import { Wrap } from "@/components/site";
import { site } from "@/config";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Matter's terms of use: Apple's standard licence agreement.",
};

/** The date these terms last changed. Move it whenever the text below changes. */
const UPDATED = "23 October 2026";

/** Apple's standard licence agreement, which covers any App Store app that has no licence of its own. */
const APPLE_EULA = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";

/* Short on purpose (Naol, 2026-10-19): the app's terms are Apple's standard licence agreement, and
   this page says so. Matter is free (2026-10-23); say just that, nothing about plans. No
   governing-law clause, and no person's name. */
const link = "text-ink underline decoration-ink/25 underline-offset-[3px] transition-colors hover:decoration-ink";

function Part({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="pt-5 text-[1.15rem] font-semibold tracking-tight text-ink">{title}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export default function TermsPage() {
  return (
    <main className="flex-1">
      <Wrap className="py-[clamp(3rem,7vw,5rem)]">
        <article className="max-w-[680px]">
          <h1 className="text-balance text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            Terms of Use
          </h1>
          <div className="mt-8 space-y-3 text-[16px] leading-[1.6] text-ink-muted">
            <Part title="The licence">
              <p>
                Matter for Mac and Matter for iPhone are licensed to you under{" "}
                <a href={APPLE_EULA} className={link}>
                  Apple’s Standard Licensed Application End User License Agreement
                </a>
                . Those are the terms of use for the app.
              </p>
            </Part>
            <Part title="Price">
              <p>Matter is free.</p>
            </Part>
            <Part title="Your data">
              <p>
                What Matter does with your data, which is to keep it on your devices and in your own
                iCloud, is in the{" "}
                <Link href="/privacy" className={link}>
                  Privacy Policy
                </Link>
                .
              </p>
            </Part>
            <Part title="Changes">
              <p>
                If these terms change, this page changes with them, and the date below moves.
              </p>
            </Part>
            <Part title="Contact">
              <p>
                Questions about these terms:{" "}
                <a href={`mailto:${site.supportEmail}`} className={link}>
                  {site.supportEmail}
                </a>
                .
              </p>
            </Part>
          </div>
          <p className="mt-12 border-t border-hairline pt-6 text-[13px] leading-relaxed text-ink-muted">
            Last updated {UPDATED}.
          </p>
        </article>
      </Wrap>
    </main>
  );
}
