const { withNextVideo } = require('next-video/process')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  images: {
    domains: [
      'calstatela-cdn.presence.io',
      'www.jotform.com',
      'i.imgur.com',
      'media.giphy.com',
      'www.dropbox.com',
      'bubqscxokeycpuuoqphp.supabase.co'
    ],
  },
};

module.exports = withNextVideo(nextConfig);
