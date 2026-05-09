import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

type Phase =
  | 'idle'
  | 'sending'
  | 'traveling'
  | 'receiving'
  | 'pause'
  | 'replying'
  | 'reply-traveling'
  | 'reply-receiving'
  | 'reply-pause';

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
const REPLY = 'nice! 🎉';

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

    // ── PA sends ───────────────────────────────────────────────────────────────
    t(() => setPhase('sending'), offset);
    offset += 700;
    t(() => setPhase('traveling'), offset);
    offset += 900;
    t(() => setPhase('receiving'), offset);
    offset += 1000;
    t(() => setPhase('pause'), offset);
    offset += 600;

    // ── GJ replies ─────────────────────────────────────────────────────────────
    t(() => setPhase('replying'), offset);
    offset += 700;
    t(() => setPhase('reply-traveling'), offset);
    offset += 900;
    t(() => setPhase('reply-receiving'), offset);
    offset += 1800;
    t(() => setPhase('reply-pause'), offset);
    offset += 600;

    t(() => setLoopKey((k) => k + 1), offset);

    return () => timers.forEach(clearTimeout);
  }, [loopKey]);

  // ── Derived booleans ──────────────────────────────────────────────────────────
  const paSending = phase === 'sending' || phase === 'traveling';
  const gjSending = phase === 'replying' || phase === 'reply-traveling';
  const gjReceived = phase === 'receiving' || phase === 'pause';
  const idReceived =
    phase === 'receiving' ||
    phase === 'pause' ||
    phase === 'replying' ||
    phase === 'reply-traveling';
  const paReplied = phase === 'reply-receiving' || phase === 'reply-pause';
  const idReplied = phase === 'reply-receiving' || phase === 'reply-pause';

  const linesActive =
    phase === 'traveling' ||
    phase === 'receiving' ||
    phase === 'pause' ||
    phase === 'replying';
  const replyLines =
    phase === 'reply-traveling' ||
    phase === 'reply-receiving' ||
    phase === 'reply-pause';

  const pajaGjLine = linesActive || replyLines;
  const paIdLine =
    phase === 'traveling' || phase === 'receiving' || phase === 'pause';
  const gjIdLine =
    phase === 'reply-traveling' ||
    phase === 'reply-receiving' ||
    phase === 'reply-pause';

  // Outbound packets (PA → GJ, PA → ID)
  const packetsVisible =
    phase === 'sending' || phase === 'traveling' || phase === 'receiving';
  const p1 =
    phase === 'traveling' ||
    phase === 'receiving' ||
    phase === 'pause' ||
    phase === 'replying' ||
    phase === 'reply-traveling' ||
    phase === 'reply-receiving' ||
    phase === 'reply-pause'
      ? { cx: GJ.cx, cy: GJ.cy }
      : { cx: PA.cx, cy: PA.cy };
  const p2 =
    phase === 'traveling' ||
    phase === 'receiving' ||
    phase === 'pause' ||
    phase === 'replying' ||
    phase === 'reply-traveling' ||
    phase === 'reply-receiving' ||
    phase === 'reply-pause'
      ? { cx: ID.cx, cy: ID.cy }
      : { cx: PA.cx, cy: PA.cy };

  // Reply packets (GJ → PA, GJ → ID)
  const replyPackets =
    phase === 'replying' ||
    phase === 'reply-traveling' ||
    phase === 'reply-receiving';
  const rp1 =
    phase === 'reply-traveling' ||
    phase === 'reply-receiving' ||
    phase === 'reply-pause'
      ? { cx: PA.cx, cy: PA.cy }
      : { cx: GJ.cx, cy: GJ.cy };
  const rp2 =
    phase === 'reply-traveling' ||
    phase === 'reply-receiving' ||
    phase === 'reply-pause'
      ? { cx: ID.cx, cy: ID.cy }
      : { cx: GJ.cx, cy: GJ.cy };

  return (
    <Box
      display={{ base: 'none', lg: 'flex' }}
      flexShrink={0}
      w='400px'
      h='340px'
      borderRadius='24px'
      border='1px solid rgba(255,255,255,0.13)'
      background='rgba(255,255,255,0.04)'
      backdropFilter='blur(32px) saturate(160%)'
      boxShadow='inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.15), 0 40px 100px rgba(0,0,0,0.5)'
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
        </defs>

        {/* Soft bg glows */}
        {paSending && (
          <circle cx={PA.cx} cy={PA.cy} r='52' fill='rgba(255,220,0,0.06)' />
        )}
        {gjSending && (
          <circle cx={GJ.cx} cy={GJ.cy} r='52' fill='rgba(100,220,140,0.07)' />
        )}
        {gjReceived && (
          <circle cx={GJ.cx} cy={GJ.cy} r='52' fill='rgba(100,220,140,0.05)' />
        )}
        {idReceived && (
          <circle cx={ID.cx} cy={ID.cy} r='52' fill='rgba(255,200,120,0.05)' />
        )}
        {paReplied && (
          <circle cx={PA.cx} cy={PA.cy} r='52' fill='rgba(100,220,140,0.05)' />
        )}

        {/* Connection lines */}
        <line
          x1={PA.cx}
          y1={PA.cy}
          x2={GJ.cx}
          y2={GJ.cy}
          stroke={
            pajaGjLine ? 'rgba(255,220,0,0.45)' : 'rgba(255,255,255,0.07)'
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
          stroke={paIdLine ? 'rgba(255,220,0,0.45)' : 'rgba(255,255,255,0.07)'}
          strokeWidth='1.5'
          strokeDasharray='6 5'
          style={{ transition: 'stroke 0.4s ease' }}
        />
        <line
          x1={GJ.cx}
          y1={GJ.cy}
          x2={ID.cx}
          y2={ID.cy}
          stroke={gjIdLine ? 'rgba(100,220,140,0.4)' : 'rgba(255,255,255,0.04)'}
          strokeWidth='1.5'
          strokeDasharray='6 5'
          style={{ transition: 'stroke 0.4s ease' }}
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

        {/* Pulse rings */}
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
        {phase === 'replying' && (
          <motion.circle
            key={`ring-gj-reply-${loopKey}`}
            cx={GJ.cx}
            cy={GJ.cy}
            fill='none'
            stroke='rgba(100,220,140,0.55)'
            strokeWidth='2'
            initial={{ r: 28, opacity: 0.9 }}
            animate={{ r: 48, opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        )}
        {phase === 'reply-receiving' && (
          <>
            <motion.circle
              key={`ring-pa-reply-${loopKey}`}
              cx={PA.cx}
              cy={PA.cy}
              fill='none'
              stroke='rgba(100,220,140,0.5)'
              strokeWidth='2'
              initial={{ r: 28, opacity: 0.9 }}
              animate={{ r: 48, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <motion.circle
              key={`ring-id-reply-${loopKey}`}
              cx={ID.cx}
              cy={ID.cy}
              fill='none'
              stroke='rgba(100,220,140,0.5)'
              strokeWidth='2'
              initial={{ r: 28, opacity: 0.9 }}
              animate={{ r: 48, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.05 }}
            />
          </>
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
            {/* Notif dots */}
            {((n === GJ && gjReceived) ||
              (n === ID && idReceived) ||
              (n === PA && paReplied) ||
              (n === ID && idReplied)) && (
              <motion.circle
                key={`dot-${n.initials}-${
                  n === PA ? 'reply' : 'recv'
                }-${loopKey}`}
                cx={n.cx + 20}
                cy={n.cy - 16}
                r='6'
                fill='#ef4444'
                stroke='rgba(0,0,0,0.6)'
                strokeWidth='1.5'
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              />
            )}
          </g>
        ))}

        {/* Outbound packets PA → GJ, PA → ID */}
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

        {/* Reply packets GJ → PA, GJ → ID */}
        {replyPackets && (
          <>
            <motion.circle
              key={`rp1-${loopKey}`}
              r={8}
              fill='rgba(100,220,140,0.95)'
              filter='url(#hv-glow)'
              initial={{ cx: GJ.cx, cy: GJ.cy, scale: 0, opacity: 0 }}
              animate={{ cx: rp1.cx, cy: rp1.cy, scale: 1, opacity: 1 }}
              transition={{ duration: 0.75, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.circle
              key={`rp2-${loopKey}`}
              r={8}
              fill='rgba(100,220,140,0.95)'
              filter='url(#hv-glow)'
              initial={{ cx: GJ.cx, cy: GJ.cy, scale: 0, opacity: 0 }}
              animate={{ cx: rp2.cx, cy: rp2.cy, scale: 1, opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
            />
          </>
        )}

        {/* Message bubbles */}
        {(phase === 'sending' || phase === 'traveling') && (
          <motion.g
            key={`bubble-pa-send-${loopKey}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
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
        {(phase === 'receiving' ||
          phase === 'pause' ||
          phase === 'replying') && (
          <motion.g
            key={`bubble-gj-recv-${loopKey}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
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
        {(phase === 'receiving' ||
          phase === 'pause' ||
          phase === 'replying' ||
          phase === 'reply-traveling') && (
          <motion.g
            key={`bubble-id-recv-${loopKey}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
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
        {(phase === 'replying' || phase === 'reply-traveling') && (
          <motion.g
            key={`bubble-gj-reply-${loopKey}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}>
            <rect
              x='218'
              y='112'
              width='80'
              height='22'
              rx='6'
              fill='rgba(100,220,140,0.18)'
              stroke='rgba(100,220,140,0.4)'
              strokeWidth='1'
            />
            <text
              x='258'
              y='127'
              textAnchor='middle'
              fill='rgba(255,255,255,0.9)'
              fontSize='10'
              fontFamily='system-ui,sans-serif'>
              {REPLY}
            </text>
          </motion.g>
        )}
        {(phase === 'reply-receiving' || phase === 'reply-pause') && (
          <>
            <motion.g
              key={`bubble-pa-reply-${loopKey}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}>
              <rect
                x='88'
                y='112'
                width='80'
                height='22'
                rx='6'
                fill='rgba(100,220,140,0.12)'
                stroke='rgba(100,220,140,0.25)'
                strokeWidth='1'
              />
              <text
                x='128'
                y='127'
                textAnchor='middle'
                fill='rgba(255,255,255,0.75)'
                fontSize='10'
                fontFamily='system-ui,sans-serif'>
                {REPLY}
              </text>
            </motion.g>
            <motion.g
              key={`bubble-id-reply-${loopKey}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}>
              <rect
                x='215'
                y='250'
                width='80'
                height='22'
                rx='6'
                fill='rgba(100,220,140,0.12)'
                stroke='rgba(100,220,140,0.25)'
                strokeWidth='1'
              />
              <text
                x='255'
                y='265'
                textAnchor='middle'
                fill='rgba(255,255,255,0.75)'
                fontSize='10'
                fontFamily='system-ui,sans-serif'>
                {REPLY}
              </text>
            </motion.g>
          </>
        )}
      </svg>
    </Box>
  );
}
