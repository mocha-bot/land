import { Flex, SimpleGrid, Skeleton, Text } from '@chakra-ui/react';

import { AnimateOnView } from '@/components/AnimateOnView/AnimateOnView';
import { useAnalyticQuery } from '@/modules/analytic/analyticHook';

type StatProps = {
  value: string;
  label: string;
  loading?: boolean;
};

function Stat({ value, label, loading }: StatProps) {
  return (
    <Flex flexDirection='column' alignItems='center' gap={1}>
      {loading ? (
        <Skeleton
          h='36px'
          w='80px'
          borderRadius='md'
          startColor='whiteAlpha.100'
          endColor='whiteAlpha.300'
        />
      ) : (
        <Text
          color='white'
          fontSize={{ base: '2xl', md: '3xl' }}
          fontWeight='bold'
          letterSpacing='tight'>
          {value}
        </Text>
      )}
      <Text
        color='whiteAlpha.500'
        fontSize='xs'
        textTransform='uppercase'
        letterSpacing='wider'>
        {label}
      </Text>
    </Flex>
  );
}

function formatCount(n: number): string {
  if (n >= 1000) {return `${Math.floor(n / 1000)}k+`;}
  if (n > 0) {return `${n}+`;}
  return '—';
}

export function StatsBar() {
  const { data, isLoading } = useAnalyticQuery();

  const stats: StatProps[] = [
    {
      value: data ? formatCount(data.totalGuildJoined) : '—',
      label: 'Servers connected',
      loading: isLoading,
    },
    {
      value: data ? formatCount(data.totalRoomCreated) : '—',
      label: 'Rooms created',
      loading: isLoading,
    },
    {
      value: 'Free',
      label: 'To get started',
    },
  ];

  return (
    <AnimateOnView delay={0.2}>
      <Flex
        w='full'
        py={8}
        px={{ base: 6, md: 12 }}
        borderRadius='xl'
        border='1px solid rgba(255, 255, 255, 0.08)'
        backgroundColor='rgba(0, 0, 0, 0.3)'
        backdropFilter='blur(8px)'>
        <SimpleGrid columns={3} gap={6} w='full'>
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </SimpleGrid>
      </Flex>
    </AnimateOnView>
  );
}
