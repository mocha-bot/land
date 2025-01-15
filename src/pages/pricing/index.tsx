import type { GetStaticPropsContext } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getConfig from 'next/config';
import Head from 'next/head';
import React from 'react';

import PricingContainer from '@/modules/pricing/PricingContainer';

const { publicRuntimeConfig } = getConfig();

export default function Index() {
  return (
    <>
      <Head>
        <title>Mocha - Premium</title>
        <meta property='og:title' content='Mocha - Premium' key='meta-title' />
        <meta
          property='og:description'
          content="Discover the premium features of Mocha. It's time to level up your room!"
          key='meta-description'
        />
        <meta property='og:image' content='/assets/images/logo-mocha.png' />
        <meta property='og:locale' content='en_US' key='meta-locale' />
        <meta property='og:url' content='https://mocha-bot.xyz/pricing' />
      </Head>
      <PricingContainer />
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!publicRuntimeConfig.isProduction) {
    await i18n?.reloadResources();
  }

  return {
    revalidate: 60 * 60, // 1 hour
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
  };
}
