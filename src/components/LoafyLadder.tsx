"use client";

import { useEffect, useRef } from "react";
import { BODY, CAP, LADDER_UNIT, RUNG, SLASH, colour } from "@/components/loafy";

/* Loafy on her ladder, at the right edge of the window. The ladder is fixed there, and she stands
   where the reader is in the page: at the top of it at the top, at the foot of it at the end. She
   moves the way she climbs in the app (LoafRoute's `.climb`): a hop from rung to rung, eased, with
   a lean that changes side on every rung and a slight stretch. While she climbs she has her back
   to us, facing the ladder; once the page stops and she is on a rung, she turns round to face
   us. A turn is drawn the flat way: she narrows to nothing and widens again the other way round.
   Nothing runs while the page is still.

   The shapes and colours are the app's: the body, cap, slash and face from LoafFigure, the
   ladder's proportions and paint from LoafSceneView and LoafPalette. The app has no back view, so
   that one is ours: the same loaf mirrored, with the pinch on the other side and no face. It is
   decoration, hidden from assistive technology, and left out on a phone, where there is no room
   beside the page for it.

   When her house comes into view at the foot of the page, LoafyHome takes her off the ladder and
   walks her in. While she is there it marks the ladder `data-away`, and she is not drawn here. */

const FIRST = 62; // the top rung, far enough under the bar for her to stand on it
const FOOT = 24; // the lowest rung stays this far above the foot of the window
const UNIT = LADDER_UNIT; // one of LoafFigure's body units, on the page
const TURN = 90; // each half of a turn, in milliseconds
const WOOD = "#C9A678";

type Side = "front" | "back";

export function LoafyLadder() {
  const ladder = useRef<HTMLDivElement>(null);
  const loafy = useRef<HTMLDivElement>(null);
  const figure = useRef<SVGSVGElement>(null);
  const front = useRef<SVGGElement>(null);
  const back = useRef<SVGGElement>(null);

  useEffect(() => {
    const track = ladder.current;
    const cob = loafy.current;
    const svg = figure.current;
    if (!track || !cob || !svg) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let rungs = 1; // how many she can stand on
    let at = 0; // where she is, in rungs from the top
    let moving = false;
    let frame = 0;
    let last = 0;
    let rest = 0;
    let shown: Side = "front";
    let facing: Side = "front";
    let turning = 0;

    const show = (side: Side) => {
      shown = side;
      if (front.current) front.current.style.display = side === "front" ? "" : "none";
      if (back.current) back.current.style.display = side === "back" ? "" : "none";
    };

    /** Turn round: narrow to nothing, swap sides, widen again. A turn asked for midway is taken
        up when this one finishes. */
    const turn = (side: Side) => {
      facing = side;
      if (turning || shown === side) return;
      if (still.matches) return show(side);
      svg.style.transform = "scaleX(0.06)";
      turning = window.setTimeout(() => {
        show(facing);
        svg.style.transform = "";
        turning = window.setTimeout(() => {
          turning = 0;
          if (facing !== shown) turn(facing);
        }, TURN);
      }, TURN);
    };

    /** Where the page is, in rungs from the top. */
    const wanted = () => {
      const room = document.documentElement.scrollHeight - window.innerHeight;
      const through = room > 0 ? Math.min(1, Math.max(0, window.scrollY / room)) : 0;
      return through * (rungs - 1);
    };

    /** Put her at `at`, part way through a hop if it is between two rungs. */
    const draw = () => {
      const whole = Math.floor(at);
      const part = at - whole;
      const eased = part * part * (3 - 2 * part);
      const hop = still.matches ? 0 : Math.sin(Math.PI * part);
      const y = FIRST + (whole + (still.matches ? Math.round(part) : eased)) * RUNG + UNIT;
      const lean = hop * 5 * (whole % 2 === 0 ? -1 : 1);
      cob.style.transform = `translate(-50%, calc(${y}px - 100%)) rotate(${lean}deg) scaleY(${1 + 0.05 * hop})`;
    };

    const step = (now: number) => {
      frame = 0;
      const goal = moving ? wanted() : Math.round(wanted());
      const gap = goal - at;
      // She turns to the ladder only when she is going to another rung, not for a nudge, and
      // turns back to us as soon as the page has stopped and she is all but on her rung.
      if (Math.round(goal) !== Math.round(at)) turn("back");
      else if (!moving && Math.abs(gap) < 0.08) turn("front");
      if (Math.abs(gap) < 0.003) {
        at = goal;
        draw();
        return;
      }
      const elapsed = Math.min(64, now - last);
      last = now;
      at += gap * (1 - Math.exp(-elapsed / 110));
      draw();
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
      draw();
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      window.clearTimeout(rest);
      window.clearTimeout(turning);
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
        data-climber
        className="absolute left-1/2 top-0 w-[48px] origin-bottom will-change-transform"
        style={{ transform: `translate(-50%, calc(${FIRST + UNIT}px - 100%))` }}
      >
        <svg
          ref={figure}
          viewBox="-8 -13 16 14"
          className="block w-full overflow-visible transition-transform ease-in-out"
          style={{ transitionDuration: `${TURN}ms` }}
        >
          <g ref={front}>
            <path fill={colour.crumb} d={BODY} />
            <path fill={colour.cap} d={CAP} />
            <path d={SLASH} fill="none" stroke={colour.crust} strokeWidth="0.4" strokeLinecap="round" />
            <ellipse cx="-4.4" cy="-3.9" rx="1.2" ry="0.7" fill={colour.blush} opacity="0.7" />
            <ellipse cx="4.6" cy="-3.9" rx="1.2" ry="0.7" fill={colour.blush} opacity="0.7" />
            <circle cx="-2.4" cy="-5.6" r="0.75" fill={colour.ink} />
            <circle cx="2.6" cy="-5.6" r="0.75" fill={colour.ink} />
            <path d="M-1-3.6Q0-2.6 1-3.6" fill="none" stroke={colour.ink} strokeWidth="0.3" strokeLinecap="round" />
          </g>
          <g ref={back} transform="scale(-1 1)" style={{ display: "none" }}>
            <path fill={colour.crumb} d={BODY} />
            <path fill={colour.cap} d={CAP} />
            <path d={SLASH} fill="none" stroke={colour.crust} strokeWidth="0.4" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}
