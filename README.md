# Matter

The product website for Matter, a day planner for Mac and iPhone. The app itself lives in
`../workspace` (the Xcode project is still named Duka). Its look is set in `DESIGN.md`, `MAC.md`
and `LOAFY.md` there, and the pictures here follow them; what the site adds (its symbols, its
picture shapes, where its words come from) is in `DESIGN.md` here.

## Running it

```bash
npm install
npm run dev
```

Next.js 16, React 19, TypeScript, Tailwind 4.

## Pages

- `/` the pitch. The headline and the sentences are Naol's, word for word from Scout's Positioning
  page; the rest are lines the app says.
  The figure in the hero's headline is live: add a task and it answers the way the app's editor would.
- `/#features` the features as three containers (Tasks, Notes, Calendar) and a grid of the others
  (`FeatureGroups.tsx`), on the home page, as a highlight; `/features` lists everything. Each picture in
  a container opens that feature's page.
- `/features/<slug>` a page per feature, one MDX file each in `src/content/features`, set with the
  blog's components. The tree of features and their names are in `src/content/feature-tree.ts`. The
  how-to text is written from the app's source (`DESIGN.md`), so check it when the app changes.
- `/support` a way to reach us and a few answers, which `src/content/answers.ts` holds.
- `/privacy` the Privacy Policy.

The app links to `/support` and `/privacy` on trymatter.app (the URLs in DukaKit's
`DukaLinks.swift`), and the App Store listing needs both URLs.

## Keeping it true to the app

The app changes daily, so the lines the site quotes are checked against it, and Naol's sentences
against the Positioning page.

```bash
npm run check:lines   # fail if a quoted line has left the Mac app or the Positioning page
```

It expects the app at `../workspace/Duka`, and looks only in the Mac app and DukaKit; set
`MATTER_APP_DIR` to point elsewhere. It expects the Positioning page at
`../scout/content/positioning.md`; set `MATTER_POSITIONING` to point elsewhere.

- `src/content/guide.json` is the Privacy Policy. The app moved it out to this site on 2026-10-08,
  so it is edited here, by hand, when the app changes. When the policy changes, move `UPDATED` in
  `src/app/privacy/page.tsx`.
- `src/content/app-lines.json` lists each quoted line with the text to look for in the
  Swift source. A line of the app's should come from this file, never from a literal.
- `src/content/positioning-lines.json` holds Naol's sentences, word for word from the Positioning
  page. The site writes no marketing sentences of its own: add one to the Positioning page first.
- The how-to text on the feature pages is written from the app's source, as drafts for Naol to edit.
- Sentences that restate behaviour belong on the feature pages, not on `/`. The home page states
  ideas, which do not go stale.

## Before launch

`src/config.ts` holds the release facts. The support address is set (support@trymatter.app,
shown on /support, in the Privacy Policy and in the footer). The site's address (`url`,
used for the sitemap, robots.txt, the blog's feed and link previews) is https://trymatter.app.
The App Store links for the Mac and the iPhone are `appStore`.

## Screenshots

The pictures are real captures of the app running its demo world, in `public/shots`. They are
WebP at twice the size they are shown and are served as they are (`unoptimized`), so the site
needs no image resizer at run time.

```tsx
<Shot label="The week review" src="/shots/week-light.webp" width={880} height={800} />
```

The site is always light, so it uses the light captures only. Dark ones of every shot exist in
the folder below if that ever changes.

A `<Shot>` with no `src` draws a soft frame saying what to shoot, which is how a new slot looks
until its capture exists.

The hero, the features containers and the feature pages use captures of both apps taken on
2026-11-06, in `public/shots/v2`: the demo world held at Tuesday 10 November 2026, 9:41, both apps
reading the same 2h 10m free as the headline's pill. The raw captures, how to retake them and
`site.py`, which writes `public/shots/v2`, are in `~/Desktop/duka/Screenshots/demo-2026-11-06`
(see its README). Add a line to `site.py` and rerun it rather than editing the files by hand. A
whole screen is shown on a device drawn in CSS (`Device.tsx`), part of a screen on a plain card.
The desktop behind a Mac window is `public/devices/mac-desktop.webp`, a gradient Naol supplied.

### The shots to make

Naol makes the shots by hand (2026-11-07), so every slot has one of three shapes and the shot
fills it edge to edge. Whole screens keep their device's shape. Make each at twice the size it is
shown, so it stays sharp:

- 2:1, at 1200 × 600: Add task and Avoid overplanning (both drawn for now, `NewTaskSheet`), Task list with
  calendars (drawn for now, `TodayMix`) on the features containers; on the pages, the refused New task
  sheet, the day's settings, the event sheet, the note's date chip and link, and the note's inline
  formatting.
- 4:3, at 800 × 600: Recurring, Upcoming capacity, Sessions, Mentions and Formatting (drawn
  for now: `RepeatPicker`, `UpcomingDays`, `SessionCard`, `InlineTokens`, `InlineFormats`),
  Pin board, Analysis and Journal on the containers. (Loafy's slot is the painter's
  render, not a shot.)
