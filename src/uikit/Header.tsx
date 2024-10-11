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
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

interface NavItem {
  label: string;
  subLabel?: string;
  href?: string;
}

const menuList: Array<NavItem> = [
  { label: 'about us', href: '/#' },
  { label: 'features', href: '/#features' },
  { label: 'status', href: '/#status' },
  { label: 'discover room', href: '/#' },
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

  const isMobile = useBreakpointValue({ base: true, md: false, lg: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
  const isDesktop = useBreakpointValue({ base: false, md: false, lg: true });

  return (
    <Container as={Stack} maxW={{ base: 'xl', md: '6xl' }}>
      <Flex py={{ base: 2 }} px={{ base: 0, md: 4 }} alignItems='center'>
        <Flex flex={1} justifyContent='space-between' alignItems='center'>
          <Image
            src='/assets/images/mocha.png'
            width='logo.width.md'
            height='logo.height.md'
            alt='Mocha Logo'
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
          <DrawerOverlay backdropFilter='blur(10px)' transition='all 0.7s'>
            <DrawerContent bg='rgba(0, 0, 0, 0.75)'>
              <DrawerBody w='full' overflow='hidden' zIndex={10}>
                <Flex
                  flex={1}
                  justifyContent='space-between'
                  alignItems='center'>
                  <Image
                    src='/assets/images/mocha.png'
                    width='logo.width.md'
                    height='logo.height.md'
                    alt='Mocha Logo'
                  />

                  <MobileMenuButton isOpen={isOpen} onToggle={onToggle} />
                </Flex>

                <Flex
                  direction='column'
                  h='full'
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
                          onClick={onClose}
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
                src='/assets/images/flare_3.svg'
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
