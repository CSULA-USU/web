import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  EMPTY_EVENT_FILTERS,
  EventFilterState,
  parseEventFilterQuery,
  toEventFilterQuery,
} from 'utils/eventFilters';

/** How long typing must pause before the search is written to the URL. */
const SEARCH_URL_DELAY_MS = 300;

/** A comparable fingerprint of the filters a URL or a state carries. */
const getFilterKey = (filters: EventFilterState) =>
  JSON.stringify(toEventFilterQuery(filters));

/**
 * The /events filters, kept in the URL so a filtered view can be linked to
 * and the back button steps through filter changes.
 *
 * The URL is a copy, not the source of truth. Rendering straight from
 * `router.query` waits on every shallow navigation, which is long enough for
 * a controlled checkbox to visibly tick, untick and tick again, and for a
 * search box bound to it to drop keystrokes and jump the caret. So the state
 * lives here and updates immediately, and the URL is written after it.
 *
 * The URL is read back whenever it changes to something this hook did not
 * write — first load, back, forward. Every write is recorded until the router
 * reports it, and any other URL is adopted. That is a comparison rather than a
 * "history is moving" flag on purpose: a flag cannot count, so two quick
 * presses of back let the second slip through as if it were ours, leaving
 * stale filters on screen for the next write to push back into the URL.
 *
 * Chip changes push a history entry each. The search is written with
 * `replace` once typing pauses, since an entry per keystroke would make the
 * back button useless.
 */
export const useEventFilterState = () => {
  const router = useRouter();
  const [filters, setFilterState] =
    useState<EventFilterState>(EMPTY_EVENT_FILTERS);

  const urlFilters = parseEventFilterQuery(router.query);
  const urlFilterKey = getFilterKey(urlFilters);

  const latestFiltersRef = useRef(filters);
  latestFiltersRef.current = filters;
  const latestUrlFiltersRef = useRef(urlFilters);
  latestUrlFiltersRef.current = urlFilters;
  const pendingUrlKeysRef = useRef<string[]>([]);

  /* Keyed on the fingerprint rather than `router.query`, so a re-render that
     hands back an equal query object cannot overwrite text still waiting on
     its debounced write. On a statically optimized page the query is empty
     until hydration finishes, which is why nothing is read before `isReady`. */
  useEffect(() => {
    if (!router.isReady) return;
    const pendingIndex = pendingUrlKeysRef.current.indexOf(urlFilterKey);
    if (pendingIndex !== -1) {
      pendingUrlKeysRef.current.splice(0, pendingIndex + 1);
      return;
    }
    pendingUrlKeysRef.current = [];
    setFilterState(latestUrlFiltersRef.current);
  }, [router.isReady, urlFilterKey]);

  /* A write that matches the URL already showing is skipped: the router may
     never report a navigation to where it already is, which would strand
     the key in the pending list and swallow a later back to that URL. */
  const writeFiltersToUrl = useCallback(
    (nextFilters: EventFilterState, method: 'push' | 'replace') => {
      const nextKey = getFilterKey(nextFilters);
      if (nextKey === getFilterKey(latestUrlFiltersRef.current)) return;
      pendingUrlKeysRef.current.push(nextKey);
      router[method](
        { pathname: router.pathname, query: toEventFilterQuery(nextFilters) },
        undefined,
        { shallow: true, scroll: false },
      );
    },
    [router],
  );

  useEffect(() => {
    if (
      !router.isReady ||
      filters.searchQuery.trim() === urlFilters.searchQuery
    ) {
      return;
    }
    const timeout = setTimeout(
      () => writeFiltersToUrl(latestFiltersRef.current, 'replace'),
      SEARCH_URL_DELAY_MS,
    );
    return () => clearTimeout(timeout);
  }, [
    router.isReady,
    filters.searchQuery,
    urlFilters.searchQuery,
    writeFiltersToUrl,
  ]);

  const setFilters = (nextFilters: EventFilterState) => {
    setFilterState(nextFilters);
    writeFiltersToUrl(nextFilters, 'push');
  };

  const setSearchQuery = (searchQuery: string) =>
    setFilterState((currentFilters) => ({ ...currentFilters, searchQuery }));

  return { filters, setFilters, setSearchQuery };
};
