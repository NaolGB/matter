import type { Metadata } from "next";
import positioning from "@/content/positioning-lines.json";
import { guideBlocks } from "@/content/guide";
import { CalendarFeeds } from "@/components/CalendarFeeds";
import { FeatureEnd, FeatureIntro } from "@/components/FeatureCard";
import { Crop, FeatureSection, MacWindow, Pair, Phone, Row } from "@/components/FeatureSection";
import { InfoBlocks } from "@/components/InfoDoc";
import { Wrap } from "@/components/site";

/* The calendar, with Naol's two features first (2026-11-06): adding a feed, and the task list with
   the calendars in view. The section ids are the ones the features containers link to
   (FeatureGroups), so change them there too.

   Where the words come from. The sentence at the top is Naol's, from the Positioning page (`npm run
   check:lines` checks it). Every other paragraph is the User Guide's own, quoted through
   `guideBlocks`, so it changes when the guide does: a stand-in until Naol writes this page's words.
   The section headings are stand-ins too, worded after what people search for (Scout, 2026-11-06).
   Naol has no line about the calendar alone yet, so the statement is the feature's name. Do not
   polish any of it here.

   The pictures are real captures of both apps on the demo world, held at Tuesday 10 November 2026,
   9:41 (Screenshots/demo-2026-11-06). The feeds list is drawn, because the demo's feeds have
   addresses nobody should read. */

export const metadata: Metadata = {
  title: "Calendar",
  description: positioning.calendars,
};

const shots = "/shots/v2";

export default function CalendarPage() {
  return (
    <main className="flex-1">
      <FeatureIntro statement="Calendar" sentence={positioning.calendars} />

      <section className="pb-[clamp(3.5rem,8vw,6.5rem)]">
        <Wrap wide>
          <Pair
            mac={
              <MacWindow
                src={`${shots}/mac-calendar-3-days.webp`}
                alt="The Mac's Calendar over three days: meetings as tinted blocks in their calendar's colour, tasks as outlined blocks placed around them, and a red line at the present minute."
              />
            }
            phone={
              <Phone
                src={`${shots}/iphone-calendar.webp`}
                alt="The iPhone's Calendar over the same three days, with meetings in their calendar's colour and tasks around them."
              />
            }
          />
        </Wrap>
      </section>

      <FeatureSection
        id="add-a-feed"
        heading="Add the calendars you already keep"
        band
        side={
          // The list is grey, so on the grey band it stands on a white card with room round it.
          <div className="rounded-[28px] bg-base p-6 sm:p-10">
            <CalendarFeeds />
          </div>
        }
      >
        <InfoBlocks blocks={guideBlocks("calendar", "Subscribing to a feed")} />
      </FeatureSection>

      <FeatureSection
        id="tasks-with-calendars"
        heading="A task list with your calendar in it"
        side={
          <Crop
            className="mx-auto w-full max-w-[460px]"
            src={`${shots}/mac-today.webp`}
            width={1088}
            height={1396}
            caption="Today on the Mac"
            alt="Today on the Mac: a meeting from a calendar at 10:00, marked with a calendar symbol, listed among the day's tasks under the same tag."
          />
        }
      >
        <InfoBlocks blocks={guideBlocks("calendar")} />
        <InfoBlocks blocks={guideBlocks("capacity", "Events that count")} />
      </FeatureSection>

      <FeatureSection
        id="time-blocking"
        heading="Time blocking, done for you"
        band
        pictures={
          <MacWindow
            src={`${shots}/mac-calendar-week.webp`}
            alt="The Mac's Calendar over a week: past days faded, today's tasks and meetings as blocks, and the coming days' meetings and tasks already placed."
          />
        }
      >
        <InfoBlocks blocks={guideBlocks("tasks", "Scheduling a task")} />
        <InfoBlocks blocks={guideBlocks("capacity", "Auto-placement")} />
      </FeatureSection>

      <FeatureSection
        id="views"
        heading="A day, three days or a week"
        pictures={
          <Row columns="lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-center">
            <MacWindow
              src={`${shots}/mac-calendar-day.webp`}
              alt="The Mac's Calendar on one day: finished morning routines, the running task beside a meeting, and the rest of the day's tasks each given a time after it."
            />
            <Crop
              src={`${shots}/mac-event-sheet.webp`}
              width={1040}
              height={508}
              caption="A meeting, opened"
              alt="A meeting's sheet on the Mac: Larkspur weekly sync, Tuesday 10 November, 10:00 to 11:00, on Zoom, from the Kiln studio calendar, with a Start button to time it."
            />
          </Row>
        }
      >
        <InfoBlocks blocks={guideBlocks("calendar", "The Calendar page")} />
      </FeatureSection>

      <FeatureEnd next={{ label: "Others", href: "/features/others" }} guide="/support#calendar" />
    </main>
  );
}
