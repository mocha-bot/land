import getConfig from 'next/config';
import { z } from 'zod';

import { axios } from '@/lib/axios';

const { publicRuntimeConfig } = getConfig();

export const AnalyticSchema = z.object({
  data: z.object({
    total_guild_joined: z.number(),
    total_room_created: z.number(),
    total_unique_senders: z.number().optional(),
  }),
  message: z.string(),
});

export type Analytic = {
  totalGuildJoined: number;
  totalRoomCreated: number;
  totalUniqueSenders: number;
};

export const getAnalytic = async (): Promise<Analytic> => {
  const url = `${publicRuntimeConfig.apiBaseUrl}/api/v1/analytic`;

  const response = await axios({ method: 'GET', url }, AnalyticSchema);

  return {
    totalGuildJoined: response.data.total_guild_joined,
    totalRoomCreated: response.data.total_room_created,
    totalUniqueSenders: response.data.total_unique_senders ?? 0,
  };
};
