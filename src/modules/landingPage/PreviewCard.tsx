import {
  Box,
  Flex,
  Grid,
  HStack,
  IconButton,
  Input,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { useInView } from 'framer-motion';
import { memo, useCallback, useRef, useState } from 'react';

// ─── Design tokens ────────────────────────────────────────────────────────────
const ACCENT = 'yellow.300';
const TEXT_PRIMARY = 'white';
const TEXT_SECONDARY = 'whiteAlpha.600';
const TEXT_MUTED = 'whiteAlpha.300';
const BORDER = 'rgba(255, 255, 255, 0.08)';
const BORDER_MID = 'rgba(255, 255, 255, 0.12)';
const BG_SERVERBAR = 'rgba(0, 0, 0, 0.6)';
const BG_CHANNELS = 'rgba(0, 0, 0, 0.45)';
const BG_MAIN = 'rgba(0, 0, 0, 0.3)';
const BG_TOOLBAR = 'rgba(0, 0, 0, 0.5)';

// Stable keyframe string — defined once at module level, not re-created per render
const TYPING_DOT_KEYFRAMES = `
  @keyframes tpulse {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 1; }
  }
`;

// ─── Types ─────────────────────────────────────────────────────────────────────
type Message = {
  id: number;
  initial: string;
  name: string;
  from: string;
  time: string;
  body: string;
  avatarBg: string;
};

type Channel = {
  id: string;
  name: string;
  bridgedRoomId?: string;
};

type Server = {
  id: string;
  name: string;
  initials: string;
  color: string;
  channels: Channel[];
};

// ─── Static data ───────────────────────────────────────────────────────────────
const SERVERS: Server[] = [
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    initials: 'PA',
    color: 'linear-gradient(135deg, #a0c4ff, #4a80c4)',
    channels: [
      { id: 'pa-general', name: 'general' },
      { id: 'pa-lnc', name: 'late-night-coffee', bridgedRoomId: 'lnc' },
      { id: 'pa-resources', name: 'resources' },
    ],
  },
  {
    id: 'game-jam',
    name: 'Game Jam',
    initials: 'GJ',
    color: 'linear-gradient(135deg, #b5ead7, #3a7a5a)',
    channels: [
      { id: 'gj-general', name: 'general' },
      { id: 'gj-lnc', name: 'late-night-coffee', bridgedRoomId: 'lnc' },
      { id: 'gj-jq', name: 'jam-questions', bridgedRoomId: 'jq' },
    ],
  },
  {
    id: 'indie-devs',
    name: 'Indie Devs',
    initials: 'ID',
    color: 'linear-gradient(135deg, #ffd6a5, #b87840)',
    channels: [
      { id: 'id-general', name: 'general' },
      { id: 'id-lnc', name: 'late-night-coffee', bridgedRoomId: 'lnc' },
      { id: 'id-jq', name: 'jam-questions', bridgedRoomId: 'jq' },
      { id: 'id-showcase', name: 'showcase' },
    ],
  },
];

