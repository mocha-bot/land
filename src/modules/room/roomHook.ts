import { useQuery } from '@tanstack/react-query';

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
