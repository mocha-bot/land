/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  reactStrictMode: true,
  publicRuntimeConfig: {
    showVersion: process.env.SHOW_VERSION === 'TRUE',
    clientVersion: process.env.COMMIT_HASH || 'local-0.0.1',
    isProduction: process.env.NODE_ENV === 'production',
    botInvitationUrl:
      process.env.BOT_INVITATION_URL ||
      'https://discord.com/api/oauth2/authorize?client_id=987974524140146728&permissions=414465853504&scope=applications.commands%20bot',
    docsUrl: process.env.DOCS_URL || 'https://docs.mocha-bot.xyz/',
    discordServerUrl:
      process.env.DISCORD_SERVER_URL || 'https://discord.mocha-bot.xyz/',
    walletAddress: process.env.WALLET_ADDRESS || '0x0',
    apiBaseUrl: process.env.API_BASE_URL || 'https://api.mocha-bot.xyz',
    supportUrl:
      process.env.SUPPORT_URL || 'https://top.gg/bot/987974524140146728/vote',
    githubUrl: process.env.GITHUB_URL || 'https://github.com/mocha-bot',
    productHuntUrl:
      process.env.PRODUCT_HUNT_URL ||
      'https://www.producthunt.com/products/mocha-2',
  },
};

module.exports = nextConfig;
