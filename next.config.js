/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/MoCo' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/MoCo' : '',
  trailingSlash: true,
};

module.exports = nextConfig;
