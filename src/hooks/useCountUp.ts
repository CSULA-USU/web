import { useEffect, useState } from 'react';

interface CountUpOptions {
  start?: number;
  duration?: number;
  delay?: number;
  /**
   * Maps linear progress 0→1 onto eased progress. Defaults to linear. Must be
   * a stable reference — define it at module scope, not inline.
   */
  easing?: (progress: number) => number;
  /** Counting begins when this turns true. */
  active?: boolean;
}

/** Eases in and out, the curve the chart value columns count on. */
export const smoothstep = (progress: number) =>
  progress * progress * (3 - 2 * progress);

/**
 * Counts from `start` to `end` once `active` is true, returning the current
 * value. The single counting implementation behind both `CountUp` and the
 * figures drawn inside chart SVG, which cannot host a React component.
 *
 * `prefers-reduced-motion: reduce` returns `end` immediately without scheduling
 * a frame.
 */
export const useCountUp = (
  end: number,
  {
    start = 0,
    duration = 2000,
    delay = 0,
    easing,
    active = true,
  }: CountUpOptions = {},
) => {
  /* Set `start` equal to `end` to hold a figure at rest — that is what makes
     first render, and a page without JS, show the real number. */
  const [value, setValue] = useState(active ? end : start);

  useEffect(() => {
    if (!active) {
      setValue(start);
      return;
    }
    if (
      start === end ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setValue(end);
      return;
    }

    let frame: number;
    let startTime: number | null = null;
    setValue(start);

    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const elapsed = now - startTime - delay;

      if (elapsed < 0) {
        frame = requestAnimationFrame(step);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const eased = easing ? easing(progress) : progress;
      setValue(start + (end - start) * eased);

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [start, end, duration, delay, easing, active]);

  return value;
};
