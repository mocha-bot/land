import { Flex, Text } from '@chakra-ui/react';
import { useMemo } from 'react';

import { Select } from '@/components/Form/Select';
import { useGetLanguagesQuery } from '@/modules/language/languageHooks';

const ALL_OPTION = { value: 'all', label: 'All' };

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  onReset?: () => void;
};

export function RoomLanguageFilter({ onChange, onReset, value }: Props) {
  const { data } = useGetLanguagesQuery();

  const options = useMemo(
    () => [
      ALL_OPTION,
      ...(data?.data ?? []).map((lang) => ({
        value: lang.code,
        label: lang.name,
      })),
    ],
    [data],
  );

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
        defaultValue={ALL_OPTION.value}
        options={options}
        value={value}
        onChange={onChange}
      />
    </Flex>
  );
}
