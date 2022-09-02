import 'next-i18next';

import type common from '../public/locales/en/common.json';

declare module 'next-i18next' {
  interface Resources {
    common: typeof common;
  }
}
