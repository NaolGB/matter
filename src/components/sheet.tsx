import type { ComponentType, CSSProperties, ReactNode } from "react";

/* What the drawn New task sheets share (EditorRefusal, NewTaskSheet): a point, `--k`, is the
   picture's width over 520, the sheet's own width in the app, and every position is in points.
   The symbols are the app's own, from sf-symbols-lib (see DESIGN.md). */

export const u = (n: number) => `calc(var(--k) * ${n})`;

export const INK = "#1d1d1f";
export const MUTED = "#86868b";
export const ORANGE = "#f58a1f";

export function At({
  x,
  y,
  w,
  h,
  style,
  children,
}: {
  x: number;
  y: number;
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
        top: u(y),
        width: w === undefined ? undefined : u(w),
        height: h === undefined ? undefined : u(h),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** A symbol of the app's, at a size in points. */
export type Symbol = ComponentType<{
  style?: CSSProperties;
  className?: string;
}>;
export function Glyph({ symbol: S, size }: { symbol: Symbol; size: number }) {
  return <S style={{ width: u(size), height: u(size), flex: "none" }} />;
}

/** One property's answer: a symbol and a few words, with no edge. `quiet` is an unset one. */
export function Token({
  symbol,
  children,
  quiet = false,
}: {
  symbol: Symbol;
  children: ReactNode;
  quiet?: boolean;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: u(7),
        color: quiet ? MUTED : INK,
      }}
    >
      <Glyph symbol={symbol} size={13} />
      {children}
    </span>
  );
}
