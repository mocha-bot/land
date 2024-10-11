import { Box, Flex, Image, Text, useMediaQuery } from '@chakra-ui/react';

import Footer from '@/uikit/Footer';
import Header from '@/uikit/Header';

function DescriptionMobile() {
  return (
    <Text as='h3' fontWeight='light'>
      Whoops, you’ve wandered far, even Pluto is in your rearview! Seems like
      the page you’re looking for has drifted off-course
    </Text>
  );
}

function DescriptionDesktop() {
  return (
    <>
      <Text as='h3' fontWeight='light'>
        Whoops, you’ve wandered far, even Pluto is in your rearview!
      </Text>
      <Text>Seems like the page you’re looking for has drifted off-course</Text>
    </>
  );
}

export default function Page404() {
  const isMobile = useMediaQuery('(max-width: 768px)')[0];
  const isDesktop = useMediaQuery('(min-width: 1024px)')[0];

  return (
    <Flex flexDirection='column'>
      <Box w='full' position='absolute' zIndex={15}>
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
          px='10'>
          <Text
            as='h1'
            fontWeight='bold'
            fontSize={{ base: '128px', lg: '192px' }}>
            404
          </Text>
          <Box
            fontSize={{ base: '16px', md: '24px', lg: '32px' }}
            textAlign={{ base: 'center' }}>
            {isMobile && <DescriptionMobile />}
            {isDesktop && <DescriptionDesktop />}
          </Box>
        </Flex>
        {isDesktop && (
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
            />
            {/* planet right */}
            <Image
              src='/assets/images/planet_2.svg'
              alt='planet'
              w={{ base: '100%', md: '70%' }}
              position='absolute'
              right={{ base: 'none', md: '-125' }}
              top={{ base: 'none', md: '-105' }}
              overflow='hidden'
              zIndex={3}
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
            />
            {/* Flare bottom */}
            <Image
              src='/assets/images/flare_1.svg'
              alt='flare'
              w='full'
              position='absolute'
              bottom={{ base: 'none', md: '-305' }}
              zIndex={3}
            />
          </>
        )}

        {isMobile && (
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
            />
            {/* planet right */}
            <Image
              src='/assets/images/planet_4.svg'
              alt='planet'
              w={{ base: '100%', md: '70%' }}
              position='absolute'
              right={{ base: '-25', md: 'none' }}
              top={{ base: '-10', md: 'none' }}
              overflow='hidden'
              zIndex={3}
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
            />
            {/* Flare bottom */}
            <Image
              src='/assets/images/flare_4.svg'
              alt='flare'
              w='full'
              position='absolute'
              bottom={{ base: '-90', md: 'none' }}
              zIndex={3}
            />
          </>
        )}
      </Flex>
      {!isMobile && <Footer />}
    </Flex>
  );
}
