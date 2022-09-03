const enCommon = require('./locales/en/common.json');

const idCommon = require('./locales/id/common.json');

const defaultLang = process.env.LANGUAGE || 'en';

module.exports = {
  translations: {
    en: {
      common: enCommon,
    },
    id: {
      common: idCommon,
    },
  },
  defaultLang,
};
