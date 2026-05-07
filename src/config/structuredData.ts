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

export const webSiteJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const howToJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to connect Discord servers with Mocha',
  description:
    'Set up cross-server chat rooms in four steps using the Mocha Discord bot.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Invite Mocha to your server',
      text: 'Add the Mocha bot to your Discord server from the dashboard, then run /room create to set up your first room.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Discover rooms to join',
      text: 'Browse public rooms on mocha-bot.xyz/search. Click "Join Room" on any room page to copy its room ID.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Link a channel to the room',
      text: 'In your Discord server, run /room join <room_id> in the channel you want to bridge. Mocha links it instantly.',
    },
    {
      '@type': 'HowToStep',
      position: 4,
      name: 'Chat across every server',
      text: 'Messages sent in the linked channel appear in real time across every server connected to the same room.',
    },
  ],
});

export const faqJsonLd = (
  items: { question: string; answer: string }[],
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});
