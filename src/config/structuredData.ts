import getConfig from 'next/config';

import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from './seo';

const { publicRuntimeConfig } = getConfig() ?? { publicRuntimeConfig: {} };

export const organizationJsonLd = () => {
  const sameAs = [
    publicRuntimeConfig.discordServerUrl,
    publicRuntimeConfig.githubUrl,
    publicRuntimeConfig.productHuntUrl,
    publicRuntimeConfig.docsUrl,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: DEFAULT_OG_IMAGE,
    sameAs,
  };
};

export const softwareApplicationJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  applicationCategory: 'CommunicationApplication',
  operatingSystem: 'Discord',
  description:
    'Discord bot for multi-chat cross-server messaging and community rooms.',
  url: `${SITE_URL}/`,
  image: DEFAULT_OG_IMAGE,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
});

export type BreadcrumbItem = { name: string; url: string };

export const breadcrumbJsonLd = (items: BreadcrumbItem[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: item.name,
    item: item.url,
  })),
});

export const jsonLdScriptProps = (data: unknown) => ({
  type: 'application/ld+json' as const,
  dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
});
