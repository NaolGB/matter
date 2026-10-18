# Matter

The product website for Matter, a planner for the Mac. Matter is Mac only for now: the site
offers no iPhone app, widget or iPhone capture. The app itself lives in `../workspace` (the Xcode
project is still named Duka). Its look is set in `DESIGN.md`, `MAC.md` and `LOAFY.md` there,
and the pictures here follow them.

## Running it

```bash
npm install
npm run dev
```

Next.js 16, React 19, TypeScript, Tailwind 4.

## Pages

- `/` the pitch. Every heading is a line the app says; the sentences under them are ours.
  The figure in the hero's headline is live: add a task and it answers the way the app's editor would.
- `/support` a way to reach us, a few answers, and the User Guide.
- `/privacy` the Privacy Policy.

The app links to `/support` and `/privacy` on trymatter.app (the URLs in DukaKit's
`Paywall.swift`), and the App Store listing needs both URLs.

## Keeping it true to the app

The app changes daily, so the lines the home page quotes are checked against it.

```bash
npm run check:lines   # fail if a line the home page quotes has left the Mac app
```

It expects the app at `../workspace/Duka`, and looks only in the Mac app and DukaKit; set
`MATTER_APP_DIR` to point elsewhere.

- `src/content/guide.json` is the User Guide and the Privacy Policy. The app moved them out to
  this site on 2026-10-08, so they are edited here, by hand, when the app changes. Both were
  checked line by line against the Mac app's source on 2026-10-12. When the policy changes, move
  `UPDATED` in `src/app/privacy/page.tsx`.
- `src/content/app-lines.json` lists each quoted line with the text to look for in the
  Swift source. A heading on `/` should come from this file, never from a literal.
- Sentences that restate behaviour belong in the guide, not on `/`. The home page states
  ideas, which do not go stale.

## Before launch

`src/config.ts` holds the release facts. The support address is set (support@trymatter.app,
shown on /support, in the Privacy Policy and in the footer). The site's address (`url`,
used for the sitemap, robots.txt, the blog's feed and link previews) is https://trymatter.app.
Still missing: the App Store link, and the `placeholder` words (the Notes card's heading), which
stand in for a line the app no longer says. Until the App Store link is set, the download button
says the app is coming to the App Store.

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
until its capture exists. For launch the home page has no captures at all: the "Also in Matter"
cards (week review, templates, tags, standup) were taken out until they can be shot on the Mac in
the current look, and are in the history if they come back.

The hero is a real capture of the Mac app (`public/shots/mac-tasks-light.webp`): the Tasks page
in the demo world at 9:41, with the chip at the same 2h 10m free as the headline's pill. Its
source, and `stage.sh` and `shotgo` to retake it when the app changes, are in
`~/Desktop/duka/Screenshots/hero-2026-10-12` (see its README). The link-preview image,
`src/app/opengraph-image.jpg`, is cut from the same capture.

The four cards under the hero are drawn on the page in the app's look, from the hero's moment,
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
