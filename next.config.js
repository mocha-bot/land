/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  publicRuntimeConfig: {
    showVersion: process.env.SHOW_VERSION === 'TRUE',
    clientVersion: process.env.COMMIT_HASH || 'local-0.0.1',
    isProduction: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
