import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Phase = 'idle' | 'sending' | 'traveling' | 'receiving' | 'pause';

const PA = {
  cx: 65,
  cy: 90,
  label: 'Pixel Art',
  initials: 'PA',
  c1: '#a0c4ff',
  c2: '#4a80c4',
};
const GJ = {
  cx: 315,
  cy: 90,
  label: 'Game Jam',
  initials: 'GJ',
  c1: '#b5ead7',
  c2: '#3a7a5a',
};
const ID = {
  cx: 190,
  cy: 230,
  label: 'Indie Devs',
  initials: 'ID',
  c1: '#ffd6a5',
  c2: '#b87840',
};
const NODES = [PA, GJ, ID];

const MSG = 'hey all! 👋';

export function HeroVisual() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms));
    };

    setPhase('idle');

    let offset = 600;
    t(() => setPhase('sending'), offset);

    offset += 700;
    t(() => setPhase('traveling'), offset);

    offset += 900;
    t(() => setPhase('receiving'), offset);

    offset += 2000;
    t(() => setPhase('pause'), offset);

    offset += 800;
    t(() => setLoopKey((k) => k + 1), offset);

    return () => timers.forEach(clearTimeout);
  }, [loopKey]);

  const packetsVisible =
    phase === 'sending' || phase === 'traveling' || phase === 'receiving';
  const gjReceived = phase === 'receiving' || phase === 'pause';
  const idReceived = phase === 'receiving' || phase === 'pause';
  const paSending = phase === 'sending' || phase === 'traveling';
  const linesActive =
    phase === 'traveling' || phase === 'receiving' || phase === 'pause';

  const p1 =
    phase === 'traveling' || phase === 'receiving' || phase === 'pause'
      ? { cx: GJ.cx, cy: GJ.cy }
      : { cx: PA.cx, cy: PA.cy };

  const p2 =
    phase === 'traveling' || phase === 'receiving' || phase === 'pause'
      ? { cx: ID.cx, cy: ID.cy }
      : { cx: PA.cx, cy: PA.cy };

  return (
    <Box
      display={{ base: 'none', lg: 'flex' }}
      flexShrink={0}
      w='400px'
      h='340px'
      borderRadius='24px'
      border='1px solid rgba(255,255,255,0.08)'
      background='rgba(0,0,0,0.28)'
      backdropFilter='blur(24px)'
      boxShadow='0 32px 80px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)'
      alignItems='center'
      justifyContent='center'
      overflow='hidden'
      position='relative'>
      <svg width='360' height='300' viewBox='0 0 380 300'>
        <defs>
          {NODES.map((n) => (
            <linearGradient
              key={n.initials}
              id={`hv-${n.initials}`}
              x1='0'
              y1='0'
              x2='1'
              y2='1'>
              <stop offset='0%' stopColor={n.c1} />
              <stop offset='100%' stopColor={n.c2} />
            </linearGradient>
          ))}
          <filter id='hv-glow' x='-50%' y='-50%' width='200%' height='200%'>
            <feGaussianBlur stdDeviation='5' result='blur' />
            <feMerge>
              <feMergeNode in='blur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
          <filter id='hv-softglow' x='-80%' y='-80%' width='260%' height='260%'>
            <feGaussianBlur stdDeviation='10' result='blur' />
            <feMerge>
              <feMergeNode in='blur' />
              <feMergeNode in='SourceGraphic' />
            </feMerge>
          </filter>
        </defs>

        {/* Soft bg glow on PA when sending */}
        {paSending && (
          <circle cx={PA.cx} cy={PA.cy} r='52' fill='rgba(255,220,0,0.06)' />
        )}
        {gjReceived && (
          <circle cx={GJ.cx} cy={GJ.cy} r='52' fill='rgba(100,220,140,0.06)' />
        )}
        {idReceived && (
          <circle cx={ID.cx} cy={ID.cy} r='52' fill='rgba(255,200,120,0.06)' />
        )}

        {/* Connection lines */}
        <line
          x1={PA.cx}
          y1={PA.cy}
          x2={GJ.cx}
          y2={GJ.cy}
          stroke={
            linesActive ? 'rgba(255,220,0,0.45)' : 'rgba(255,255,255,0.07)'
          }
          strokeWidth='1.5'
          strokeDasharray='6 5'
          style={{ transition: 'stroke 0.4s ease' }}
        />
        <line
          x1={PA.cx}
          y1={PA.cy}
          x2={ID.cx}
          y2={ID.cy}
          stroke={
            linesActive ? 'rgba(255,220,0,0.45)' : 'rgba(255,255,255,0.07)'
          }
          strokeWidth='1.5'
          strokeDasharray='6 5'
          style={{ transition: 'stroke 0.4s ease' }}
        />
        <line
          x1={GJ.cx}
          y1={GJ.cy}
          x2={ID.cx}
          y2={ID.cy}
          stroke='rgba(255,255,255,0.04)'
          strokeWidth='1'
          strokeDasharray='4 6'
        />

        {/* Bridged room label */}
        <text
          x='190'
          y='40'
          textAnchor='middle'
          fill='rgba(255,220,0,0.5)'
          fontSize='10'
          fontFamily='monospace'>
          🔗 coding-dev
        </text>

        {/* Pulse rings on receive */}
        {phase === 'receiving' && (
          <>
            <motion.circle
              key={`ring-gj-${loopKey}`}
              cx={GJ.cx}
              cy={GJ.cy}
              fill='none'
              stroke='rgba(100,220,140,0.5)'
              strokeWidth='2'
              initial={{ r: 28, opacity: 0.9 }}
              animate={{ r: 48, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <motion.circle
              key={`ring-id-${loopKey}`}
              cx={ID.cx}
              cy={ID.cy}
              fill='none'
              stroke='rgba(255,200,120,0.5)'
              strokeWidth='2'
              initial={{ r: 28, opacity: 0.9 }}
              animate={{ r: 48, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.05 }}
            />
          </>
        )}
        {phase === 'sending' && (
          <motion.circle
            key={`ring-pa-${loopKey}`}
            cx={PA.cx}
            cy={PA.cy}
            fill='none'
            stroke='rgba(255,220,0,0.55)'
            strokeWidth='2'
            initial={{ r: 28, opacity: 0.9 }}
            animate={{ r: 48, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        )}

        {/* Server nodes */}
        {NODES.map((n) => (
          <g key={n.initials}>
            <circle
              cx={n.cx}
              cy={n.cy}
              r='27'
              fill={`url(#hv-${n.initials})`}
            />
            <text
              x={n.cx}
              y={n.cy + 5}
              textAnchor='middle'
              fill='white'
              fontWeight='700'
              fontSize='12'
              fontFamily='system-ui,sans-serif'>
              {n.initials}
            </text>
            <text
              x={n.cx}
              y={n.cy + 46}
              textAnchor='middle'
              fill='rgba(255,255,255,0.35)'
              fontSize='10'
              fontFamily='system-ui,sans-serif'>
              {n.label}
            </text>
            {/* Notif dot */}
            {((n === GJ && gjReceived) || (n === ID && idReceived)) && (
              <motion.circle
                key={`dot-${n.initials}-${loopKey}`}
                cx={n.cx + 20}
                cy={n.cy - 16}
                r='6'
                fill='#ef4444'
                stroke='rgba(0,0,0,0.6)'
                strokeWidth='1.5'
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                // @ts-expect-error framer svg
                style={{ originX: `${n.cx + 20}px`, originY: `${n.cy - 16}px` }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              />
            )}
          </g>
        ))}

        {/* Traveling message packets */}
        {packetsVisible && (
          <>
            <motion.circle
              key={`p1-${loopKey}`}
              r={8}
              fill='rgba(255,220,0,0.95)'
              filter='url(#hv-glow)'
              initial={{ cx: PA.cx, cy: PA.cy, scale: 0, opacity: 0 }}
              animate={{ cx: p1.cx, cy: p1.cy, scale: 1, opacity: 1 }}
              transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.circle
              key={`p2-${loopKey}`}
              r={8}
              fill='rgba(255,220,0,0.95)'
              filter='url(#hv-glow)'
              initial={{ cx: PA.cx, cy: PA.cy, scale: 0, opacity: 0 }}
              animate={{ cx: p2.cx, cy: p2.cy, scale: 1, opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
            />
          </>
        )}

        {/* Message bubbles */}
        {/* PA sends */}
        {(phase === 'sending' || phase === 'traveling') && (
          <motion.g
            key={`bubble-pa-${loopKey}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            // @ts-expect-error framer svg
            transition={{ duration: 0.25 }}>
            <rect
              x='88'
              y='58'
              width='96'
              height='22'
              rx='6'
              fill='rgba(255,220,0,0.15)'
              stroke='rgba(255,220,0,0.3)'
              strokeWidth='1'
            />
            <text
              x='136'
              y='73'
              textAnchor='middle'
              fill='rgba(255,255,255,0.85)'
              fontSize='10'
              fontFamily='system-ui,sans-serif'>
              {MSG}
            </text>
          </motion.g>
        )}
        {/* GJ receives */}
        {(phase === 'receiving' || phase === 'pause') && (
          <motion.g
            key={`bubble-gj-${loopKey}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            // @ts-expect-error framer svg
            transition={{ duration: 0.3 }}>
            <rect
              x='218'
              y='58'
              width='96'
              height='22'
              rx='6'
              fill='rgba(100,220,140,0.12)'
              stroke='rgba(100,220,140,0.25)'
              strokeWidth='1'
            />
            <text
              x='266'
              y='73'
              textAnchor='middle'
              fill='rgba(255,255,255,0.75)'
              fontSize='10'
              fontFamily='system-ui,sans-serif'>
              {MSG}
            </text>
          </motion.g>
        )}
        {/* ID receives */}
        {(phase === 'receiving' || phase === 'pause') && (
          <motion.g
            key={`bubble-id-${loopKey}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            // @ts-expect-error framer svg
            transition={{ duration: 0.3, delay: 0.05 }}>
            <rect
              x='215'
              y='196'
              width='96'
              height='22'
              rx='6'
              fill='rgba(255,200,120,0.12)'
              stroke='rgba(255,200,120,0.25)'
              strokeWidth='1'
            />
            <text
              x='263'
              y='211'
              textAnchor='middle'
              fill='rgba(255,255,255,0.75)'
              fontSize='10'
              fontFamily='system-ui,sans-serif'>
              {MSG}
            </text>
          </motion.g>
        )}
      </svg>
    </Box>
  );
}
