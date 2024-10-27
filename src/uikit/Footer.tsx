import {
  Box,
  Container,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import type { FooterInformation } from '@/types/Footer';

type SubTitleProps = {
  title: string;
};

function SubTitle({ title }: SubTitleProps) {
  return (
    <Text
      color='white'
      fontWeight='medium'
      fontSize='sm'
      letterSpacing='widest'
      textTransform='uppercase'>
      {title}
    </Text>
  );
}

interface FooterProps {
  informations?: FooterInformation[];
}

export function Footer({ informations }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box background='black'>
      <Container as={Stack} maxW='6xl' py={16} px={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '4fr 2fr 2fr' }}
          spacing={8}>
          <Stack
            h={{ base: 'full', md: '5xs' }}
            gap={0}
            justifyContent='space-between'>
            <Stack gap={2}>
              <Image
                src='/assets/images/mocha.png'
                width='logo.width.md'
                height='logo.height.md'
                alt='Mocha Logo'
              />
              <Box color='subtitle'>
                <Text fontSize='sm'>Your trusted bot for connecting</Text>
                <Text fontSize='sm'>multi-chat cross-server</Text>
              </Box>
            </Stack>
            {!isMobile && (
              <Text fontSize='sm' color='subtitle'>
                Copyright © 2022 - {currentYear} Mocha
              </Text>
            )}
          </Stack>
          {/* information */}
          {informations?.map((information) => (
            <Stack key={information.title} align='flex-start' gap={4}>
              <SubTitle title={information.title} />
              {information.items.map((item) => (
                <Link
                  href={item.href}
                  _hover={{ textDecoration: 'none' }}
                  key={item.title}>
                  <Text fontWeight='hairline' fontSize='sm' color='subtitle'>
                    {item.title}
                  </Text>
                </Link>
              ))}
            </Stack>
          ))}
        </SimpleGrid>
      </Container>
      {isMobile && (
        <Box w='full' px={10} py={4} textAlign='center'>
          <Text fontSize='sm' color='subtitle'>
            Copyright © 2020 - {currentYear} Mocha
          </Text>
        </Box>
      )}
    </Box>
  );
}
