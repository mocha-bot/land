import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { appWithTranslation } from 'next-i18next';
import { generateDefaultSeo } from 'next-seo/pages';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

import { AppProvider } from '@/AppProvider';
import { defaultSeoConfig } from '@/config/seo';
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
      <Head>{generateDefaultSeo(defaultSeoConfig)}</Head>
      {GA_TRACKING_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy='afterInteractive'
          />
          <Script id='ga-init' strategy='afterInteractive'>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
            `}
          </Script>
        </>
      )}
      <AppProvider>
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </AppProvider>
    </>
  );
}

export default appWithTranslation(App);
