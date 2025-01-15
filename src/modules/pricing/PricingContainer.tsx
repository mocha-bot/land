import {
  Box,
  Divider,
  Flex,
  SimpleGrid,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import React from 'react';

import Button from '@/uikit/Button';
import { Container } from '@/uikit/Container';
import { Layout } from '@/uikit/Layout';

const PricingFeatures = [
  {
    category: 'Starter Plan',
    price: '$5',
    priceType: 'month',
    features: [
      {
        name: 'Server-to-Server File Sharing',
        description: 'Share files across servers without watermark.',
        enabled: true,
      },
      {
        name: 'Message Editing',
        description:
          'Allows editing of messages within a specified time frame.',
        value: 24,
        unit: 'hours',
        maxValue: 168,
        enabled: true,
      },
      {
        name: 'Message Deleting',
        description:
          'Allows deleting of messages within a specified time frame.',
        value: 24,
        unit: 'hours',
        maxValue: 168,
        enabled: true,
      },
      {
        name: 'Rooms',
        description: 'Defines the maximum number of rooms per server.',
        value: 2,
        maxValue: 5,
        unit: 'total',
        enabled: true,
      },
      {
        name: 'Channels',
        description: 'Defines the maximum number of channels per server.',
        value: 2,
        maxValue: 4,
        unit: 'total',
        enabled: true,
      },
      {
        name: 'Statistics',
        description: 'Access to room statistics is unavailable.',
        enabled: false,
      },
      {
        name: 'Personalization',
        description:
          'Customize your room with a custom sender name and profile picture.',
        enabled: false,
      },
    ],
  },
  {
    category: 'Premium Plan',
    price: '$10',
    priceType: 'month',
    features: [
      {
        name: 'Server-to-Server File Sharing',
        description:
          'Share files across servers without watermark and with basic logs (sender and timestamp).',
        enabled: true,
      },
      {
        name: 'Message Editing',
        description:
          'Allows editing of messages within a specified time frame.',
        value: 7,
        unit: 'days',
        maxValue: 30,
        enabled: true,
      },
      {
        name: 'Message Deleting',
        description:
          'Allows deleting of messages within a specified time frame.',
        value: 7,
        unit: 'days',
        maxValue: 30,
        enabled: true,
      },
      {
        name: 'Rooms',
        description: 'Defines the maximum number of rooms per server.',
        value: 3,
        maxValue: 5,
        unit: 'total',
        enabled: true,
      },
      {
        name: 'Channels',
        description: 'Defines the maximum number of channels per server.',
        value: 3,
        maxValue: 4,
        unit: 'total',
        enabled: true,
      },
      {
        name: 'Statistics',
        description:
          'Basic room statistics: messages sent, active users, messages per day, and top 3 active users.',
        enabled: true,
      },
      {
        name: 'Personalization',
        description:
          'Customize your room with a custom sender name and profile picture.',
        enabled: false,
      },
    ],
  },
  {
    category: 'Pro Plan',
    price: '$20',
    priceType: 'month',
    features: [
      {
        name: 'Server-to-Server File Sharing',
        description:
          'Share files across servers without watermark and with detailed logs (sender, role, and file stats).',
        enabled: true,
      },
      {
        name: 'Message Editing',
        description:
          'Allows editing of messages within a specified time frame.',
        value: 14,
        unit: 'days',
        maxValue: 14,
        enabled: true,
      },
      {
        name: 'Message Deleting',
        description:
          'Allows deleting of messages within a specified time frame.',
        value: 14,
        unit: 'days',
        maxValue: 14,
        enabled: true,
      },
      {
        name: 'Rooms',
        description: 'Defines the maximum number of rooms per server.',
        value: 5,
        maxValue: 5,
        unit: 'total',
        enabled: true,
      },
      {
        name: 'Channels',
        description: 'Defines the maximum number of channels per server.',
        value: 4,
        maxValue: 4,
        unit: 'total',
        enabled: true,
      },
      {
        name: 'Statistics',
        description:
          'Detailed room statistics with custom time ranges, activity graphs, and export to CSV.',
        enabled: true,
      },
      {
        name: 'Personalization',
        description:
          'Customize your room with a custom sender name and profile picture.',
        enabled: true,
      },
    ],
  },
];

function PricingContainer() {
  return (
    <Layout
      containerProps={{
        bgSize: 'cover',
        bgImage: {
          base: '/assets/images/search-room-background-image-mobile.svg',
          md: '/assets/images/search-room-background-image-desktop.svg',
        },
      }}>
      <Container py={6} minH='100vh' gap={8}>
        {/* Title */}
        <Box w={{ base: '100%', lg: '50%' }} mx='auto' mt={8}>
          <Text
            fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
            fontWeight='bold'
            textAlign='center'>
            Plans for every room, built for your community!
          </Text>
        </Box>
        <Flex mt={8} gap={8} flexDirection='column'>
          <Text fontSize='lg' fontWeight='light' textAlign='center'>
            Mocha is <strong>totally free</strong>, but we offer premium
            features to enhance your room experience and community.
          </Text>
          {/* Pricing Categories */}
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            {PricingFeatures.map((feature) => (
              <PricingFeature key={feature.category} {...feature} />
            ))}
          </SimpleGrid>
        </Flex>
        {/* Description */}
        <Text fontWeight='light' textAlign='center' fontSize='sm'>
          Our payment process only accepts cryptocurrencies. If you have any
          questions, please contact us!
        </Text>
      </Container>
    </Layout>
  );
}

type PricingFeatureProps = {
  category: string;
  price: string;
  priceType: string;
  features: {
    name: string;
    description: string;
    enabled: boolean;
    value?: number;
    maxValue?: number;
    unit?: string;
  }[];
};

function PricingFeature(props: PricingFeatureProps) {
  return (
    <Flex
      bg='blackAlpha.100'
      borderRadius='lg'
      p={8}
      borderWidth={1}
      borderColor='gray.200'
      gap={4}
      flexDirection='column'>
      <Text
        fontSize={{ base: '2xl', md: '3xl' }}
        fontWeight='bold'
        textAlign='center'>
        {props.category}
      </Text>
      <Text fontSize='lg' fontWeight='bold' textAlign='center'>
        {props.price} / {props.priceType}
      </Text>
      <Button w='full' variant='glass' borderRadius={16}>
        Upgrade
      </Button>
      <Divider />
      <Box>
        {props.features.map((feature) => (
          <Box key={feature.name} mb={4}>
            <Tooltip
              label={feature.description}
              aria-label='feature'
              placement='top'>
              <Text fontSize='md' fontWeight='light'>
                {feature.enabled ? '✅' : '❌'}
                {feature.value && feature.maxValue && (
                  <>
                    {feature.value} {feature.unit}
                  </>
                )}{' '}
                {feature.name}
              </Text>
              {/* bar */}
            </Tooltip>
            {feature.value && feature.maxValue && (
              <Box
                bg='gray.200'
                h={2}
                borderRadius={16}
                overflow='hidden'
                role='progressbar'
                aria-valuenow={feature.value}
                aria-valuemin={0}
                aria-valuemax={feature.maxValue}
                aria-label={`${feature.name} usage: ${feature.value} out of ${feature.maxValue} ${feature.unit}`}
                mt={2}>
                <Box
                  bg='blue.500'
                  h='100%'
                  w={`${(feature.value / feature.maxValue) * 100}%`}
                />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Flex>
  );
}

export default PricingContainer;
