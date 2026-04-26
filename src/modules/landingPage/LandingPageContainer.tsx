import { useDisclosure } from '@chakra-ui/react';

import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

import { WaitlistModal } from '../waitlist/WaitlistModal';
import { Discover } from './Discover';
import { Features } from './Features';
import { Hero } from './Hero';
import { Invitation } from './Invitation';

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
        <Features />
        {!isEarly && <Discover />}
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
