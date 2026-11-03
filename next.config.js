const { withNextVideo } = require('next-video/process');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // You’re using styled-components — keep SWC transform on for correct SSR.
  compiler: {
    styledComponents: true,
  },
  images: {
    // Hostname-only on purpose: an omitted protocol/port/pathname matches
    // anything, which is exactly what the deprecated `domains` list allowed.
    // Several of these URLs come from external data (Presence, JotForm), so
    // check real URLs before adding `protocol` or `pathname` — a narrower
    // pattern silently breaks any image that falls outside it.
    remotePatterns: [
      { hostname: 'calstatela-cdn.presence.io' },
      { hostname: 'www.jotform.com' },
      { hostname: 'i.imgur.com' },
      { hostname: 'media.giphy.com' },
      { hostname: 'www.dropbox.com' },
      { hostname: 'bubqscxokeycpuuoqphp.supabase.co' },
    ],

    // ✅ Cost savers (Vercel’s recommendations):
    // Cache transformed results longer to cut repeat work/writes.
    minimumCacheTTL: 2678400, // 31 days

    // Reduce formats -> fewer variants per image.
    // (WebP covers modern browsers well; drop AVIF for now.)
    formats: ['image/webp'],

    // Generate fewer width variants globally.
    deviceSizes: [360, 768, 1024],
    imageSizes: [400],

    // Every `quality` a page requests must be listed. Since Next 16 the
    // default allows only 75, and anything else is silently rounded to the
    // nearest listed value — /save-the-u's parallax photos ask for 50.
    qualities: [50, 75],
  },

  async redirects() {
    return [
      // The campaign page was renamed after /keep-the-u-open had already gone
      // out on flyers and emails, so the old URL must keep resolving. Query
      // strings (UTM tags) carry through. Temporary while the page is in
      // testing, because browsers cache a permanent redirect indefinitely and
      // a second rename would strand them; flip to `permanent: true` at launch.
      {
        source: '/keep-the-u-open',
        destination: '/save-the-u',
        permanent: false,
      },
      // A guessable short URL that 404'd; room reservations live on the
      // meeting-rooms page, and that is where they will stay. Permanent, so
      // search engines fold the short URL into the real page — which also
      // means browsers cache it, so a real /reservations page later would
      // need this entry removed and would still miss returning visitors.
      {
        source: '/reservations',
        destination: '/operations/meeting-rooms',
        permanent: true,
      },
    ];
  },
};

// Apply next-video wrapper
const videoConfig = withNextVideo(nextConfig);

// The app builds with webpack (`--webpack` in package.json) until Turbopack is
// validated on its own, so next-video's Turbopack rules have no job yet.
// Moving to Turbopack means removing this line along with the flag: without
// those rules, Turbopack has no loader for the video files.
delete videoConfig.turbopack;

module.exports = {
  ...videoConfig,
};
