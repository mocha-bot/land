import {
  Box,
  Container,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';

function ListHeader({ children }: { children: ReactNode }) {
  return (
    <Text fontWeight={500} fontSize='lg' mb={2}>
      {children}
    </Text>
  );
}

export default function Footer() {
  return (
    <Box color='white'>
      <Container as={Stack} maxW='6xl' py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '4fr 2fr 2fr' }}
          spacing={8}>
          <Stack spacing={6}>
            <Box>
              <Image
                src='img/mocha.png'
                width='119px'
                height='48px'
                alt='Mocha Logo'
              />
            </Box>
            <Text fontSize='sm'>
              Your trusted bot for connecting multi-chat cross-server
            </Text>
            <Text fontSize='sm'>Copyright © 2020 - 2023 Mocha dev</Text>
          </Stack>
          <Stack align='flex-start'>
            <ListHeader>P L U G I N</ListHeader>
            <Box as='a' href='#'>
              See Documentations
            </Box>
            <Box as='a' href='#'>
              Support Plugin
            </Box>
          </Stack>
          <Stack align='flex-start'>
            <ListHeader>S O C I A L</ListHeader>
            <Box as='a' href='#'>
              Mocha Discord Server
            </Box>
            <Box as='a' href='#'>
              Git Hub
            </Box>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
