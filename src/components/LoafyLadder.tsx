"use client";

import { useEffect, useRef } from "react";
import { LADDER_UNIT, RUNG } from "@/components/loafy";

/* Loafy on her ladder, at the right edge of the window. The ladder is fixed there, and she stands
   where the reader is in the page: at the top of it at the top, at the foot of it at the end. She
   moves the way she climbs in the app (LoafRoute's `.climb`): a hop from rung to rung, eased, with
   a lean that changes side on every rung and a slight stretch. While she climbs she is in the
   app's climbing pose, turned to the ladder; once the page stops and she is on a rung, she turns
   round to face us, standing. A turn is drawn the flat way: she narrows to nothing and widens
   again in the other pose. Nothing runs while the page is still.

   She is the app's own clay sprites (loaf-climb and loaf-pose-01-standing in AppCore/Loaf/Resources,
   copied to public/loafy). She is decoration, hidden from assistive technology, and left out on a
   phone, where there is no room beside the page for her.

   When she reaches the ladder's foot at the end of the page, LoafyHome marks the ladder
   `data-away`: she has gone into her house, which now draws her, and she is not drawn here. */

const FIRST = 62; // the top rung, far enough under the bar for her to stand on it
const FOOT = 24; // the lowest rung stays this far above the foot of the window
const UNIT = LADDER_UNIT; // her feet sit this far into the rung
const SIZE = 42; // her box on the page, in pixels; each pose is fitted into it by its foot
const TURN = 90; // each half of a turn, in milliseconds
/* The ladder is Loafy's clay ladder: ~/Desktop/duka/loafy/assets/ladder-tile.png, one rung of
   ladder.png beside it, cut rung to rung so it repeats without a join, copied here as it is and
   repeated down the window. At 44 pixels wide a rung comes every 24, its own proportions. */
const LADDER = "/loafy/ladder.png";

type Side = "front" | "back";

export function LoafyLadder() {
  const ladder = useRef<HTMLDivElement>(null);
  const loafy = useRef<HTMLDivElement>(null);
  const figure = useRef<HTMLDivElement>(null);
  const front = useRef<HTMLImageElement>(null);
  const back = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const track = ladder.current;
    const cob = loafy.current;
    const pose = figure.current;
    if (!track || !cob || !pose) return;

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
      pose.style.transform = "scaleX(0.06)";
      turning = window.setTimeout(() => {
        show(facing);
        pose.style.transform = "";
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
      className="pointer-events-none fixed bottom-0 right-[4px] top-12 z-40 hidden w-[44px] md:block"
    >
      <span
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${LADDER})`,
          backgroundSize: `100% ${RUNG}px`,
          backgroundRepeat: "repeat-y",
          backgroundPositionY: `${FIRST % RUNG}px`,
        }}
      />
      <div
        ref={loafy}
        data-climber
        className="absolute left-1/2 top-0 origin-bottom will-change-transform"
        style={{ transform: `translate(-50%, calc(${FIRST + UNIT}px - 100%))` }}
      >
        <div
          ref={figure}
          className="relative transition-transform ease-in-out"
          style={{ width: SIZE, height: SIZE, transitionDuration: `${TURN}ms` }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- a small sprite, shown as it is */}
          <img ref={front} src="/loafy/standing.webp" alt="" className="absolute bottom-0 left-0 w-full" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={back}
            src="/loafy/climb.webp"
            alt=""
            className="absolute bottom-0 left-1/2 w-[89%] -translate-x-1/2"
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
}
