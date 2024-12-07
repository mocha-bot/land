import getConfig from 'next/config';

import { axios } from '@/lib/axios';

import type { ApiMetadata } from '../api/apiEntity';

import type { Room } from './roomEntity';
import { ApiRoomSchema } from './roomEntity';

const { publicRuntimeConfig } = getConfig();

export type SearchRoomRequest = {
  page?: number;
  limit?: number;
  query?: string;
};
export type SearchRoomResponse = {
  rooms: Room[];
  pagination?: ApiMetadata['pagination'];
};

export const searchRoom = async ({
  limit = 5,
  page = 1,
  query,
}: SearchRoomRequest): Promise<SearchRoomResponse> => {
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

  return {
    rooms: response.data.map((room) => ({
      serial: room.serial,
      name: room.name,
      description: room.description,
      tags: room.tags,
      totalChannel: room.total_channel,
      rate: room.rate,
    })),
    pagination: response.metadata?.pagination,
  };
};
