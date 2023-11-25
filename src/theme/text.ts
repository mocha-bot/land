import type { ComponentStyleConfig } from '@chakra-ui/react';

export const Text: ComponentStyleConfig = {
  variants: {
    regular: {
      fontSize: 'md', // 16px
      fontWeight: 'normal',
      lineHeight: 'shorter',
    },
    subtitle_1: {
      fontSize: 'lg', // 18px
      fontWeight: 'semibold',
      lineHeight: 'shorter',
    },
    subtitle_2: {
      fontSize: 'md', // 16px
      fontWeight: 'semibold',
      lineHeight: 'shorter',
    },
    button: {
      fontSize: 'sm', // 14px
      fontWeight: 'normal',
      lineHeight: 'shorter',
    },
    heading_1: {
      fontSize: '7xl', // 72px
      fontWeight: 'bold',
    },
    heading_2: {
      fontSize: '6.5xl', // 64px
      fontWeight: 'bold',
    },
    heading_3: {
      fontSize: '5.5xl', // 56px
      fontWeight: 'bold',
    },
    heading_4: {
      fontSize: '4.5xl', // 40px
      fontWeight: 'semibold',
    },
    heading_5: {
      fontSize: '4xl', // 32px
      fontWeight: 'semibold',
    },
    heading_6: {
      fontSize: '3.5xl', // 28px
      fontWeight: 'semibold',
    },
    form_label: {
      fontSize: 'sm', // 14px
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 'xs', // 12px
      fontWeight: 'normal',
    },
  },
};
