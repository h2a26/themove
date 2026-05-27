/**
 * Timing spec from THE_MOVE_MASTER_CONTEXT.md §7–8 (Frame Transition Behavior).
 */

/** Scroll of Spaces: lines dissolve → weather lingers → photo to full clarity */
export const SCROLL_TRANSITION = {
  drawMs: 3200,
  titleFadeMs: 500,
  linesDissolveMs: 700,
  weatherLingerMs: 900,
  photoRevealMs: 900,
  weatherFadeMs: 600,
} as const;

/** Project detail: facade draws once, then fully dissolves into first photograph */
export const DETAIL_OPENING_TRANSITION = {
  drawMs: 2500,
  dissolveMs: 1000,
} as const;
