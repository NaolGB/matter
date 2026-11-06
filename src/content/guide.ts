/* The User Guide and the Privacy Policy. They began as the app's own text, but the app moved them
   out to this site on 2026-10-08 (its Settings and Help menu link here now), so guide.json is
   the source and is edited by hand. When the app changes, change it here. */

import source from "./guide.json";

export type InfoBlock =
  | { kind: "heading" | "subheading" | "paragraph" | "bullet" | "note"; text: string }
  | { kind: "step"; n: number; text: string };

export type InfoDocument = {
  id: string;
  title: string;
  blocks: InfoBlock[];
};

/** The how-to pages, in reading order. */
export const guide = source.guide as unknown as InfoDocument[];
export const privacy = source.privacy as unknown as InfoDocument;

/**
 * The blocks under one heading of a guide page, or its opening blocks when no heading is given. For
 * a page that quotes the guide rather than retyping it. It throws while the site is built when the
 * page or the heading has gone, so a quote can't go missing quietly.
 */
export function guideBlocks(id: string, heading?: string): InfoBlock[] {
  const doc = guide.find((page) => page.id === id);
  if (!doc) throw new Error(`The guide has no page "${id}".`);
  let start = 0;
  if (heading !== undefined) {
    start = doc.blocks.findIndex((block) => block.kind === "heading" && block.text === heading) + 1;
    if (start === 0) throw new Error(`The guide's "${id}" page has no heading "${heading}".`);
  }
  const rest = doc.blocks.slice(start);
  const end = rest.findIndex((block) => block.kind === "heading");
  return end === -1 ? rest : rest.slice(0, end);
}

/**
 * One block under a heading of a guide page: the one whose text begins with `start`. For a page
 * that quotes a single line of a list, so it comes back as a paragraph: one bullet on its own
 * reads as a list somebody forgot to finish. It throws while the site is built when the line has
 * gone.
 */
export function guideBlock(id: string, heading: string | undefined, start: string): InfoBlock[] {
  const block = guideBlocks(id, heading).find((candidate) => candidate.text.startsWith(start));
  if (!block) throw new Error(`The guide's "${id}" page has no line beginning "${start}".`);
  return [{ kind: "paragraph", text: block.text }];
}
