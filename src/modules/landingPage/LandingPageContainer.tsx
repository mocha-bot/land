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
import { StatsBar } from './StatsBar';
import { UseCases } from './UseCases';

export function LandingPageContainer() {
  return (
    <Layout>
      <Container>
        <Hero />
        {/* Quick reassurance: numbers right after the pitch */}
        <Box py={6}>
          <StatsBar />
        </Box>
        <AnimateOnView delay={0.3}>
          <Box py={16}>
            <CrossServerCard />
          </Box>
        </AnimateOnView>
        {/* HowItWorks early: visitors see setup steps before scrolling deep */}
        <HowItWorks />
        {/* Comparison early: value prop visible before feature deep-dive */}
        <ComparisonTable />
        <Features />
        {/* Donut after Rooms features — bridge text inside DonutSection explains the link */}
        <DonutSection />
        <UseCases />
        <FAQ />
        <Invitation />
      </Container>
    </Layout>
  );
}
