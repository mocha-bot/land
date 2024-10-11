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
        xl: '297px',
      },
      height: {
        base: '20px',
        md: '48px',
        xl: '297px',
      },
    },
    '6xs': '8rem',
    '5xs': '10rem',
    '4xs': '12rem',
    140: '35rem',
    160: '40rem',
    192: '48rem',
    280: '70rem',
    300: '75rem',
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
  lineHeights: {
    smaller: 0.75,
    small: 0.875,
  },
});

export { theme };
