/* eslint-disable react/no-array-index-key */
import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  HStack,
  Icon,
  IconButton,
  Image,
  Stack,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import NextLink from 'next/link';
import React from 'react';
import {
  FiCalendar as CalendarIcon,
  FiHash as HashtagIcon,
  FiServer as ServerIcon,
  FiUsers as UsersIcon,
} from 'react-icons/fi';
import { IoIosStarOutline as StarIcon } from 'react-icons/io';
import { LuMoveLeft as BackIcon } from 'react-icons/lu';
import { MdInfoOutline as InfoIcon } from 'react-icons/md';

import Button from '@/uikit/Button';
import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

import type { Room } from '../roomEntity';

import { JoinRoomModal } from './JoinRoomModal';

type Props = {
  room: Room;
};

const SERVER_BANNER_URL = '/assets/images/detail-room-server-banner.png';
const SERVER_LOGO_URL = '/assets/images/logo-mocha.png';

export function RoomDetailContainer(props: Props) {
  const detailInfoModal = useDisclosure();
  const joinRoomModal = useDisclosure();
  const toast = useToast();

  const handleClickJoinRoom = () => {
    joinRoomModal.onOpen();
  };

  const handleClickCopyRoomCode = () => {
    navigator.clipboard.writeText(props.room.serial);
    toast({
      title: 'Room ID copied',
      description: 'You can paste it to invite your friends',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'bottom',
    });
  };

  return (
    <Layout
      containerProps={{
        bgSize: {
          base: 'cover',
          md: 'contain',
        },
        bgImage: {
          base: '/assets/images/search-room-background-image-mobile.svg',
          md: '/assets/images/detail-room-background-image.svg',
        },
      }}>
      <Container pt={6} minH='100vh'>
        <NextLink href='/search'>
          <HStack spacing={2} color='white'>
            <Icon as={BackIcon} />
            <Text fontSize='14px'>Discover Room</Text>
          </HStack>
        </NextLink>
        <Grid templateColumns='repeat(12, 1fr)' gap={4}>
          <GridItem
            colSpan={{
              base: 12,
              md: 8,
            }}>
            <Flex flexDir='column' gap={8}>
              {/* top info */}
              <Flex flexDir='column' gap={6}>
                <Flex flexDir='row'>
                  <Image
                    src={SERVER_LOGO_URL}
                    width={28}
                    height={28}
                    alt='server'
                    borderRadius='12px'
                  />
                  <Flex flexDir='column' gap={1} justifyContent='center'>
                    <Text
                      fontWeight={600}
                      fontSize={{
                        base: '20px',
                        md: '40px',
                      }}
                      lineHeight='50px'>
                      {props.room.name}
                    </Text>
                    <HStack spacing={3}>
                      <HStack spacing={1}>
                        <Icon
                          as={StarIcon}
                          fontSize={{
                            base: '16px',
                            md: '20px',
                          }}
                        />
                        <Text
                          fontWeight={400}
                          fontSize={{
                            base: '16px',
                            md: '24px',
                          }}
                          lineHeight='30px'>
                          {props.room.rate.averageRating}
                          <Box
                            as='span'
                            display={{ base: 'none', md: 'inline' }}>
                            {' '}
                            from {props.room.rate.ratingCount} reviews
                          </Box>
                        </Text>
                      </HStack>
                      <Divider orientation='vertical' bgColor='white' />
                      <HStack spacing={1}>
                        <Icon
                          as={ServerIcon}
                          fontSize={{
                            base: '16px',
                            md: '20px',
                          }}
                        />
                        <Text
                          fontWeight={400}
                          fontSize={{
                            base: '16px',
                            md: '24px',
                          }}
                          lineHeight='30px'>
                          {props.room.totalChannel} Server Joined
                        </Text>
                      </HStack>
                    </HStack>
                  </Flex>
                </Flex>
                {/* mobile screen */}
                <Stack
                  direction='column'
                  display={{
                    base: 'block',
                    md: 'none',
                  }}>
                  <Flex flexDir='row' gap={4}>
                    <Button
                      w='full'
                      variant='glass'
                      py={5}
                      px={6}
                      isAnimated
                      onClick={handleClickJoinRoom}>
                      Join Room
                    </Button>
                    {/* TODO: implement report system when the BE is ready */}
                    {/* <Flex
                      p={3}
                      borderRadius='100%'
                      backgroundColor='background.dark'
                      minW={12}
                      minH={12}
                      justifyContent='center'
                      alignItems='center'>
                      <Icon as={AlertIcon} m='auto' fontSize='20px' />
                    </Flex> */}
                  </Flex>
                  <Button
                    w='full'
                    variant='glass'
                    py={5}
                    px={6}
                    mt={3}
                    borderRadius='16px'
                    borderWidth={0}
                    leftIcon={<Icon as={InfoIcon} />}
                    onClick={() => detailInfoModal.onOpen()}>
                    Info
                  </Button>
                </Stack>
              </Flex>
              {/* overview */}
              <Flex flexDir='column' gap={6}>
                <Box
                  borderBottomWidth='1px'
                  borderBottomColor='rgba(255,255,255,0.5))'
                  py={3}>
                  <Text>Overview</Text>
                </Box>
                <Image
                  src={SERVER_BANNER_URL}
                  objectFit='cover'
                  alt={props.room.name}
                  height={{
                    base: '180px',
                    md: '300px',
                  }}
                  borderRadius='16px'
                />
                <Text>{props.room.description}</Text>
              </Flex>
              {/* server joined */}
              {/* TODO: show server joined when API is ready */}
              {/* <Flex flexDir='column' gap={6}>
                <Box
                  borderBottomWidth='1px'
                  borderBottomColor='rgba(255,255,255,0.5))'
                  py={3}>
                  <Text>Server Joined</Text>
                </Box>
                <Grid templateColumns='repeat(2, 1fr)' gap={8}>
                  {props.room.servers.map((server, idx) => (
                    <GridItem
                      // eslint-disable-next-line react/no-array-index-key
                      key={idx}
                      colSpan={{
                        base: 2,
                        md: 1,
                      }}>
                      <Flex
                        p={{
                          base: 0,
                          md: 4,
                        }}
                        flexDir='row'
                        gap={3}
                        alignItems='center'>
                        <Image
                          src={server.image}
                          width={14}
                          height={14}
                          alt='server'
                          borderRadius='16px'
                        />
                        <Flex flexDir='column' gap={1}>
                          <Text>{server.name}</Text>
                          <Flex flexDir='row' gap={1}>
                            <Icon as={UserIcon} />
                            <Text>Owner {server.owner}</Text>
                          </Flex>
                        </Flex>
                      </Flex>
                    </GridItem>
                  ))}
                </Grid>
              </Flex> */}
            </Flex>
          </GridItem>
          {/* desktop screen */}
          <GridItem
            colSpan={{
              base: 12,
              md: 4,
            }}
            display={{
              base: 'none',
              md: 'block',
            }}>
            <Flex flexDir='column' gap={8}>
              <Stack direction='column' gap={3}>
                <Flex flexDir='row' gap={4}>
                  <Button
                    w='full'
                    variant='glass'
                    py={5}
                    px={6}
                    isAnimated
                    onClick={handleClickJoinRoom}>
                    Join Room
                  </Button>
                  {/* TODO: implement report system when the BE is ready */}
                  {/* <Flexs */}
                </Flex>
                <Button
                  w='full'
                  variant='glass'
                  py={5}
                  px={6}
                  isAnimated
                  display={{
                    base: 'block',
                    md: 'none',
                  }}>
                  Info
                </Button>
              </Stack>
              <Box backgroundColor='background.dark' p={5} borderRadius='16px'>
                <DetailInfo room={props.room} />
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
      <MobileDetailInfo
        isOpen={detailInfoModal.isOpen}
        onClose={() => detailInfoModal.onClose()}
        room={props.room}
      />
      <JoinRoomModal
        isOpen={joinRoomModal.isOpen}
        onClose={() => joinRoomModal.onClose()}
        onClickCopy={handleClickCopyRoomCode}
        roomCode={props.room.serial}
        roomName={props.room.name}
      />
    </Layout>
  );
}

