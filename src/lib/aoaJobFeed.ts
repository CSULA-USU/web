import { Redis } from '@upstash/redis';
import Parser from 'rss-parser';
import sanitizeHtml from 'sanitize-html';
import type { AoaJobListing, FullTimeEmploymentResponse } from 'types';

const FEED_URL =
  'https://csuaoa.org/?feed=job_feed&job_types&search_location&job_categories=los-angeles&search_keywords';

/**
 * The feed covers every Los Angeles auxiliary, not just ours. This is the
 * listing's own `job_listing:location` term, set by the AOA job board rather
 * than typed into the description — so unlike matching "University-Student
 * Union" in the prose, it cannot be broken by HR rewording a sentence or
 * abbreviating to "U-SU" on first reference.
 */
const USU_LOCATION = 'usu-losangeles';

const CACHE_KEY = 'employment:fulltime:last-good';

/**
 * How long a cached result may stand in for a live fetch while AOA is
 * unreachable. Postings run for weeks, so hours-old data is still accurate;
 * past a day we would rather show the error state than vouch for it.
 */
const MAX_STALE_MS = 24 * 60 * 60 * 1000;

type JobFeedItem = {
  'job_listing:location'?: string;
  'content:encoded'?: string;
};

/** The bullet character HR's postings use. Not a general list parser. */
const BULLET = '•';

/** A line that is nothing but a bolded label is a section heading. */
const HEADING_LINE = /^<strong>(.+)<\/strong>$/;

/** Block markup only appears if AOA stops shipping Word-pasted plain text. */
const ALREADY_STRUCTURED = /<(p|br|ul|ol|li|h[1-6])\b/i;

/**
 * Rebuilds paragraphs and lists from a posting that carries neither.
 *
 * HR pastes these out of a Word document, so the body arrives hard-wrapped at
 * whatever column Word used — the newlines fall mid-sentence, and a long bullet
 * strands its last word or two on a line of its own. Honoring those newlines
 * (`white-space: pre-line`, the obvious first try) reproduces Word's line
 * breaks at our width, which is why the text broke at ~90 characters no matter
 * how wide the modal was.
 *
 * So only *blank* lines are real structure. Single newlines are wrapping
 * artifacts and get joined back into flowing text the browser can re-wrap.
 */
export const restorePostingStructure = (text: string): string => {
  if (ALREADY_STRUCTURED.test(text)) return text;

  const blocks: string[] = [];
  let paragraph: string[] = [];
  let items: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(`<p>${paragraph.join(' ')}</p>`);
      paragraph = [];
    }
  };

  const flushList = () => {
    if (items.length) {
      blocks.push(
        `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`,
      );
      items = [];
    }
  };

  const flush = () => {
    flushParagraph();
    flushList();
  };

  text
    .replace(/\r\n/g, '\n')
    .split('\n')
    .forEach((rawLine) => {
      const line = rawLine.trim();
      const heading = line.match(HEADING_LINE);

      if (!line) {
        flush();
      } else if (heading) {
        flush();
        // h3 because the modal spends h2 on the job title.
        blocks.push(`<h3>${heading[1]}</h3>`);
      } else if (line.startsWith(BULLET)) {
        // Only the paragraph closes here — flushing the list too would end it
        // at every bullet and emit a separate <ul> per item.
        flushParagraph();
        items.push(line.slice(BULLET.length).trim());
      } else if (items.length) {
        // Not a new bullet, so this is the tail of the one above it.
        items[items.length - 1] += ` ${line}`;
      } else {
        paragraph.push(line);
      }
    });

  flush();
  return blocks.join('');
};

/**
 * Everything the posting needs and nothing it does not. The body is pasted in
 * from email, so it arrives carrying Outlook's `OWAAutoLink` ids, classes and
 * `data-olk-*` attributes — a stray `class` would otherwise collide with our
 * styled-components hashes. An allowlist drops all of it, along with anything
 * a compromised csuaoa.org might inject, since this HTML renders on our origin.
 *
 * Runs last, so the markup `restorePostingStructure` adds is validated too.
 */
export const sanitizeJobDescription = (html: string): string =>
  sanitizeHtml(html, {
    allowedTags: [
      'p',
      'br',
      'strong',
      'b',
      'em',
      'i',
      'ul',
      'ol',
      'li',
      'a',
      'h3',
    ],
    // target and rel are here because the allowlist runs after transformTags
    // and would otherwise strip the very attributes it adds. simpleTransform
    // overwrites rather than merges, so AOA cannot set its own values.
    allowedAttributes: { a: ['href', 'target', 'rel'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', {
        target: '_blank',
        rel: 'noopener noreferrer',
      }),
    },
  });

export const toJobListings = (
  items: (Parser.Item & JobFeedItem)[],
): AoaJobListing[] =>
  items
    .filter((item) => item['job_listing:location'] === USU_LOCATION)
    .map((item) => ({
      id: item.guid || item.link || item.title || '',
      title: item.title || '',
      link: item.link || '',
      postedAt: item.isoDate || '',
      descriptionHtml: sanitizeJobDescription(
        restorePostingStructure(item['content:encoded'] || ''),
      ),
    }));

// Built per call rather than at module scope so importing this module does not
// require Upstash credentials to be present — a local build without them still
// serves live results, just with no last-known-good to fall back on.
const getRedis = () => Redis.fromEnv();

/**
 * Throws only when AOA is unreachable *and* no usable cached result exists.
 * Callers render their error state on a throw.
 */
export const fetchFullTimeJobs =
  async (): Promise<FullTimeEmploymentResponse> => {
    const parser = new Parser<unknown, JobFeedItem>({
      customFields: { item: ['job_listing:location'] },
    });

    try {
      const feed = await parser.parseURL(FEED_URL);
      const payload: FullTimeEmploymentResponse = {
        jobs: toJobListings(feed.items),
        stale: false,
        fetchedAt: new Date().toISOString(),
      };

      // A feed that parsed is authoritative even when it is empty: a filled
      // position produces a *successful* response without it, which is how
      // "the job closed" stays distinguishable from "AOA is down". Only a
      // failed fetch below falls back, because only then did we learn nothing.
      try {
        await getRedis().set(CACHE_KEY, payload);
      } catch {
        // A cache write failure must not fail a result we can already return.
      }

      return payload;
    } catch {
      const cached = await getRedis().get<FullTimeEmploymentResponse>(
        CACHE_KEY,
      );
      const age = cached ? Date.now() - Date.parse(cached.fetchedAt) : Infinity;

      if (cached && age < MAX_STALE_MS) {
        return { ...cached, stale: true };
      }

      throw new Error('Unable to reach the AOA job feed.');
    }
  };
