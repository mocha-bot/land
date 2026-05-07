import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import { AnimateOnView, StaggerContainer, staggerItem } from '@/components/AnimateOnView/AnimateOnView';

type Command = {
  cmd: string;
  description: string;
};

const roomCommands: Command[] = [
  { cmd: '/room create', description: 'Create a new cross-server room and become its owner.' },
  { cmd: '/room join <room_id>', description: 'Link the current channel to an existing room.' },
  { cmd: '/room leave', description: 'Unlink the current channel from its room.' },
  { cmd: '/room info', description: 'Show details about the room linked to this channel.' },
  { cmd: '/room list', description: 'List all rooms you own across your servers.' },
];

const modCommands: Command[] = [
  { cmd: '/room ban <user>', description: 'Ban a user from sending messages in the room.' },
  { cmd: '/room kick <user>', description: 'Remove a user from the room temporarily.' },
  { cmd: '/room slowmode <seconds>', description: 'Apply a cooldown between messages in the room.' },
  { cmd: '/room setting mention off', description: 'Block @everyone and @here mentions room-wide.' },
];

function CommandCard({ cmd, description }: Command) {
  return (
    <Flex
      flexDirection='column'
      gap={2}
      px={5}
      py={4}
      borderRadius='lg'
      backgroundColor='rgba(0, 0, 0, 0.35)'
      border='1px solid rgba(255, 255, 255, 0.07)'
      _hover={{ borderColor: 'rgba(255, 255, 255, 0.15)', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      transition='all 0.2s'>
      <Box
        as='code'
        fontSize='sm'
        color='yellow.300'
        fontFamily='mono'
        fontWeight='semibold'>
        {cmd}
      </Box>
      <Text color='whiteAlpha.600' fontSize='xs' lineHeight='tall'>
        {description}
      </Text>
    </Flex>
  );
}

type CategoryProps = {
  title: string;
  subtitle: string;
  commands: Command[];
};

function Category({ title, subtitle, commands }: CategoryProps) {
  return (
    <Flex flexDirection='column' gap={4}>
      <Flex flexDirection='column' gap={1}>
        <Text color='white' fontWeight='semibold' fontSize='md'>
          {title}
        </Text>
        <Text color='whiteAlpha.500' fontSize='xs'>
          {subtitle}
        </Text>
      </Flex>
      <StaggerContainer staggerDelay={0.06}>
        <Flex flexDirection='column' gap={3}>
          {commands.map((c) => (
            <motion.div key={c.cmd} variants={staggerItem}>
              <CommandCard {...c} />
            </motion.div>
          ))}
        </Flex>
      </StaggerContainer>
    </Flex>
  );
}

export function CommandReference() {
  return (
    <Flex
      w='full'
      flexDirection='column'
      gap={10}
      py={{ base: 10, md: 24 }}
      color='white'>
      <AnimateOnView>
        <Flex flexDirection='column' gap={3}>
          <Text fontWeight='semibold' fontSize={{ base: '16px', md: '20px' }}>
            Command reference
          </Text>
          <Text
            fontSize={{ base: '28px', md: '48px' }}
            lineHeight={{ base: '32px', md: '52px' }}
            maxW='2xl'>
            Everything you need, one slash away
          </Text>
          <Text color='whiteAlpha.600' fontSize='sm' maxW='xl' lineHeight='tall'>
            All Mocha commands are Discord slash commands — type <Box as='code' px={1} py={0.5} borderRadius='sm' bg='rgba(255,255,255,0.08)' fontSize='xs'>/</Box> in any channel to see them in-app.
          </Text>
        </Flex>
      </AnimateOnView>
      <SimpleGrid columns={[1, null, 2]} gap={10}>
        <Category
          title='Room management'
          subtitle='Create, join, and manage your cross-server rooms.'
          commands={roomCommands}
        />
        <Category
          title='Moderation'
          subtitle='Keep conversations healthy across every connected server.'
          commands={modCommands}
        />
      </SimpleGrid>
    </Flex>
  );
}
