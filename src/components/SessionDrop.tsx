import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import lines from "@/content/app-lines.json";

/* The work bucket at the moment a task is dragged onto it, drawn as close to the app as a page
   can: measured from the capture in Screenshots/hero-2026-10-12/cards and built from the app's
   own geometry in WorkBucketDock.swift. It is a picture: nothing in it can be pressed.

   What the app does while a drag is over a running bucket, and so what this shows: the header
   keeps the day's capacity and adds "Drop to start" in ink, and the pocket's lip lights, darker
   than the hairline it is at rest. The app draws that lip in full ink at 1.5 points; here it is
   a softer grey at 1 point, because at card size the full ink read as a hard rule across the
   picture (Naol's call, 2026-10-12). The running card is the hero's, at the hero's moment
   (Write the Mosaic pitch story, started 9:21, 35:23 left). The task being dragged is Update the
   studio wiki, drawn as a lifted card under the pointer.

   The geometry is the app's, in points: a 30-point header, one card 108 points tall standing in
   the pocket with its foot 6 points behind the lip, and an 18-point pocket floor whose lip dips in
   a notch 52 points wide at the middle. Above the bucket is the foot of Loafy's house, her living
   room, as the app's painter draws it.

   Every position is in points, and one point is `--k`: the picture's width over 604 on a wide
   screen. On a phone, where the card is narrow, it is the width over 316 and only the sidebar is
   shown, so the bucket is still large enough to read. */

const u = (n: number) => `calc(var(--k) * ${n})`;

const INK = "#1d1d1f";
const MUTED = "#86868b";
const HAIR = "rgb(0 0 0 / 0.1)";
const RUNNING = "#007aff";
const FEED = "#5856d6";

/** The card, as WalletLayout places one: inset 3 points into the pocket, cut at the lip. */
const CARD = { x: 24, y: 214, w: 267, h: 108 };
const LIP = CARD.y + CARD.h - 6;
const POCKET = { x: CARD.x - 3, w: CARD.w + 6, floor: 18, notch: 6.5, half: 26 };

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

function Icon({ d, size, color = "currentColor", width = 1.5, fill = "none" }: { d: string; size: number; color?: string; width?: number; fill?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      style={{ width: u(size), height: u(size), flex: "none" }}
      fill={fill}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={d} />
    </svg>
  );
}

const glyph = {
  timer: "M8 14.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM8 6v3l2 1.2M6.3 1.5h3.4",
  timelapse: "M8 2.2v1.6M8 12.2v1.6M2.2 8h1.6M12.2 8h1.6M3.9 3.9l1.1 1.1M11 11l1.1 1.1M3.9 12.1 5 11M11 5l1.1-1.1",
  copy: "M6 5.5h6.5v8.5H6zM4 10.5V2.5h6.5",
  plus: "M8 3v10M3 8h10",
  pause: "M5.5 3.5v9M10.5 3.5v9",
  checkmark: "M3 8.5l3 3 7-7.5",
  wrench: "M10.5 2.5a3 3 0 0 0-2.8 4L2.8 11.4a1.2 1.2 0 0 0 1.8 1.8L9.5 8.3a3 3 0 0 0 4-2.8l-1.8 1.8-1.8-.5-.5-1.8z",
  calendar: "M2.5 4h11v9.5h-11zM2.5 6.8h11M5 2.5v3M11 2.5v3",
};

const rows = [
  { title: "Studio standup", meta: "9:30 · 15m · Studio", event: true },
  { title: "Update the studio wiki", meta: "11:00 · 30m" },
  { title: "Reconcile the expense receipts", meta: "11:30 · 30m" },
  { title: "Shutdown review", meta: "13:45 · 15m" },
  { title: "Call the accountant about VAT", meta: "16:30 · 15m" },
];

/** A row of the board: its open circle, title, and the line under it. */
function Row({ title, meta, event = false }: { title: string; meta: string; event?: boolean }) {
  return (
    <div style={{ display: "flex", gap: u(12), whiteSpace: "nowrap" }}>
      <span
        style={{ width: u(15), height: u(15), marginTop: u(2), borderRadius: "50%", border: `${u(1.3)} solid #8e8e93`, flex: "none" }}
      />
      <div>
        <p style={{ fontSize: u(14.5), lineHeight: 1.3 }}>{title}</p>
        <p style={{ display: "flex", alignItems: "center", gap: u(4), marginTop: u(2), fontSize: u(11.5), color: MUTED }}>
          {event && <Icon d={glyph.calendar} size={11} color={FEED} />}
          {meta}
        </p>
      </div>
    </div>
  );
}

/** The pocket under the card, as PocketShape and LipShape draw it, in points from the lip. */
function Pocket() {
  const { w, floor, notch, half } = POCKET;
  const r = 12;
  const mid = w / 2;
  const lip = `M0 0H${mid - half}Q${mid} ${notch * 2} ${mid + half} 0H${w}`;
  const shape = `${lip}V${floor - r}Q${w} ${floor} ${w - r} ${floor}H${r}Q0 ${floor} 0 ${floor - r}Z`;
  /* The card's face in the notch: the lip dips below the cut, so the card shows a little lower
     there, as it does in the app. */
  const face = `M${mid - half} 0Q${mid} ${notch * 2} ${mid + half} 0Z`;
  return (
    <At x={POCKET.x} y={LIP} w={w} h={floor} style={{ overflow: "visible" }}>
      <svg viewBox={`0 0 ${w} ${floor}`} className="block size-full overflow-visible">
        <path d={face} fill="#fff" />
        <path d={shape} fill="rgb(0 0 0 / 0.05)" />
        <path d={lip} fill="none" stroke="rgb(0 0 0 / 0.32)" strokeWidth={1} />
      </svg>
    </At>
  );
}

