import { Container, Heading, Text, VStack } from '@chakra-ui/react';
import { generateNextSeo } from 'next-seo/pages';
import Head from 'next/head';
import { useRouter } from 'next/router';

import {
  buildCanonical,
  buildLanguageAlternates,
  ogLocaleFor,
} from '@/config/seo';

function Eula() {
  const { locale } = useRouter();
  const canonical = buildCanonical('/eula', locale);

  return (
    <>
      <Head>
        {generateNextSeo({
          title: 'End User License Agreement (EULA)',
          description:
            'Read the End User License Agreement governing your use of the Mocha Discord bot, platform, and associated services.',
          canonical,
          languageAlternates: buildLanguageAlternates('/eula'),
          openGraph: {
            type: 'article',
            url: canonical,
            locale: ogLocaleFor(locale),
          },
        })}
      </Head>
      <Container maxW='3xl'>
        <VStack spacing={2} alignItems='flex-start'>
          <Heading>End User License Agreement (EULA) for Mocha</Heading>
          <Text>Last updated: June 2026</Text>
          <Text>
            This End User License Agreement (&quot;Agreement&quot;) is a legal
            agreement between you (&quot;User&quot;) and Mocha (&quot;we&quot;,
            &quot;us&quot;) governing your use of the Mocha Discord bot,
            platform, and associated services. By using Mocha, you agree to this
            Agreement.
          </Text>

          <Heading>License Grant</Heading>
          <Text>
            We grant you a limited, non-exclusive, non-transferable, revocable
            license to use the Mocha bot and platform solely for your personal
            or community management purposes, in accordance with these terms and
            our Terms of Service.
          </Text>

          <Heading>Restrictions</Heading>
          <Text>
            You may not: (a) copy, modify, or distribute Mocha&apos;s software,
            bot code, or branding; (b) use Mocha to build a competing service;
            (c) reverse-engineer or attempt to extract the source code of the
            Service; (d) use automated tools to interact with the Service beyond
            normal use; or (e) resell, sublicense, or transfer your subscription
            or access to another party.
          </Text>

          <Heading>Bot Permissions</Heading>
          <Text>
            By inviting Mocha to your Discord server, you grant the bot the
            permissions required to operate — including reading and sending
            messages, managing channels, and kicking members (for cross-server
            moderation). You may revoke these permissions at any time by
            removing the bot or adjusting its role permissions. Revoking
            permissions may limit or disable Service functionality.
          </Text>

          <Heading>Moderation Features</Heading>
          <Text>
            Room owners and assigned moderators may use Mocha&apos;s moderation
            tools to ban or mute users across all Discord servers connected to a
            room. By using these tools, you accept sole responsibility for
            moderation decisions made within your room. Mocha is a tool;
            enforcement actions are initiated and controlled by you, not by us.
            We are not liable for moderation actions taken by room owners or
            moderators.
          </Text>

          <Heading>Data Processing</Heading>
          <Text>
            By using Mocha, you authorize us to collect, store, and process the
            data described in our Privacy Policy for the purpose of delivering
            the Service. For guild administrators: by connecting your Discord
            server to a Mocha room, you authorize Mocha to relay messages and
            user identifiers between your server and other connected servers as
            part of the room&apos;s functionality.
          </Text>

          <Heading>Subscriptions</Heading>
          <Text>
            Premium features are licensed, not sold. A subscription grants you a
            time-limited right to access specific features bound to a room,
            guild, or user account as described in our Terms of Service. This
            license terminates at the end of the subscription period if not
            renewed.
          </Text>

          <Heading>Termination</Heading>
          <Text>
            This Agreement is effective until terminated. We may terminate your
            license immediately if you violate any provision of this Agreement
            or our Terms of Service. Upon termination, you must cease all use of
            the Service. Provisions that by their nature should survive
            termination (including data handling, limitation of liability, and
            dispute resolution) will survive.
          </Text>

          <Heading>Disclaimer of Warranties</Heading>
          <Text>
            The Service is provided &quot;as is&quot; without warranty of any
            kind. We do not warrant that the Service will be uninterrupted,
            error-free, or meet your specific requirements.
          </Text>

          <Heading>Limitation of Liability</Heading>
          <Text>
            To the maximum extent permitted by law, our total liability for any
            claims arising from this Agreement shall not exceed the amount you
            paid us in the 12 months preceding the claim.
          </Text>

          <Heading>Governing Law</Heading>
          <Text>
            The same governing law provisions as our Terms of Service apply to
            this Agreement.
          </Text>

          <Heading>Changes to This Agreement</Heading>
          <Text>
            We may update this Agreement from time to time. Continued use of the
            Service after changes constitutes acceptance of the updated
            Agreement.
          </Text>

          <Heading>Contact</Heading>
          <Text>
            Questions about this Agreement can be directed to our official
            Discord server or the support channels listed at
            https://mocha-bot.xyz/.
          </Text>
        </VStack>
      </Container>
    </>
  );
}

export default Eula;
