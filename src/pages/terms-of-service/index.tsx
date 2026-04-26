import { Container, Heading, Text, VStack } from '@chakra-ui/react';
import { generateNextSeo } from 'next-seo/pages';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  buildCanonical,
  buildLanguageAlternates,
  ogLocaleFor,
} from '@/config/seo';

function TermsOfService() {
  const { locale } = useRouter();
  const canonical = buildCanonical('/terms-of-service', locale);

  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'Terms of Service',
          description:
            'Read the terms governing the use of Mocha — accounts, acceptable use, payments, intellectual property, and termination.',
          canonical,
          languageAlternates: buildLanguageAlternates('/terms-of-service'),
          openGraph: {
            type: 'article',
            url: canonical,
            locale: ogLocaleFor(locale),
          },
        })}
      </Head>
      <Container maxW='3xl'>
        <VStack spacing={2} alignItems='flex-start'>
          <Heading>Terms of Service for Mocha</Heading>
          <Text>
            These Terms of Service (&quot;Terms&quot;) govern your access to and
            use of Mocha, a Discord bot and accompanying website available at{' '}
            https://mocha-bot.xyz/ (collectively, the &quot;Service&quot;). By
            using the Service, you agree to be bound by these Terms. If you do
            not agree, do not use the Service.
          </Text>

          <Heading>Acceptance of Terms</Heading>
          <Text>
            By inviting Mocha to a Discord server, interacting with the bot, or
            visiting the website, you confirm that you have read, understood,
            and agreed to these Terms and to our Privacy Policy. If you are
            using the Service on behalf of a community or organization, you
            represent that you are authorized to accept these Terms on its
            behalf.
          </Text>

          <Heading>Description of Service</Heading>
          <Text>
            Mocha is a Discord bot that connects communities through
            cross-server &quot;rooms&quot;, enabling shared channels,
            broadcasts, and other community features. Some functionality is
            available for free; additional features may be offered as part of a
            paid premium plan.
          </Text>

          <Heading>Eligibility</Heading>
          <Text>
            You must be at least 13 years old (or the minimum age required in
            your jurisdiction to use Discord) to use Mocha. By using the
            Service, you also agree to comply with the{' '}
            <a href='https://discord.com/terms'>Discord Terms of Service</a>{' '}
            and{' '}
            <a href='https://discord.com/guidelines'>
              Discord Community Guidelines
            </a>
            .
          </Text>

          <Heading>Account and Server Responsibilities</Heading>
          <Text>
            You are responsible for the configuration of Mocha on any Discord
            server you administer, including the permissions you grant the bot
            and the content moderation policies you enforce. You are
            responsible for the conduct of members within your server and for
            ensuring that your use of Mocha complies with applicable laws.
          </Text>

          <Heading>Acceptable Use</Heading>
          <Text>
            You agree not to use the Service to: (a) violate any law or third
            party rights; (b) send spam, harass, abuse, or harm other users;
            (c) distribute malware or attempt to disrupt the Service; (d)
            reverse-engineer, scrape, or otherwise misuse the Service; or (e)
            share content that is illegal, sexually explicit involving minors,
            or that incites violence. We may suspend or terminate access for
            any user or server that violates these rules.
          </Text>

          <Heading>Subscriptions and Payments</Heading>
          <Text>
            Premium features are offered as paid subscriptions. Payments are
            processed in cryptocurrencies as described on our pricing page.
            Subscriptions begin when payment is confirmed on-chain and continue
            for the period purchased. Refund eligibility is governed by our
            Refund Policy.
          </Text>

          <Heading>Intellectual Property</Heading>
          <Text>
            Mocha, including the bot, website, and related branding, is owned
            by us and is protected by intellectual property laws. We grant you
            a limited, non-exclusive, non-transferable, revocable license to
            use the Service for its intended purpose. You retain ownership of
            content you create within your servers; by using the Service, you
            grant us the technical permissions necessary to deliver and
            operate it.
          </Text>

          <Heading>Disclaimers and Limitation of Liability</Heading>
          <Text>
            The Service is provided &quot;as is&quot; and &quot;as
            available&quot; without warranties of any kind, express or
            implied. To the maximum extent permitted by law, we are not liable
            for any indirect, incidental, special, consequential, or
            exemplary damages arising from your use of the Service, including
            loss of data, server outages, or interruptions caused by
            third-party platforms such as Discord.
          </Text>

          <Heading>Termination</Heading>
          <Text>
            You may stop using the Service at any time by removing Mocha from
            your Discord server. We may suspend or terminate your access to
            the Service, in whole or in part, at any time and without notice
            if we believe you have violated these Terms or pose a risk to the
            Service or its users.
          </Text>

          <Heading>Changes to These Terms</Heading>
          <Text>
            We may update these Terms from time to time. When we do, we will
            update the &quot;last updated&quot; reference within the Service or
            on this page. Continued use of the Service after changes take
            effect constitutes acceptance of the updated Terms.
          </Text>

          <Heading>Governing Law</Heading>
          <Text>
            These Terms are governed by the laws of the jurisdiction in which
            Mocha is operated, without regard to conflict-of-law principles.
            Any disputes will be resolved in the competent courts of that
            jurisdiction unless otherwise required by applicable law.
          </Text>

          <Heading>Contact</Heading>
          <Text>
            If you have questions about these Terms, please contact us through
            our official Discord server or the support channels listed on{' '}
            https://mocha-bot.xyz/.
          </Text>
        </VStack>
      </Container>
    </>
  );
}

export default TermsOfService;
