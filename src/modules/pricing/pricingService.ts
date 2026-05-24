import getConfig from 'next/config';
import { z } from 'zod';

import { axios } from '@/lib/axios';

import type { Package } from './types';

const { publicRuntimeConfig } = getConfig();

const ProviderPlanSchema = z.object({
  provider: z.string(),
  checkout_url: z.string(),
});

const PackageSchema = z.object({
  serial: z.string(),
  type: z.enum(['subscription', 'addon']),
  name: z.string().default(''),
  description: z.string().default(''),
  price_cents: z.number().default(0),
  price_currency: z.string().default('USD'),
  billing_interval: z.string().default(''),
  features: z.array(z.string()).default([]),
  sort_order: z.number().default(0),
  providers: z
    .array(ProviderPlanSchema)
    .nullish()
    .transform((v) => v ?? []),
});

export const ApiPackagesSchema = z.object({
  data: z.array(PackageSchema),
});

export const getPackages = async (): Promise<Package[]> => {
  const url = `${publicRuntimeConfig.apiBaseUrl}/api/v1/payment/packages`;

  const response = await axios(
    {
      method: 'GET',
      url,
    },
    ApiPackagesSchema,
  );

  return response.data;
};
