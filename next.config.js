const nextConfig = {
  experimental: {
    fontLoaders: [
      {
        loader: '@next/font/google',
        options: {
          families: ['Roboto'],
          weight: [400, 500, 700],
        },
      },
    ],
    appDir: true,
  },

};

module.exports = nextConfig;
