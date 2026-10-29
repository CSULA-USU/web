const fs = require('fs');
const path = require('path');
const {
  getPublicPages,
  isHiddenRoute,
  normalizeRoute,
} = require('./public-routes');
const { readPageMetadata } = require('./page-metadata');

const BASE_URL = process.env.SITE_URL || 'https://www.calstatelausu.org';
const NAV_MAP_PATH = path.join(process.cwd(), 'src/data/navMap.json');
const OUTPUT_PATH = path.join(process.cwd(), 'public/sitemap.xml');

const walkNavMap = (items, collector) => {
  for (const item of items) {
    if (item.href && item.href.startsWith('/')) {
      const route = normalizeRoute(item.href);

      if (!isHiddenRoute(route)) {
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
      (route) =>
        `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <lastmod>${now}</lastmod>\n  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};

const main = () => {
  const pages = getPublicPages().filter((page) => !page.isDynamic);
  // A page that tells crawlers not to index it should not also be handed to
  // them in the sitemap. Filtered after the nav map is merged in, so a nav
  // link cannot put one back.
  const noindexRoutes = new Set(
    pages
      .filter(
        (page) => readPageMetadata(fs.readFileSync(page.file, 'utf8')).noindex,
      )
      .map((page) => page.route),
  );
  const fileRoutes = pages.map((page) => page.route);
  const navRoutes = getNavMapRoutes();
  const routes = ['/', ...fileRoutes, ...navRoutes].filter(
    (route) => !noindexRoutes.has(route),
  );

  const xml = buildXml(routes);
  fs.writeFileSync(OUTPUT_PATH, xml);

  console.log(
    `Generated sitemap with ${new Set(routes).size} routes at ${OUTPUT_PATH}`,
  );
};

main();
