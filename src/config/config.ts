import getConfig from 'next/config';

import type { FooterInformation, FooterInformationItem } from '@/types/Footer';

const { publicRuntimeConfig } = getConfig();

const productItems: FooterInformationItem[] = [
  { title: 'Solutions', href: '/solutions' },
  { title: 'Discovery', href: '/search' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Donut Call', href: '/donut' },
];

const resourceItems: FooterInformationItem[] = [
  { title: 'Documentation', href: publicRuntimeConfig.docsUrl },
  { title: 'Support Us', href: publicRuntimeConfig.supportUrl },
  { title: 'Invite Bot', href: publicRuntimeConfig.botInvitationUrl },
];

const communityItems: FooterInformationItem[] = [
  { title: 'Discord', href: publicRuntimeConfig.discordServerUrl },
  { title: 'GitHub', href: publicRuntimeConfig.githubUrl },
  { title: 'Product Hunt', href: publicRuntimeConfig.productHuntUrl },
];

const legalItems: FooterInformationItem[] = [
  { title: 'Terms of Service', href: '/terms-of-service' },
  { title: 'Privacy Policy', href: '/privacy-policy' },
  { title: 'Refund Policy', href: '/refund-policy' },
];

const informations: FooterInformation[] = [
  { title: 'Product', items: productItems },
  { title: 'Resources', items: resourceItems },
  { title: 'Community', items: communityItems },
  { title: 'Legal', items: legalItems },
];

export { informations };
