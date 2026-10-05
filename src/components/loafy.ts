/* Loafy's shapes and colours, from the app's LoafFigure and DukaPalette, in her own body units:
   about 14 wide and 12 tall, with her base (bottom centre) at the origin. The ladder and the house
   draw her from these, so she is the same loaf in both. */

export const BODY =
  "M-6.5 0C-7.8-1.5-7.6-4-6.8-6-6-9.5-4.5-11.5-1.5-11.5.2-11.5 1.4-12.6 2.5-11.8 4.5-11 6.6-9 6.8-6 7.6-4 7.8-1.5 6.5 0 3 .8-3 .8-6.5 0Z";
export const CAP =
  "M-6.5-7.4C-5.6-10-4-11.5-1.5-11.5.2-11.5 1.4-12.6 2.5-11.8 4.4-11 6.2-9.6 6.6-7.4 3-8.8-3-8.8-6.5-7.4Z";
export const SLASH = "M-3.6-9.4Q0-11 3.4-10.2";

export const colour = {
  crumb: "#F6E6C4",
  cap: "#D9A860",
  crust: "#B48243",
  blush: "#EE9E8A",
  ink: "#3A2A1A",
};

/** The page's ladder: from one rung to the next, in pixels. The house uses it too, so she climbs
    at the same step whichever of the two is drawing her. */
export const RUNG = 39;
/** One of her body units on the page's ladder, in pixels. */
export const LADDER_UNIT = 3;
