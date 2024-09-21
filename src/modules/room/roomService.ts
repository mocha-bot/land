import getConfig from 'next/config';

import { axios } from '@/lib/axios';

import type { Room } from './roomEntity';
import { ApiRoomSchema } from './roomEntity';

const { publicRuntimeConfig } = getConfig();

export type SearchRoomRequest = {
  page?: number;
  limit?: number;
  query?: string;
};

export const searchRoom = async ({
  limit = 10,
  page = 1,
  query,
}: SearchRoomRequest): Promise<Room[]> => {
  const url = new URL(`${publicRuntimeConfig.apiBaseUrl}/api/v1/room/search`);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', limit.toString());

  if (query) {
    url.searchParams.append('q', query);
  }

  const response = await axios(
    {
      method: 'GET',
      url: url.toString(),
    },
    ApiRoomSchema,
  );

  return response.data;
};
