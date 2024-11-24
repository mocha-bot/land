import { Flex } from '@chakra-ui/react';
import type { FlexProps } from '@chakra-ui/react';

export function Container(props: FlexProps) {
  return (
    <Flex px={{ base: 5, lg: 10 }} w='100%' flexDir='column' {...props}>
      {props.children}
    </Flex>
  );
}
