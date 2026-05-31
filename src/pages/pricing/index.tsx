import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
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
import {
  useAddonPackages,
  useCurrentUser,
  useGuildAddons,
  useGuildPackages,
  useRoomAddons,
  useRoomPackages,
  useSubscriptionPackages,
  useUserAddons,
  useUserPackages,
  useUserSubscription,
} from '@/modules/pricing/pricingHook';
import type { CurrentUser } from '@/modules/pricing/pricingService';
import type { Package } from '@/modules/pricing/types';
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

function formatPrice(
  cents: number,
  currency: string,
  interval: string,
): string {
  if (cents === 0) {
    return 'Free';
  }
  const amount = (cents / 100).toFixed(2);
  const symbol = currency.toUpperCase() === 'USD' ? '$' : currency;
  if (interval === 'one_time') {
    return `${symbol}${amount} one-time`;
  }
  if (interval === 'lifetime') {
    return `${symbol}${amount} lifetime`;
  }
  const intervalLabel = interval ? ` / ${interval}` : '';
  return `${symbol}${amount}${intervalLabel}`;
}

const DESTINATION_LABELS: Record<string, { label: string; color: string }> = {
  user: { label: 'For Users', color: 'blue.300' },
  guild: { label: 'For Guilds', color: 'purple.300' },
  room: { label: 'For Rooms', color: 'green.300' },
};

function DestinationBadge({ bindingType }: { bindingType: string }) {
  const d = DESTINATION_LABELS[bindingType] ?? {
    label: bindingType,
    color: 'gray.400',
  };
  return (
    <Text
      fontSize='xs'
      color={d.color}
      fontWeight='semibold'
      textTransform='uppercase'
      letterSpacing='wider'>
      {d.label}
    </Text>
  );
}

