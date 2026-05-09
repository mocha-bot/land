import { Box, Flex, SimpleGrid, Text } from '@chakra-ui/react';
import getConfig from 'next/config';
import NextLink from 'next/link';

import { AnimateOnView } from '@/components/AnimateOnView/AnimateOnView';
import Button from '@/uikit/Button';
import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

import { SolutionCard } from './SolutionCard';
import type { Solution } from './data';
import { getRelatedSolutions } from './data';

const { publicRuntimeConfig } = getConfig();

type FeatureRowProps = {
  title: string;
  body: string;
  index: number;
};

function FeatureRow({ title, body, index }: FeatureRowProps) {
  const isEven = index % 2 === 0;

  return (
    <AnimateOnView variant={isEven ? 'fadeLeft' : 'fadeRight'}>
      <Flex
        flexDirection={{ base: 'column', lg: isEven ? 'row' : 'row-reverse' }}
        gap={{ base: 8, lg: 16 }}
        alignItems='center'
        py={{ base: 8, md: 12 }}>
        {/* Text side */}
        <Flex flexDirection='column' gap={4} flex={1}>
          <Text color='whiteAlpha.400' fontSize='sm' fontWeight='medium'>
            0{index + 1}
          </Text>
          <Text color='white' fontSize={{ base: '22px', md: '28px' }} fontWeight='semibold' lineHeight='1.3'>
            {title}
          </Text>
          <Text color='whiteAlpha.600' fontSize='md' lineHeight='tall'>
            {body}
          </Text>
        </Flex>

        {/* Visual side — Discord-style chat mockup */}
        <Box
          flex={1}
          borderRadius='xl'
          backgroundColor='rgba(0, 0, 0, 0.5)'
          border='1px solid rgba(255, 255, 255, 0.08)'
          p={5}
          minH='180px'
          display='flex'
          flexDirection='column'
          gap={3}>
          {/* Mock channel header */}
          <Flex alignItems='center' gap={2} pb={3} borderBottom='1px solid rgba(255,255,255,0.06)'>
            <Text color='whiteAlpha.400' fontSize='sm'>#</Text>
            <Text color='whiteAlpha.700' fontSize='sm' fontWeight='medium'>mocha-room</Text>
            <Box
              ml='auto'
              px={2}
              py={0.5}
              borderRadius='full'
              backgroundColor='rgba(2, 173, 255, 0.15)'
              border='1px solid rgba(2, 173, 255, 0.3)'>
              <Text color='blue.300' fontSize='xs'>🔗 3 servers</Text>
            </Box>
          </Flex>
          {/* Mock messages */}
          {[
            { server: 'Server A', msg: 'Anyone available for a quick session?' },
            { server: 'Server B', msg: '👋 I\'m in! Let\'s go' },
            { server: 'Server C', msg: 'Count me in too' },
          ].map(({ server, msg }) => (
            <Flex key={server} gap={2} alignItems='flex-start'>
              <Box
                w={6}
                h={6}
                borderRadius='full'
                backgroundColor='rgba(255,255,255,0.1)'
                flexShrink={0}
                display='flex'
                alignItems='center'
                justifyContent='center'>
                <Text fontSize='9px' color='whiteAlpha.600'>{server[7]}</Text>
              </Box>
              <Box>
                <Text fontSize='xs' color='whiteAlpha.400' mb={0.5}>{server}</Text>
                <Text fontSize='sm' color='whiteAlpha.800'>{msg}</Text>
              </Box>
            </Flex>
          ))}
        </Box>
      </Flex>
    </AnimateOnView>
  );
}

type SolutionDetailContainerProps = {
  solution: Solution;
};

