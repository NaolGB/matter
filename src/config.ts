/** The few facts about the release that the pages repeat. Matter is Mac only for now. */
export const site = {
  /**
   * Where the site lives. A placeholder: it matches the app's own links (`DukaLinks` in
   * AboutFooter.swift), and both must change together when the real domain is chosen.
   */
  url: "https://duka.app",
  /** Shown on /support. Leave empty until there is an address to publish. */
  supportEmail: "support@trymatter.app",
  /** The App Store listing. Empty until the app is live; the pages then say it is coming. */
  appStoreUrl: "",
  macRequirement: "macOS 26",
};

/**
 * Words standing in until the real ones are chosen. Each was a line the app said, and the app no
 * longer says it, so for now the site says its own. Replace these, or point them back at a line
 * in app-lines.json once the app has one.
 */
export const placeholder = {
  /** The Notes card. Was the phone's "Write, or type / for headings and lists". */
  notes: "Type / for headings and lists",
};
