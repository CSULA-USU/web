import { useEffect, useRef, useState } from 'react';

/**
 * Phase of a reveal-on-scroll animation.
 *
 * - `final` — painted at its finished state with no transition. This is the
 *   first-render value, so server output and a no-JS page are both correct.
 * - `armed` — held at its starting state, waiting to scroll into view.
 * - `revealed` — transitioning to the finished state.
 */
export type RevealPhase = 'final' | 'armed' | 'revealed';

interface RevealOptions {
  /** Set false to skip animation entirely and paint at the final state. */
  enabled?: boolean;
  /** Re-arms the observer when any of these change. */
  resetKey?: unknown;
}

/**
 * Fires once, the first time the element scrolls into view. Never loops, and
 * never animates on mount for content below the fold.
 *
 * `prefers-reduced-motion: reduce` short-circuits setup entirely: no observer
 * is registered and the phase stays `final`.
 */
export const useRevealOnce = <T extends HTMLElement>({
  enabled = true,
  resetKey,
}: RevealOptions = {}) => {
  const ref = useRef<T | null>(null);
  const [phase, setPhase] = useState<RevealPhase>('final');

  useEffect(() => {
    if (!enabled) {
      setPhase('final');
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('final');
      return;
    }

    const node = ref.current;
    if (!node) return;

    setPhase('armed');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, [enabled, resetKey]);

  return {
    ref,
    phase,
    /** True once the element should show its finished geometry. */
    atFinal: phase !== 'armed',
    /** True while a transition should be attached. */
    isTransitioning: phase !== 'final',
  };
};
