import {
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spinner,
  Tag,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Trans, useTranslation } from 'next-i18next';
import getConfig from 'next/config';
import NextLink from 'next/link';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { FiFilter as FilterIcon } from 'react-icons/fi';
import { IoSearch as SearchIcon } from 'react-icons/io5';
import { LuMoveLeft as BackIcon } from 'react-icons/lu';
import { useInView } from 'react-intersection-observer';

import { useSearchRoomInfiniteQuery } from '@/modules/room/roomHook';
import { debounce } from '@/shared/debounce';
import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

import { RoomCardItem } from './RoomCardItem';
import {
  DEFAULT_FILTER,
  RoomSearchFilterContainer,
} from './RoomSearchFilterContainer';
import type { Filter as SearchFilter } from './RoomSearchFilterContainer';

const { publicRuntimeConfig } = getConfig();

const CREATE_ROOM_URL = publicRuntimeConfig.createRoomDocsUrl;

export function RoomSearchContainer() {
  const { t } = useTranslation();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [filter, setFilter] = useState<SearchFilter>(DEFAULT_FILTER);
  const [query, setQuery] = useState('');
  const mobileDrawerDisclosure = useDisclosure();

  const searchRoomQuery = useSearchRoomInfiniteQuery(
    {
      q: query,
      channel_join_max: filter.channelJoinMax,
      channel_join_min: filter.channelJoinMin,
      rate: filter.rating,
      tags: filter.tags.map((tag) => tag.name),
    },
    { enabled: true },
  );

  const filterActiveCount = useMemo(() => {
    let count = 0;

    if (filter.channelJoinMax || filter.channelJoinMin) {
      count += 1;
    }

    if (filter.rating) {
      count += 1;
    }

    if (filter.tags.length > 0) {
      count += 1;
    }

    return count;
  }, [filter]);

  const { ref, inView } = useInView({
    threshold: 0.92,
  });

  useEffect(() => {
    if (
      inView &&
      searchRoomQuery.hasNextPage &&
      !searchRoomQuery.isFetchingNextPage
    ) {
      searchRoomQuery.fetchNextPage();
    }
  }, [
    inView,
    searchRoomQuery.hasNextPage,
    searchRoomQuery.isFetchingNextPage,
    searchRoomQuery.fetchNextPage,
    searchRoomQuery,
  ]);

  return (
    <Layout
      containerProps={{
        bgSize: 'contain',
        bgImage: {
          base: '/assets/images/search-room-background-image-mobile.svg',
          md: '/assets/images/search-room-background-image-desktop.svg',
        },
      }}>
      <Container pt={6} minH='100vh'>
        <NextLink href='/'>
          <HStack spacing={2} color='white'>
            <Icon as={BackIcon} />
            <Text fontSize='14px'>Homepage</Text>
          </HStack>
        </NextLink>
        <Heading
          mt={{ base: 4, md: 6 }}
          fontSize={{ base: '40px', md: '64px' }}
          fontWeight={500}>
          {isMobile
            ? t('common:search.title_mobile')
            : t('common:search.title_desktop')}
        </Heading>
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(12, 1fr)' }}
          gap={6}
          my={8}>
          {/* TODO: make the filter sticky when scroll */}
          <GridItem colSpan={{ base: 1, md: 4 }}>
            <Flex flexDir='column' gap={4}>
              <InputGroup>
                <Input
                  placeholder={t('common:search.filter.name_placeholder')}
                  borderWidth={0}
                  bgColor='background.dark'
                  borderRadius='16px'
                  fontSize={{ base: '18px', md: '14px' }}
                  height={12}
                  onChange={debounce((e) => setQuery(e.target.value), 300)}
                />
                <InputRightElement height={12}>
                  <Icon as={SearchIcon} fontSize='28px' />
                </InputRightElement>
              </InputGroup>
              <Flex
                flexDir='column'
                bgColor='background.dark'
                borderRadius='2xl'
                p={5}
                gap={6}
                display={{ base: 'none', md: 'flex' }}>
                <RoomSearchFilterContainer onFilterChange={setFilter} />
              </Flex>
              <Flex
                display={{ base: 'flex', md: 'none' }}
                justifyContent='center'
                alignItems='center'
                flexDir='row'
                bgColor='background.dark'
                borderRadius='2xl'
                p={4}
                gap={3}
                cursor='pointer'
                onClick={mobileDrawerDisclosure.onOpen}>
                <Icon as={FilterIcon} fontSize='16px' />
                <Text fontSize='14px'>Filter Results</Text>
                <Tag size='sm' bgColor='rgba(255, 255, 255, 0.1)' color='white'>
                  {filterActiveCount}
                </Tag>
              </Flex>
            </Flex>
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 8 }}>
            <Flex flexDir='column' gap={6}>
              <Text>
                <Trans
                  i18nKey='common:search.found_rooms'
                  components={{
                    b: <strong />,
                  }}
                  count={searchRoomQuery.data?.pages[0]?.pagination?.total || 0}
                />
              </Text>
              {/* LOADING */}
              {searchRoomQuery.isLoading && <Spinner />}

              {/* DATA */}
              {!searchRoomQuery.isLoading &&
                searchRoomQuery.data?.pages &&
                searchRoomQuery.data.pages.length > 0 && (
                  <Flex flexDir='column' gap={4}>
                    {searchRoomQuery.data.pages.map((page, idx) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Fragment key={idx}>
                        {page.rooms.map((room) => (
                          <NextLink
                            key={room.serial}
                            href={`/room/${room.slug}`}>
                            <RoomCardItem room={room} />
                          </NextLink>
                        ))}
                      </Fragment>
                    ))}
                  </Flex>
                )}

              {/* INFINITE SCROLL */}
              <div ref={ref}>
                {searchRoomQuery.isFetchingNextPage && <Spinner />}
              </div>

              {/* EMPTY STATE */}
              {!searchRoomQuery.isLoading &&
                (searchRoomQuery.data?.pages[0]?.rooms?.length ?? 0) <= 0 && (
                  <EmptyState />
                )}
            </Flex>
          </GridItem>
        </Grid>
      </Container>
      <MobileDrawer
        isOpen={mobileDrawerDisclosure.isOpen}
        onClose={mobileDrawerDisclosure.onClose}
        onFilterChange={setFilter}
        filter={filter}
      />
    </Layout>
  );
}

