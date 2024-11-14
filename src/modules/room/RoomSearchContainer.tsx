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
  Spinner,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Trans, useTranslation } from 'next-i18next';
import { useState } from 'react';
import { IoSearch as SearchIcon } from 'react-icons/io5';
import { LuMoveLeft as BackIcon } from 'react-icons/lu';

import { useSearchRoomQuery } from '@/modules/room/roomHook';
import { debounce } from '@/shared/debounce';
import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

import { RoomCardItem } from './RoomCardItem';

export function RoomSearchContainer() {
  const { t } = useTranslation();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [query, setQuery] = useState('');
  const searchRoomQuery = useSearchRoomQuery({
    query,
  });

  return (
    <Layout bgImage='/assets/images/search-room-background-image.svg'>
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
                  count={searchRoomQuery.data?.rooms.length || 0}
                />
                {/* TODO: change to use pagination data after infinite scroll implemented */}
                {/* <strong>Found {searchRoomQuery.data?.rooms.length}</strong>{' '}
                rooms match your filters */}
              </Text>
              {searchRoomQuery.isLoading ? (
                <Spinner />
              ) : (
                <Flex flexDir='column' gap={4}>
                  {searchRoomQuery.data?.rooms.map((room) => (
                    <RoomCardItem key={room.serial} room={room} />
                  ))}
                </Flex>
              )}
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
}
