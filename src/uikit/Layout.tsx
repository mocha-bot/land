import { Box, Flex } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import { informations } from '@/config/config';

import { Footer } from './Footer';
import { Header } from './Header';

type LayoutProps = {
  children: ReactNode;
  bgImage?: string;
  containerProps?: BoxProps;
};

export function Layout({ children, bgImage, containerProps }: LayoutProps) {
  return (
    <Box
      backgroundImage={bgImage}
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
      // TODO: change to right after the image in home page is fixed
      backgroundPosition='top'
      {...containerProps}>
      <Header />
      <Flex
        as='main'
        h='auto'
        zIndex={11}
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        gap={8}
        pt={16} // make sure the content is not hidden behind the header after scrolling
      >
        {children}
      </Flex>
      <Footer informations={informations} />
    </Box>
  );
}
