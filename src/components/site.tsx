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
 * need the room to be read; the reading pages keep the narrower one. `--lane` is room kept clear
 * on the right for Loafy's ladder, set in globals.css where the window is too narrow for the
 * ladder to stand in the margin; everywhere else it is nothing.
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
    <div
      className={`mx-auto w-full pl-5 pr-[calc(1.25rem_+_var(--lane,0px))] sm:pl-6 sm:pr-[calc(1.5rem_+_var(--lane,0px))] ${
        wide ? "max-w-[1200px]" : "max-w-[980px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** `blog` is whether there is a post to link to: the layout knows, since this file is also loaded in the browser. */
export function Nav({ blog = false }: { blog?: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-chrome backdrop-blur-xl backdrop-saturate-150">
      {/* The mark on the left, the way to get the app in the middle, the two pages on the right.
          On a phone there is no room for all three, and the pages are in the footer. */}
      <Wrap wide className="grid h-12 grid-cols-[auto_1fr] items-center gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <Link href="/" className="flex items-center gap-2 justify-self-start text-[15px] font-semibold tracking-tight">
          <Mark size={20} />
          Matter
        </Link>
        <div className="flex gap-2 justify-self-end sm:justify-self-center">
          <Download primary small />
          <Download device="iphone" small />
        </div>
        <nav className="hidden items-center gap-6 justify-self-end text-[13px] text-ink-muted sm:flex">
          {blog && (
            <Link href="/blog" className="transition-colors hover:text-ink">
              Blog
            </Link>
          )}
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

export function Footer({ blog = false }: { blog?: boolean }) {
  return (
    // White like the page, with a hairline above it: on the home page Loafy's house ends the page,
    // and a grey band under it was a third near-white in one screen.
    <footer className="border-t border-hairline py-10">
      <Wrap wide className="flex flex-col gap-4 text-[12px] leading-relaxed text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-2">
          <Mark size={15} className="text-ink" />
          <span className="font-semibold text-ink">Matter</span>
          <span className="ml-1">© {new Date().getFullYear()}</span>
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-1">
          {site.supportEmail && (
            <li>
              <a href={`mailto:${site.supportEmail}`} className="hover:text-ink">
                {site.supportEmail}
              </a>
            </li>
          )}
          {blog && (
            <li>
              <Link href="/blog" className="hover:text-ink">
                Blog
              </Link>
            </li>
          )}
          <li>
            <Link href="/support" className="hover:text-ink">
              Support
            </Link>
          </li>
          <li>
            <Link href="/press" className="hover:text-ink">
              Press
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
          </li>
        </ul>
      </Wrap>
    </footer>
  );
}

/** Where the app can be had. Until it is on the store this is a statement, not a button. */
export function StoreStatus({ device = "mac", className = "" }: { device?: Device; className?: string }) {
  if (site.appStore[device]) {
    return (
      <a
        href={site.appStore[device]}
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

export type Device = "mac" | "iphone";

/** A laptop and a phone, not Apple's logo, which is theirs to use. */
const ICON: Record<Device, string> = {
  mac: "M4 4.5h12a1 1 0 0 1 1 1V13H3V5.5a1 1 0 0 1 1-1zM1.5 15.5h17",
  iphone: "M7 2h6a1.5 1.5 0 0 1 1.5 1.5v13A1.5 1.5 0 0 1 13 18H7a1.5 1.5 0 0 1-1.5-1.5v-13A1.5 1.5 0 0 1 7 2zM9 15.5h2",
};

const NAME: Record<Device, string> = { mac: "Mac", iphone: "iPhone" };

/**
 * The button to get the app on one device. Until that device's link in `site.appStore` is set
 * there is nowhere to send anyone, so the button is drawn but does nothing, and whoever shows it
 * says the app is coming.
 */
export function Download({
  device = "mac",
  primary = false,
  small = false,
  className: extra = "",
}: {
  device?: Device;
  primary?: boolean;
  /** The size for the bar, where on a phone it says only "Mac" or "iPhone". */
  small?: boolean;
  className?: string;
}) {
  const url = site.appStore[device];
  const className = `inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap ${
    small ? "h-8 gap-1.5 px-3.5 text-[13px]" : "h-12 gap-2.5 px-6 text-[15px]"
  } ${primary ? "bg-ink text-[var(--base)]" : "bg-base text-ink ring-1 ring-inset ring-black/15"} ${extra}`;
  const label = small ? (
    <>
      <span className="sm:hidden">{NAME[device]}</span>
      <span className="hidden sm:inline">Download for {NAME[device]}</span>
    </>
  ) : (
    <>Download for {NAME[device]}</>
  );
  const content = (
    <>
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className={small ? "size-[15px]" : "size-[18px]"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={ICON[device]} />
      </svg>
      {label}
    </>
  );
  if (url) {
    return (
      <a href={url} className={`${className} transition-opacity hover:opacity-85`}>
        {content}
      </a>
    );
  }
  return (
    <span aria-disabled="true" title="Coming to the App Store" className={`${className} cursor-default select-none`}>
      {content}
    </span>
  );
}

/** The round arrow in the corner of a card that links somewhere. */
export function CardArrow() {
  return (
    <span
      aria-hidden
      className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-[var(--base)] transition-transform group-hover:translate-x-0.5"
    >
      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 8h10M9 4l4 4-4 4" />
      </svg>
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
