import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const TEXT_PRIMARY = 'white';
const TEXT_SECONDARY = 'whiteAlpha.600';
const TEXT_MUTED = 'whiteAlpha.300';
const BORDER = 'rgba(255, 255, 255, 0.08)';
const BORDER_MID = 'rgba(255, 255, 255, 0.12)';
const BG_SIDEBAR = 'rgba(0, 0, 0, 0.55)';
const BG_MAIN = 'rgba(0, 0, 0, 0.3)';
const BG_TOOLBAR = 'rgba(0, 0, 0, 0.5)';

type Phase = 'idle' | 'starting' | 'shuffling' | 'paired' | 'pause';

type User = {
  id: string;
  name: string;
  tag: string;
  avatarBg: string;
  initial: string;
};

type Pair = [User, User];

const USERS: User[] = [
  {
    id: 'a',
    name: 'alex',
    tag: '#2847',
    avatarBg: 'linear-gradient(135deg,#a0c4ff,#4a80c4)',
    initial: 'A',
  },
  {
    id: 'b',
    name: 'sam',
    tag: '#9103',
    avatarBg: 'linear-gradient(135deg,#b5ead7,#3a7a5a)',
    initial: 'S',
  },
  {
    id: 'c',
    name: 'jordan',
    tag: '#4421',
    avatarBg: 'linear-gradient(135deg,#ffd6a5,#b87840)',
    initial: 'J',
  },
  {
    id: 'd',
    name: 'riley',
    tag: '#7762',
    avatarBg: 'linear-gradient(135deg,#ffb3c1,#b84060)',
    initial: 'R',
  },
  {
    id: 'e',
    name: 'morgan',
    tag: '#1539',
    avatarBg: 'linear-gradient(135deg,#d4a5f5,#7c3ab8)',
    initial: 'M',
  },
  {
    id: 'f',
    name: 'casey',
    tag: '#6614',
    avatarBg: 'linear-gradient(135deg,#ffe082,#b8860b)',
    initial: 'C',
  },
];

const PAIRS: Pair[] = [
  [USERS[0], USERS[1]],
  [USERS[2], USERS[3]],
  [USERS[4], USERS[5]],
];

function Avatar({ user, size = 28 }: { user: User; size?: number }) {
  return (
    <Flex
      w={`${size}px`}
      h={`${size}px`}
      borderRadius='full'
      background={user.avatarBg}
      flexShrink={0}
      fontWeight={700}
      fontSize={`${Math.round(size * 0.43)}px`}
      color='white'
      align='center'
      justify='center'>
      {user.initial}
    </Flex>
  );
}

function UserRow({
  user,
  index,
  phase,
  loopKey,
}: {
  user: User;
  index: number;
  phase: Phase;
  loopKey: number;
}) {
  const shuffling = phase === 'shuffling';
  return (
    <Flex
      key={`${user.id}-${loopKey}`}
      align='center'
      gap='10px'
      px='14px'
      py='7px'
      borderRadius='8px'
      sx={
        shuffling
          ? {
              '@keyframes shake': {
                '0%': { transform: 'translateX(0)' },
                '20%': { transform: 'translateX(-4px)' },
                '40%': { transform: 'translateX(4px)' },
                '60%': { transform: 'translateX(-3px)' },
                '80%': { transform: 'translateX(3px)' },
                '100%': { transform: 'translateX(0)' },
              },
              animation: `shake 0.5s ${index * 0.07}s ease-in-out`,
            }
          : {}
      }>
      <Avatar user={user} />
      <Box flex={1} minW={0}>
        <Text
          fontSize='12px'
          fontWeight={500}
          color={TEXT_PRIMARY}
          noOfLines={1}>
          {user.name}
        </Text>
        <Text fontSize='10px' color={TEXT_MUTED} fontFamily='mono'>
          {user.tag}
        </Text>
      </Box>
      <Box
        w='7px'
        h='7px'
        borderRadius='full'
        flexShrink={0}
        bg={
          phase === 'idle' || phase === 'starting' || phase === 'shuffling'
            ? 'whiteAlpha.200'
            : 'green.400'
        }
        sx={
          phase === 'idle'
            ? {
                '@keyframes pendingPulse': {
                  '0%, 100%': { opacity: 0.3 },
                  '50%': { opacity: 0.9 },
                },
                animation: `pendingPulse 2s ${
                  index * 0.3
                }s ease-in-out infinite`,
              }
            : {}
        }
      />
    </Flex>
  );
}

