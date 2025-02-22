import { Flex, Text } from '@chakra-ui/react';

import { Select } from '@/components/Form/Select';

// TODO: get the options from the API
const OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'id', label: 'Indonesia' },
  { value: 'en', label: 'English' },
];

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  onReset?: () => void;
};

export function RoomLanguageFilter({ onChange, onReset, value }: Props) {
  return (
    <Flex flexDir='column' gap={1} w='full'>
      <Flex flexDir='row' justifyContent='space-between'>
        <Text fontSize='14px' fontWeight={700}>
          Language Used
        </Text>
        <Text fontSize='12px' color='white' cursor='pointer' onClick={onReset}>
          Reset Filter
        </Text>
      </Flex>
      <Select
        defaultValue={OPTIONS[0].value}
        options={OPTIONS}
        value={value}
        onChange={onChange}
      />
    </Flex>
  );
}
