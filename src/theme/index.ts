import { extendTheme } from '@chakra-ui/react';

import { Button } from './button';

const theme = extendTheme({
  fontSizes: {
    '10xl': '10rem',
  },
  sizes: {
    logo: {
      width: {
        base: '20px',
        md: '119px',
        lg: '209px',
        xl: '297px',
      },
      height: {
        base: '20px',
        md: '48px',
        lg: '209px',
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
  },
  colors: {
    subtitle: '#ADADAD',
    icon: {
      coin: '#FFD700',
    },
    background: {
      coffee: '#f6eee3',
      dark: 'rgba(1, 1, 1, 0.4)',
    },
  },
  letterSpacings: {
    widest: '0.625em',
  },
  lineHeights: {
    smaller: 0.75,
    small: 0.875,
  },
  fonts: {
    heading: 'var(--font-plus-jakarta-sans)',
    body: 'var(--font-plus-jakarta-sans)',
  },
  components: {
    Button,
  },
});

export { theme };
