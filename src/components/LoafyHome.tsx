"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/* Loafy's house at the foot of the page, and Loafy coming home to it.

   Both pictures are the app's own painter (LoafSceneView), rendered from the clay house and sprites
   the app ships (LOAFY.md): the house empty (the `out` moment) and the same house with her napping
   in the mixing bowl. They differ only in her, so one fading into the other reads as her arriving.

   While she is on the page's ladder the house is empty. She reaches the ladder's foot at the end of
   the page; there she leaves it and the house fades to her napping, and the ladder is marked
   `data-away` so it draws no one. Scrolling back up, she is on the ladder again and the house is
   empty. Where there is no ladder (a phone) she is simply at home, and without JavaScript the house
   shows her napping too, because that is how it is first drawn. */

/** How close to the end of the page counts as the ladder's foot, in pixels. */
const END = 4;

export function LoafyHome({ alt }: { alt: string }) {
  const [home, setHome] = useState(true);

  useEffect(() => {
    const ladder = document.querySelector<HTMLElement>("[data-ladder]");
    const ladderShown = () => ladder !== null && getComputedStyle(ladder).display !== "none";

    const update = () => {
      const room = document.documentElement.scrollHeight - window.innerHeight;
      const atFoot = window.scrollY >= room - END;
      const isHome = !ladderShown() || atFoot;
      setHome(isHome);
      if (ladder) ladder.toggleAttribute("data-away", isHome && ladderShown());
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      ladder?.removeAttribute("data-away");
    };
  }, []);

  return (
    <div className="mx-auto mt-12 w-full max-w-[min(440px,calc(100%-2.5rem))] pb-[clamp(3rem,7vw,5rem)]">
      <div className="relative">
        <Image
          src="/shots/loafy-house-out.webp"
          alt=""
          width={1024}
          height={1536}
          unoptimized
          className="h-auto w-full rounded-[22px]"
        />
        <Image
          src="/shots/loafy-house-light.webp"
          alt={alt}
          width={1024}
          height={1536}
          unoptimized
          className={`absolute inset-0 h-auto w-full rounded-[22px] transition-opacity duration-500 ${home ? "opacity-100" : "opacity-0"}`}
        />
      </div>
    </div>
  );
}
