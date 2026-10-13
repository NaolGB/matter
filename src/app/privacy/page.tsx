import type { Metadata } from "next";
import { privacy } from "@/content/guide";
import { InfoDoc } from "@/components/InfoDoc";
import { Wrap } from "@/components/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Matter is local-first. Your tasks, notes, calendars and settings stay on your Mac and in your own iCloud. No accounts, no analytics, no tracking.",
};

/** The date the policy last changed. Move it whenever the text in guide.json changes. */
const UPDATED = "12 October 2026";

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      <Wrap className="py-[clamp(3rem,7vw,5rem)]">
        <div className="max-w-[680px]">
          <InfoDoc doc={privacy} page />
          <p className="mt-12 border-t border-hairline pt-6 text-[13px] leading-relaxed text-ink-muted">
            Last updated {UPDATED}. Matter links here from the foot of Settings ▸ General, and from
            its Help menu.
          </p>
        </div>
      </Wrap>
    </main>
  );
}
