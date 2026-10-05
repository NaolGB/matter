import { Fragment, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/config";

/**
 * The app's mark. The artwork is one black shape, so it is used as a mask and drawn in
 * whatever ink the text around it is.
 */
export function Mark({ size = 22, className = "" }: { size?: number; className?: string }) {
  const mask = "url(/brand/mark.png) center / contain no-repeat";
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{ width: size, height: size, mask, WebkitMask: mask }}
    />
  );
}

/**
 * The page's column. `wide` is the home page, the bar and the footer, where pictures of the app
 * need the room to be read; the reading pages keep the narrower one.
 */
export function Wrap({
  children,
  wide = false,
  className = "",
}: {
  children: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full px-5 sm:px-6 ${wide ? "max-w-[1200px]" : "max-w-[980px]"} ${className}`}>
      {children}
    </div>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-chrome backdrop-blur-xl backdrop-saturate-150">
      <Wrap wide className="flex h-12 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <Mark size={20} />
          Matter
        </Link>
        <nav className="flex items-center gap-6 text-[13px] text-ink-muted">
          <Link href="/support" className="transition-colors hover:text-ink">
            Support
          </Link>
          <Link href="/privacy" className="transition-colors hover:text-ink">
            Privacy
          </Link>
        </nav>
      </Wrap>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-track py-10">
      <Wrap wide className="flex flex-col gap-4 text-[12px] leading-relaxed text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2">
          <Mark size={15} className="text-ink" />
          <span className="font-semibold text-ink">Matter</span>
          <span className="text-ink-faint">Version {site.version}</span>
        </p>
        <p className="text-ink-faint">
          Requires {site.macRequirement}. The iPhone app requires {site.iphoneRequirement}.
        </p>
        <ul className="flex gap-5">
          <li>
            <Link href="/support" className="hover:text-ink">
              Support
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
          </li>
        </ul>
      </Wrap>
    </footer>
  );
}

/** Where the app can be had. Until it is on the store this is a statement, not a button. */
export function StoreStatus({ className = "" }: { className?: string }) {
  if (site.appStoreUrl) {
    return (
      <a
        href={site.appStoreUrl}
        className={`inline-flex h-10 items-center rounded-full bg-ink px-5 text-[14px] font-medium text-[var(--base)] ${className}`}
      >
        Get Matter on the App Store
      </a>
    );
  }
  return (
    <span
      className={`inline-flex h-10 items-center rounded-full bg-wash px-5 text-[14px] text-ink-muted ${className}`}
    >
      Coming to the App Store
    </span>
  );
}

/**
 * A section's statement. Set heavy and large, like the headline, and split into words so each
 * can arrive on its own as the line scrolls into view (see `.words` in globals.css).
 */
export function Statement({
  children,
  as: Tag = "h2",
  className = "",
}: {
  children: string;
  as?: "h1" | "h2" | "p";
  className?: string;
}) {
  const words = children.split(" ");
  return (
    <Tag
      className={`words text-balance text-[clamp(2rem,4.6vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.035em] ${className}`}
    >
      {words.map((word, index) => (
        <Fragment key={index}>
          <span style={{ "--i": Math.min(index, 8) } as CSSProperties}>{word}</span>
          {index < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}

/**
 * A screenshot. Pass `src` and the picture's pixel size. The files in `public/shots` are already
 * WebP at twice the size they are shown, so they are served as they are, with no resizing at
 * run time. Without `src` it draws a soft frame that says what to shoot, which is how a slot
 * looks until its capture exists. `compact` is for slots too narrow to hold that note.
 */
export function Shot({
  label,
  capture,
  aspect = "16 / 10",
  src,
  width = 1600,
  height = 1000,
  compact = false,
  className = "",
}: {
  label: string;
  capture?: string;
  aspect?: string;
  src?: string;
  width?: number;
  height?: number;
  compact?: boolean;
  className?: string;
}) {
  if (src) {
    // `w-full` so the frame has its width before the picture arrives: as a grid item with auto
    // margins it would otherwise shrink to nothing, and a lazy image with no box never loads.
    return (
      <figure className={`w-full ${className}`}>
        <Image
          src={src}
          alt={capture ? `${label}: ${capture}` : label}
          width={width}
          height={height}
          unoptimized
          className="h-auto w-full rounded-[inherit]"
        />
      </figure>
    );
  }
  return (
    <figure
      role="img"
      aria-label={`Screenshot placeholder: ${label}`}
      className={`flex w-full flex-col items-center justify-center bg-wash text-center text-ink-muted ${
        compact ? "px-2" : "px-6"
      } ${className}`}
      style={{ aspectRatio: aspect }}
    >
      {!compact && (
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-faint">
          Screenshot
        </span>
      )}
      <span className={`font-medium text-ink ${compact ? "text-[12px] leading-tight" : "mt-2 text-[15px]"}`}>
        {label}
      </span>
      {capture && !compact && (
        <span className="mt-1.5 max-w-[34ch] text-[12.5px] leading-relaxed">{capture}</span>
      )}
    </figure>
  );
}
