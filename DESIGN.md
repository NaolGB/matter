# How the website looks

The site follows the app. The app's own rules are in `../workspace/Duka/DESIGN.md`, `MAC.md` and
`LOAFY.md`; this file holds only what the site adds. Read it before changing how anything looks.

## Symbols

Every symbol on the site is the app's own, from `sf-symbols-lib` (SF Symbols 7 as React
components), in the `monochrome` variant, through `src/components/symbols.tsx`, which re-exports
the ones the site uses one file at a time, so only those are bundled:

```tsx
import { SFCalendar } from "@/components/symbols";
<SFCalendar aria-hidden className="size-4" />
```

`symbols.tsx` is a client module because the package's components read a React context, which a
server component cannot evaluate; through it they render from server components as any client
component does. A new symbol is added there first.

- Use the symbol the app uses, under the same name: `systemImage: "arrow.turn.down.right"` in
  Swift is `SFArrowTurnDownRight` here. Find the app's name in its source first (`grep -rn
  'systemImage: "' ../workspace/Duka/Duka`), then the component. Do not pick a symbol that only
  looks right.
- Size it with CSS (`className="size-4"`, or a `style` width and height in a drawn picture's
  points), never with the package's size presets, so it scales with what it sits in. Colour comes
  from `currentColor`.
- Never draw a symbol by hand (an `<svg>` with a path) where the app has one. The one hand-drawn
  shape left is the pointer in `SessionDrop`, which is a pointer, not a symbol.
- The package's MIT licence covers its code. The shapes are Apple's SF Symbols, which Apple's own
  terms keep to apps on Apple platforms; using them on the web is Naol's call (2026-11-07).

## Pictures

- A whole screen is a real capture of the app on the demo world, shown on a device drawn in CSS
  (`Device.tsx`), in the device's own shape.
- Part of a screen is a cut-out on a card, in one of three shapes, 2:1, 4:3 or 3:4, which the
  picture fills edge to edge (`Crop` on the pages, `Fill` in the features containers). The README
  lists every slot and the size to make its shot.
- A picture is drawn on the page only where a capture cannot hold it: a drag in progress, a menu
  the app pops natively, data nobody should read, or something that must be live. A drawn picture
  is measured against a capture and built from the app's own views, in points (`sheet.tsx`).

## Words

The site writes no marketing sentences of its own. Naol's lines come from Scout's Positioning page
through `src/content/positioning-lines.json`, and the app's lines through
`src/content/app-lines.json`. `npm run check:lines` holds the site to both.

The exception is the how-to text on a feature page (`src/content/features`), which is written from
the app's source as a draft for Naol to edit (Naol, 2026-11-07). It is plain instructions: what the
feature does, how to use it, and its rules. It uses Naol's feature names, even where the app says
otherwise (Pin board for the notebook, Analysis for the Week review, Journal for Standup). One page
per feature, with labelled Mac and iPhone parts only where they differ. Marketing lines stay
Naol's, and a behaviour is checked in the Swift source before it is written down.

## Colour and type

The site is always light, in ink: white, one soft grey for bands (`bg-track`), three steps of text
grey, and colour only where it means something (the app's orange for a refusal, the green of the
free-time chip). Tokens are in `src/app/globals.css`. Surfaces are told apart by fill, not outline.
Apple hardware gets SF from the system font stack; Inter is the fallback for everyone else.
