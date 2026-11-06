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
  appStore: { mac: "https://apps.apple.com/app/matter-tasks-notes-calendar/id6813031802?mt=12", iphone: "https://apps.apple.com/app/matter-tasks-notes-calendar/id6813031802" },
  macRequirement: "macOS 26",
  /** The iPhone app's deployment target (IPHONEOS_DEPLOYMENT_TARGET in the Xcode project). */
  iphoneRequirement: "iOS 26.5",
};

/**
 * What the home page says about Loafy, after the app's own line about where she is. The others'
 * page says it too, so it lives here once.
 */
export const loafyWords =
  "Loafy lives in the sidebar of the Mac app, in a house with three floors. There is no clock in it, no score and no streak. You look in on her. That is all.";
