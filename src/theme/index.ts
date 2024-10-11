import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fontSizes: {
    '10xl': '10rem',
  },
  sizes: {
    logo: {
      width: {
        base: '20px',
        md: '119px',
      },
      height: {
        base: '20px',
        md: '48px',
      },
    },
    '6xs': '8rem',
    '5xs': '10rem',
    '4xs': '12rem',
  },
  colors: {
    subtitle: '#ADADAD',
    icon: {
      coin: '#FFD700',
    },
    background: {
      coffee: '#f6eee3',
    },
  },
  letterSpacings: {
    widest: '0.625em',
  },
});

export { theme };
