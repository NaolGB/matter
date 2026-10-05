"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* "Also in Matter": a row of cards that scrolls sideways, each with a real capture of the app in
   a panel of one of the app's tag colours. A Mac picture is the top of one of its drawers, a
   phone picture the top of the screen; both stand at the top of the panel and run off its foot.
   The row scrolls by touch, trackpad or the two buttons, and each card is a link like any
   other, so the keyboard reaches all of them. */

export type MoreCard = {
  label: string;
  line: string;
  body: string;
  href: string;
  hue: string;
  shot: { src: string; alt: string; width: number; height: number; phone: boolean };
};

function Chevron({ back = false }: { back?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={back ? "M10 3.5 5.5 8l4.5 4.5" : "M6 3.5 10.5 8 6 12.5"} />
    </svg>
  );
}

export function MoreCarousel({ title, cards }: { title: string; cards: MoreCard[] }) {
  const row = useRef<HTMLUListElement>(null);
  const [ends, setEnds] = useState({ start: true, end: false });

  useEffect(() => {
    const list = row.current;
    if (!list) return;
    const check = () =>
      setEnds({
        start: list.scrollLeft <= 4,
        end: list.scrollLeft + list.clientWidth >= list.scrollWidth - 4,
      });
    check();
    list.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      list.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  /** One card along, or back. */
  const move = (direction: 1 | -1) => {
    const list = row.current;
    const card = list?.firstElementChild;
    if (!list || !card) return;
    const gap = parseFloat(getComputedStyle(list).columnGap) || 0;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    list.scrollBy({ left: direction * (card.clientWidth + gap), behavior: still ? "auto" : "smooth" });
  };

  const button =
    "flex size-10 items-center justify-center rounded-full bg-base text-ink transition-opacity disabled:cursor-default disabled:opacity-35";

  return (
    <div className="rise mt-14">
      <div className="flex items-center justify-between">
        <p className="text-[15px] text-ink-muted">{title}</p>
        <div className="flex gap-2">
          <button type="button" aria-label="Previous" onClick={() => move(-1)} disabled={ends.start} className={button}>
            <Chevron back />
          </button>
          <button type="button" aria-label="Next" onClick={() => move(1)} disabled={ends.end} className={button}>
            <Chevron />
          </button>
        </div>
      </div>

      <ul
        ref={row}
        aria-label={title}
        className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {cards.map((card) => (
          <li key={card.label} className="w-[min(380px,82vw)] shrink-0 snap-start">
            <Link href={card.href} className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-base">
              <div
                className="relative h-[280px] overflow-hidden"
                style={{ background: `color-mix(in srgb, ${card.hue} 16%, white)` }}
              >
                <Image
                  src={card.shot.src}
                  alt={card.shot.alt}
                  width={card.shot.width}
                  height={card.shot.height}
                  unoptimized
                  className={`absolute top-8 h-auto shadow-[0_20px_50px_-24px_rgb(0_0_0/0.35)] ring-1 ring-black/5 ${
                    card.shot.phone
                      ? "left-1/2 w-[200px] -translate-x-1/2 rounded-t-[28px]"
                      : "inset-x-8 w-[calc(100%-4rem)] rounded-t-[12px]"
                  }`}
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className="text-[13px] text-ink-muted">{card.label}</span>
                <span className="mt-1 text-balance text-[1.15rem] font-semibold leading-snug tracking-[-0.015em]">
                  {card.line}{" "}
                  <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
                <span className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{card.body}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
