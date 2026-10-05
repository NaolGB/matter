import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/* The Mac app's window, drawn, for the hero: the sidebar with Loafy's house and the session well,
   and the Tasks board with Today and Upcoming. It is the screenshot's moment, Tuesday 6 October
   at 9:41 with 2h 10m free, drawn at the app's own size instead of shrunk, so the words can be
   read. To fit, the window is narrower than the real one (1043 points, not 1440) and shorter, so
   the two columns are narrower and the lists run off its foot. The house is the app's own painter,
   rendered (tools/loaf-render, at tea). It is a picture: nothing in it can be pressed.

   Every position is in the window's points, and one point is `--k`: the window's width over
   1043 on a wide screen. On a phone it is the width over 668, so the window is shown larger and
   cut at the right, just past the Today column. */

const W = 1043;
const H = 700;
const u = (n: number) => `calc(var(--k) * ${n})`;

const INK = "#1d1d1f";
const MUTED = "#86868b";
const HAIR = "rgb(0 0 0 / 0.08)";
const GREEN = "#34c759";
const CAL = "#6e6ad8";

function At({ x, y, w, h, style, children }: { x: number; y: number; w?: number; h?: number; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div
      className="absolute"
      style={{ left: u(x), top: u(y), width: w === undefined ? undefined : u(w), height: h === undefined ? undefined : u(h), ...style }}
    >
      {children}
    </div>
  );
}

function Text({
  x,
  y,
  size,
  weight = 400,
  color = INK,
  children,
  style,
}: {
  x: number;
  y: number;
  size: number;
  weight?: number;
  color?: string;
  children: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <At x={x} y={y} style={{ fontSize: u(size), fontWeight: weight, color, lineHeight: 1.2, whiteSpace: "nowrap", ...style }}>
      {children}
    </At>
  );
}

/** A small line glyph, drawn on a 16 point grid. */
function Glyph({ x, y, size = 16, d, color = MUTED, width = 1.5 }: { x: number; y: number; size?: number; d: string; color?: string; width?: number }) {
  return (
    <At x={x} y={y} w={size} h={size}>
      <svg viewBox="0 0 16 16" className="block size-full" fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </At>
  );
}

const glyph = {
  tasks: "M2.5 4.5l1.2 1.2 2.1-2.4M8 4.5h5.5M3.6 11.2a1.4 1.4 0 1 0 0 .01M8 11.2h5.5",
  notebook: "M4 2.5h7.5a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4zM6.5 5.5h3.5M6.5 8h3.5M2.8 4.5h1.5M2.8 8h1.5M2.8 11.5h1.5",
  pin: "M6 2.5h4M7 2.5v4L4.8 9h6.4L9 6.5v-4M8 9v4.5",
  bell: "M4 11V7.3a4 4 0 0 1 8 0V11l1 1H3zM6.8 13.5a1.3 1.3 0 0 0 2.4 0M11.5 3.2l.9-.9",
  archive: "M2.5 3h11v2.5h-11zM3.5 5.5v7h9v-7M6.5 8h3",
  templates: "M4.5 5V3.5h9v7H12M2.5 5.5h9.5v7.5H2.5z",
  plus: "M8 3v10M3 8h10",
  search: "M7 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM10.6 10.6l3 3",
  timer: "M8 14a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM8 5.5V8.5l2 1M6.5 1.5h3",
  copy: "M5.5 5.5h7v8h-7zM3.5 10.5v-8h7",
  pause: "M5.5 3.5v9M10.5 3.5v9",
  check: "M3 8.5l3 3 7-7.5",
  cal: "M2.5 4h11v9.5h-11zM2.5 6.8h11M5 2.5v3M11 2.5v3",
};

function Row({ x, y, title, meta, cal = false }: { x: number; y: number; title: string; meta: string; cal?: boolean }) {
  return (
    <>
      <At x={x + 9} y={y + 2} w={17} h={17} style={{ borderRadius: "50%", border: `${u(1.4)} solid #8e8e93` }} />
      <Text x={x + 40} y={y} size={15}>
        {title}
      </Text>
      {cal && <Glyph x={x + 40} y={y + 23} size={13} d={glyph.cal} color={CAL} width={1.4} />}
      <Text x={x + (cal ? 58 : 40)} y={y + 23} size={12} color={MUTED}>
        {meta}
      </Text>
    </>
  );
}

function Group({ x, y, w, hue, label, right }: { x: number; y: number; w: number; hue?: string; label: string; right: ReactNode }) {
  return (
    <At x={x} y={y} w={w} h={16} style={{ display: "flex", alignItems: "center", gap: u(8), fontSize: u(12.5), color: MUTED, whiteSpace: "nowrap" }}>
      {hue && <span style={{ width: u(7), height: u(7), borderRadius: "50%", background: hue, flex: "none" }} />}
      <span style={{ fontWeight: 600 }}>{label}</span>
      <span style={{ flex: 1, height: 1, background: "rgb(0 0 0 / 0.07)" }} />
      <span>{right}</span>
    </At>
  );
}

