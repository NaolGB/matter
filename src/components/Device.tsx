import type { ReactNode } from "react";

/* The two devices a capture is shown in: a laptop for a Mac window and a phone for an iPhone
   screen. Both are drawn here in plain shapes, in the site's ink and greys. They are not Apple's
   product pictures, which are Apple's to use.

   Every measure is a share of the device's own width, so a frame keeps its proportions at any
   size. A corner radius is given as two shares, of the width and of the height, so the corner
   stays round on a box that is not square. Such a radius on some corners only has to be written
   as the shorthand with zeros (`rounded-[0_0_16%_16%/0_0_62%_62%]`): `rounded-b-[16%/62%]` makes
   a longhand with a slash, which the browser throws away. */

/**
 * A laptop, after the shape of a current MacBook (Naol's reference, 2026-11-07): a dark lid with
 * well-rounded corners and an even bezel, the display's own rounded corners inside it and the
 * camera's notch at the top; under it a thin base, wider than the lid, with the lip for opening
 * it cut into its top edge and two feet beneath. The window stands on the desktop, a capture with
 * its own rounded, transparent corners, so the desktop shows at them and its shadow follows them.
 * The desktop is a picture Naol gave for it (2026-11-07), public/devices/mac-desktop.webp, a soft
 * blue-to-pink gradient; the flat colour under it is its middle, for the moment before it loads.
 */
export function MacFrame({ children }: { children: ReactNode }) {
  return (
    <div className="drop-shadow-[0_22px_30px_rgb(0_0_0/0.16)] max-sm:drop-shadow-[0_10px_14px_rgb(0_0_0/0.14)]">
      <div className="mx-[5.5%] rounded-[2.4%/3.6%] bg-[#1d1d1f] p-[1.2%]">
        <div className="relative overflow-hidden rounded-[1.4%/2.1%] bg-[#e4dff3] bg-[url('/devices/mac-desktop.webp')] bg-cover bg-center p-[2.4%] [&_img]:drop-shadow-[0_6px_14px_rgb(0_0_0/0.14)]">
          {children}
          <div
            aria-hidden
            className="absolute left-1/2 top-0 aspect-[100/26] w-[6%] -translate-x-1/2 rounded-[0_0_16%_16%/0_0_62%_62%] bg-[#1d1d1f]"
          />
        </div>
      </div>
      <div className="relative aspect-[100/2.4] rounded-[1.2%/50%] bg-gradient-to-b from-[#dfdfe4] to-[#c6c6cc]">
        <div className="absolute left-1/2 top-0 h-[48%] w-[15%] -translate-x-1/2 rounded-[0_0_8%_8%/0_0_100%_100%] bg-gradient-to-b from-[#9d9da4] to-[#b6b6bd]" />
        <div className="absolute bottom-0 left-[4.5%] h-[24%] w-[5.5%] translate-y-full rounded-full bg-[#3a3a3e]" />
        <div className="absolute bottom-0 right-[4.5%] h-[24%] w-[5.5%] translate-y-full rounded-full bg-[#3a3a3e]" />
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
