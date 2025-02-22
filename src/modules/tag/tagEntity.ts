import { z } from 'zod';

import { ApiMetadataSchema } from '../api/apiEntity';

export const TagSchema = z.object({
  serial: z.string(),
  name: z.string().default(''),
  description: z.string().default(''),
});

export const ApiTagSchema = z.object({
  data: z.array(TagSchema),
  metadata: ApiMetadataSchema.optional(),
});

export type ApiTag = z.infer<typeof ApiTagSchema>;

export type Tag = {
  serial: string;
  name: string;
  description: string;
};
