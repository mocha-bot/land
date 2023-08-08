import { ChakraProvider } from '@chakra-ui/react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GoogleAnalytics } from 'nextjs-google-analytics';

import { theme } from '../theme';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Mocha Bot</title>
      </Head>
      <GoogleAnalytics trackPageViews gaMeasurementId={GA_TRACKING_ID} />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