type DetailInfoProps = {
  onClickClose?: () => void;
  room: Room;
};

function DetailInfo(props: DetailInfoProps) {
  const detailInfo = [
    {
      icon: CalendarIcon,
      label: 'Created',
      value: dayjs(props.room.createdAt).format('MMM YYYY'),
    },
    // TODO: show language info when API is ready
    // {
    //   icon: GlobeIcon,
    //   label: 'Language',
    //   value: `${
    //     props.room.language.name
    //   } (${props.room.language.code.toUpperCase()})`,
    // },
    {
      icon: StarIcon,
      label: 'Rate',
      value: `${props.room.rate.averageRating} (${props.room.rate.ratingCount} reviews)`,
    },
    {
      icon: UsersIcon,
      label: 'Server Joined',
      value: props.room.totalChannel,
    },
  ];

  return (
    <Flex flexDir='column' gap={8}>
      {/* TODO: show server owner info when API is ready */}
      {/* server owner info */}
      {/* <Flex flexDir='column' gap={3}>
        <Flex flexDir='row' justifyContent='space-between' alignItems='center'>
          <Text fontSize='14px' fontWeight={700}>
            Owner
          </Text>
        </Flex>
        <Flex flexDir='row' gap={3}>
          <Image
            // TODO: change to real logo of the owner
            src={props.room.serverOwner.image}
            width={14}
            height={14}
            alt='server-owner'
            borderRadius='16px'
          />
          <Flex flexDir='column'>
            <Text fontSize='20px' fontWeight={600}>
              {props.room.serverOwner.name}
            </Text>
            <Text>{props.room.serverOwner.owner}</Text>
          </Flex>
        </Flex>
      </Flex> */}
      {props.onClickClose && (
        <IconButton
          onClick={props.onClickClose}
          icon={<CloseIcon />}
          variant='ghost'
          aria-label='Toggle Navigation'
          color='white'
          _hover={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          }}
          size='sm'
          borderRadius='100%'
          position='absolute'
          right={4}
        />
      )}
      {/* detail info */}
      <Flex gap={3} flexDir='column'>
        <Text fontSize='14px' fontWeight={700}>
          Details
        </Text>
        {detailInfo.map((info, idx) => (
          <Flex flexDir='row' key={idx}>
            <Icon as={info.icon} fontSize='20px' />
            <Text fontWeight={500} ml={2}>
              {info.label}
            </Text>
            <Text opacity={0.5} ml={3}>
              {info.value}
            </Text>
          </Flex>
        ))}
      </Flex>
      {/* room tags */}
      {props.room.tags.length > 0 && (
        <Flex flexDir='column' gap={3}>
          <Text fontSize='14px' fontWeight={700}>
            Room Tag
          </Text>
          <HStack spacing={2}>
            {props.room.tags.map((tag) => (
              <Tag
                key={tag}
                fontSize='14px'
                bgColor='transparent'
                color='white'
                pl={0}>
                <TagLeftIcon as={HashtagIcon} mr={1} />
                <TagLabel>{tag}</TagLabel>
              </Tag>
            ))}
          </HStack>
        </Flex>
      )}
    </Flex>
  );
}

type MobileDetailInfoProps = DetailInfoProps & {
  isOpen: boolean;
  onClose: () => void;
};

function MobileDetailInfo({ isOpen, onClose, ...rest }: MobileDetailInfoProps) {
  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='full'>
      <DrawerOverlay
        backdropFilter='blur(10px)'
        transition='all 0.7s'
        marginTop={16}>
        <DrawerContent bg='transparent'>
          <DrawerBody w='full' overflow='hidden' zIndex={10} pt={6}>
            <DetailInfo onClickClose={onClose} {...rest} />
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
