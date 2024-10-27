import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { FaCaretUp } from 'react-icons/fa';

type ItemProps = {
  title: string;
  value: string;
  percentage: number;
};

function Item({ title, value, percentage }: ItemProps) {
  return (
    <Flex flexDirection='column' justifyContent='flex-start'>
      <Text as='h2' fontWeight='light' fontSize='xl'>
        {title}
      </Text>
      <Flex flexDirection='row' gap={10} alignItems='center'>
        <Text as='h3' fontWeight='light' fontSize='5xl'>
          {value}
        </Text>
        {percentage > 0 && (
          <Flex flexDirection='row' gap={2} alignItems='flex-end'>
            {/* just for marketing purpose, hide the red percentage */}
            {/* {percentage < 0 && <FaCaretDown color='red' size={24} />} */}
            {percentage > 0 && <FaCaretUp color='green' size={24} />}
            <Text as='h3' fontWeight='light' fontSize='lg'>
              {percentage}%
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

const items = [
  {
    title: 'Server Join Mocha',
    value: '100+',
    percentage: 25,
  },
  {
    title: 'Room Created',
    value: '165K',
    percentage: -28,
  },
  {
    title: 'Chat Sent',
    value: '100M+',
    percentage: 0,
  },
];

function Status() {
  return (
    <Flex
      w='full'
      h='full'
      maxW='5xl'
      borderRadius={{ base: 24, lg: 'none' }}
      backgroundColor={{
        base: 'rgba(0, 0, 0, 0.6)',
        md: 'rgba(0, 0, 0, 0.475)',
        lg: 'transparent',
      }}
      justifyContent='space-between'
      alignItems='flex-start'
      flexDirection='column'
      gap={8}
      py={{ base: 10, md: 24 }}
      px={4}
      color='white'
      id='status'>
      <Text as='h2' fontWeight='semibold' fontSize='3xl'>
        Monthly Bot Status
      </Text>
      <SimpleGrid columns={[1, 3]} gap={4} w='full'>
        {items.map((item) => (
          <Item key={item.title} {...item} />
        ))}
      </SimpleGrid>
    </Flex>
  );
}

export { Status };
