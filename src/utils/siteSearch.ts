// Kept apart from createSiteSearch so the nav can import these without pulling
// MiniSearch into every page's bundle; the index and the library load only
// once someone actually searches.

/** One page in `public/search-index.json`, as written by generate-search-index. */
export type SearchEntry = {
  /** A site path ("/recreation"), or an absolute URL for an off-site page. */
  url: string;
  title: string;
  description: string;
  /** Words the page relates to. Found by these, but not ranked first for them. */
  tags: string[];
  /**
   * What the page itself is called, lowercased with dashes as spaces: the last
   * segment of its URL ("ccc"), unless its override sets `nameFromUrl: false`,
   * plus any `aliases` from search-overrides.json ("bod"). Searching one
   * exactly puts this page first; see createSiteSearch.
   */
  names: string[];
};

/**
 * Lowercases and treats dashes as spaces, so "Cultural-Grads", "cultural
 * grads", and the slug `cultural-grads` all compare equal. The index
 * generator writes names in this form.
 */
export const normalizeName = (text: string) =>
  text
    .toLowerCase()
    .replace(/[-\s]+/g, ' ')
    .trim();

/** Generated before `dev` and `build` by src/scripts/generate-search-index.js. */
export const SEARCH_INDEX_URL = '/search-index.json';

/** Shorter queries match too much to be useful — "a" prefixes half the site. */
export const MIN_QUERY_LENGTH = 2;

export const isExternalUrl = (url: string) => /^https?:\/\//.test(url);

/** The address shown under a result, so people can see where it goes. */
export const displayUrl = (url: string) =>
  isExternalUrl(url) ? new URL(url).hostname : `calstatelausu.org${url}`;
