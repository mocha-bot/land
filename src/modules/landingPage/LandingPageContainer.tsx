import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

import { ComparisonTable } from './ComparisonTable';
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
        <HowItWorks />
        <Features />
        <ComparisonTable />
        <UseCases />
        <FAQ />
        <Invitation />
      </Container>
    </Layout>
  );
}
