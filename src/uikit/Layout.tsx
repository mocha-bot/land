import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <Box
      backgroundImage='assets/images/desktop-background-image.png'
      backgroundRepeat='no-repeat'
      backgroundSize='cover'>
      <Header />
      <Box as='main' pt='8' h='100vh' zIndex={999}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
