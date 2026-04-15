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
import { RoomSearchContainer } from '@/modules/room/RoomSearchContainer';

const { publicRuntimeConfig } = getConfig();

type SearchProps = {
  locale?: string;
};

export default function Index({ locale }: SearchProps) {
  const canonical = buildCanonical('/search', locale);

  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Search Rooms',
          description:
            'Discover public Mocha rooms across Discord communities. Filter by tag, language, rating, and activity to find your next favorite server.',
          canonical,
          languageAlternates: buildLanguageAlternates('/search'),
          openGraph: {
            type: 'website',
            url: canonical,
            locale: ogLocaleFor(locale),
          },
        })}
      </Head>
      <RoomSearchContainer />
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
