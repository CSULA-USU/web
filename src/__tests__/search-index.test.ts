import fs from 'fs';
import overrides from 'data/search-overrides.json';
import { buildSearchIndex } from 'scripts/generate-search-index';
import { readPageMetadata } from 'scripts/page-metadata';
import { normalizeName } from 'utils/siteSearch';
import { getPublicPages, isHiddenRoute } from 'scripts/public-routes';

const readSource = (file: string) => fs.readFileSync(file, 'utf8');

const fakePage = (route: string) => ({
  route,
  file: route,
  isDynamic: route.includes('['),
});

const withTitle = (title: string) =>
  `<PageMeta title="${title}" description="About ${title}." path="/" />`;

describe('the generated search index', () => {
  const pages = getPublicPages();
  const { entries, warnings } = buildSearchIndex({
    pages,
    readSource,
    overrides,
  });
  const urls = entries.map((entry) => entry.url);

  it('builds from the real pages and overrides without a fallback', () => {
    // A warning means a page has no static title or description, so its
    // result would show a title guessed from its URL. Fix the page, or give
    // it an override in src/data/search-overrides.json.
    expect(warnings).toEqual([]);
  });

  it('writes names in the form the browser compares queries in', () => {
    // The generator and utils/siteSearch.ts each carry the normalizing rule;
    // this is what notices if one changes without the other.
    entries
      .flatMap((entry) => entry.names)
      .forEach((name) => expect(name).toBe(normalizeName(name)));
  });

  it('never lists a hidden route', () => {
    const internalUrls = urls.filter((url) => url.startsWith('/'));

    expect(internalUrls.filter(isHiddenRoute)).toEqual([]);
    expect(internalUrls).not.toContain('/search');
    expect(
      internalUrls.filter((url) =>
        /^\/(api|backoffice|graffix\/backoffice)(\/|$)/.test(url),
      ),
    ).toEqual([]);
  });

  it('lists every public page that is not noindexed, without an override', () => {
    const indexablePages = pages.filter(
      (page) =>
        !page.isDynamic && !readPageMetadata(readSource(page.file)).noindex,
    );

    expect(indexablePages.length).toBeGreaterThan(40);
    indexablePages.forEach((page) => expect(urls).toContain(page.route));
  });
});

describe('buildSearchIndex', () => {
  const build = (overrideEntries: object[]) =>
    buildSearchIndex({
      pages: [
        fakePage('/recreation'),
        fakePage('/search'),
        fakePage('/ccc/cultural-grads/[id]'),
      ],
      readSource: (file: string) =>
        file === '/search'
          ? '<PageMeta title="Search" description="x" path="/search" noindex />'
          : withTitle('Recreation'),
      overrides: overrideEntries,
    });

  it('lets an override replace page copy and add tags and aliases', () => {
    const { entries } = build([
      {
        url: '/recreation',
        title: 'Rec',
        tags: ['gym'],
        aliases: ['Rec Center'],
      },
    ]);

    expect(entries).toEqual([
      {
        url: '/recreation',
        title: 'Rec',
        description: 'About Recreation.',
        tags: ['gym'],
        names: ['recreation', 'rec center'],
      },
    ]);
  });

  it('names a page by the end of its URL, and an off-site page only by its aliases', () => {
    const { entries } = build([
      {
        url: '/ccc/cultural-grads/pride',
        title: 'Pride Grad',
        description: 'Pride graduation.',
      },
      {
        url: 'https://example.org/give',
        title: 'Giving',
        description: 'Give.',
        aliases: ['donate'],
      },
    ]);
    const namesByUrl = Object.fromEntries(
      entries.map((entry) => [entry.url, entry.names]),
    );

    expect(namesByUrl['/ccc/cultural-grads/pride']).toEqual(['pride']);
    expect(namesByUrl['https://example.org/give']).toEqual(['donate']);
  });

  it('drops the URL name when an override opts out, keeping its aliases', () => {
    const { entries } = build([
      {
        url: '/recreation',
        nameFromUrl: false,
        aliases: ['rec'],
      },
    ]);

    expect(entries[0].names).toEqual(['rec']);
  });

  it('frees an opted-out URL name for another page to claim as an alias', () => {
    const pride = {
      url: '/ccc/cultural-grads/pride',
      title: 'Pride Grad',
      description: 'Pride graduation.',
    };

    expect(() =>
      build([pride, { url: '/recreation', aliases: ['pride'] }]),
    ).toThrow('"pride" names both');
    expect(() =>
      build([
        { ...pride, nameFromUrl: false },
        { url: '/recreation', aliases: ['pride'] },
      ]),
    ).not.toThrow();
  });

  it('rejects a field it does not know, so a typo cannot be silently ignored', () => {
    expect(() => build([{ url: '/recreation', nameFromURL: false }])).toThrow(
      '/recreation has unknown field(s): nameFromURL.',
    );
    expect(() => build([{ url: '/recreation', nameFromUrl: 'no' }])).toThrow(
      '/recreation has a nameFromUrl that is not true or false.',
    );
  });

  it('rejects an alias that another page already goes by', () => {
    expect(() =>
      build([
        {
          url: '/ccc/cultural-grads/pride',
          title: 'Pride Grad',
          description: 'Pride graduation.',
          aliases: ['Recreation'],
        },
      ]),
    ).toThrow('"recreation" names both');
  });

  it('rejects an override for a page that no longer exists', () => {
    expect(() =>
      build([{ url: '/board-of-directors/meet-the-board', tags: [] }]),
    ).toThrow(
      '/board-of-directors/meet-the-board has an override, but no page serves it.',
    );
  });

  it('rejects an override that would expose a hidden route', () => {
    expect(() =>
      build([{ url: '/backoffice', title: 'x', description: 'x' }]),
    ).toThrow('/backoffice is hidden or noindexed');
    expect(() =>
      build([{ url: '/_edit', title: 'x', description: 'x' }]),
    ).toThrow('/_edit is hidden or noindexed');
  });

  it('rejects an override for a page that opted out with noindex', () => {
    expect(() => build([{ url: '/search', tags: ['find'] }])).toThrow(
      '/search is hidden or noindexed',
    );
  });

  it('accepts a URL a dynamic route serves only with its own title and description', () => {
    expect(() =>
      build([{ url: '/ccc/cultural-grads/pride', tags: ['pride'] }]),
    ).toThrow(
      '/ccc/cultural-grads/pride needs both a title and a description.',
    );

    const { entries } = build([
      {
        url: '/ccc/cultural-grads/pride',
        title: 'Pride Grad',
        description: 'Pride graduation.',
      },
    ]);
    expect(entries.map((entry) => entry.url)).toContain(
      '/ccc/cultural-grads/pride',
    );
  });

  it('accepts an off-site URL with a title and description', () => {
    const { entries } = build([
      {
        url: 'https://example.org/give',
        title: 'Giving',
        description: 'Give.',
      },
    ]);
    expect(entries.map((entry) => entry.url)).toContain(
      'https://example.org/give',
    );
  });
});
