import { Flex, Icon, SimpleGrid, Text } from '@chakra-ui/react';
import { FaCaretUp as UpIcon } from 'react-icons/fa';

type ItemProps = {
  title: string;
  value: string;
  percentage: number;
};

function Item({ title, value, percentage }: ItemProps) {
  return (
    <Flex flexDirection='column' justifyContent='flex-start'>
      <Text as='h2' fontWeight='500' fontSize='28px'>
        {title}
      </Text>
      <Flex flexDirection='row' gap={4}>
        <Text as='h3' fontWeight='700' fontSize='56px'>
          {value}
        </Text>
        {percentage > 0 && (
          <Flex flexDirection='row' gap={2} alignItems='flex-end' mb={4}>
            {/* just for marketing purpose, hide the red percentage */}
            {/* {percentage < 0 && <Icon as={UpIcon} fontSize={24} color='red' />} */}
            {percentage > 0 && (
              <Icon as={UpIcon} fontSize={24} color='green.400' />
            )}
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
    value: '165K+',
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
      justifyContent='space-between'
      alignItems='flex-start'
      flexDirection='column'
      gap={{
        base: 8,
        md: 12,
      }}
      py={{ base: 10, md: 24 }}
      color='white'
      id='status'>
      <Text
        as='h2'
        fontWeight='semibold'
        fontSize={{
          base: '16px',
          md: '20px',
        }}>
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
