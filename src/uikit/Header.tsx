import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Link,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import getConfig from 'next/config';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

import Button from './Button';

const { publicRuntimeConfig } = getConfig();

interface NavItem {
  label: string;
  subLabel?: string;
  href?: string;
}

const menu: Array<NavItem> = [
  { label: 'about us', href: '/#' },
  { label: 'features', href: '/#features' },
  { label: 'status', href: '/#status' },
  { label: 'discover room', href: '/#' },
];

interface MenuProps {
  menuList: Array<NavItem>;
  isOpen: boolean;
}

function MenuItem({ label, href }: NavItem) {
  return (
    <Flex
      key={label}
      role='group'
      position='relative'
      h='full'
      alignItems='center'>
      <Box
        as='a'
        href={href ?? '#'}
        fontSize='sm'
        fontWeight={500}
        color='white'
        opacity={0.6}
        h='full'
        w='full'
        display='flex'
        alignItems='center'
        px={4}
        position='relative'
        zIndex={11}
        _hover={{
          textDecoration: 'none',
          color: 'white',
          opacity: 1,
          bg: 'radial-gradient(circle at bottom, rgba(255, 255, 255, 0.2), transparent 60%)',
          transition: 'all 0.3s ease-in-out',
        }}>
        {label}
      </Box>
    </Flex>
  );
}

function Menu({ menuList, isOpen }: MenuProps) {
  return (
    <Stack
      h='full'
      direction={{ base: 'column', md: 'row' }}
      spacing={0}
      alignItems='stretch'
      display={{ base: isOpen ? 'flex' : 'none', md: 'flex' }}
      zIndex={10}>
      {menuList.map((nav) => (
        <MenuItem key={nav.label} label={nav.label} href={nav.href} />
      ))}
    </Stack>
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

const OFFSET_TOP_SCROLL = 50;

export function Header() {
  const [isBgTransparent, setIsBgTransparent] = useState(true);
  const { isOpen, onToggle, onClose } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false, lg: false });
  const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
  const isDesktop = useBreakpointValue({ base: false, md: false, lg: true });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        setIsBgTransparent(window.pageYOffset < OFFSET_TOP_SCROLL);
      };

      window.addEventListener('scroll', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <Box
      w='full'
      position='fixed'
      top={0}
      left={0}
      right={0}
      zIndex={15}
      backgroundColor={isBgTransparent ? 'transparent' : 'rgba(0, 0, 0, 0.7)'}
      backdropFilter={isBgTransparent ? 'none' : 'blur(10px)'}
      transition='0.3s ease'>
      <Container as={Stack} maxW={{ base: 'xl', md: '6xl' }} h='full'>
        <Flex py={{ base: 2 }} px={{ base: 0, md: 4 }} alignItems='center'>
          <Flex
            flex={1}
            justifyContent='space-between'
            alignItems='center'
            h={12}>
            <Link as={NextLink} href='/'>
              <Image
                src='/assets/images/mocha.png'
                width='logo.width.md'
                height='logo.height.md'
                alt='Mocha Logo'
              />
            </Link>

            {/* Mobile Hamburger Menu */}
            {(isMobile || isTablet) && (
              <MobileMenuButton isOpen={isOpen} onToggle={onToggle} />
            )}

            {/* Menu for larger screens */}
            {isDesktop && (
              <Flex
                h='full'
                flex={{ base: 1, md: 'auto' }}
                justify={{ base: 'center', md: 'center' }}
                alignItems='stretch'
                display={{ base: 'none', md: 'flex' }}>
                <Menu menuList={menu} isOpen={isOpen} />
              </Flex>
            )}
          </Flex>

          {isDesktop && (
            <Button
              as='a'
              variant='glass'
              py={5}
              px={6}
              isAnimated
              href={publicRuntimeConfig.botInvitationUrl}>
              Invite to server
            </Button>
          )}

          {/* Mobile Drawer */}
          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size='full'>
            <DrawerOverlay backdropFilter='blur(10px)' transition='all 0.7s'>
              <DrawerContent bg='rgba(0, 0, 0, 0.5)'>
                <DrawerBody w='full' overflow='hidden' zIndex={10}>
                  <Flex
                    flex={1}
                    justifyContent='space-between'
                    alignItems='center'>
                    <Link as={NextLink} href='/'>
                      <Image
                        src='/assets/images/mocha.png'
                        width='logo.width.md'
                        height='logo.height.md'
                        alt='Mocha Logo'
                      />
                    </Link>

                    <MobileMenuButton isOpen={isOpen} onToggle={onToggle} />
                  </Flex>

                  <Flex
                    direction='column'
                    h='full'
                    justifyContent='center'
                    alignItems='center'>
                    <Flex direction='column' alignItems='center'>
                      {menu.map((nav) => (
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
                    <Button
                      as='a'
                      variant='glass'
                      py={4}
                      px={6}
                      isAnimated
                      href={publicRuntimeConfig.botInvitationUrl}>
                      Invite to server
                    </Button>
                  </Flex>
                </DrawerBody>
                {/* Flare bottom */}
                <Image
                  src='/assets/images/flare_3.svg'
                  alt='flare'
                  w='full'
                  position='absolute'
                  bottom={0}
                />
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Flex>
      </Container>
    </Box>
  );
}
