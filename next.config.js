/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/summoners/플레이어아이디/',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
