/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
};

module.exports = nextConfig;
