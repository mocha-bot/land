import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';

type UseCaseProps = {
  emoji: string;
  title: string;
  scenario: string;
  benefit: string;
};

function UseCaseCard({ emoji, title, scenario, benefit }: UseCaseProps) {
  return (
    <Flex
      flexDirection='column'
      gap={4}
      p={6}
      borderRadius='xl'
      backgroundColor='rgba(0, 0, 0, 0.3)'
      border='1px solid rgba(255, 255, 255, 0.08)'
      h='full'>
      <Text fontSize='2xl'>{emoji}</Text>
      <Text color='white' fontSize='lg' fontWeight='semibold'>
        {title}
      </Text>
      <Text color='whiteAlpha.600' fontSize='sm' lineHeight='tall' flex={1}>
        {scenario}
      </Text>
      <Box
        px={3}
        py={2}
        borderRadius='md'
        backgroundColor='rgba(255, 255, 255, 0.04)'
        border='1px solid rgba(255, 255, 255, 0.06)'>
        <Text color='whiteAlpha.500' fontSize='xs' lineHeight='tall'>
          {benefit}
        </Text>
      </Box>
    </Flex>
  );
}

const useCases: UseCaseProps[] = [
  {
    emoji: '🎮',
    title: 'Gaming communities',
    scenario:
      'Five different Discord servers all play the same game but stay siloed. With Mocha, each server links a channel to a shared room — players find teammates, share clips, and coordinate events across every server at once.',
    benefit: 'One room replaces five separate "looking for group" channels.',
  },
  {
    emoji: '📚',
    title: 'Study groups',
    scenario:
      'Students from different universities create their own servers but want to collaborate on the same subject. A Mocha room connects all of them — questions get answers from a much wider pool of people.',
    benefit: 'Bigger knowledge pool, same familiar server.',
  },
  {
    emoji: '🛠️',
    title: 'Open source projects',
    scenario:
      'A project has contributors spread across many communities. Linking a #contributors channel from each server into one Mocha room keeps discussion, PRs, and announcements visible to everyone without forcing a server migration.',
    benefit: 'No more "did you see the announcement?" — everyone did.',
  },
  {
    emoji: '🎨',
    title: 'Creator networks',
    scenario:
      'Content creators each run their own fan server. A Mocha room lets them bridge a collab channel — fans from every server interact, discover new creators, and cross-pollinate communities organically.',
    benefit: 'Community growth without losing server identity.',
  },
  {
    emoji: '🌏',
    title: 'Regional communities',
    scenario:
      'A brand or game has one server per region. A global Mocha room unifies them for announcements and cross-region events, while each regional server keeps its own language channels separate.',
    benefit: 'Global reach, local feel.',
  },
  {
    emoji: '🏢',
    title: 'Events & conferences',
    scenario:
      'Organizers spin up an event room, then every participating community server joins. Attendees chat, ask speakers questions, and share resources — all from their home server without switching.',
    benefit: 'Event chat without herding everyone into a new server.',
  },
];

export function UseCases() {
  return (
    <Flex
      w='full'
      flexDirection='column'
      gap={10}
      py={{ base: 10, md: 24 }}
      color='white'>
      <Flex flexDirection='column' gap={3}>
        <Text fontWeight='semibold' fontSize={{ base: '16px', md: '20px' }}>
          Who uses Mocha
        </Text>
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
      <SimpleGrid columns={[1, null, 2, 3]} gap={6}>
        {useCases.map((uc) => (
          <UseCaseCard key={uc.title} {...uc} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}
