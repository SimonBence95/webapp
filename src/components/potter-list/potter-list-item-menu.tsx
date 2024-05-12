import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react';
import { FC } from 'react';
import { usePotterApi } from '../../state/use-potter-api';
import { Potter } from '../../models';
import { usePotterContext } from '../../state';

export interface PotterListItemMenuProps {
  potter: Potter;
}

export const PotterListItemMenu: FC<PotterListItemMenuProps> = ({ potter }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { deletePotter } = usePotterApi();
  const { openPotterEditor } = usePotterContext();

  return (
    <Box position="absolute" zIndex="10" top="2" right="2">
      <Menu onClose={onClose} onOpen={onOpen} isOpen={isOpen} placement="bottom-end">
        <MenuButton as={IconButton} icon={<HamburgerIcon color="text.highlighted" />} variant="secondary" />
        <MenuList>
          <MenuItem onClick={() => {openPotterEditor(potter)}}>Edit potter</MenuItem>
          <MenuItem onClick={() => {deletePotter(`${potter.id}`)}}>Delete potter</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
};