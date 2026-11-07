import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import lines from "@/content/app-lines.json";
import positioning from "@/content/positioning-lines.json";
import { getFeaturePage } from "@/content/feature-pages";
import { FeedRows } from "@/components/FeedRows";
import { InlineFormats } from "@/components/InlineFormats";
import { InlineTokens } from "@/components/InlineTokens";
import { SlashLines } from "@/components/SlashLines";
import { TodayMix } from "@/components/TodayMix";
import { NewTaskSheet } from "@/components/NewTaskSheet";
import { RepeatPicker } from "@/components/RepeatPicker";
import { SessionCard } from "@/components/SessionCard";
import { UpcomingDays } from "@/components/UpcomingDays";
import { CardArrow } from "@/components/site";
import { SFChevronRight } from "@/components/symbols";

/* The features, as Naol laid them out on 2026-11-06: three containers, Tasks across the top and
   Notes and Calendar under it, two to one in width (Naol, 2026-11-07), each holding several features, and then the others in a grid of
   their own, four bare tiles in one row and a fifth, More, that opens the list of everything
   (Naol, 2026-11-07: Templates dropped from them, no card round each), on the home page under
   #features, as a highlight; the bar's Features link opens
   /features, which lists everything. Every picture opens that feature's page, and a container's
   name opens its group on /features. The focus is tasks (Naol,
   2026-11-07), and the five in that container are Naol's list of that day: add task, capacity
   limit, recurring, upcoming capacity, sessions. Add task and Avoid overplanning are drawn
   (NewTaskSheet, plain and refused) and so are Recurring (RepeatPicker, the days being chosen)
   Upcoming capacity (UpcomingDays, the coming days with their room) and Sessions (SessionCard, the
   running task in the bucket), as a try, until they are shot.

   The words. Each container's sentence is Naol's, word for word from Scout's Positioning page
   (`npm run check:lines` checks them). The names on the pictures are Naol's names for the features
   from those days (Blocks, Mentions and Formatting since 2026-11-07 evening), except the two that
   are lines the app says (app-lines.json). The app calls some
   of them something else: the pin opens the notebook, analysis is the Week review and the journal
   is Standup. Naming them is Naol's to settle. Do not write new sentences here.

   The pictures. Every shot slot holds one of three shapes, 2:1, 4:3 or 3:4, at every width, and the
   shot fills it edge to edge (Naol, 2026-11-07: the shots will be made by hand, so a small set of
   shapes). The README lists the slots and the sizes to make. For now the slots hold parts of the
   2026-11-06 captures (Screenshots/demo-2026-11-06, whose site.py cuts them), cropped to the shape.
   The slash menu (SlashLines), the tokens (InlineTokens), the formats (InlineFormats), the feeds
   (FeedRows), Today with a meeting in it (TodayMix) and the New task sheet are drawn, for the
   reasons their own files give. */

/** The three shapes a slot can have. */
type Ratio = "2/1" | "4/3" | "3/4";
const RATIO: Record<Ratio, string> = {
  "2/1": "aspect-[2/1]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
};

/**
 * A shot filling its slot. `at` is the part kept when the picture is not the slot's shape: the top
 * left by default, so a window's words stay in view.
 */
function Fill({
  src,
  alt,
  at = "object-left-top",
}: {
  src: string;
  alt: string;
  at?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      unoptimized
      className={`object-cover ${at}`}
    />
  );
}

/** A tile that says its feature in words rather than a picture: the first sentence of its page. */
function Words({ children }: { children: string }) {
  return (
    <p className="flex h-full items-start p-5 text-[15px] leading-[1.45] text-ink">
      {children}
    </p>
  );
}

/** The first sentence of a summary, up to its full stop. */
function firstSentence(text: string) {
  const end = text.search(/[.!?](\s|$)/);
  return end === -1 ? text : text.slice(0, end + 1);
}

type Tile = {
  name: string;
  href: string;
  picture: ReactNode;
  ratio: Ratio;
  /** Its share of the container's grid. */
  span?: string;
  /** A drawn picture may take more room than its shape when the grid gives it; a shot never does. */
  stretch?: boolean;
  /** The picture's ground: grey in a white container, plain white on the grey band. */
  ground?: string;
};

