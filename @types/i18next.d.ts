import 'i18next';

import type common from '../public/locales/en/common.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ns1';
    // custom resources type
    resources: {
      common: typeof common;
    };
  }
}
