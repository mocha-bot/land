import { Container, Heading, Text, VStack } from '@chakra-ui/react';
import { generateNextSeo } from 'next-seo/pages';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  buildCanonical,
  buildLanguageAlternates,
  ogLocaleFor,
} from '@/config/seo';

function PrivacyPolicy() {
  const { locale } = useRouter();
  const canonical = buildCanonical('/privacy-policy', locale);

  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Privacy Policy',
          description:
            'Read how Mocha collects, uses, and protects your information. Details on data collection, third-party services, GDPR rights, and children\'s privacy.',
          canonical,
          languageAlternates: buildLanguageAlternates('/privacy-policy'),
          openGraph: {
            type: 'article',
            url: canonical,
            locale: ogLocaleFor(locale),
          },
        })}
      </Head>
      <Container maxW='3xl'>
        <VStack spacing={2} alignItems='flex-start'>
          <Heading>Privacy Policy for Mocha</Heading>
          <Text>Last updated: June 2026</Text>
          <Text>
            This Privacy Policy explains how Mocha (&quot;we&quot;,
            &quot;us&quot;, &quot;our&quot;), accessible at
            https://mocha-bot.xyz/, collects, uses, stores, and protects your
            information when you use the Service.
          </Text>

          <Heading>What Data We Collect</Heading>
          <Text>
            When you use Mocha, we may collect and store the following:
          </Text>
          <Text>
            — Discord user IDs, usernames, and display names — used to identify
            users across rooms and sessions
          </Text>
          <Text>
            — Discord guild (server) IDs and names — used to associate guilds
            with rooms and subscriptions
          </Text>
          <Text>
            — Discord channel IDs — used to manage room-channel connections
          </Text>
          <Text>
            — Message metadata (sender ID, channel ID, timestamp) — used to
            relay messages between connected servers. We do not store message
            content beyond what is necessary for delivery.
          </Text>
          <Text>
            — Subscription and entitlement data — plan type, binding reference,
            billing status, sourced from Whop
          </Text>
          <Text>
            — Invitation link usage — hash, alias, usage count, and expiry
          </Text>
          <Text>
            — Moderation records — room bans, mutes, moderator assignments, and
            audit logs
          </Text>
          <Text>
            — Log files — IP addresses, browser type, timestamps, and referring
            pages for security and analytics
          </Text>

          <Heading>How We Use Your Data</Heading>
          <Text>We use the data collected to:</Text>
          <Text>
            — Operate and deliver the Service, including cross-server room
            relay, invitations, Donut matchmaking, and moderation
          </Text>
          <Text>— Manage subscriptions and entitlements</Text>
          <Text>
            — Enforce our Terms of Service and Acceptable Use policies
          </Text>
          <Text>— Improve the reliability and performance of the Service</Text>
          <Text>— Respond to support requests</Text>

          <Heading>Third-Party Services</Heading>
          <Text>
            We share data with the following third parties only to the extent
            necessary to operate the Service:
          </Text>
          <Text>
            — Discord — the platform through which the bot operates.
            Discord&apos;s Privacy Policy applies to data Discord collects
            directly.
          </Text>
          <Text>
            — Whop (whop.com) — our payment processor. Whop handles all payment
            data. We do not store credit card or payment details. Whop&apos;s
            Privacy Policy applies to payment data.
          </Text>
          <Text>
            We do not sell, rent, or share your data with advertisers or
            unrelated third parties.
          </Text>

          <Heading>Cookies</Heading>
          <Text>
            The Mocha website may use session cookies for authentication (login
            state) and analytics. You can disable cookies through your browser
            settings, though this may affect site functionality.
          </Text>

          <Heading>Data Retention</Heading>
          <Text>
            We retain your data for as long as your account or subscription is
            active, or as long as necessary to provide the Service. Moderation
            records (bans, audit logs) are retained for the lifetime of the room
            they belong to. You may request deletion of your data by contacting
            us — see the Contact section below.
          </Text>

          <Heading>Your Rights (EU/EEA Users — GDPR)</Heading>
          <Text>
            If you are located in the European Union or EEA, you have the
            following rights under the General Data Protection Regulation
            (GDPR):
          </Text>
          <Text>
            — Right of access — request a copy of the data we hold about you
          </Text>
          <Text>
            — Right to rectification — request correction of inaccurate data
          </Text>
          <Text>
            — Right to erasure — request deletion of your data (&quot;right to
            be forgotten&quot;)
          </Text>
          <Text>
            — Right to data portability — request your data in a
            machine-readable format
          </Text>
          <Text>
            — Right to object — object to processing of your data in certain
            circumstances
          </Text>
          <Text>
            — Right to restrict processing — request that we limit how we use
            your data
          </Text>
          <Text>
            To exercise any of these rights, contact us through our official
            Discord server or the support channels listed at
            https://mocha-bot.xyz/. We will respond within 30 days.
          </Text>

          <Heading>Children</Heading>
          <Text>
            Mocha does not knowingly collect personal information from children
            under the age of 13. If you believe a child has provided personal
            information, contact us immediately and we will remove it promptly.
          </Text>

          <Heading>Changes to This Policy</Heading>
          <Text>
            We may update this Privacy Policy from time to time. Material
            changes will be communicated through the Service or on this page
            with an updated effective date.
          </Text>

          <Heading>Contact</Heading>
          <Text>
            For privacy-related questions or to exercise your rights, contact us
            through our official Discord server or the support channels listed
            at https://mocha-bot.xyz/.
          </Text>
        </VStack>
      </Container>
    </>
  );
}

export default PrivacyPolicy;
