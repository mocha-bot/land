import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

import { theme } from './theme';

const queryClient = new QueryClient();

type Props = {
  children: ReactNode;
};

function AppProvider(props: Props) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export { AppProvider };
