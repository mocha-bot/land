import getConfig from 'next/config';

import { axios } from '@/lib/axios';

import type { ApiMetadata } from '../api/apiEntity';

import type { Room } from './roomEntity';
import { ApiRoomSchema } from './roomEntity';

const { publicRuntimeConfig } = getConfig();

export type SearchRoomRequest = {
  page?: number;
  limit?: number;
  q?: string;
  slug?: string;
  rate?: number;
  tags?: string[];
  languages?: string[];
  channel_join_min?: number;
  channel_join_max?: number;
};
export type SearchRoomResponse = {
  rooms: Room[];
  pagination?: ApiMetadata['pagination'];
};

export const searchRoom = async (
  { limit = 5, page = 1, ...payload }: SearchRoomRequest,
  headers?: Record<string, string>,
): Promise<SearchRoomResponse> => {
  const url = `${publicRuntimeConfig.apiBaseUrl}/api/v1/room/search`;

  const data: SearchRoomRequest = {
    limit,
    page,
  };

  if (payload.q) {
    data.q = payload.q;
  }

  if (payload.slug) {
    data.slug = payload.slug;
  }

  if (payload.rate) {
    data.rate = payload.rate;
  }

  if (payload.tags) {
    data.tags = payload.tags;
  }

  if (payload.languages) {
    data.languages = payload.languages;
  }

  if (payload.channel_join_min) {
    data.channel_join_min = payload.channel_join_min;
  }

  if (payload.channel_join_max) {
    data.channel_join_max = payload.channel_join_max;
  }

  const response = await axios(
    {
      method: 'POST',
      url,
      data,
      headers,
    },
    ApiRoomSchema,
  );

  return {
    rooms: response.data.map((room) => ({
      serial: room.serial,
      name: room.name,
      slug: room.slug,
      description: room.description,
      tags: room.tags,
      totalChannel: room.total_channel,
      createdBy: room.created_by,
      createdAt: room.created_at,
      rate: {
        ratingCount: room.rate.rating_count,
        averageRating: room.rate.average_rating,
      },
    })),
    pagination: response.metadata?.pagination,
  };
};
