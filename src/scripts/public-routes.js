const fs = require('fs');
const path = require('path');

const PAGES_DIR = path.join(process.cwd(), 'src/pages');

// The one place that decides which routes are hidden. The sitemap and the
// search index both read it, so a route kept out of one is kept out of the
// other — a backoffice page that leaked into search would be advertised to
// every visitor even though middleware still guards it.
const EXCLUDED_FIRST_SEGMENTS = new Set(['api', 'backoffice', '_edit']);
// /save-the-u is in testing and also noindexed in its page <Head>;
// remove it from here when the page launches.
const EXCLUDED_EXACT_ROUTES = new Set([
  '/404',
  '/graffix/backoffice',
  '/save-the-u',
]);
const EXCLUDED_ROUTE_PREFIXES = ['/graffix/backoffice'];

const normalizeRoute = (route) => {
  if (!route) {
    return '/';
  }

  const clean = route.replace(/\/+/g, '/').replace(/\/$/, '') || '/';

  return clean.startsWith('/') ? clean : `/${clean}`;
};

const isExcludedByPrefix = (route) =>
  EXCLUDED_ROUTE_PREFIXES.some(
    (prefix) => route === prefix || route.startsWith(`${prefix}/`),
  );

const isHiddenRoute = (route) => {
  const segments = route.split('/').filter(Boolean);

  // An underscore anywhere in the path marks a route as unlisted (_edit,
  // _u-krew, _[department]), not just in the first segment.
  if (segments.some((segment) => segment.startsWith('_'))) {
    return true;
  }

  if (segments.length > 0 && EXCLUDED_FIRST_SEGMENTS.has(segments[0])) {
    return true;
  }

  return EXCLUDED_EXACT_ROUTES.has(route) || isExcludedByPrefix(route);
};

/**
 * Every public page file under src/pages, as `{ route, file, isDynamic }`.
 * Dynamic routes (`/staff/[id]`) are returned with their brackets and flagged,
 * because the sitemap skips them while search validates concrete URLs against
 * them.
 *
 * @returns {{ route: string, file: string, isDynamic: boolean }[]}
 */
const getPublicPages = (dir = PAGES_DIR, baseDir = dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  /** @type {{ route: string, file: string, isDynamic: boolean }[]} */
  const pages = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      pages.push(...getPublicPages(fullPath, baseDir));
      continue;
    }

    if (!entry.name.endsWith('.tsx')) {
      continue;
    }

    if (entry.name === '_app.tsx' || entry.name === '_document.tsx') {
      continue;
    }

    const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
    let route = `/${relativePath.replace(/\.tsx$/, '')}`;

    if (route.endsWith('/index')) {
      route = route.slice(0, -'/index'.length) || '/';
    }

    route = normalizeRoute(route);

    if (isHiddenRoute(route)) {
      continue;
    }

    pages.push({
      route,
      file: fullPath,
      isDynamic: route.includes('[') || route.includes(']'),
    });
  }

  return pages;
};

module.exports = {
  PAGES_DIR,
  getPublicPages,
  isExcludedByPrefix,
  isHiddenRoute,
  normalizeRoute,
};
