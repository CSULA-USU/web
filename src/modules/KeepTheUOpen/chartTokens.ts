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
  /**
   * Peak of the highlighted row's blink. The resting band sits too close to
   * white to register as motion, so the blink flashes to this deeper tint of
   * primary instead. It stays well short of primary itself, which would swallow
   * the row's own primary bar.
   */
  highlightedRowFlash: '#ffe58f',
} as const;

/* Label size, easing and duration moved to `components/PieChart` when the
   donut became a shared primitive. Re-exported so BarChart and TrendChart keep
   importing their chart tokens from one place. */
export {
  CHART_LABEL_SIZE,
  CHART_EASING,
  CHART_DURATION,
} from 'components/PieChart/chartTokens';
