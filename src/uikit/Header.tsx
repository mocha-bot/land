import { ChevronDownIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Link,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import getConfig from 'next/config';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';

import { solutions } from '@/modules/solutions/data';
import { SolutionCard } from '@/modules/solutions/SolutionCard';

import Button from './Button';
import { Container } from './Container';

interface UserProfile {
  serial: string;
  username?: string;
  avatar_url?: string;
}

const { publicRuntimeConfig } = getConfig();

interface NavItem {
  label: string;
  subLabel?: string;
  href?: string;
  isDropdown?: boolean;
}

const menu: Array<NavItem> = [
  { label: 'features', href: '/#features' },
  { label: 'solutions', href: '/solutions', isDropdown: true },
  { label: 'discover', href: '/search' },
  { label: 'pricing', href: '/pricing' },
  { label: 'docs', href: publicRuntimeConfig.docsUrl },
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

function SolutionsDropdownMenuItem() {
  return (
    <Popover
      trigger='hover'
      placement='bottom-start'
      openDelay={50}
      closeDelay={100}>
      <PopoverTrigger>
        <Flex
          role='group'
          position='relative'
          h='full'
          alignItems='center'
          cursor='pointer'>
          <Flex
            alignItems='center'
            gap={1}
            fontSize='sm'
            fontWeight={500}
            color='white'
            opacity={0.6}
            h='full'
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
            solutions
            <ChevronDownIcon boxSize={3} />
          </Flex>
        </Flex>
      </PopoverTrigger>
      <PopoverContent
        bg='rgba(5, 10, 20, 0.95)'
        border='1px solid rgba(255, 255, 255, 0.1)'
        backdropFilter='blur(20px)'
        borderRadius='xl'
        boxShadow='0 20px 60px rgba(0,0,0,0.6)'
        w='560px'
        mt={2}
        _focus={{ outline: 'none' }}>
        <PopoverBody p={4}>
          <Flex
            justifyContent='space-between'
            alignItems='center'
            mb={3}
            px={1}>
            <Text
              color='whiteAlpha.500'
              fontSize='xs'
              textTransform='uppercase'
              letterSpacing='wider'>
              Solutions
            </Text>
            <Box
              as={NextLink}
              href='/solutions'
              color='white'
              fontSize='xs'
              fontWeight='light'
              _hover={{ textDecoration: 'underline' }}>
              View all
            </Box>
          </Flex>
          <SimpleGrid columns={2} gap={1}>
            {solutions.map((solution) => (
              <SolutionCard key={solution.slug} solution={solution} isCompact />
            ))}
          </SimpleGrid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
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
      {menuList.map((nav) =>
        nav.isDropdown ? (
          <SolutionsDropdownMenuItem key={nav.label} />
        ) : (
          <MenuItem key={nav.label} label={nav.label} href={nav.href} />
        ),
      )}
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

function ProfileButton({
  user,
  authHref,
  authLabel,
  dashboardUrl,
  apiBaseUrl,
  onLogout,
}: {
  user: UserProfile | null | undefined;
  authHref: string;
  authLabel: string;
  dashboardUrl: string;
  apiBaseUrl: string;
  onLogout: () => void;
}) {
  const handleLogout = () => {
    fetch(`${apiBaseUrl}/api/v1/auth/discord/revoke`, {
      method: 'POST',
      credentials: 'include',
    }).finally(() => {
      try {
        const ch = new BroadcastChannel('mocha-auth-logout');
        ch.postMessage({ type: 'logout' });
        ch.close();
      } catch {
        localStorage.setItem('mocha-auth-logout', String(Date.now()));
        localStorage.removeItem('mocha-auth-logout');
      }
      onLogout();
    });
  };

  if (user === undefined) {
    return <Box w={10} h={10} borderRadius='full' bg='whiteAlpha.100' />;
  }

  if (user) {
    return (
      <Popover
        trigger='hover'
        placement='bottom-end'
        openDelay={50}
        closeDelay={100}>
        <PopoverTrigger>
          <Box cursor='pointer'>
            <Avatar
              size='md'
              name={user.username}
              src={user.avatar_url}
              border='2px solid rgba(255,255,255,0.2)'
              _hover={{ border: '2px solid rgba(255,255,255,0.6)' }}
            />
          </Box>
        </PopoverTrigger>
        <PopoverContent
          bg='rgba(5, 10, 20, 0.95)'
          border='1px solid rgba(255, 255, 255, 0.1)'
          backdropFilter='blur(20px)'
          borderRadius='xl'
          boxShadow='0 20px 60px rgba(0,0,0,0.6)'
          w='180px'
          mt={2}
          _focus={{ outline: 'none' }}>
          <PopoverBody p={2}>
            <Flex direction='column' gap={1}>
              <Flex alignItems='center' gap={2} px={2} py={2}>
                <Avatar size='xs' name={user.username} src={user.avatar_url} />
                <Text
                  color='white'
                  fontSize='sm'
                  fontWeight='medium'
                  noOfLines={1}>
                  {user.username}
                </Text>
              </Flex>
              <Box h='1px' bg='whiteAlpha.100' my={1} />
              <Box
                as='a'
                href={dashboardUrl}
                px={2}
                py={1.5}
                borderRadius='md'
                color='whiteAlpha.700'
                fontSize='sm'
                _hover={{ bg: 'whiteAlpha.100', color: 'white' }}>
                Dashboard
              </Box>
              <Box
                as='button'
                onClick={handleLogout}
                px={2}
                py={1.5}
                borderRadius='md'
                color='red.300'
                fontSize='sm'
                textAlign='left'
                w='full'
                _hover={{ bg: 'whiteAlpha.100', color: 'red.200' }}>
                Sign out
              </Box>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Button as='a' variant='glass' py={5} px={6} isAnimated href={authHref}>
      {authLabel}
    </Button>
  );
}

export function Header() {
  const [isBgTransparent, setIsBgTransparent] = useState(true);
  const [user, setUser] = useState<UserProfile | null | undefined>(undefined);
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

  useEffect(() => {
    fetch(`${publicRuntimeConfig.apiBaseUrl}/api/v1/user/me`, {
      credentials: 'include',
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => setUser(json?.data ?? null))
      .catch(() => setUser(null));
  }, []);

  const isLoggedIn = !!user;
  const authHref = isLoggedIn
    ? publicRuntimeConfig.dashboardUrl
    : `${publicRuntimeConfig.ssoUrl}?redirect_to=${encodeURIComponent(
        publicRuntimeConfig.dashboardUrl,
      )}`;
  const authLabel = isLoggedIn ? 'Dashboard' : 'Sign In';

  return (
    <Box
      w='full'
      position='fixed'
      top={0}
      left={0}
      right={0}
      zIndex={15}
      style={{ willChange: 'transform' }}>
      {/* Isolated blur layer — keeps blur repaint off the content layer */}
      <Box
        position='absolute'
        inset={0}
        zIndex={-1}
        backgroundColor={isBgTransparent ? 'transparent' : 'rgba(0, 0, 0, 0.7)'}
        backdropFilter={isBgTransparent ? 'none' : 'blur(10px)'}
        transition='background-color 0.3s ease, backdrop-filter 0.3s ease'
      />
      <Container>
        <Flex py={{ base: 2 }} alignItems='center'>
          <Flex
            flex={1}
            justifyContent='space-between'
            alignItems='center'
            h={12}>
            <Link as={NextLink} href='/'>
              <NextImage
                src='/assets/images/mocha.png'
                width={238}
                height={96}
                alt='Mocha Logo'
                style={{ width: 119, height: 48 }}
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
            <Flex gap={3} alignItems='center'>
              <Button
                as='a'
                variant='glass'
                py={5}
                px={6}
                isAnimated
                href={publicRuntimeConfig.botInvitationUrl}>
                Invite to server
              </Button>
              <ProfileButton
                user={user}
                authHref={authHref}
                authLabel={authLabel}
                dashboardUrl={publicRuntimeConfig.dashboardUrl}
                apiBaseUrl={publicRuntimeConfig.apiBaseUrl}
                onLogout={() => setUser(null)}
              />
            </Flex>
          )}

          {/* Mobile Drawer */}
          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            size='full'>
            <DrawerOverlay bg='transparent' transition='all 0.7s'>
              <DrawerContent bg='#02020e'>
                <DrawerBody w='full' overflow='hidden' zIndex={10}>
                  <Flex
                    flex={1}
                    justifyContent='space-between'
                    alignItems='center'>
                    <Link as={NextLink} href='/'>
                      <NextImage
                        src='/assets/images/mocha.png'
                        width={238}
                        height={96}
                        alt='Mocha Logo'
                        style={{ width: 119, height: 48 }}
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
                    <Flex direction='column' gap={3} alignItems='center'>
                      <Button
                        as='a'
                        variant='glass'
                        py={4}
                        px={6}
                        isAnimated
                        href={publicRuntimeConfig.botInvitationUrl}>
                        Invite to server
                      </Button>
                      {isLoggedIn ? (
                        <>
                          <Button
                            as='a'
                            href={publicRuntimeConfig.dashboardUrl}
                            variant='glass-ghost'
                            py={4}
                            px={6}>
                            <Flex alignItems='center' gap={2}>
                              <Avatar
                                size='xs'
                                name={user?.username}
                                src={user?.avatar_url}
                              />
                              <Text color='white' fontSize='sm'>
                                {user?.username ?? 'Dashboard'}
                              </Text>
                            </Flex>
                          </Button>
                          <Button
                            variant='glass-ghost'
                            py={4}
                            px={6}
                            color='red.300'
                            onClick={() => {
                              fetch(
                                `${publicRuntimeConfig.apiBaseUrl}/api/v1/auth/discord/revoke`,
                                { method: 'POST', credentials: 'include' },
                              ).finally(() => setUser(null));
                            }}>
                            Sign out
                          </Button>
                        </>
                      ) : (
                        <Button
                          as='a'
                          variant='glass'
                          py={4}
                          px={6}
                          isAnimated
                          href={authHref}
                          opacity={user === undefined ? 0.5 : 1}
                          pointerEvents={user === undefined ? 'none' : 'auto'}>
                          {authLabel}
                        </Button>
                      )}
                    </Flex>
                  </Flex>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </Flex>
      </Container>
    </Box>
  );
}