function PackageCard({
  pkg,
  user,
  ssoUrl,
  dashboardUrl,
  hasActiveSubscription,
}: {
  pkg: Package;
  user: CurrentUser | null | undefined;
  ssoUrl: string;
  dashboardUrl: string;
  hasActiveSubscription?: boolean;
}) {
  const isFree = pkg.price_cents === 0;
  const hasProviders = pkg.providers.length > 0;
  // guild/room packages — send user to dash to pick specific entity
  const needsDashRedirect = pkg.binding_type !== 'user' && !isFree;

  const handlePaidClick = async () => {
    if (needsDashRedirect) {
      const dashTarget = `${dashboardUrl}/subscription?binding_type=${pkg.binding_type}&package_serial=${pkg.serial}`;
      if (!user) {
        // After SSO login, land on dash/subscription with binding + package pre-selected
        window.location.href = `${ssoUrl}?redirect_url=${encodeURIComponent(
          dashTarget,
        )}`;
      } else {
        window.location.href = dashTarget;
      }
      return;
    }
    if (!user) {
      window.location.href = `${ssoUrl}?redirect_url=${encodeURIComponent(
        window.location.href,
      )}`;
      return;
    }
    try {
      const { getCheckoutURL } = await import(
        '@/modules/pricing/pricingService'
      );
      const url = await getCheckoutURL(pkg.serial);
      window.open(url, '_blank', 'noopener,noreferrer');
    } catch {
      // fallback to static provider URL if checkout API fails
      if (hasProviders) {
        window.open(
          pkg.providers[0].checkout_url,
          '_blank',
          'noopener,noreferrer',
        );
      }
    }
  };

  let buttonLabel: string;

  if (isFree) {
    buttonLabel = 'Get started';
  } else if (hasActiveSubscription && pkg.binding_type === 'user') {
    buttonLabel = 'Already subscribed';
  } else if (needsDashRedirect) {
    buttonLabel = 'Subscribe on Dashboard';
  } else {
    buttonLabel = 'Subscribe';
  }

  const isAlreadySubscribed =
    hasActiveSubscription && pkg.binding_type === 'user' && !isFree;
  const isPaidClickable =
    !isFree &&
    !isAlreadySubscribed &&
    (hasProviders || !!user || needsDashRedirect);

  return (
    <Box {...cardStyle} display='flex' flexDirection='column' gap={6}>
      <VStack alignItems='flex-start' spacing={2}>
        <DestinationBadge bindingType={pkg.binding_type} />
        <Heading as='h3' size='md' color='white'>
          {pkg.name}
        </Heading>
        <Text color='white' fontSize='2xl' fontWeight='bold'>
          {formatPrice(
            pkg.price_cents,
            pkg.price_currency,
            pkg.billing_interval,
          )}
        </Text>
        {pkg.description && (
          <Box
            color='whiteAlpha.700'
            fontSize='sm'
            fontWeight='light'
            sx={{
              p: { mb: 2, _last: { mb: 0 } },
              h2: {
                fontWeight: 'semibold',
                color: 'white',
                fontSize: 'md',
                mt: 3,
                mb: 1,
              },
              h3: {
                fontWeight: 'semibold',
                color: 'white',
                fontSize: 'sm',
                mt: 2,
                mb: 1,
              },
              ul: { listStyleType: 'disc', pl: 5, mb: 2 },
              ol: { listStyleType: 'decimal', pl: 5, mb: 2 },
              li: { mb: 1 },
              strong: { color: 'white', fontWeight: 'semibold' },
              em: { fontStyle: 'italic' },
              code: {
                fontFamily: 'mono',
                fontSize: 'xs',
                bg: 'whiteAlpha.100',
                px: 1,
                borderRadius: 'sm',
              },
              blockquote: {
                borderLeftWidth: '2px',
                borderLeftColor: 'whiteAlpha.300',
                pl: 3,
                color: 'whiteAlpha.500',
                mb: 2,
              },
            }}
            dangerouslySetInnerHTML={{ __html: pkg.description }}
          />
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

      {isFree ? (
        <Button
          as='a'
          href='https://dash.mocha-bot.xyz'
          variant='glass-ghost'
          width='full'
          py={5}>
          {buttonLabel}
        </Button>
      ) : (
        <Button
          onClick={isAlreadySubscribed ? undefined : handlePaidClick}
          variant='glass'
          isDisabled={!isPaidClickable}
          width='full'
          py={5}>
          {buttonLabel}
        </Button>
      )}
    </Box>
  );
}

function TabPlanContent({
  pkgs,
  addons,
  isLoading,
  emptyText,
  user,
  ssoUrl,
  dashboardUrl,
  hasActiveSubscription,
}: {
  pkgs: Package[];
  addons: Package[];
  isLoading: boolean;
  emptyText: string;
  user: CurrentUser | null | undefined;
  ssoUrl: string;
  dashboardUrl: string;
  hasActiveSubscription?: boolean;
}) {
  if (isLoading) {
    return (
      <VStack alignItems='flex-start' spacing={8} w='full'>
        <SimpleGrid columns={[1, null, 3]} gap={6} w='full'>
          <PackageCardSkeleton />
          <PackageCardSkeleton />
          <PackageCardSkeleton />
        </SimpleGrid>
      </VStack>
    );
  }
  return (
    <VStack alignItems='flex-start' spacing={10} w='full'>
      {pkgs.length === 0 ? (
        <Text color='whiteAlpha.500' fontSize='sm'>
          {emptyText}
        </Text>
      ) : (
        <SimpleGrid columns={[1, null, 2]} gap={6} w='full'>
          {pkgs.map((pkg) => (
            <PackageCard
              key={pkg.serial}
              pkg={pkg}
              user={user}
              ssoUrl={ssoUrl}
              dashboardUrl={dashboardUrl}
              hasActiveSubscription={hasActiveSubscription}
            />
          ))}
        </SimpleGrid>
      )}
      {addons.length > 0 && (
        <VStack alignItems='flex-start' spacing={4} w='full'>
          <Text
            color='whiteAlpha.600'
            fontSize='sm'
            fontWeight='semibold'
            textTransform='uppercase'
            letterSpacing='wider'>
            Add-ons
          </Text>
          <SimpleGrid columns={[1, null, 2]} gap={6} w='full'>
            {addons.map((pkg) => (
              <PackageCard
                key={pkg.serial}
                pkg={pkg}
                user={user}
                ssoUrl={ssoUrl}
                dashboardUrl={dashboardUrl}
                hasActiveSubscription={hasActiveSubscription}
              />
            ))}
          </SimpleGrid>
        </VStack>
      )}
    </VStack>
  );
}

function PackageCardSkeleton() {
  return (
    <Box {...cardStyle}>
      <VStack alignItems='flex-start' spacing={4}>
        <Skeleton
          height='24px'
          width='60%'
          borderRadius='md'
          startColor='whiteAlpha.100'
          endColor='whiteAlpha.300'
        />
        <Skeleton
          height='32px'
          width='40%'
          borderRadius='md'
          startColor='whiteAlpha.100'
          endColor='whiteAlpha.300'
        />
        <Skeleton
          height='16px'
          width='80%'
          borderRadius='md'
          startColor='whiteAlpha.100'
          endColor='whiteAlpha.300'
        />
        <Skeleton
          height='16px'
          width='70%'
          borderRadius='md'
          startColor='whiteAlpha.100'
          endColor='whiteAlpha.300'
        />
        <Skeleton
          height='16px'
          width='75%'
          borderRadius='md'
          startColor='whiteAlpha.100'
          endColor='whiteAlpha.300'
        />
        <Skeleton
          height='44px'
          width='full'
          borderRadius='md'
          startColor='whiteAlpha.100'
          endColor='whiteAlpha.300'
        />
      </VStack>
    </Box>
  );
}

function Pricing() {
  const { locale } = useRouter();
  const canonical = buildCanonical('/pricing', locale);
  const { publicRuntimeConfig: runtimeConfig } = getConfig();

  const subscriptions = useSubscriptionPackages();
  const addons = useAddonPackages();
  const { data: currentUser } = useCurrentUser();
  const { data: userSubscription } = useUserSubscription(currentUser?.serial);
  const userPkgs = useUserPackages();
  const guildPkgs = useGuildPackages();
  const roomPkgs = useRoomPackages();
  const userAddons = useUserAddons();
  const guildAddons = useGuildAddons();
  const roomAddons = useRoomAddons();

  const hasUserSubscription =
    !!userSubscription && userSubscription.status === 'active';

  const { isLoading } = subscriptions;
  const hasNoData =
    !isLoading && subscriptions.data.length === 0 && addons.data.length === 0;

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
      <Layout>
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

            {/* Empty state */}
            {hasNoData && (
              <VStack
                alignItems='flex-start'
                spacing={12}
                maxW={{ base: 'full', md: 'xl' }}>
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
                  Mocha is free to get started. Premium features for power
                  communities are coming soon — invite the bot now and
                  you&apos;ll have access the moment plans go live.
                </Text>
                <HStack flexWrap='wrap' gap={4}>
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
                <Tabs variant='soft-rounded' colorScheme='whiteAlpha' w='full'>
                  <TabList gap={2} flexWrap='wrap'>
                    <Tab
                      color='whiteAlpha.700'
                      _selected={{ bg: 'whiteAlpha.200', color: 'white' }}>
                      Users{' '}
                      {userPkgs.data.length > 0 && `(${userPkgs.data.length})`}
                    </Tab>
                    <Tab
                      color='whiteAlpha.700'
                      _selected={{ bg: 'whiteAlpha.200', color: 'white' }}>
                      Guilds{' '}
                      {guildPkgs.data.length > 0 &&
                        `(${guildPkgs.data.length})`}
                    </Tab>
                    <Tab
                      color='whiteAlpha.700'
                      _selected={{ bg: 'whiteAlpha.200', color: 'white' }}>
                      Rooms{' '}
                      {roomPkgs.data.length > 0 && `(${roomPkgs.data.length})`}
                    </Tab>
                  </TabList>
                  <TabPanels mt={6}>
                    <TabPanel p={0}>
                      <TabPlanContent
                        pkgs={userPkgs.data}
                        addons={userAddons.data}
                        isLoading={isLoading}
                        emptyText='No user plans available yet.'
                        user={currentUser}
                        ssoUrl={runtimeConfig.ssoUrl}
                        dashboardUrl={runtimeConfig.dashboardUrl}
                        hasActiveSubscription={hasUserSubscription}
                      />
                    </TabPanel>
                    <TabPanel p={0}>
                      <TabPlanContent
                        pkgs={guildPkgs.data}
                        addons={guildAddons.data}
                        isLoading={isLoading}
                        emptyText='No guild plans available yet.'
                        user={currentUser}
                        ssoUrl={runtimeConfig.ssoUrl}
                        dashboardUrl={runtimeConfig.dashboardUrl}
                      />
                    </TabPanel>
                    <TabPanel p={0}>
                      <TabPlanContent
                        pkgs={roomPkgs.data}
                        addons={roomAddons.data}
                        isLoading={isLoading}
                        emptyText='No room plans available yet.'
                        user={currentUser}
                        ssoUrl={runtimeConfig.ssoUrl}
                        dashboardUrl={runtimeConfig.dashboardUrl}
                      />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
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
