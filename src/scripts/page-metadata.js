// Reads what a page says about itself straight from its source file, for the
// build scripts that run before Next has rendered anything. Shared by the
// sitemap and the search index so the two agree on which pages opted out.

// Matches a JSX attribute's value when it is a plain literal: "…", '…',
// {'…'}, {"…"}, or a template literal with no ${} in it. Anything computed is
// skipped rather than guessed at, and the page falls back to its override.
const attributeValue = (source, name) => {
  const match = new RegExp(
    `\\b${name}=(?:"([^"]*)"|'([^']*)'|\\{\\s*(?:'([^']*)'|"([^"]*)"|\`([^\`$]*)\`)\\s*\\})`,
  ).exec(source);

  return match ? match.slice(1).find((value) => value !== undefined) : null;
};

const ENTITIES = {
  amp: '&',
  apos: "'",
  quot: '"',
  nbsp: ' ',
  ndash: '–',
  mdash: '—',
  lsquo: '‘',
  rsquo: '’',
  ldquo: '“',
  rdquo: '”',
};

const decodeEntities = (text) =>
  text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&([a-z]+);/g, (entity, name) => ENTITIES[name] ?? entity);

const tidy = (text) => decodeEntities(text).replace(/\s+/g, ' ').trim();

/**
 * Only a value that is noindex on every render counts: a bare `noindex` or
 * `noindex={true}` on <PageMeta>, or a literal robots meta tag. A computed
 * `noindex={!isLaunched}` cannot be read here and counts as indexable, so a
 * page that is not ready should say so with a literal, or be listed in
 * public-routes.js.
 */
const isNoindex = (pageMeta, source) => {
  const pageMetaNoindex = /\snoindex(?:=\{\s*true\s*\})?(?=\s|\/?>)/.test(
    pageMeta,
  );
  // Attribute order is not fixed, so each <meta> tag is read whole rather
  // than matched as `name=… content=…`.
  const robotsNoindex = Array.from(source.matchAll(/<meta\b[^>]*>/g)).some(
    ([tag]) =>
      attributeValue(tag, 'name') === 'robots' &&
      /\bnoindex\b/.test(attributeValue(tag, 'content') ?? ''),
  );

  return pageMetaNoindex || robotsNoindex;
};

/**
 * Reads a page's title, description, and noindex flag from either a
 * <PageMeta> or a hand-written <Head>. Static text only — a page that builds
 * its title at runtime yields null and needs a search override.
 */
const readPageMetadata = (source) => {
  const pageMeta = /<PageMeta\b[\s\S]*?\/>/.exec(source)?.[0] ?? '';
  const titleTag = /<title>([^<{]*)<\/title>/.exec(source)?.[1] ?? null;
  const descriptionTag =
    /<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/.exec(source)?.[0] ?? '';
  const title = attributeValue(pageMeta, 'title') ?? titleTag;
  const description =
    attributeValue(pageMeta, 'description') ??
    attributeValue(descriptionTag, 'content');

  return {
    // The tab title carries the site name after a pipe ("Membership | Cal
    // State LA U–SU"); in a list of results that is the same on every row.
    title: title ? tidy(title).split(' | ')[0] : null,
    description: description ? tidy(description) : null,
    noindex: isNoindex(pageMeta, source),
  };
};

module.exports = { readPageMetadata };
