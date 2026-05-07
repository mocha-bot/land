import type { GetStaticPropsContext } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { generateNextSeo } from 'next-seo/pages';
import getConfig from 'next/config';
import Head from 'next/head';

import {
  buildCanonical,
  buildLanguageAlternates,
  ogLocaleFor,
} from '@/config/seo';
import {
  faqJsonLd,
  howToJsonLd,
  jsonLdScriptProps,
  organizationJsonLd,
  softwareApplicationJsonLd,
  webSiteJsonLd,
} from '@/config/structuredData';
import { LandingPageContainer } from '@/modules/landingPage/LandingPageContainer';
import { FAQ_ITEMS } from '@/modules/landingPage/faqData';

const { publicRuntimeConfig } = getConfig();

type IndexProps = {
  locale?: string;
};

function Index({ locale }: IndexProps) {
  const canonical = buildCanonical('/', locale);

  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Multi-chat Discord bot for communities',
          description:
            'Mocha is a Discord bot that connects communities through cross-server rooms. Create public or private rooms, broadcast to multiple channels, and grow your server.',
          canonical,
          languageAlternates: buildLanguageAlternates('/'),
          openGraph: {
            type: 'website',
            url: canonical,
            locale: ogLocaleFor(locale),
          },
        })}
        <script {...jsonLdScriptProps(organizationJsonLd())} />
        <script {...jsonLdScriptProps(softwareApplicationJsonLd())} />
        <script {...jsonLdScriptProps(webSiteJsonLd())} />
        <script {...jsonLdScriptProps(howToJsonLd())} />
        <script {...jsonLdScriptProps(faqJsonLd(FAQ_ITEMS))} />
      </Head>
      <LandingPageContainer />
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!publicRuntimeConfig.isProduction) {
    await i18n?.reloadResources();
  }

  return {
    props: {
      locale,
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
}

export default Index;
