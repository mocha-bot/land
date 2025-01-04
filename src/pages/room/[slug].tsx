import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getConfig from 'next/config';
import Head from 'next/head';

import { RoomDetailContainer } from '@/modules/room/detail/RoomDetailContainer';
import type { SearchRoomResponse } from '@/modules/room/roomService';
import { searchRoom } from '@/modules/room/roomService';

const { publicRuntimeConfig } = getConfig();

export default function Index({
  room,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
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

export async function getStaticProps({
  locale,
  params,
}: GetStaticPropsContext) {
  if (!publicRuntimeConfig.isProduction) {
    await i18n?.reloadResources();
  }
  const room = await searchRoom({ slug: params?.slug as string });

  if (room.rooms.length < 1) {
    return {
      notFound: true,
    };
  }

  return {
    revalidate: 60 * 60, // 1 hour
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
      room: room.rooms[0],
    },
  };
}

export const getStaticPaths = async () => {
  const firstItem = await searchRoom({ limit: 1, page: 1 });
  const totalItem = firstItem.pagination?.total ?? 0;
  let res: SearchRoomResponse = {
    rooms: [],
  };

  if (totalItem > 0) {
    res = await searchRoom({ limit: totalItem, page: 1 });
  }

  const paths = res.rooms
    // ensure that the room has a slug
    .filter((room) => !!room.slug)
    .map((room) => ({
      params: {
        slug: room.slug,
      },
    }));

  return {
    paths,
    fallback: 'blocking',
  };
};
