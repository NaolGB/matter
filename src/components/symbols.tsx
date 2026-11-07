"use client";

/* The app's symbols the site uses, from sf-symbols-lib (SF Symbols 7 as React components), one
   file each so only these are bundled. They are re-exported from a client module because the
   package's components read a React context, which a server component cannot evaluate; a server
   component imports them from here and renders them as it would any client component. Add a
   symbol here, named as the app names it (see DESIGN.md). */

export { SFArrowRight } from "sf-symbols-lib/monochrome/SFArrowRight";
export { SFArrowTurnDownRight } from "sf-symbols-lib/monochrome/SFArrowTurnDownRight";
export { SFBookPages } from "sf-symbols-lib/monochrome/SFBookPages";
export { SFCalendar } from "sf-symbols-lib/monochrome/SFCalendar";
export { SFCalendarBadgePlus } from "sf-symbols-lib/monochrome/SFCalendarBadgePlus";
export { SFCheckmark } from "sf-symbols-lib/monochrome/SFCheckmark";
export { SFChevronDown } from "sf-symbols-lib/monochrome/SFChevronDown";
export { SFChevronRight } from "sf-symbols-lib/monochrome/SFChevronRight";
export { SFClock } from "sf-symbols-lib/monochrome/SFClock";
export { SFCrossCase } from "sf-symbols-lib/monochrome/SFCrossCase";
export { SFDocumentOnDocument } from "sf-symbols-lib/monochrome/SFDocumentOnDocument";
export { SFEye } from "sf-symbols-lib/monochrome/SFEye";
export { SFGearshape } from "sf-symbols-lib/monochrome/SFGearshape";
export { SFHourglass } from "sf-symbols-lib/monochrome/SFHourglass";
export { SFIphone } from "sf-symbols-lib/monochrome/SFIphone";
export { SFLaptopcomputer } from "sf-symbols-lib/monochrome/SFLaptopcomputer";
export { SFPauseFill } from "sf-symbols-lib/monochrome/SFPauseFill";
export { SFPlus } from "sf-symbols-lib/monochrome/SFPlus";
export { SFRepeat } from "sf-symbols-lib/monochrome/SFRepeat";
export { SFTag } from "sf-symbols-lib/monochrome/SFTag";
export { SFTimelapse } from "sf-symbols-lib/monochrome/SFTimelapse";
export { SFTimer } from "sf-symbols-lib/monochrome/SFTimer";
export { SFWrenchAndScrewdriver } from "sf-symbols-lib/monochrome/SFWrenchAndScrewdriver";
export { SFXmark } from "sf-symbols-lib/monochrome/SFXmark";
