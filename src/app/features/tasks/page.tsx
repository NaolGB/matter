import type { Metadata } from "next";
import Link from "next/link";
import positioning from "@/content/positioning-lines.json";
import { guideBlock, guideBlocks } from "@/content/guide";
import { FeatureEnd, FeatureIntro } from "@/components/FeatureCard";
import { Crop, FeatureSection, MacWindow, Pair, Phone, Row } from "@/components/FeatureSection";
import { InfoBlocks } from "@/components/InfoDoc";
import { SessionDrop } from "@/components/SessionDrop";
import { Wrap } from "@/components/site";
import { TryDay } from "@/components/TryDay";

/* Tasks, in the order Naol gave its features on 2026-11-06: what doesn't fit today, the reshuffle,
   recurring tasks, capacity and time blocking, sessions. The section ids are the ones the features
   containers link to (FeatureGroups), so change them there too.

   Where the words come from. The statement, the sentence under it and the first paragraph of the
   capacity section are Naol's, from the Positioning page (`npm run check:lines` checks them). Every
   other paragraph is the User Guide's own, quoted through `guideBlocks` and `guideBlock`, so it
   changes when the guide does: a stand-in until Naol writes this page's words. The section headings
   are stand-ins too, worded after what people search for (Scout, 2026-11-06). Do not polish any of
   it here.

   The app has no button called reshuffle: that section is the app placing tasks by itself, which is
   what moves them when the day changes.

   The pictures are real captures of both apps on the demo world, held at Tuesday 10 November 2026,
   9:41 (Screenshots/demo-2026-11-06). The drag onto the work bucket is drawn, because a capture
   cannot hold a drag in progress. Dragging is the Mac's way in; the iPhone has the same bucket and
   starts work from a task's Start action. */

export const metadata: Metadata = {
  title: "Tasks and daily planning",
  description: positioning.planAround,
};

const shots = "/shots/v2";