- 3:4, at 900 × 1200: the Today column and the Upcoming column on the pages.
- A whole Mac window: 1440 × 900 at 2x (2880 × 1800), with transparent corners, as the hero and the
  pages show it on the drawn laptop.
- A whole iPhone screen: 1206 × 2622, as the simulator captures it.

The slots are `Fill` in `FeatureGroups.tsx`, `Crop` on the pages (`FeatureSection.tsx`), and
`MacWindow` and `Phone` for whole screens. A shot that is not its slot's shape is cropped to it
from the top left.
The link-preview image, `src/app/opengraph-image.jpg`, is still cut from the October hero
(`~/Desktop/duka/Screenshots/hero-2026-10-12`).

Five pictures are drawn on the page in the app's look, from the October hero's moment,
so they can show what a capture cannot and be changed here when the app changes. Each is
measured against a real capture in `~/Desktop/duka/Screenshots/hero-2026-10-12/cards` (its README
has each window size and crop) and built from the app's own views. Any Mac capture brought onto
the site must be converted to sRGB with the profile kept, or browsers show it washed out; the
files in that folder already are.

- `EditorRefusal`: the New task sheet refusing a three-hour task, from `TaskEditorSheet.swift`,
  at the app's own 520-point width.
- `SessionDrop`: a task dragged onto the running bucket, which says "Drop to start" and lights
  its lip, from `WorkBucketDock.swift`'s geometry, since a drag cannot be captured honestly. The
  lip is drawn softer than the app's. The living room above it is
  `public/shots/house-living-room.webp`, cut from the painter's render.
- `CalendarDays`: the real week is too dense to read at card size, so hours are drawn taller and
  finished and very short tasks are left out.
- `NoteSlash`: the demo's Q4 goals note, with the slash menu, which the app pops as a native menu
  that no capture can show.
- `NewTaskSheet`: the same sheet as `EditorRefusal`, roomier, with a task that fits (Add task) or
  `refused` (Avoid overplanning), a try of 2026-11-07; the two share their drawing parts in `sheet.tsx`.
- `RepeatPicker`: a template's Repeats token with its menu open, the days of the week being chosen
  (Recurring), measured from `Screenshots/demo-2026-11-06/mac/22-repeats-popover.png`.
- `UpcomingDays`: the iPhone's Upcoming list, each coming day folded to its planned time and the
  room left or the amount over (Upcoming capacity), from `iphone/02-tasks-upcoming.png`.
- `SessionCard`: the foot of the Mac's sidebar with a task running in the bucket (Sessions), the
  same geometry as `SessionDrop` at the demo's moment.
- `SlashLines`: `NoteSlash`'s moment close up, two lines then the slash and its menu, for the Blocks
  slot.
- `InlineTokens`: a sentence with a date chip and a note link, close up, for the Mentions slot.
- `InlineFormats`: five lines from the demo's notes, one per inline format, close up, for the
  Formatting slot.
- `FeedRows`: the feeds and their checkbox close up, for the Add a feed slot (`CalendarFeeds` is the
  same list at page size).
- `TodayMix`: a tag's group on Today with a meeting among the tasks, for the Task list with
  calendars slot.
- `CalendarFeeds`: the Feeds list of Settings ▸ Calendars, with made-up feeds, because the demo's
  have addresses nobody should read.

`SessionDrop`, `NoteSlash` and `CalendarFeeds` are on the feature pages; `EditorRefusal` and
`CalendarDays` are now used only by blog posts.

Their words come from the demo world and app-lines.json. When the app's look changes, compare them
with a fresh capture.

Loafy is the clay Loafy. Her house at the end of the page is the app's own painter, twice: empty
(`loafy-house-out.webp`, the `out` moment) and with her napping in the mixing bowl
(`loafy-house-light.webp`); the two differ only in her. Both are rendered with `ImageRenderer`
from `LoafSceneView` at 512 × 768 points, scale 2, as `LoafRenderTests` renders its samples.

The ladder at the right edge is Loafy's clay ladder: `~/Desktop/duka/loafy/assets/ladder-tile.png`,
one rung of `ladder.png` cut so it repeats without a join, copied to `public/loafy/ladder.png` as
it is and repeated by CSS. Loafy climbs it as the app's sprites `loaf-climb` and
`loaf-pose-01-standing`, copied to `public/loafy` as WebP. The house is empty while she is on the
ladder; when she reaches its foot at the end of the page, she fades from the ladder as the house
fades to her napping, and scrolling back up reverses it.

The full-size originals, the App Store set and the tools that made them are in
`~/Desktop/duka/Screenshots/app-store` (see its README). `tools/process.py` there writes
`public/shots`; rerun it after reshooting rather than editing the files by hand.

## Look

The mark in `public/brand/mark.png` is the app's own icon artwork (`Duka.icon`), used as a mask
so it is drawn in ink on any ground. `src/app/icon.png` and `apple-icon.png` are that mark on
white, as the app icon is. The site is in ink throughout: white, one soft grey for bands, and
three steps of text grey, in `src/app/globals.css`. Surfaces are told apart by fill, not outline.
