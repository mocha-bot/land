import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';

import { getLanguages } from './languageService';
import type { GetLanguagesResponse } from './languageService';

export const useGetLanguagesQuery = (
  config?: UseQueryOptions<GetLanguagesResponse>,
) => {
  return useQuery({
    queryKey: ['languages'],
    queryFn: () => getLanguages(),
    staleTime: 60 * 60_000,
    ...config,
  });
};
