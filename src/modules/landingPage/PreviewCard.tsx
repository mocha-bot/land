import { Box, Flex, Grid, HStack, Text } from '@chakra-ui/react';

const ACCENT = 'yellow.300';
const TEXT_PRIMARY = 'white';
const TEXT_SECONDARY = 'whiteAlpha.600';
const TEXT_MUTED = 'whiteAlpha.300';
const BORDER = 'rgba(255, 255, 255, 0.08)';
const BORDER_MID = 'rgba(255, 255, 255, 0.12)';
const BG_CARD = 'rgba(0, 0, 0, 0.5)';
const BG_SIDEBAR = 'rgba(0, 0, 0, 0.3)';
const BG_TOOLBAR = 'rgba(0, 0, 0, 0.4)';

function RoomItem({
  name,
  active,
  badge,
}: {
  name: string;
  active?: boolean;
  badge?: number;
}) {
  return (
    <Flex
      align='center'
      gap='10px'
      px='10px'
      py='8px'
      borderRadius='8px'
      fontSize='13px'
      color={active ? TEXT_PRIMARY : TEXT_SECONDARY}
      bg={active ? 'rgba(255, 220, 0, 0.08)' : 'transparent'}
      cursor='default'>
      <Text as='span' color={ACCENT}>
        #
      </Text>
      <Text as='span' flex={1}>
        {name}
      </Text>
      {badge && (
        <Box
          bg='yellow.300'
          color='black'
          borderRadius='9px'
          fontSize='10px'
          px='6px'
          py='1px'
          fontWeight={600}>
          {badge}
        </Box>
      )}
    </Flex>
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
          // eslint-disable-next-line react/no-array-index-key
          key={`colors_${i}`}
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

function MsgRow({
  initial,
  name,
  from,
  time,
  body,
  avatarBg,
}: {
  initial: string;
  name: string;
  from: string;
  time: string;
  body: string;
  avatarBg: string;
}) {
  return (
    <Flex gap='10px' py='8px'>
      <Flex
        w='30px'
        h='30px'
        borderRadius='full'
        background={avatarBg}
        flexShrink={0}
        fontWeight={600}
        fontSize='12px'
        color='white'
        align='center'
        justify='center'>
        {initial}
      </Flex>
      <Box flex={1}>
        <Flex gap='8px' align='baseline' mb='2px'>
          <Text fontSize='13px' fontWeight={500} color={TEXT_PRIMARY}>
            {name}
          </Text>
          <Text
            fontSize='10px'
            color={TEXT_MUTED}
            letterSpacing='0.04em'
            textTransform='uppercase'>
            {from}
          </Text>
          <Text fontSize='11px' color={TEXT_MUTED} ml='auto' fontFamily='mono'>
            {time}
          </Text>
        </Flex>
        <Text fontSize='13px' color={TEXT_SECONDARY} lineHeight='1.45'>
          {body}
        </Text>
      </Box>
    </Flex>
  );
}

export function PreviewCard() {
  return (
    <Box
      display={{ base: 'none', md: 'block' }}
      mt='64px'
      maxW='920px'
      mx='auto'
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
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              w='10px'
              h='10px'
              borderRadius='full'
              bg='whiteAlpha.200'
            />
          ))}
        </HStack>
        <Text ml='8px' fontFamily='mono' fontSize='11px' color={TEXT_MUTED}>
          mocha.chat / rooms / late-night-coffee
        </Text>
      </Flex>

      {/* Body */}
      <Grid templateColumns='240px 1fr' minH='360px'>
        {/* Sidebar */}
        <Box borderRight={`1px solid ${BORDER}`} p='16px' bg={BG_SIDEBAR}>
          <Text
            fontSize='10px'
            letterSpacing='0.12em'
            textTransform='uppercase'
            color={TEXT_MUTED}
            mb='10px'
            fontWeight={500}>
            your rooms
          </Text>
          <RoomItem name='late-night-coffee' active badge={3} />
          <RoomItem name='jam-questions' />
          <RoomItem name='showcase' />

          <Text
            fontSize='10px'
            letterSpacing='0.12em'
            textTransform='uppercase'
            color={TEXT_MUTED}
            mt='18px'
            mb='10px'
            fontWeight={500}>
            bridged servers
          </Text>
          <Flex
            align='center'
            gap='10px'
            px='10px'
            py='8px'
            color={TEXT_SECONDARY}
            fontSize='12px'>
            <StackedAvatars />
            <Text>3 servers</Text>
          </Flex>
        </Box>

        {/* Main */}
        <Box p='20px 24px'>
          <Flex
            align='center'
            gap='10px'
            pb='12px'
            borderBottom={`1px solid ${BORDER}`}
            mb='14px'>
            <Flex align='center' gap='4px'>
              <Text color={ACCENT} fontSize='16px'>
                #
              </Text>
              <Text fontSize='16px' fontWeight={500} color={TEXT_PRIMARY}>
                late-night-coffee
              </Text>
            </Flex>
            <Text
              fontSize='11px'
              color={TEXT_MUTED}
              fontFamily='mono'
              ml='auto'>
              3 servers · 47 members
            </Text>
          </Flex>

          <MsgRow
            initial='A'
            name='amir'
            from='via pixel art'
            time='2:18'
            body='anyone got a recommendation for an aseprite tablet workflow?'
            avatarBg='linear-gradient(135deg, #a0c4ff, #4a80c4)'
          />
          <MsgRow
            initial='L'
            name='leo'
            from='via game jam'
            time='2:19'
            body='try recalibrating in driver settings — happens to me every os update.'
            avatarBg='linear-gradient(135deg, #b5ead7, #3a7a5a)'
          />
          <MsgRow
            initial='M'
            name='moss'
            from='via indie devs'
            time='2:21'
            body='thanks both ☕ adding to the room wiki'
            avatarBg='linear-gradient(135deg, #ffd6a5, #b87840)'
          />
        </Box>
      </Grid>
    </Box>
  );
}
