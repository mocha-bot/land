/* eslint-disable react/no-unstable-nested-components */

import { Box, Flex, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import type { GetStaticPropsContext } from 'next';
import { i18n, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import getConfig from 'next/config';
import Head from 'next/head';

import { informations } from '@/config/config';
import { Footer } from '@/uikit/Footer';
import { Header } from '@/uikit/Header';

const { publicRuntimeConfig } = getConfig();

type PlanetBackgroundProps = {
  isMobile?: boolean;
};

function PlanetBackground({ isMobile }: PlanetBackgroundProps) {
  if (isMobile) {
    return (
      <>
        {/* planet left */}
        <Image
          src='/assets/images/planet_3.svg'
          alt='planet'
          position='absolute'
          left={{ base: '-25', md: 'none' }}
          bottom={{ base: '-10', md: 'none' }}
          overflow='hidden'
          zIndex={3}
          loading='lazy'
        />
        {/* planet right */}
        <Image
          src='/assets/images/planet_4.svg'
          alt='planet'
          w={{ base: 'full', md: '70%' }}
          position='absolute'
          right={{ base: '-25', md: 'none' }}
          top={{ base: '-10', md: 'none' }}
          overflow='hidden'
          zIndex={3}
          loading='lazy'
        />
        {/* Flare top */}
        <Image
          src='/assets/images/flare_5.svg'
          alt='flare'
          h='full'
          w='full'
          position='absolute'
          top={{ base: '-205', md: 'none' }}
          zIndex={3}
          loading='lazy'
        />
        {/* Flare bottom */}
        <Image
          src='/assets/images/flare_4.svg'
          alt='flare'
          w='full'
          position='absolute'
          bottom={{ base: '-90', md: 'none' }}
          zIndex={3}
          loading='lazy'
        />
      </>
    );
  }

  return (
    <>
      {/* planet left */}
      <Image
        src='/assets/images/planet_1.svg'
        alt='planet'
        position='absolute'
        left={{ base: 'none', md: '-105' }}
        bottom={{ base: 'none', md: '-125' }}
        overflow='hidden'
        zIndex={3}
        loading='lazy'
      />
      {/* planet right */}
      <Image
        src='/assets/images/planet_2.svg'
        alt='planet'
        w={{ base: 'full', md: '70%' }}
        position='absolute'
        right={{ base: 'none', md: '-125' }}
        top={{ base: 'none', md: '-105' }}
        overflow='hidden'
        zIndex={3}
        loading='lazy'
      />
      {/* Flare top */}
      <Image
        src='/assets/images/flare_2.svg'
        alt='flare'
        h='full'
        w='full'
        position='absolute'
        top={{ base: 'none', md: '-305', lg: '-105' }}
        zIndex={3}
        loading='lazy'
      />
      {/* Flare bottom */}
      <Image
        src='/assets/images/flare_1.svg'
        alt='flare'
        w='full'
        position='absolute'
        bottom={{ base: 'none', md: '-305' }}
        zIndex={3}
        loading='lazy'
      />
    </>
  );
}

type NotFoundDescriptionProps = {
  isMobile?: boolean;
  descriptions?: string[];
};

function NotFoundDescription({
  isMobile,
  descriptions = [],
}: NotFoundDescriptionProps) {
  if (isMobile) {
    return (
      <Text as='h3' fontWeight='light'>
        {descriptions?.map((desc) => (
          <span className='inline' key={desc}>
            {desc}{' '}
          </span>
        ))}
      </Text>
    );
  }

  return (
    <>
      {descriptions.map((desc) => (
        <Text key={desc} as='h3' fontWeight='light'>
          {desc}
        </Text>
      ))}
    </>
  );
}

function Page404() {
  const { t } = useTranslation();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  return (
    <>
      <Head>
        <title>Mocha Bot - Page Not Found</title>
      </Head>
      <Flex flexDirection='column'>
        <Box w='full' position='fixed' top={0} left={0} right={0} zIndex={15}>
          <Header />
        </Box>
        <Flex
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          w='full'
          h='100vh'
          background='black'
          position='relative'
          overflow='hidden'>
          <Flex
            zIndex={10}
            color='white'
            alignItems='center'
            flexDirection='column'
            px={10}>
            <Text
              as='h1'
              fontWeight='bold'
              fontSize={{ base: '9xl', lg: '10xl' }}>
              {t('common:not_found.title')}
            </Text>
            <Box
              fontSize={{ base: 'lg', md: '2xl', lg: '3xl' }}
              textAlign={{ base: 'center' }}>
              <NotFoundDescription
                isMobile={isMobile}
                descriptions={t('common:not_found.descriptions', {
                  returnObjects: true,
                })}
              />
            </Box>
          </Flex>

          <PlanetBackground isMobile={isMobile} />
        </Flex>
        <Footer informations={informations} />
      </Flex>
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

export default Page404;
