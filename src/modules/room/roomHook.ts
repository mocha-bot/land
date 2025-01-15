import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { searchRoom } from './roomService';
import type { SearchRoomRequest } from './roomService';

type UseSearchRoomQueryConfig = {
  enabled?: boolean;
};

export const useSearchRoomQuery = (
  request: SearchRoomRequest,
  config?: UseSearchRoomQueryConfig,
) => {
  return useQuery({
    queryKey: ['room', Object.entries(request)],
    queryFn: () => searchRoom(request),
    enabled: config?.enabled,
  });
};

export const useSearchRoomInfiniteQuery = (
  request: SearchRoomRequest,
  config?: UseSearchRoomQueryConfig,
) => {
  return useInfiniteQuery({
    queryKey: ['room', JSON.stringify(request)],
    queryFn: ({ pageParam }) => searchRoom({ page: pageParam, ...request }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination?.page === lastPage.pagination?.last) {
        return undefined;
      }

      return (lastPage.pagination?.page || 0) + 1;
    },
    enabled: config?.enabled,
  });
};