function Pill({ x, y, w, icon, children }: { x: number; y: number; w: number; icon: string; children: string }) {
  return (
    <At
      x={x}
      y={y}
      w={w}
      h={34}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: u(7),
        borderRadius: u(17),
        border: `1px solid ${HAIR}`,
        background: "#fefdfb",
        fontSize: u(13),
        fontWeight: 500,
        color: INK,
      }}
    >
      <svg viewBox="0 0 16 16" style={{ width: u(14), height: u(14) }} fill="none" stroke={INK} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={icon} />
      </svg>
      {children}
    </At>
  );
}

type Item = { group?: string; hue?: string; total?: string; title?: string; meta?: string; cal?: boolean };

const today: Item[] = [
  { group: "Larkspur Health", hue: "#30D158", total: "1h 15m" },
  { title: "Larkspur weekly sync", meta: "10:00 · 1h · Zoom", cal: true },
  { title: "Check the Larkspur channel", meta: "11:30 · 15m" },
  { group: "Quarry Freight", hue: "#FF9F0A", total: "30m" },
  { title: "Prioritise the dashboard backlog with Ravi", meta: "11:00 · 30m" },
  { group: "Juniper Schools", hue: "#5E5CE6", total: "15m" },
  { title: "Reply to Juniper's feedback round", meta: "12:00 · 15m" },
  { group: "Studio ops", hue: "#0A84FF", total: "1h 30m" },
  { title: "Studio standup", meta: "9:30 · 15m · Studio", cal: true },
  { title: "Shutdown review", meta: "12:15 · 15m" },
  { title: "Call the accountant about VAT", meta: "16:30 · 15m" },
];

const upcoming: Item[] = [
  { title: "Morning pages", meta: "Wed, Oct 7 · 8:00 · 10m" },
  { title: "Studio standup", meta: "Wed, Oct 7 · 9:30 · 15m · Studio", cal: true },
  { title: "Check the Quarry board", meta: "Wed, Oct 7 · 10:45 · 15m" },
  { title: "Juniper portal review", meta: "Wed, Oct 7 · 11:00 · 30m · Zoom", cal: true },
  { title: "Prepare the usability session room", meta: "Wed, Oct 7 · 11:30 · 20m" },
  { title: "Check the Larkspur channel", meta: "Wed, Oct 7 · 12:00 · 15m" },
  { title: "Draft the Mosaic proposal", meta: "Wed, Oct 7 · 12:15 · 2h" },
  { title: "Sketch for twenty minutes", meta: "Wed, Oct 7 · 14:15 · 20m" },
];

/** Where each heading and row of a list goes, from `top` down. */
function place(items: Item[], top: number) {
  const placed: { item: Item; y: number }[] = [];
  let y = top;
  items.forEach((item, index) => {
    if (item.group) {
      if (index > 0) y += 8;
      placed.push({ item, y });
      y += 27;
    } else {
      placed.push({ item, y });
      y += 64;
    }
  });
  return placed;
}

/** A column's list: group headings and rows, as far down as the window goes. */
function List({ x, w, top, items }: { x: number; w: number; top: number; items: Item[] }) {
  return (
    <>
      {place(items, top).map(({ item, y }, index) =>
        item.group ? (
          <Group key={item.group} x={x} y={y} w={w} hue={item.hue} label={item.group} right={item.total} />
        ) : (
          <Row key={`${item.title}-${index}`} x={x} y={y} title={item.title!} meta={item.meta!} cal={item.cal} />
        ),
      )}
    </>
  );
}

