import { useQuery } from '@tanstack/react-query';

import { getAnalytic } from './analyticService';

export const useAnalyticQuery = () => {
  return useQuery({
    queryKey: ['analytic'],
    queryFn: getAnalytic,
    staleTime: 5 * 60 * 1000, // 5 min — analytic updates every 6h via cron
  });
};
