import lines from "./app-lines.json";

/* Every feature the site covers, as Naol approved the tree on 2026-11-07. The home page shows only
   the highlights; /features lists all of these.

   A feature's page is src/content/features/<slug>.mdx at /features/<slug>, and its title comes from
   here, so a rename is one edit (the home page's tiles have their own names, in FeatureGroups).

   The names are Naol's, and the pages use them in their own words too (2026-11-07): the app calls
   the Pin board the notebook, Analysis the Week review and the Journal Standup. */

export type Feature = { name: string; slug: string };
export type FeatureGroup = { id: string; name: string; features: Feature[] };

export const featureTree: FeatureGroup[] = [
  {
    id: "tasks",
    name: "Tasks",
    features: [
      { name: lines.addTask.text, slug: "add-task" },
      { name: "Avoid overplanning", slug: "avoid-overplanning" },
      { name: "Day shape", slug: "day-shape" },
      { name: "Auto-placement", slug: "auto-placement" },
      { name: "Upcoming capacity", slug: "upcoming-capacity" },
      { name: "Recurring", slug: "recurring" },
      { name: "Estimates", slug: "estimates" },
      { name: "Sessions", slug: "sessions" },
      { name: "Complete, reopen and push", slug: "complete-reopen-and-push" },
      { name: "Tags", slug: "tags" },
      { name: "Find a task", slug: "find-a-task" },
      { name: "Reminders", slug: "reminders" },
    ],
  },
  {
    id: "notes",
    name: "Notes",
    features: [
      { name: "Blocks", slug: "blocks" },
      { name: "Mentions", slug: "mentions" },
      { name: "Formatting", slug: "formatting" },
      { name: "Folders and search", slug: "folders-and-search" },
    ],
  },
  {
    id: "calendar",
    name: "Calendar",
    features: [
      { name: lines.calendar.text, slug: "add-a-feed" },
      { name: "Task list with calendars", slug: "tasks-with-calendars" },
      { name: "Calendar views", slug: "calendar-views" },
      { name: "Events that count", slug: "events-that-count" },
    ],
  },
  {
    id: "others",
    name: "Others",
    features: [
      { name: "Pin board", slug: "pin-board" },
      { name: "Analysis", slug: "analysis" },
      { name: "Journal", slug: "journal" },
      { name: "Templates", slug: "templates" },
      { name: "Loafy", slug: "loafy" },
    ],
  },
  {
    id: "mac-and-iphone",
    name: "Mac and iPhone",
    features: [
      { name: "iCloud sync", slug: "icloud-sync" },
      { name: "Offline", slug: "offline" },
      { name: "Menu bar panel", slug: "menu-bar-panel" },
      { name: "Widgets", slug: "widgets" },
      { name: "Getting around", slug: "getting-around" },
    ],
  },
];

/** A feature and its group, by the feature's slug. */
export function findFeature(slug: string) {
  for (const group of featureTree) {
    const feature = group.features.find((candidate) => candidate.slug === slug);
    if (feature) return { feature, group };
  }
  return undefined;
}
