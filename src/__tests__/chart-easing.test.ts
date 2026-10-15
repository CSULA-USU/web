import {
  applyChartEasing,
  CHART_EASING,
} from 'components/PieChart/chartTokens';

/* Points on the curve computed directly from its parameter t, independent of
   the solver under test: x(t) is linear progress, y(t) is eased progress. */
const [x1, y1, x2, y2] = CHART_EASING.match(/[\d.]+/g)!.map(Number);
const bezier = (t: number, p1: number, p2: number) =>
  3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3;

describe('applyChartEasing', () => {
  it('pins both ends of the curve', () => {
    expect(applyChartEasing(0)).toBe(0);
    expect(applyChartEasing(1)).toBe(1);
  });

  it('clamps progress outside 0 to 1', () => {
    expect(applyChartEasing(-0.5)).toBe(0);
    expect(applyChartEasing(1.5)).toBe(1);
  });

  it('lands on the same curve the CSS transition draws', () => {
    [0.1, 0.25, 0.5, 0.75, 0.9].forEach((t) => {
      expect(applyChartEasing(bezier(t, x1, x2))).toBeCloseTo(
        bezier(t, y1, y2),
        5,
      );
    });
  });

  it('never runs backward', () => {
    let previous = 0;
    for (let step = 1; step <= 100; step += 1) {
      const eased = applyChartEasing(step / 100);
      expect(eased).toBeGreaterThanOrEqual(previous);
      previous = eased;
    }
  });
});
