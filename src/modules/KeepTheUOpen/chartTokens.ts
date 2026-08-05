/**
 * Neutrals that exist only inside these charts. They are deliberately not in
 * the global palette — nothing outside a chart should reach for them.
 */
export const chartColors = {
  /** Unfilled portion of a bar. */
  track: '#f0f0f0',
  /** Horizontal value gridline. */
  gridline: '#ededed',
  /** Background of the highlighted Cal State LA row. */
  highlightedRow: '#fffbe8',
} as const;

/** Chart labels and legends sit at 12.5–14px; SVG text cannot use Typography. */
export const CHART_LABEL_SIZE = 13;

/** Shared easing for every chart reveal. */
export const CHART_EASING = 'cubic-bezier(0.25, 0.6, 0.3, 1)';

/** Default reveal duration in ms. Callers may pass 300–3000. */
export const CHART_DURATION = 1400;
