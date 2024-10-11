import { CopyIcon } from '@chakra-ui/icons';
import {
  Flex,
  IconButton,
  Kbd,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useClipboard,
} from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { FaCheck } from 'react-icons/fa';

interface DonationModalProps {
  walletAddress: string;
  modal: {
    isOpen: boolean;
    onClose: () => void;
  };
}

function DonationModal(props: DonationModalProps) {
  const {
    walletAddress,
    modal: { isOpen, onClose },
  } = props;
  const { t } = useTranslation();
  const { onCopy, hasCopied } = useClipboard(walletAddress);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('common:home.donate.title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex gap={4} flexDirection='column'>
            {t('common:home.donate.modal', { returnObjects: true }).map(
              (item) => (
                <Text key={`donate-modal-${item}`}>{item}</Text>
              ),
            )}
            <Flex gap={2} flexDirection='row'>
              <Kbd px={1} alignContent='center' w='full'>
                eth: {walletAddress}
              </Kbd>
              <IconButton
                aria-label='Copy Address'
                icon={hasCopied ? <FaCheck /> : <CopyIcon />}
                onClick={onCopy}
              />
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
}

export default DonationModal;
