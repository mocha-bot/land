import { Box, Flex } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';
import type { CSSProperties, ReactNode } from 'react';

import { informations } from '@/config/config';
import styles from '@/theme/space-bg.module.css';

import { Footer } from './Footer';
import { Header } from './Header';

const SPARKLES: {
  top: string;
  left: string;
  size: number;
  dur: string;
  delay: string;
  color: string;
}[] = [
  {
    top: '15%',
    left: '12%',
    size: 3,
    dur: '3.2s',
    delay: '0s',
    color: 'rgba(255,255,255,0.95)',
  },
  {
    top: '38%',
    left: '40%',
    size: 2,
    dur: '4.1s',
    delay: '0.8s',
    color: 'rgba(255,255,255,0.9)',
  },
  {
    top: '62%',
    left: '58%',
    size: 3,
    dur: '2.8s',
    delay: '1.5s',
    color: 'rgba(143,194,225,0.95)',
  },
  {
    top: '20%',
    left: '78%',
    size: 2,
    dur: '3.7s',
    delay: '0.4s',
    color: 'rgba(255,255,255,0.85)',
  },
  {
    top: '75%',
    left: '22%',
    size: 2,
    dur: '4.5s',
    delay: '2.1s',
    color: 'rgba(255,255,255,0.8)',
  },
  {
    top: '50%',
    left: '88%',
    size: 3,
    dur: '3.0s',
    delay: '1.2s',
    color: 'rgba(2,173,255,0.9)',
  },
  {
    top: '85%',
    left: '65%',
    size: 2,
    dur: '5.0s',
    delay: '0.6s',
    color: 'rgba(200,220,255,0.85)',
  },
  {
    top: '8%',
    left: '52%',
    size: 2,
    dur: '3.5s',
    delay: '1.9s',
    color: 'rgba(255,255,255,0.9)',
  },
  {
    top: '92%',
    left: '35%',
    size: 3,
    dur: '2.6s',
    delay: '0.2s',
    color: 'rgba(143,194,225,0.8)',
  },
  {
    top: '45%',
    left: '5%',
    size: 2,
    dur: '4.3s',
    delay: '1.7s',
    color: 'rgba(255,255,255,0.75)',
  },
];

type LayoutProps = {
  children: ReactNode;
  containerProps?: BoxProps;
};

export function Layout({ children, containerProps }: LayoutProps) {
  return (
    <Box className={styles.bg} {...containerProps}>
      {/* Planets */}
      <div className={`${styles.planet} ${styles.planetLarge}`} />
      <div className={`${styles.planet} ${styles.planetSmall}`} />
      <div className={`${styles.planet} ${styles.planetTiny}`} />

      {/* Flares */}
      <div className={`${styles.flare} ${styles.flareTopLeft}`} />
      <div className={`${styles.flare} ${styles.flareTopRight}`} />
      <div className={`${styles.flare} ${styles.flareBottomCenter}`} />

      {/* Individual sparkles */}
      {SPARKLES.map((s) => (
        <div
          key={`${s.top}-${s.left}`}
          className={styles.sparkle}
          style={
            {
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              background: s.color,
              '--dur': s.dur,
              '--delay': s.delay,
            } as CSSProperties
          }
        />
      ))}

      <Header />
      <Flex
        as='main'
        h='auto'
        zIndex={11}
        position='relative'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        gap={8}
        pt={16}>
        {children}
      </Flex>
      <Footer informations={informations} />
    </Box>
  );
}
