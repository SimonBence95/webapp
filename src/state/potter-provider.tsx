import React, { FC, PropsWithChildren, useMemo, useReducer } from 'react';
import { PotterContextProvider } from './potter-context';
import { INITIAL_STATE, PotterResults, PotterStateActions } from './potter-state';
import { PotterStateReducer, potterReducer } from './potter-reducer';
import { Potter, PotterSortType } from '../models';

export const PotterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer<PotterStateReducer>(potterReducer, INITIAL_STATE);

  const actions: PotterStateActions = useMemo(() => ({
    search: (query: string) => dispatch({ type: 'search', payload: query }),
    setResults: (results: PotterResults) => dispatch({ type: 'setResults', payload: results }),
    changeOrder: (order: PotterSortType) => dispatch({ type: 'changeOrder', payload: order }),
    openPotterEditor: (potter: Potter | null) => dispatch({ type: 'openPotterEditor', payload: potter }),
    closeEditor: () => dispatch({ type: 'closeEditor', payload: undefined }),
  }), [dispatch]);

  return (
    <PotterContextProvider value={{
      ...state,
      ...actions,
    }}>
      {children}
    </PotterContextProvider>
  );
};
