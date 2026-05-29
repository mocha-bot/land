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
          <Text>
            All purchases of Mocha premium plans and add-ons are final and
            non-refundable. By completing a purchase, you acknowledge that you
            have read, understood, and agreed to this policy alongside our Terms
            of Service.
          </Text>

          <Heading>No Refunds</Heading>
          <Text>
            We do not offer refunds, credits, or exchanges for any premium
            subscription or add-on purchase, regardless of the reason. This
            includes, but is not limited to: change of mind, unused subscription
            time, accidental purchases, or dissatisfaction with the service.
          </Text>

          <Heading>Digital Service Nature</Heading>
          <Text>
            Mocha delivers premium features as a digital service that is made
            available immediately upon purchase. Because access to the service
            is granted instantly, all sales are considered final at the point of
            payment.
          </Text>

          <Heading>Payment Irreversibility</Heading>
          <Text>
            Payments processed through our payment providers are subject to
            their respective terms. Cryptocurrency transactions are irreversible
            by design once confirmed on-chain. We are not able to reverse any
            completed transaction.
          </Text>

          <Heading>Cancellations</Heading>
          <Text>
            You may cancel a recurring subscription at any time to prevent
            future charges. Cancellation takes effect at the end of the current
            billing period. No refund will be issued for the remaining time on
            an active subscription period.
          </Text>

          <Heading>Changes to This Policy</Heading>
          <Text>
            We may update this Refund Policy from time to time. Material changes
            will be reflected on this page with an updated effective date.
            Continued use of the service after changes constitutes acceptance of
            the revised policy.
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