function EmptyState() {
  return (
    <Text
      fontWeight={500}
      fontSize={{
        base: '40px',
        md: '56px',
      }}
      lineHeight={{
        base: '40px',
        md: '56px',
      }}
      textAlign='right'>
      <Text as='span' color='rgba(255, 255, 255, 0.6)'>
        <Trans
          i18nKey='common:search.not_found'
          components={{
            a: (
              <Link
                href={CREATE_ROOM_URL}
                isExternal
                fontWeight={700}
                color='white'
                textDecoration='underline'
                transition='all 0.1s ease-in-out'
                _hover={{
                  opacity: 0.8,
                }}
              />
            ),
          }}
        />
      </Text>
    </Text>
  );
}

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onFilterChange: (filter: SearchFilter) => void;
  filter?: SearchFilter;
};

function MobileDrawer({
  isOpen,
  onClose,
  onFilterChange,
  filter,
}: MobileDrawerProps) {
  const handleFilterChange = (newFilter: SearchFilter) => {
    onFilterChange(newFilter);
    onClose();
  };

  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='full'>
      <DrawerOverlay
        backdropFilter='blur(10px)'
        transition='all 0.7s'
        marginTop={16}>
        <DrawerContent bg='transparent'>
          <DrawerBody w='full' overflow='hidden' zIndex={10} pt={6}>
            <Flex flexDir='column' gap={6}>
              <Flex justifyContent='space-between' alignItems='center'>
                <Text color='white'>Filter Results</Text>
                <CloseButton size='sm' onClick={onClose} />
              </Flex>
              <RoomSearchFilterContainer
                onFilterChange={handleFilterChange}
                value={filter}
              />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
