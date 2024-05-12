import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { FC } from 'react';
import { PotterEditorForm } from './potter-editor-form';
import { Potter } from '../../models';

export interface PotterEditorModalProps {
  potter: Potter | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (potter: Potter) => Promise<Potter>;
}

export const PotterEditorModal: FC<PotterEditorModalProps> = ({ isOpen, potter, onClose, onSubmit }) => (
  <Modal isOpen={isOpen} onClose={onClose} size="5xl">
    <ModalOverlay />
    <ModalContent padding={6}>
      <ModalHeader fontSize="4xl">
        {potter ? 'Film módosítása' : 'Film hozzáadása'}
      </ModalHeader>
      <ModalCloseButton size="sm" />
      <ModalBody marginBottom={6}>
        <PotterEditorForm potter={potter} onSubmit={onSubmit} onCancel={onClose} />
      </ModalBody>
    </ModalContent>
  </Modal>
);
