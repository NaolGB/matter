"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { BODY, CAP, LADDER_UNIT, RUNG, SLASH, colour } from "@/components/loafy";

/* Loafy's house at the foot of the page, and Loafy coming home to it.

   The picture is her house as the app draws it, with her left out (see tools/loaf-render). She is
   drawn over it here, in an SVG laid exactly over the picture: the picture fills the band the way
   `object-fit: cover` does, and the SVG's viewBox is the picture's own 2400 by 1092 points with
   `slice`, which is the same fit. So a point in the house is the same number in both.

   When the house is nearly all in view, she leaves the page's ladder and comes in, moving the way
   she moves in the app (LoafRoute): she climbs to the kitchen floor a rung at a time, with her
   back to us; turns round; hops off the ladder; shuffles along the floor to the counter; hops up
   into the mixing bowl; and settles down to nap, under her tea towel, breathing, with z's
   drifting up. When the house leaves the view, she is back on the ladder, and she comes in again
   next time. Where the ladder is not shown (a phone), or motion is reduced, she is simply asleep
   in the bowl. Without JavaScript she is in the bowl too, because that is how this is drawn.

   Positions are in the picture's points. The house is 546 wide, centred, so a point at x in a
   room drawing is at x + 860, and a point at y in room i is at i * 364 + y - 30. */

const W = 2400;
const H = 1092;
const X = (x: number) => x + 860;
const Y = (room: number, y: number) => room * 364 + y - 30;

const KITCHEN_FLOOR = Y(1, 372);
const COUNTER = X(352); // where she stands before hopping up to the bowl
const BOWL = { x: X(245), y: Y(1, 254) };
const SIZE = { floor: 4.6, bowl: 4 }; // her body units to the house's, as the app draws her
const PILLOW = "#EDE6D8";
const STRIPE = "#8FA3B8";
const CERAMIC = "#E9E2D4";
const ZZZ = "#7E8FA6";

/** Her speeds, from LoafRoute, a little quicker for a page: house units a second. */
const WALK = 190;
const HOP = 0.5;
const TURN = 0.18;
const RUNG_TIME = 0.3;

type Face = { eyes: "open" | "closed"; mouth: "smile" | "round"; gaze: number };
type Pose = {
  x: number;
  y: number;
  size: number;
  sx: number;
  sy: number;
  tilt: number;
  lift: number;
  narrow: number; // 1, or less during a turn
  back: boolean;
  face: Face;
};
type Step = { duration: number; at: (p: number, pose: Pose) => void };

const smooth = (p: number) => p * p * (3 - 2 * p);
const mix = (a: number, b: number, p: number) => a + (b - a) * p;

const asleep: Face = { eyes: "closed", mouth: "round", gaze: 0 };
const awake: Face = { eyes: "open", mouth: "smile", gaze: 0 };

