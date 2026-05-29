import { Flex, SimpleGrid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

import {
  AnimateOnView,
  StaggerContainer,
  staggerItem,
} from '@/components/AnimateOnView/AnimateOnView';
import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

import { solutions } from './data';
import { SolutionCard } from './SolutionCard';

export function SolutionsContainer() {
  return (
    <Layout>
      <Container>
        <Flex
          w='full'
          flexDirection='column'
          gap={16}
          py={{ base: 12, md: 24 }}
          color='white'>
          <AnimateOnView>
            <Flex flexDirection='column' gap={4} maxW='2xl'>
              <Text
                fontWeight='semibold'
                fontSize={{ base: '14px', md: '16px' }}
                color='whiteAlpha.500'
                textTransform='uppercase'
                letterSpacing='wider'>
                Solutions
              </Text>
              <Text
                fontSize={{ base: '36px', md: '56px' }}
                lineHeight={{ base: '40px', md: '60px' }}
                fontWeight='medium'>
                Mocha for every community
              </Text>
              <Text
                color='whiteAlpha.600'
                fontSize={{ base: 'sm', md: 'md' }}
                lineHeight='tall'>
                Whatever brings your people together, Mocha connects the
                servers. One room, every community, no migration required.
              </Text>
            </Flex>
          </AnimateOnView>

          <StaggerContainer staggerDelay={0.06}>
            <SimpleGrid columns={[1, null, 2, 3]} gap={6}>
              {solutions.map((solution) => (
                <motion.div
                  key={solution.slug}
                  variants={staggerItem}
                  style={{ height: '100%' }}>
                  <SolutionCard solution={solution} />
                </motion.div>
              ))}
            </SimpleGrid>
          </StaggerContainer>
        </Flex>
      </Container>
    </Layout>
  );
}
