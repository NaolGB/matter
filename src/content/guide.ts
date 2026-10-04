/* The User Guide and the Privacy Policy. The text is the app's own: guide.generated.json is
   built from Duka/Settings/InfoDocuments.swift by `npm run sync:guide`. Do not edit the JSON
   by hand; change the Swift file and run the script. */

import generated from "./guide.generated.json";

export type InfoBlock =
  | { kind: "heading" | "subheading" | "paragraph" | "bullet" | "note"; text: string }
  | { kind: "step"; n: number; text: string };

export type InfoDocument = {
  id: string;
  title: string;
  blocks: InfoBlock[];
};

/** The how-to pages, in the order the app's Help sidebar lists them. */
export const guide = generated.guide as unknown as InfoDocument[];
export const privacy = generated.privacy as unknown as InfoDocument;
