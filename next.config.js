/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  swcMinify: true,
  images: {
    domains: ['calstatela-cdn.presence.io', 'www.jotform.com', 'i.imgur.com'],
  },
};

module.exports = nextConfig;
