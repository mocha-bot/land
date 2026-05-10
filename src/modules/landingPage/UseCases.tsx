import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

import { AnimateOnView, StaggerContainer, staggerItem } from '@/components/AnimateOnView/AnimateOnView';
import { solutions } from '@/modules/solutions/data';
import { SolutionCard } from '@/modules/solutions/SolutionCard';

export function UseCases() {
  return (
    <Flex
      w='full'
      flexDirection='column'
      gap={10}
      py={{ base: 10, md: 24 }}
      color='white'>
      <AnimateOnView>
        <Flex flexDirection='column' gap={3}>
          <Flex alignItems='center' justifyContent='space-between'>
            <Text fontWeight='semibold' fontSize={{ base: '16px', md: '20px' }}>
              Who uses Mocha
            </Text>
            <Box
              as={NextLink}
              href='/solutions'
              color='white'
              fontSize='sm'
              fontWeight='light'
              _hover={{ textDecoration: 'underline' }}>
              View all
            </Box>
          </Flex>
          <Text
            fontSize={{ base: '28px', md: '48px' }}
            lineHeight={{ base: '32px', md: '52px' }}
            maxW='2xl'>
            Any community that outgrows one server
          </Text>
          <Text color='whiteAlpha.600' fontSize='sm' maxW='xl' lineHeight='tall'>
            If your people are scattered across servers, Mocha brings the conversation together without forcing anyone to move.
          </Text>
        </Flex>
      </AnimateOnView>
      <StaggerContainer staggerDelay={0.08}>
        <SimpleGrid columns={[1, null, 2, 3]} gap={6}>
          {solutions.slice(0, 6).map((s) => (
            <motion.div key={s.slug} variants={staggerItem}>
              <SolutionCard solution={s} />
            </motion.div>
          ))}
        </SimpleGrid>
      </StaggerContainer>
    </Flex>
  );
}
