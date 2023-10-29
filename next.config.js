module.exports = {
  swcMinify: false,
  trailingSlash: true,
  env: {
    // HOST
    HOST_API_KEY: 'http://localhost:5000',

    STRIPE_PUBLIC_KEY: 'pk_test_51N03KWLpx5FbhsTKcTBMwVT9E6OrNjaixT2L0axSdg5Uircuq3XjuuG6nAVhX1duoWMNoJ4fEZ41wuao0lSQJCE300bO55xsrS',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000',
        // pathname: '/account123/**',
      },
    ],
  },
};
