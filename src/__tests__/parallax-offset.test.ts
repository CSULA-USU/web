import { getParallaxOffset } from 'components/ParallaxStrip/ParallaxStrip';

const VIEWPORT_HEIGHT = 800;
const STRIP_HEIGHT = 400;
const TRAVEL = 0.5;

const offsetAt = (stripTop: number) =>
  getParallaxOffset({
    stripTop,
    stripHeight: STRIP_HEIGHT,
    viewportHeight: VIEWPORT_HEIGHT,
    travel: TRAVEL,
  });

/* The layer overhangs the strip by half of `travel` at each end, so the
   furthest it can shift either way is that same overhang. */
const MAX_SHIFT = (TRAVEL / 2) * STRIP_HEIGHT;

describe('getParallaxOffset', () => {
  it('shows the top of the photo as the strip enters at the bottom', () => {
    expect(offsetAt(VIEWPORT_HEIGHT)).toBe(MAX_SHIFT);
  });

  it('shows the bottom of the photo as the strip leaves at the top', () => {
    expect(offsetAt(-STRIP_HEIGHT)).toBe(-MAX_SHIFT);
  });

  it('rests at the server-rendered crop when the strip is mid-screen', () => {
    const midScreenTop = (VIEWPORT_HEIGHT - STRIP_HEIGHT) / 2;

    expect(offsetAt(midScreenTop)).toBe(0);
  });

  /* Clamped, or a strip far off screen would drag its layer past the
     overhang and pull the photo's edge into view on the way back in. */
  it('never shifts past the overhang while off screen', () => {
    expect(offsetAt(VIEWPORT_HEIGHT * 3)).toBe(MAX_SHIFT);
    expect(offsetAt(-STRIP_HEIGHT * 3)).toBe(-MAX_SHIFT);
  });
});
