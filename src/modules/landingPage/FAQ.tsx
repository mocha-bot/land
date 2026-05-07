import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';

import { AnimateOnView } from '@/components/AnimateOnView/AnimateOnView';

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: 'Is Mocha free to use?',
    answer:
      'Yes. The core cross-server chat features are free. Premium plans add higher room limits, advanced moderation tools, and priority support — check the Pricing page for details.',
  },
  {
    question: 'Do I need to move my community to a new server?',
    answer:
      'No. Mocha bridges channels in your existing server. Your members stay where they are — only the messages travel across the room.',
  },
  {
    question: 'Who can join a room?',
    answer:
      'Any Discord server admin who has invited Mocha can join a public room using the room ID. Room owners can also restrict joining to keep the room private.',
  },
  {
    question: 'Can one server join multiple rooms?',
    answer:
      'Yes. Each channel joins independently. You can link #gaming to a game room, #study to a study room, and #events to an event room — all from the same server.',
  },
  {
    question: 'What happens to my messages — are they stored?',
    answer:
      'Mocha relays messages in real time between connected channels. Review the Privacy Policy for full details on data handling and retention.',
  },
  {
    question: 'Can I control who can send messages in the room?',
    answer:
      'Room owners can prohibit @everyone and @here mentions, set slow mode, and manage which servers remain connected. Per-user moderation follows each server\'s own Discord permissions.',
  },
  {
    question: 'What if I want to leave a room?',
    answer:
      'Run /room leave in the linked channel. The channel is unlinked instantly and no further messages are relayed in either direction.',
  },
];

export function FAQ() {
  return (
    <Flex
      w='full'
      flexDirection='column'
      gap={10}
      py={{ base: 10, md: 24 }}
      color='white'>
      <AnimateOnView>
        <Flex flexDirection='column' gap={3}>
          <Text fontWeight='semibold' fontSize={{ base: '16px', md: '20px' }}>
            FAQ
          </Text>
          <Text
            fontSize={{ base: '28px', md: '48px' }}
            lineHeight={{ base: '32px', md: '52px' }}
            maxW='2xl'>
            Questions we get asked a lot
          </Text>
        </Flex>
      </AnimateOnView>
      <AnimateOnView delay={0.15}>
        <Accordion allowMultiple>
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.question}
              border='none'
              mb={3}>
              {({ isExpanded }) => (
                <Box
                  borderRadius='xl'
                  border='1px solid'
                  borderColor={isExpanded ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}
                  backgroundColor={isExpanded ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.3)'}
                  overflow='hidden'
                  transition='all 0.2s'>
                  <AccordionButton
                    px={6}
                    py={5}
                    _hover={{ backgroundColor: 'rgba(255,255,255,0.04)' }}>
                    <Box flex='1' textAlign='left'>
                      <Text color='white' fontWeight='medium' fontSize={{ base: 'sm', md: 'md' }}>
                        {faq.question}
                      </Text>
                    </Box>
                    <AccordionIcon color='whiteAlpha.600' />
                  </AccordionButton>
                  <AccordionPanel px={6} pb={5}>
                    <Text color='whiteAlpha.700' fontSize='sm' lineHeight='tall'>
                      {faq.answer}
                    </Text>
                  </AccordionPanel>
                </Box>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </AnimateOnView>
    </Flex>
  );
}
