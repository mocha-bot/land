import {
  Box,
  Button,
  Container,
  createIcon,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import getConfig from 'next/config';
import { GiTwoCoins } from 'react-icons/gi';

import DonationModal from '@/components/DonationModal/DonationModal';

const { publicRuntimeConfig } = getConfig();

const Arrow = createIcon({
  displayName: 'Arrow',
  viewBox: '0 0 72 24',
  path: (
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z'
      fill='currentColor'
    />
  ),
});

export function HomeContainer() {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const subDirection: {
    href: string;
    name: string;
  }[] = [
    {
      href: publicRuntimeConfig.docsUrl,
      name: t('common:home.docs_button_label'),
    },
    {
      href: publicRuntimeConfig.discordServerUrl,
      name: t('common:home.discord_button_label'),
    },
  ];

  return (
    <>
      <Container maxW='3xl' h='100vh' background='#f6eee3'>
        <Stack
          as={Box}
          textAlign='center'
          spacing={{ base: 8, md: 14 }}
          py={{ base: 24, md: 24 }}
          h='full'>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '3xl', md: '5xl' }}
            lineHeight='110%'>
            {t('common:home.tag_one')} <br />
            <Text as='span' color='yellow.600'>
              {t('common:home.tag_two')}
            </Text>
          </Heading>
          <Text color='gray.700'>{t('common:home.description')}</Text>
          <Flex
            justifyContent='space-between'
            flexDirection='column'
            gap='8px'
            h='100%'>
            <VStack
              spacing={2}
              alignSelf='center'
              w={{ base: '100%', md: 'auto' }}>
              <Box position='relative' w='100%'>
                <Link
                  href={publicRuntimeConfig.botInvitationUrl}
                  isExternal
                  _hover={{ textDecoration: 'none' }}>
                  <Button
                    w='100%'
                    bg='yellow.700'
                    color='white'
                    rounded='full'
                    px={6}
                    _hover={{
                      bg: 'yellow.800',
                    }}
                    _focus={{ bg: 'yellow.900' }}>
                    {t('common:home.invite_button_label')}
                  </Button>
                </Link>
                <Box display={{ base: 'none', md: 'block' }}>
                  <Icon
                    as={Arrow}
                    color={useColorModeValue('gray.800', 'gray.300')}
                    w={71}
                    position='absolute'
                    right={-71}
                    top='10px'
                  />
                  <Text
                    fontSize='lg'
                    fontFamily='Caveat'
                    position='absolute'
                    right='-90px'
                    top='-15px'
                    transform='rotate(10deg)'>
                    {t('common:home.invite_button_arrow_label')}
                  </Text>
                </Box>
              </Box>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} w='100%'>
                {subDirection.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    isExternal
                    _hover={{ textDecoration: 'none' }}>
                    <Button
                      w='100%'
                      variant='outline'
                      rounded='full'
                      px={6}
                      borderColor='yellow.700'
                      _hover={{
                        borderColor: 'yellow.700',
                      }}>
                      {item.name}
                    </Button>
                  </Link>
                ))}
              </SimpleGrid>
            </VStack>
            <Box>
              <Button
                w={{ base: '100%', md: 'auto' }}
                variant='outline'
                rounded='full'
                px={6}
                gap='8px'
                bg='yellow.700'
                borderColor='yellow.700'
                textColor='white'
                _hover={{
                  borderColor: 'white',
                }}
                onClick={onOpen}>
                <GiTwoCoins color='#FFD700' />
                {t('common:home.donate.title')}
              </Button>
            </Box>
          </Flex>
        </Stack>
        <Box
          position='absolute'
          bottom={publicRuntimeConfig.showVersion ? '8' : '10'}
          left='0'
          right='0'
          w='full'
          justifyContent='center'>
          <Flex alignItems='center' justifyContent='center'>
            <Text>{t('common:home.supported_by')}</Text>
            <Image
              src='assets/images/logo-mocha.svg'
              width='20px'
              height='20px'
              alt='Mocha Logo'
              ml='4px'
              mr='2px'
            />
            <Text
              display='inline'
              color='blue.400'
              borderBottomWidth='1px'
              borderBottomColor='blue.500'>
              <Link
                href='https://discord.com/invite/PQnkPABkbd'
                isExternal
                _hover={{ textDecoration: 'none' }}>
                {t('common:mocha_developer')}
              </Link>
            </Text>
          </Flex>
          {publicRuntimeConfig.showVersion && (
            <Text fontSize='10px' textAlign='center' mt='2'>
              {t('common:version')} - {publicRuntimeConfig.clientVersion}
            </Text>
          )}
        </Box>
      </Container>
      <DonationModal
        walletAddress={publicRuntimeConfig.walletAddress}
        modal={{ isOpen, onClose }}
      />
    </>
  );
}
