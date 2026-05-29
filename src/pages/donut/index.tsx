import { Box, Flex, Heading, SimpleGrid, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { GetStaticPropsContext } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { generateNextSeo } from 'next-seo/pages';
import getConfig from 'next/config';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  AnimateOnView,
  StaggerContainer,
  staggerItem,
} from '@/components/AnimateOnView/AnimateOnView';
import { buildCanonical, ogLocaleFor } from '@/config/seo';
import Button from '@/uikit/Button';
import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

const { publicRuntimeConfig } = getConfig();

const cardStyle = {
  bg: 'rgba(0, 0, 0, 0.3)',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  borderRadius: 'xl',
  p: 6,
  h: 'full',
  _hover: {
    borderColor: 'rgba(255, 255, 255, 0.16)',
    bg: 'rgba(0, 0, 0, 0.45)',
  },
  transition: 'all 0.2s',
};

const FEATURES = [
  {
    emoji: '🎯',
    title: 'Smart Auto-Pairing',
    description:
      'Start a match and Donut pairs all registered members instantly. Odd numbers are handled automatically with 3-way pairs — nobody left out.',
  },
  {
    emoji: '🔄',
    title: 'Flexible Match Lifecycle',
    description:
      'Create, start, stop, and query any match session. Each participant is tracked individually from pending to finished.',
  },
  {
    emoji: '🌐',
    title: 'Works Any Use Case',
    description:
      'Speed dating, gaming brackets, mentor matching — one feature, unlimited event types. Bring your own logic, Donut handles the pairs.',
  },
];

const STEPS = [
  {
    step: 1,
    title: 'Create a match session',
    description:
      'Name your match and set it up. Donut generates a unique session for your event.',
  },
  {
    step: 2,
    title: 'Register participants',
    description:
      'Add your Discord community members to the match by their user IDs.',
  },
  {
    step: 3,
    title: 'Start — pairing runs automatically',
    description:
      'Donut shuffles and pairs everyone instantly. 3-way groups handle odd numbers.',
  },
  {
    step: 4,
    title: 'View pairs and notify members',
    description:
      'Retrieve generated pairs and let your members know who they are matched with.',
  },
];

const USE_CASES = [
  {
    emoji: '💘',
    title: 'Speed Dating',
    description:
      'Rotate members through timed 1-on-1 chats. Keep your community buzzing with spontaneous connections.',
  },
  {
    emoji: '🎓',
    title: 'Mentorship Circles',
    description:
      'Match newcomers with experienced members. Build structured growth programs inside your Discord server.',
  },
  {
    emoji: '🎮',
    title: 'Gaming Brackets',
    description:
      'Auto-bracket players into match pairs for tournaments, scrims, or casual 1v1s — no manual seeding.',
  },
  {
    emoji: '🤝',
    title: 'Community Icebreakers',
    description:
      'Randomly pair members for warm-up chats. Great for onboarding new members or reviving quiet servers.',
  },
];

