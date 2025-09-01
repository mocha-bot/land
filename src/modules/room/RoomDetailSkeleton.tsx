import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  SkeletonCircle,
  Stack,
} from '@chakra-ui/react';
import NextLink from 'next/link';

import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

export function RoomDetailSkeleton() {
  return (
    <Layout
      containerProps={{
        bgSize: {
          base: 'cover',
          md: 'contain',
        },
        bgImage: {
          base: '/assets/images/search-room-background-image-mobile.svg',
          md: '/assets/images/detail-room-background-image.svg',
        },
      }}>
      <Container pt={6} minH='100vh'>
        <NextLink href='/search'>
          <HStack spacing={2} color='white' marginBottom={6}>
            <SkeletonCircle size='4' />
            <Skeleton height='4' width='100px' />
          </HStack>
        </NextLink>
        <Grid templateColumns='repeat(12, 1fr)' gap={4}>
          <GridItem
            colSpan={{
              base: 12,
              md: 8,
            }}>
            <Flex flexDir='column' gap={8}>
              {/* top info skeleton */}
              <Flex flexDir='column' gap={6}>
                <Flex flexDir='row' gap={4}>
                  <SkeletonCircle size='28px' />
                  <Flex flexDir='column' gap={2} flex={1}>
                    <Skeleton
                      height={{
                        base: '24px',
                        md: '40px',
                      }}
                      width='60%'
                    />
                    <HStack spacing={3}>
                      <HStack spacing={1}>
                        <SkeletonCircle size='4' />
                        <Skeleton height='4' width='80px' />
                      </HStack>
                      <Divider
                        orientation='vertical'
                        bgColor='rgba(255,255,255,0.3)'
                      />
                      <HStack spacing={1}>
                        <SkeletonCircle size='4' />
                        <Skeleton height='4' width='100px' />
                      </HStack>
                    </HStack>
                  </Flex>
                </Flex>
                {/* mobile buttons skeleton */}
                <Stack
                  direction='column'
                  display={{
                    base: 'block',
                    md: 'none',
                  }}>
                  <Flex flexDir='row' gap={4}>
                    <Skeleton height='50px' width='100%' borderRadius='16px' />
                  </Flex>
                  <Skeleton
                    height='50px'
                    width='100%'
                    borderRadius='16px'
                    mt={3}
                  />
                </Stack>
              </Flex>
              {/* overview skeleton */}
              <Flex flexDir='column' gap={6}>
                <Box
                  borderBottomWidth='1px'
                  borderBottomColor='rgba(255,255,255,0.5)'
                  py={3}>
                  <Skeleton height='4' width='80px' />
                </Box>
                <Skeleton
                  height={{
                    base: '120px',
                    md: '300px',
                  }}
                  borderRadius='16px'
                />
                <Stack spacing={2}>
                  <Skeleton height='4' width='100%' />
                  <Skeleton height='4' width='90%' />
                  <Skeleton height='4' width='80%' />
                </Stack>
              </Flex>
            </Flex>
          </GridItem>
          {/* desktop sidebar skeleton */}
          <GridItem
            colSpan={{
              base: 12,
              md: 4,
            }}
            display={{
              base: 'none',
              md: 'block',
            }}>
            <Flex flexDir='column' gap={8}>
              <Stack direction='column' gap={3}>
                <Skeleton height='50px' width='100%' borderRadius='16px' />
              </Stack>
              <Box
                backgroundColor='rgba(255,255,255,0.1)'
                p={5}
                borderRadius='16px'>
                <Flex flexDir='column' gap={6}>
                  {/* Details section skeleton */}
                  <Flex gap={3} flexDir='column'>
                    <Skeleton height='4' width='60px' />
                    {[1, 2, 3].map((item) => (
                      <Flex
                        flexDir='row'
                        key={item}
                        alignItems='center'
                        gap={2}>
                        <SkeletonCircle size='5' />
                        <Skeleton height='4' width='60px' />
                        <Skeleton height='4' width='80px' />
                      </Flex>
                    ))}
                  </Flex>
                  {/* Tags section skeleton */}
                  <Flex flexDir='column' gap={3}>
                    <Skeleton height='4' width='80px' />
                    <HStack spacing={2}>
                      {[1, 2, 3].map((item) => (
                        <Skeleton
                          key={item}
                          height='28px'
                          width='80px'
                          borderRadius='20px'
                        />
                      ))}
                    </HStack>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
}
