import type { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { generateNextSeo } from 'next-seo/pages';
import Head from 'next/head';

import {
  buildCanonical,
  buildLanguageAlternates,
  DEFAULT_OG_IMAGE,
  ogLocaleFor,
} from '@/config/seo';
import { SolutionsContainer } from '@/modules/solutions/SolutionsContainer';

type Props = {
  locale?: string;
};

const TITLE = 'Solutions';
const DESCRIPTION =
  'Discover how Mocha connects Discord communities across gaming, study groups, open source projects, creator networks, and more.';

export default function SolutionsPage({ locale }: Props) {
  const canonical = buildCanonical('/solutions', locale);

  return (
    <>
      <Head>
        {generateNextSeo({
          title: TITLE,
          description: DESCRIPTION,
          canonical,
          languageAlternates: buildLanguageAlternates('/solutions'),
          openGraph: {
            type: 'website',
            url: canonical,
            locale: ogLocaleFor(locale),
            title: TITLE,
            description: DESCRIPTION,
            images: [
              {
                url: DEFAULT_OG_IMAGE,
                width: 1200,
                height: 630,
                alt: 'Mocha Bot Banner',
              },
            ],
          },
        })}
      </Head>
      <SolutionsContainer />
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      locale: locale ?? undefined,
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
}