function Donut() {
  const { locale } = useRouter();
  const canonical = buildCanonical('/donut', locale);
  const { publicRuntimeConfig: config } = getConfig();

  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Donut — Community Matchmaking',
          description:
            'Automatically pair your Discord community members for 1-on-1 or small-group interactions. Events, mentorship, icebreakers — Donut handles the pairing.',
          canonical,
          openGraph: {
            type: 'website',
            url: canonical,
            locale: ogLocaleFor(locale),
          },
        })}
      </Head>
      <Layout>
        <Container>
          <Flex
            w='full'
            maxW={{ base: 'full', md: '5xl' }}
            pt={{ base: 12, md: 20, lg: 32 }}
            pb={{ base: 16, md: 28 }}
            alignItems='flex-start'
            flexDirection='column'
            gap={24}>
            {/* Hero */}
            <AnimateOnView variant='fadeUp'>
              <VStack alignItems='flex-start' spacing={6} maxW='2xl'>
                <Text
                  fontWeight='semibold'
                  fontSize={{ base: '14px', md: '16px' }}
                  color='blue.300'
                  letterSpacing='wide'
                  textTransform='uppercase'>
                  Donut
                </Text>
                <Heading
                  as='h1'
                  color='white'
                  fontSize={{ base: '4xl', md: '6xl' }}
                  lineHeight='none'
                  fontWeight='bold'>
                  Community Matchmaking for Discord
                </Heading>
                <Text
                  color='whiteAlpha.700'
                  fontSize={{ base: 'md', md: 'xl' }}
                  lineHeight='tall'
                  fontWeight='light'>
                  Automatically pair your members for 1-on-1 or small-group
                  interactions. Events, mentorship, icebreakers — Donut handles
                  the pairing.
                </Text>
                <Button
                  as='a'
                  variant='glass'
                  py={5}
                  px={8}
                  isAnimated
                  href={config.botInvitationUrl}>
                  Invite to server
                </Button>
              </VStack>
            </AnimateOnView>

            {/* Features */}
            <VStack alignItems='flex-start' spacing={10} w='full'>
              <AnimateOnView variant='fadeUp'>
                <Flex flexDirection='column' gap={3}>
                  <Text
                    fontWeight='semibold'
                    fontSize={{ base: '16px', md: '20px' }}>
                    Features
                  </Text>
                  <Text
                    fontSize={{ base: '28px', md: '42px' }}
                    lineHeight={{ base: 1.2, md: 1.1 }}
                    fontWeight='bold'
                    maxW='2xl'>
                    Everything you need to run pairing events
                  </Text>
                </Flex>
              </AnimateOnView>

              <StaggerContainer>
                <SimpleGrid columns={[1, null, 3]} gap={6} w='full'>
                  {FEATURES.map((f) => (
                    <motion.div
                      key={f.title}
                      variants={staggerItem}
                      style={{ height: '100%' }}>
                      <Box {...cardStyle}>
                        <VStack alignItems='flex-start' spacing={3}>
                          <Text fontSize='3xl'>{f.emoji}</Text>
                          <Text
                            fontSize='lg'
                            fontWeight='semibold'
                            color='white'>
                            {f.title}
                          </Text>
                          <Text
                            color='whiteAlpha.700'
                            fontSize='sm'
                            lineHeight='tall'>
                            {f.description}
                          </Text>
                        </VStack>
                      </Box>
                    </motion.div>
                  ))}
                </SimpleGrid>
              </StaggerContainer>
            </VStack>

            {/* How it works */}
            <VStack alignItems='flex-start' spacing={10} w='full'>
              <AnimateOnView variant='fadeUp'>
                <Flex flexDirection='column' gap={3}>
                  <Text
                    fontWeight='semibold'
                    fontSize={{ base: '16px', md: '20px' }}>
                    How it works
                  </Text>
                  <Text
                    fontSize={{ base: '28px', md: '42px' }}
                    lineHeight={{ base: 1.2, md: 1.1 }}
                    fontWeight='bold'
                    maxW='2xl'>
                    From setup to pairs in four steps
                  </Text>
                </Flex>
              </AnimateOnView>

              <StaggerContainer>
                <SimpleGrid columns={[1, null, 2, 4]} gap={6} w='full'>
                  {STEPS.map((s) => (
                    <motion.div key={s.step} variants={staggerItem}>
                      <Box {...cardStyle} position='relative'>
                        <VStack alignItems='flex-start' spacing={3}>
                          <Box
                            w={8}
                            h={8}
                            borderRadius='full'
                            bg='rgba(255,255,255,0.08)'
                            border='1px solid rgba(255,255,255,0.12)'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'>
                            <Text
                              fontSize='xs'
                              fontWeight='bold'
                              color='whiteAlpha.800'>
                              {s.step}
                            </Text>
                          </Box>
                          <Text
                            fontSize='md'
                            fontWeight='semibold'
                            color='white'>
                            {s.title}
                          </Text>
                          <Text
                            color='whiteAlpha.600'
                            fontSize='sm'
                            lineHeight='tall'>
                            {s.description}
                          </Text>
                        </VStack>
                      </Box>
                    </motion.div>
                  ))}
                </SimpleGrid>
              </StaggerContainer>
            </VStack>

            {/* Use Cases */}
            <VStack alignItems='flex-start' spacing={10} w='full'>
              <AnimateOnView variant='fadeUp'>
                <Flex flexDirection='column' gap={3}>
                  <Text
                    fontWeight='semibold'
                    fontSize={{ base: '16px', md: '20px' }}>
                    Use cases
                  </Text>
                  <Text
                    fontSize={{ base: '28px', md: '42px' }}
                    lineHeight={{ base: 1.2, md: 1.1 }}
                    fontWeight='bold'
                    maxW='2xl'>
                    Built for every kind of community event
                  </Text>
                  <Text
                    color='whiteAlpha.600'
                    fontSize='sm'
                    maxW='xl'
                    lineHeight='tall'>
                    Whether you run a gaming clan, a study group, or a
                    professional network — Donut adapts to your event format.
                  </Text>
                </Flex>
              </AnimateOnView>

              <StaggerContainer>
                <SimpleGrid columns={[1, null, 2]} gap={6} w='full'>
                  {USE_CASES.map((uc) => (
                    <motion.div key={uc.title} variants={staggerItem}>
                      <Box {...cardStyle}>
                        <VStack alignItems='flex-start' spacing={3}>
                          <Text fontSize='3xl'>{uc.emoji}</Text>
                          <Text
                            fontSize='lg'
                            fontWeight='semibold'
                            color='white'>
                            {uc.title}
                          </Text>
                          <Text
                            color='whiteAlpha.700'
                            fontSize='sm'
                            lineHeight='tall'>
                            {uc.description}
                          </Text>
                        </VStack>
                      </Box>
                    </motion.div>
                  ))}
                </SimpleGrid>
              </StaggerContainer>
            </VStack>

            {/* CTA */}
            <AnimateOnView variant='fadeUp'>
              <Box
                w='full'
                borderRadius='2xl'
                border='1px solid rgba(255,255,255,0.08)'
                bg='rgba(0,0,0,0.3)'
                p={{ base: 8, md: 12 }}>
                <VStack spacing={6} alignItems='flex-start'>
                  <Heading
                    as='h2'
                    color='white'
                    fontSize={{ base: '2xl', md: '4xl' }}
                    fontWeight='bold'
                    maxW='lg'>
                    Ready to run your first pairing event?
                  </Heading>
                  <Text
                    color='whiteAlpha.700'
                    fontSize='md'
                    lineHeight='tall'
                    maxW='md'>
                    Invite Mocha to your Discord server and start matching your
                    community members today.
                  </Text>
                  <Button
                    as='a'
                    variant='glass'
                    py={5}
                    px={8}
                    isAnimated
                    href={config.botInvitationUrl}>
                    Invite to server
                  </Button>
                </VStack>
              </Box>
            </AnimateOnView>
          </Flex>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  if (!publicRuntimeConfig.isProduction) {
    await i18n?.reloadResources();
  }

  return {
    props: {
      ...(locale ? await serverSideTranslations(locale, ['common']) : {}),
    },
    revalidate: 60,
  };
}

export default Donut;
