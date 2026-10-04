import type { Metadata } from "next";
import { privacy } from "@/content/guide";
import { InfoDoc } from "@/components/InfoDoc";
import { Wrap } from "@/components/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Matter is local-first. Your tasks, notes, calendars and settings stay on your devices. No accounts, no analytics, no tracking.",
};

export default function PrivacyPage() {
  return (
    <main className="flex-1">
      <Wrap className="max-w-[760px] py-[clamp(3rem,7vw,5rem)]">
        <InfoDoc doc={privacy} />
        <p className="mt-12 border-t border-hairline pt-6 text-[13px] text-ink-faint">
          This is the policy shown inside Matter, under Settings ▸ About. The two are the same text.
        </p>
      </Wrap>
    </main>
  );
}
