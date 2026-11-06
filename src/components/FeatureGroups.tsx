import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import lines from "@/content/app-lines.json";
import positioning from "@/content/positioning-lines.json";
import { CalendarFeeds } from "@/components/CalendarFeeds";
import { NoteSlash } from "@/components/NoteSlash";
import { CardArrow } from "@/components/site";

/* The features, as Naol laid them out on 2026-11-06: three containers, Tasks across the top and
   Notes and Calendar under it, each holding several features, and then the others in a grid of
   their own. The home page and /features both show this. Every picture opens its part of the
   feature's page (/features/tasks, /notes, /calendar, /others).

   The words. Each container's sentence is Naol's, word for word from Scout's Positioning page
   (`npm run check:lines` checks them). The names on the pictures are Naol's names for the features
   from the same day, except the two that are lines the app says (app-lines.json). The app calls some
   of them something else: the pin opens the notebook, analysis is the Week review, the journal is
   Standup, and it has no button called reshuffle (it is the app placing tasks by itself). Naming
   them is Naol's to settle. Do not write new sentences here.

   The pictures are parts of real captures of both apps on the demo world, held at Tuesday
   10 November 2026, 9:41 (Screenshots/demo-2026-11-06, whose site.py cuts them). The slash menu and
   the feeds list are drawn, for the reasons their own files give. */

const shots = "/shots/v2";

/**
 * Part of a capture, on the grey ground of its tile. `show` is the width it is drawn at, in
 * pixels: the size it has in the app, so its words stay readable, or a little under.
 *
 * `left` stands it in the top left corner and lets it run off the right and the foot: for a part
 * wider than its tile. `center` stands it in the middle and lets it run off the foot only. `whole`
 * shows all of it, in the middle of the tile: for a part small enough to fit. On a phone that would
 * shrink a wide part until its words can't be read, so with `run` it keeps its size there and runs
 * off the right instead.
 */
function Cut({
  src,
  width,
  height,
  show,
  alt,
  place = "left",
  run = false,
}: {
  src: string;
  width: number;
  height: number;
  show: number;
  alt: string;
  place?: "left" | "center" | "whole";
  run?: boolean;
}) {
  const corners = {
    left: "max-w-none rounded-tl-[12px]",
    center: "max-w-full rounded-t-[12px]",
    whole: run ? "rounded-[12px] max-sm:max-w-none max-sm:rounded-r-none sm:max-w-full" : "max-w-full rounded-[12px]",
  };
  const image = (
    <Image
      src={`${shots}/${src}.webp`}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      style={{ width: show }}
      className={`h-auto bg-base ring-1 ring-hairline ${corners[place]}`}
    />
  );
  if (place === "left") return <div className="pl-5 pt-5">{image}</div>;
  if (place === "center") return <div className="flex justify-center px-5 pt-5">{image}</div>;
  return (
    <div className={`flex h-full items-center p-5 ${run ? "max-sm:pr-0 sm:justify-center" : "justify-center"}`}>{image}</div>
  );
}

type Tile = {
  name: string;
  href: string;
  picture: ReactNode;
  /** The room the picture gets: a height, or a least height where the tile stretches. */
  room: string;
  /** Its share of the container's grid. */
  span?: string;
};

function TileLink({ tile }: { tile: Tile }) {
  return (
    <Link href={tile.href} className={`group/tile flex min-w-0 flex-col ${tile.span ?? ""}`}>
      {/* The picture is out of the flow, so a tile is as tall as its room says and a tall capture
          cannot stretch the container. `grow`, not `flex-1`: with a basis of nothing the room's own
          height is ignored and the picture's box closes up on a phone. */}
      <div className={`relative shrink-0 grow overflow-hidden rounded-[18px] bg-track ${tile.room}`}>
        <div className="absolute inset-0">{tile.picture}</div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[15px] font-medium leading-snug">
        {tile.name}
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className="size-3.5 shrink-0 text-ink-muted transition-transform group-hover/tile:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 3.5 10.5 8 6 12.5" />
        </svg>
      </p>
    </Link>
  );
}

/** One container: its name, which opens the feature's page, Naol's sentence, and its tiles. */
function Group({
  name,
  body,
  href,
  span,
  grid,
  tiles,
}: {
  name: string;
  body: string;
  href: string;
  span: string;
  /** How the tiles are laid out inside. */
  grid: string;
  tiles: Tile[];
}) {
  return (
    <div className={`rise flex flex-col rounded-[28px] bg-base p-6 sm:p-8 ${span}`}>
      <Link href={href} className="group flex items-start justify-between gap-4">
        <h3 className="text-[clamp(1.5rem,2.6vw,1.9rem)] font-semibold leading-[1.1] tracking-[-0.03em]">{name}</h3>
        <CardArrow />
      </Link>
      <p className="mt-3 max-w-[64ch] text-[1rem] leading-relaxed text-ink-muted">{body}</p>
      <div className={`mt-7 grid flex-1 gap-x-4 gap-y-6 ${grid}`}>
        {tiles.map((tile) => (
          <TileLink key={tile.name} tile={tile} />
        ))}
      </div>
    </div>
  );
}

