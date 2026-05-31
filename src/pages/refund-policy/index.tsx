import { Container, Heading, Text, VStack } from '@chakra-ui/react';
import { generateNextSeo } from 'next-seo/pages';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  buildCanonical,
  buildLanguageAlternates,
  ogLocaleFor,
} from '@/config/seo';

function RefundPolicy() {
  const { locale } = useRouter();
  const canonical = buildCanonical('/refund-policy', locale);

  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Refund Policy',
          description:
            'All Mocha premium subscription and add-on purchases are final and non-refundable. Read our full refund policy.',
          canonical,
          languageAlternates: buildLanguageAlternates('/refund-policy'),
          openGraph: {
            type: 'article',
            url: canonical,
            locale: ogLocaleFor(locale),
          },
        })}
      </Head>
      <Container maxW='3xl'>
        <VStack spacing={2} alignItems='flex-start'>
          <Heading>Refund Policy for Mocha</Heading>
          <Text>Last updated: June 2026</Text>
          <Text>
            All purchases of Mocha premium plans are processed through Whop
            (whop.com). By completing a purchase, you acknowledge that you have
            read, understood, and agreed to this policy alongside our Terms of
            Service.
          </Text>

          <Heading>No Refunds</Heading>
          <Text>
            All purchases are final and non-refundable. We do not offer refunds,
            credits, or exchanges for any premium subscription purchase,
            regardless of the reason. This includes but is not limited to:
            change of mind, unused subscription time, accidental purchases, or
            dissatisfaction with the service.
          </Text>

          <Heading>Digital Service — Immediate Access</Heading>
          <Text>
            Mocha delivers premium features as a digital service made available
            immediately upon purchase. Because access is granted instantly upon
            payment, all sales are considered final at the point of payment.
          </Text>

          <Heading>Payments via Whop</Heading>
          <Text>
            Payments are processed by Whop (whop.com) and are subject to
            Whop&apos;s payment terms. Applicable taxes and platform fees are
            collected by Whop at the time of purchase and are non-recoverable by
            us. Mocha does not store your payment details. For payment disputes
            or issues with a specific transaction, contact Whop support directly
            at whop.com. In the event a refund is granted at our sole
            discretion, it will be limited to the net amount received by us
            after Whop&apos;s fees and taxes are deducted.
          </Text>

          <Heading>Cancellations</Heading>
          <Text>
            You may cancel a recurring subscription at any time through your
            Whop account dashboard or via the /subscribe command in Discord.
            Cancellation takes effect at the end of the current billing period.
            Your room, guild, or user will retain premium features until the
            period ends, after which it reverts to the free tier. No refund will
            be issued for remaining time on an active subscription period.
          </Text>

          <Heading>Vouchers and Promotional Codes</Heading>
          <Text>
            Subscriptions activated using a promotional or voucher code are
            subject to the same no-refund policy. If a free-trial voucher is
            used and you do not cancel before the trial ends, the subscription
            will renew at the standard price. You are responsible for managing
            your subscription renewal.
          </Text>

          <Heading>Changes to This Policy</Heading>
          <Text>
            We may update this Refund Policy from time to time. Continued use of
            the service after changes constitutes acceptance of the revised
            policy.
          </Text>

          <Heading>Contact</Heading>
          <Text>
            Questions about this policy can be directed to our official Discord
            server or the support channels listed at https://mocha-bot.xyz/.
          </Text>
        </VStack>
      </Container>
    </>
  );
}

export default RefundPolicy;