export function HeroWindow({ className = "" }: { className?: string }) {
  const columns = { today: 310, upcoming: 677, width: 350 };
  return (
    <div
      role="img"
      aria-label="The Mac app at 9:41 on a Tuesday: Loafy having tea in her house in the sidebar, the session well reading 2h 10m free with the Mosaic pitch story running, and the Tasks board with today's tasks by client and tomorrow's below Upcoming."
      className={`relative w-full select-none overflow-hidden bg-base text-left [container-type:inline-size] ${className}`}
    >
      <div
        aria-hidden
        className="relative [--k:calc(100cqw/668)] [aspect-ratio:668/700] sm:[--k:calc(100cqw/1043)] sm:[aspect-ratio:1043/700]"
        style={{ fontFamily: "inherit" }}
      >
        <div className="absolute left-0 top-0" style={{ width: u(W), height: u(H) }}>
          {/* The sidebar. */}
          <At
            x={9}
            y={9}
            w={286}
            h={682}
            style={{ background: "#fafaf9", borderRadius: u(16), border: `1px solid rgb(0 0 0 / 0.05)`, boxShadow: "0 1px 3px rgb(0 0 0 / 0.04)" }}
          />
          {["#ff5f57", "#febc2e", "#28c840"].map((colour, index) => (
            <At key={colour} x={20 + index * 23} y={20} w={13} h={13} style={{ borderRadius: "50%", background: colour }} />
          ))}
          <At x={161} y={14} w={26} h={26} style={{ borderRadius: u(7), background: "#e9e9e8" }} />
          <Glyph x={166} y={19} d={glyph.tasks} color={INK} />
          <Glyph x={201} y={19} d={glyph.notebook} />
          <Glyph x={233} y={19} d={glyph.pin} />
          <Glyph x={265} y={19} d={glyph.bell} />

          {/* Loafy's house. */}
          <At x={21} y={58} w={262} h={412} style={{ borderRadius: u(18), overflow: "hidden", boxShadow: "inset 0 0 0 1px #e3dfd6" }}>
            <Image src="/shots/hero-house-light.webp" alt="" fill unoptimized sizes="300px" priority />
          </At>

          {/* The session well: the day's figure, and the session running in it. */}
          <At x={21} y={482} w={262} h={206} style={{ background: "#fff", borderRadius: u(18), border: `1px solid ${HAIR}` }} />
          <Glyph x={34} y={497} size={15} d={glyph.timer} width={1.6} />
          <Text x={56} y={496} size={13} weight={600} color={MUTED}>
            2h 10m free
          </Text>
          <At x={259} y={496} w={15} h={15} style={{ borderRadius: "50%", border: `${u(1.6)} dotted #b8b8bc` }} />
          <At
            x={33}
            y={522}
            w={238}
            h={154}
            style={{ background: "#fefdfb", borderRadius: u(12), border: "1px solid #e9e7e3", boxShadow: "0 8px 18px -10px rgb(0 0 0 / 0.25)" }}
          />
          <Text x={44} y={534} size={13} weight={500}>
            Write the Mosaic pitch story
          </Text>
          <Glyph x={225} y={533} size={15} d={glyph.copy} width={1.4} />
          <Glyph x={250} y={533} size={15} d={glyph.plus} width={1.5} />
          <Text x={44} y={596} size={23} weight={600} style={{ fontVariantNumeric: "tabular-nums" }}>
            20:25
          </Text>
          <Text x={44} y={625} size={12} color={MUTED}>
            Started 9:06 · 90m est.
          </Text>
          {[
            { x: 44, w: 70, icon: glyph.pause, label: "Pause" },
            { x: 120, w: 92, icon: glyph.check, label: "Complete" },
          ].map((pill) => (
            <At
              key={pill.label}
              x={pill.x}
              y={648}
              w={pill.w}
              h={22}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: u(5), borderRadius: u(11), background: "#efeeec", fontSize: u(11.5), fontWeight: 500, color: INK }}
            >
              <svg viewBox="0 0 16 16" style={{ width: u(10), height: u(10) }} fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={pill.icon} />
              </svg>
              {pill.label}
            </At>
          ))}

          {/* The board's head: the page's mark and title, its three buttons, and the search. */}
          <Glyph x={311} y={27} size={26} d={glyph.tasks} color={INK} width={1.5} />
          <Text x={348} y={21} size={28} weight={700} style={{ letterSpacing: "-0.01em" }}>
            Tasks
          </Text>
          <Text x={349} y={56} size={13} color={MUTED}>
            67 active · 349 done
          </Text>
          <Pill x={735} y={30} w={88} icon={glyph.archive}>
            Archive
          </Pill>
          <Pill x={831} y={30} w={102} icon={glyph.templates}>
            Templates
          </Pill>
          <Pill x={941} y={30} w={88} icon={glyph.plus}>
            New task
          </Pill>
          <At x={310} y={80} w={719} h={36} style={{ borderRadius: u(10), border: `1px solid ${HAIR}` }} />
          <Glyph x={324} y={90} size={16} d={glyph.search} width={1.6} />
          <Text x={350} y={89} size={14} color="#b0b0b5">
            Quick find tasks...
          </Text>

          {/* Today, and what is coming. */}
          <Text x={columns.today} y={138} size={21} weight={700} style={{ letterSpacing: "-0.01em" }}>
            Today
          </Text>
          <List x={columns.today} w={columns.width} top={176} items={today} />
          <Text x={columns.upcoming} y={138} size={21} weight={700} style={{ letterSpacing: "-0.01em" }}>
            Upcoming
          </Text>
          <Group
            x={columns.upcoming}
            y={176}
            w={columns.width}
            label="Tomorrow"
            right={
              <>
                5h 45m · <span style={{ color: GREEN }}>15m free</span>
              </>
            }
          />
          <List x={columns.upcoming} w={columns.width} top={203} items={upcoming} />
        </div>
      </div>
    </div>
  );
}
