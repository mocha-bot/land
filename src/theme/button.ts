import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const primary = defineStyle({
  color: 'white',
  background: 'background.primary.base.default',
  borderRadius: '5.75xl',
  borderColor: 'radii.primary.base.default',
  borderWidth: '3px',
  backdropFilter: 'blur(5px)',
  px: '8',
  _disabled: {
    fontcolor: 'font.primary.base.disabled',
    borderColor: 'radii.primary.base.disabled',
  },
  _hover: {
    background: 'background.primary.base.hover',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-in-out',
  },
  _active: {
    background: 'background.primary.base.click',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-in-out',
  },
});

const link = defineStyle({
  color: 'rgba(255, 255, 255, 0.6)',
  _hover: {
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-in-out',
    textDecoration: 'none',
    border: 'none',
    boxShadow: '0px 20px 20px 0 rgba(255,255,255,0.50)',
  },
  _active: {
    color: 'white',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-in-out',
    boxShadow: '0px 20px 20px 0 rgba(255,255,255,0.50)',
  },
});

export const Button = defineStyleConfig({
  variants: {
    primary,
    link,
  },
});
