import type { DefaultSeoProps, LinkTag } from 'next-seo/pages';

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://mocha-bot.xyz'
).replace(/\/$/, '');

export const SITE_NAME = 'Mocha Bot';

export const SITE_DESCRIPTION =
  'Mocha is a Discord bot for multi-chat cross-server messaging. Create public or private rooms, connect communities, and send messages to multiple channels at once.';

export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/images/logo-mocha.png`;

export const SUPPORTED_LOCALES = ['en', 'id'] as const;
export const DEFAULT_LOCALE = 'en';

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

const OG_LOCALE_BY_LOCALE: Record<SupportedLocale, string> = {
  en: 'en_US',
  id: 'id_ID',
};

const normalizePath = (path: string): string => {
  if (!path || path === '/') {
    return '/';
  }
  return path.startsWith('/') ? path : `/${path}`;
};

export const buildCanonical = (path: string, locale?: string): string => {
  const normalized = normalizePath(path);
  const effectiveLocale = (locale ?? DEFAULT_LOCALE) as SupportedLocale;
  if (effectiveLocale === DEFAULT_LOCALE) {
    return normalized === '/' ? `${SITE_URL}/` : `${SITE_URL}${normalized}`;
  }
  if (normalized === '/') {
    return `${SITE_URL}/${effectiveLocale}`;
  }
  return `${SITE_URL}/${effectiveLocale}${normalized}`;
};

export const buildLanguageAlternates = (
  path: string,
): { hrefLang: string; href: string }[] => {
  const alternates: { hrefLang: string; href: string }[] =
    SUPPORTED_LOCALES.map((locale) => ({
      hrefLang: locale as string,
      href: buildCanonical(path, locale),
    }));
  alternates.push({
    hrefLang: 'x-default',
    href: buildCanonical(path, DEFAULT_LOCALE),
  });
  return alternates;
};

export const ogLocaleFor = (locale?: string): string => {
  const key = (locale ?? DEFAULT_LOCALE) as SupportedLocale;
  return OG_LOCALE_BY_LOCALE[key] ?? OG_LOCALE_BY_LOCALE[DEFAULT_LOCALE];
};

const defaultLinkTags: LinkTag[] = [
  { rel: 'icon', href: '/favicon.ico' },
  { rel: 'apple-touch-icon', href: '/assets/images/logo-mocha.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
];

export const defaultSeoConfig: DefaultSeoProps = {
  defaultTitle: SITE_NAME,
  titleTemplate: `%s | ${SITE_NAME}`,
  description: SITE_DESCRIPTION,
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: OG_LOCALE_BY_LOCALE[DEFAULT_LOCALE],
    url: `${SITE_URL}/`,
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 512,
        height: 512,
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    cardType: 'summary_large_image',
  },
  additionalLinkTags: defaultLinkTags,
  additionalMetaTags: [
    { name: 'application-name', content: SITE_NAME },
    { name: 'theme-color', content: '#0B0B0F' },
  ],
};
