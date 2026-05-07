import { Box, Flex, SimpleGrid, Text, useBreakpointValue } from '@chakra-ui/react';

import { AnimateOnView, StaggerContainer, staggerItem } from '@/components/AnimateOnView/AnimateOnView';
import { motion } from 'framer-motion';

type CellValue = true | false | string;

type Column = {
  key: string;
  label: string;
  sublabel: string;
  highlight: boolean;
  values: CellValue[];
};

const features = [
  'Cross-server messaging',
  'Public room directory',
  'No server migration',
  'Built-in moderation',
  'Free to start',
  'Setup time',
];

const columns: Column[] = [
  {
    key: 'mocha',
    label: 'Mocha',
    sublabel: 'This bot',
    highlight: true,
    values: [true, true, true, true, true, 'Minutes'],
  },
  {
    key: 'manual',
    label: 'Server partnerships',
    sublabel: 'Manual coordination',
    highlight: false,
    values: [false, false, true, false, true, 'Days'],
  },
  {
    key: 'custom',
    label: 'Build your own bot',
    sublabel: 'Dev work required',
    highlight: false,
    values: [true, false, true, 'Depends', false, 'Weeks'],
  },
];

function CellDisplay({ value, highlight }: { value: CellValue; highlight?: boolean }) {
  if (value === true) {
    return (
      <Text color={highlight ? 'yellow.300' : 'green.400'} fontWeight='bold' fontSize='lg'>
        ✓
      </Text>
    );
  }
  if (value === false) {
    return (
      <Text color='whiteAlpha.300' fontWeight='bold' fontSize='lg'>
        ✗
      </Text>
    );
  }
  return (
    <Text color={highlight ? 'yellow.200' : 'whiteAlpha.600'} fontSize='sm' fontWeight={highlight ? 'semibold' : 'normal'}>
      {value}
    </Text>
  );
}

// Mobile: one card per column (option)
function OptionCard({ col }: { col: Column }) {
  return (
    <Flex
      flexDirection='column'
      borderRadius='xl'
      overflow='hidden'
      border='1px solid'
      borderColor={col.highlight ? 'rgba(255,220,0,0.4)' : 'rgba(255,255,255,0.08)'}
      boxShadow={col.highlight ? '0 0 32px rgba(255,220,0,0.08)' : 'none'}
      position='relative'>
      {col.highlight && (
        <Box
          position='absolute'
          top={0}
          left={0}
          right={0}
          h='2px'
          bgGradient='linear(to-r, transparent, yellow.400, transparent)'
        />
      )}
      {/* Card header */}
      <Box
        px={5}
        py={4}
        backgroundColor={col.highlight ? 'rgba(255,220,0,0.08)' : 'rgba(0,0,0,0.5)'}>
        <Text
          color={col.highlight ? 'yellow.300' : 'white'}
          fontWeight='bold'
          fontSize='md'>
          {col.label}
        </Text>
        <Text color='whiteAlpha.500' fontSize='xs' mt={0.5}>
          {col.sublabel}
        </Text>
      </Box>
      {/* Feature rows */}
      {features.map((feature, i) => (
        <Flex
          key={feature}
          px={5}
          py={3}
          justifyContent='space-between'
          alignItems='center'
          backgroundColor={(() => {
            const even = i % 2 === 0;
            if (col.highlight) { return even ? 'rgba(255,220,0,0.03)' : 'rgba(255,220,0,0.01)'; }
            return even ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.15)';
          })()}
          borderTop='1px solid rgba(255,255,255,0.05)'>
          <Text color='whiteAlpha.700' fontSize='xs' maxW='60%' lineHeight='short'>
            {feature}
          </Text>
          <CellDisplay value={col.values[i]} highlight={col.highlight} />
        </Flex>
      ))}
    </Flex>
  );
}

// Desktop: classic table
function DesktopTable() {
  return (
    <Box borderRadius='xl' border='1px solid rgba(255,255,255,0.08)' overflow='hidden'>
      {/* Header */}
      <SimpleGrid columns={4} backgroundColor='rgba(0,0,0,0.6)' borderBottom='1px solid rgba(255,255,255,0.08)'>
        <Box px={6} py={5} />
        {columns.map((col) => (
          <Box
            key={col.key}
            px={6}
            py={5}
            borderLeft='1px solid rgba(255,255,255,0.08)'
            backgroundColor={col.highlight ? 'rgba(255,220,0,0.07)' : 'transparent'}
            borderTop={col.highlight ? '2px solid rgba(255,220,0,0.5)' : '2px solid transparent'}
            position='relative'>
            {col.highlight && (
              <Box
                position='absolute'
                top={0}
                left={0}
                right={0}
                h='2px'
                bgGradient='linear(to-r, transparent, yellow.400, transparent)'
              />
            )}
            <Text
              color={col.highlight ? 'yellow.300' : 'whiteAlpha.600'}
              fontSize='xs'
              fontWeight='bold'
              textTransform='uppercase'
              letterSpacing='wider'>
              {col.label}
            </Text>
            <Text color='whiteAlpha.400' fontSize='xs' mt={1}>
              {col.sublabel}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      {/* Rows */}
      {features.map((feature, i) => (
        <SimpleGrid
          key={feature}
          columns={4}
          backgroundColor={i % 2 === 0 ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.15)'}
          borderBottom={i < features.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'}>
          <Box px={6} py={4}>
            <Text color='whiteAlpha.800' fontSize='sm'>{feature}</Text>
          </Box>
          {columns.map((col) => (
            <Box
              key={col.key}
              px={6}
              py={4}
              display='flex'
              alignItems='center'
              borderLeft='1px solid rgba(255,255,255,0.05)'
              backgroundColor={col.highlight ? 'rgba(255,220,0,0.04)' : 'transparent'}>
              <CellDisplay value={col.values[i]} highlight={col.highlight} />
            </Box>
          ))}
        </SimpleGrid>
      ))}
    </Box>
  );
}

export function ComparisonTable() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <AnimateOnView>
      <Flex
        w='full'
        flexDirection='column'
        gap={10}
        py={{ base: 10, md: 24 }}
        color='white'>
        <Flex flexDirection='column' gap={3}>
          <Text fontWeight='semibold' fontSize={{ base: '16px', md: '20px' }}>
            Why Mocha
          </Text>
          <Text
            fontSize={{ base: '28px', md: '48px' }}
            lineHeight={{ base: '32px', md: '52px' }}
            maxW='2xl'>
            The fastest path to cross-server chat
          </Text>
          <Text color='whiteAlpha.600' fontSize='sm' maxW='xl' lineHeight='tall'>
            Compared to alternatives, Mocha gives your community cross-server messaging in minutes — no dev work, no coordination overhead.
          </Text>
        </Flex>

        {isMobile ? (
          <StaggerContainer staggerDelay={0.1}>
            <Flex flexDirection='column' gap={4}>
              {columns.map((col) => (
                <motion.div key={col.key} variants={staggerItem}>
                  <OptionCard col={col} />
                </motion.div>
              ))}
            </Flex>
          </StaggerContainer>
        ) : (
          <DesktopTable />
        )}
      </Flex>
    </AnimateOnView>
  );
}
