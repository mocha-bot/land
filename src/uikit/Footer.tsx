import {
  Box,
  Container,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const plugins = [
  {
    title: 'Documentation',
    href: publicRuntimeConfig.docsUrl,
  },
  {
    title: 'Support Us',
    href: publicRuntimeConfig.supportUrl,
  },
];

const socials = [
  {
    title: 'Discord',
    href: publicRuntimeConfig.discordServerUrl,
  },
  {
    title: 'Github',
    href: publicRuntimeConfig.githubUrl,
  },
];

type SubTitleProps = {
  title: string;
};

function SubTitle({ title }: SubTitleProps) {
  return (
    <Text
      color='white'
      fontWeight='medium'
      fontSize='sm'
      letterSpacing={2.5}
      textTransform='uppercase'>
      {title}
    </Text>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box background='black'>
      <Container as={Stack} maxW='6xl' py='16' px='10'>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '4fr 2fr 2fr' }}
          spacing={8}>
          <Stack h='5xs' gap='0' justifyContent='space-between'>
            <Stack gap='2'>
              <Image
                src='assets/images/mocha.png'
                width='logo.width.md'
                height='logo.height.md'
                alt='Mocha Logo'
              />
              <Box color='subtitle'>
                <Text fontSize='sm'>Your trusted bot for connecting</Text>
                <Text fontSize='sm'>multi-chat cross-server</Text>
              </Box>
            </Stack>
            <Text fontSize='sm' color='subtitle'>
              Copyright © 2020 - {currentYear} Mocha
            </Text>
          </Stack>
          <Stack align='flex-start' gap='4'>
            <SubTitle title='plugin' />
            {plugins.map((plugin) => (
              <Link
                href={plugin.href}
                _hover={{ textDecoration: 'none' }}
                key={`plugin-${plugin.title}`}>
                <Text fontWeight='hairline' fontSize='sm' color='subtitle'>
                  {plugin.title}
                </Text>
              </Link>
            ))}
          </Stack>
          <Stack align='flex-start' gap='4'>
            <SubTitle title='support' />
            {socials.map((social) => (
              <Link
                href={social.href}
                _hover={{ textDecoration: 'none' }}
                key={`social-${social.title}`}>
                <Text fontWeight='hairline' fontSize='sm' color='subtitle'>
                  {social.title}
                </Text>
              </Link>
            ))}
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
