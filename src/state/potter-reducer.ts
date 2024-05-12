import { Reducer } from 'react';
import { Potter, PotterSortType } from '../models';
import { PotterResults, PotterState, PotterStateActions } from './potter-state';

export interface PayloadAction<P> {
  type: keyof PotterStateActions;
  payload: P;
};

const potterStateReducer = {
  search: (
    state: PotterState,
    action: PayloadAction<string>
  ): PotterState => ({
    ...state,
    query: action.payload,
  }),
  setResults: (
    state: PotterState,
    action: PayloadAction<PotterResults>
  ): PotterState => ({
    ...state,
    ...action.payload,
  }),
  changeOrder: (
    state: PotterState,
    action: PayloadAction<PotterSortType>
  ): PotterState => ({
    ...state,
    orderBy: action.payload,
  }),
  openPotterEditor: (
    state: PotterState,
    action: PayloadAction<Potter | null>
  ): PotterState => ({
    ...state,
    editor: {
      showModal: true,
      potter: action.payload,
    },
  }),
  closeEditor: (
    state: PotterState,
    action: PayloadAction<any>
  ): PotterState => ({
    ...state,
    editor: {
      showModal: false,
      potter: null,
    },
  }),
};

type ActionName = keyof typeof potterStateReducer;
type ReducerParams = Parameters<(typeof potterStateReducer)[ActionName]>;

export type PotterStateReducer = Reducer<ReducerParams[0], ReducerParams[1]>;

export const potterReducer: PotterStateReducer = (state: PotterState, action: ReducerParams[1]) => {
  if (action && !(action.type in potterStateReducer)) {
    throw new Error(`Cannot use action '${action.type}' in CopyPageReducer`);
  }
  return potterStateReducer[action.type as ActionName](state, action as PayloadAction<any>);
};
