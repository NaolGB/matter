import Image from "next/image";
import Link from "next/link";

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
              <div className="flex flex-col p-7 pb-0 sm:p-8 sm:pb-0">
                <span className="text-[13px] text-ink-muted">{card.label}</span>
                <span className="mt-1 text-balance text-[1.2rem] font-semibold leading-snug tracking-[-0.015em]">
                  {card.line}{" "}
                  <span aria-hidden className="inline-block transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
                <span className="mt-2 max-w-[46ch] text-[0.95rem] leading-relaxed text-ink-muted">{card.body}</span>
              </div>
              <div className="relative mt-auto h-[clamp(230px,24vw,290px)]">
                <Image
                  src={card.shot.src}
                  alt={card.shot.alt}
                  width={card.shot.width}
                  height={card.shot.height}
                  unoptimized
                  className={`absolute top-8 h-auto shadow-[0_20px_50px_-24px_rgb(0_0_0/0.35)] ring-1 ring-black/5 ${
                    card.shot.phone
                      ? "left-1/2 w-[clamp(180px,20vw,240px)] -translate-x-1/2 rounded-t-[30px]"
                      : "left-1/2 w-[min(440px,calc(100%-4rem))] -translate-x-1/2 rounded-t-[12px]"
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
