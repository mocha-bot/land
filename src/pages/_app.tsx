import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GoogleAnalytics } from 'nextjs-google-analytics';

import { AppProvider } from '@/AppProvider';
import { fonts } from '@/theme/fonts';

import '@/theme/global.css';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-plus-jakarta-sans: ${fonts.plusJakartaSans.style.fontFamily};
          }
        `}
      </style>
      <Head>
        <title>Mocha Bot</title>
      </Head>
      <GoogleAnalytics trackPageViews gaMeasurementId={GA_TRACKING_ID} />
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </>
  );
}

export default appWithTranslation(App);
