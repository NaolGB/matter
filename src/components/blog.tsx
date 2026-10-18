import Image from "next/image";
import type { PostMeta } from "@/content/blog";
import { Mark } from "@/components/site";

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
            small ? "drop-shadow-[0_2px_4px_rgb(0_0_0/0.12)]" : "drop-shadow-[0_8px_16px_rgb(0_0_0/0.14)]"
          }`}
        />
      ) : (
        <Mark size={small ? 14 : 40} className="text-ink-faint/50" />
      )}
    </div>
  );
}
