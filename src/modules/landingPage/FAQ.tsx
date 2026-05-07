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

import { FAQ_ITEMS } from './faqData';

const faqs = FAQ_ITEMS;

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