const SEED_MESSAGES: Record<string, Message[]> = {
  lnc: [
    {
      id: 1,
      initial: 'A',
      name: 'amir',
      from: 'pixel art',
      time: '2:18',
      body: 'anyone got a recommendation for an aseprite tablet workflow?',
      avatarBg: 'linear-gradient(135deg, #a0c4ff, #4a80c4)',
    },
    {
      id: 2,
      initial: 'L',
      name: 'leo',
      from: 'game jam',
      time: '2:19',
      body: 'try recalibrating in driver settings — happens every os update',
      avatarBg: 'linear-gradient(135deg, #b5ead7, #3a7a5a)',
    },
    {
      id: 3,
      initial: 'M',
      name: 'moss',
      from: 'indie devs',
      time: '2:21',
      body: 'thanks both ☕ adding to the room wiki',
      avatarBg: 'linear-gradient(135deg, #ffd6a5, #b87840)',
    },
  ],
  jq: [
    {
      id: 4,
      initial: 'S',
      name: 'suki',
      from: 'game jam',
      time: '1:05',
      body: 'is it okay to use premade assets for the jam?',
      avatarBg: 'linear-gradient(135deg, #f9c6d0, #b84a6a)',
    },
    {
      id: 5,
      initial: 'R',
      name: 'rio',
      from: 'indie devs',
      time: '1:07',
      body: 'yeah as long as you have a license. cc0 is safest.',
      avatarBg: 'linear-gradient(135deg, #b5ead7, #3a7a5a)',
    },
  ],
  'pixel-art/pa-general': [
    {
      id: 6,
      initial: 'K',
      name: 'kai',
      from: 'pixel art',
      time: '10:00',
      body: 'welcome to pixel art! share your work anytime 🎨',
      avatarBg: 'linear-gradient(135deg, #e0aaff, #7b2ff7)',
    },
  ],
  'pixel-art/pa-resources': [
    {
      id: 7,
      initial: 'A',
      name: 'amir',
      from: 'pixel art',
      time: '9:30',
      body: 'pinned: lospec.com for palettes, itch.io for assets',
      avatarBg: 'linear-gradient(135deg, #a0c4ff, #4a80c4)',
    },
  ],
  'game-jam/gj-general': [
    {
      id: 8,
      initial: 'L',
      name: 'leo',
      from: 'game jam',
      time: '8:00',
      body: 'jam starts in 3 days. theme votes close tonight!',
      avatarBg: 'linear-gradient(135deg, #b5ead7, #3a7a5a)',
    },
  ],
  'indie-devs/id-general': [
    {
      id: 9,
      initial: 'M',
      name: 'moss',
      from: 'indie devs',
      time: '11:15',
      body: 'devlog friday is back — drop your updates here',
      avatarBg: 'linear-gradient(135deg, #ffd6a5, #b87840)',
    },
  ],
  'indie-devs/id-showcase': [
    {
      id: 10,
      initial: 'K',
      name: 'kai',
      from: 'indie devs',
      time: '11:42',
      body: 'just dropped my first tileset pack 🎉 feedback welcome',
      avatarBg: 'linear-gradient(135deg, #e0aaff, #7b2ff7)',
    },
  ],
};

const BOT_REPLIES: Record<
  string,
  {
    initial: string;
    name: string;
    from: string;
    avatarBg: string;
    lines: string[];
  }
> = {
  lnc: {
    initial: 'L',
    name: 'leo',
    from: 'game jam',
    avatarBg: 'linear-gradient(135deg, #b5ead7, #3a7a5a)',
    lines: [
      'good question! anyone else have thoughts?',
      'i had the same issue last week 😅',
      'this channel is so helpful ☕',
    ],
  },
  jq: {
    initial: 'R',
    name: 'rio',
    from: 'indie devs',
    avatarBg: 'linear-gradient(135deg, #b5ead7, #3a7a5a)',
    lines: [
      'great point!',
      'check the jam rules page too',
      'yeah totally agree',
    ],
  },
  default: {
    initial: 'M',
    name: 'moss',
    from: 'indie devs',
    avatarBg: 'linear-gradient(135deg, #ffd6a5, #b87840)',
    lines: ['hey!', '👋', 'nice'],
  },
};

const BRIDGED_META: Record<
  string,
  { serverCount: number; memberCount: number }
> = {
  lnc: { serverCount: 3, memberCount: 47 },
  jq: { serverCount: 2, memberCount: 62 },
};

// ─── Helpers ───────────────────────────────────────────────────────────────────
function nowTime() {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}

let NEXT_ID = 200;
function getNextId() {
  NEXT_ID += 1;
  return NEXT_ID;
}

function msgKey(serverId: string, channel: Channel) {
  return channel.bridgedRoomId ?? `${serverId}/${channel.id}`;
}

