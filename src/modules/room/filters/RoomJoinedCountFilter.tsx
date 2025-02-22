import { Flex, Radio, RadioGroup, Text } from '@chakra-ui/react';

type Props = {
  value: string;
  onChange: (value?: Option) => void;
};

const OPTIONS: Option[] = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'less than 100',
    value: '<100',
    data: {
      min: 0,
      max: 100,
    },
  },
  {
    label: '100 - 1000',
    value: '100-1000',
    data: {
      min: 100,
      max: 1000,
    },
  },
  {
    label: '1000+',
    value: '>1000',
    data: {
      min: 1000,
    },
  },
];

export type Option = {
  label: string;
  value: string;
  data?: {
    min?: number;
    max?: number;
  };
};

export function RoomJoinedCountFilter({ onChange, value }: Props) {
  const handleChange = (newValue: string) => {
    onChange(OPTIONS.find((option) => option.value === newValue));
  };

  return (
    <Flex flexDir='column' gap={1} w='full'>
      <Flex flexDir='row' justifyContent='space-between'>
        <Text fontSize='14px' fontWeight={700}>
          Channel Joined
        </Text>
      </Flex>
      <RadioGroup value={value} onChange={handleChange}>
        <Flex flexDir='column' gap={2} mt={2}>
          {OPTIONS.map((option) => (
            <Radio key={option.value} value={option.value} colorScheme='red'>
              {option.label}
            </Radio>
          ))}
        </Flex>
      </RadioGroup>
    </Flex>
  );
}
