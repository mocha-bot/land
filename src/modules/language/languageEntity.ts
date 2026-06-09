import { z } from 'zod';

import { ApiMetadataSchema } from '../api/apiEntity';

export const LanguageSchema = z.object({
  name: z.string().default(''),
  code: z.string().default(''),
});

export const ApiLanguageSchema = z.object({
  data: z.array(LanguageSchema),
  metadata: ApiMetadataSchema.optional(),
});

export type ApiLanguage = z.infer<typeof ApiLanguageSchema>;

export type Language = {
  name: string;
  code: string;
};