export function SessionDrop() {
  return (
    <div
      role="img"
      aria-label={`A task being dragged onto the work bucket in the sidebar. The bucket says ${lines.dropToStart.text} and its edge lights, above the session already running: Write the Mosaic pitch story, 35:23 left, started 9:21, 90m estimated.`}
      className="relative w-full select-none overflow-hidden text-left text-ink [container-type:inline-size]"
    >
      <div
        aria-hidden
        className="relative [--k:calc(100cqw/316)] [aspect-ratio:316/345] sm:[--k:calc(100cqw/604)] sm:[aspect-ratio:604/345]"
      >
        {/* The sidebar: a pane inset in the window, running off the top, with its rounded foot. */}
        <At
          x={8}
          y={-40}
          w={298}
          h={382}
          style={{ background: "#f5f5f6", borderRadius: u(18), boxShadow: `inset 0 0 0 1px rgb(0 0 0 / 0.05)` }}
        />
        {/* The foot of Loafy's house: her living room. */}
        <At x={20} y={-10} w={275} h={107.5} style={{ borderRadius: u(14), overflow: "hidden" }}>
          <Image src="/shots/house-living-room.webp" alt="" fill unoptimized sizes="300px" />
        </At>

        {/* The bucket's header: the day's capacity, the instruction a drag brings, and the
            Week review button. */}
        <At x={21} y={184} w={268} h={30} style={{ display: "flex", alignItems: "center", gap: u(7), whiteSpace: "nowrap" }}>
          <Icon d={glyph.timer} size={13} color={INK} width={1.6} />
          <span style={{ fontSize: u(12.5), fontWeight: 600 }}>2h 10m free</span>
          <span style={{ marginLeft: u(4), fontSize: u(12), fontWeight: 600 }}>{lines.dropToStart.text}</span>
          <span style={{ flex: 1 }} />
          <Icon d={glyph.timelapse} size={16} color={MUTED} width={1.4} />
        </At>

        {/* The running card, cut at the pocket's lip. */}
        <At
          x={CARD.x}
          y={CARD.y}
          w={CARD.w}
          h={LIP - CARD.y}
          style={{
            background: "#fff",
            borderRadius: `${u(12)} ${u(12)} 0 0`,
            boxShadow: `inset 0 0 0 1px ${HAIR}, 0 ${u(-1)} ${u(3)} rgb(0 0 0 / 0.12)`,
          }}
        />
        <At x={CARD.x + 10} y={CARD.y + 3} w={CARD.w - 20} h={22} style={{ display: "flex", alignItems: "center", gap: u(6) }}>
          <span style={{ fontSize: u(11.5), fontWeight: 500, whiteSpace: "nowrap" }}>Write the Mosaic pitch story</span>
          <span style={{ flex: 1 }} />
          <span style={{ display: "flex", gap: u(14), color: INK }}>
            <Icon d={glyph.copy} size={12} width={1.4} />
            <Icon d={glyph.plus} size={12} width={1.6} />
          </span>
        </At>
        <At x={CARD.x + 10} y={CARD.y + 30} style={{ fontSize: u(19), fontWeight: 500, color: RUNNING, lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>
          35:23
        </At>
        <At x={CARD.x + 10} y={CARD.y + 53} style={{ fontSize: u(10.5), color: MUTED, whiteSpace: "nowrap" }}>
          Started 9:21 · 90m est.
        </At>
        <At x={CARD.x + 10} y={CARD.y + 77} style={{ display: "flex", gap: u(22), fontSize: u(11.5), fontWeight: 500, whiteSpace: "nowrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: u(6) }}>
            <Icon d={glyph.pause} size={10} width={2.4} />
            Pause
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: u(6) }}>
            <Icon d={glyph.checkmark} size={11} width={1.8} />
            Complete
          </span>
        </At>
        <Pocket />

        {/* The board beside the sidebar: Today's Studio ops. */}
        <At x={325} y={22} w={279} h={20} style={{ display: "flex", alignItems: "center", gap: u(8), fontSize: u(12.5), fontWeight: 600, color: MUTED, whiteSpace: "nowrap" }}>
          <Icon d={glyph.wrench} size={14} width={1.4} />
          Studio ops
          <span style={{ flex: 1, height: 1, background: HAIR }} />
        </At>
        {rows.map((row, index) => (
          <At key={row.title} x={342} y={62 + index * 68}>
            <Row {...row} />
          </At>
        ))}

        {/* The drag: the task picked up off the board, a small lifted card held by the pointer in
            the sidebar's open stretch, on its way down into the bucket. Drawn as a card rather
            than the app's see-through drag image, which at card size read as text printed over
            the session. */}
        <At
          x={58}
          y={112}
          style={{
            padding: `${u(9)} ${u(14)} ${u(9)} ${u(11)}`,
            background: "#fff",
            borderRadius: u(10),
            boxShadow: `0 0 0 1px ${HAIR}, 0 ${u(12)} ${u(24)} ${u(-8)} rgb(0 0 0 / 0.28)`,
            transform: "rotate(-3deg)",
          }}
        >
          <Row title="Update the studio wiki" meta="11:00 · 30m" />
        </At>
        <At x={216} y={140} w={14} h={21}>
          <svg viewBox="0 0 14 21" className="block size-full">
            <path d="M1 1v16.5l4-3.8 2.6 6 2.6-1.1-2.5-5.9h5.6z" fill="#000" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
          </svg>
        </At>
      </div>
    </div>
  );
}
