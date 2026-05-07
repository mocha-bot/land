import { type Variants, motion, useInView } from 'framer-motion';
import type { ReactNode } from 'react';
import { useRef } from 'react';

type AnimateOnViewProps = {
  children: ReactNode;
  delay?: number;
  variant?: 'fadeUp' | 'fadeIn' | 'fadeLeft' | 'fadeRight';
  duration?: number;
  className?: string;
};

const variants: Record<string, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
};

export function AnimateOnView({
  children,
  delay = 0,
  variant = 'fadeUp',
  duration = 0.6,
  className,
}: AnimateOnViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{ duration, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      style={{ width: '100%' }}>
      {children}
    </motion.div>
  );
}

type StaggerContainerProps = {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
};

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className,
}: StaggerContainerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial='hidden'
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      style={{ width: '100%' }}>
      {children}
    </motion.div>
  );
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};
