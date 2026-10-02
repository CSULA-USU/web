/**
 * Rendering defaults shared by every chart. They live here, beside the one
 * chart that is a `components/` primitive, so that primitive never has to
 * import from a campaign module. `modules/KeepTheUOpen/chartTokens` re-exports
 * them for the charts that still live there.
 */

/** Chart labels and legends sit at 12.5–14px; SVG text cannot use Typography. */
export const CHART_LABEL_SIZE = 13;

/* Control points of the shared reveal curve. The CSS string and the JS
   function below are both built from these, so a figure counted in JS cannot
   drift off the curve a CSS transition draws on. */
const CHART_EASING_POINTS = [0.25, 0.6, 0.3, 1] as const;

/** Shared easing for every chart reveal. */
export const CHART_EASING = `cubic-bezier(${CHART_EASING_POINTS.join(', ')})`;

/**
 * `CHART_EASING` as a function, for animations that run in JS rather than CSS
 * — counted figures that must move in step with a chart's transition. Maps
 * linear progress 0→1 onto the same eased progress the browser would.
 */
export const applyChartEasing = (progress: number) => {
  if (progress <= 0) return 0;
  if (progress >= 1) return 1;

  const [x1, y1, x2, y2] = CHART_EASING_POINTS;
  const bezier = (t: number, p1: number, p2: number) =>
    3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3;

  /* The curve is parameterized by t, not by time, so solve for the t whose x
     is this progress. Bisection rather than Newton's method: x is monotonic
     for any valid easing, so it always converges, and 24 halvings is well
     past a pixel at any duration this runs for. */
  let low = 0;
  let high = 1;
  let t = progress;
  for (let step = 0; step < 24; step += 1) {
    t = (low + high) / 2;
    if (bezier(t, x1, x2) < progress) low = t;
    else high = t;
  }
  return bezier(t, y1, y2);
};

/** Default reveal duration in ms. Callers may pass 300–3000. */
export const CHART_DURATION = 1400;
