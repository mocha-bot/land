import { Button, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

type NavigationLinkProps = {
  href: string;
  name: string;
};

function NavigationLink({ href, name }: NavigationLinkProps) {
  return (
    <Link href={href}>
      <Button variant='link'>
        <Text variant='button'>{name}</Text>
      </Button>
    </Link>
  );
}

export { NavigationLink };
