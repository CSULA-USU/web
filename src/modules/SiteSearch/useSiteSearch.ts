import { useEffect, useMemo, useState } from 'react';
import { SEARCH_INDEX_URL, SearchEntry } from 'utils/siteSearch';

type SearchFunction = (query: string) => SearchEntry[];

let searchLoader: Promise<SearchFunction> | null = null;

/**
 * Fetches the index and MiniSearch together, once per page load. Safe to call
 * early — the nav does on hover and focus, so the index is usually ready by
 * the time the first letter is typed. A failed load is forgotten so the next
 * attempt retries instead of replaying the failure.
 */
export const loadSiteSearch = () => {
  if (!searchLoader) {
    searchLoader = Promise.all([
      import('utils/createSiteSearch'),
      fetch(SEARCH_INDEX_URL).then((response) => {
        if (!response.ok) {
          throw new Error(`Search index returned ${response.status}`);
        }
        return response.json() as Promise<SearchEntry[]>;
      }),
    ]).then(([{ createSiteSearch }, entries]) => createSiteSearch(entries));

    searchLoader.catch(() => {
      searchLoader = null;
    });
  }

  return searchLoader;
};

export type SiteSearchStatus = 'loading' | 'ready' | 'error';

export const useSiteSearch = (query: string) => {
  const [search, setSearch] = useState<SearchFunction | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let isMounted = true;

    loadSiteSearch()
      .then((loadedSearch) => isMounted && setSearch(() => loadedSearch))
      .catch(() => isMounted && setFailed(true));

    return () => {
      isMounted = false;
    };
  }, []);

  const results = useMemo(() => (search ? search(query) : []), [search, query]);
  const status: SiteSearchStatus = failed
    ? 'error'
    : search
    ? 'ready'
    : 'loading';

  return { results, status };
};