export function LoafyHome({ alt }: { alt: string }) {
  const band = useRef<HTMLDivElement>(null);
  const figure = useRef<SVGGElement>(null);
  const front = useRef<SVGGElement>(null);
  const back = useRef<SVGGElement>(null);
  const openEyes = useRef<SVGGElement>(null);
  const closedEyes = useRef<SVGGElement>(null);
  const smile = useRef<SVGPathElement>(null);
  const round = useRef<SVGEllipseElement>(null);
  const towel = useRef<SVGGElement>(null);
  const zs = useRef<SVGGElement>(null);

  useEffect(() => {
    const box = band.current;
    const g = figure.current;
    if (!box || !g) return;
    const ladder = document.querySelector<HTMLElement>("[data-ladder]");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* Where she is and how she looks, drawn onto the SVG. */
    const pose: Pose = {
      x: BOWL.x,
      y: BOWL.y,
      size: SIZE.bowl,
      sx: 1.12,
      sy: 0.85,
      tilt: 0,
      lift: 0,
      narrow: 1,
      back: false,
      face: asleep,
    };
    let breath = 0;
    let towelIn = 1;

    const show = (element: Element | null, on: boolean) => {
      if (element) (element as SVGElement).style.display = on ? "" : "none";
    };

    const draw = () => {
      const sx = pose.size * pose.sx * (1 - 0.012 * breath) * pose.narrow;
      const sy = pose.size * pose.sy * (1 + 0.045 * breath);
      g.setAttribute(
        "transform",
        `translate(${pose.x} ${pose.y - pose.lift}) rotate(${pose.tilt}) scale(${sx} ${sy})`,
      );
      show(front.current, !pose.back);
      show(back.current, pose.back);
      show(openEyes.current, pose.face.eyes === "open");
      show(closedEyes.current, pose.face.eyes === "closed");
      show(smile.current, pose.face.mouth === "smile");
      show(round.current, pose.face.mouth === "round");
      const look = `translate(${pose.face.gaze} 0)`;
      openEyes.current?.setAttribute("transform", look);
      smile.current?.setAttribute("transform", `translate(${pose.face.gaze} 0)`);
      if (towel.current) {
        towel.current.style.opacity = String(towelIn);
        towel.current.setAttribute("transform", `translate(0 ${-14 * (1 - towelIn) - breath * 1.8})`);
      }
    };

    /* The z's, three at a time, each drifting up and fading over 4.2 seconds, as in the app. */
    const drift = (seconds: number) => {
      const list = zs.current?.children;
      if (!list) return;
      for (let index = 0; index < list.length; index++) {
        const phase = seconds / 4.2 + index / 3;
        const along = phase - Math.floor(phase);
        const width = 5.5 + 6.5 * along;
        const height = width * 1.1;
        const left = X(274) + 34 * along + Math.sin(along * 6) * 4;
        const top = Y(1, 198) - 44 * along - height;
        const z = list[index] as SVGPathElement;
        z.setAttribute("d", `M${left} ${top}h${width}L${left} ${top + height}h${width}`);
        z.setAttribute("stroke-width", String(width * 0.2));
        z.setAttribute("opacity", String(Math.sin(Math.PI * along) * 0.85 * towelIn));
      }
    };

    /* What she is doing: on the ladder (and not drawn here), coming in, or at home. */
    let state: "ladder" | "coming" | "home" = "home";
    let steps: Step[] = [];
    let started = 0;
    let frame = 0;
    let visible = false;
    let lastTick = 0;

    // The ladder is fixed, so it has no offsetParent; hidden, it has no boxes at all.
    const ladderShown = () => !!ladder && ladder.getClientRects().length > 0;

    const atHome = () => {
      state = "home";
      Object.assign(pose, { x: BOWL.x, y: BOWL.y, size: SIZE.bowl, sx: 1.12, sy: 0.85, tilt: 0, lift: 0, narrow: 1, back: false, face: asleep });
      towelIn = 1;
      ladder?.setAttribute("data-away", "");
      g.style.display = "";
      show(zs.current, true);
      draw();
    };

    const onLadder = () => {
      state = "ladder";
      ladder?.removeAttribute("data-away");
      g.style.display = "none";
      towelIn = 0;
      draw();
      show(zs.current, false);
    };

    /* The picture's fit in the band: its scale, and where its corner lands. */
    const fit = () => {
      const width = box.clientWidth;
      const height = box.clientHeight;
      const k = Math.max(width / W, height / H);
      return { k, left: (width - W * k) / 2, top: (height - H * k) / 2 };
    };

    /** Take her off the ladder where she is, and plan the way home from there. */
    const comeIn = () => {
      const climber = ladder?.querySelector("[data-climber] svg");
      if (!climber) return atHome();
      const { k, left, top } = fit();
      const here = climber.getBoundingClientRect();
      const house = box.getBoundingClientRect();
      // Her base is a fourteenth of the way up her box, which runs from -13 to 1 in body units.
      const start = {
        x: (here.left + here.width / 2 - house.left - left) / k,
        y: (here.top + (here.height * 13) / 14 - house.top - top) / k,
      };
      const ladderSize = LADDER_UNIT / k;
      const rung = RUNG / k;
      const facingBack = !!ladder?.querySelector("[data-climber] svg > g:last-child:not([style*='none'])");

      steps = [];
      const turn = (toBack: boolean) =>
        steps.push({
          duration: TURN,
          at: (p, o) => {
            o.narrow = p < 0.5 ? 1 - 1.88 * p : 0.06 + 1.88 * (p - 0.5);
            if (p >= 0.5) o.back = toBack;
          },
        });

      Object.assign(pose, { x: start.x, y: start.y, size: ladderSize, sx: 1, sy: 1, tilt: 0, lift: 0, narrow: 1, back: facingBack, face: awake });
      towelIn = 0;

      // Down or up the ladder to the kitchen floor, a rung at a time, facing the ladder.
      const rise = KITCHEN_FLOOR - start.y;
      const rungs = Math.abs(rise) / rung;
      if (rungs > 0.05) {
        if (!facingBack) turn(true);
        steps.push({
          duration: rungs * RUNG_TIME,
          at: (p, o) => {
            const along = p * rungs;
            const whole = Math.floor(along);
            const part = along - whole;
            const moved = Math.min(Math.abs(rise), (whole + smooth(part)) * rung);
            o.x = start.x;
            o.y = start.y + Math.sign(rise) * moved;
            o.tilt = Math.sin(Math.PI * part) * 5 * (whole % 2 === 0 ? -1 : 1);
            o.sy = 1 + 0.05 * Math.sin(Math.PI * part);
          },
        });
      }
      // Round to face us, and off the ladder onto the floor.
      steps.push({ duration: 0, at: (_, o) => Object.assign(o, { y: KITCHEN_FLOOR, tilt: 0, sy: 1 }) });
      if (pose.back || rungs > 0.05) turn(false);
      const landing = start.x - 70;
      steps.push({
        duration: HOP,
        at: (p, o) => {
          const arc = Math.sin(Math.PI * p);
          o.x = mix(start.x, landing, p);
          o.y = KITCHEN_FLOOR;
          o.lift = arc * 26;
          o.sx = 1 - 0.06 * arc;
          o.sy = 1 + 0.1 * arc;
          o.size = mix(ladderSize, SIZE.floor, p);
          o.face = { ...awake, gaze: -0.8 * p };
        },
      });
      // Along the floor to the counter: the shuffle, rocking side to side, looking where she goes.
      const distance = Math.abs(landing - COUNTER);
      steps.push({
        duration: distance / WALK,
        at: (p, o) => {
          const step = ((p * distance) / 15) * Math.PI;
          o.x = mix(landing, COUNTER, p);
          o.lift = 0;
          o.tilt = Math.sin(step) * 5;
          o.sy = 1 + 0.03 * Math.sin(2 * step);
          o.sx = 1 - 0.02 * Math.sin(2 * step);
          o.face = { ...awake, gaze: -0.8 };
        },
      });
      // A moment at the counter, looking up at the bowl.
      steps.push({ duration: 0.3, at: (_, o) => Object.assign(o, { tilt: 0, sx: 1, sy: 1, face: { ...awake, gaze: -0.6 } }) });
      // Up into the bowl.
      steps.push({
        duration: HOP,
        at: (p, o) => {
          const arc = Math.sin(Math.PI * p);
          o.x = mix(COUNTER, BOWL.x, p);
          o.y = mix(KITCHEN_FLOOR, BOWL.y, smooth(p));
          o.lift = arc * 26;
          o.sx = 1 - 0.06 * arc;
          o.sy = 1 + 0.1 * arc;
          o.size = mix(SIZE.floor, SIZE.bowl, p);
        },
      });
      // Settling in: a squash as she lands, and down into sleep.
      steps.push({
        duration: 0.7,
        at: (p, o) => {
          const sink = smooth(Math.min(1, p / 0.6));
          o.lift = 0;
          o.sx = mix(1, 1.12, sink);
          o.sy = mix(1, 0.85, sink) * (1 - 0.06 * Math.sin(Math.PI * Math.min(1, p / 0.4)));
          o.face = p > 0.45 ? asleep : { ...awake, gaze: 0 };
        },
      });
      // The tea towel settles over her.
      steps.push({ duration: 0.5, at: (p) => (towelIn = smooth(p)) });

      state = "coming";
      ladder?.setAttribute("data-away", "");
      g.style.display = "";
      show(zs.current, false);
      started = performance.now();
      run();
    };

    /* One clock for the journey and for her breathing and the z's once she is in. It runs only
       while the house is on screen, and while she is asleep only a dozen times a second. */
    const tick = (now: number) => {
      frame = 0;
      if (state === "ladder") return;
      if (state === "coming") {
        let t = (now - started) / 1000;
        let index = 0;
        while (index < steps.length && t >= steps[index].duration) {
          steps[index].at(1, pose);
          t -= steps[index].duration;
          index++;
        }
        if (index < steps.length) {
          steps[index].at(t / steps[index].duration, pose);
        } else {
          state = "home";
          towelIn = 1;
          show(zs.current, true);
        }
        draw();
      } else if (still.matches) {
        draw();
      } else if (now - lastTick >= 80) {
        lastTick = now;
        breath = Math.sin(((now / 1000) * 2 * Math.PI) / 4.5);
        drift(now / 1000);
        draw();
      }
      if (visible && (state === "coming" || !still.matches)) frame = requestAnimationFrame(tick);
    };

    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const watch = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        const shown = entry.intersectionRatio;
        if (!ladderShown()) {
          // No ladder to come from: she is at home.
          if (state !== "home") atHome();
        } else if (state === "ladder" && shown >= 0.75) {
          if (still.matches) atHome();
          else comeIn();
        } else if (state !== "ladder" && shown <= 0.15) {
          onLadder();
        }
        if (visible) run();
      },
      { threshold: [0, 0.15, 0.5, 0.75, 1] },
    );

    // At first she is on the ladder if there is one; the observer brings her in if the house is
    // already in view.
    if (ladderShown()) onLadder();
    else atHome();
    watch.observe(box);

    const onResize = () => {
      if (!ladderShown() && state === "ladder") atHome();
    };
    window.addEventListener("resize", onResize);

    return () => {
      watch.disconnect();
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
      ladder?.removeAttribute("data-away");
    };
  }, []);

  return (
    <div ref={band} className="relative mt-14 h-[clamp(560px,calc(100svh-3rem),1092px)]">
      <Image
        src="/shots/loafy-house-light.webp"
        alt={alt}
        fill
        unoptimized
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* Above the page's ladder (z-40) so she is in front of it while she climbs down it, and
          left unclipped so she can be on the ladder above or below the house. */}
      <svg
        aria-hidden
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 z-[41] size-full overflow-visible"
      >
        <g ref={figure} transform={`translate(${BOWL.x} ${BOWL.y}) scale(${SIZE.bowl * 1.12} ${SIZE.bowl * 0.85})`}>
          <g ref={front}>
            <path fill={colour.crumb} d={BODY} />
            <path fill={colour.cap} d={CAP} />
            <path d={SLASH} fill="none" stroke={colour.crust} strokeWidth="0.4" strokeLinecap="round" />
            <ellipse cx="-4.4" cy="-3.9" rx="1.2" ry="0.7" fill={colour.blush} opacity="0.7" />
            <ellipse cx="4.6" cy="-3.9" rx="1.2" ry="0.7" fill={colour.blush} opacity="0.7" />
            <g ref={openEyes} fill={colour.ink} style={{ display: "none" }}>
              <circle cx="-2.4" cy="-5.6" r="0.75" />
              <circle cx="2.6" cy="-5.6" r="0.75" />
            </g>
            <g ref={closedEyes} fill="none" stroke={colour.ink} strokeWidth="0.34" strokeLinecap="round">
              <path d="M-3.3-5.8Q-2.4-4.9-1.5-5.8" />
              <path d="M1.7-5.8Q2.6-4.9 3.5-5.8" />
            </g>
            <path
              ref={smile}
              d="M-1-3.6Q0-2.6 1-3.6"
              fill="none"
              stroke={colour.ink}
              strokeWidth="0.3"
              strokeLinecap="round"
              style={{ display: "none" }}
            />
            <ellipse ref={round} cx="0" cy="-3.2" rx="0.45" ry="0.5" fill={colour.ink} />
          </g>
          <g ref={back} transform="scale(-1 1)" style={{ display: "none" }}>
            <path fill={colour.crumb} d={BODY} />
            <path fill={colour.cap} d={CAP} />
            <path d={SLASH} fill="none" stroke={colour.crust} strokeWidth="0.4" strokeLinecap="round" />
          </g>
        </g>

        {/* The front of the mixing bowl, over her once she is in it. It is the bowl in the
            picture, drawn again on top. */}
        <path d={`M${X(214)} ${Y(1, 242)}A31 25 0 0 0 ${X(276)} ${Y(1, 242)}Z`} fill={CERAMIC} />
        <rect x={X(209)} y={Y(1, 237)} width="72" height="8" rx="4" fill={CERAMIC} />
        <rect x={X(209)} y={Y(1, 237)} width="72" height="8" rx="4" fill="#000" opacity="0.08" />

        <g ref={towel}>
          <rect x={X(220)} y={Y(1, 205)} width="50" height="14" rx="7" fill={PILLOW} />
          <rect x={X(226)} y={Y(1, 210.5)} width="38" height="3" rx="1.5" fill={STRIPE} opacity="0.7" />
        </g>
        <g ref={zs} fill="none" stroke={ZZZ} strokeLinecap="round" strokeLinejoin="round">
          <path />
          <path />
          <path />
        </g>
      </svg>
    </div>
  );
}
