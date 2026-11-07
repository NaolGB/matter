import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import lines from "@/content/app-lines.json";
import {
  SFCheckmark,
  SFDocumentOnDocument,
  SFPauseFill,
  SFPlus,
  SFTimelapse,
  SFTimer,
} from "@/components/symbols";

/* A task running in the work bucket, drawn in the app's look for the Sessions slot of the features
   containers (Naol, 2026-11-07): the foot of the Mac's sidebar, the day's capacity above the
   bucket and the running card standing in its pocket, as SessionDrop draws the same bucket at the
   moment of a drag. Measured from the 2026-11-06 capture (Screenshots/demo-2026-11-06/mac/01-tasks)
   and built from WorkBucketDock.swift's geometry: a 30-point header, a card 108 points tall with
   its foot 6 points behind the pocket's lip, an 18-point pocket floor. It is a picture: nothing in
   it can be pressed.

   The session is the demo's at its moment: Write the Mosaic pitch story, started 9:16 with a
   90-minute estimate, 24:35 on the clock at 9:41, with 2h 10m of the day free. The sidebar is a
   pane inset in a white card, as it is in the window, standing on the slot's foot with the foot of
   Loafy's house, her living room, above the bucket (the app's painter's, as SessionDrop shows it).
   Every word of the app's comes from app-lines.json.

   Every measure is in points, and one point is `--k`: the picture's width over 300. */

const u = (n: number) => `calc(var(--k) * ${n})`;
const INK = "#1d1d1f";
const MUTED = "#86868b";
const HAIR = "rgb(0 0 0 / 0.1)";
const RUNNING = "#007aff";
/** The sidebar pane's inset from the card's sides, and the running card's inset from the pane's. */
const PANE = 14;
const CARD = { x: 12, w: 248, h: 108 };
/** The pocket's floor, and how far the card's foot stands behind its lip. */
const FLOOR = 18;
const BEHIND = 6;

/** Placed from the pane's foot upward, so the bucket stands at the slot's bottom whatever its height. */
function Up({
  x,
  bottom,
  w,
  h,
  style,
  children,
}: {
  x: number;
  bottom: number;
  w?: number;
  h?: number;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: u(x),
        bottom: u(bottom),
        width: w === undefined ? undefined : u(w),
        height: h === undefined ? undefined : u(h),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Icon({
  symbol: S,
  size,
  color = "currentColor",
}: {
  symbol: typeof SFTimer;
  size: number;
  color?: string;
}) {
  return <S style={{ width: u(size), height: u(size), flex: "none", color }} />;
}

export function SessionCard() {
  const cardBottom = FLOOR - BEHIND;
  const headerBottom = cardBottom + CARD.h;
  return (
    <div
      role="img"
      aria-label={`The foot of the Mac's sidebar: 2h 10m ${lines.free.text}, and Write the Mosaic pitch story running in the work bucket, 24:35 on its clock, started 9:16 with a 90 minute estimate, with ${lines.pause.text} and ${lines.complete.text} under it.`}
      className="h-full w-full max-w-[300px] select-none text-left text-ink [container-type:inline-size]"
    >
      <div
        aria-hidden
        className="relative h-full overflow-hidden rounded-t-[16px] bg-base shadow-[0_24px_60px_-24px_rgb(0_0_0/0.3)] ring-1 ring-hairline [--k:calc(100cqw/300)]"
      >
        {/* The sidebar: a grey pane inset in the window, running off the top and the foot. */}
        <div
          className="absolute"
          style={{
            left: u(PANE),
            right: u(PANE),
            top: u(-12),
            bottom: u(-12),
            background: "#f2f2f4",
            borderRadius: u(12),
            boxShadow: `inset 0 0 0 1px ${HAIR}`,
          }}
        >
          {/* The foot of Loafy's house above the bucket. */}
          <Up
            x={CARD.x}
            bottom={headerBottom + 30}
            w={CARD.w}
            style={{
              overflow: "hidden",
              borderRadius: `0 0 ${u(10)} ${u(10)}`,
            }}
          >
            <Image
              src="/shots/house-living-room.webp"
              alt=""
              width={550}
              height={215}
              unoptimized
              className="block h-auto w-full"
            />
          </Up>

          {/* The day's capacity, above the bucket. */}
          <Up
            x={CARD.x}
            bottom={headerBottom}
            w={CARD.w}
            h={30}
            style={{
              display: "flex",
              alignItems: "center",
              gap: u(7),
              whiteSpace: "nowrap",
            }}
          >
            <Icon symbol={SFTimer} size={13} color={INK} />
            <span style={{ fontSize: u(12.5), fontWeight: 600 }}>
              2h 10m {lines.free.text}
            </span>
            <span style={{ flex: 1 }} />
            <Icon symbol={SFTimelapse} size={16} color={MUTED} />
          </Up>

          {/* The running card, its foot behind the pocket's lip. */}
          <Up
            x={CARD.x}
            bottom={cardBottom}
            w={CARD.w}
            h={CARD.h}
            style={{
              background: "#fff",
              borderRadius: `${u(12)} ${u(12)} 0 0`,
              boxShadow: `inset 0 0 0 1px ${HAIR}, 0 ${u(-1)} ${u(3)} rgb(0 0 0 / 0.12)`,
            }}
          >
            <div
              className="absolute"
              style={{
                left: u(10),
                right: u(10),
                top: u(3),
                height: u(22),
                display: "flex",
                alignItems: "center",
                gap: u(6),
              }}
            >
              <span
                style={{
                  fontSize: u(11.5),
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                Write the Mosaic pitch story
              </span>
              <span style={{ flex: 1 }} />
              <span style={{ display: "flex", gap: u(14), color: INK }}>
                <Icon symbol={SFDocumentOnDocument} size={12} />
                <Icon symbol={SFPlus} size={12} />
              </span>
            </div>
            <div
              className="absolute"
              style={{
                left: u(10),
                top: u(30),
                fontSize: u(19),
                fontWeight: 500,
                color: RUNNING,
                lineHeight: 1.1,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              24:35
            </div>
            <div
              className="absolute"
              style={{
                left: u(10),
                top: u(53),
                fontSize: u(10.5),
                color: MUTED,
                whiteSpace: "nowrap",
              }}
            >
              {lines.started.text} 9:16 · 90m {lines.est.text}
            </div>
            <div
              className="absolute"
              style={{
                left: u(10),
                top: u(77),
                display: "flex",
                gap: u(22),
                fontSize: u(11.5),
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: u(6),
                }}
              >
                <Icon symbol={SFPauseFill} size={10} />
                {lines.pause.text}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: u(6),
                }}
              >
                <Icon symbol={SFCheckmark} size={11} />
                {lines.complete.text}
              </span>
            </div>
          </Up>

          {/* The pocket's floor, its lip over the card's foot. */}
          <Up
            x={0}
            bottom={0}
            w={PANE * 0 + 272}
            h={FLOOR}
            style={{
              width: "100%",
              background: "#e9e9ec",
              borderTop: "1px solid rgb(0 0 0 / 0.14)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
