import type { ReactNode } from "react";
import Link from "next/link";

/** The three-legged stool mark, traced from Brand/duka_app_icon_bw_centered.svg. */
export function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-40 -15 80 72" aria-hidden className={className} fill="none">
      <ellipse cx="0" cy="0" rx="34" ry="11" fill="currentColor" />
      <path
        d="M-18 6 C-24 22 -30 38 -33 52 M18 6 C24 22 30 38 33 52 M0 9 C-1 24 -1 38 0 52"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Wrap({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[980px] px-5 sm:px-6 ${className}`}>
      {children}
    </div>
  );
}

const navLinks = [
  { label: "Tasks", href: "/#tasks" },
  { label: "Capacity", href: "/#capacity" },
  { label: "Time", href: "/#time" },
  { label: "Calendar", href: "/#calendar" },
  { label: "Notes", href: "/#notes" },
  { label: "iPhone", href: "/#iphone" },
  { label: "Privacy", href: "/#privacy" },
  { label: "Guide", href: "/guide" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-chrome backdrop-blur-xl backdrop-saturate-150">
      <Wrap className="flex h-12 items-center gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 text-[15px] font-semibold tracking-tight"
        >
          <Mark className="h-[18px] w-[20px]" />
          Matter
        </Link>
        <nav className="no-scrollbar min-w-0 flex-1 overflow-x-auto">
          <ul className="flex items-center justify-start gap-5 whitespace-nowrap pr-2 text-[12px] text-ink-muted sm:justify-end sm:gap-7 sm:pr-0">
            {navLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Wrap>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-hairline py-10">
      <Wrap className="flex flex-col gap-6 text-[12px] leading-relaxed text-ink-muted sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-2 text-ink">
            <Mark className="h-[14px] w-[16px]" />
            <span className="font-semibold">Matter</span>
            <span className="text-ink-faint">Version 1.0</span>
          </p>
          <p>Coming to the App Store. One app for macOS and iOS, sold as a single purchase.</p>
          <p className="text-ink-faint">
            Requires macOS 26. The iPhone app requires iOS 26.5.
          </p>
        </div>
        <ul className="flex gap-5">
          <li>
            <Link href="/guide" className="hover:text-ink">
              User Guide
            </Link>
          </li>
          <li>
            <Link href="/privacy" className="hover:text-ink">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </Wrap>
    </footer>
  );
}

/** A page section with the display heading and a short lede. */
export function Section({
  id,
  title,
  lede,
  children,
  band = false,
  center = false,
}: {
  id?: string;
  title: string;
  lede?: string;
  children?: ReactNode;
  band?: boolean;
  center?: boolean;
}) {
  return (
    <section
      id={id}
      className={
        band
          ? "bg-band py-[clamp(4.5rem,10vw,8rem)] text-band-ink"
          : "py-[clamp(4rem,9vw,7rem)]"
      }
    >
      <Wrap>
        <div className={`reveal ${center ? "mx-auto text-center" : ""}`}>
          <h2
            className={`text-balance text-[clamp(1.9rem,4.6vw,3.25rem)] font-semibold leading-[1.06] tracking-[-0.028em] ${
              center ? "mx-auto max-w-[20ch]" : "max-w-[18ch]"
            }`}
          >
            {title}
          </h2>
          {lede && (
            <p
              className={`mt-5 max-w-[56ch] text-pretty text-[clamp(1.05rem,1.7vw,1.25rem)] leading-[1.45] ${
                band ? "text-band-muted" : "text-ink-muted"
              } ${center ? "mx-auto" : ""}`}
            >
              {lede}
            </p>
          )}
        </div>
        {children}
      </Wrap>
    </section>
  );
}

/** The spec strip: a few cells divided by hairlines, the way Apple lists tech specs. */
export function Spec({
  items,
  band = false,
  columns = 4,
  className = "",
}: {
  items: { term: string; detail: ReactNode }[];
  band?: boolean;
  columns?: 2 | 3 | 4;
  className?: string;
}) {
  const cols =
    columns === 2 ? "sm:grid-cols-2" : columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <dl
      className={`reveal grid gap-px overflow-hidden rounded-2xl border ${
        band ? "border-band-hairline bg-band-hairline" : "border-hairline bg-hairline"
      } ${cols} ${className}`}
    >
      {items.map((item) => (
        <div key={item.term} className={`p-6 ${band ? "bg-band" : "bg-base"}`}>
          <dt className="text-[1rem] font-semibold tracking-tight">{item.term}</dt>
          <dd
            className={`mt-1.5 text-[0.92rem] leading-relaxed ${
              band ? "text-band-muted" : "text-ink-muted"
            }`}
          >
            {item.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Inline keyboard key. */
export function Key({ children }: { children: ReactNode }) {
  return (
    <kbd className="rounded-[5px] border border-hairline bg-track px-1.5 py-0.5 font-sans text-[0.85em] text-ink">
      {children}
    </kbd>
  );
}
