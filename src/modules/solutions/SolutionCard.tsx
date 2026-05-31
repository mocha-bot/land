import { Box, Text } from '@chakra-ui/react';
import NextLink from 'next/link';

import type { Solution } from './data';

type SolutionCardProps = {
  solution: Solution;
  isCompact?: boolean;
};

export function SolutionCard({
  solution,
  isCompact = false,
}: SolutionCardProps) {
  if (isCompact) {
    return (
      <Box
        as={NextLink}
        href={`/solutions/${solution.slug}`}
        display='block'
        px={3}
        py={2}
        borderRadius='md'
        _hover={{
          backgroundColor: 'rgba(255, 255, 255, 0.06)',
          textDecoration: 'none',
        }}
        transition='background-color 0.15s'>
        <Text
          color='white'
          fontSize='sm'
          fontWeight='medium'
          lineHeight='1.3'
          mb={0.5}>
          {solution.title}
        </Text>
        <Text
          color='whiteAlpha.500'
          fontSize='xs'
          lineHeight='tall'
          noOfLines={1}>
          {solution.tagline}
        </Text>
      </Box>
    );
  }

  return (
    <Box
      as={NextLink}
      href={`/solutions/${solution.slug}`}
      display='flex'
      flexDirection='column'
      gap={4}
      p={6}
      borderRadius='xl'
      backgroundColor='rgba(0, 0, 0, 0.3)'
      border='1px solid rgba(255, 255, 255, 0.08)'
      h='full'
      _hover={{
        borderColor: 'rgba(255, 255, 255, 0.16)',
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        textDecoration: 'none',
      }}
      transition='all 0.2s'>
      <Box>
        <Text color='white' fontSize='lg' fontWeight='semibold' mb={1}>
          {solution.title}
        </Text>
        <Text
          color='whiteAlpha.500'
          fontSize='xs'
          fontWeight='medium'
          textTransform='uppercase'
          letterSpacing='wider'>
          {solution.tagline}
        </Text>
      </Box>
      <Text color='whiteAlpha.600' fontSize='sm' lineHeight='tall' flex={1}>
        {solution.description}
      </Text>
      <Text color='yellow.300' fontSize='sm' fontWeight='medium'>
        Learn more
      </Text>
    </Box>
  );
}
