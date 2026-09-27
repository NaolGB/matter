/* The User Guide and the Privacy Policy, transcribed from the app's own
   Duka/Settings/InfoDocuments.swift. The app's About view links to hosted copies
   of both, and the source says the hosted text should mirror the in-app text, so
   this file is a mirror: the wording is the app's, not the site's. Keep them in
   step when either changes. */

export type InfoBlock =
  | { kind: "heading" | "subheading" | "paragraph" | "bullet" | "note"; text: string }
  | { kind: "step"; n: number; text: string };

export type InfoDocument = {
  id: string;
  title: string;
  blocks: InfoBlock[];
};

const heading = (text: string): InfoBlock => ({ kind: "heading", text });
const paragraph = (text: string): InfoBlock => ({ kind: "paragraph", text });
const bullet = (text: string): InfoBlock => ({ kind: "bullet", text });
const note = (text: string): InfoBlock => ({ kind: "note", text });
const step = (n: number, text: string): InfoBlock => ({ kind: "step", n, text });

export const welcome: InfoDocument = {
  id: "welcome",
  title: "Welcome to Matter",
  blocks: [
    paragraph("Matter is a calm, local-first place for your tasks and time. Everything you create lives on your Mac — there are no accounts to make, and nothing is uploaded to us."),
    paragraph("This guide walks through each part of the app. Use the sidebar to jump to a topic, or read straight through."),
    heading("The main surfaces"),
    bullet("**Tasks** — your board of things to do, with a live view of how the day's plan fits your time."),
    bullet("**Calendar** — your days and events, from calendar feeds you subscribe to."),
    bullet("**Notes** — a block-based space for longer thinking, organized into folders."),
    bullet("**Standup** — a free-form daily log for reflection, with a persistent north star."),
    heading("Getting started"),
    step(1, "Open **Tasks** and add a few things you need to do with the **+** button."),
    step(2, "Set your work hours and daily focus limit in **Settings ▸ Day** so the capacity bar reflects your real day."),
    step(3, "Give tasks an estimate so Matter can tell you whether the day actually fits."),
    step(4, "Explore the rest — subscribe to a calendar, jot a note, or write today's standup."),
    note("Your data stays on this Mac. See **Privacy Policy** in the sidebar for exactly what that means."),
  ],
};

export const tasks: InfoDocument = {
  id: "tasks",
  title: "Tasks",
  blocks: [
    paragraph("The Tasks board is Matter's home. It shows your open work in two columns — **Today** and **Upcoming** — with completed items kept in view for the day you finish them."),
    heading("Creating and editing"),
    bullet("Click **+** in the toolbar (or **New task** in the header) to create a task."),
    bullet("A task has a title, an optional day and time, an estimate in minutes, and any number of tags. Only the title is required."),
    bullet("Click any task row to open the editor. Changes save as you make them."),
    heading("Scheduling a task"),
    paragraph("Pick a day for the task, and optionally a time. If you set a time, the task is *pinned* there. If you leave the time empty, Matter auto-places it within your day's available time."),
    note("Clear a task's time at any point to hand its placement back to auto-scheduling."),
    heading("Completing, reopening, and pushing"),
    bullet("Click the circle on a row to mark it **done**. Click a done task to reopen it."),
    bullet("Hover a row and use the **+** menu to push a task to tomorrow, out a few days, or to next week."),
    bullet("If you keep pushing the same task, Matter asks you to confirm — a gentle nudge that it may need rethinking."),
    heading("Archiving and deleting"),
    paragraph("Deleting a task moves it to the Archive rather than destroying it, so it can be recovered. Open the Archive from the toolbar to restore or permanently remove items."),
    heading("Tags on the board"),
    paragraph("A task appears under each tag it carries. The Today column groups rows by tag, with each group showing the tag's color and its total estimated time. Untagged tasks appear under **No tag**."),
    heading("Tracking time"),
    paragraph("Drag a task onto the **work bucket** at the bottom of the sidebar to start timing it. It stays there on every page. See **Capacity & Scheduling** for how tracked time feeds your day's budget."),
    heading("Finding a task"),
    paragraph("Use **Quick find tasks…** at the top of the board to filter by title."),
  ],
};

