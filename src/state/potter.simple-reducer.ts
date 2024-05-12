//simple version
import { Reducer } from 'react';
import { Potter, PotterSortType } from '../models';

export interface PotterState {
  potter: Potter[];
  total: number;
  search: string;
  orderBy: PotterSortType;
}

export const INITIAL_STATE: PotterState = {
  potter: [],
  total: 0,
  search: '',
  orderBy: PotterSortType.RATING_DESC,
};

type PotterReducer = Reducer<PotterState, Partial<PotterState>>;

export const potterReducer: PotterReducer = (state, changedParams) => {
  return ({
    ...state,
    ...changedParams,
  });
}