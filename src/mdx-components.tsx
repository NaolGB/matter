import { isValidElement, type ComponentPropsWithoutRef, type ReactNode } from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import { CalendarDays } from "@/components/CalendarDays";
import { EditorRefusal } from "@/components/EditorRefusal";
import { NoteSlash } from "@/components/NoteSlash";
import { SessionDrop } from "@/components/SessionDrop";
import { Shot } from "@/components/site";
import { slugify } from "@/content/slug";

/** The words in a heading, whatever markup is inside it, for its anchor. */
function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return "";
}

/**
 * A picture wider than the text: it takes the post's whole column where the text keeps to 680 (see
 * `.post` in app/blog/[slug]/page.tsx). `panel` sets it on the grey of the home page's card band,
 * which is what the drawn cards are made to stand on.
 */
function Figure({ children, caption, panel = false }: { children: ReactNode; caption?: string; panel?: boolean }) {
  return (
    <figure className="wide mt-10 mb-12">
      <div className={panel ? "overflow-hidden rounded-[28px] bg-track px-8 pt-8 pb-8" : ""}>{children}</div>
      {caption && <figcaption className="mt-3 max-w-[680px] text-[14px] leading-relaxed text-ink-muted">{caption}</figcaption>}
    </figure>
  );
}

/** An aside in the soft fill the guide uses for its notes. */
function Note({ children }: { children: ReactNode }) {
  return <aside className="mt-6 rounded-[14px] bg-wash px-5 py-4 text-[16px] [&>p]:mt-0">{children}</aside>;
}

/** Links inside the site go through next/link; the rest open where they are. */
function A({ href = "", ...props }: ComponentPropsWithoutRef<"a">) {
  const className = "text-ink underline decoration-ink/25 underline-offset-[3px] transition-colors hover:decoration-ink";
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} className={className} {...props} />;
  }
  return <a href={href} className={className} {...props} />;
}

/** The text of a post, set for reading: one size up from the guide, and in full ink. */
const components = {
  // Each section has an anchor, so the list beside the text can link to it (see headings() in blog.ts).
  h2: (props) => <h2 id={slugify(textOf(props.children))} className="mt-14 text-[1.5rem] font-semibold leading-tight tracking-[-0.02em]" {...props} />,
  h3: (props) => <h3 className="mt-10 text-[1.2rem] font-semibold tracking-tight" {...props} />,
  p: (props) => <p className="mt-5" {...props} />,
  a: A,
  strong: (props) => <strong className="font-semibold" {...props} />,
  ul: (props) => <ul className="mt-5 list-disc space-y-2 pl-6 marker:text-ink-faint" {...props} />,
  ol: (props) => <ol className="mt-5 list-decimal space-y-2 pl-6 marker:text-ink-faint" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-8 mb-10 border-l-2 border-hairline pl-5 text-[1.3rem] leading-snug tracking-[-0.015em] [&>p]:mt-0"
      {...props}
    />
  ),
  code: (props) => <code className="rounded-[4px] bg-wash px-1 py-0.5 font-mono text-[0.88em]" {...props} />,
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto rounded-[14px] bg-track p-5 text-[14px] leading-relaxed [&>code]:bg-transparent [&>code]:p-0"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-hairline" />,
  // Markdown images come with no size, so they cannot go through next/image. Use <Shot> for
  // anything from public/shots.
  // eslint-disable-next-line @next/next/no-img-element
  img: ({ alt = "", ...props }) => <img alt={alt} className="mt-8 h-auto w-full rounded-[14px]" {...props} />,
  Figure,
  Note,
  Shot,
  CalendarDays,
  EditorRefusal,
  NoteSlash,
  SessionDrop,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
