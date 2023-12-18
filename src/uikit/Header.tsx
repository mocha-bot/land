import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

interface NavItem {
  label: string;
  subLabel?: string;
  href?: string;
}

function Menu() {
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const menuList: Array<NavItem> = [
    {
      label: 'about us',
    },
    {
      label: 'features',
    },
    {
      label: 'status',
    },
    {
      label: 'discover room',
    },
  ];
  return (
    <Stack direction='row' spacing={4} alignItems='center'>
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

export default function Header() {
  return (
    <Box>
      <Flex minH='60px' py={{ base: 2 }} px={{ base: 4 }} align='center'>
        <Flex flex={1} justifyContent='space-between' alignItems='center'>
          <Image
            src='img/mocha.png'
            width='119px'
            height='48px'
            alt='Mocha Logo'
            ml='4px'
            mr='2px'
          />
          <Menu />
          <Button
            as='a'
            color='white'
            rounded='full'
            fontSize='sm'
            fontWeight={500}
            variant='outline'
            href='#'>
            Invite to Server
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
