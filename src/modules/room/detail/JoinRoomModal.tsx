import {
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import {
  FiCopy as CopyIcon,
  FiPlusSquare as PlusIcon,
  FiType as TypeIcon,
} from 'react-icons/fi';

type Props = {
  roomCode: string;
  roomName: string;
  isOpen: boolean;
  onClose: () => void;
  onClickCopy: () => void;
};

export function JoinRoomModal({
  isOpen,
  onClose,
  roomCode,
  roomName,
  onClickCopy,
}: Props) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
      <ModalOverlay />
      <ModalContent
        backgroundColor='#171717'
        borderColor='rgba(255, 255, 255, 0.4)'
        borderWidth='1px'
        borderRadius='24px'
        mx={{
          base: 4,
          md: 0,
        }}>
        <ModalCloseButton
          mt={2}
          cursor='pointer'
          onClick={onClose}
          zIndex={5}
        />
        <ModalBody p={0} position='relative' overflow='hidden'>
          <Flex flexDir='column' gap={2} p={6}>
            <Text fontSize='32px' fontWeight={600}>
              Invite {roomName} To Server
            </Text>
            <Text fontSize='16px' fontWeight={400} opacity={0.5}>
              Let&apos;s add the room and have a great mocha time
            </Text>
            <Grid templateColumns='repeat(2, 1fr)'>
              <GridItem colSpan={{ base: 2, md: 1 }}>
                <Flex flexDir='column' position='relative'>
                  <Image
                    src='/assets/images/join-room-modal-text-flare.svg'
                    alt='flare'
                    position='absolute'
                    zIndex={-1}
                  />
                  <Flex py={10} pl={8}>
                    <Icon as={PlusIcon} fontSize='56px' />
                  </Flex>
                  <Flex flexDir='column' mt={-2}>
                    <Text fontWeight={700}>First copy the room id below</Text>
                    <Flex
                      flexDir='row'
                      alignItems='center'
                      gap={2}
                      cursor='pointer'
                      onClick={onClickCopy}>
                      <Icon as={CopyIcon} fontSize='20px' opacity={0.8} />
                      <Text fontWeight={400} fontSize='20px' opacity={0.6}>
                        {roomCode}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </GridItem>
              <GridItem colSpan={{ base: 2, md: 1 }}>
                <Flex flexDir='column' position='relative'>
                  <Image
                    src='/assets/images/join-room-modal-text-flare.svg'
                    alt='flare'
                    position='absolute'
                    zIndex={-1}
                  />
                  <Flex py={10} pl={8}>
                    <Icon as={TypeIcon} fontSize='56px' />
                  </Flex>
                  <Flex flexDir='column' mt={-2}>
                    <Text fontWeight={400}>
                      Type{' '}
                      <Text as='span' fontWeight={700}>
                        /room join {'<room_id>'}
                      </Text>{' '}
                      on your bot, to connect your channel to the room. Voila
                      you’re done
                    </Text>
                  </Flex>
                </Flex>
              </GridItem>
            </Grid>
          </Flex>
          <Image
            src={
              isMobile
                ? '/assets/images/join-room-modal-bg-flare-mobile.svg'
                : '/assets/images/join-room-modal-bg-flare-desktop.svg'
            }
            alt='flare'
            position='absolute'
            zIndex={-1}
            bottom={0}
            objectFit='cover'
            width='100%'
            borderBottomRadius='24px'
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
