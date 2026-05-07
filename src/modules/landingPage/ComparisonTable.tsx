import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';

import { AnimateOnView } from '@/components/AnimateOnView/AnimateOnView';

type CellValue = true | false | string;

type Row = {
  feature: string;
  mocha: CellValue;
  manual: CellValue;
  custom: CellValue;
};

const rows: Row[] = [
  { feature: 'Cross-server messaging',      mocha: true,       manual: false,        custom: true },
  { feature: 'Public room directory',        mocha: true,       manual: false,        custom: false },
  { feature: 'No server migration needed',   mocha: true,       manual: true,         custom: true },
  { feature: 'Built-in moderation tools',    mocha: true,       manual: false,        custom: 'Depends' },
  { feature: 'Free to start',               mocha: true,       manual: true,         custom: false },
  { feature: 'Setup time',                  mocha: 'Minutes',  manual: 'Days',       custom: 'Weeks' },
];

function Cell({ value, highlight }: { value: CellValue; highlight?: boolean }) {
  if (value === true) {
    return (
      <Text
        color={highlight ? 'yellow.300' : 'white'}
        fontWeight='semibold'
        fontSize='lg'>
        ✓
      </Text>
    );
  }
  if (value === false) {
    return (
      <Text color='whiteAlpha.300' fontWeight='semibold' fontSize='lg'>
        ✗
      </Text>
    );
  }
  return (
    <Text
      color={highlight ? 'yellow.200' : 'whiteAlpha.700'}
      fontSize='sm'
      fontWeight={highlight ? 'semibold' : 'normal'}>
      {value}
    </Text>
  );
}

const COL_HEADERS = [
  { label: 'Mocha', highlight: true },
  { label: 'Manual server\npartnerships', highlight: false },
  { label: 'Build your\nown bot', highlight: false },
];

export function ComparisonTable() {
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
            Compared to the alternatives, Mocha gives your community cross-server messaging in minutes — no dev work, no coordination overhead.
          </Text>
        </Flex>

        <Box
          borderRadius='xl'
          border='1px solid rgba(255,255,255,0.08)'
          overflow='hidden'>
          {/* Header row */}
          <SimpleGrid
            columns={4}
            backgroundColor='rgba(0,0,0,0.5)'
            borderBottom='1px solid rgba(255,255,255,0.08)'>
            <Box px={6} py={4} />
            {COL_HEADERS.map((col) => (
              <Box
                key={col.label}
                px={6}
                py={4}
                borderLeft='1px solid rgba(255,255,255,0.08)'
                backgroundColor={col.highlight ? 'rgba(255,220,0,0.06)' : 'transparent'}
                borderTop={col.highlight ? '2px solid rgba(255,220,0,0.5)' : '2px solid transparent'}>
                <Text
                  color={col.highlight ? 'yellow.300' : 'whiteAlpha.600'}
                  fontSize='xs'
                  fontWeight='bold'
                  textTransform='uppercase'
                  letterSpacing='wider'
                  whiteSpace='pre-line'>
                  {col.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>

          {/* Data rows */}
          {rows.map((row, i) => (
            <SimpleGrid
              key={row.feature}
              columns={4}
              backgroundColor={i % 2 === 0 ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.15)'}
              borderBottom={i < rows.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none'}>
              <Box px={6} py={4}>
                <Text color='whiteAlpha.800' fontSize='sm'>
                  {row.feature}
                </Text>
              </Box>
              {([
                { value: row.mocha, highlight: true, key: 'mocha' },
                { value: row.manual, highlight: false, key: 'manual' },
                { value: row.custom, highlight: false, key: 'custom' },
              ] as { value: CellValue; highlight: boolean; key: string }[]).map((cell) => (
                <Box
                  key={cell.key}
                  px={6}
                  py={4}
                  display='flex'
                  alignItems='center'
                  borderLeft='1px solid rgba(255,255,255,0.05)'
                  backgroundColor={cell.highlight ? 'rgba(255,220,0,0.04)' : 'transparent'}>
                  <Cell value={cell.value} highlight={cell.highlight} />
                </Box>
              ))}
            </SimpleGrid>
          ))}
        </Box>
      </Flex>
    </AnimateOnView>
  );
}
