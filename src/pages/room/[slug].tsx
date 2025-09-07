import type { GetStaticPropsContext } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getConfig from 'next/config';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { RoomNotFound } from '@/components/ErrorPages/RoomNotFound';
import { RoomServerError } from '@/components/ErrorPages/RoomServerError';
import { RoomDetailContainer } from '@/modules/room/detail/RoomDetailContainer';
import { RoomDetailSkeleton } from '@/modules/room/RoomDetailSkeleton';
import type { Room } from '@/modules/room/roomEntity';
import { useSearchRoomQuery } from '@/modules/room/roomHook';

const { publicRuntimeConfig } = getConfig();

export default function Index() {
  const router = useRouter();
  const { slug } = router.query;
  const [room, setRoom] = useState<Room | null>(null);

  const { data, isLoading, error } = useSearchRoomQuery(
    { slug: slug as string, bypassCf: false },
    { enabled: !!slug },
  );

  useEffect(() => {
    if (data?.rooms && data.rooms.length > 0) {
      setRoom(data.rooms[0]);
    }
  }, [data]);

  if (isLoading) {
    return (
      <>
        <Head>
          <title>Mocha Bot - Loading...</title>
        </Head>
        <RoomDetailSkeleton />
      </>
    );
  }

  // Handle errors
  if (error) {
    // Check if it's a 404 error (room not found)
    const isNotFoundError =
      (error as any)?.response?.status === 404 ||
      (error as any)?.status === 404 ||
      (error as any)?.message?.toLowerCase().includes('not found');

    if (isNotFoundError) {
      return <RoomNotFound />;
    }

    // For other errors, show 500 page
    return <RoomServerError />;
  }

  // Handle case where data is loaded but no room found
  if (!room || (data && data.rooms.length === 0)) {
    return <RoomNotFound />;
  }

  return (
    <>
      <Head>
        <title>Mocha Bot - {room.name}</title>
        <meta property='og:title' content={room.name} key='meta-title' />
        <meta
          property='og:description'
          content={room.description}
          key='meta-description'
        />
        <meta property='og:image' content='/assets/images/logo-mocha.png' />
        <meta property='og:locale' content='en_US' key='meta-locale' />
        <meta
          property='og:url'
          content={`https://mocha-bot.xyz/room/${room.slug}`}
        />
      </Head>
      <RoomDetailContainer room={room} />
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

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
