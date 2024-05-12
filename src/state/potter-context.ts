import { createContext, useContext } from 'react';
import { PotterState, PotterStateActions } from './potter-state';

export type PotterContext = PotterStateActions & PotterState;

export const createPotterContext = () => {
  const context = createContext<PotterContext | null>(null);

  const usePotterContext = () => {
    const ctx = useContext<PotterContext | null>(
      //@ts-ignore
      context as PotterContext
    );
    if (!ctx) {
      throw new Error('potterContext must be within a PotterContext component');
    }
    return ctx;
  };
  return [usePotterContext, context.Provider] as const;
};

export const [usePotterContext, PotterContextProvider] = createPotterContext();
