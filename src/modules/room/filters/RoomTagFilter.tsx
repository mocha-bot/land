import {
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Skeleton,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { FiHash as HashtagIcon } from 'react-icons/fi';
import { IoSearch as SearchIcon } from 'react-icons/io5';

import type { Tag as TagType } from '@/modules/tag/tagEntity';
import { useGetTagsQuery } from '@/modules/tag/tagHooks';
import { debounce } from '@/shared/debounce';

type Props = {
  value: TagType[];
  onChange: (value: TagType[]) => void;
  onReset: () => void;
};

type TagWithSelected = TagType & { selected: boolean };

export function RoomTagFilter({ onChange, value, onReset }: Props) {
  const [selectedTags, setSelectedTags] = useState<TagWithSelected[]>(
    value.map((t) => ({ ...t, selected: true })),
  );
  const [name, setName] = useState('');
  const getTagsQuery = useGetTagsQuery({
    name,
  });

  const combinedTags = useMemo(() => {
    // combine selectedTags and getTagsQuery.data?.rooms
    // make selectedTags as the first element
    // return the combinedTags
    const newTags = getTagsQuery.data?.data ?? [];
    const nonSelectedTags = newTags
      .filter(
        (tag) =>
          !selectedTags.find((t) => t.serial === tag.serial && t.selected),
      )
      .map((tag) => ({ ...tag, selected: false }));
    return [...selectedTags, ...nonSelectedTags];
  }, [getTagsQuery.data?.data, selectedTags]);

  const handleTagClick = (tag: TagWithSelected) => {
    const newSelectedTags = combinedTags
      .map((t) =>
        t.serial === tag.serial ? { ...t, selected: !t.selected } : t,
      )
      .filter((t) => t.selected);
    setSelectedTags(newSelectedTags);
    onChange(newSelectedTags);
  };

  const handleClickReset = () => {
    setSelectedTags([]);
    onReset();
  };

  return (
    <Flex flexDir='column' gap={1} w='full'>
      <Flex flexDir='row' justifyContent='space-between'>
        <Text fontSize='14px' fontWeight={700}>
          Room Tag
        </Text>
        <Text
          fontSize='12px'
          color='white'
          cursor='pointer'
          onClick={handleClickReset}>
          Reset Filter
        </Text>
      </Flex>
      <Flex flexDir='column' gap={2} mt={2}>
        <InputGroup>
          <Input
            placeholder='Search tag'
            borderWidth={0}
            borderRadius={0}
            fontSize={{ base: '18px', md: '14px' }}
            height={12}
            variant='flushed'
            borderBottom='solid 1px rgba(255, 255, 255, 0.5)'
            onChange={debounce((e) => setName(e.target.value), 300)}
          />
          <InputRightElement height={12}>
            <Icon as={SearchIcon} fontSize='28px' />
          </InputRightElement>
        </InputGroup>
        {getTagsQuery.isLoading ? (
          <SimpleGrid columns={3} spacing={3}>
            <Skeleton height='24px' />
            <Skeleton height='24px' />
            <Skeleton height='24px' />
          </SimpleGrid>
        ) : (
          <Flex flexDir='row' gap={3} flexWrap='wrap'>
            {combinedTags.map((tag) => (
              <Tag
                key={tag.serial}
                bgColor={
                  tag.selected ? 'rgba(255, 255, 255, 0.25)' : 'transparent'
                }
                color='white'
                cursor='pointer'
                onClick={() => handleTagClick(tag)}>
                <TagLeftIcon as={HashtagIcon} mr={1} />
                <TagLabel>{tag.name}</TagLabel>
              </Tag>
            ))}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
