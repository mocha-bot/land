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
    <VStack w='100%' px={88} mt={178} alignItems='flex-start' spacing={12}>
      <VStack maxW='60%' alignItems='flex-start'>
        <Text color='white' fontSize={64} lineHeight='64px' fontWeight='bold'>
          Drink mocha with people accross the universe
        </Text>
        <Text color='white' fontSize={20} lineHeight='25px' fontWeight={400}>
          Mocha is a Discord bot for multi-chat cross-server, that allows you to
          send messages to multiple channels at once.{' '}
        </Text>
      </VStack>
      <HStack w='100%' justifyContent='space-between'>
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
            p='6px'
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
            p='6px'
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
            p='6px'
            aria-label='ph mocha'
            icon={
              <Image
                src='assets/icons/ph-fill.svg'
                width={8}
                height={8}
                alt='ph Icon'
              />
            }
          />
        </HStack>
      </HStack>
    </VStack>
  );
}
