// 1. Import `extendTheme`
import { extendTheme } from '@chakra-ui/react';
import { Button } from '@theme/button';
import { Text } from '@theme/text';

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  fontSizes: {
    '3.5xl': '2rem',
    '4.5xl': '2.5rem',
    '5.5xl': '3rem',
    '6.5xl': '4rem',
  },
  radii: {
    '5.75xl': '3.5rem',
  },
  components: {
    Text,
    Button,
  },
  colors: {
    background: {
      primary: {
        base: {
          default: '#181818',
          // glassmorphism
          hover:
            'linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.10)) 0% 0% no-repeat padding-box',
          click:
            'linear-gradient(to top, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.15)) 0% 0% no-repeat padding-box',
        },
      },
    },
    radii: {
      primary: {
        base: {
          default: 'rgba(255, 255, 255, 0.25)',
          disabled: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
    font: {
      primary: {
        base: { disabled: 'rgba(255, 255, 255, 0.5)' },
      },
    },
  },
});

export { theme };
