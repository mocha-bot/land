import { useTranslation } from 'next-i18next';
import Head from 'next/head';

import { ServerErrorUI } from './ServerErrorUI';

export function RoomServerError() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Mocha Bot - Error</title>
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
        pageTitle='Mocha Bot - Error'
      />
    </>
  );
}
