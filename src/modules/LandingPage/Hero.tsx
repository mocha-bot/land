import {
  Button,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';

export function Hero() {
  return (
    <VStack
      w='full'
      px={{ base: 4, md: 8, lg: 24 }}
      mt={{ base: 8, md: 12, lg: 44 }}
      alignItems='flex-start'
      spacing={12}>
      <VStack maxW='60%' alignItems='flex-start' spacing={12}>
        <Text
          color='white'
          fontSize={{ base: '2xl', md: '4xl', lg: '6xl' }}
          lineHeight='normal'
          fontWeight='bold'>
          Drink mocha with people accross the universe
        </Text>
        <Text color='white' fontSize={20} lineHeight='normal' fontWeight={400}>
          Mocha is a Discord bot for multi-chat cross-server, that allows you to
          send messages to multiple channels at once.{' '}
        </Text>
      </VStack>
      <HStack w='full' justifyContent='space-between'>
        <HStack>
          <Button
            size='lg'
            color='white'
            rounded='full'
            backgroundColor='rgba(1, 1, 1, 0.40)'
            fontSize='sm'
            fontWeight={500}
            variant='outline'>
            Discover More
          </Button>
          <Button
            size='lg'
            color='white'
            rounded='full'
            fontSize='sm'
            fontWeight={500}
            variant='ghost'>
            See Documentation
          </Button>
        </HStack>
        <HStack spacing={8}>
          <IconButton
            isRound
            backgroundColor='rgba(255, 255, 255, 0.20)'
            aria-label='discord mocha'
            icon={
              <Image
                src='assets/icons/discord-fill.svg'
                width={8}
                height={8}
                alt='Discord Icon'
              />
            }
          />
          <IconButton
            isRound
            backgroundColor='rgba(255, 255, 255, 0.20)'
            aria-label='github mocha'
            icon={
              <Image
                src='assets/icons/github-fill.svg'
                width={8}
                height={8}
                alt='Github Icon'
              />
            }
          />
          <IconButton
            isRound
            backgroundColor='rgba(255, 255, 255, 0.20)'
            aria-label='product hunt mocha'
            icon={
              <Image
                src='assets/icons/product-hunt-fill.svg'
                width={8}
                height={8}
                alt='Product Hunt Icon'
              />
            }
          />
        </HStack>
      </HStack>
    </VStack>
  );
}
