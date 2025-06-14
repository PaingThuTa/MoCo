/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/MoCo',
  assetPrefix: '/MoCo',
  trailingSlash: true,
};

module.exports = nextConfig;