export function SolutionDetailContainer({ solution }: SolutionDetailContainerProps) {
  const related = getRelatedSolutions(solution.relatedSlugs);

  return (
    <Layout bgImage='/assets/images/background_desktop.svg'>
      <Container>
        <Flex w='full' flexDirection='column' color='white'>

          {/* Hero */}
          <AnimateOnView>
            <Flex
              flexDirection='column'
              alignItems='center'
              textAlign='center'
              gap={6}
              py={{ base: 16, md: 28 }}>
              <Flex flexDirection='column' gap={3} maxW='2xl'>
                <Text
                  color='whiteAlpha.400'
                  fontSize='sm'
                  fontWeight='medium'
                  textTransform='uppercase'
                  letterSpacing='wider'>
                  Solutions
                </Text>
                <Text
                  fontSize={{ base: '36px', md: '52px' }}
                  lineHeight={{ base: '40px', md: '56px' }}
                  fontWeight='medium'>
                  {solution.title}
                </Text>
                <Text color='whiteAlpha.600' fontSize={{ base: 'md', md: 'lg' }} lineHeight='tall'>
                  {solution.tagline}
                </Text>
              </Flex>
              <Flex gap={4} flexWrap='wrap' justifyContent='center'>
                <Button
                  as='a'
                  variant='glass'
                  py={5}
                  px={8}
                  isAnimated
                  href={publicRuntimeConfig.botInvitationUrl}>
                  Invite to Server
                </Button>
                <Button
                  as='a'
                  variant='glass-ghost'
                  py={5}
                  px={8}
                  href={publicRuntimeConfig.docsUrl}>
                  Read the Docs
                </Button>
              </Flex>
            </Flex>
          </AnimateOnView>

          {/* Description */}
          <AnimateOnView delay={0.1}>
            <Box
              p={{ base: 6, md: 8 }}
              borderRadius='xl'
              backgroundColor='rgba(0, 0, 0, 0.3)'
              border='1px solid rgba(255, 255, 255, 0.08)'
              maxW='3xl'
              mx='auto'
              mb={{ base: 12, md: 20 }}>
              <Text color='whiteAlpha.700' fontSize={{ base: 'md', md: 'lg' }} lineHeight='tall' textAlign='center'>
                {solution.description}
              </Text>
            </Box>
          </AnimateOnView>

          {/* Features */}
          <Flex flexDirection='column' gap={0} mb={{ base: 16, md: 24 }}>
            {solution.features.map((feature, i) => (
              <FeatureRow key={feature.title} title={feature.title} body={feature.body} index={i} />
            ))}
          </Flex>

          {/* CTA Banner */}
          <AnimateOnView>
            <Flex
              flexDirection='column'
              alignItems='center'
              gap={6}
              py={{ base: 12, md: 16 }}
              px={{ base: 6, md: 12 }}
              mb={{ base: 16, md: 24 }}
              borderRadius='2xl'
              backgroundColor='rgba(2, 173, 255, 0.06)'
              border='1px solid rgba(2, 173, 255, 0.15)'
              textAlign='center'>
              <Text fontSize={{ base: '24px', md: '36px' }} fontWeight='medium' maxW='xl'>
                Ready to connect your communities?
              </Text>
              <Text color='whiteAlpha.600' fontSize='md' maxW='lg' lineHeight='tall'>
                Add Mocha to your server in seconds. No data migration, no server merging — just rooms that connect.
              </Text>
              <Button
                as='a'
                variant='glass'
                py={5}
                px={10}
                isAnimated
                href={publicRuntimeConfig.botInvitationUrl}>
                Invite to Server
              </Button>
            </Flex>
          </AnimateOnView>

          {/* Related Solutions */}
          {related.length > 0 && (
            <AnimateOnView delay={0.1}>
              <Flex flexDirection='column' gap={6} mb={{ base: 16, md: 24 }}>
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text fontSize='xl' fontWeight='semibold'>Related solutions</Text>
                  <Box
                    as={NextLink}
                    href='/solutions'
                    color='white'
                    fontSize='sm'
                    fontWeight='light'
                    _hover={{ textDecoration: 'underline' }}>
                    View all
                  </Box>
                </Flex>
                <SimpleGrid columns={[1, null, 3]} gap={6}>
                  {related.map((s) => (
                    <SolutionCard key={s.slug} solution={s} />
                  ))}
                </SimpleGrid>
              </Flex>
            </AnimateOnView>
          )}
        </Flex>
      </Container>
    </Layout>
  );
}
