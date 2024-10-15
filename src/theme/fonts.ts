import { Plus_Jakarta_Sans } from 'next/font/google';

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans',
  fallback: ['sans-serif'],
});

export const fonts = {
  plusJakartaSans,
};
