import { Fragment, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/config";

/* The logo comes as artwork for a light ground and artwork for a dark one (Brand/Matter).
   <picture> lets the browser choose, so there is no script and no flash. */

export function Mark({ size = 22, className = "" }: { size?: number; className?: string }) {
  return (
    <picture>
      <source srcSet="/brand/mark-on-dark.png" media="(prefers-color-scheme: dark)" />
      <img src="/brand/mark-on-light.png" alt="" width={size} height={size} className={className} />
    </picture>
  );
}

export function Wordmark({ height = 44, className = "" }: { height?: number; className?: string }) {
  const width = Math.round((height * 796) / 216);
  return (
    <picture>
      <source srcSet="/brand/wordmark-on-dark.png" media="(prefers-color-scheme: dark)" />
      <img
        src="/brand/wordmark-on-light.png"
        alt="Matter"
        width={width}
        height={height}
        className={className}
      />
    </picture>
  );
}

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[980px] px-5 sm:px-6 ${className}`}>{children}</div>;
}

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-chrome backdrop-blur-xl backdrop-saturate-150">
      <Wrap className="flex h-12 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <Mark size={22} />
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
    <footer className="border-t border-hairline py-10">
      <Wrap className="flex flex-col gap-4 text-[12px] leading-relaxed text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2">
          <Mark size={16} />
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
      className={`inline-flex h-10 items-center rounded-full border border-hairline px-5 text-[14px] text-ink-muted ${className}`}
    >
      Coming to the App Store
    </span>
  );
}

/**
 * A section's statement. Set light and large, and split into words so each can arrive on
 * its own as the line scrolls into view (see `.words` in globals.css).
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
      className={`words text-balance text-[clamp(1.9rem,4.4vw,3.1rem)] font-normal leading-[1.1] tracking-[-0.03em] ${className}`}
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
 * A screenshot slot. Until the real capture exists it draws a labelled frame that
 * says what to shoot; pass `src` (and the image's pixel size) to show the picture.
 */
export function Shot({
  label,
  capture,
  aspect = "16 / 10",
  src,
  width = 1600,
  height = 1000,
  className = "",
}: {
  label: string;
  capture?: string;
  aspect?: string;
  src?: string;
  width?: number;
  height?: number;
  className?: string;
}) {
  if (src) {
    return (
      <figure className={className}>
        <Image
          src={src}
          alt={label}
          width={width}
          height={height}
          sizes="(min-width: 980px) 980px, 100vw"
          className="h-auto w-full rounded-[inherit]"
        />
      </figure>
    );
  }
  return (
    <figure
      role="img"
      aria-label={`Screenshot placeholder: ${label}`}
      className={`flex w-full flex-col items-center justify-center border border-dashed border-hairline bg-track px-6 text-center text-ink-muted ${className}`}
      style={{ aspectRatio: aspect }}
    >
      <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">Screenshot</span>
      <span className="mt-2 text-[15px] font-medium text-ink">{label}</span>
      {capture && <span className="mt-1.5 max-w-[34ch] text-[12.5px] leading-relaxed">{capture}</span>}
    </figure>
  );
}
