import Layout from '@/uikit/Layout';

import { Discover } from './Discover';
import { Features } from './Features';
import { Hero } from './Hero';
import { Invitation } from './Invitation';
import { Status } from './Status';

export function LandingPageContainer() {
  return (
    <Layout>
      <Hero />
      <Features />
      <Status />
      <Discover />
      <Invitation />
    </Layout>
  );
}
