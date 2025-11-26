const { withNextVideo } = require('next-video/process');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // You’re using styled-components — keep SWC transform on for correct SSR.
  compiler: {
    styledComponents: true,
  },
  webpack: (config, options) => {
    if (options.isServer) {
      // Handle both CommonJS and ESM externals
      if (Array.isArray(config.externals)) {
        config.externals.push('player.style');
      } else if (typeof config.externals === 'function') {
        const originalExternals = config.externals;
        config.externals = async (context, request, callback) => {
          if (request === 'player.style') {
            return callback(null, 'commonjs ' + request);
          }
          return originalExternals(context, request, callback);
        };
      } else {
        config.externals = [config.externals, 'player.style'];
      }
    }
    return config;
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
  // Add experimental flag for ESM externals
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['player.style', 'next-video'],
  },
};

module.exports = withNextVideo(nextConfig);
