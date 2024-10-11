import { Box, Flex } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <Box
      backgroundImage='/assets/images/background_desktop.svg'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
      overflow='hidden'>
      <Header />
      <Flex
        as='main'
        h='auto'
        zIndex={999}
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        px={8}
        gap={8}>
        {children}
      </Flex>
      <Footer />
    </Box>
  );
}

export default Layout;
