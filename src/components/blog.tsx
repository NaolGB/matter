import Image from "next/image";
import type { Heading, PostMeta } from "@/content/blog";
import { Download, Mark } from "@/components/site";
import positioning from "@/content/positioning-lines.json";

/** The way to get the app, kept in view beside a long read. Ramp's sign-up card, made ours. */
export function GetMatter({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-[20px] bg-track p-5 ${className}`}>
      <p className="flex items-center gap-1.5 text-[13px] font-semibold">
        <Mark size={14} />
        Matter
      </p>
      <p className="mt-2 text-[17px] font-semibold leading-snug tracking-[-0.01em]">{positioning.oneLine}</p>
      <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
        For the Mac and iPhone. It works offline, with no account.
      </p>
      <Download primary className="mt-4 w-full !h-10 !gap-1.5 !px-3 !text-[14px]" />
      <Download device="iphone" className="mt-2 w-full !h-10 !gap-1.5 !px-3 !text-[14px]" />
    </div>
  );
}

/** A long read's sections, when it has enough of them to be worth a list. */
export function Contents({ headings, label = "In this post" }: { headings: Heading[]; label?: string }) {
  if (headings.length < 2) return null;
  return (
    <nav aria-label={label}>
      <p className="text-[13px] font-semibold">{label}</p>
      <ul className="mt-3 space-y-2 text-[13px] leading-snug text-ink-muted">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} className="transition-colors hover:text-ink">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * A post's cover at card size: the picture standing on the grey of the home page's card band, with
 * the hero's shadow made small. A post with no cover gets the mark in its place, so a grid of
 * cards keeps one shape. `small` is the thumbnail beside Previous and Next; `priority` is for a
 * cover that is in view as the page opens.
 */
export function CoverBox({
  cover,
  small = false,
  priority = false,
  className = "",
}: {
  cover?: PostMeta["cover"];
  small?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex aspect-[16/10] items-center justify-center overflow-hidden bg-track ${
        small ? "rounded-[10px] p-1.5" : "rounded-[20px] p-[7%]"
      } ${className}`}
    >
      {cover ? (
        <Image
          src={cover.src}
          alt=""
          width={cover.width / 2}
          height={cover.height / 2}
          unoptimized
          priority={priority}
          className={`h-auto w-full transition-transform duration-300 group-hover:scale-[1.02] ${
            small
              ? "drop-shadow-[0_2px_4px_rgb(0_0_0/0.12)]"
              : "drop-shadow-[0_8px_16px_rgb(0_0_0/0.14)]"
          }`}
        />
      ) : (
        <Mark size={small ? 14 : 40} className="text-ink-faint/50" />
      )}
    </div>
  );
}
