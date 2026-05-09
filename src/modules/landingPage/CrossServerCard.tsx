import { Box, Flex, Grid, HStack, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const TEXT_PRIMARY = 'white';
const TEXT_SECONDARY = 'whiteAlpha.600';
const TEXT_MUTED = 'whiteAlpha.300';
const BORDER = 'rgba(255, 255, 255, 0.08)';
const BORDER_MID = 'rgba(255, 255, 255, 0.12)';
const BG_SERVERBAR = 'rgba(0, 0, 0, 0.6)';
const BG_CHANNELS = 'rgba(0, 0, 0, 0.45)';
const BG_MAIN = 'rgba(0, 0, 0, 0.3)';
const BG_TOOLBAR = 'rgba(0, 0, 0, 0.5)';

type Message = {
  id: number;
  initial: string;
  name: string;
  from: string;
  time: string;
  body: string;
  avatarBg: string;
};

type Phase =
  | 'idle'
  | 'typing'
  | 'sent'
  | 'notif'
  | 'switching'
  | 'arrived'
  | 'replying'
  | 'replied'
  | 'backnotif'
  | 'backswitching'
  | 'backarrived'
  | 'pause';

const SERVERS = [
  { id: 'pixel-art', name: 'Pixel Art', initials: 'PA', color: 'linear-gradient(135deg, #a0c4ff, #4a80c4)' },
  { id: 'game-jam', name: 'Game Jam', initials: 'GJ', color: 'linear-gradient(135deg, #b5ead7, #3a7a5a)' },
  { id: 'indie-devs', name: 'Indie Devs', initials: 'ID', color: 'linear-gradient(135deg, #ffd6a5, #b87840)' },
];

const CHANNELS_BY_SERVER: Record<string, { id: string; name: string; bridged: boolean }[]> = {
  'pixel-art': [
    { id: 'pa-general', name: 'general', bridged: false },
    { id: 'pa-lnc', name: 'late-night-coffee', bridged: true },
    { id: 'pa-resources', name: 'resources', bridged: false },
  ],
  'game-jam': [
    { id: 'gj-general', name: 'general', bridged: false },
    { id: 'gj-lnc', name: 'late-night-coffee', bridged: true },
    { id: 'gj-jq', name: 'jam-questions', bridged: true },
  ],
  'indie-devs': [
    { id: 'id-general', name: 'general', bridged: false },
    { id: 'id-lnc', name: 'late-night-coffee', bridged: true },
    { id: 'id-jq', name: 'jam-questions', bridged: true },
  ],
};

const ACTIVE_CHANNEL_ID: Record<string, string> = {
  'pixel-art': 'pa-lnc',
  'game-jam': 'gj-lnc',
  'indie-devs': 'id-lnc',
};

const SEED_MESSAGES: Message[] = [
  { id: 1, initial: 'A', name: 'amir', from: 'pixel art', time: '2:18', body: 'anyone got a recommendation for an aseprite tablet workflow?', avatarBg: 'linear-gradient(135deg, #a0c4ff, #4a80c4)' },
  { id: 2, initial: 'L', name: 'leo', from: 'game jam', time: '2:19', body: 'try recalibrating in driver settings — happens every os update', avatarBg: 'linear-gradient(135deg, #b5ead7, #3a7a5a)' },
  { id: 3, initial: 'M', name: 'moss', from: 'indie devs', time: '2:21', body: 'thanks both ☕ adding to the room wiki', avatarBg: 'linear-gradient(135deg, #ffd6a5, #b87840)' },
];

const TYPED_MSG = 'hey, this room bridges all our servers 🔗';

const NEW_MSG_ID = 999;
const NEW_MSG: Message = {
  id: NEW_MSG_ID,
  initial: 'Y',
  name: 'you',
  from: 'pixel art',
  time: '2:22',
  body: TYPED_MSG,
  avatarBg: 'linear-gradient(135deg, #FFD700, #B8860B)',
};

const REPLY_MSG_ID = 1000;
const REPLY_MSG: Message = {
  id: REPLY_MSG_ID,
  initial: 'L',
  name: 'leo',
  from: 'game jam',
  time: '2:22',
  body: 'haha yes!! love this feature 🎉',
  avatarBg: 'linear-gradient(135deg, #b5ead7, #3a7a5a)',
};

// ─── Icons ─────────────────────────────────────────────────────────────────────
function LinkIcon() {
  return (
    <svg width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
      <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
      <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <path d='M22 2L11 13' /><path d='M22 2L15 22L11 13L2 9L22 2Z' />
    </svg>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function ServerIcon({
  server, active, hasNotif, loopKey,
}: {
  server: typeof SERVERS[0];
  active: boolean;
  hasNotif: boolean;
  loopKey: number;
}) {
  return (
    <Tooltip label={server.name} placement='right' hasArrow openDelay={200}>
      <Box position='relative' display='flex' alignItems='center' cursor='default' pl='16px'>
        <Box
          position='absolute'
          left='0'
          top='50%'
          transform='translateY(-50%)'
          w='4px'
          h={active ? '36px' : '8px'}
          bg='white'
          borderRadius='0 4px 4px 0'
          transition='height 0.3s ease'
          opacity={active ? 1 : 0}
        />
        <Box
          w='48px'
          h='48px'
          borderRadius={active ? '16px' : '50%'}
          background={server.color}
          display='flex'
          alignItems='center'
          justifyContent='center'
          fontWeight={700}
          fontSize='14px'
          color='white'
          transition='border-radius 0.3s ease, box-shadow 0.3s ease'
          boxShadow={active ? '0 0 0 3px rgba(255,220,0,0.4)' : 'none'}
          flexShrink={0}>
          {server.initials}
        </Box>
        {hasNotif && (
          <Box
            key={`notif-${server.id}-${loopKey}`}
            position='absolute'
            bottom='-2px'
            right='-2px'
            w='12px'
            h='12px'
            bg='red.500'
            borderRadius='full'
            border='2px solid rgba(0,0,0,0.7)'
            sx={{
              '@keyframes notifPop': {
                '0%': { transform: 'scale(0)', opacity: 0 },
                '60%': { transform: 'scale(1.5)', opacity: 1 },
                '100%': { transform: 'scale(1)', opacity: 1 },
              },
              animation: 'notifPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            }}
          />
        )}
      </Box>
    </Tooltip>
  );
}

function TypingIndicator({ name, avatarBg }: { name: string; avatarBg: string }) {
  return (
    <Flex gap='10px' py='6px' px='16px' align='center'>
      <Flex w='32px' h='32px' borderRadius='full' background={avatarBg} flexShrink={0} fontWeight={700} fontSize='12px' color='white' align='center' justify='center'>
        {name[0].toUpperCase()}
      </Flex>
      <Text fontSize='12px' color={TEXT_MUTED} fontStyle='italic'>
        {name} is typing
        {([0, 1, 2] as const).map((i) => (
          <Box
            key={i}
            as='span'
            mx='1px'
            display='inline-block'
            sx={{
              '@keyframes tpulse': { '0%, 100%': { opacity: 0.2 }, '50%': { opacity: 1 } },
              animation: `tpulse 1.2s ${i * 0.2}s ease-in-out infinite`,
            }}>
            ●
          </Box>
        ))}
      </Text>
    </Flex>
  );
}

function MsgRow({ msg, highlightKey }: { msg: Message; highlightKey?: string }) {
  return (
    <Flex
      key={highlightKey}
      gap='10px'
      py='6px'
      px='16px'
      borderRadius='4px'
      sx={highlightKey ? {
        '@keyframes msgArrive': {
          '0%': { background: 'rgba(255,220,0,0.22)', transform: 'translateX(-4px)' },
          '30%': { background: 'rgba(255,220,0,0.1)', transform: 'translateX(0)' },
          '100%': { background: 'transparent', transform: 'translateX(0)' },
        },
        animation: 'msgArrive 2.2s ease forwards',
      } : {}}>
      <Flex w='32px' h='32px' borderRadius='full' background={msg.avatarBg} flexShrink={0} fontWeight={700} fontSize='12px' color='white' align='center' justify='center'>
        {msg.initial}
      </Flex>
      <Box flex={1}>
        <Flex gap='8px' align='baseline' mb='2px'>
          <Text fontSize='13px' fontWeight={500} color={TEXT_PRIMARY}>{msg.name}</Text>
          <Text fontSize='10px' color={TEXT_MUTED} letterSpacing='0.05em' textTransform='uppercase'>via {msg.from}</Text>
          <Text fontSize='11px' color={TEXT_MUTED} ml='auto' fontFamily='mono'>{msg.time}</Text>
        </Flex>
        <Text fontSize='13px' color={TEXT_SECONDARY} lineHeight='1.5'>{msg.body}</Text>
      </Box>
    </Flex>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export function CrossServerCard() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [typedChars, setTypedChars] = useState(0);
  const [activeServerId, setActiveServerId] = useState('pixel-art');
  const [messages, setMessages] = useState<Message[]>(SEED_MESSAGES);
  const [serverNotifs, setServerNotifs] = useState<Record<string, boolean>>({});
  const [typingName, setTypingName] = useState<string | null>(null);
  const [typingAvatarBg, setTypingAvatarBg] = useState('');
  const [loopKey, setLoopKey] = useState(0);
  const msgContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const t = (fn: () => void, ms: number) => {
      timers.push(setTimeout(fn, ms));
    };

    // Reset
    setTypedChars(0);
    setActiveServerId('pixel-art');
    setMessages(SEED_MESSAGES);
    setServerNotifs({});
    setTypingName(null);
    setPhase('idle');

    let offset = 800;

    // ── Phase: typing ──────────────────────────────────────────────────────────
    t(() => setPhase('typing'), offset);
    for (let i = 1; i <= TYPED_MSG.length; i++) {
      const n = i;
      offset += 55;
      t(() => setTypedChars(n), offset);
    }

    // ── Phase: sent ────────────────────────────────────────────────────────────
    offset += 350;
    t(() => {
      setPhase('sent');
      setMessages(prev => [...prev, NEW_MSG]);
      setTypedChars(0);
      setTimeout(scrollToBottom, 30);
    }, offset);

    // ── Phase: notif (red dots on other servers) ───────────────────────────────
    offset += 700;
    t(() => {
      setPhase('notif');
      setServerNotifs({ 'game-jam': true, 'indie-devs': true });
    }, offset);

    // ── Phase: switching to game-jam ───────────────────────────────────────────
    offset += 1400;
    t(() => {
      setPhase('switching');
      setActiveServerId('game-jam');
      setServerNotifs(prev => ({ ...prev, 'game-jam': false }));
      setTimeout(scrollToBottom, 30);
    }, offset);

    // ── Phase: arrived (highlight NEW_MSG in game-jam) ─────────────────────────
    offset += 500;
    t(() => setPhase('arrived'), offset);

    // ── Phase: replying (leo from game-jam is typing) ──────────────────────────
    offset += 1400;
    t(() => {
      setPhase('replying');
      setTypingName('leo');
      setTypingAvatarBg('linear-gradient(135deg, #b5ead7, #3a7a5a)');
      setTimeout(scrollToBottom, 30);
    }, offset);

    // ── Phase: replied (reply message appears) ─────────────────────────────────
    offset += 1600;
    t(() => {
      setPhase('replied');
      setTypingName(null);
      setMessages(prev => [...prev, REPLY_MSG]);
      setTimeout(scrollToBottom, 30);
    }, offset);

    // ── Phase: backnotif (red dot on pixel-art) ────────────────────────────────
    offset += 700;
    t(() => {
      setPhase('backnotif');
      setServerNotifs(prev => ({ ...prev, 'pixel-art': true }));
    }, offset);

    // ── Phase: backswitching (back to pixel-art) ───────────────────────────────
    offset += 1200;
    t(() => {
      setPhase('backswitching');
      setActiveServerId('pixel-art');
      setServerNotifs(prev => ({ ...prev, 'pixel-art': false }));
      setTimeout(scrollToBottom, 30);
    }, offset);

    // ── Phase: backarrived (highlight REPLY_MSG in pixel-art) ─────────────────
    offset += 500;
    t(() => setPhase('backarrived'), offset);

    // ── Phase: pause then loop ─────────────────────────────────────────────────
    offset += 2800;
    t(() => setPhase('pause'), offset);

    offset += 700;
    t(() => setLoopKey(k => k + 1), offset);

    return () => timers.forEach(clearTimeout);
  }, [loopKey]);

  const activeServer = SERVERS.find(s => s.id === activeServerId) ?? SERVERS[0];
  const channels = CHANNELS_BY_SERVER[activeServerId] ?? [];
  const activeChannelId = ACTIVE_CHANNEL_ID[activeServerId];
  const inputText = TYPED_MSG.slice(0, typedChars);
  const showCursor = phase === 'typing';
  const inputActive = phase === 'typing';

  const highlightMsgId =
    phase === 'arrived' ? NEW_MSG_ID :
    phase === 'backarrived' ? REPLY_MSG_ID :
    null;

  return (
    <Box
      display={{ base: 'none', md: 'block' }}
      w='full'
      h='520px'
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
        <HStack gap='6px'>
          {['r', 'y', 'g'].map(k => (
            <Box key={k} w='10px' h='10px' borderRadius='full' bg='whiteAlpha.200' />
          ))}
        </HStack>
        <Text ml='8px' fontFamily='mono' fontSize='11px' color={TEXT_MUTED}>
          {activeServer.name.toLowerCase()} / #late-night-coffee
        </Text>
      </Flex>

      {/* Body */}
      <Grid templateColumns='72px 220px 1fr' h='calc(520px - 43px)'>
        {/* Server bar */}
        <Flex
          flexDir='column'
          align='center'
          py='12px'
          gap='8px'
          bg={BG_SERVERBAR}
          borderRight={`1px solid ${BORDER}`}>
          {SERVERS.map(server => (
            <ServerIcon
              key={server.id}
              server={server}
              active={activeServerId === server.id}
              hasNotif={!!serverNotifs[server.id]}
              loopKey={loopKey}
            />
          ))}
        </Flex>

        {/* Channel list */}
        <Flex flexDir='column' bg={BG_CHANNELS} borderRight={`1px solid ${BORDER}`} overflow='hidden'>
          <Flex align='center' px='16px' py='14px' borderBottom={`1px solid ${BORDER}`} flexShrink={0}>
            <Text fontSize='13px' fontWeight={700} color={TEXT_PRIMARY} letterSpacing='0.02em'>
              {activeServer.name}
            </Text>
          </Flex>
          <Box px='8px' py='8px'>
            <Text fontSize='10px' fontWeight={600} color={TEXT_MUTED} letterSpacing='0.1em' textTransform='uppercase' px='8px' mb='4px'>
              Channels
            </Text>
            {channels.map(ch => {
              const isActive = ch.id === activeChannelId;
              return (
                <Flex
                  key={ch.id}
                  align='center'
                  gap='6px'
                  px='8px'
                  py='6px'
                  borderRadius='6px'
                  cursor='default'
                  color={isActive ? TEXT_PRIMARY : TEXT_SECONDARY}
                  bg={isActive ? 'rgba(255,220,0,0.1)' : 'transparent'}>
                  {ch.bridged ? (
                    <Box color='yellow.300' flexShrink={0}><LinkIcon /></Box>
                  ) : (
                    <Text as='span' color={isActive ? 'yellow.300' : 'whiteAlpha.400'} fontSize='14px' lineHeight='1' flexShrink={0}>#</Text>
                  )}
                  <Text fontSize='13px' flex={1} noOfLines={1}>{ch.name}</Text>
                </Flex>
              );
            })}
          </Box>
        </Flex>

        {/* Main chat */}
        <Flex flexDir='column' bg={BG_MAIN} overflow='hidden'>
          {/* Channel header */}
          <Flex align='center' gap='8px' px='16px' py='13px' borderBottom={`1px solid ${BORDER}`} flexShrink={0}>
            <Box color='yellow.300'><LinkIcon /></Box>
            <Text fontSize='14px' fontWeight={600} color={TEXT_PRIMARY}>late-night-coffee</Text>
            <Flex align='center' gap='6px' ml='auto'>
              <Box w='6px' h='6px' borderRadius='full' bg='green.400' flexShrink={0} />
              <Text fontSize='11px' color={TEXT_MUTED} fontFamily='mono'>3 servers · 47 members</Text>
            </Flex>
          </Flex>

          {/* Messages */}
          <Box
            ref={msgContainerRef}
            flex={1}
            overflowY='auto'
            py='8px'
            css={{
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-track': { background: 'transparent' },
              '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '2px' },
            }}>
            {messages.map(msg => (
              <MsgRow
                key={msg.id}
                msg={msg}
                highlightKey={
                  msg.id === highlightMsgId
                    ? `highlight-${phase}-${loopKey}`
                    : undefined
                }
              />
            ))}
            {typingName && (
              <TypingIndicator name={typingName} avatarBg={typingAvatarBg} />
            )}
          </Box>

          {/* Animated input */}
          <Flex px='16px' py='12px' gap='8px' borderTop={`1px solid ${BORDER}`} flexShrink={0} align='center'>
            <Flex
              flex={1}
              bg='rgba(255,255,255,0.06)'
              border='1px solid'
              borderColor={inputActive ? 'rgba(255,220,0,0.4)' : 'rgba(255,255,255,0.1)'}
              boxShadow={inputActive ? '0 0 0 1px rgba(255,220,0,0.15)' : 'none'}
              borderRadius='8px'
              px='14px'
              h='38px'
              align='center'
              transition='border-color 0.2s, box-shadow 0.2s'
              overflow='hidden'>
              {inputText ? (
                <Text fontSize='13px' color='white' noOfLines={1} flex={1}>
                  {inputText}
                  {showCursor && (
                    <Box
                      as='span'
                      display='inline-block'
                      w='1.5px'
                      h='13px'
                      bg='white'
                      ml='1px'
                      verticalAlign='middle'
                      sx={{
                        '@keyframes cursorBlink': { '0%, 100%': { opacity: 1 }, '50%': { opacity: 0 } },
                        animation: 'cursorBlink 0.7s step-start infinite',
                      }}
                    />
                  )}
                </Text>
              ) : (
                <Text fontSize='13px' color='whiteAlpha.300' noOfLines={1}>
                  {phase === 'idle' || phase === 'pause' ? 'Message #late-night-coffee...' : ''}
                </Text>
              )}
            </Flex>
            <Flex
              w='38px'
              h='38px'
              borderRadius='8px'
              align='center'
              justify='center'
              transition='all 0.2s'
              color={typedChars === TYPED_MSG.length && phase === 'typing' ? 'yellow.300' : 'whiteAlpha.200'}
              bg={typedChars === TYPED_MSG.length && phase === 'typing' ? 'rgba(255,220,0,0.1)' : 'transparent'}>
              <SendIcon />
            </Flex>
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}
