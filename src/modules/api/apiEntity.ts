import { z } from 'zod';

export const ApiMetadataSchema = z.object({
  pagination: z.object({
    from: z.number(),
    last: z.number(),
    limit: z.number(),
    offset: z.number(),
    page: z.number(),
    to: z.number(),
    total: z.number(),
  }),
});

export type ApiMetadata = z.infer<typeof ApiMetadataSchema>;
