import Image from "next/image";
import Link from "next/link";
import { CardArrow } from "@/components/site";

/* "Also in Matter": four more things the app does, two by two, each with a real capture. They are
   made like the four cards above them: the words first, then the picture standing at the foot of
   the card and running off it, the top of a Mac drawer or of a phone screen. Two to a row keeps
   the captures large enough to read. */

export type MoreCard = {
  label: string;
  line: string;
  body: string;
  href: string;
  shot: { src: string; alt: string; width: number; height: number; phone: boolean };
};

export function MoreCards({ title, cards }: { title: string; cards: MoreCard[] }) {
  return (
    <div className="mt-16">
      <p className="rise text-center text-[15px] text-ink-muted">{title}</p>
      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.label} className="rise">
            <Link href={card.href} className="group flex h-full flex-col overflow-hidden rounded-[28px] bg-base">
              <div className="flex items-start justify-between gap-4 p-7 pb-0 sm:p-8 sm:pb-0">
                <div>
                  <p className="text-[13px] text-ink-muted">{card.label}</p>
                  <h3 className="mt-1.5 text-balance text-[1.25rem] font-semibold leading-snug tracking-[-0.02em]">
                    {card.line}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-[1rem] leading-relaxed text-ink-muted">{card.body}</p>
                </div>
                <CardArrow />
              </div>
              <div className="relative mt-auto h-[clamp(230px,24vw,290px)]">
                <Image
                  src={card.shot.src}
                  alt={card.shot.alt}
                  width={card.shot.width}
                  height={card.shot.height}
                  unoptimized
                  className={`absolute top-8 h-auto shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline ${
                    card.shot.phone
                      ? "left-1/2 w-[clamp(180px,20vw,240px)] -translate-x-1/2 rounded-t-[30px]"
                      : "left-1/2 w-[min(440px,calc(100%-4rem))] -translate-x-1/2 rounded-t-[16px]"
                  }`}
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
