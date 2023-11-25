import { Box, Button, HStack, Image, Text } from '@chakra-ui/react';

import { publicRuntimeConfig } from '../../../next.config';

import { NavigationLink } from './NavigationLink';

const navigations = [
  {
    name: 'about us',
    href: '/',
  },
  {
    name: 'features',
    href: '/',
  },
  {
    name: 'status',
    href: '/',
  },
  {
    name: 'discover room',
    href: '/',
  },
];

function Navigation() {
  // TODO: add mobile navigation
  return (
    <Box background='#181818' py='2' px='2'>
      <HStack justifyContent='space-between'>
        <HStack>
          <Image src='/img/logo-bnw.svg' alt='Mocha Logo' />
          <Text variant='regular' color='white'>
            mocha
          </Text>
        </HStack>
        <HStack spacing='8'>
          {navigations.map((navigation) => (
            <NavigationLink key={navigation.name} {...navigation} />
          ))}
        </HStack>
        <Button
          as='a'
          variant='primary'
          textColor='white'
          href={publicRuntimeConfig.botInvitationUrl}>
          Invite to Server
        </Button>
      </HStack>
    </Box>
  );
}

export { Navigation };
