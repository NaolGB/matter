# Matter

The website for Matter, a local-first planner for macOS and iOS.

The app itself lives in `../workspace` (the Xcode project is still named Duka).

## Running it

```bash
npm install
npm run dev
```

Next.js 16, React 19, TypeScript, Tailwind 4.

The palette in `src/app/globals.css` is taken from the app's `DukaPalette`
(`DukaKit/Sources/AppCore/DukaPalette.swift`). The design is monochrome on
purpose: `--running` is the only hue, and it marks work that is running.
Change a colour there first, then bring it here.
