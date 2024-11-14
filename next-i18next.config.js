const defaultLocale = process.env.LANGUAGE || 'en';

module.exports = {
  i18n: {
    defaultLocale,
    locales: ['en', 'id'],
    localeDetection: false,
    debug: true,
  },
};
