import getConfig from 'next/config';

import { axios } from '@/lib/axios';

import type { ApiMetadata } from '../api/apiEntity';

import type { Tag } from './tagEntity';
import { ApiTagSchema } from './tagEntity';

const { publicRuntimeConfig } = getConfig();

export type GetTagsRequest = {
  page?: number;
  limit?: number;
  name?: string;
};
export type GetTagsResponse = {
  data: Tag[];
  pagination?: ApiMetadata['pagination'];
};

export const getTags = async ({
  limit = 10,
  page = 1,
  ...payload
}: GetTagsRequest): Promise<GetTagsResponse> => {
  const url = new URL(`${publicRuntimeConfig.apiBaseUrl}/api/v1/tags`);

  url.searchParams.append('limit', limit.toString());
  url.searchParams.append('page', page.toString());

  if (payload.name) {
    url.searchParams.append('name', payload.name);
  }

  const response = await axios(
    {
      method: 'GET',
      url: url.toString(),
    },
    ApiTagSchema,
  );

  return {
    data: response.data.map((room) => ({
      serial: room.serial,
      name: room.name,
      description: room.description,
    })),
  };
};
