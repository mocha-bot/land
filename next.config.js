/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    showVersion: process.env.SHOW_VERSION === 'true' || false,
    clientVersion: process.env.COMMIT_HASH || 'local-0.0.1',
  },
};

module.exports = nextConfig;
