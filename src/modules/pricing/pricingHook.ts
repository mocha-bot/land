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

export const useUserPackages = () => {
  const query = usePackagesQuery();
  return {
    ...query,
    data:
      query.data?.filter(
        (p) => p.type === 'subscription' && p.binding_type === 'user',
      ) ?? [],
  };
};

export const useGuildPackages = () => {
  const query = usePackagesQuery();
  return {
    ...query,
    data:
      query.data?.filter(
        (p) => p.type === 'subscription' && p.binding_type === 'guild',
      ) ?? [],
  };
};

export const useRoomPackages = () => {
  const query = usePackagesQuery();
  return {
    ...query,
    data:
      query.data?.filter(
        (p) => p.type === 'subscription' && p.binding_type === 'room',
      ) ?? [],
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
