# Matter

The product website for Matter, a local-first planner for macOS and iOS. The
app itself lives in `../workspace` (the Xcode project is still named Duka).

## Running it

```bash
npm install
npm run dev
```

Next.js 16, React 19, TypeScript, Tailwind 4. No client JavaScript of our own:
the pages are server components and the reveal animation is CSS.

## Pages

- `/` the product page. Every section describes what the Mac app does as
  implemented; the copy was written from the code, not the other way round.
- `/guide` the User Guide, transcribed from the app's
  `Duka/Settings/InfoDocuments.swift`. Keep the two in step.
- `/privacy` the Privacy Policy, from the same file. The app's About view links
  to hosted copies of both (`DukaLinks` in `AboutView.swift`, still placeholder
  URLs).

## Screenshots

The product page uses placeholder frames until real captures exist. Each one is
a `<Shot>` (`src/components/site.tsx`) whose `capture` text says what to shoot.
To use a real image, put it under `public/screenshots/` and pass `src` with its
pixel size:

```tsx
<Shot label="The Tasks board" src="/screenshots/board.png" width={2400} height={1500} />
```

## Palette

`src/app/globals.css` is the app's `DukaPalette`
(`DukaKit/Sources/AppCore/DukaPalette.swift`) converted to hex. The design is
monochrome on purpose: `--running` is the only hue the app allows itself, for
work that is running, and `--free` and `--over` are the system green and orange
the capacity chip uses. Change a colour there first, then bring it here.
