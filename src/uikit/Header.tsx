import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface NavItem {
  label: string;
  subLabel?: string;
  href?: string;
}

const menuList: Array<NavItem> = [
  { label: 'about us' },
  { label: 'features' },
  { label: 'status' },
  { label: 'discover room' },
];

function Menu({ isOpen }: { isOpen: boolean }) {
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing={4}
      alignItems={{ base: 'center', md: 'center' }}
      display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}>
      {menuList.map((nav) => (
        <Box key={nav.label}>
          <Box
            as='a'
            p={2}
            href={nav.href ?? '#'}
            fontSize='sm'
            fontWeight={500}
            color='white'
            opacity={0.6}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}>
            {nav.label}
          </Box>
        </Box>
      ))}
    </Stack>
  );
}

function InviteButton() {
  return (
    <Button
      as='a'
      color='white'
      rounded='full'
      fontSize='sm'
      variant='outline'
      href={publicRuntimeConfig.botInvitationUrl}
      display='inline-flex'>
      Invite to Server
    </Button>
  );
}

type MobileMenuButtonProps = {
  isOpen: boolean;
  onToggle: () => void;
};

function MobileMenuButton({ isOpen, onToggle }: MobileMenuButtonProps) {
  return (
    <Flex display={{ base: 'flex', lg: 'none' }}>
      <IconButton
        onClick={onToggle}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        variant='ghost'
        aria-label='Toggle Navigation'
        color='white'
      />
    </Flex>
  );
}

export default function Header() {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const [isMobile] = useMediaQuery('(max-width: 425px)');
  const [isTablet] = useMediaQuery(
    '(min-width: 425px) and (max-width: 1023px)',
  );
  const [isDesktop] = useMediaQuery('(min-width: 1024px)');

  return (
    <Container as={Stack} maxW={{ base: 'xl', md: '6xl' }}>
      <Flex
        minH='60px'
        py={{ base: 2 }}
        px={{ base: 0, md: 4 }}
        alignItems='center'>
        <Flex flex={1} justifyContent='space-between' alignItems='center'>
          <Image
            src='assets/images/mocha.png'
            width='119px'
            height='48px'
            alt='Mocha Logo'
            ml='4px'
            mr='2px'
          />

          {/* Mobile Hamburger Menu */}
          {(isMobile || isTablet) && (
            <MobileMenuButton isOpen={isOpen} onToggle={onToggle} />
          )}

          {/* Menu for larger screens */}
          {isDesktop && (
            <Flex
              flex={{ base: 1, md: 'auto' }}
              justify={{ base: 'center', md: 'center' }}
              alignItems='center'
              ml={{ base: 0, md: 4 }}
              display={{ base: 'none', md: 'flex' }}>
              <Menu isOpen={isOpen} />
            </Flex>
          )}
        </Flex>

        {isDesktop && <InviteButton />}

        {/* Mobile Drawer */}
        <Drawer
          isOpen={isOpen}
          placement='bottom'
          onClose={onClose}
          size='full'>
          <DrawerOverlay backdropFilter='blur(10px)'>
            <DrawerContent bg='rgba(0, 0, 0, 0.75)'>
              <DrawerBody w='full' overflow='hidden' zIndex={10}>
                <Flex
                  flex={1}
                  justifyContent='space-between'
                  alignItems='center'>
                  <Image
                    src='assets/images/mocha.png'
                    width='119px'
                    height='48px'
                    alt='Mocha Logo'
                    ml='4px'
                    mr='2px'
                  />

                  <MobileMenuButton isOpen={isOpen} onToggle={onToggle} />
                </Flex>

                <Flex
                  direction='column'
                  h='100%'
                  justifyContent='center'
                  alignItems='center'>
                  <Flex direction='column' alignItems='center'>
                    {menuList.map((nav) => (
                      <Box key={nav.label} mb={6}>
                        <Text
                          as='a'
                          href={nav.href ?? '#'}
                          fontSize='lg'
                          fontWeight='hairline'
                          color='white'
                          _hover={{
                            textDecoration: 'none',
                            color: 'white',
                          }}>
                          {nav.label}
                        </Text>
                      </Box>
                    ))}
                  </Flex>
                  <InviteButton />
                </Flex>
              </DrawerBody>
              {/* Flare bottom */}
              <Image
                src='assets/images/flare_3.svg'
                alt='flare'
                w='full'
                position='absolute'
                bottom={{ base: '-105', md: '-255' }}
                zIndex={3}
              />
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Flex>
    </Container>
  );
}
