import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { informations } from '@/config/config';

import { Footer } from './Footer';
import { Header } from './Header';

type LayoutProps = {
  children: ReactNode;
  bgImage?: string;
};

export function Layout({ children, bgImage }: LayoutProps) {
  return (
    <Box
      backgroundImage={bgImage}
      backgroundRepeat='no-repeat'
      backgroundSize='cover'>
      <Header />
      <Flex
        as='main'
        h='auto'
        zIndex={11}
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        px={8}
        gap={8}
        pt={16} // make sure the content is not hidden behind the header after scrolling
      >
        {children}
      </Flex>
      <Footer informations={informations} />
    </Box>
  );
}
