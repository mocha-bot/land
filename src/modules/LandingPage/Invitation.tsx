import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function Invitation() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      w='full'
      h='full'
      maxW={{ base: 'full', md: '5xl' }}
      justifyContent='space-between'
      alignItems='center'
      flexDirection='row'
      gap={8}
      py={40}
      color='white'>
      <Flex flexDirection='column' gap={10} w='full'>
        <Box maxW={{ base: 'full', md: 140 }}>
          <Text as='h2' fontWeight='semibold' fontSize='5xl'>
            Lets get have a mocha time together
          </Text>
        </Box>
        <Box maxW={96}>
          <Text as='h3' fontWeight='light' fontSize='xl'>
            Invite mocha from your dashboard now and enjoy connect to others
            with ease. Just right under your own server
          </Text>
        </Box>
        <Button
          as='a'
          w='auto'
          color='white'
          rounded='full'
          fontSize='sm'
          variant='outline'
          marginRight='auto'
          href={publicRuntimeConfig.botInvitationUrl}>
          Invite to Server
        </Button>
      </Flex>
      {!isMobile && (
        <Image
          src='/assets/images/logo-mocha-base.svg'
          width='logo.width.xl'
          height='logo.height.xl'
          alt='Mocha Logo'
          color='white'
        />
      )}
    </Flex>
  );
}

export { Invitation };
