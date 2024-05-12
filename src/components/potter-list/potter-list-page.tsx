import React, { useEffect } from 'react';
import { Box, Container} from '@chakra-ui/react';
import { PotterList } from './potter-list';
import { SortPotter } from './sort-potter';
import { usePotterContext } from '../../state';
import { usePotterApi } from '../../state/use-potter-api';

export const PotterListPage = () => {
  const { changeOrder, setResults, query, orderBy, potter } = usePotterContext();
  const { searchPotter } = usePotterApi();

  useEffect(() => {
    const loadPotter = async () => {
      const results = await searchPotter({ search: query, orderBy });
      setResults(results);
    };
    loadPotter();
  }, [query, orderBy, setResults]);

  return (
    <Box width="full" backgroundColor="background.dark" marginTop="5">
      <Container maxWidth="6xl" paddingY="5">
        <SortPotter sortType={orderBy} onChange={changeOrder} />
        {potter && <PotterList potter={potter}/>}
      </Container>
    </Box>
  );
};
