import type { ReactNode } from "react";

/* The two devices a capture is shown in: a laptop for a Mac window and a phone for an iPhone
   screen. Both are drawn here in plain shapes, in the site's ink and greys. They are not Apple's
   product pictures, which are Apple's to use.

   Every measure is a share of the device's own width, so a frame keeps its proportions at any
   size. A corner radius is given as two shares, of the width and of the height, so the corner
   stays round on a box that is not square. */

/**
 * A laptop: a dark lid around a pale desktop, with the window standing on it, and the base under
 * the lid, a little wider than it. The window is a capture with its own rounded, transparent
 * corners, so the desktop shows at them, and its shadow follows them.
 */
export function MacFrame({ children }: { children: ReactNode }) {
  return (
    <div className="drop-shadow-[0_22px_30px_rgb(0_0_0/0.16)] max-sm:drop-shadow-[0_10px_14px_rgb(0_0_0/0.14)]">
      <div className="mx-[5.5%] rounded-[1.9%/2.9%] bg-[#1d1d1f] p-[1.3%]">
        <div className="overflow-hidden rounded-[0.8%/1.2%] bg-[#e8e8ed] p-[2.4%] [&_img]:drop-shadow-[0_6px_14px_rgb(0_0_0/0.14)]">
          {children}
        </div>
      </div>
      <div className="relative aspect-[100/1.7] rounded-b-[1.6%/100%] bg-[#d2d2d7]">
        <div className="absolute left-1/2 top-0 h-[42%] w-[13%] -translate-x-1/2 rounded-b-full bg-[#b4b4bb]" />
      </div>
    </div>
  );
}

/**
 * A phone: a dark body with the screen set into it. The capture is a simulator's, with square
 * corners and the island already drawn, so only its corners are rounded here.
 */
export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-[17%/8.1%] bg-[#1d1d1f] p-[3.4%] ring-1 ring-black/20 drop-shadow-[0_18px_28px_rgb(0_0_0/0.2)] max-sm:drop-shadow-[0_8px_14px_rgb(0_0_0/0.16)] [&_img]:rounded-[14.5%/6.7%]">
      {children}
    </div>
  );
}