export default function TasksPage() {
  return (
    <main className="flex-1">
      <FeatureIntro statement={positioning.fitsLife} sentence={positioning.planAround} />

      <section className="pb-[clamp(3.5rem,8vw,6.5rem)]">
        <Wrap wide>
          <Pair
            mac={
              <MacWindow
                src={`${shots}/mac-tasks.webp`}
                alt="Matter on the Mac at 9:41 on a Tuesday. The sidebar reads 2h 10m free, with Write the Mosaic pitch story running. Today lists meetings and tasks under their tags, each with a time and an estimate, and Upcoming lists tomorrow's."
              />
            }
            phone={
              <Phone
                src={`${shots}/iphone-tasks.webp`}
                alt="Matter on the iPhone at the same moment: the running task with its clock and 2h 10m free at the top, and today's tasks under their tags."
              />
            }
          />
        </Wrap>
      </section>

      <FeatureSection
        id="doesnt-fit-today"
        heading="When something doesn't fit"
        band
        pictures={
          <Row columns="sm:grid-cols-2">
            <Crop
              src={`${shots}/mac-new-task-refused.webp`}
              width={1040}
              height={474}
              caption="A three hour task on a day with 2h 10m left"
              alt="The Mac's New task sheet with a three hour task. In orange: Doesn't fit today, only 2h 10m of headroom left. Move it, or shorten it. Under it, a button to move it to Saturday."
            />
            <Crop
              src={`${shots}/mac-day-settings.webp`}
              width={1232}
              height={476}
              caption="The day's settings"
              alt="Matter's day settings on the Mac: start of day 08:00, end of day 18:30, focus cap 6 hours, and Refuse work that doesn't fit turned on."
            />
          </Row>
        }
      >
        <InfoBlocks blocks={guideBlocks("capacity")} />
        <InfoBlocks blocks={guideBlocks("capacity", "The today gate")} />
        <InfoBlocks blocks={guideBlocks("capacity", "Your day's shape")} />
      </FeatureSection>

      <FeatureSection
        id="reshuffle"
        heading="A daily schedule that makes itself"
        side={
          // The same day twice: as the Mac lists it, each task with the time it was given, and as
          // the iPhone's calendar draws it.
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-center">
            <Crop
              className="w-full sm:w-[66%]"
              src={`${shots}/mac-today.webp`}
              width={1088}
              height={1396}
              caption="Mac"
              alt="Today on the Mac: a meeting at 10:00, then each task under its tag with the time it was given, 11:00, 11:45, 12:15, 12:30 and 12:45, and one pinned at 16:30."
            />
            <div className="w-[64%] sm:w-[30%]">
              <Phone
                src={`${shots}/iphone-calendar.webp`}
                alt="The iPhone's Calendar over three days, with meetings in their calendar's colour and the same tasks placed around them."
              />
            </div>
          </div>
        }
      >
        <InfoBlocks blocks={guideBlocks("tasks", "Scheduling a task")} />
        <InfoBlocks blocks={guideBlocks("capacity", "Auto-placement")} />
      </FeatureSection>

      <FeatureSection
        id="recurring"
        heading="Routines that arrive on their day"
        band
        pictures={
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-end sm:justify-center sm:gap-12">
            <Crop
              className="w-full sm:w-[440px]"
              src={`${shots}/mac-upcoming.webp`}
              width={1120}
              height={1700}
              caption="Mac"
              alt="The Mac's Upcoming column: tomorrow has 5h 45m planned and 15m free. Meetings and tasks come first, then the routines that will arrive that day, drawn faintly."
            />
            <div className="w-[62%] sm:w-[300px]">
              <Phone
                src={`${shots}/iphone-upcoming.webp`}
                alt="Upcoming on the iPhone: each coming day with its planned time and what is free, and Thursday marked 10 minutes over."
              />
            </div>
          </div>
        }
      >
        <InfoBlocks blocks={guideBlocks("templates")} />
        <p>
          <Link href="/features/others#templates" className="font-medium text-ink underline-offset-4 hover:underline">
            More about templates
          </Link>
        </p>
      </FeatureSection>

      <FeatureSection
        id="capacity-and-time-blocking"
        heading="A daily planner that knows the day's size"
        side={
          <div className="rounded-[28px] bg-base p-8 ring-1 ring-hairline sm:p-10">
            <TryDay />
          </div>
        }
        pictures={
          <MacWindow
            src={`${shots}/mac-calendar-3-days.webp`}
            alt="The Mac's Calendar over three days: meetings as tinted blocks in their calendar's colour, tasks as outlined blocks placed around them, and a red line at the present minute."
          />
        }
      >
        <p>{positioning.tasks}</p>
        <InfoBlocks blocks={guideBlocks("capacity", "The capacity reading")} />
        <InfoBlocks blocks={guideBlocks("capacity", "Events that count")} />
        <p>
          <Link href="/features/calendar" className="font-medium text-ink underline-offset-4 hover:underline">
            More about the calendar
          </Link>
        </p>
      </FeatureSection>

      <FeatureSection
        id="sessions"
        heading="A work timer on the task itself"
        band
        side={
          // The picture stands at the foot of a white card and runs off it.
          <div className="overflow-hidden rounded-[28px] bg-base px-8 pt-8">
            <div className="flex items-end lg:h-[360px]">
              <SessionDrop />
            </div>
          </div>
        }
      >
        <InfoBlocks blocks={guideBlocks("tasks", "Tracking time")} />
      </FeatureSection>

      <FeatureSection
        id="time-a-meeting"
        heading="Time a meeting too"
        side={
          <Crop
            className="mx-auto w-full max-w-[520px]"
            src={`${shots}/mac-event-sheet.webp`}
            width={1040}
            height={508}
            caption="A meeting, opened on the Mac"
            alt="A meeting's sheet on the Mac: Larkspur weekly sync, Tuesday 10 November, 10:00 to 11:00, on Zoom, with a Start button beside Done."
          />
        }
      >
        <InfoBlocks blocks={guideBlock("calendar", "The Calendar page", "You can start a work session")} />
      </FeatureSection>

      <FeatureEnd next={{ label: "Notes", href: "/features/notes" }} guide="/support#tasks" />
    </main>
  );
}
