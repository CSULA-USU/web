import fs from 'fs';
import overrides from 'data/search-overrides.json';
import { buildSearchIndex } from 'scripts/generate-search-index';
import { getPublicPages } from 'scripts/public-routes';
import { createSiteSearch } from 'utils/createSiteSearch';
import { displayUrl } from 'utils/siteSearch';

// Ranks against the real index, so these double as a check that the tags in
// search-overrides.json still send common queries to the right page.
const { entries } = buildSearchIndex({
  pages: getPublicPages(),
  readSource: (file: string) => fs.readFileSync(file, 'utf8'),
  overrides,
});
const search = createSiteSearch(entries);
const topResult = (query: string) => search(query)[0]?.url;

describe('createSiteSearch', () => {
  it('lists the page a query names first, ahead of pages that only mention it', () => {
    expect(topResult('ccc')).toBe('/ccc');
    expect(topResult('CCC')).toBe('/ccc');
    expect(topResult('csi')).toBe('/csi');
    expect(topResult('cultural grads')).toBe('/ccc/cultural-grads');
  });

  it('lists a page first for an alias from search-overrides.json', () => {
    expect(topResult('bod')).toBe('/board-of-directors');
    expect(topResult('greek life')).toBe('/csi/fsl');
  });

  it('forgives typos and partial words', () => {
    expect(topResult('recreaton')).toBe('/recreation');
    expect(topResult('stdent orgs')).toBe('/csi/student-orgs');
    expect(topResult('gree life')).toBe('/csi/fsl');
  });

  it('matches words in any order and ignores filler words', () => {
    expect(topResult('room reservation')).toBe('/operations/meeting-rooms');
    expect(topResult('where can I reserve a room')).toBe(
      '/operations/meeting-rooms',
    );
  });

  it('finds pages by their tags, not just their copy', () => {
    // The gym itself first, then how to get in. Ranking is sensitive to how
    // many tags a page has, so padding either page's tags can swap these.
    expect(
      search('gym')
        .slice(0, 2)
        .map((entry) => entry.url),
    ).toEqual(['/recreation', '/recreation/membership']);
    expect(topResult('jobs')).toBe('/employment');
    expect(topResult('pool table')).toBe('/recreation/game-room');
  });

  it('includes off-site pages listed in the overrides', () => {
    expect(topResult('donate')).toMatch(/^https:\/\//);
  });

  it('returns nothing for a query too short to mean anything', () => {
    expect(search('a')).toEqual([]);
    expect(search('   ')).toEqual([]);
  });
});

describe('displayUrl', () => {
  it('shows the site address for a page here, and only the host off-site', () => {
    expect(displayUrl('/recreation')).toBe('calstatelausu.org/recreation');
    expect(displayUrl('https://host.example.com/form?id=1')).toBe(
      'host.example.com',
    );
  });
});