// ─── Icons ─────────────────────────────────────────────────────────────────────
function SendIcon() {
  return (
    <svg
      width='15'
      height='15'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M22 2L11 13' />
      <path d='M22 2L15 22L11 13L2 9L22 2Z' />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg
      width='11'
      height='11'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'>
      <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
      <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
    </svg>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function ServerIcon({
  server,
  active,
  hasNotif,
  onClick,
}: {
  server: Server;
  active: boolean;
  hasNotif: boolean;
  onClick: () => void;
}) {
  return (
    <Tooltip label={server.name} placement='right' hasArrow openDelay={200}>
      <Box
        position='relative'
        display='flex'
        alignItems='center'
        cursor='pointer'
        onClick={onClick}
        pl='16px'>
        {/* Active pill — opacity+scaleY instead of height to stay compositor-only */}
        <Box
          position='absolute'
          left='0'
          top='50%'
          transform={
            active
              ? 'translateY(-50%) scaleY(1)'
              : 'translateY(-50%) scaleY(0.22)'
          }
          transformOrigin='center'
          w='4px'
          h='36px'
          bg='white'
          borderRadius='0 4px 4px 0'
          transition='transform 0.15s ease, opacity 0.15s ease'
          opacity={active ? 1 : 0}
          _groupHover={{ opacity: 1 }}
        />
        <Box
          role='group'
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
          transition='border-radius 0.15s ease'
          _hover={{ borderRadius: '16px' }}
          boxShadow={active ? '0 0 0 3px rgba(255,220,0,0.4)' : 'none'}
          flexShrink={0}>
          {server.initials}
        </Box>
        {hasNotif && (
          <Box
            position='absolute'
            bottom='-2px'
            right='-2px'
            w='12px'
            h='12px'
            bg='red.500'
            borderRadius='full'
            border='2px solid rgba(0,0,0,0.7)'
          />
        )}
      </Box>
    </Tooltip>
  );
}

function TypingIndicator({ name }: { name: string }) {
  return (
    <>
      {/* Keyframes injected once via stable module-level string */}
      <style>{TYPING_DOT_KEYFRAMES}</style>
      <Flex gap='10px' py='6px' align='center' px='16px'>
        <Box w='32px' h='32px' flexShrink={0} />
        <Text fontSize='12px' color={TEXT_MUTED} fontStyle='italic'>
          {name} is typing
          {([0, 1, 2] as const).map((i) => (
            <Box
              key={`tdot-${i}`}
              as='span'
              mx='1px'
              display='inline-block'
              style={{
                animation: `tpulse 1.2s ${i * 0.2}s ease-in-out infinite`,
              }}>
              ●
            </Box>
          ))}
        </Text>
      </Flex>
    </>
  );
}

function MsgRowBase({ msg }: { msg: Message }) {
  return (
    <Flex
      gap='10px'
      py='6px'
      px='16px'
      _hover={{ bg: 'rgba(255,255,255,0.02)' }}
      borderRadius='4px'>
      <Flex
        w='32px'
        h='32px'
        borderRadius='full'
        background={msg.avatarBg}
        flexShrink={0}
        fontWeight={700}
        fontSize='12px'
        color='white'
        align='center'
        justify='center'>
        {msg.initial}
      </Flex>
      <Box flex={1}>
        <Flex gap='8px' align='baseline' mb='2px'>
          <Text fontSize='13px' fontWeight={500} color={TEXT_PRIMARY}>
            {msg.name}
          </Text>
          <Text
            fontSize='10px'
            color={TEXT_MUTED}
            letterSpacing='0.05em'
            textTransform='uppercase'>
            via {msg.from}
          </Text>
          <Text fontSize='11px' color={TEXT_MUTED} ml='auto' fontFamily='mono'>
            {msg.time}
          </Text>
        </Flex>
        <Text fontSize='13px' color={TEXT_SECONDARY} lineHeight='1.5'>
          {msg.body}
        </Text>
      </Box>
    </Flex>
  );
}

const MsgRow = memo(MsgRowBase);

// ─── Main component ────────────────────────────────────────────────────────────
export function PreviewCard() {
  const [activeServerId, setActiveServerId] = useState('pixel-art');
  const [activeChannelId, setActiveChannelId] = useState('pa-lnc');
  const [messages, setMessages] =
    useState<Record<string, Message[]>>(SEED_MESSAGES);
  const [serverNotifs, setServerNotifs] = useState<Record<string, boolean>>({});
  const [channelBadges, setChannelBadges] = useState<Record<string, number>>({
    'gj-jq': 2,
    'id-showcase': 1,
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const msgContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: '200px' });

  const activeServer =
    SERVERS.find((s) => s.id === activeServerId) ?? SERVERS[0];
  const activeChannel =
    activeServer.channels.find((c) => c.id === activeChannelId) ??
    activeServer.channels[0];
  const currentMsgKey = msgKey(activeServerId, activeChannel);
  const currentMessages = messages[currentMsgKey] ?? [];

  const scrollToBottom = useCallback(() => {
    if (msgContainerRef.current) {
      msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
    }
  }, []);

  const handleServerClick = useCallback((serverId: string) => {
    const server = SERVERS.find((s) => s.id === serverId);
    if (!server) {
      return;
    }
    setActiveServerId(serverId);
    setActiveChannelId(server.channels[0].id);
    setServerNotifs((prev) => ({ ...prev, [serverId]: false }));
  }, []);

  const handleChannelClick = useCallback((channelId: string) => {
    setActiveChannelId(channelId);
    setChannelBadges((prev) => ({ ...prev, [channelId]: 0 }));
  }, []);

  const handleSend = useCallback(() => {
    const text = input.trim();
    if (!text) {
      return;
    }

    const userMsg: Message = {
      id: getNextId(),
      initial: 'Y',
      name: 'you',
      from: 'your server',
      time: nowTime(),
      body: text,
      avatarBg: 'linear-gradient(135deg, #FFD700, #B8860B)',
    };

    const key = currentMsgKey;
    setMessages((prev) => ({
      ...prev,
      [key]: [...(prev[key] ?? []), userMsg],
    }));
    setInput('');
    setTimeout(scrollToBottom, 30);

    if (activeChannel.bridgedRoomId) {
      const otherServerIds = SERVERS.filter(
        (s) =>
          s.id !== activeServerId &&
          s.channels.some(
            (c) => c.bridgedRoomId === activeChannel.bridgedRoomId,
          ),
      ).map((s) => s.id);
      if (otherServerIds.length > 0) {
        setServerNotifs((prev) => {
          const next = { ...prev };
          otherServerIds.forEach((id) => {
            next[id] = true;
          });
          return next;
        });
      }
    }

    const botData =
      BOT_REPLIES[activeChannel.bridgedRoomId ?? ''] ?? BOT_REPLIES.default;
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: getNextId(),
        initial: botData.initial,
        name: botData.name,
        from: botData.from,
        time: nowTime(),
        body: botData.lines[Math.floor(Math.random() * botData.lines.length)],
        avatarBg: botData.avatarBg,
      };
      setMessages((prev) => ({
        ...prev,
        [key]: [...(prev[key] ?? []), reply],
      }));
      setTimeout(scrollToBottom, 30);
    }, 1200);
  }, [input, currentMsgKey, activeChannel, activeServerId, scrollToBottom]);

  const bridgedMeta = activeChannel.bridgedRoomId
    ? BRIDGED_META[activeChannel.bridgedRoomId]
    : null;

  return (
    <Box
      ref={containerRef}
      display={{ base: 'none', md: 'block' }}
      w='full'
      h='520px'
      borderRadius='20px'
      border={`1px solid ${BORDER_MID}`}
      boxShadow='inset 0 1px 0 rgba(255,255,255,0.06), 0 32px 80px rgba(0,0,0,0.6)'
      overflow='hidden'
      textAlign='left'
      style={{ willChange: 'transform' }}>
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
          {(['dot-r', 'dot-y', 'dot-g'] as const).map((id) => (
            <Box
              key={id}
              w='10px'
              h='10px'
              borderRadius='full'
              bg='whiteAlpha.200'
            />
          ))}
        </HStack>
        <Text ml='8px' fontFamily='mono' fontSize='11px' color={TEXT_MUTED}>
          {activeServer.name.toLowerCase()} / #{activeChannel.name}
        </Text>
      </Flex>

      {/* Body: server bar + channels + main */}
      <Grid templateColumns='72px 220px 1fr' h='calc(520px - 43px)'>
        {/* Server bar */}
        <Flex
          flexDir='column'
          align='center'
          py='12px'
          gap='8px'
          bg={BG_SERVERBAR}
          borderRight={`1px solid ${BORDER}`}
          overflowY='auto'>
          {SERVERS.map((server) => (
            <ServerIcon
              key={server.id}
              server={server}
              active={activeServerId === server.id}
              hasNotif={!!serverNotifs[server.id]}
              onClick={() => handleServerClick(server.id)}
            />
          ))}
        </Flex>

        {/* Channel list */}
        <Flex
          flexDir='column'
          bg={BG_CHANNELS}
          borderRight={`1px solid ${BORDER}`}
          overflowY='auto'>
          <Flex
            align='center'
            justify='space-between'
            px='16px'
            py='14px'
            borderBottom={`1px solid ${BORDER}`}
            flexShrink={0}>
            <Text
              fontSize='13px'
              fontWeight={700}
              color={TEXT_PRIMARY}
              letterSpacing='0.02em'>
              {activeServer.name}
            </Text>
          </Flex>

          <Box px='8px' py='8px'>
            <Text
              fontSize='10px'
              fontWeight={600}
              color={TEXT_MUTED}
              letterSpacing='0.1em'
              textTransform='uppercase'
              px='8px'
              mb='4px'>
              Channels
            </Text>
            {activeServer.channels.map((ch) => {
              const isActive = ch.id === activeChannelId;
              const badge = channelBadges[ch.id];
              return (
                <Flex
                  key={ch.id}
                  align='center'
                  gap='6px'
                  px='8px'
                  py='6px'
                  borderRadius='6px'
                  cursor='pointer'
                  color={isActive ? TEXT_PRIMARY : TEXT_SECONDARY}
                  bg={isActive ? 'rgba(255,220,0,0.1)' : 'transparent'}
                  _hover={{
                    bg: isActive
                      ? 'rgba(255,220,0,0.1)'
                      : 'rgba(255,255,255,0.05)',
                    color: TEXT_PRIMARY,
                  }}
                  transition='background 0.1s, color 0.1s'
                  onClick={() => handleChannelClick(ch.id)}>
                  {ch.bridgedRoomId ? (
                    <Box color='yellow.300' flexShrink={0}>
                      <LinkIcon />
                    </Box>
                  ) : (
                    <Text
                      as='span'
                      color={isActive ? 'yellow.300' : 'whiteAlpha.400'}
                      fontSize='14px'
                      lineHeight='1'
                      flexShrink={0}>
                      #
                    </Text>
                  )}
                  <Text fontSize='13px' flex={1} noOfLines={1}>
                    {ch.name}
                  </Text>
                  {badge > 0 && (
                    <Box
                      bg='red.500'
                      color='white'
                      borderRadius='full'
                      fontSize='10px'
                      px='5px'
                      py='1px'
                      fontWeight={700}
                      minW='18px'
                      textAlign='center'>
                      {badge}
                    </Box>
                  )}
                </Flex>
              );
            })}
          </Box>
        </Flex>

        {/* Main chat */}
        <Flex flexDir='column' bg={BG_MAIN} overflow='hidden'>
          <Flex
            align='center'
            gap='8px'
            px='16px'
            py='13px'
            borderBottom={`1px solid ${BORDER}`}
            flexShrink={0}>
            {activeChannel.bridgedRoomId ? (
              <Box color='yellow.300'>
                <LinkIcon />
              </Box>
            ) : (
              <Text color='whiteAlpha.500' fontSize='16px' lineHeight='1'>
                #
              </Text>
            )}
            <Text fontSize='14px' fontWeight={600} color={TEXT_PRIMARY}>
              {activeChannel.name}
            </Text>
            {bridgedMeta && (
              <Flex align='center' gap='6px' ml='auto'>
                <Box
                  w='6px'
                  h='6px'
                  borderRadius='full'
                  bg='green.400'
                  flexShrink={0}
                />
                <Text fontSize='11px' color={TEXT_MUTED} fontFamily='mono'>
                  {bridgedMeta.serverCount} servers · {bridgedMeta.memberCount}{' '}
                  members
                </Text>
              </Flex>
            )}
          </Flex>

          {/* Messages — only render when in view to avoid background DOM work */}
          <Box
            ref={msgContainerRef}
            flex={1}
            overflowY='auto'
            py='8px'
            css={{
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-track': { background: 'transparent' },
              '&::-webkit-scrollbar-thumb': {
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '2px',
              },
            }}>
            {isInView &&
              currentMessages.map((msg) => <MsgRow key={msg.id} msg={msg} />)}
            {isInView && isTyping && (
              <TypingIndicator
                name={
                  BOT_REPLIES[activeChannel.bridgedRoomId ?? '']?.name ??
                  'someone'
                }
              />
            )}
          </Box>

          {/* Input */}
          <Flex
            px='16px'
            py='12px'
            gap='8px'
            borderTop={`1px solid ${BORDER}`}
            flexShrink={0}
            align='center'>
            <Input
              flex={1}
              placeholder={`Message #${activeChannel.name}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSend();
                }
              }}
              bg='rgba(255,255,255,0.06)'
              border='1px solid rgba(255,255,255,0.1)'
              color='white'
              fontSize='13px'
              borderRadius='8px'
              px='14px'
              h='38px'
              _placeholder={{ color: 'whiteAlpha.300' }}
              _focus={{
                borderColor: 'rgba(255,220,0,0.4)',
                boxShadow: '0 0 0 1px rgba(255,220,0,0.15)',
                outline: 'none',
              }}
              _hover={{ borderColor: 'rgba(255,255,255,0.18)' }}
            />
            <IconButton
              aria-label='send message'
              icon={<SendIcon />}
              onClick={handleSend}
              variant='ghost'
              color={ACCENT}
              borderRadius='8px'
              _hover={{ bg: 'rgba(255,220,0,0.1)' }}
              _active={{ bg: 'rgba(255,220,0,0.15)' }}
              minW='38px'
              h='38px'
            />
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}
