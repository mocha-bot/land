import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AnimatePresence, motion } from 'framer-motion';
import { appWithTranslation } from 'next-i18next';
import { generateDefaultSeo } from 'next-seo/pages';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { GoogleAnalytics } from 'nextjs-google-analytics';

import { AppProvider } from '@/AppProvider';
import { defaultSeoConfig } from '@/config/seo';
import { fonts } from '@/theme/fonts';

import '@/theme/global.css';

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID || '';

const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
};

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
      <GoogleAnalytics trackPageViews gaMeasurementId={GA_TRACKING_ID} />
      <AppProvider>
        <AnimatePresence mode='wait' initial={false}>
          <motion.div
            key={router.asPath}
            variants={pageVariants}
            initial='hidden'
            animate='visible'
            exit='exit'>
            <Component {...pageProps} />
          </motion.div>
        </AnimatePresence>
        <Analytics />
        <SpeedInsights />
      </AppProvider>
    </>
  );
}

export default appWithTranslation(App);
