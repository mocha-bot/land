import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GoogleAnalytics } from 'nextjs-google-analytics';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Mocha Bot</title>
      </Head>
      <GoogleAnalytics trackPageViews gaMeasurementId={GA_TRACKING_ID} />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
