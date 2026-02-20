const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.SITE_URL || 'https://www.calstatelausu.org';
const PAGES_DIR = path.join(process.cwd(), 'src/pages');
const NAV_MAP_PATH = path.join(process.cwd(), 'src/data/navMap.json');
const OUTPUT_PATH = path.join(process.cwd(), 'public/sitemap.xml');

const EXCLUDED_FIRST_SEGMENTS = new Set(['api', 'backoffice', '_edit']);
const EXCLUDED_EXACT_ROUTES = new Set(['/404', '/graffix/backoffice']);
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

const getRoutesFromFiles = (dir, baseDir = dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const routes = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      routes.push(...getRoutesFromFiles(fullPath, baseDir));
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
      route = route.slice(0, -('/index'.length)) || '/';
    }

    if (route.includes('[') || route.includes(']')) {
      continue;
    }

    const segments = route.split('/').filter(Boolean);
    if (segments.length > 0) {
      const firstSegment = segments[0];

      if (segments.some((segment) => segment.startsWith('_'))) {
        continue;
      }

      if (EXCLUDED_FIRST_SEGMENTS.has(firstSegment)) {
        continue;
      }
    }

    route = normalizeRoute(route);

    if (EXCLUDED_EXACT_ROUTES.has(route)) {
      continue;
    }

    if (isExcludedByPrefix(route)) {
      continue;
    }

    routes.push(route);
  }

  return routes;
};

const walkNavMap = (items, collector) => {
  for (const item of items) {
    if (item.href && item.href.startsWith('/')) {
      const route = normalizeRoute(item.href);

      if (!isExcludedByPrefix(route) && !EXCLUDED_EXACT_ROUTES.has(route)) {
        collector.add(route);
      }
    }

    if (Array.isArray(item.sub) && item.sub.length > 0) {
      walkNavMap(item.sub, collector);
    }
  }
};

const getNavMapRoutes = () => {
  if (!fs.existsSync(NAV_MAP_PATH)) {
    return [];
  }

  const data = JSON.parse(fs.readFileSync(NAV_MAP_PATH, 'utf8'));
  const routes = new Set();

  if (Array.isArray(data)) {
    walkNavMap(data, routes);
  }

  return Array.from(routes);
};

const buildXml = (routes) => {
  const now = new Date().toISOString();
  const sortedRoutes = Array.from(new Set(routes)).sort((a, b) =>
    a.localeCompare(b),
  );

  const urls = sortedRoutes
    .map(
      (route) => `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

const main = () => {
  const fileRoutes = getRoutesFromFiles(PAGES_DIR);
  const navRoutes = getNavMapRoutes();
  const routes = ['/', ...fileRoutes, ...navRoutes];

  const xml = buildXml(routes);
  fs.writeFileSync(OUTPUT_PATH, xml);

  console.log(`Generated sitemap with ${new Set(routes).size} routes at ${OUTPUT_PATH}`);
};

main();