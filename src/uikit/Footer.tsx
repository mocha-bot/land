import {
  Box,
  Container,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
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
            <Text fontSize='sm'>
              Copyright © 2020 - {currentYear} Mocha dev
            </Text>
          </Stack>
          <Stack align='flex-start'>
            <Text fontWeight={500} fontSize='lg' mb={2}>
              P L U G I N
            </Text>
            <Box as='a' href='#'>
              See Documentations
            </Box>
            <Box as='a' href='#'>
              Support Plugin
            </Box>
          </Stack>
          <Stack align='flex-start'>
            <Text fontWeight={500} fontSize='lg' mb={2}>
              S O C I A L
            </Text>
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
