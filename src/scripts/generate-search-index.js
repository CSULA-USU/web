const fs = require('fs');
const path = require('path');
const { readPageMetadata } = require('./page-metadata');
const { getPublicPages, isHiddenRoute } = require('./public-routes');

const OVERRIDES_PATH = path.join(
  process.cwd(),
  'src/data/search-overrides.json',
);
const OUTPUT_PATH = path.join(process.cwd(), 'public/search-index.json');

const titleFromRoute = (route) =>
  (route.split('/').filter(Boolean).pop() ?? 'Home')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const dynamicRoutePattern = (route) =>
  new RegExp(`^${route.replace(/\[[^\]]+\]/g, '[^/]+')}$`);

// The same rule as normalizeName in src/utils/siteSearch.ts, which compares
// what people type against these. Change both together.
const normalizeName = (text) =>
  text
    .toLowerCase()
    .replace(/[-\s]+/g, ' ')
    .trim();

// A page is called by the last segment of its URL — on this site that is
// usually the acronym people search for (/ccc, /csi, /gsrc). Off-site pages
// and the home page have no such segment, only whatever aliases they are given.
// `nameFromUrl: false` drops it, for a page whose URL ends in a word that
// should not lead to it alone (/ccc/cultural-grads/pride and "pride").
const namesFor = (url, aliases, nameFromUrl) => {
  const slug =
    nameFromUrl && url.startsWith('/') ? url.split('/').pop() ?? '' : '';
  return Array.from(
    new Set([slug, ...aliases].map(normalizeName).filter(Boolean)),
  );
};

// Every key an override may carry. Anything else is rejected rather than
// ignored, so a misspelled `nameFromURL` fails the build instead of quietly
// leaving the page with the name it was meant to drop.
const OVERRIDE_KEYS = new Set([
  'url',
  'title',
  'description',
  'tags',
  'aliases',
  'nameFromUrl',
]);

/**
 * Builds the search index from every public page plus the hand-written
 * overrides. Returns `{ entries, warnings }`; throws when an override points
 * somewhere search must not send people — a hidden route, a noindexed page,
 * or a URL no page serves — or when two pages claim the same name.
 *
 * An override is `{ url, title?, description?, tags?, aliases?, nameFromUrl? }`.
 * Tags are words a page relates to; aliases are names the page itself goes
 * by, and searching one exactly lists that page first. An alias belongs to one
 * page — a word several pages share is a tag. `nameFromUrl: false` stops the
 * end of the URL counting as a name, which also frees it for another page's
 * alias.
 */
const buildSearchIndex = ({ pages, readSource, overrides }) => {
  const warnings = [];
  const errors = [];
  const entries = new Map();
  const noindexRoutes = new Set();

  for (const page of pages.filter((candidate) => !candidate.isDynamic)) {
    const metadata = readPageMetadata(readSource(page.file));

    if (metadata.noindex) {
      noindexRoutes.add(page.route);
      continue;
    }

    entries.set(page.route, {
      url: page.route,
      title: metadata.title,
      description: metadata.description,
      tags: [],
      aliases: [],
      nameFromUrl: true,
    });
  }

  const dynamicPatterns = pages
    .filter((page) => page.isDynamic)
    .map((page) => dynamicRoutePattern(page.route));

  for (const override of overrides) {
    const { url } = override;
    const isExternal = /^https?:\/\//.test(url);
    const unknownKeys = Object.keys(override).filter(
      (key) => !OVERRIDE_KEYS.has(key),
    );

    if (unknownKeys.length > 0) {
      errors.push(`${url} has unknown field(s): ${unknownKeys.join(', ')}.`);
      continue;
    }

    if (
      override.nameFromUrl !== undefined &&
      typeof override.nameFromUrl !== 'boolean'
    ) {
      errors.push(`${url} has a nameFromUrl that is not true or false.`);
      continue;
    }

    if (!isExternal && (isHiddenRoute(url) || noindexRoutes.has(url))) {
      errors.push(`${url} is hidden or noindexed and must not be searchable.`);
      continue;
    }

    const existing = entries.get(url);
    const servedByDynamicRoute =
      !isExternal && dynamicPatterns.some((pattern) => pattern.test(url));

    if (!existing && !isExternal && !servedByDynamicRoute) {
      errors.push(`${url} has an override, but no page serves it.`);
      continue;
    }

    // Generated entries already have a title and description to fall back on;
    // these do not, so the override has to supply both.
    if (!existing && (!override.title || !override.description)) {
      errors.push(`${url} needs both a title and a description.`);
      continue;
    }

    entries.set(url, {
      url,
      title: override.title ?? existing.title,
      description: override.description ?? existing.description,
      tags: override.tags ?? [],
      aliases: override.aliases ?? [],
      nameFromUrl: override.nameFromUrl ?? true,
    });
  }

  // An array, never the Map's own iterator: Jest compiles this file to ES5,
  // where for…of over an iterator runs zero times without an error, and
  // every check below would pass without looking at a single page.
  const entryList = Array.from(entries.values());

  for (const entry of entryList) {
    if (!entry.title) {
      entry.title = titleFromRoute(entry.url);
      warnings.push(
        `${entry.url} has no static <title>; using "${entry.title}". Add an override in search-overrides.json.`,
      );
    }

    if (!entry.description) {
      entry.description = '';
      warnings.push(
        `${entry.url} has no static description. Add an override in search-overrides.json.`,
      );
    }
  }

  const pageByName = new Map();

  for (const entry of entryList) {
    entry.names = namesFor(entry.url, entry.aliases, entry.nameFromUrl);
    delete entry.aliases;
    delete entry.nameFromUrl;

    for (const name of entry.names) {
      const claimedBy = pageByName.get(name);
      if (claimedBy) {
        errors.push(
          `"${name}" names both ${claimedBy} and ${entry.url}; an alias can only point to one page.`,
        );
      }
      pageByName.set(name, entry.url);
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `search-overrides.json has ${errors.length} problem(s):\n  ${errors.join(
        '\n  ',
      )}`,
    );
  }

  return {
    entries: entryList.sort((a, b) => a.url.localeCompare(b.url, 'en')),
    warnings,
  };
};

const main = () => {
  const { entries, warnings } = buildSearchIndex({
    pages: getPublicPages(),
    readSource: (file) => fs.readFileSync(file, 'utf8'),
    overrides: JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf8')),
  });

  warnings.forEach((warning) => console.warn(`search index: ${warning}`));
  fs.writeFileSync(OUTPUT_PATH, `${JSON.stringify(entries)}\n`);
  console.log(
    `Generated search index with ${entries.length} pages at ${OUTPUT_PATH}`,
  );
};

if (require.main === module) {
  main();
}

module.exports = { buildSearchIndex };
