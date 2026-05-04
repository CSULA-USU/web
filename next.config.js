const { withNextVideo } = require('next-video/process');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },

  images: {
    domains: [
      'calstatela-cdn.presence.io',
      'www.jotform.com',
      'i.imgur.com',
      'media.giphy.com',
      'www.dropbox.com',
      'bubqscxokeycpuuoqphp.supabase.co',
    ],

    minimumCacheTTL: 2678400,
    formats: ['image/webp'],
    deviceSizes: [360, 768, 1024],
    imageSizes: [400],
  },
};

const videoConfig = withNextVideo(nextConfig);
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
