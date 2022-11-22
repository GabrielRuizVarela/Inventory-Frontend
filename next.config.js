/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com']
  },
  basePath: '/Inventory-Frontend',

  // images: {
  //   remotePatterns: [{
  //     protocol: 'https:',
  //     host: 'source.unsplash.com/',
  //     pathname: '/random/400x400/',
  //   }]
  // },
}

module.exports = nextConfig
