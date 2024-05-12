import React, { FC } from 'react';
import { Flex, Menu, MenuButton, MenuItem, MenuList, Text, useDisclosure } from '@chakra-ui/react';
import { PotterSortType, SORT } from '../../models';
import { UpDownIcon } from '@chakra-ui/icons';

export interface SortPotterProps {
  sortType: PotterSortType;
  onChange: (sortType: PotterSortType) => void;
}

export const SortPotter: FC<SortPotterProps> = ({ sortType, onChange }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Flex alignItems="center" gap="8" marginBottom="6">
      <Text
        as="label"
        sx={{
          fontSize: "md",
          letterSpacing: "0.8888889px",
          textTransform: "uppercase",
          opacity: 0.6,
        }}
      >
        Sort by
      </Text>
      <Menu onClose={onClose} onOpen={onOpen} isOpen={isOpen} variant="input">
        <MenuButton>
          {SORT[sortType]}
          <UpDownIcon color="text.highlighted" marginLeft={3} />
        </MenuButton>
        <MenuList bgColor="background.dark">
          <MenuItem onClick={() => onChange(PotterSortType.RELEASE_DATE_DESC)}>Release date</MenuItem>
          <MenuItem onClick={() => onChange(PotterSortType.TITLE_ASC)}>Title</MenuItem>
          <MenuItem onClick={() => onChange(PotterSortType.RATING_DESC)}>Best first</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};
