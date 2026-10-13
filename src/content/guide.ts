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
