import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';

type StepProps = {
  step: number;
  title: string;
  description: string;
  command: string;
  commandLabel: string;
  tip?: string;
};

function Step({ step, title, description, command, commandLabel, tip }: StepProps) {
  return (
    <Flex
      flexDirection='column'
      gap={4}
      p={8}
      borderRadius='xl'
      backgroundColor='rgba(0, 0, 0, 0.4)'
      border='1px solid rgba(255, 255, 255, 0.08)'
      position='relative'
      overflow='hidden'
      h='full'>
      <Text
        position='absolute'
        top={-4}
        right={4}
        fontSize='9xl'
        fontWeight='bold'
        color='rgba(255, 255, 255, 0.04)'
        lineHeight='none'
        userSelect='none'>
        {step}
      </Text>

      <Box
        w={8}
        h={8}
        borderRadius='full'
        backgroundColor='rgba(255, 255, 255, 0.1)'
        border='1px solid rgba(255, 255, 255, 0.2)'
        display='flex'
        alignItems='center'
        justifyContent='center'
        flexShrink={0}>
        <Text color='white' fontSize='sm' fontWeight='bold'>
          {step}
        </Text>
      </Box>

      <Text color='white' fontSize='xl' fontWeight='semibold'>
        {title}
      </Text>

      <Text color='whiteAlpha.700' fontSize='sm' lineHeight='tall' flex={1}>
        {description}
      </Text>

      <Flex flexDirection='column' gap={1}>
        <Text color='whiteAlpha.400' fontSize='xs' textTransform='uppercase' letterSpacing='wider'>
          {commandLabel}
        </Text>
        <Box
          as='code'
          display='inline-block'
          px={3}
          py={2}
          borderRadius='md'
          backgroundColor='rgba(255, 255, 255, 0.06)'
          border='1px solid rgba(255, 255, 255, 0.08)'
          color='whiteAlpha.800'
          fontSize='sm'
          w='full'>
          {command}
        </Box>
      </Flex>

      {tip && (
        <Flex
          gap={2}
          p={3}
          borderRadius='md'
          backgroundColor='rgba(255, 255, 255, 0.03)'
          border='1px solid rgba(255, 255, 255, 0.06)'
          alignItems='flex-start'>
          <Text color='yellow.400' fontSize='xs' flexShrink={0}>
            ✦
          </Text>
          <Text color='whiteAlpha.500' fontSize='xs' lineHeight='tall'>
            {tip}
          </Text>
        </Flex>
      )}
    </Flex>
  );
}

const steps: StepProps[] = [
  {
    step: 1,
    title: 'Invite Mocha to your server',
    description:
      'Add the Mocha bot to your Discord server from the dashboard. You only need to do this once per server — Mocha is now ready to manage rooms in any channel you choose.',
    commandLabel: 'then in Discord',
    command: '/room create',
    tip: 'The creator of a room becomes its owner and can manage settings, members, and permissions.',
  },
  {
    step: 2,
    title: 'Discover rooms to join',
    description:
      'Browse public rooms on mocha-bot.xyz/search. Each room page shows its name, description, rating, and how many servers have already joined. When you find one you like, click "Join Room" to get the room ID.',
    commandLabel: 'room page url',
    command: 'mocha-bot.xyz/room/<slug>',
    tip: 'The room ID looks like rm_xxxxxx. Copy it directly from the Join Room modal — you will need it in the next step.',
  },
  {
    step: 3,
    title: 'Link a channel to the room',
    description:
      'Go to your Discord server, pick the channel you want to bridge, and run the join command with the room ID you copied. Mocha links that channel to the room instantly — no approval needed.',
    commandLabel: 'in your discord channel',
    command: '/room join <room_id>',
    tip: 'Each channel joins independently. One server can connect different channels to different rooms at the same time.',
  },
  {
    step: 4,
    title: 'Chat across every server',
    description:
      'Once joined, messages sent in that channel appear in every other server connected to the same room — in real time. No bots to ping, no relay delays. Just type and your words reach the whole room.',
    commandLabel: 'just start typing',
    command: '# messages sync in real time',
    tip: 'Room owners can restrict @mentions and set message filters to keep the cross-server chat clean.',
  },
];

export function HowItWorks() {
  return (
    <Flex
      w='full'
      flexDirection='column'
      gap={10}
      py={{ base: 10, md: 24 }}
      color='white'>
      <Flex flexDirection='column' gap={3}>
        <Text fontWeight='semibold' fontSize={{ base: '16px', md: '20px' }}>
          How it works
        </Text>
        <Text
          fontSize={{ base: '28px', md: '48px' }}
          lineHeight={{ base: '32px', md: '52px' }}
          maxW='2xl'>
          From zero to cross-server chat in four steps
        </Text>
        <Text color='whiteAlpha.600' fontSize='sm' maxW='xl' lineHeight='tall'>
          Mocha works at the channel level — one channel joins one room. Any server, any channel, any room.
        </Text>
      </Flex>
      <SimpleGrid columns={[1, null, 2, 4]} gap={6}>
        {steps.map((s) => (
          <Step key={s.step} {...s} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
