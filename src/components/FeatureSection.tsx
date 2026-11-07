import Image from "next/image";
import type { ReactNode } from "react";
import { MacFrame, PhoneFrame } from "@/components/Device";

/* The pictures on a feature page: a whole screen on its device, in the device's own shape, or part
   of a screen on a card in one of three shapes (2:1, 4:3, 3:4). The pictures are the WebP files in
   public/shots/v2, made by Screenshots/demo-2026-11-06/site.py from captures of the demo world, until
   Naol's own shots replace them; the README lists the slots. */

/** A small line under a picture saying which app it is. */
function Caption({ children }: { children: ReactNode }) {
  return (
    <figcaption className="mt-3 text-center text-[12px] text-ink-muted">
      {children}
    </figcaption>
  );
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
      <div
        className={`max-sm:-mx-5 max-sm:overflow-hidden max-sm:px-5 max-sm:pb-8 ${fade}`}
      >
        <div
          className={`max-sm:w-[165%] ${keep === "right" ? "max-sm:-ml-[65%]" : ""}`}
        >
          <MacFrame>
            <Image
              src={src}
              alt={alt}
              width={2000}
              height={1250}
              unoptimized
              className="h-auto w-full"
            />
          </MacFrame>
        </div>
      </div>
      <Caption>{caption}</Caption>
    </figure>
  );
}

/** A whole iPhone screen, in a phone (see Device.tsx). */
export function Phone({
  src,
  alt,
  caption = "iPhone",
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="min-w-0">
      <PhoneFrame>
        <Image
          src={src}
          alt={alt}
          width={600}
          height={1304}
          unoptimized
          className="h-auto w-full"
        />
      </PhoneFrame>
      <Caption>{caption}</Caption>
    </figure>
  );
}

/** The three shapes a cut-out picture can have (Naol, 2026-11-07: the shots are made by hand). */
export type Ratio = "2/1" | "4/3" | "3/4";
const RATIO: Record<Ratio, string> = {
  "2/1": "aspect-[2/1]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
};

/**
 * Part of a screen, on a card of its own, in one of the three shapes; the picture fills it. `at` is
 * the part kept when the picture is not the card's shape: the top left by default, so a window's
 * words stay in view.
 */
export function Crop({
  src,
  alt,
  ratio,
  caption,
  at = "object-left-top",
  className = "",
}: {
  src: string;
  alt: string;
  ratio: Ratio;
  caption: string;
  at?: string;
  className?: string;
}) {
  return (
    <figure className={`min-w-0 ${className}`}>
      <div
        className={`relative overflow-hidden rounded-[14px] bg-base ring-1 ring-hairline ${RATIO[ratio]}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className={`object-cover ${at}`}
        />
      </div>
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
