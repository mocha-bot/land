import { z } from 'zod';

import { ApiMetadataSchema } from '../api/apiEntity';

export const ApiRoomSchema = z.object({
  data: z.array(
    z.object({
      serial: z.string(),
      name: z.string().default(''),
      description: z.string().default(''),
      tags: z.array(z.string()).default([]),
      total_channel: z.number().default(0),
      rate: z.number().default(0),
    }),
  ),
  metadata: ApiMetadataSchema.optional(),
});

export type ApiRoom = z.infer<typeof ApiRoomSchema>;

export type Room = {
  serial: string;
  name: string;
  description: string;
  totalChannel: number;
  rate: number;
  tags: string[];
};
