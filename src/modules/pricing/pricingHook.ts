import { useQuery } from '@tanstack/react-query';

import { getPackages } from './pricingService';

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
