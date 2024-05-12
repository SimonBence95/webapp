import { useCallback } from 'react';
import { Potter, PotterSortType, RawPotter,  } from '../models';
import { PotterResults } from './potter-state';
import { useAuthContext } from '../auth/auth.context';

const BASE_URL = 'http://localhost:5000';

export interface PotterSearchParams {
  search?: string;
  orderBy?: PotterSortType;
}

const createPotter = (potterData: RawPotter): Potter => {
  return {
    ...potterData,
    release_date: new Date(potterData.release_date),
  };
};

export const usePotterApi = () => {
  const { authToken } = useAuthContext();

  const getPotter = useCallback(async (potterId: string): Promise<Potter | null> => {
    const response = await fetch(`${BASE_URL}/potter/${potterId}`);
      if (!response.ok) {
        // what to do now?
        return null;
      }
      const potterData = await response.json();
      return createPotter(potterData);
  }, []);

  const searchPotter = useCallback(async (searchParams: PotterSearchParams): Promise<PotterResults> => {
    const queryParams = new URLSearchParams(searchParams as Record<string, string>);
    const response = await fetch(`${BASE_URL}/potter?${queryParams}`);
    const { data, total } = await response.json();
    return {
      potter: data.map(createPotter),
      total,
    };
  }, []);

  const deletePotter = useCallback(async (potterId: string): Promise<boolean> => {
    if (!authToken) {
      throw new Error('Hozzáférés megtagadva');
    }
    const response = await fetch(`${BASE_URL}/potter/${potterId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${authToken}` },
    });
    return response.ok;
  }, [authToken]);

  const addPotter = useCallback(async (potter: Potter): Promise<Potter> => {
    if (!authToken) {
      throw new Error('Hozzáférés megtagadva');
    }
    const response = await fetch(`${BASE_URL}/potter`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(potter),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.message);
    }
    return createPotter(result);
  }, [authToken]);

  const editPotter = useCallback(async (potter: Potter): Promise<Potter> => {
    if (!authToken) {
      throw new Error('Hozzáférés megtagadva');
    }
    const response = await fetch(`${BASE_URL}/potter`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(potter),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result?.message);
    }
    return createPotter(result);
  }, [authToken]);

  return {
    getPotter,
    searchPotter,
    deletePotter,
    addPotter,
    editPotter,
  };

};