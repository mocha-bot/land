import type { GetStaticPropsContext } from 'next';
import { i18n, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getConfig from 'next/config';
import Head from 'next/head';

import { ServerErrorUI } from '@/components/ErrorPages/ServerErrorUI';

const { publicRuntimeConfig } = getConfig();

function Page500() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Mocha Bot - Server Error</title>
      </Head>
      <ServerErrorUI
        title={t('common:server_error.title', { defaultValue: '500' })}
        descriptions={t('common:server_error.descriptions', {
          returnObjects: true,
          defaultValue: [
            'Oops! Something went wrong on our end.',
            'Our engineers have been notified and are working to fix this.',
            'Please try again in a few minutes.',
          ],
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

export default Page500;
