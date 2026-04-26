import {
  Flex,
  HStack,
  Link,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import type { GetStaticPropsContext } from 'next';
import { i18n } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { generateNextSeo } from 'next-seo/pages';
import getConfig from 'next/config';
import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { buildCanonical, ogLocaleFor } from '@/config/seo';
import { WaitlistModal } from '@/modules/waitlist/WaitlistModal';
import Button from '@/uikit/Button';
import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

const { publicRuntimeConfig } = getConfig();

function Pricing() {
  const { locale } = useRouter();
  const canonical = buildCanonical('/pricing', locale);
  const disclosure = useDisclosure();

  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Pricing',
          description:
            'Mocha pricing is on the way. Join the early access waitlist to be the first to know when premium plans go live.',
          canonical,
          openGraph: {
            type: 'website',
            url: canonical,
            locale: ogLocaleFor(locale),
          },
          noindex: true,
          nofollow: true,
        })}
      </Head>
      <Layout bgImage='/assets/images/background_desktop.svg'>
        <Container>
          <Flex
            w='full'
            maxW={{ base: 'full', md: '5xl' }}
            pt={{ base: 8, md: 12, lg: 44 }}
            pb={{ base: 12, md: 24 }}
            alignItems='flex-start'
            flexDirection='column'
            gap={16}>
            <VStack
              alignItems='flex-start'
              spacing={12}
              maxW={{ base: 'full', md: 'xl' }}>
              <Text
                color='white'
                fontSize={{ base: '5xl', lg: '6xl' }}
                lineHeight='none'>
                Pricing is on the way
              </Text>
              <Text
                color='white'
                fontSize={20}
                lineHeight='short'
                fontWeight='light'>
                Mocha will stay free for everyone. Premium features for power
                communities are coming with our early-access launch — join the
                waitlist and we&apos;ll loop you in the moment plans go live.
              </Text>
            </VStack>
            <HStack flexWrap='wrap' gap={4}>
              <Button
                py={6}
                px={10}
                variant='glass'
                isAnimated
                onClick={disclosure.onOpen}>
                Join the early access waitlist
              </Button>
              <Button
                as='a'
                py={6}
                px={10}
                variant='glass-ghost'
                href={publicRuntimeConfig.discordServerUrl}>
                Talk to us on Discord
              </Button>
            </HStack>
            <Text color='subtitle' fontSize='sm' fontWeight='light'>
              Curious about refunds?{' '}
              <Link
                as={NextLink}
                href='/refund-policy'
                color='white'
                textDecoration='underline'>
                See our refund policy
              </Link>
              .
            </Text>
          </Flex>
        </Container>
      </Layout>
      <WaitlistModal
        isOpen={disclosure.isOpen}
        onClose={disclosure.onClose}
      />
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
  };
}

export default Pricing;
