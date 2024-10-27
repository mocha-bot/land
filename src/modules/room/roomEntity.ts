import { z } from 'zod';

import { ApiMetadataSchema } from '../api/apiEntity';

export const ApiRoomSchema = z.object({
  data: z.array(
    z.object({
      serial: z.string(),
      name: z.string().default(''),
      description: z.string().default(''),
    }),
  ),
  metadata: ApiMetadataSchema.optional(),
});

export type ApiRoom = z.infer<typeof ApiRoomSchema>;

export type Room = {
  serial: string;
  name: string;
  description: string;
};
