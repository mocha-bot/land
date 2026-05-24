import getConfig from 'next/config';
import { z } from 'zod';

import { axios } from '@/lib/axios';

import type { Package } from './types';

const { publicRuntimeConfig } = getConfig();

const UserSchema = z.object({
  data: z.object({
    serial: z.string(),
    username: z.string().optional(),
    display_name: z.string().optional(),
  }),
});

export type CurrentUser = z.infer<typeof UserSchema>['data'];

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
  try {
    const url = `${publicRuntimeConfig.apiBaseUrl}/api/v1/user/me`;
    const response = await axios(
      { method: 'GET', url, withCredentials: true },
      UserSchema,
    );
    return response.data;
  } catch {
    return null;
  }
};

const CheckoutSchema = z.object({
  data: z.object({ url: z.string() }),
});

export const getCheckoutURL = async (
  packageSerial: string,
): Promise<string> => {
  const url = `${publicRuntimeConfig.apiBaseUrl}/api/v1/payment/checkout/${packageSerial}`;
  const response = await axios(
    { method: 'GET', url, withCredentials: true },
    CheckoutSchema,
  );
  return response.data.url;
};

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
