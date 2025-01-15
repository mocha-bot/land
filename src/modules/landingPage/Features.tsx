import {
  AspectRatio,
  Box,
  Flex,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';

type CardProps = {
  title: string;
  description: string;
  imageUrl: string;
};

function Card({ title, description, imageUrl }: CardProps) {
  return (
    <Flex
      maxW='sm'
      borderRadius='lg'
      overflow='hidden'
      color='white'
      justifyContent='flex-start'
      alignItems='flex-start'
      flexDirection='column'>
      <Image src={imageUrl} alt={title} borderRadius='lg' w='full' />
      <Box py={4}>
        <Text fontWeight='bold' fontSize='xl'>
          {title}
        </Text>
        <Text mt={2} fontSize='md' color='gray.300'>
          {description}
        </Text>
      </Box>
    </Flex>
  );
}

const features = [
  {
    title: 'Room Management',
    description:
      'Organize and customize your rooms effortlessly for a smoother, more structured experience.',
    imageUrl: '/assets/images/feature-image_1.svg',
  },
  {
    title: 'Multiple Server Chat',
    description:
      'Seamlessly connect across servers, fostering fluid conversations in different spaces.',
    imageUrl: '/assets/images/feature-image_2.svg',
  },
  {
    title: 'Prohibit All Member Mentions',
    description:
      'Silence the noise by restricting @mentions to avoid overwhelming alerts.',
    imageUrl: '/assets/images/feature-image_3.svg',
  },
];

function Title() {
  return (
    <Flex
      justifyContent='center'
      flexDirection='column'
      alignItems='center'
      color='white'
      gap={4}>
      <Text
        as='h4'
        fontWeight='semibold'
        fontSize={{
          base: '16px',
          md: '20px',
        }}>
        Our Features
      </Text>
      <Flex
        gap={-1}
        flexDirection='column'
        alignItems='center'
        textAlign='center'
        lineHeight={1.5}
        letterSpacing='tighter'
        w='full'
        maxW={160}>
        <Text
          as='h2'
          fontSize={{ base: '28px', md: '48px' }}
          lineHeight={{ base: '28px', md: '48px' }}>
          Arrange Your Mocha Time With Ease
        </Text>
      </Flex>
    </Flex>
  );
}

function Features() {
  return (
    <Flex
      w='full'
      h='full'
      py={{ base: 10, md: 24 }}
      justifyContent='center'
      alignItems='center'
      id='features'>
      <Flex
        w='full'
        h='full'
        borderRadius={{ base: 24, md: 40 }}
        backgroundColor='rgba(0, 0, 0, 0.4)'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        gap={8}
        py={10}
        px={{
          base: 4,
          md: 10,
        }}>
        <Title />
        <SimpleGrid columns={[1, 3]} gap={6}>
          {features.map((feature) => (
            <Card
              key={feature.title}
              title={feature.title}
              description={feature.description}
              imageUrl={feature.imageUrl}
            />
          ))}
        </SimpleGrid>
        <Text as='h4' fontWeight='semibold' color='white'>
          See Our Demo
        </Text>
        {/* TODO: change to video */}
        <AspectRatio maxW={280} ratio={16 / 9} w='full' h='full'>
          <Image
            src='/assets/images/feature-image_2.svg'
            alt='naruto'
            objectFit='cover'
            borderRadius={20}
          />
        </AspectRatio>
      </Flex>
    </Flex>
  );
}

export { Features };
