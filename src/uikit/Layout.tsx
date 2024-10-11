import { Box, Flex } from '@chakra-ui/react';
import { type ReactNode, useEffect, useState } from 'react';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  const [isHeaderOnScroll, setIsHeaderOnScroll] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 1) {
        setIsHeaderOnScroll(true);
      } else {
        setIsHeaderOnScroll(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Box
      backgroundImage='/assets/images/background_desktop.svg'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'
      overflow='hidden'>
      <Box
        w='full'
        position={isHeaderOnScroll ? 'fixed' : 'relative'}
        top={0}
        left={0}
        right={0}
        zIndex={15}
        backgroundColor='rgba(0, 0, 0, 0.4)'
        backdropFilter='blur(10px)'
        transition='position 0.1s ease, top 0.1s ease'>
        <Header />
      </Box>
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
