import React, { FC } from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { Potter } from '../../models';
import { PotterListItem } from './potter-list-item';

export interface PotterListProps {
  potter: Potter[];
}

export const PotterList: FC<PotterListProps> = ({ potter }) => (
  <Grid
    sx={{
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 12,
    }}
  >
    {potter.map(
      (potter) => (
        <GridItem key={potter.id}>
          <PotterListItem potter={potter} />
        </GridItem>
      )
    )}
  </Grid>
);