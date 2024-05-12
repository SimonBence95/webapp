import { Potter, PotterSortType } from '../models';

export interface PotterResults {
  potter: Potter[];
  total: number;
};

export interface PotterStateActions {
  search: (query: string) => void;
  setResults: (results: PotterResults) => void;
  changeOrder: (order: PotterSortType) => void;
  openPotterEditor: (potter: Potter | null) => void;
  closeEditor: () => void;
}

export interface PotterEditorState {
  showModal: boolean;
  potter: Potter | null;
}

export interface PotterState {
  potter: Potter[];
  total: number;
  query: string;
  orderBy: PotterSortType;
  editor: PotterEditorState;
}

export const INITIAL_STATE: PotterState = {
  potter: [],
  total: 0,
  query: '',
  orderBy: PotterSortType.RATING_DESC,
  editor: {
    showModal: false,
    potter: null,
  },
};
