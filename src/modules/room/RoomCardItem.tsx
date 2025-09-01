import {
  Divider,
  Flex,
  HStack,
  Icon,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FiHash as HashtagIcon, FiServer as ServerIcon } from 'react-icons/fi';
import { IoIosStarOutline as StarIcon } from 'react-icons/io';

import type { Room } from './roomEntity';

type Props = {
  room: Room;
};

const MAX_TAG_SHOW_COUNT = 2;
const SERVER_LOGO_URL = '/assets/images/logo-mocha.png';

export function RoomCardItem({ room }: Props) {
  return (
    <Flex
      flexDir='column'
      borderRadius='16px'
      p={4}
      gap={4}
      bgColor='background.dark'>
      <Flex flexDir='row' gap={3}>
        <Image
          src={SERVER_LOGO_URL}
          width={60}
          height={60}
          alt='server'
          style={{ borderRadius: '12px' }}
        />
        <Flex flexDir='column' gap={1}>
          <Text fontWeight={600} fontSize='20px'>
            {room.name}
          </Text>
          <HStack spacing={3}>
            <HStack spacing={1}>
              <Icon as={StarIcon} fontSize='16px' />
              <Text fontWeight={400}>{room.rate.averageRating.toFixed(2)}</Text>
            </HStack>
            <HStack spacing={1}>
              <Icon as={ServerIcon} fontSize='16px' />
              <Text fontWeight={400}>{room.totalChannel} Server Joined</Text>
            </HStack>
            {room.tags.length > 0 && (
              <HStack spacing={3} display={{ base: 'none', md: 'flex' }}>
                <Divider orientation='vertical' bgColor='white' />
                <HStack spacing={2}>
                  {room.tags.slice(0, MAX_TAG_SHOW_COUNT).map((tag) => (
                    <Tag
                      key={tag.serial}
                      fontSize='14px'
                      bgColor='rgba(255, 255, 255, 0.25)'
                      color='white'>
                      <TagLeftIcon as={HashtagIcon} mr={1} />
                      <TagLabel>{tag.name}</TagLabel>
                    </Tag>
                  ))}
                  {room.tags.length > MAX_TAG_SHOW_COUNT && (
                    <Tooltip
                      label={room.tags.slice(MAX_TAG_SHOW_COUNT).join(', ')}>
                      <Tag
                        fontSize='14px'
                        bgColor='rgba(255, 255, 255, 0.25)'
                        color='white'
                        cursor='pointer'>
                        <TagLabel>
                          +{room.tags.length - MAX_TAG_SHOW_COUNT}
                        </TagLabel>
                      </Tag>
                    </Tooltip>
                  )}
                </HStack>
              </HStack>
            )}
          </HStack>
        </Flex>
      </Flex>
      <Text noOfLines={2}>{room.description}</Text>
    </Flex>
  );
}
