import { Box } from '@chakra-ui/react';

import { AnimateOnView } from '@/components/AnimateOnView/AnimateOnView';
import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

import { ComparisonTable } from './ComparisonTable';
import { CrossServerCard } from './CrossServerCard';
import { DonutSection } from './DonutSection';
import { FAQ } from './FAQ';
import { Features } from './Features';
import { Hero } from './Hero';
import { HowItWorks } from './HowItWorks';
import { Invitation } from './Invitation';
import { UseCases } from './UseCases';

export function LandingPageContainer() {
  return (
    <Layout bgImage='/assets/images/background_desktop.svg'>
      <Container>
        <Hero />
        <AnimateOnView delay={0.3}>
          <Box py={24}>
            <CrossServerCard />
          </Box>
        </AnimateOnView>
        <Features />
        <DonutSection />
        <HowItWorks />
        <UseCases />
        <ComparisonTable />
        <FAQ />
        <Invitation />
      </Container>
    </Layout>
  );
}
