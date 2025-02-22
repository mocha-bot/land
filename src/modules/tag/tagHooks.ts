import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';

import { getTags } from './tagService';
import type { GetTagsRequest, GetTagsResponse } from './tagService';

export const useGetTagsQuery = (
  request: GetTagsRequest,
  config?: UseQueryOptions<GetTagsResponse>,
) => {
  return useQuery({
    queryKey: ['tags', Object.entries(request)],
    queryFn: () => getTags(request),
    ...config,
  });
};
