// TODO: enhance this UI page
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  ListItem,
  Spinner,
  UnorderedList,
} from '@chakra-ui/react';
import { useState } from 'react';

import { useSearchRoomQuery } from '@/modules/room/roomHook';
import { debounce } from '@/shared/debounce';

function Search() {
  const [query, setQuery] = useState('');
  const searchRoomQuery = useSearchRoomQuery(
    {
      query,
    },
    {
      enabled: !!query,
    },
  );

  return (
    <Flex w='100%' h='100vh'>
      <Flex flexDir='column' justifyContent='center' mx='auto' my='auto'>
        <FormControl>
          <FormLabel htmlFor='roomName' fontWeight='normal' textAlign='center'>
            Room name
          </FormLabel>
          <Input
            id='roomName'
            placeholder='Insert room name'
            onChange={debounce((e) => setQuery(e.target.value), 300)}
          />
        </FormControl>
        {searchRoomQuery.isLoading ? (
          <Spinner />
        ) : (
          <Flex>
            <UnorderedList>
              {searchRoomQuery.data?.map((room) => (
                <ListItem key={room.serial}>{room.name}</ListItem>
              ))}
            </UnorderedList>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export default Search;
