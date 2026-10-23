/** The few facts about the release that the pages repeat. Matter is a Mac app and an iPhone app, each whole on its own. */
export const site = {
  /**
   * Where the site lives, live since 2026-10-12. The app links here too (the website, privacy and
   * support URLs in DukaKit's DukaLinks.swift), so the two change together.
   */
  url: "https://trymatter.app",
  /** Shown on /support. Leave empty until there is an address to publish. */
  supportEmail: "support@trymatter.app",
  /** For press, on /press and /support. No person's name goes with it (Naol, 2026-10-19). */
  pressEmail: "hi@trymatter.app",
  /** The price, for /press. */
  price: "Free",
  /**
   * The App Store listings, one per device. Each is empty until that app is live; its button is then
   * drawn but inert, and says the app is coming.
   */
  appStore: { mac: "", iphone: "" },
  macRequirement: "macOS 26",
  /** The iPhone app's deployment target (IPHONEOS_DEPLOYMENT_TARGET in the Xcode project). */
  iphoneRequirement: "iOS 26.5",
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