function TileLink({ tile }: { tile: Tile }) {
  return (
    <Link
      href={tile.href}
      className={`group/tile flex min-w-0 flex-col ${tile.span ?? ""}`}
    >
      <div
        className={`relative overflow-hidden rounded-[18px] ${tile.ground ?? "bg-track"} ${RATIO[tile.ratio]} ${tile.stretch ? "grow" : ""}`}
      >
        <div className="absolute inset-0">{tile.picture}</div>
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[15px] font-medium leading-snug">
        {tile.name}
        <SFChevronRight
          aria-hidden
          className="size-3.5 shrink-0 text-ink-muted transition-transform group-hover/tile:translate-x-0.5"
        />
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
    <div
      className={`rise flex flex-col rounded-[28px] bg-base p-6 sm:p-8 ${span}`}
    >
      <Link
        href={href}
        className="group flex items-start justify-between gap-4"
      >
        <h3 className="text-[clamp(1.5rem,2.6vw,1.9rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
          {name}
        </h3>
        <CardArrow />
      </Link>
      <p className="mt-3 max-w-[64ch] text-[1rem] leading-relaxed text-ink-muted">
        {body}
      </p>
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
    name: lines.addTask.text,
    href: "/features/add-task",
    span: "sm:col-span-3",
    ratio: "2/1",
    // Drawn rather than shot, as a try (Naol, 2026-11-07): the sheet is short when the task fits,
    // so it stands in the middle of its slot.
    picture: (
      <div className="flex h-full items-center justify-center p-4">
        <NewTaskSheet />
      </div>
    ),
  },
  {
    name: "Avoid overplanning",
    href: "/features/avoid-overplanning",
    span: "sm:col-span-3",
    ratio: "2/1",
    // The same drawn sheet at the moment it refuses (Naol, 2026-11-07).
    picture: (
      <div className="flex h-full items-center justify-center p-4">
        <NewTaskSheet refused />
      </div>
    ),
  },
  {
    name: "Recurring",
    href: "/features/recurring",
    span: "sm:col-span-2",
    ratio: "4/3",
    // Drawn (Naol, 2026-11-07): the days of the week being chosen, which no capture holds well.
    picture: (
      <div className="flex h-full justify-center overflow-hidden px-5 pt-5">
        <RepeatPicker />
      </div>
    ),
  },
  {
    name: "Upcoming capacity",
    href: "/features/upcoming-capacity",
    span: "sm:col-span-2",
    ratio: "4/3",
    // Drawn (Naol, 2026-11-07): the coming days folded to their room, as the iPhone lists them.
    picture: (
      <div className="flex h-full justify-center overflow-hidden px-5 pt-5">
        <UpcomingDays />
      </div>
    ),
  },
  {
    name: "Sessions",
    href: "/features/sessions",
    span: "sm:col-span-2",
    ratio: "4/3",
    // Drawn (Naol, 2026-11-07): the running task in the sidebar's bucket.
    picture: (
      <div className="flex h-full justify-center overflow-hidden px-5 pt-5">
        <SessionCard />
      </div>
    ),
  },
];

const notes: Tile[] = [
  {
    name: "Blocks",
    href: "/features/blocks",
    span: "sm:row-span-2",
    ratio: "3/4",
    stretch: true,
    // Drawn close up (Naol, 2026-11-07): two lines, then the slash and the menu it opens.
    picture: (
      <div className="flex h-full overflow-hidden pl-5 pt-5">
        <SlashLines />
      </div>
    ),
  },
  {
    name: "Mentions",
    href: "/features/mentions",
    ratio: "4/3",
    // Drawn close up (Naol, 2026-11-07): a date chip and a note link in one sentence.
    picture: (
      <div className="flex h-full overflow-hidden pl-5 pt-5">
        <InlineTokens />
      </div>
    ),
  },
  {
    name: "Formatting",
    href: "/features/formatting",
    ratio: "4/3",
    // Drawn close up (Naol, 2026-11-07): one line for each way a run of words can be set.
    picture: (
      <div className="flex h-full overflow-hidden pl-5 pt-5">
        <InlineFormats />
      </div>
    ),
  },
];

