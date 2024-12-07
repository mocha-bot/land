import { Flex } from '@chakra-ui/react';
import type { FlexProps } from '@chakra-ui/react';

export function Container(props: FlexProps) {
  return (
    <Flex
      w='100%'
      px={{ base: 5, lg: 10 }}
      flexDir='column'
      justifyContent='center'>
      <Flex mx='auto' w='100%' maxW='1200px' flexDir='column' {...props}>
        {props.children}
      </Flex>
    </Flex>
  );
}
