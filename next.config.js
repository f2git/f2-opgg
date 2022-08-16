/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/getSummerAutocomplete/:path*',
        destination: 'https://www.op.gg/api/summoners/kr/autocomplete?keyword=:path*',
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/summoners/플레이어아이디/',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['opgg-static.akamaized.net'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
