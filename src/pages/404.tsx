import type { GetStaticPropsContext } from 'next';
import { i18n, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getConfig from 'next/config';
import Head from 'next/head';

import { NotFoundUI } from '@/components/ErrorPages/NotFoundUI';

const { publicRuntimeConfig } = getConfig();

function Page404() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Mocha Bot - Page Not Found</title>
      </Head>
      <NotFoundUI
        title={t('common:not_found.title')}
        descriptions={t('common:not_found.descriptions', {
          returnObjects: true,
        })}
      />
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!publicRuntimeConfig.isProduction) {
    await i18n?.reloadResources();
  }

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
}

export default Page404;
