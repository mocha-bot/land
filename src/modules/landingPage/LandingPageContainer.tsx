import {
  Button as ChakraButton,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import type { FormEvent } from 'react';
import { useState } from 'react';

import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

import { Discover } from './Discover';
import { Features } from './Features';
import { Hero } from './Hero';
import { Invitation } from './Invitation';
import { Status } from './Status';

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
        <Status />
        {!isEarly && <Discover />}
        <Invitation variant={variant} onJoinWaitlist={disclosure.onOpen} />
      </Container>
      {isEarly && (
        <WaitlistModalInline
          isOpen={disclosure.isOpen}
          onClose={disclosure.onClose}
        />
      )}
    </Layout>
  );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type WaitlistModalInlineProps = {
  isOpen: boolean;
  onClose: () => void;
};

function WaitlistModalInline({ isOpen, onClose }: WaitlistModalInlineProps) {
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
      setClientError(null);
      setIsSubmitting(false);
    }, 200);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setClientError('Please enter a valid email address.');
      return;
    }
    setClientError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!res.ok) {
        throw new Error(`request failed: ${res.status}`);
      }
      setIsSubmitted(true);
    } catch {
      toast({
        title: 'Something went wrong',
        description: 'We could not save your signup. Please try again in a moment.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay backdropFilter='blur(6px)' />
      <ModalContent
        bg='rgba(20, 20, 20, 0.95)'
        color='white'
        borderRadius='lg'
        mx={4}>
        {isSubmitted ? (
          <>
            <ModalHeader>You are on the list</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align='start' spacing={3}>
                <Text fontWeight='semibold'>Thanks for signing up.</Text>
                <Text fontSize='sm' opacity={0.8}>
                  We will email you the moment your early access seat is ready.
                  Keep an eye on your inbox (and your spam folder, just in case).
                </Text>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <ChakraButton
                variant='outline'
                colorScheme='whiteAlpha'
                onClick={handleClose}>
                Close
              </ChakraButton>
            </ModalFooter>
          </>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <ModalHeader>Join the early access waitlist</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack align='stretch' spacing={4}>
                <Text fontSize='sm' opacity={0.8}>
                  Drop your email and we will let you know the moment early
                  access opens. No spam — we will only reach out about your spot.
                </Text>
                <FormControl isInvalid={!!clientError} isRequired>
                  <FormLabel fontSize='sm'>Email</FormLabel>
                  <Input
                    type='email'
                    placeholder='you@example.com'
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (clientError) {
                        setClientError(null);
                      }
                    }}
                    bg='rgba(255, 255, 255, 0.08)'
                    borderColor='rgba(255, 255, 255, 0.2)'
                    _hover={{ borderColor: 'rgba(255, 255, 255, 0.4)' }}
                    autoFocus
                    disabled={isSubmitting}
                  />
                  {clientError && (
                    <FormErrorMessage>{clientError}</FormErrorMessage>
                  )}
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter gap={2}>
              <ChakraButton
                variant='ghost'
                colorScheme='whiteAlpha'
                onClick={handleClose}
                disabled={isSubmitting}>
                Maybe later
              </ChakraButton>
              <ChakraButton
                type='submit'
                colorScheme='whiteAlpha'
                bg='whiteAlpha.300'
                _hover={{ bg: 'whiteAlpha.400' }}
                isLoading={isSubmitting}
                loadingText='Joining'>
                Join waitlist
              </ChakraButton>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
}
