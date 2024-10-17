import getConfig from 'next/config';

import type { FooterInformation, FooterInformationItem } from '@/types/Footer';

const { publicRuntimeConfig } = getConfig();

const pluginItems: FooterInformationItem[] = [
  {
    title: 'Documentation',
    href: publicRuntimeConfig.docsUrl,
  },
  {
    title: 'Support Us',
    href: publicRuntimeConfig.supportUrl,
  },
];

const socialItems: FooterInformationItem[] = [
  {
    title: 'Discord',
    href: publicRuntimeConfig.discordServerUrl,
  },
  {
    title: 'Github',
    href: publicRuntimeConfig.githubUrl,
  },
];

const informations: FooterInformation[] = [
  {
    title: 'Plugins',
    items: pluginItems,
  },
  {
    title: 'Socials',
    items: socialItems,
  },
];

export { informations };
