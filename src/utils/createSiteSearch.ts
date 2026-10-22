import MiniSearch from 'minisearch';
import { MIN_QUERY_LENGTH, SearchEntry, normalizeName } from './siteSearch';

// Dropped from queries only, so "where can I reserve a room" searches for
// "reserve room". Left in, prefix matching lets "a" or "i" match nearly every
// page, which drowns the words that carry the meaning.
const QUERY_STOP_WORDS = new Set([
  'a',
  'an',
  'and',
  'are',
  'at',
  'can',
  'do',
  'for',
  'how',
  'i',
  'in',
  'is',
  'my',
  'of',
  'on',
  'or',
  'the',
  'to',
  'what',
  'where',
]);

const processQueryTerm = (term: string) => {
  const lower = term.toLowerCase();
  return QUERY_STOP_WORDS.has(lower) ? null : lower;
};

/**
 * Builds a search function over the index. Every word must match, so "student
 * orgs" means student organizations rather than anything student-related; only
 * when that finds nothing does it fall back to any word matching, so a
 * question phrased in words no page uses still turns up something close.
 *
 * Above all of that, a query that is exactly a page's name ("ccc", "bod",
 * "cultural grads") lists that page first. Scores alone cannot promise this:
 * a hub page shares its acronym with every page beneath it, and a long tag
 * list waters down each tag, so /ccc used to rank below its own children.
 */
export const createSiteSearch = (entries: SearchEntry[]) => {
  const entriesByUrl = new Map(entries.map((entry) => [entry.url, entry]));
  const entriesByName = new Map(
    entries.flatMap((entry) =>
      entry.names.map((name) => [name, entry] as const),
    ),
  );
  const index = new MiniSearch<SearchEntry>({
    idField: 'url',
    fields: ['title', 'names', 'description', 'tags'],
    extractField: (entry, field) => {
      const value = entry[field as keyof SearchEntry];
      return Array.isArray(value) ? value.join(' ') : value;
    },
    searchOptions: {
      // Titles, names, and tags are written to be searched; descriptions
      // mention a lot of things in passing.
      boost: { title: 3, names: 3, tags: 2 },
      prefix: true,
      fuzzy: 0.2,
      processTerm: processQueryTerm,
    },
  });
  index.addAll(entries);

  return (query: string): SearchEntry[] => {
    const trimmed = query.trim();

    if (trimmed.length < MIN_QUERY_LENGTH) {
      return [];
    }

    const allWords = index.search(trimmed, { combineWith: 'AND' });
    const results =
      allWords.length > 0
        ? allWords
        : index.search(trimmed, { combineWith: 'OR' });

    const ranked = results
      .map((result) => entriesByUrl.get(result.id))
      .filter((entry): entry is SearchEntry => entry !== undefined);
    const namedEntry = entriesByName.get(normalizeName(trimmed));

    return namedEntry
      ? [namedEntry, ...ranked.filter((entry) => entry !== namedEntry)]
      : ranked;
  };
};
