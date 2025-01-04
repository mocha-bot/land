import { defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyleConfig({
  variants: {
    glass: {
      whiteSpace: 'nowrap',
      color: 'white',
      rounded: 56,
      opacity: 0.8,
      fontSize: 'sm',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      borderWidth: 3,
      borderColor: 'rgba(255, 255, 255, 0.2)',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      bgClip: 'padding-box',
      _focus: {
        boxShadow: 'none',
      },
      _active: {
        opacity: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderColor: 'rgba(255, 255, 255, 0.25)',
      },
      _hover: {
        opacity: 1,
        overflow: 'hidden',
        borderColor: 'rgba(255, 255, 255, 0.4)',
        transition: 'opacity 0.3s ease-in-out',
      },
    },
    'glass-ghost': {
      whiteSpace: 'nowrap',
      color: 'white',
      opacity: 0.8,
      fontSize: 'sm',
      _focus: {
        boxShadow: 'none',
      },
      _active: {
        opacity: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderColor: 'rgba(255, 255, 255, 0.25)',
      },
      _hover: {
        opacity: 1,
        overflow: 'hidden',
        bgClip: 'padding-box',
        borderColor: 'rgba(255, 255, 255, 0.25)',
        transition: 'opacity 0.3s ease-in-out',
      },
    },
  },
});

export { Button };
