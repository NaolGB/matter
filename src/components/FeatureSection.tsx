import Image from "next/image";
import type { ReactNode } from "react";
import { MacFrame, PhoneFrame } from "@/components/Device";
import { Wrap } from "@/components/site";

/* The parts of a long feature page: a section with a heading, its words and its pictures, and the
   pictures: a whole screen on its device, part of a screen on a card. The pictures are the WebP
   files in public/shots/v2, made by Screenshots/demo-2026-11-06/site.py from captures of the demo
   world. */

/**
 * One section of a feature page. `band` puts it on the grey ground, so neighbouring sections tell
 * apart.
 *
 * With `pictures`, the words sit in a reading column and the pictures run the width of the page
 * under them: for whole windows, which need the room. With `side`, the words take the left of a
 * wide screen and `side` the right, level with them: for something small enough to sit beside the
 * words, so the section has no empty half. On a narrow screen `side` goes under the words.
 */
export function FeatureSection({
  id,
  heading,
  children,
  pictures,
  side,
  band = false,
}: {
  id: string;
  heading: string;
  children: ReactNode;
  pictures?: ReactNode;
  side?: ReactNode;
  band?: boolean;
}) {
  const words = (
    <>
      <h2 className="max-w-[22ch] text-balance text-[clamp(1.75rem,3.6vw,2.6rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
        {heading}
      </h2>
      <div className="mt-6 max-w-[62ch] space-y-3 text-[17px] leading-[1.6] text-ink-muted">{children}</div>
    </>
  );
  return (
    <section id={id} className={`scroll-mt-16 py-[clamp(3.5rem,8vw,6.5rem)] ${band ? "bg-track" : ""}`}>
      <Wrap wide>
        {side ? (
          <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <div>{words}</div>
            <div className="min-w-0">{side}</div>
          </div>
        ) : (
          words
        )}
        {pictures && <div className="mt-[clamp(2rem,4vw,3.25rem)]">{pictures}</div>}
      </Wrap>
    </section>
  );
}

/** A small line under a picture saying which app it is. */
function Caption({ children }: { children: ReactNode }) {
  return <figcaption className="mt-3 text-center text-[12px] text-ink-muted">{children}</figcaption>;
}

/**
 * A whole Mac window, on a laptop (see Device.tsx).
 *
 * On a phone the whole laptop would be too small to read, so it is shown larger and runs off the
 * side of the screen, and the cut fades. `keep` is the side that stays: the left for a page's own
 * content, the right for a side panel.
 */
export function MacWindow({
  src,
  alt,
  caption = "Mac",
  keep = "left",
}: {
  src: string;
  alt: string;
  caption?: string;
  keep?: "left" | "right";
}) {
  const fade =
    keep === "left"
      ? "max-sm:[mask-image:linear-gradient(to_right,#000_78%,transparent)]"
      : "max-sm:[mask-image:linear-gradient(to_left,#000_78%,transparent)]";
  return (
    <figure className="min-w-0">
      <div className={`max-sm:-mx-5 max-sm:overflow-hidden max-sm:px-5 max-sm:pb-8 ${fade}`}>
        <div className={`max-sm:w-[165%] ${keep === "right" ? "max-sm:-ml-[65%]" : ""}`}>
          <MacFrame>
            <Image src={src} alt={alt} width={2000} height={1250} unoptimized className="h-auto w-full" />
          </MacFrame>
        </div>
      </div>
      <Caption>{caption}</Caption>
    </figure>
  );
}

/** A whole iPhone screen, in a phone (see Device.tsx). */
export function Phone({ src, alt, caption = "iPhone" }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="min-w-0">
      <PhoneFrame>
        <Image src={src} alt={alt} width={600} height={1304} unoptimized className="h-auto w-full" />
      </PhoneFrame>
      <Caption>{caption}</Caption>
    </figure>
  );
}

/** Part of a screen, on a card of its own. Pass the picture's own pixel size. */
export function Crop({
  src,
  alt,
  width,
  height,
  caption,
  className = "",
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  className?: string;
}) {
  return (
    <figure className={`min-w-0 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        unoptimized
        className="h-auto w-full rounded-[14px] bg-base ring-1 ring-hairline"
      />
      <Caption>{caption}</Caption>
    </figure>
  );
}

/**
 * A Mac window with the iPhone beside it, their feet level. On a phone they stack, and the iPhone
 * is shown at about half the width.
 */
export function Pair({ mac, phone }: { mac: ReactNode; phone: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:gap-[3.5%]">
      <div className="w-full min-w-0 sm:flex-1">{mac}</div>
      <div className="w-[64%] shrink-0 sm:w-[17.5%]">{phone}</div>
    </div>
  );
}

/** Pictures side by side on a wide screen, stacked on a phone. `columns` is a Tailwind grid template. */
export function Row({ children, columns }: { children: ReactNode; columns: string }) {
  return <div className={`grid items-start gap-6 sm:gap-8 ${columns}`}>{children}</div>;
}
