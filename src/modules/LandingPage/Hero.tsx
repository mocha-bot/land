import {
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import getConfig from 'next/config';

import Button from '@/uikit/Button';

const { publicRuntimeConfig } = getConfig();

const socials = [
  {
    name: 'discord',
    icon: '/assets/icons/discord-fill.svg',
    href: publicRuntimeConfig.discordServerUrl,
  },
  {
    name: 'github',
    icon: '/assets/icons/github-fill.svg',
    href: publicRuntimeConfig.githubUrl,
  },
  {
    name: 'product hunt',
    icon: '/assets/icons/product-hunt-fill.svg',
    href: publicRuntimeConfig.productHuntUrl,
  },
];

const buttons = [
  {
    label: 'Discover More',
    variant: 'glass',
    href: '#',
  },
  {
    label: 'See Documentation',
    variant: 'glass-ghost',
    href: publicRuntimeConfig.docsUrl,
  },
];

export function Hero() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Flex
      w='full'
      maxW={{ base: 'full', md: '5xl' }}
      pt={{ base: 8, md: 12, lg: 44 }}
      alignItems='flex-start'
      flexDirection='column'
      gap={32}
      id='about-us'>
      <VStack
        alignItems='flex-start'
        spacing={12}
        maxW={{ base: 'full', md: 'xl' }}>
        <Text
          color='white'
          fontSize={{ base: '5xl', lg: '6xl' }}
          lineHeight='none'>
          Drink mocha with people across the universe
        </Text>
        <Text color='white' fontSize={20} lineHeight='none' fontWeight='light'>
          Mocha is a Discord bot for multi-chat cross-server, that allows you to
          send messages to multiple channels at once.{' '}
        </Text>
      </VStack>
      <HStack w='full' justifyContent={{ base: 'center', md: 'space-between' }}>
        <HStack w='full'>
          {buttons.map((button) => (
            <Button
              as='a'
              py={6}
              px={10}
              key={button.label}
              variant={button.variant}
              href={button.href}>
              {button.label}
            </Button>
          ))}
        </HStack>
        {!isMobile && (
          <HStack gap={8}>
            {socials.map((social) => (
              <Link key={`social-${social.name}`} href={social.href}>
                <IconButton
                  key={social.name}
                  isRound
                  backgroundColor='rgba(255, 255, 255, 0.20)'
                  aria-label={`${social.name} mocha`}
                  icon={
                    <Image
                      src={social.icon}
                      width={8}
                      height={8}
                      alt={`${social.name} Icon`}
                    />
                  }
                />
              </Link>
            ))}
          </HStack>
        )}
      </HStack>
    </Flex>
  );
}
