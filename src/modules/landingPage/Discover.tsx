import {
  Flex,
  HStack,
  Image,
  SimpleGrid,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { CiServer } from 'react-icons/ci';

import { HorizontalScroll } from '@/components/HorizontalScroll/HorizontalScroll';

type ItemProps = {
  roomName: string;
  roomSerial: string;
  totalChannels: number;
  description: string;
  photoUrl: string;
};

function Item({ roomName, totalChannels, description, photoUrl }: ItemProps) {
  return (
    <Flex
      justifyContent='flex-start'
      alignItems='flex-start'
      gap={4}
      p={4}
      flexDirection='column'
      borderRadius={16}
      backgroundColor='rgba(0, 0, 0, 0.4)'
      w='full'
      maxH={64}>
      <HStack spacing={4}>
        <Image
          src={photoUrl}
          alt={roomName}
          borderRadius='lg'
          w={16}
          h={16}
          objectFit='cover'
        />
        <VStack spacing={2} w='full'>
          <Text as='h2' fontWeight='light' fontSize='xl' w='full'>
            {roomName}
          </Text>
          <HStack spacing={2} justifyContent='center'>
            <CiServer />
            <Text as='h3' fontWeight='light' fontSize='md' w='full'>
              {totalChannels} channels joined
            </Text>
          </HStack>
        </VStack>
      </HStack>
      <Text as='h3' fontWeight='light' fontSize='sm' noOfLines={3}>
        {description}
      </Text>
    </Flex>
  );
}

const items = [
  {
    roomName: 'Mocha Room',
    roomSerial: 'mocha-room',
    totalChannels: 100,
    description:
      'Mocha Room is a room for all Mocha users to share their experiences, ask questions, and get help from the community.',
    photoUrl: '/assets/images/logo-mocha.png',
  },
  {
    roomName: 'Tech Room',
    roomSerial: 'tech-room',
    totalChannels: 200,
    description:
      'Tech Room is a room for all tech enthusiasts to share their knowledge, ask questions, and get help from the community.',
    photoUrl: '/assets/images/logo-mocha.png',
  },
  {
    roomName: 'Game Room',
    roomSerial: 'game-room',
    totalChannels: 300,
    description:
      'Game Room is a room for all gamers to share their experiences, ask questions, and get help from the community.',
    photoUrl: '/assets/images/logo-mocha.png',
  },
];

function Discover() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      w='full'
      h='full'
      justifyContent='space-between'
      alignItems='flex-start'
      flexDirection='column'
      py={{ base: 8, md: 24 }}
      color='white'>
      <Text
        as='h2'
        fontWeight='semibold'
        fontSize={{
          base: '16px',
          md: '20px',
        }}>
        Discover Room
      </Text>
      <Text
        as='h2'
        mt={{
          base: 8,
          md: 6,
        }}
        mb={{
          base: 14,
          md: 20,
        }}
        fontWeight='500'
        maxW={{
          base: 'full',
          md: '80%',
        }}
        lineHeight={{
          base: '40px',
          md: '64px',
        }}
        fontSize={{
          base: '40px',
          md: '64px',
        }}>
        Like others, join, connect, and have mocha time together
      </Text>
      {isMobile ? (
        <HorizontalScroll
          items={items.map((item) => (
            <Item key={item.roomSerial} {...item} />
          ))}
        />
      ) : (
        <SimpleGrid columns={[1, 3]} gap={4} w='full'>
          {items.map((item) => (
            <Item key={item.roomSerial} {...item} />
          ))}
        </SimpleGrid>
      )}
    </Flex>
  );
}

export { Discover };
