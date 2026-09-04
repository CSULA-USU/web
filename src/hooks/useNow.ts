import { useEffect, useState } from 'react';

/** How often the clock re-reads. A minute's drift on a badge nobody is timing. */
const DEFAULT_INTERVAL_MS = 30000;

/**
 * The current time, re-read on an interval.
 *
 * Anything time-dependent on the events pages has to derive from this rather
 * than from a bare `Date.now()`. The event list is fetched once on mount and
 * held in Recoil, so a timestamp taken at fetch never advances — an event that
 * ended while a tab sat open would keep its "Live now" badge indefinitely, and
 * one that started would never get one.
 *
 * Safe to call during SSR: it returns a server timestamp on the first render,
 * but every consumer derives from the event list, which is empty until the
 * client-side fetch resolves, so nothing time-dependent is ever rendered on
 * the server.
 */
export const useNow = (intervalMs: number = DEFAULT_INTERVAL_MS) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const tick = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(tick);
  }, [intervalMs]);

  return now;
};
