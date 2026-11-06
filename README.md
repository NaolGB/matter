# Matter

The product website for Matter, a day planner for Mac and iPhone. The app itself lives in
`../workspace` (the Xcode project is still named Duka). Its look is set in `DESIGN.md`, `MAC.md`
and `LOAFY.md` there, and the pictures here follow them.

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
- `/features` the features as three containers (Tasks, Notes, Calendar) and a grid of the others,
  which the home page shows too (`FeatureGroups.tsx`), and a page for each: `/features/tasks`,
  `/notes`, `/calendar` and `/others`. Each picture in a container opens a section of its page, so
  a section's id is written in both places.
- `/support` a way to reach us, a few answers, and the User Guide.
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

- `src/content/guide.json` is the User Guide and the Privacy Policy. The app moved them out to
  this site on 2026-10-08, so they are edited here, by hand, when the app changes. Both were
  checked line by line against the Mac app's source on 2026-10-12. When the policy changes, move
  `UPDATED` in `src/app/privacy/page.tsx`.
- `src/content/app-lines.json` lists each quoted line with the text to look for in the
  Swift source. A line of the app's should come from this file, never from a literal.
- `src/content/positioning-lines.json` holds Naol's sentences, word for word from the Positioning
  page. The site writes no marketing sentences of its own: add one to the Positioning page first.
- On the feature pages everything else is the User Guide's own text, quoted through `guideBlocks()`
  in `src/content/guide.ts`. It stands in until those pages' words are written.
- Sentences that restate behaviour belong in the guide, not on `/`. The home page states
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
