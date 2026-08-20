/**
 * Rendering defaults shared by every chart. They live here, beside the one
 * chart that is a `components/` primitive, so that primitive never has to
 * import from a campaign module. `modules/KeepTheUOpen/chartTokens` re-exports
 * them for the charts that still live there.
 */

/** Chart labels and legends sit at 12.5–14px; SVG text cannot use Typography. */
export const CHART_LABEL_SIZE = 13;

/** Shared easing for every chart reveal. */
export const CHART_EASING = 'cubic-bezier(0.25, 0.6, 0.3, 1)';

/** Default reveal duration in ms. Callers may pass 300–3000. */
export const CHART_DURATION = 1400;
