import { Box, Flex, Skeleton, Text } from '@chakra-ui/react';
import { animate, motion, useInView, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { useAnalyticQuery } from '@/modules/analytic/analyticHook';

type StatConfig = {
  numericTarget?: number;
  displayValue?: string;
  suffix: string;
  label: string;
  loading?: boolean;
};

function AnimatedNumber({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const count = useMotionValue(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) {
      return;
    }
    const controls = animate(count, target, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(String(Math.floor(v))),
    });
    return controls.stop;
  }, [inView, count, target]);

  return (
    <Text
      ref={ref}
      fontSize={{ base: '3xl', md: '4xl' }}
      fontWeight='bold'
      letterSpacing='tight'
      lineHeight={1}
      bgGradient='linear(to-br, yellow.200, white)'
      bgClip='text'>
      {display}
      {suffix}
    </Text>
  );
}

function StatItem({
  stat,
  showDivider,
}: {
  stat: StatConfig;
  showDivider: boolean;
}) {
  return (
    <Flex alignItems='stretch' flex={1} minW={0}>
      <Flex
        flexDirection='column'
        alignItems='center'
        gap={3}
        flex={1}
        px={{ base: 2, md: 6 }}
        py={2}
        position='relative'>
        {stat.loading && (
          <Skeleton
            h='44px'
            w='90px'
            borderRadius='md'
            startColor='whiteAlpha.100'
            endColor='whiteAlpha.300'
          />
        )}
        {!stat.loading && stat.numericTarget !== undefined && (
          <AnimatedNumber target={stat.numericTarget} suffix={stat.suffix} />
        )}
        {!stat.loading &&
          stat.numericTarget === undefined &&
          !stat.displayValue && (
            <Text
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight='bold'
              letterSpacing='tight'
              lineHeight={1}
              color='whiteAlpha.300'>
              &mdash;
            </Text>
          )}
        {!stat.loading && stat.displayValue && (
          <Text
            fontSize={{ base: '3xl', md: '4xl' }}
            fontWeight='bold'
            letterSpacing='tight'
            lineHeight={1}
            bgGradient='linear(to-br, yellow.200, white)'
            bgClip='text'>
            {stat.displayValue}
          </Text>
        )}

        <Text
          color='whiteAlpha.400'
          fontSize='xs'
          textTransform='uppercase'
          letterSpacing='wider'
          textAlign='center'
          lineHeight='short'>
          {stat.label}
        </Text>

        {/* Radial ambient glow */}
        <Box
          position='absolute'
          top='50%'
          left='50%'
          transform='translate(-50%, -50%)'
          w='120px'
          h='80px'
          borderRadius='full'
          bg='radial-gradient(ellipse, rgba(255,220,0,0.08) 0%, transparent 70%)'
          pointerEvents='none'
          zIndex={0}
        />
      </Flex>

      {showDivider && (
        <Box
          w='1px'
          alignSelf='stretch'
          my={2}
          bgGradient='linear(to-b, transparent, rgba(255,255,255,0.12), transparent)'
          flexShrink={0}
        />
      )}
    </Flex>
  );
}

const MotionBox = motion(Box);

function formatTarget(n: number): { target: number; suffix: string } {
  if (n >= 1000) {
    return { target: Math.floor(n / 1000), suffix: 'k+' };
  }
  if (n > 0) {
    return { target: n, suffix: '+' };
  }
  return { target: 0, suffix: '' };
}

export function StatsBar() {
  const { data, isLoading } = useAnalyticQuery();

  const guildStat = data
    ? formatTarget(data.totalGuildJoined)
    : { target: 0, suffix: '+' };
  const roomStat = data
    ? formatTarget(data.totalRoomCreated)
    : { target: 0, suffix: '+' };

  const stats: StatConfig[] = [
    {
      numericTarget: data ? guildStat.target : undefined,
      suffix: guildStat.suffix,
      label: 'Servers connected',
      loading: isLoading,
    },
    {
      numericTarget: data ? roomStat.target : undefined,
      suffix: roomStat.suffix,
      label: 'Rooms created',
      loading: isLoading,
    },
    {
      displayValue: 'Free',
      suffix: '',
      label: 'To get started',
    },
  ];

  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.25,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      p='1px'
      borderRadius='2xl'
      bgGradient='linear(135deg, rgba(255,220,0,0.3), rgba(255,255,255,0.06) 50%, rgba(255,220,0,0.15))'
      w='full'>
      <Flex
        borderRadius='2xl'
        backgroundColor='rgba(6, 6, 12, 0.75)'
        backdropFilter='blur(12px)'
        py={{ base: 6, md: 8 }}
        px={{ base: 4, md: 8 }}
        w='full'
        overflow='hidden'
        position='relative'>
        {/* Top shimmer line */}
        <Box
          position='absolute'
          top={0}
          left='10%'
          right='10%'
          h='1px'
          bgGradient='linear(to-r, transparent, rgba(255,220,0,0.5), transparent)'
          pointerEvents='none'
        />

        <Flex w='full' align='stretch'>
          {stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              stat={stat}
              showDivider={i < stats.length - 1}
            />
          ))}
        </Flex>
      </Flex>
    </MotionBox>
  );
}
