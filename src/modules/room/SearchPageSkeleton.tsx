import {
  Flex,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  SkeletonCircle,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

function RoomCardSkeleton() {
  return (
    <Flex
      flexDir='column'
      borderRadius='16px'
      p={4}
      gap={4}
      bgColor='background.dark'>
      <Flex flexDir='row' gap={3}>
        <SkeletonCircle size='60px' />
        <Flex flexDir='column' gap={2} flex={1}>
          <Skeleton height='6' width='60%' />
          <HStack spacing={3}>
            <HStack spacing={1}>
              <SkeletonCircle size='4' />
              <Skeleton height='4' width='40px' />
            </HStack>
            <HStack spacing={1}>
              <SkeletonCircle size='4' />
              <Skeleton height='4' width='100px' />
            </HStack>
            <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
              <Skeleton height='6' width='60px' borderRadius='20px' />
              <Skeleton height='6' width='80px' borderRadius='20px' />
            </HStack>
          </HStack>
        </Flex>
      </Flex>
      <Flex flexDir='column' gap={1}>
        <Skeleton height='4' width='100%' />
        <Skeleton height='4' width='80%' />
      </Flex>
    </Flex>
  );
}

export function SearchPageSkeleton() {
  return (
    <Layout
      containerProps={{
        bgSize: 'contain',
        bgImage: {
          base: '/assets/images/search-room-background-image-mobile.svg',
          md: '/assets/images/search-room-background-image-desktop.svg',
        },
      }}>
      <Container pt={6} minH='100vh'>
        <NextLink href='/'>
          <HStack spacing={2} color='white'>
            <SkeletonCircle size='4' />
            <Skeleton height='4' width='80px' />
          </HStack>
        </NextLink>
        <Skeleton
          mt={{ base: 4, md: 6 }}
          height={{ base: '40px', md: '64px' }}
          width='60%'
        />
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(12, 1fr)' }}
          gap={6}
          my={8}>
          {/* Filter sidebar skeleton */}
          <GridItem colSpan={{ base: 1, md: 4 }}>
            <Flex flexDir='column' gap={4}>
              {/* Search input skeleton */}
              <Skeleton height='48px' borderRadius='16px' />
              {/* Desktop filter skeleton */}
              <Flex
                flexDir='column'
                bgColor='background.dark'
                borderRadius='2xl'
                p={5}
                gap={6}
                display={{ base: 'none', md: 'flex' }}>
                <Flex flexDir='column' gap={3}>
                  <Skeleton height='4' width='80px' />
                  <Skeleton height='10' borderRadius='20px' />
                </Flex>
                <Flex flexDir='column' gap={3}>
                  <Skeleton height='4' width='100px' />
                  <HStack spacing={2}>
                    <Skeleton height='8' width='60px' borderRadius='20px' />
                    <Skeleton height='8' width='80px' borderRadius='20px' />
                    <Skeleton height='8' width='70px' borderRadius='20px' />
                  </HStack>
                </Flex>
                <Flex flexDir='column' gap={3}>
                  <Skeleton height='4' width='120px' />
                  <Flex gap={2}>
                    <Skeleton height='10' width='80px' borderRadius='8px' />
                    <Skeleton height='10' width='80px' borderRadius='8px' />
                  </Flex>
                </Flex>
              </Flex>
              {/* Mobile filter skeleton */}
              <Flex
                display={{ base: 'flex', md: 'none' }}
                justifyContent='center'
                alignItems='center'
                flexDir='row'
                bgColor='background.dark'
                borderRadius='2xl'
                p={4}
                gap={3}>
                <SkeletonCircle size='4' />
                <Skeleton height='4' width='100px' />
                <Skeleton height='6' width='20px' borderRadius='20px' />
              </Flex>
            </Flex>
          </GridItem>
          {/* Results skeleton */}
          <GridItem colSpan={{ base: 1, md: 8 }}>
            <Flex flexDir='column' gap={6}>
              <Skeleton height='6' width='200px' />
              <Flex flexDir='column' gap={4}>
                {Array.from({ length: 6 }, (_, idx) => (
                  <RoomCardSkeleton key={idx} />
                ))}
              </Flex>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
}
