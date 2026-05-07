import { useDisclosure } from '@chakra-ui/react';

import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

import { WaitlistModal } from '../waitlist/WaitlistModal';
import { Discover } from './Discover';
import { FAQ } from './FAQ';
import { Features } from './Features';
import { Hero } from './Hero';
import { HowItWorks } from './HowItWorks';
import { Invitation } from './Invitation';
import { UseCases } from './UseCases';

export type LandingPageVariant = 'default' | 'earlyAccess';

type LandingPageContainerProps = {
  variant?: LandingPageVariant;
};

export function LandingPageContainer({
  variant = 'default',
}: LandingPageContainerProps) {
  const disclosure = useDisclosure();
  const isEarly = variant === 'earlyAccess';

  return (
    <Layout bgImage='/assets/images/background_desktop.svg'>
      <Container>
        <Hero variant={variant} onJoinWaitlist={disclosure.onOpen} />
        <HowItWorks />
        <Features />
        <UseCases />
        {!isEarly && <Discover />}
        <FAQ />
        <Invitation variant={variant} onJoinWaitlist={disclosure.onOpen} />
      </Container>
      {isEarly && (
        <WaitlistModal
          isOpen={disclosure.isOpen}
          onClose={disclosure.onClose}
        />
      )}
    </Layout>
  );
}
