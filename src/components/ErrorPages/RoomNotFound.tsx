import { useTranslation } from 'next-i18next';
import Head from 'next/head';

import { NotFoundUI } from './NotFoundUI';

export function RoomNotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Mocha Bot - Room Not Found</title>
      </Head>
      <NotFoundUI
        title={t('common:not_found.title')}
        descriptions={t('common:not_found.descriptions', {
          returnObjects: true,
        })}
        pageTitle='Mocha Bot - Room Not Found'
      />
    </>
  );
}
