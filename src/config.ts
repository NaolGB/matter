/** The few facts about the release that the pages repeat. Matter is Mac only for now. */
export const site = {
  /**
   * Where the site lives, live since 2026-10-12. The app links here too (the website, privacy and
   * support URLs in DukaKit's Paywall.swift), so the two change together.
   */
  url: "https://trymatter.app",
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
