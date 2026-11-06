"use client";

import Image from "next/image";
import positioning from "@/content/positioning-lines.json";
import { MacFrame, PhoneFrame } from "@/components/Device";
import { Wrap } from "@/components/site";
import { TimeChip, TryDayForm, useTryDay } from "@/components/TryDay";
import { site } from "@/config";

/* The hero, live. The headline is Naol's one line and carries the day's figure inside it, in the
   words of the app's own capacity chip. The field under it changes that figure (see TryDay). */

/** The plain facts, in one line under the sentence that says what it is. */
const FACTS = [site.price, "Works offline", "No account", "Kept in your own iCloud"];

export function Hero() {
  const day = useTryDay();

  return (
    <section className="pt-[clamp(3.5rem,8vw,6.5rem)] pb-[clamp(3.5rem,8vw,6rem)]">
      <Wrap wide className="text-center">
        {/* The pill is as tall as the headline's letters: its foot on their baseline (an inline-block
            with overflow hidden takes its bottom edge as its baseline; an inline-flex would take its
            text's) and its top at the height of an h, about 0.705 of the headline, which at the
            pill's own 0.42 size is 1.68em (measured in Chrome, 2026-10-12). */}
        <h1 className="text-balance text-[clamp(2.5rem,6.2vw,4.75rem)] font-bold leading-[1.14] tracking-[-0.045em]">
          {positioning.oneLine}{" "}
          <TimeChip free={day.free} className="align-baseline text-[0.42em]" />
        </h1>

        <p className="mx-auto mt-6 max-w-[62ch] text-pretty text-[clamp(1.05rem,1.7vw,1.3rem)] leading-[1.45] text-ink-muted">
          {positioning.whatItIs}
        </p>
        <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[15px] text-ink-muted">
          {/* The dot ends an item rather than starting the next, so a line that wraps never
              begins with one. */}
          {FACTS.map((fact, index) => (
            <li key={fact} className="flex items-center gap-2">
              {fact}
              {index < FACTS.length - 1 && <span aria-hidden>·</span>}
            </li>
          ))}
        </ul>

        <TryDayForm day={day} className="mx-auto mt-8" />
      </Wrap>

      {/* The two apps themselves, each on its device (Naol, 2026-11-06; see Device.tsx): captures of
          the demo world at 9:41, both reading the same 2h 10m free as the pill above
          (Screenshots/demo-2026-11-06, which can retake them). The iPhone stands in front of the
          laptop's lower right corner and hangs a little below it (Naol, 2026-10-24: option A), and
          the laptop keeps the full width. On a phone the laptop is shown larger and runs off the
          right, past the Today column, so its words stay readable; the cut fades. The iPhone sits
          outside that fade, so the fade never touches it. */}
      <Wrap wide className="mt-[clamp(1.5rem,3.5vw,2.75rem)]">
        <div className="relative pb-[7%] max-sm:pb-[14%]">
          <div className="max-sm:-mx-5 max-sm:overflow-hidden max-sm:px-5 max-sm:pb-10 max-sm:[mask-image:linear-gradient(to_right,#000_78%,transparent)]">
            <div className="max-sm:w-[165%]">
              <MacFrame>
                <Image
                  src="/shots/v2/mac-tasks.webp"
                  alt="Matter on the Mac at 9:41 on a Tuesday: Loafy at home in her house in the sidebar, 2h 10m free, Write the Mosaic pitch story running in the work bucket, and the Tasks page with today's tasks under their tags and tomorrow's under Upcoming."
                  width={2000}
                  height={1250}
                  unoptimized
                  priority
                  className="h-auto w-full"
                />
              </MacFrame>
            </div>
          </div>
          <div className="absolute right-[1%] bottom-0 w-[32%] sm:w-[17%]">
            <PhoneFrame>
              <Image
                src="/shots/v2/iphone-tasks.webp"
                alt="Matter on the iPhone at 9:41: Loafy's room, Write the Mosaic pitch story running with 2h 10m free, and today's tasks under their tags."
                width={600}
                height={1304}
                unoptimized
                priority
                className="h-auto w-full"
              />
            </PhoneFrame>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
