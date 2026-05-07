import { Box, Flex, Image, Text } from '@chakra-ui/react';
import getConfig from 'next/config';

import { AnimateOnView } from '@/components/AnimateOnView/AnimateOnView';
import Button from '@/uikit/Button';

const { publicRuntimeConfig } = getConfig();

export function Invitation() {
  return (
    <AnimateOnView>
      <Flex
        w='full'
        h='full'
        justifyContent='space-between'
        alignItems='center'
        flexDirection={{
          base: 'column-reverse',
          md: 'row',
        }}
        gap={8}
        py={40}
        px={{
          base: 0,
          md: 12,
        }}
        color='white'>
        <Flex flexDirection='column' gap={10} w='full'>
          <Box maxW={{ base: 'full', md: '85%' }}>
            <Text
              as='h2'
              fontWeight='semibold'
              fontSize={{
                base: '40px',
                md: '64px',
              }}
              lineHeight={{
                base: '40px',
                md: '64px',
              }}>
              Ready to connect your community?
            </Text>
          </Box>
          <Box maxW={96}>
            <Text
              as='h3'
              fontWeight='light'
              fontSize={{
                base: '16px',
                md: '20px',
              }}
              lineHeight={{
                base: '20px',
                md: '25px',
              }}>
              Invite Mocha to your server and start bridging communities in minutes. Free to get started.
            </Text>
          </Box>
          <Flex gap={4} flexWrap='wrap'>
            <Button
              as='a'
              w='fit-content'
              variant='glass'
              py={5}
              px={6}
              isAnimated
              href={publicRuntimeConfig.botInvitationUrl}>
              Invite to Server
            </Button>
            <Button
              as='a'
              w='fit-content'
              variant='glass-ghost'
              py={5}
              px={6}
              href='https://dash.mocha-bot.xyz'>
              Get Access
            </Button>
          </Flex>
        </Flex>
        <Image
          ml='auto'
          src='/assets/images/logo-mocha-base.svg'
          width={{
            base: 'logo.width.lg',
            md: 'logo.width.xl',
          }}
          height={{
            base: 'logo.height.lg',
            md: 'logo.height.xl',
          }}
          alt='Mocha Logo'
          color='white'
        />
      </Flex>
    </AnimateOnView>
  );
}