const tasks: Tile[] = [
  {
    name: lines.gate.text,
    href: "/features/tasks#doesnt-fit-today",
    span: "sm:col-span-3",
    room: "h-[230px] sm:h-[262px]",
    picture: (
      <Cut
        place="whole"
        run
        src="mac-new-task-refused"
        width={1040}
        height={474}
        show={520}
        alt="The Mac's New task sheet with a three hour task. In orange: Doesn't fit today, only 2h 10m of headroom left. Move it, or shorten it."
      />
    ),
  },
  {
    name: "Reshuffle",
    href: "/features/tasks#reshuffle",
    span: "sm:col-span-3",
    room: "h-[230px] sm:h-[262px]",
    picture: (
      <Cut
        src="tile-placed"
        width={1360}
        height={936}
        show={680}
        alt="A day on the Mac's Calendar: a meeting at 10:00 in its calendar's colour, and the day's tasks each placed in the time left after it."
      />
    ),
  },
  {
    name: "Recurring",
    href: "/features/tasks#recurring",
    span: "sm:col-span-2",
    room: "h-[220px]",
    picture: (
      <Cut
        src="tile-recurring"
        width={700}
        height={680}
        show={350}
        alt="Tomorrow on the Mac: a meeting, then the routines that will arrive that day, drawn faintly: Morning pages, Check the Larkspur channel, Triage the research inbox."
      />
    ),
  },
  {
    name: "Capacity and time blocking",
    href: "/features/tasks#capacity-and-time-blocking",
    span: "sm:col-span-2",
    room: "h-[220px]",
    picture: (
      <Cut
        place="center"
        src="tile-capacity"
        width={1035}
        height={950}
        show={345}
        alt="The coming days on the iPhone, each with the time planned and what is left: tomorrow 15 minutes free, Thursday 10 minutes over, Saturday 4h 10m free."
      />
    ),
  },
  {
    name: "Sessions",
    href: "/features/tasks#sessions",
    span: "sm:col-span-2",
    room: "h-[220px]",
    picture: (
      <Cut
        place="whole"
        src="tile-session"
        width={576}
        height={284}
        show={320}
        alt="The foot of the Mac's sidebar: 2h 10m free, and Write the Mosaic pitch story running, with its clock, when it started, its estimate, Pause and Complete."
      />
    ),
  },
];

const notes: Tile[] = [
  {
    name: "Block types",
    href: "/features/notes#block-types",
    span: "sm:row-span-2",
    room: "min-h-[320px]",
    picture: (
      // The menu is the point, so the note stands on the tile's foot and loses its top instead,
      // which fades out so no line of it is cut in half.
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,#000_56px)]">
        <div className="absolute inset-x-5 bottom-0">
          <NoteSlash />
        </div>
      </div>
    ),
  },
  {
    name: "Tokens",
    href: "/features/notes#tokens",
    room: "min-h-[170px]",
    picture: (
      <Cut
        src="tile-tokens"
        width={1158}
        height={410}
        show={350}
        alt="A note on the iPhone with a date set into its sentence as a chip, Thursday, and a link to another note, Recruiting tracker."
      />
    ),
  },
  {
    name: "Inline formatting",
    href: "/features/notes#inline-formatting",
    room: "min-h-[170px]",
    picture: (
      <Cut
        src="tile-formatting"
        width={1040}
        height={310}
        show={520}
        alt="Lines of a note on the Mac: one highlighted in yellow, one with a phrase struck through, and a link to another note."
      />
    ),
  },
];

const calendar: Tile[] = [
  {
    name: lines.calendar.text,
    href: "/features/calendar#add-a-feed",
    room: "min-h-[150px]",
    picture: (
      <div className="flex h-full items-center justify-center px-2 py-4">
        <CalendarFeeds />
      </div>
    ),
  },
  {
    name: "Task list with calendars",
    href: "/features/calendar#tasks-with-calendars",
    room: "min-h-[230px]",
    picture: (
      <Cut
        src="tile-calendar"
        width={1556}
        height={910}
        show={620}
        alt="Three days on the Mac's Calendar: meetings as tinted blocks in their calendar's colour, tasks as outlined blocks placed around them, and a red line at the present minute."
      />
    ),
  },
];

type Other = {
  name: string;
  href: string;
  body?: string;
  picture: ReactNode;
  span: string;
};

/**
 * A capture standing on the foot of one of the others' cards and running off it. `whole` is for a
 * part too short to reach the foot: it is shown entire, in the middle of the room.
 */
