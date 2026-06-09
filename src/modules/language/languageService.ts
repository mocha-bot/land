import getConfig from 'next/config';

import { axios } from '@/lib/axios';

import type { Language } from './languageEntity';
import { ApiLanguageSchema } from './languageEntity';

const { publicRuntimeConfig } = getConfig();

export type GetLanguagesResponse = {
  data: Language[];
};

export const getLanguages = async (): Promise<GetLanguagesResponse> => {
  const url = `${publicRuntimeConfig.apiBaseUrl}/api/v1/languages`;

  const response = await axios(
    {
      method: 'GET',
      url,
    },
    ApiLanguageSchema,
  );

  return {
    data: response.data.map((lang) => ({
      name: lang.name,
      code: lang.code,
    })),
  };
};
