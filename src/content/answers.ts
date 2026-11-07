import { site } from "@/config";

/* The short answers on /support. Feature pages that have no guide section to quote use them too
   (<Answer> in mdx-components.tsx), so the two can't disagree. */

export const answers = {
  offline: {
    question: "Does Matter work offline?",
    answer:
      "Yes, completely. Tasks, notes, the daily log and the calendar you have already fetched all work with no connection. Two things use the network when it is there: iCloud, to keep your Mac and iPhone in step, and the calendar feeds you subscribe to.",
  },
  data: {
    question: "Where is my data kept?",
    answer:
      "On your devices. Matter has no account system and no server of ours. Your Mac and iPhone keep in step through your private iCloud database, and nothing is sent to us.",
  },
  sync: {
    question: "Does Matter sync between my Mac and iPhone?",
    answer:
      "Yes, through your own private iCloud database, when each device is signed in to the same iCloud account. On the Mac, Settings ▸ General shows when iCloud last synced, and the reason if it did not.",
  },
  calendar: {
    question: "How do I bring my calendar in?",
    answer:
      "Matter reads calendars as iCal feeds. In Settings ▸ Calendars, choose Add a feed and paste the link your calendar provider gives you: a read-only iCal link. On the Mac, if it starts with webcal, change that to https. It has to be the feed itself, not the address of the calendar’s web page. Matter only reads the feed and never writes back.",
  },
  iphone: {
    question: "Do I need a Mac to use the iPhone app?",
    answer: "No. Matter for iPhone works on its own. With both, they share one plan through your iCloud.",
  },
  needs: {
    question: "What does Matter need?",
    answer: `A Mac with ${site.macRequirement} or later, or an iPhone with ${site.iphoneRequirement} or later.`,
  },
};

export type AnswerId = keyof typeof answers;