function Stand({
  src,
  width,
  height,
  show,
  alt,
  whole = false,
  run = false,
}: {
  src: string;
  width: number;
  height: number;
  show: number;
  alt: string;
  whole?: boolean;
  /** On a phone, keep its size and run off the right, so its words stay readable. */
  run?: boolean;
}) {
  const image = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      unoptimized
      style={{ width: show }}
      className={`mx-auto h-auto ring-1 ring-hairline ${run ? "max-sm:max-w-none sm:max-w-full" : "max-w-full"} ${
        whole ? "rounded-[14px]" : "rounded-t-[14px]"
      } ${run ? "max-sm:rounded-r-none" : ""}`}
    />
  );
  // A pixel of room all round, so the hairline is not cut by the card's edge.
  return <div className={`p-px ${whole ? "flex h-full items-center" : ""} ${run ? "max-sm:pr-0" : ""}`}>{image}</div>;
}

const others: Other[] = [
  {
    name: "Pin",
    href: "/features/others#pin",
    span: "md:col-span-2",
    picture: (
      <Stand
        whole
        run
        src={`${shots}/tile-notebook.webp`}
        width={920}
        height={280}
        show={460}
        alt="The notebook on the Mac, opened beside the page from the pin: three loose lines and a to-do."
      />
    ),
  },
  {
    name: "Analysis",
    href: "/features/others#analysis",
    span: "md:col-span-2",
    picture: (
      <Stand
        src={`${shots}/tile-week.webp`}
        width={1146}
        height={918}
        show={382}
        alt="The Week review on the iPhone: 7h 24m of a 12 hour focus budget, and where the time went, day by day."
      />
    ),
  },
  {
    name: "Loafy",
    href: "/features/others#loafy",
    span: "md:col-span-2",
    picture: (
      <Image
        src="/shots/loafy-house-light.webp"
        alt={`${lines.loafyHome.text}: a bedroom in the roof and a kitchen under it, with Loafy napping in the mixing bowl on the counter.`}
        width={1024}
        height={1536}
        unoptimized
        className="mx-auto h-auto w-[210px] max-w-full rounded-t-[18px]"
      />
    ),
  },
  {
    name: "Journal",
    href: "/features/others#journal",
    body: positioning.daily,
    span: "md:col-span-3",
    picture: (
      <Stand
        run
        src={`${shots}/tile-journal.webp`}
        width={1126}
        height={704}
        show={563}
        alt="A day's page on the Mac, Friday 6 November, under four prompts: what happened, to do today, how I am, and something I noticed."
      />
    ),
  },
  {
    name: "Templates",
    href: "/features/others#templates",
    span: "md:col-span-3",
    picture: (
      <Stand
        run
        src={`${shots}/tile-templates.webp`}
        width={1284}
        height={1260}
        show={563}
        alt="The Mac's Templates panel: weekly templates, each with its estimate, its days and its tag, and a row of squares for the days of this week it has filled."
      />
    ),
  },
];

function OtherCard({ other }: { other: Other }) {
  return (
    <Link href={other.href} className={`group rise flex flex-col overflow-hidden rounded-[28px] bg-base ${other.span}`}>
      <div className="flex items-start justify-between gap-4 p-6 pb-0 sm:p-8 sm:pb-0">
        <div>
          <h4 className="text-[clamp(1.25rem,2vw,1.45rem)] font-semibold leading-[1.15] tracking-[-0.025em]">
            {other.name}
          </h4>
          {other.body && <p className="mt-3 max-w-[52ch] text-[1rem] leading-relaxed text-ink-muted">{other.body}</p>}
        </div>
        <CardArrow />
      </div>
      {/* The picture takes whatever room the words leave, so cards in one row end level. */}
      <div className="relative mx-6 mt-7 min-h-[220px] shrink-0 grow overflow-hidden sm:mx-8">
        <div className="absolute inset-0">{other.picture}</div>
      </div>
    </Link>
  );
}

/** The three containers and the others' grid, for the grey band of the home page and /features. */
export function FeatureGroups() {
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-12">
        <Group
          name="Tasks"
          body={positioning.tasks}
          href="/features/tasks"
          span="lg:col-span-12"
          grid="sm:grid-cols-6"
          tiles={tasks}
        />
        <Group
          name="Notes"
          body={positioning.notes}
          href="/features/notes"
          span="lg:col-span-7"
          grid="sm:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] sm:grid-rows-2"
          tiles={notes}
        />
        <Group
          name="Calendar"
          body={positioning.calendars}
          href="/features/calendar"
          span="lg:col-span-5"
          grid="sm:grid-rows-[auto_minmax(0,1fr)]"
          tiles={calendar}
        />
      </div>

      <div className="mt-[clamp(2.5rem,5vw,4rem)]">
        <Link href="/features/others" className="group mb-5 inline-flex items-center gap-3">
          <h3 className="text-[clamp(1.5rem,2.6vw,1.9rem)] font-semibold leading-[1.1] tracking-[-0.03em]">Others</h3>
          <CardArrow />
        </Link>
        <div className="grid gap-4 md:grid-cols-6">
          {others.map((other) => (
            <OtherCard key={other.name} other={other} />
          ))}
        </div>
      </div>
    </>
  );
}