export const capacity: InfoDocument = {
  id: "capacity",
  title: "Capacity & Scheduling",
  blocks: [
    paragraph("Matter doesn't just list tasks — it tells you whether they fit. The capacity engine compares the time you've planned against the time you actually have, and warns you before the day is overcommitted."),
    heading("Your day's shape"),
    bullet("**Work hours** — the window your day runs in (by default 8am–8pm). Only time inside this window counts."),
    bullet("**Focus limit** — a daily budget for focused work (by default 6 hours). It's a soft cap: you can plan past it, but Matter flags it."),
    paragraph("Set both in **Settings ▸ Day**, along with whether a full day refuses new work or only says so."),
    heading("The capacity bar"),
    paragraph("The sidebar shows today's plan as a bar — green while you're under budget, orange when over. It reads out how much free time is left, or how far over you've gone."),
    bullet("When the day is over-planned, a **Push … to tomorrow** button appears to defer just enough work to fit."),
    bullet("A compact capacity chip lives in the toolbar. Hover it for a breakdown of worked, planned, and free time — both for the whole day and from now onward."),
    heading("The today gate"),
    paragraph("When you give a task an estimate that won't fit today, the editor says so — **Doesn't fit today** — and offers to move it to the soonest day that has room."),
    heading("Auto-placement"),
    paragraph("Tasks without a set time are placed automatically into the earliest open slot that fits their estimate, working around anything you've pinned to a specific time."),
    heading("Events that count"),
    paragraph("Calendar feeds can be set to **count toward your load**. When on, their events consume capacity just like tasks. When off, they're shown as context but don't affect your budget. Toggle this per feed in **Settings ▸ Calendars**."),
  ],
};

export const templates: InfoDocument = {
  id: "templates",
  title: "Templates & Recurring Work",
  blocks: [
    paragraph("Templates turn work you do again and again into a single click. Each template carries a cadence, an estimate, and a set of tags, and spawns real tasks when you apply it."),
    heading("Creating a template"),
    step(1, "Open the **Templates** drawer from the toolbar."),
    step(2, "Choose a cadence — **Daily**, **Weekly**, or **Monthly**."),
    step(3, "Click **Add new** and fill in the title, estimate, and tags. Weekly templates let you pick which day of the week."),
    heading("Applying templates"),
    paragraph("Each cadence section has an **Apply** button that materializes its tasks for the current period — today for daily, this week for weekly, this month for monthly."),
    bullet("A red dot marks a template not yet applied this period."),
    bullet("A green checkmark means it's already applied — applying again won't create duplicates."),
    heading("What spawned tasks inherit"),
    paragraph("Tasks created from a template start with the template's estimate and tags, and behave like any other task from then on — you can reschedule, retag, or complete them freely."),
  ],
};

export const tags: InfoDocument = {
  id: "tags",
  title: "Tags",
  blocks: [
    paragraph("Tags are how you group and color your work. A task can carry several tags, and the board organizes around them."),
    heading("Managing tags"),
    bullet("Open **Settings ▸ Tags** to add a tag or edit an existing one."),
    bullet("Each tag has a **label**, a **color**, and an **order** number that controls where its group sits on the board."),
    heading("Applying tags"),
    paragraph("In a task's editor, use the tag picker to toggle any of your tags on or off. On the Today column, tasks are grouped under each tag they carry, with the group showing the tag color and its total estimated time."),
    note("Events from calendar feeds can be tagged too — the tag is stored locally in Matter and never written back to the feed."),
  ],
};

export const calendar: InfoDocument = {
  id: "calendar",
  title: "Calendar & Subscriptions",
  blocks: [
    paragraph("Matter can bring your external calendars in alongside your tasks by subscribing to iCal (ICS) feeds. Events are read-only mirrors of the feed — Matter never edits or writes back to your calendar provider."),
    heading("Subscribing to a feed"),
    step(1, "Open **Settings ▸ Calendars**."),
    step(2, "Enter a name and the feed's **iCal URL** (starting with https://), then click **Add**. The feed is fetched right away."),
    step(3, "Pick a color for the feed, and decide whether it should **count toward your load**."),
    note("A feed's URL usually comes from your calendar provider as a “subscribe” or “iCal/ICS” link. Matter needs the raw feed URL, not a web page."),
    heading("Managing feeds"),
    bullet("Toggle a feed **off** to stop syncing it without deleting it."),
    bullet("**Refresh all** forces a live re-fetch and shows the last sync time."),
    bullet("Deleting a feed removes all of its events from the board and the Calendar page."),
    heading("How syncing works"),
    paragraph("Matter syncs on a periodic timer, when the app becomes active, and whenever you hit Refresh. It keeps a rolling window of roughly a month back and a month ahead, and expands repeating events (including edited single occurrences) so they land on the right days."),
    heading("The Calendar page"),
    bullet("Switch between **daily** and **weekly** views. Days and hours form a grid, with events and scheduled tasks drawn as blocks."),
    bullet("Use the **‹ ›** arrows to move between days or weeks; past days fade so the week reads as a record."),
    bullet("Click an event to see its details — title, time, location, and description — in a read-only sheet."),
    bullet("You can tag an event or start a work session on it, just like a task."),
  ],
};