function PairCard({
  pair,
  index,
  loopKey,
}: {
  pair: Pair;
  index: number;
  loopKey: number;
}) {
  const [a, b] = pair;
  return (
    <Flex
      key={`pair-${index}-${loopKey}`}
      align='center'
      gap='10px'
      px='14px'
      py='10px'
      borderRadius='10px'
      border='1px solid rgba(255,255,255,0.08)'
      bg='rgba(255,255,255,0.04)'
      sx={{
        '@keyframes pairReveal': {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        animation: `pairReveal 0.4s ${index * 0.18}s ease forwards`,
        opacity: 0,
      }}>
      <Avatar user={a} size={26} />
      <Box
        flex={1}
        h='1px'
        bg='linear-gradient(90deg, rgba(2,173,255,0.5) 0%, rgba(143,194,225,0.3) 100%)'
        position='relative'
        sx={{
          '@keyframes lineDraw': {
            '0%': { clipPath: 'inset(0 100% 0 0)' },
            '100%': { clipPath: 'inset(0 0% 0 0)' },
          },
          animation: `lineDraw 0.4s ${0.15 + index * 0.18}s ease forwards`,
          clipPath: 'inset(0 100% 0 0)',
        }}
      />
      <Avatar user={b} size={26} />
      <Flex
        w='18px'
        h='18px'
        borderRadius='full'
        bg='rgba(2,173,255,0.15)'
        border='1px solid rgba(2,173,255,0.3)'
        align='center'
        justify='center'
        flexShrink={0}
        sx={{
          '@keyframes checkPop': {
            '0%': { transform: 'scale(0)', opacity: 0 },
            '70%': { transform: 'scale(1.3)', opacity: 1 },
            '100%': { transform: 'scale(1)', opacity: 1 },
          },
          animation: `checkPop 0.35s ${
            0.35 + index * 0.18
          }s cubic-bezier(0.34,1.56,0.64,1) both`,
          opacity: 0,
        }}>
        <svg width='9' height='9' viewBox='0 0 12 12' fill='none'>
          <polyline
            points='2,6 5,9 10,3'
            stroke='#02ADFF'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </Flex>
    </Flex>
  );
}

function buttonLabel(phase: Phase): string {
  if (phase === 'paired' || phase === 'pause') {return 'Paired';}
  if (phase === 'shuffling' || phase === 'starting') {return 'Pairing...';}
  return 'Start Match';
}

function startButtonSx(phase: Phase) {
  if (phase === 'idle') {
    return {
      '@keyframes btnPulse': {
        '0%, 100%': { boxShadow: '0 0 0 0 rgba(2,173,255,0)' },
        '50%': { boxShadow: '0 0 0 4px rgba(2,173,255,0.15)' },
      },
      animation: 'btnPulse 2s ease-in-out infinite',
    };
  }
  if (phase === 'starting') {
    return {
      '@keyframes btnClick': {
        '0%': { transform: 'scale(1)' },
        '40%': { transform: 'scale(0.93)' },
        '100%': { transform: 'scale(1)' },
      },
      animation: 'btnClick 0.25s ease',
    };
  }
  return {};
}

function StartButton({
  phase,
  onClick,
}: {
  phase: Phase;
  onClick: () => void;
}) {
  const active = phase === 'idle';
  return (
    <Flex
      as='button'
      onClick={onClick}
      cursor={active ? 'pointer' : 'default'}
      align='center'
      justify='center'
      gap='6px'
      h='34px'
      px='16px'
      borderRadius='8px'
      fontSize='12px'
      fontWeight={600}
      color={active ? 'white' : TEXT_MUTED}
      bg={active ? 'rgba(2,173,255,0.15)' : 'rgba(255,255,255,0.04)'}
      border='1px solid'
      borderColor={active ? 'rgba(2,173,255,0.4)' : 'rgba(255,255,255,0.08)'}
      transition='all 0.2s'
      userSelect='none'
      sx={startButtonSx(phase)}>
      <svg width='10' height='10' viewBox='0 0 12 12' fill='none'>
        <polygon points='3,1 11,6 3,11' fill='currentColor' />
      </svg>
      {buttonLabel(phase)}
    </Flex>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export function DonutMatchCard() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [loopKey, setLoopKey] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => timers.current.forEach(clearTimeout);

  const runSequence = () => {
    clear();
    const t = (fn: () => void, ms: number) => {
      timers.current.push(setTimeout(fn, ms));
    };

    let o = 0;
    t(() => setPhase('starting'), (o += 600));
    t(() => setPhase('shuffling'), (o += 350));
    t(() => setPhase('paired'), (o += 700));
    t(() => setPhase('pause'), (o += 3200));
    t(() => {
      setPhase('idle');
      setLoopKey((k) => k + 1);
    }, (o += 800));
  };

  useEffect(() => {
    const autoStart = setTimeout(runSequence, 1200);
    return () => {
      clearTimeout(autoStart);
      clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loopKey]);

  let statusLabel = 'pending';
  if (phase === 'shuffling') {statusLabel = 'running';}
  else if (phase === 'paired' || phase === 'pause') {statusLabel = 'finished';}

  let statusColor = 'whiteAlpha.300';
  if (phase === 'shuffling' || phase === 'starting') {statusColor = 'yellow.300';}
  else if (phase === 'paired' || phase === 'pause') {statusColor = 'green.400';}

  return (
    <Box
      display={{ base: 'none', md: 'block' }}
      w='full'
      h='420px'
      borderRadius='20px'
      border={`1px solid ${BORDER_MID}`}
      boxShadow='inset 0 1px 0 rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.6)'
      overflow='hidden'
      textAlign='left'
      userSelect='none'>
      {/* Toolbar */}
      <Flex
        align='center'
        gap='8px'
        px='16px'
        py='11px'
        borderBottom={`1px solid ${BORDER}`}
        bg={BG_TOOLBAR}
        flexShrink={0}>
        <Flex gap='6px'>
          {['r', 'y', 'g'].map((k) => (
            <Box
              key={k}
              w='10px'
              h='10px'
              borderRadius='full'
              bg='whiteAlpha.200'
            />
          ))}
        </Flex>
        <Text ml='8px' fontFamily='mono' fontSize='11px' color={TEXT_MUTED}>
          match / friday-social
        </Text>
        <Flex align='center' gap='6px' ml='auto'>
          <Box
            w='6px'
            h='6px'
            borderRadius='full'
            bg={statusColor}
            flexShrink={0}
          />
          <Text fontSize='10px' fontFamily='mono' color={TEXT_MUTED}>
            {statusLabel}
          </Text>
        </Flex>
      </Flex>

      {/* Body */}
      <Flex h='calc(420px - 43px)'>
        {/* Sidebar — participants */}
        <Flex
          flexDir='column'
          w='220px'
          flexShrink={0}
          bg={BG_SIDEBAR}
          borderRight={`1px solid ${BORDER}`}
          overflow='hidden'>
          <Flex
            align='center'
            px='14px'
            py='12px'
            borderBottom={`1px solid ${BORDER}`}
            gap='8px'>
            <Text
              fontSize='11px'
              fontWeight={600}
              color={TEXT_MUTED}
              letterSpacing='0.08em'
              textTransform='uppercase'>
              Participants
            </Text>
            <Flex
              ml='auto'
              w='18px'
              h='18px'
              borderRadius='full'
              bg='rgba(255,255,255,0.07)'
              align='center'
              justify='center'>
              <Text fontSize='10px' color={TEXT_SECONDARY} fontWeight={700}>
                {USERS.length}
              </Text>
            </Flex>
          </Flex>
          <Box flex={1} overflowY='auto' py='6px'>
            {USERS.map((user, i) => (
              <UserRow
                key={user.id}
                user={user}
                index={i}
                phase={phase}
                loopKey={loopKey}
              />
            ))}
          </Box>
        </Flex>

        {/* Main panel */}
        <Flex flexDir='column' flex={1} bg={BG_MAIN} overflow='hidden'>
          <Flex
            align='center'
            px='16px'
            py='13px'
            borderBottom={`1px solid ${BORDER}`}
            flexShrink={0}
            gap='10px'>
            <Text fontSize='13px' fontWeight={600} color={TEXT_PRIMARY}>
              Friday Social
            </Text>
            <Text
              fontSize='11px'
              color={TEXT_MUTED}
              fontFamily='mono'
              ml='auto'>
              3 pairs · 6 members
            </Text>
          </Flex>

          <Box flex={1} overflowY='auto' px='14px' py='12px'>
            {(phase === 'idle' || phase === 'starting') && (
              <Flex
                flexDir='column'
                align='center'
                justify='center'
                h='full'
                gap='10px'
                opacity={phase === 'starting' ? 0.5 : 1}
                transition='opacity 0.2s'>
                <Text fontSize='28px'>🍩</Text>
                <Text
                  fontSize='13px'
                  color={TEXT_SECONDARY}
                  textAlign='center'
                  maxW='160px'>
                  Start the match to auto-pair all participants.
                </Text>
              </Flex>
            )}

            {phase === 'shuffling' && (
              <Flex
                flexDir='column'
                align='center'
                justify='center'
                h='full'
                gap='12px'>
                <Flex gap='6px'>
                  {USERS.map((u, i) => (
                    <Box
                      key={u.id}
                      sx={{
                        '@keyframes scatter': {
                          '0%': {
                            transform: 'translateY(0) rotate(0deg)',
                            opacity: 1,
                          },
                          '50%': {
                            transform: `translateY(${
                              i % 2 === 0 ? '-12px' : '12px'
                            }) rotate(${(i - 2) * 8}deg)`,
                            opacity: 0.6,
                          },
                          '100%': {
                            transform: 'translateY(0) rotate(0deg)',
                            opacity: 1,
                          },
                        },
                        animation: `scatter 0.55s ${i * 0.06}s ease-in-out`,
                      }}>
                      <Avatar user={u} size={32} />
                    </Box>
                  ))}
                </Flex>
                <Text fontSize='12px' color={TEXT_MUTED} fontFamily='mono'>
                  pairing...
                </Text>
              </Flex>
            )}

            {phase === 'paired' || phase === 'pause' ? (
              <Flex flexDir='column' gap='8px'>
                {PAIRS.map((pair, i) => (
                  <PairCard
                    key={`${pair[0].id}-${pair[1].id}`}
                    pair={pair}
                    index={i}
                    loopKey={loopKey}
                  />
                ))}
              </Flex>
            ) : null}
          </Box>

          {/* Bottom bar with Start button */}
          <Flex
            px='16px'
            py='11px'
            borderTop={`1px solid ${BORDER}`}
            flexShrink={0}
            align='center'
            justify='space-between'
            gap='10px'>
            <Text fontSize='11px' color={TEXT_MUTED} fontFamily='mono'>
              MATCH_fr1day · 6 members
            </Text>
            <StartButton phase={phase} onClick={runSequence} />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
