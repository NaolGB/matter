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
  The hero number is live: add a task and it answers the way the app's editor would.
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

Pictures are placeholder frames until real captures exist. Each one is a `<Shot>`
(`src/components/site.tsx`) whose text says what to shoot. To use a real image, put it
under `public/screenshots/` and pass `src` with its pixel size:

```tsx
<Shot label="The main window" src="/screenshots/window.png" width={2400} height={1500} />
```

## Look

The logo in `public/brand/` is cut from `../Brand/Matter` and is the only colour on the
site. Everything else is the app's ink and surfaces (`DukaPalette`), in `src/app/globals.css`.
