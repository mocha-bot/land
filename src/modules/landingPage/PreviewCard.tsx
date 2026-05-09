import {
  Box,
  Flex,
  Grid,
  HStack,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';

const ACCENT = 'yellow.300';
const TEXT_PRIMARY = 'white';
const TEXT_SECONDARY = 'whiteAlpha.600';
const TEXT_MUTED = 'whiteAlpha.300';
const BORDER = 'rgba(255, 255, 255, 0.08)';
const BORDER_MID = 'rgba(255, 255, 255, 0.12)';
const BG_CARD = 'rgba(0, 0, 0, 0.5)';
const BG_SIDEBAR = 'rgba(0, 0, 0, 0.3)';
const BG_TOOLBAR = 'rgba(0, 0, 0, 0.4)';

type Message = {
  id: number;
  initial: string;
  name: string;
  from: string;
  time: string;
  body: string;
  avatarBg: string;
};

type Room = {
  name: string;
  servers: number;
  members: number;
  messages: Message[];
};

const SEED_ROOMS: Record<string, Room> = {
  'late-night-coffee': {
    name: 'late-night-coffee',
    servers: 3,
    members: 47,
    messages: [
      {
        id: 1,
        initial: 'A',
        name: 'amir',
        from: 'via pixel art',
        time: '2:18',
        body: 'anyone got a recommendation for an aseprite tablet workflow?',
        avatarBg: 'linear-gradient(135deg, #a0c4ff, #4a80c4)',
      },
      {
        id: 2,
        initial: 'L',
        name: 'leo',
        from: 'via game jam',
        time: '2:19',
        body: 'try recalibrating in driver settings — happens to me every os update.',
        avatarBg: 'linear-gradient(135deg, #b5ead7, #3a7a5a)',
      },
      {
        id: 3,
        initial: 'M',
        name: 'moss',
        from: 'via indie devs',
        time: '2:21',
        body: 'thanks both ☕ adding to the room wiki',
        avatarBg: 'linear-gradient(135deg, #ffd6a5, #b87840)',
      },
    ],
  },
  'jam-questions': {
    name: 'jam-questions',
    servers: 4,
    members: 62,
    messages: [
      {
        id: 1,
        initial: 'S',
        name: 'suki',
        from: 'via gamedev hub',
        time: '1:05',
        body: 'is it okay to use premade assets for the jam?',
        avatarBg: 'linear-gradient(135deg, #f9c6d0, #b84a6a)',
      },
      {
        id: 2,
        initial: 'R',
        name: 'rio',
        from: 'via indie devs',
        time: '1:07',
        body: 'yeah as long as you have a license. cc0 is safest.',
        avatarBg: 'linear-gradient(135deg, #b5ead7, #3a7a5a)',
      },
    ],
  },
  showcase: {
    name: 'showcase',
    servers: 2,
    members: 29,
    messages: [
      {
        id: 1,
        initial: 'K',
        name: 'kai',
        from: 'via pixel art',
        time: '11:42',
        body: 'just dropped my first tileset pack 🎉 feedback welcome',
        avatarBg: 'linear-gradient(135deg, #e0aaff, #7b2ff7)',
      },
      {
        id: 2,
        initial: 'M',
        name: 'moss',
        from: 'via indie devs',
        time: '11:44',
        body: 'this is clean! love the palette',
        avatarBg: 'linear-gradient(135deg, #ffd6a5, #b87840)',
      },
    ],
  },
};

const BOT_REPLIES: Record<string, { name: string; from: string; initial: string; avatarBg: string; replies: string[] }> = {
  'late-night-coffee': {
    name: 'leo',
    from: 'via game jam',
    initial: 'L',
    avatarBg: 'linear-gradient(135deg, #b5ead7, #3a7a5a)',
    replies: [
      'good question! anyone else have thoughts?',
      'i had the same issue last week 😅',
      'this channel is so helpful',
    ],
  },
  'jam-questions': {
    name: 'rio',
    from: 'via indie devs',
    initial: 'R',
    avatarBg: 'linear-gradient(135deg, #b5ead7, #3a7a5a)',
    replies: [
      'great point!',
      'check the jam rules page too',
      'yeah totally agree',
    ],
  },
  showcase: {
    name: 'kai',
    from: 'via pixel art',
    initial: 'K',
    avatarBg: 'linear-gradient(135deg, #e0aaff, #7b2ff7)',
    replies: [
      'thanks for sharing!',
      'looking forward to seeing more',
      '🔥🔥',
    ],
  },
};

function nowTime() {
  const d = new Date();
  return `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
}

let nextId = 100;
function getNextId() { nextId += 1; return nextId; }

function SendIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <path d='M22 2L11 13' />
      <path d='M22 2L15 22L11 13L2 9L22 2Z' />
    </svg>
  );
}

function StackedAvatars() {
  const colors = [
    'linear-gradient(135deg, #a0c4ff, #4a80c4)',
    'linear-gradient(135deg, #b5ead7, #3a7a5a)',
    'linear-gradient(135deg, #ffd6a5, #b87840)',
  ];
  return (
    <Flex>
      {colors.map((bg, i) => (
        <Box
          key={bg}
          w='18px'
          h='18px'
          borderRadius='5px'
          background={bg}
          border='1.5px solid rgba(0,0,0,0.6)'
          ml={i === 0 ? 0 : '-4px'}
        />
      ))}
    </Flex>
  );
}

function MsgRow({ msg }: { msg: Message }) {
  return (
    <Flex gap='10px' py='8px'>
      <Flex
        w='30px'
        h='30px'
        borderRadius='full'
        background={msg.avatarBg}
        flexShrink={0}
        fontWeight={600}
        fontSize='12px'
        color='white'
        align='center'
        justify='center'>
        {msg.initial}
      </Flex>
      <Box flex={1}>
        <Flex gap='8px' align='baseline' mb='2px'>
          <Text fontSize='13px' fontWeight={500} color={TEXT_PRIMARY}>{msg.name}</Text>
          <Text fontSize='10px' color={TEXT_MUTED} letterSpacing='0.04em' textTransform='uppercase'>{msg.from}</Text>
          <Text fontSize='11px' color={TEXT_MUTED} ml='auto' fontFamily='mono'>{msg.time}</Text>
        </Flex>
        <Text fontSize='13px' color={TEXT_SECONDARY} lineHeight='1.45'>{msg.body}</Text>
      </Box>
    </Flex>
  );
}

function TypingIndicator({ name }: { name: string }) {
  return (
    <Flex gap='10px' py='8px' align='center'>
      <Box w='30px' h='30px' flexShrink={0} />
      <Text fontSize='12px' color={TEXT_MUTED} fontStyle='italic'>
        {name} is typing
        <Box as='span' ml='4px'>
          {([0, 1, 2] as const).map((i) => (
            <Box
              key={`dot-${i}`}
              as='span'
              mr='2px'
              opacity={0.4}
              display='inline-block'
              animation={`pulse 1.2s ${i * 0.2}s ease-in-out infinite`}
              sx={{
                '@keyframes pulse': {
                  '0%, 100%': { opacity: 0.2 },
                  '50%': { opacity: 1 },
                },
              }}>
              ●
            </Box>
          ))}
        </Box>
      </Text>
    </Flex>
  );
}

export function PreviewCard() {
  const [activeRoom, setActiveRoom] = useState('late-night-coffee');
  const [rooms, setRooms] = useState<Record<string, Room>>(SEED_ROOMS);
  const [badges, setBadges] = useState<Record<string, number>>({ 'jam-questions': 2, showcase: 1 });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [rooms, isTyping, activeRoom]);

  const handleRoomClick = (name: string) => {
    setActiveRoom(name);
    setBadges((prev) => ({ ...prev, [name]: 0 }));
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) { return; }

    const userMsg: Message = {
      id: getNextId(),
      initial: 'Y',
      name: 'you',
      from: 'via your server',
      time: nowTime(),
      body: text,
      avatarBg: 'linear-gradient(135deg, #FFD700, #B8860B)',
    };

    setRooms((prev) => ({
      ...prev,
      [activeRoom]: {
        ...prev[activeRoom],
        messages: [...prev[activeRoom].messages, userMsg],
      },
    }));
    setInput('');

    const bot = BOT_REPLIES[activeRoom];
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: getNextId(),
        initial: bot.initial,
        name: bot.name,
        from: bot.from,
        time: nowTime(),
        body: bot.replies[Math.floor(Math.random() * bot.replies.length)],
        avatarBg: bot.avatarBg,
      };
      setRooms((prev) => ({
        ...prev,
        [activeRoom]: {
          ...prev[activeRoom],
          messages: [...prev[activeRoom].messages, reply],
        },
      }));
    }, 1200);
  };

  const room = rooms[activeRoom];
  const roomOrder = ['late-night-coffee', 'jam-questions', 'showcase'];

  return (
    <Box
      display={{ base: 'none', md: 'block' }}
      mt='64px'
      w='full'
      h='500px'
      borderRadius='24px'
      bg={BG_CARD}
      backdropFilter='blur(28px) saturate(160%)'
      border={`1px solid ${BORDER_MID}`}
      boxShadow='inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 64px rgba(0,0,0,0.5)'
      overflow='hidden'
      textAlign='left'>
      {/* Toolbar */}
      <Flex
        align='center'
        gap='8px'
        px='16px'
        py='12px'
        borderBottom={`1px solid ${BORDER}`}
        bg={BG_TOOLBAR}>
        <HStack gap='6px'>
          {(['dot-red', 'dot-yellow', 'dot-green'] as const).map((id) => (
            <Box key={id} w='10px' h='10px' borderRadius='full' bg='whiteAlpha.200' />
          ))}
        </HStack>
        <Text ml='8px' fontFamily='mono' fontSize='11px' color={TEXT_MUTED}>
          mocha.chat / rooms / {activeRoom}
        </Text>
      </Flex>

      {/* Body */}
      <Grid templateColumns='280px 1fr' h='calc(500px - 45px)'>
        {/* Sidebar */}
        <Box borderRight={`1px solid ${BORDER}`} p='16px' bg={BG_SIDEBAR} overflowY='auto'>
          <Text fontSize='10px' letterSpacing='0.12em' textTransform='uppercase' color={TEXT_MUTED} mb='10px' fontWeight={500}>
            your rooms
          </Text>
          {roomOrder.map((name) => (
            <Flex
              key={name}
              align='center'
              gap='10px'
              px='10px'
              py='8px'
              borderRadius='8px'
              fontSize='13px'
              color={activeRoom === name ? TEXT_PRIMARY : TEXT_SECONDARY}
              bg={activeRoom === name ? 'rgba(255, 220, 0, 0.08)' : 'transparent'}
              cursor='pointer'
              _hover={{ bg: activeRoom === name ? 'rgba(255, 220, 0, 0.08)' : 'rgba(255,255,255,0.04)', color: TEXT_PRIMARY }}
              transition='all 0.15s'
              onClick={() => handleRoomClick(name)}>
              <Text as='span' color={ACCENT}>#</Text>
              <Text as='span' flex={1}>{name}</Text>
              {badges[name] > 0 && (
                <Box bg='yellow.300' color='black' borderRadius='9px' fontSize='10px' px='6px' py='1px' fontWeight={600}>
                  {badges[name]}
                </Box>
              )}
            </Flex>
          ))}

          <Text fontSize='10px' letterSpacing='0.12em' textTransform='uppercase' color={TEXT_MUTED} mt='18px' mb='10px' fontWeight={500}>
            bridged servers
          </Text>
          <Flex align='center' gap='10px' px='10px' py='8px' color={TEXT_SECONDARY} fontSize='12px'>
            <StackedAvatars />
            <Text>{room.servers} servers</Text>
          </Flex>
        </Box>

        {/* Main */}
        <Flex flexDir='column' overflow='hidden'>
          {/* Room header */}
          <Flex align='center' gap='10px' px='24px' py='14px' borderBottom={`1px solid ${BORDER}`} flexShrink={0}>
            <Flex align='center' gap='4px'>
              <Text color={ACCENT} fontSize='16px'>#</Text>
              <Text fontSize='16px' fontWeight={500} color={TEXT_PRIMARY}>{room.name}</Text>
            </Flex>
            <Text fontSize='11px' color={TEXT_MUTED} fontFamily='mono' ml='auto'>
              {room.servers} servers · {room.members} members
            </Text>
          </Flex>

          {/* Messages */}
          <Box flex={1} overflowY='auto' px='24px' pt='4px'
            css={{
              '&::-webkit-scrollbar': { width: '4px' },
              '&::-webkit-scrollbar-track': { background: 'transparent' },
              '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.1)', borderRadius: '2px' },
            }}>
            {room.messages.map((msg) => (
              <MsgRow key={msg.id} msg={msg} />
            ))}
            {isTyping && <TypingIndicator name={BOT_REPLIES[activeRoom].name} />}
            <div ref={messagesEndRef} />
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
              placeholder={`Message #${room.name}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { handleSend(); } }}
              bg='rgba(255,255,255,0.06)'
              border='1px solid rgba(255,255,255,0.12)'
              color='white'
              fontSize='13px'
              borderRadius='10px'
              px='14px'
              py='10px'
              h='auto'
              _placeholder={{ color: 'whiteAlpha.300' }}
              _focus={{ borderColor: 'rgba(255,220,0,0.4)', boxShadow: '0 0 0 1px rgba(255,220,0,0.2)', outline: 'none' }}
              _hover={{ borderColor: 'rgba(255,255,255,0.2)' }}
            />
            <IconButton
              aria-label='send message'
              icon={<SendIcon />}
              onClick={handleSend}
              variant='ghost'
              color='yellow.300'
              borderRadius='10px'
              _hover={{ bg: 'rgba(255,220,0,0.1)' }}
              _active={{ bg: 'rgba(255,220,0,0.15)' }}
              minW='40px'
              h='40px'
            />
          </Flex>
        </Flex>
      </Grid>
    </Box>
  );
}
