import { Box, Flex, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NextLink from 'next/link';

import {
  AnimateOnView,
  StaggerContainer,
  staggerItem,
} from '@/components/AnimateOnView/AnimateOnView';
import Button from '@/uikit/Button';

const USE_CASES = [
  {
    title: 'Speed Dating',
    description: 'Rotate members through timed 1-on-1 chats.',
  },
  {
    title: 'Mentorship Circles',
    description: 'Match newcomers with experienced members.',
  },
  {
    title: 'Gaming Brackets',
    description: 'Auto-bracket players into match pairs for tournaments.',
  },
  {
    title: 'Community Icebreakers',
    description: 'Randomly pair members for warm-up chats.',
  },
];

const cardStyle = {
  bg: 'rgba(0, 0, 0, 0.3)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: 'xl',
  p: 5,
  h: 'full',
  _hover: {
    borderColor: 'rgba(255, 255, 255, 0.16)',
    bg: 'rgba(0, 0, 0, 0.45)',
  },
  transition: 'all 0.2s',
};

export function DonutSection() {
  return (
    <Flex w='full' py={{ base: 10, md: 24 }} flexDirection='column' gap={12}>
      <AnimateOnView>
        <Flex
          flexDirection={{ base: 'column', md: 'row' }}
          justifyContent='space-between'
          alignItems={{ base: 'flex-start', md: 'flex-end' }}
          gap={6}>
          <Flex flexDirection='column' gap={3}>
            <Text fontWeight='semibold' fontSize={{ base: '16px', md: '20px' }}>
              Donut
            </Text>
            <Text
              fontSize={{ base: '28px', md: '42px' }}
              lineHeight={{ base: 1.2, md: 1.1 }}
              fontWeight='bold'
              maxW='xl'>
              Community matchmaking for Discord
            </Text>
            <Text
              color='whiteAlpha.600'
              fontSize='sm'
              maxW='lg'
              lineHeight='tall'>
              Automatically pair your members for 1-on-1 or small-group
              interactions. Events, mentorship, icebreakers. Donut handles the
              pairing.
            </Text>
          </Flex>
          <Box flexShrink={0}>
            <Button
              as={NextLink}
              href='/donut'
              variant='glass-ghost'
              py={4}
              px={6}>
              Learn more
            </Button>
          </Box>
        </Flex>
      </AnimateOnView>

      <StaggerContainer>
        <SimpleGrid columns={[1, 2, 4]} gap={4} w='full'>
          {USE_CASES.map((uc) => (
            <motion.div key={uc.title} variants={staggerItem}>
              <Box {...cardStyle}>
                <VStack alignItems='flex-start' spacing={2}>
                  <Text fontSize='sm' fontWeight='semibold' color='white'>
                    {uc.title}
                  </Text>
                  <Text color='whiteAlpha.600' fontSize='xs' lineHeight='tall'>
                    {uc.description}
                  </Text>
                </VStack>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>
      </StaggerContainer>
    </Flex>
  );
}