const calendar: Tile[] = [
  {
    name: lines.calendar.text,
    href: "/features/add-a-feed",
    ratio: "2/1",
    stretch: true,
    // Drawn close up (Naol, 2026-11-07): the feeds and the checkbox that counts one toward the day.
    picture: (
      <div className="flex h-full overflow-hidden pl-5 pt-5">
        <FeedRows />
      </div>
    ),
  },
  {
    name: "Task list with calendars",
    href: "/features/tasks-with-calendars",
    ratio: "2/1",
    // Drawn close up (Naol, 2026-11-07): a meeting among the tasks under its tag.
    picture: (
      <div className="flex h-full overflow-hidden pl-5 pt-5">
        <TodayMix />
      </div>
    ),
  },
];

const ON_BAND = "bg-base";

/**
 * The others: bare tiles on the band, three in words (the first sentence of each one's page, so
 * the tile and the page say the same thing; Naol, 2026-11-07), Loafy as her picture, and a fifth
 * that opens the list of everything.
 */
function others(summary: Record<string, string>): Tile[] {
  return [
    {
      name: "Pin board",
      href: "/features/pin-board",
      ratio: "4/3",
      ground: ON_BAND,
      picture: <Words>{summary["pin-board"]}</Words>,
    },
    {
      name: "Analysis",
      href: "/features/analysis",
      ratio: "4/3",
      ground: ON_BAND,
      picture: <Words>{summary.analysis}</Words>,
    },
    {
      name: "Loafy",
      href: "/features/loafy",
      ratio: "4/3",
      ground: ON_BAND,
      picture: (
        <Fill
          src="/shots/loafy-house-light.webp"
          at="object-center"
          alt={`${lines.loafyHome.text}: the kitchen floor of her house, with Loafy napping in the mixing bowl on the counter.`}
        />
      ),
    },
    {
      name: "Journal",
      href: "/features/journal",
      ratio: "4/3",
      ground: ON_BAND,
      picture: <Words>{summary.journal}</Words>,
    },
    {
      name: "More",
      href: "/features",
      ratio: "4/3",
      ground: ON_BAND,
      picture: <Words>All features</Words>,
    },
  ];
}

/** The three containers and the others' grid, for the grey band of the home page and /features. */
export async function FeatureGroups() {
  const pages = await Promise.all(
    ["pin-board", "analysis", "journal"].map(getFeaturePage),
  );
  const summary = Object.fromEntries(
    pages.map((page) => [page.slug, firstSentence(page.meta.summary)]),
  );
  return (
    <>
      <div className="grid gap-4 lg:grid-cols-12">
        <Group
          name="Tasks"
          body={positioning.tasksFull}
          href="/features#tasks"
          span="lg:col-span-12"
          grid="sm:grid-cols-6"
          tiles={tasks}
        />
        <Group
          name="Notes"
          body={positioning.notes}
          href="/features#notes"
          span="lg:col-span-8"
          grid="sm:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] sm:grid-rows-2"
          tiles={notes}
        />
        <Group
          name="Calendar"
          body={positioning.calendars}
          href="/features#calendar"
          span="lg:col-span-4"
          grid="sm:grid-rows-[minmax(0,1fr)_auto]"
          tiles={calendar}
        />
      </div>

      <div className="mt-[clamp(2.5rem,5vw,4rem)]">
        <Link
          href="/features#others"
          className="group mb-5 inline-flex items-center gap-3"
        >
          <h3 className="text-[clamp(1.5rem,2.6vw,1.9rem)] font-semibold leading-[1.1] tracking-[-0.03em]">
            Others
          </h3>
          <CardArrow />
        </Link>
        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-5">
          {others(summary).map((tile) => (
            <TileLink key={tile.name} tile={tile} />
          ))}
        </div>
      </div>
    </>
  );
}
