import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <Box backgroundImage='img/desktop-background-image.png'>
      <Header />
      <Box as='main' pt='8' h='100vh'>
        {children}
      </Box>
      <Footer />
    </Box>
  );
}

export default Layout;
