/* The Privacy Policy. It began as the app's own text, but the app moved it out to this site on
   2026-10-08 (its Settings and Help menu link here now), so guide.json is the source and is edited
   by hand. The file is named for the User Guide that sat beside it, until the feature pages replaced
   that on 2026-11-07. */

import source from "./guide.json";

export type InfoBlock =
  | { kind: "heading" | "subheading" | "paragraph" | "bullet" | "note"; text: string }
  | { kind: "step"; n: number; text: string };

export type InfoDocument = {
  id: string;
  title: string;
  blocks: InfoBlock[];
};

export const privacy = source.privacy as unknown as InfoDocument;
