import { z } from 'zod';

export const ApiMetadataSchema = z.object({
  pagination: z.object({
    Limit: z.number(),
    Page: z.number(),
    Total: z.number(),
    From: z.number(),
    To: z.number(),
    Last: z.number(),
    Offset: z.number(),
  }),
});

export type ApiMetadata = z.infer<typeof ApiMetadataSchema>;
