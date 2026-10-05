"use client";

import { useEffect, useRef } from "react";

/* Loafy on her ladder, at the right edge of the window. The ladder is fixed there, and she stands
   where the reader is in the page: at the top of it at the top, at the foot of it at the end. She
   moves the way she climbs in the app (LoafRoute's `.climb`): a hop from rung to rung, eased, with
   a lean that changes side on every rung and a slight stretch. While the page is moving she
   follows it and looks the way she is going; when it stops she finishes on the nearest rung.
   Nothing runs while the page is still.

   The shapes and colours are the app's: the body, cap, slash and face from LoafFigure, the
   ladder's proportions and paint from LoafSceneView and LoafPalette, at three quarters of a
   point to the unit. It is decoration, hidden from assistive technology, and left out on a
   phone, where there is no room beside the page for it. */

const RUNG = 39; // from one rung to the next
const FIRST = 62; // the top rung, far enough under the bar for her to stand on it
const FOOT = 24; // the lowest rung stays this far above the foot of the window
const UNIT = 3; // one of LoafFigure's body units, on the page
const WOOD = "#C9A678";

export function LoafyLadder() {
  const ladder = useRef<HTMLDivElement>(null);
  const loafy = useRef<HTMLDivElement>(null);
  const eyes = useRef<SVGGElement>(null);
  const mouth = useRef<SVGPathElement>(null);

  useEffect(() => {
    const track = ladder.current;
    const cob = loafy.current;
    if (!track || !cob) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rungs = 1; // how many she can stand on
    let at = 0; // where she is, in rungs from the top
    let moving = false;
    let frame = 0;
    let last = 0;
    let rest = 0;

    /** Where the page is, in rungs from the top. */
    const wanted = () => {
      const room = document.documentElement.scrollHeight - window.innerHeight;
      const through = room > 0 ? Math.min(1, Math.max(0, window.scrollY / room)) : 0;
      return through * (rungs - 1);
    };

    /** Put her at `at`, part way through a hop if it is between two rungs. */
    const draw = (heading: number) => {
      const whole = Math.floor(at);
      const part = at - whole;
      const eased = part * part * (3 - 2 * part);
      const hop = still.matches ? 0 : Math.sin(Math.PI * part);
      const y = FIRST + (whole + (still.matches ? Math.round(part) : eased)) * RUNG + UNIT;
      const lean = hop * 5 * (whole % 2 === 0 ? -1 : 1);
      cob.style.transform = `translate(-50%, calc(${y}px - 100%)) rotate(${lean}deg) scaleY(${1 + 0.05 * hop})`;
      // She looks where she is going; the mouth follows the eyes part of the way.
      const gaze = Math.max(-1, Math.min(1, heading * 3)) * 0.8;
      if (eyes.current) eyes.current.style.transform = `translateY(${gaze}px)`;
      if (mouth.current) mouth.current.style.transform = `translateY(${gaze * 0.65}px)`;
    };

    const step = (now: number) => {
      frame = 0;
      const goal = moving ? wanted() : Math.round(wanted());
      const gap = goal - at;
      if (Math.abs(gap) < 0.003) {
        at = goal;
        draw(0);
        return;
      }
      const elapsed = Math.min(64, now - last);
      last = now;
      at += gap * (1 - Math.exp(-elapsed / 110));
      draw(gap);
      frame = requestAnimationFrame(step);
    };

    const run = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(step);
    };

    const onScroll = () => {
      moving = true;
      window.clearTimeout(rest);
      rest = window.setTimeout(() => {
        moving = false;
        run();
      }, 140);
      run();
    };

    const measure = () => {
      rungs = Math.max(1, Math.floor((track.clientHeight - FIRST - FOOT) / RUNG) + 1);
      at = Math.round(wanted());
      draw(0);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.clearTimeout(rest);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ladder}
      aria-hidden
      data-ladder
      className="pointer-events-none fixed bottom-0 right-[23px] top-12 z-40 hidden w-[22px] md:block"
    >
      <span className="absolute inset-y-0 left-0 w-[7px]" style={{ background: WOOD }} />
      <span className="absolute inset-y-0 right-0 w-[7px]" style={{ background: WOOD }} />
      <span
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to bottom, ${WOOD} 6px, transparent 6px)`,
          backgroundSize: `100% ${RUNG}px`,
          backgroundPositionY: `${FIRST % RUNG}px`,
        }}
      />
      <div
        ref={loafy}
        className="absolute left-1/2 top-0 w-[48px] origin-bottom will-change-transform"
        style={{ transform: `translate(-50%, calc(${FIRST + UNIT}px - 100%))` }}
      >
        <svg viewBox="-8 -13 16 14" className="block w-full overflow-visible">
          <path
            fill="#F6E6C4"
            d="M-6.5 0C-7.8-1.5-7.6-4-6.8-6-6-9.5-4.5-11.5-1.5-11.5.2-11.5 1.4-12.6 2.5-11.8 4.5-11 6.6-9 6.8-6 7.6-4 7.8-1.5 6.5 0 3 .8-3 .8-6.5 0Z"
          />
          <path
            fill="#D9A860"
            d="M-6.5-7.4C-5.6-10-4-11.5-1.5-11.5.2-11.5 1.4-12.6 2.5-11.8 4.4-11 6.2-9.6 6.6-7.4 3-8.8-3-8.8-6.5-7.4Z"
          />
          <path d="M-3.6-9.4Q0-11 3.4-10.2" fill="none" stroke="#B48243" strokeWidth="0.4" strokeLinecap="round" />
          <ellipse cx="-4.4" cy="-3.9" rx="1.2" ry="0.7" fill="#EE9E8A" opacity="0.7" />
          <ellipse cx="4.6" cy="-3.9" rx="1.2" ry="0.7" fill="#EE9E8A" opacity="0.7" />
          <g ref={eyes} fill="#3A2A1A">
            <circle cx="-2.4" cy="-5.6" r="0.75" />
            <circle cx="2.6" cy="-5.6" r="0.75" />
          </g>
          <path
            ref={mouth}
            d="M-1-3.6Q0-2.6 1-3.6"
            fill="none"
            stroke="#3A2A1A"
            strokeWidth="0.3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
