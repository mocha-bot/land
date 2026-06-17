import type { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { generateNextSeo } from 'next-seo/pages';
import Head from 'next/head';

import {
  buildCanonical,
  buildLanguageAlternates,
  DEFAULT_OG_IMAGE,
  ogLocaleFor,
  SITE_URL,
} from '@/config/seo';
import { breadcrumbJsonLd, jsonLdScriptProps } from '@/config/structuredData';
import { SolutionsContainer } from '@/modules/solutions/SolutionsContainer';

type Props = {
  locale?: string;
};

const TITLE = 'How Communities Use Mocha Bot';
const DESCRIPTION =
  'See how gaming groups, study circles, open source teams, and creator networks use Mocha to bring their Discord servers together.';

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
        <script
          {...jsonLdScriptProps(
            breadcrumbJsonLd([
              { name: 'Home', url: `${SITE_URL}/` },
              { name: 'Solutions', url: `${SITE_URL}/solutions` },
            ]),
          )}
        />
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
