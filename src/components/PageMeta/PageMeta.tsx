import Head from 'next/head';

export const SITE_URL = 'https://www.calstatelausu.org';

// Link-preview crawlers — Microsoft Teams especially — do not resolve relative
// paths and drop the image entirely when they see one, so every URL here is
// absolute. This is the single place the fallback card image is defined; the
// baseline tags in _app.tsx point at the same asset.
export const FALLBACK_CARD_IMAGE = {
  url: `${SITE_URL}/about/calstatela-hero.jpeg`,
  alt: 'The Cal State LA University-Student Union Building',
  width: 1000,
  height: 710,
};

interface PageMetaProps {
  /** Browser tab title, and the social headline unless socialTitle overrides it. */
  title: string;
  description: string;
  /** Route path starting with a slash, e.g. "/staff". Drives og:url and canonical. */
  path: string;
  /** Social headline, when it should read differently from the tab title. */
  socialTitle?: string;
  /** Social blurb, when it should read differently from the description. */
  socialDescription?: string;
  /** Absolute URL. Falls back to FALLBACK_CARD_IMAGE when omitted. */
  imageUrl?: string;
  imageAlt?: string;
  /** Declare both dimensions so Teams can size the card without fetching first. */
  imageWidth?: number;
  imageHeight?: number;
  type?: 'website' | 'article' | 'profile';
  /** Keep the page out of search results — error and search-results pages. */
  noindex?: boolean;
}

/**
 * Emits the full set of SEO and link-preview tags for a page.
 *
 * Every tag carries a `key`, matching the keys used by the site-wide baseline in
 * _app.tsx, so a page's tag replaces the baseline rather than appending a second
 * copy. A duplicate og:image is what broke Teams previews before: the crawler
 * reads the first tag it finds, which was the generic site-wide one.
 */
export const PageMeta = ({
  title,
  description,
  path,
  socialTitle,
  socialDescription,
  imageUrl,
  imageAlt,
  imageWidth,
  imageHeight,
  type = 'website',
  noindex = false,
}: PageMetaProps) => {
  const url = `${SITE_URL}${path}`;
  const usingFallbackImage = !imageUrl;
  const image = imageUrl ?? FALLBACK_CARD_IMAGE.url;
  const alt = imageAlt ?? (usingFallbackImage ? FALLBACK_CARD_IMAGE.alt : '');
  // Only claim dimensions we actually know. A wrong width/height renders a
  // stretched card, which is worse than making the crawler measure the file.
  const width = usingFallbackImage ? FALLBACK_CARD_IMAGE.width : imageWidth;
  const height = usingFallbackImage ? FALLBACK_CARD_IMAGE.height : imageHeight;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} key="description" />
      {noindex && <meta name="robots" content="noindex" key="robots" />}

      {/* Open Graph / Social Media */}
      <meta property="og:title" content={socialTitle ?? title} key="og-title" />
      <meta
        property="og:description"
        content={socialDescription ?? description}
        key="og-desc"
      />
      <meta property="og:type" content={type} key="og-type" />
      <meta property="og:url" content={url} key="og-url" />
      <meta property="og:image" content={image} key="og-image" />
      {alt && <meta property="og:image:alt" content={alt} key="og-image-alt" />}
      {width && (
        <meta
          property="og:image:width"
          content={String(width)}
          key="og-image-width"
        />
      )}
      {height && (
        <meta
          property="og:image:height"
          content={String(height)}
          key="og-image-height"
        />
      )}

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter-card"
      />
      <link rel="canonical" href={url} key="canonical" />
    </Head>
  );
};
