import type {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { generateNextSeo } from 'next-seo/pages';
import Head from 'next/head';

import {
  buildCanonical,
  buildLanguageAlternates,
  DEFAULT_OG_IMAGE,
  ogLocaleFor,
} from '@/config/seo';
import {
  getSolutionBySlug,
  type Solution,
  solutions,
} from '@/modules/solutions/data';
import { SolutionDetailContainer } from '@/modules/solutions/SolutionDetailContainer';

type Props = {
  solution: Solution;
  locale?: string;
};

export default function SolutionDetailPage({ solution, locale }: Props) {
  const path = `/solutions/${solution.slug}`;
  const canonical = buildCanonical(path, locale);
  const title = `${solution.title} — Solutions`;
  const { description } = solution;

  return (
    <>
      <Head>
        {generateNextSeo({
          title,
          description,
          canonical,
          languageAlternates: buildLanguageAlternates(path),
          openGraph: {
            type: 'article',
            url: canonical,
            locale: ogLocaleFor(locale),
            title,
            description,
            images: [
              {
                url: DEFAULT_OG_IMAGE,
                width: 512,
                height: 512,
                alt: 'Mocha Bot logo',
              },
            ],
          },
        })}
      </Head>
      <SolutionDetailContainer solution={solution} />
    </>
  );
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return {
    paths: solutions.map((s) => ({ params: { slug: s.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
  locale,
}: GetStaticPropsContext<{ slug: string }>): Promise<
  GetStaticPropsResult<Props>
> {
  const solution = getSolutionBySlug(params?.slug ?? '');

  if (!solution) {
    return { notFound: true };
  }

  return {
    props: {
      solution,
      locale: locale ?? undefined,
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
}
