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
import { motion } from 'framer-motion';
import getConfig from 'next/config';

import { AnimateOnView } from '@/components/AnimateOnView/AnimateOnView';
import Button from '@/uikit/Button';
import { PreviewCard } from './PreviewCard';

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
        maxW={{ base: 'full', md: 'xl' }}
        as={motion.div}
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        // @ts-expect-error framer types
        transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}>
        <Flex
          display='inline-flex'
          alignItems='center'
          gap={2}
          px={4}
          py={2}
          borderRadius='full'
          border='1px solid rgba(255, 255, 255, 0.15)'
          backgroundColor='rgba(255, 255, 255, 0.06)'
          backdropFilter='blur(8px)'>
          <Text fontSize='xs' color='yellow.300' fontWeight='bold' letterSpacing='wider' textTransform='uppercase'>
            ✦ For Discord
          </Text>
          <Text fontSize='xs' color='whiteAlpha.400'>·</Text>
          <Text fontSize='xs' color='whiteAlpha.700' fontWeight='medium'>
            Like Slack Connect, but built for communities
          </Text>
        </Flex>
        <Text
          color='white'
          fontSize={{ base: '5xl', lg: '6xl' }}
          lineHeight='none'>
          Cross-server chat for Discord communities
        </Text>
        <Text color='white' fontSize={20} lineHeight='none' fontWeight='light'>
          Mocha is a Discord bot that lets communities create shared rooms — one message reaches every connected server at once. No more jumping between servers to stay in the loop.
        </Text>
      </VStack>
      <AnimateOnView delay={0.3}>
        <HStack w='full' justifyContent={{ base: 'center', md: 'space-between' }}>
          <HStack w='full'>
            <Button
              as='a'
              py={6}
              px={10}
              variant='glass'
              isAnimated
              href={publicRuntimeConfig.botInvitationUrl}>
              Invite to Server
            </Button>
            <Button
              as='a'
              py={6}
              px={10}
              variant='glass-ghost'
              href='https://dash.mocha-bot.xyz'>
              Get Access
            </Button>
          </HStack>
          {!isMobile && (
            <HStack gap={8}>
              {socials.map((social) => (
                <Link key={`social-${social.name}`} href={social.href}>
                  <IconButton
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
                    _hover={{ backgroundColor: 'rgba(255, 255, 255, 0.4)' }}
                  />
                </Link>
              ))}
            </HStack>
          )}
        </HStack>
      </AnimateOnView>
      <AnimateOnView delay={0.5}>
        <PreviewCard />
      </AnimateOnView>
    </Flex>
  );
}
