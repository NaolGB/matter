# Matter

The product website for Matter, a planner for macOS and iOS. The app itself lives in
`../workspace` (the Xcode project is still named Duka).

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

The app's About view links to `/support` and `/privacy` (`DukaLinks` in `AboutView.swift`,
still on a placeholder domain), and the App Store listing needs both URLs.

## Keeping it true to the app

The app changes daily, so nothing here is retyped from it.

```bash
npm run sync:guide    # rebuild the guide and the policy from InfoDocuments.swift
npm run check:lines   # fail if a line the home page quotes has left the app
```

Both expect the app at `../workspace/Duka`; set `MATTER_APP_DIR` to point elsewhere.

- `src/content/guide.generated.json` is written by `sync:guide`. Do not edit it by hand.
- `src/content/app-lines.json` lists each quoted line with the text to look for in the
  Swift source. A heading on `/` should come from this file, never from a literal.
- Sentences that restate behaviour belong in the guide, not on `/`. The home page states
  ideas, which do not go stale.

## Before launch

`src/config.ts` holds the two things still missing: the support address and the App Store
link. Until they are set, `/support` says an address is coming and the store buttons read
"Coming to the App Store".

## Screenshots

The pictures are real captures of the app running its demo world, in `public/shots`. They are
WebP at twice the size they are shown and are served as they are (`unoptimized`), so the site
needs no image resizer at run time.

```tsx
<Shot label="The Mac app" src="/shots/mac-tasks-light.webp" width={1680} height={1050} />
```

The site is always light, so it uses the light captures only. Dark ones of every shot exist in
the folder below if that ever changes.

A `<Shot>` with no `src` draws a soft frame saying what to shoot, which is how a new slot looks
until its capture exists.

The four cards under the tagline are not screenshots. Their pictures are drawn on the page in
the app's own look (`EditorRefusal`, `SessionDrop`, `CalendarDays`, `NoteSlash` in
`src/components`), with the demo world's tasks and the app's own words from `app-lines.json`.
When the app's look changes, compare them with a fresh capture.

Loafy's house at the end of the page is not a capture either. It is drawn by the app's own
painter at full width, with Loafy left out (`tools/loaf-render` in the folder below), and saved as
`public/shots/loafy-house-light.webp`. `LoafyHome` draws her over it: when the house comes into
view she climbs down the page's ladder, hops off onto the kitchen floor, walks to the counter and
hops into the mixing bowl to nap.

The full-size originals, the App Store set and the tools that made them are in
`~/Desktop/duka/Screenshots/app-store` (see its README). `tools/process.py` there writes
`public/shots`; rerun it after reshooting rather than editing the files by hand.

## Look

The mark in `public/brand/mark.png` is the app's own icon artwork (`Duka.icon`), used as a mask
so it is drawn in ink on any ground. `src/app/icon.png` and `apple-icon.png` are that mark on
white, as the app icon is. The site is in ink throughout: white, one soft grey for bands, and
three steps of text grey, in `src/app/globals.css`. Surfaces are told apart by fill, not outline.
