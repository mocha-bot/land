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
            'Mocha refund policy for premium subscriptions paid in cryptocurrency, including eligibility windows and how to request a refund.',
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
            This Refund Policy explains when and how you can request a refund
            for premium subscriptions to Mocha. By purchasing a premium plan,
            you acknowledge that you have read and agreed to this policy
            alongside our Terms of Service.
          </Text>

          <Heading>Overview</Heading>
          <Text>
            Mocha&apos;s core features are free to use. Premium plans are
            optional add-ons that unlock additional functionality. Because
            premium features are delivered as a digital service, refunds are
            handled on a case-by-case basis under the terms below.
          </Text>

          <Heading>Cryptocurrency Payments</Heading>
          <Text>
            Premium subscriptions are paid in cryptocurrency. On-chain
            transactions are irreversible by design — once a payment is
            confirmed on the blockchain, we cannot reverse the transfer. Where
            a refund is approved under this policy, we will issue it as
            in-app credit, an equivalent extension of your subscription, or a
            new on-chain transfer to a wallet you specify, at our discretion.
          </Text>

          <Heading>Eligibility Window</Heading>
          <Text>
            You may request a refund within seven (7) days of the original
            payment, provided that the premium features tied to that payment
            have not been substantially used. &quot;Substantial use&quot;
            includes, but is not limited to, exceeding free-tier limits,
            broadcasting to additional channels, or using premium-only
            personalization features.
          </Text>

          <Heading>Non-Refundable Cases</Heading>
          <Text>
            Refunds will not be issued in the following situations: (a) the
            seven-day eligibility window has passed; (b) the premium features
            have been substantially used; (c) the request is for a renewal of
            a subscription that you did not cancel before it auto-renewed
            (where applicable); (d) your account or server has been suspended
            for a violation of our Terms of Service; or (e) the request is
            unrelated to a service issue we can verify.
          </Text>

          <Heading>How to Request a Refund</Heading>
          <Text>
            To request a refund, contact us through our official Discord
            support server or the support channels listed at{' '}
            https://mocha-bot.xyz/. Please include: the wallet address that
            made the payment, the transaction hash, the date of payment, the
            Discord server ID the subscription was applied to, and a brief
            explanation of why you are requesting the refund.
          </Text>

          <Heading>Processing Time</Heading>
          <Text>
            We aim to review refund requests within five (5) business days.
            If approved, refunds are typically issued within ten (10) business
            days from approval. Network conditions and confirmation times for
            cryptocurrency transfers may add additional delay outside of our
            control.
          </Text>

          <Heading>Changes to This Policy</Heading>
          <Text>
            We may update this Refund Policy from time to time. Material
            changes will be reflected on this page. The policy that applies to
            your purchase is the version in effect on the date you made the
            payment.
          </Text>

          <Heading>Contact</Heading>
          <Text>
            Questions about this Refund Policy can be directed to our official
            Discord server or to the support channels listed on{' '}
            https://mocha-bot.xyz/.
          </Text>
        </VStack>
      </Container>
    </>
  );
}

export default RefundPolicy;
