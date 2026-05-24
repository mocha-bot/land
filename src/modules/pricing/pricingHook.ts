import { useQuery } from '@tanstack/react-query';

import { getCurrentUser, getPackages } from './pricingService';

export const usePackagesQuery = () => {
  return useQuery({
    queryKey: ['pricing', 'packages'],
    queryFn: () => getPackages(),
  });
};

export const useSubscriptionPackages = () => {
  const query = usePackagesQuery();

  return {
    ...query,
    data: query.data?.filter((pkg) => pkg.type === 'subscription') ?? [],
  };
};

export const useAddonPackages = () => {
  const query = usePackagesQuery();

  return {
    ...query,
    data: query.data?.filter((pkg) => pkg.type === 'addon') ?? [],
  };
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => getCurrentUser(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
};