export const notes: InfoDocument = {
  id: "notes",
  title: "Notes",
  blocks: [
    paragraph("Notes is a space for longer thinking — a list of notes on the left, a rich block editor on the right. Notes can be filed into folders or left unfiled."),
    heading("Organizing notes"),
    bullet("Click **New note** to start one; it opens in the editor immediately."),
    bullet("Create folders and drag notes into them to file them. Unfiled notes collect under **Unfiled**."),
    bullet("The list is searchable by title and by the text inside a note."),
    bullet("Deleting a note is a soft delete — recover it later from the archive."),
    note("Matter reopens the last note you were reading when you return to the page."),
    heading("The block editor"),
    paragraph("Notes (and Standup) share a block-based editor. Every line is a block you can restyle and rearrange:"),
    bullet("**Block types:** paragraph, headings, bulleted and numbered items, and checkable to-do items."),
    bullet("**Indent** with Tab and outdent with Shift+Tab to build nested structure."),
    bullet("**Inline formatting:** bold, italic, strikethrough, underline, and inline code."),
    bullet("**Links:** paste a URL and it becomes a clickable link."),
    bullet("**Date chips:** type **@** to pick a date and drop in a date token."),
    bullet("**Keyboard:** arrow keys move between blocks, Return splits a block, and Backspace at the start of a line merges it upward."),
    paragraph("Your edits save automatically a moment after you stop typing."),
  ],
};

export const standup: InfoDocument = {
  id: "standup",
  title: "Standup",
  blocks: [
    paragraph("Standup is a daily reflective log — one entry per day — built for a quick check-in with yourself. It uses the same block editor as Notes."),
    heading("A day's entry"),
    bullet("Click **Add today** to create today's entry if it doesn't exist yet."),
    bullet("Each entry is organized around a few fixed prompts, and each prompt has its own editable block area."),
    bullet("Past days are listed newest-first in the left rail; select one to revisit it."),
    heading("Your north star"),
    paragraph("The right rail holds a single **north star** note that stays the same across every day — a place for the longer-term intention you want in view while you reflect. Editing it changes it everywhere."),
  ],
};

export const notifications: InfoDocument = {
  id: "notifications",
  title: "Notifications",
  blocks: [
    paragraph("The bell in the toolbar is Matter's in-app inbox. It collects reminders and app events, and can also surface them as macOS notifications if you allow it."),
    heading("Using the inbox"),
    bullet("Click the bell to open the inbox. A badge appears when you have unread items."),
    bullet("Unread items show a colored dot and bold text; click a row to toggle it read or unread."),
    bullet("Use **Mark all read** to clear the unread state at once."),
    heading("System alerts"),
    paragraph("If you turn on reminders, Matter can also post macOS notifications so you see them outside the app. If permission is off, the inbox offers a shortcut to enable it in System Settings — the in-app inbox keeps working either way."),
  ],
};

export const navigation: InfoDocument = {
  id: "navigation",
  title: "Getting Around",
  blocks: [
    paragraph("Matter is a single window with a handful of pages and a few slide-in drawers."),
    heading("Switching pages"),
    bullet("The toolbar's leading icons move between **Tasks**, **Standup**, **Calendar**, **Notes**, and **Settings**."),
    bullet("A strip in the title bar shows your most recently visited pages for quick switching."),
    bullet("Open Settings any time with **⌘,**."),
    heading("Toolbar actions"),
    bullet("The **capacity chip** shows free or over-planned time at a glance."),
    bullet("**+** creates a task."),
    bullet("The **pin** opens a pinned scratchpad notebook that follows you across pages."),
    bullet("The **bell** opens notifications."),
    heading("Drawers and sheets"),
    paragraph("The notebook, templates, and archive slide in from the right. The task editor and event details open as centered panels. Press **Esc** to dismiss most of them."),
    heading("Settings"),
    paragraph("Settings is organized into **General**, **Day**, **Tags**, **Calendars**, and **About**. You'll find this guide and the privacy policy under **About**."),
  ],
};

export const privacy: InfoDocument = {
  id: "privacy",
  title: "Privacy Policy",
  blocks: [
    paragraph("Matter is a local-first app. Your tasks, notes, calendars, and settings are stored on your Mac and are not sent to us. Matter has no account system, no analytics, and no advertising or tracking."),
    heading("What stays on your device"),
    paragraph("Everything you create in Matter — tasks, templates, notes, standup entries, tags, and preferences — is stored locally on your device. We, the developer, never receive this data."),
    heading("Calendar subscriptions"),
    paragraph("If you subscribe to a calendar feed, Matter periodically fetches it directly from the URL you provide. Those requests go to that calendar's server, governed by that provider's own policies. Matter does not route them through us."),
    heading("Data you export or share"),
    paragraph("If you copy, export, or share content out of Matter, that action is yours and leaves Matter's control."),
    heading("Children"),
    paragraph("Matter is not directed at children and does not knowingly collect information from them."),
    heading("Changes"),
    paragraph("If this policy changes, the updated version will appear here and on our website."),
    heading("Contact"),
    paragraph("Questions about privacy? Reach us through the Support link in Settings ▸ About."),
  ],
};

/** The how-to pages, in the order the app's Help sidebar lists them. */
export const guide: InfoDocument[] = [
  welcome,
  tasks,
  capacity,
  templates,
  tags,
  calendar,
  notes,
  standup,
  notifications,
  navigation,
];
