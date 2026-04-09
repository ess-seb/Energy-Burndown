import type { ChartThemeResolved, Trend } from "./types";

/**
 * MDI icon id for Home Assistant `ha-icon` / `ha-state-icon`.
 * Maps semantic consumption trend to Figma "Comment icon" variants (§3).
 */
export function trendMdiIcon(trend: Trend): string {
  switch (trend) {
    case "higher":
      return "mdi:trending-up";
    case "lower":
      return "mdi:trending-down";
    case "similar":
      return "mdi:minus";
    case "unknown":
    default:
      return "mdi:help-circle-outline";
  }
}

/**
 * BEM modifier on containers that pick up `.ebc-trend--*` color rules in card CSS.
 */
/** Resolved RGB/CSS color for the vertical delta segment at “today” (US-6). */
export function trendResolvedLineColor(
  theme: ChartThemeResolved,
  trend: Trend | undefined
): string {
  switch (trend) {
    case "higher":
      return theme.trendHigher;
    case "lower":
      return theme.trendLower;
    case "similar":
      return theme.trendSimilar;
    case "unknown":
    default:
      return theme.trendUnknown;
  }
}

export function trendToneClass(trend: Trend): string {
  switch (trend) {
    case "higher":
      return "ebc-trend--negative";
    case "lower":
      return "ebc-trend--positive";
    case "similar":
      return "ebc-trend--neutral";
    case "unknown":
    default:
      return "ebc-trend--unknown";
  }
}
