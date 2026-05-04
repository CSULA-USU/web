const { withNextVideo } = require('next-video/process');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // You’re using styled-components — keep SWC transform on for correct SSR.
  compiler: {
    styledComponents: true,
  },
  images: {
    // ✅ Keep your existing allowlist exactly as-is to avoid breaking anything.
    // (You can tighten this later to reduce transformations further.)
    domains: [
      'calstatela-cdn.presence.io',
      'www.jotform.com',
      'i.imgur.com',
      'media.giphy.com',
      'www.dropbox.com',
      'bubqscxokeycpuuoqphp.supabase.co',
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
  },
};

// Apply next-video wrapper
const videoConfig = withNextVideo(nextConfig);

// Remove turbopack config that Next.js 13.5.10 doesn't understand
delete videoConfig.turbopack;

module.exports = {
  ...videoConfig,
  async redirects() {
    return [
      {
        source: '/ccc/nuestra-grad',
        destination:
          'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/cultural-grads/NativeGrad_DigitalBooklet_D2.pdf',
        permanent: true,
      },
      {
        source: '/ccc/black-grad',
        destination:
          'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/cultural-grads/NativeGrad_DigitalBooklet_D2.pdf',
        permanent: true,
      },
      {
        source: '/ccc/apida-grad',
        destination:
          'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/cultural-grads/NativeGrad_DigitalBooklet_D2.pdf',
        permanent: true,
      },
      {
        source: '/ccc/pride-grad',
        destination:
          'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/cultural-grads/NativeGrad_DigitalBooklet_D2.pdf',
        permanent: true,
      },
      {
        source: '/ccc/indigi-grad',
        destination:
          'https://bubqscxokeycpuuoqphp.supabase.co/storage/v1/object/public/pages/cultural-grads/NativeGrad_DigitalBooklet_D2.pdf',
        permanent: true,
      },
    ];
  },
};
