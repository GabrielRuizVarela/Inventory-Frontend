/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [{
      protocol: 'https:',
      host: 'source.unsplash.com/',
      pathname: '/random/400x400/',
    }]
  },
}

module.exports = nextConfig
