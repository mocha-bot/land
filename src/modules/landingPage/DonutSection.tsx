import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
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
            <Text
              color='whiteAlpha.400'
              fontSize='xs'
              maxW='lg'
              lineHeight='tall'
              mt={1}>
              Runs on the same cross-server infrastructure as Rooms — members
              from every connected server join the same matchmaking pool.
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
            <motion.div
              key={uc.title}
              variants={staggerItem}
              style={{ height: '100%' }}>
              <Box
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
                }}
                transition='all 0.2s'>
                <Text fontSize='lg' fontWeight='semibold' color='white'>
                  {uc.title}
                </Text>
                <Text
                  color='whiteAlpha.600'
                  fontSize='sm'
                  lineHeight='tall'
                  flex={1}>
                  {uc.description}
                </Text>
              </Box>
            </motion.div>
          ))}
        </SimpleGrid>
      </StaggerContainer>
    </Flex>
  );
}
