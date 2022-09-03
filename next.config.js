/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    showVersion: process.env.SHOW_VERSION === 'TRUE',
    clientVersion: process.env.COMMIT_HASH || 'local-0.0.1',
    isProduction: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
