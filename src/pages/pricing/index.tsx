import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Skeleton,
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
import { useAddonPackages, useSubscriptionPackages } from '@/modules/pricing/pricingHook';
import type { Package } from '@/modules/pricing/types';
import { WaitlistModal } from '@/modules/waitlist/WaitlistModal';
import Button from '@/uikit/Button';
import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

const { publicRuntimeConfig } = getConfig();

const cardStyle = {
  bg: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: 'xl',
  p: 8,
};

function formatPrice(cents: number, currency: string, interval: string): string {
  if (cents === 0) { return 'Free'; }
  const amount = (cents / 100).toFixed(2);
  const symbol = currency.toUpperCase() === 'USD' ? '$' : currency;
  const intervalLabel = interval ? ` / ${interval}` : '';
  return `${symbol}${amount}${intervalLabel}`;
}

function PackageCard({ pkg, isAddon }: { pkg: Package; isAddon?: boolean }) {
  const hasProviders = pkg.providers.length > 0;
  const checkoutUrl = hasProviders ? pkg.providers[0].checkout_url : undefined;
  const isFree = pkg.price_cents === 0;

  let buttonLabel: string;
  let buttonHref: string | undefined;

  if (isAddon) {
    buttonLabel = 'Add on →';
    buttonHref = checkoutUrl;
  } else if (isFree) {
    buttonLabel = 'Get started';
    buttonHref = 'https://dash.mocha-bot.xyz';
  } else {
    buttonLabel = 'Get Premium →';
    buttonHref = checkoutUrl;
  }

  return (
    <Box {...cardStyle} display='flex' flexDirection='column' gap={6}>
      <VStack alignItems='flex-start' spacing={2}>
        <Heading as='h3' size='md' color='white'>
          {pkg.name}
        </Heading>
        <Text color='white' fontSize='2xl' fontWeight='bold'>
          {formatPrice(pkg.price_cents, pkg.price_currency, pkg.billing_interval)}
        </Text>
        {pkg.description && (
          <Text color='whiteAlpha.700' fontSize='sm' fontWeight='light'>
            {pkg.description}
          </Text>
        )}
      </VStack>

      {pkg.features.length > 0 && (
        <VStack alignItems='flex-start' spacing={2} flex={1}>
          {pkg.features.map((feature) => (
            <HStack key={feature} spacing={2} alignItems='flex-start'>
              <Text color='yellow.300' fontSize='sm' flexShrink={0}>
                ✓
              </Text>
              <Text color='whiteAlpha.900' fontSize='sm'>
                {feature}
              </Text>
            </HStack>
          ))}
        </VStack>
      )}

      <Button
        as={buttonHref ? 'a' : undefined}
        href={buttonHref}
        variant={isFree ? 'glass-ghost' : 'glass'}
        isDisabled={!hasProviders && !isFree}
        width='full'
        py={5}>
        {buttonLabel}
      </Button>
    </Box>
  );
}

function PackageCardSkeleton() {
  return (
    <Box {...cardStyle}>
      <VStack alignItems='flex-start' spacing={4}>
        <Skeleton height='24px' width='60%' borderRadius='md' startColor='whiteAlpha.100' endColor='whiteAlpha.300' />
        <Skeleton height='32px' width='40%' borderRadius='md' startColor='whiteAlpha.100' endColor='whiteAlpha.300' />
        <Skeleton height='16px' width='80%' borderRadius='md' startColor='whiteAlpha.100' endColor='whiteAlpha.300' />
        <Skeleton height='16px' width='70%' borderRadius='md' startColor='whiteAlpha.100' endColor='whiteAlpha.300' />
        <Skeleton height='16px' width='75%' borderRadius='md' startColor='whiteAlpha.100' endColor='whiteAlpha.300' />
        <Skeleton height='44px' width='full' borderRadius='md' startColor='whiteAlpha.100' endColor='whiteAlpha.300' />
      </VStack>
    </Box>
  );
}

function Pricing() {
  const { locale } = useRouter();
  const canonical = buildCanonical('/pricing', locale);
  const disclosure = useDisclosure();

  const subscriptions = useSubscriptionPackages();
  const addons = useAddonPackages();

  const { isLoading } = subscriptions;
  const hasNoData = !isLoading && subscriptions.data.length === 0 && addons.data.length === 0;

  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Pricing',
          description:
            'Simple, transparent pricing for every community. Choose a plan that fits your server.',
          canonical,
          openGraph: {
            type: 'website',
            url: canonical,
            locale: ogLocaleFor(locale),
          },
        })}
      </Head>
      <Layout bgImage='/assets/images/background_desktop.svg'>
        <Container>
          <Flex
            w='full'
            maxW={{ base: 'full', md: '5xl' }}
            pt={{ base: 8, md: 12, lg: 24 }}
            pb={{ base: 12, md: 24 }}
            alignItems='flex-start'
            flexDirection='column'
            gap={16}>

            {/* Page header */}
            <VStack alignItems='flex-start' spacing={4}>
              <Heading
                as='h1'
                color='white'
                fontSize={{ base: '5xl', lg: '6xl' }}
                lineHeight='none'>
                Pricing
              </Heading>
              <Text
                color='whiteAlpha.700'
                fontSize={20}
                lineHeight='short'
                fontWeight='light'>
                Simple, transparent pricing for every community.
              </Text>
            </VStack>

            {/* Empty / waitlist fallback */}
            {hasNoData && (
              <VStack alignItems='flex-start' spacing={12} maxW={{ base: 'full', md: 'xl' }}>
                <Text
                  color='white'
                  fontSize={{ base: '3xl', lg: '4xl' }}
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
              </VStack>
            )}

            {/* Subscription plans */}
            {(isLoading || subscriptions.data.length > 0) && (
              <VStack alignItems='flex-start' spacing={8} w='full'>
                <Heading as='h2' size='lg' color='white'>
                  Subscription Plans
                </Heading>
                {isLoading ? (
                  <SimpleGrid columns={[1, null, 3]} gap={6} w='full'>
                    <PackageCardSkeleton />
                    <PackageCardSkeleton />
                    <PackageCardSkeleton />
                  </SimpleGrid>
                ) : (
                  <SimpleGrid
                    columns={[1, null, subscriptions.data.length]}
                    gap={6}
                    w='full'>
                    {subscriptions.data.map((pkg) => (
                      <PackageCard key={pkg.serial} pkg={pkg} />
                    ))}
                  </SimpleGrid>
                )}
              </VStack>
            )}

            {/* Add-ons */}
            {!isLoading && addons.data.length > 0 && (
              <VStack alignItems='flex-start' spacing={8} w='full'>
                <Heading as='h2' size='lg' color='white'>
                  Add-ons
                </Heading>
                <SimpleGrid columns={[1, null, 2]} gap={6} w='full'>
                  {addons.data.map((pkg) => (
                    <PackageCard key={pkg.serial} pkg={pkg} isAddon />
                  ))}
                </SimpleGrid>
              </VStack>
            )}

            {/* Footer note */}
            {!hasNoData && !isLoading && (
              <VStack alignItems='flex-start' spacing={2}>
                <Text color='whiteAlpha.500' fontSize='sm' fontWeight='light'>
                  Powered by multiple payment providers for reliability.
                </Text>
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
              </VStack>
            )}
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
    revalidate: 60,
  };
}

export default Pricing;
