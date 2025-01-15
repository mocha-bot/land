import { Analytics } from '@vercel/analytics/react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GoogleAnalytics } from 'nextjs-google-analytics';

import { AppProvider } from '@/AppProvider';
import TawkMessenger from '@/components/TawkMessenger/TawkMessenger';
import { fonts } from '@/theme/fonts';

import '@/theme/global.css';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';
const TAWK_PROPERTY_ID = process.env.TAWK_PROPERTY_ID || '';
const TAWK_WIDGET_ID = process.env.TAWK_WIDGET_ID || '';

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
        {TAWK_PROPERTY_ID && TAWK_WIDGET_ID && (
          <TawkMessenger
            propertyId={TAWK_PROPERTY_ID}
            widgetId={TAWK_WIDGET_ID}
          />
        )}
        <Component {...pageProps} />
        <Analytics />
      </AppProvider>
    </>
  );
}

export default appWithTranslation(App);
