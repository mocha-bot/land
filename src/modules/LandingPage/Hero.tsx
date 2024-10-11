import {
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';

const socials = [
  {
    name: 'discord',
    icon: '/assets/icons/discord-fill.svg',
  },
  {
    name: 'github',
    icon: '/assets/icons/github-fill.svg',
  },
  {
    name: 'product hunt',
    icon: '/assets/icons/product-hunt-fill.svg',
  },
];

const buttons = [
  {
    label: 'Discover More',
    variant: 'outline',
    backgroundColor: 'rgba(1, 1, 1, 0.40)',
    href: '#',
  },
  {
    label: 'See Documentation',
    variant: 'ghost',
    href: 'https://docs.mocha-bot.xyz',
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
          Drink mocha with people accross the universe
        </Text>
        <Text color='white' fontSize={20} lineHeight='none' fontWeight='light'>
          Mocha is a Discord bot for multi-chat cross-server, that allows you to
          send messages to multiple channels at once.{' '}
        </Text>
      </VStack>
      <HStack w='full' justifyContent={{ base: 'center', md: 'space-between' }}>
        <HStack>
          {buttons.map((button) => (
            <Button
              as='a'
              key={button.label}
              size='lg'
              color='white'
              rounded='full'
              backgroundColor={button.backgroundColor}
              fontSize='sm'
              fontWeight={500}
              variant={button.variant}
              href={button.href}>
              {button.label}
            </Button>
          ))}
        </HStack>
        {!isMobile && (
          <HStack gap={8}>
            {socials.map((social) => (
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
            ))}
          </HStack>
        )}
      </HStack>
    </Flex>
  );
}
