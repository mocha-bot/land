import { Box, Flex } from '@chakra-ui/react';
import { type ReactNode } from 'react';

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
      backgroundSize='cover'>
      <Box
        w='full'
        position='fixed'
        top={0}
        left={0}
        right={0}
        zIndex={15}
        backgroundColor='rgba(0, 0, 0, 0.7)'
        backdropFilter='blur(10px)'
        transition='position 0.1s ease, top 0.1s ease'>
        <Header />
      </Box>
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
      <Footer />
    </Box>
  );
}

export default Layout;
