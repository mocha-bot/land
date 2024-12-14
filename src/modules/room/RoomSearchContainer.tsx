import {
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
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Trans, useTranslation } from 'next-i18next';
import getConfig from 'next/config';
import { Fragment, useEffect, useState } from 'react';
import { IoSearch as SearchIcon } from 'react-icons/io5';
import { LuMoveLeft as BackIcon } from 'react-icons/lu';
import { useInView } from 'react-intersection-observer';

import { useSearchRoomInfiniteQuery } from '@/modules/room/roomHook';
import { debounce } from '@/shared/debounce';
import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

import { RoomCardItem } from './RoomCardItem';

const { publicRuntimeConfig } = getConfig();

const CREATE_ROOM_URL = publicRuntimeConfig.createRoomDocsUrl;

export function RoomSearchContainer() {
  const { t } = useTranslation();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [query, setQuery] = useState('');

  const searchRoomQuery = useSearchRoomInfiniteQuery(
    { query },
    { enabled: true },
  );

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
        <HStack spacing={2} color='white'>
          <Icon as={BackIcon} />
          <Text fontSize='14px'>Homepage</Text>
        </HStack>
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
          <GridItem colSpan={{ base: 1, md: 4 }}>
            <Flex>
              <InputGroup>
                <Input
                  placeholder={t('common:search.filter.name_placeholder')}
                  borderWidth={0}
                  bgColor='rgba(1, 1, 1, 0.4)'
                  borderRadius='16px'
                  fontSize={{ base: '18px', md: '14px' }}
                  height={12}
                  onChange={debounce((e) => setQuery(e.target.value), 300)}
                />
                <InputRightElement height={12}>
                  <Icon as={SearchIcon} fontSize='20px' />
                </InputRightElement>
              </InputGroup>
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
                          <RoomCardItem key={room.serial} room={room} />
                        ))}
                      </Fragment>
                    ))}
                    {/* {searchRoomQuery.data.pages.map((page) =>
                      page.rooms.map((room) => (
                        <RoomCardItem key={room.serial} room={room} />
                      )),
                    )} */}
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
