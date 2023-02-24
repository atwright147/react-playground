import { create } from 'zustand';

import { Person, SwapiResponse } from '../types/swapi.types';

export interface State {
  people: Person[],
  init: () => Promise<void>,
  hide: (name: string) => void,
}

const SWAPI_BASE_URL = 'https://swapi.dev/api';

const initialState: Person[] = [];

export const useStarWarsStore = create<State>((set, get) => ({
  people: initialState,
  init: async () => {
    const request = await fetch(`${SWAPI_BASE_URL}/people`);
    const response: SwapiResponse<Person[]> = await request.json();
    const people = response.results;

    set({ people });
  },
  hide: (name) => {
    set((state) => {
      const people = state.people.filter((person) => person.name !== name);
      return { people };
    });
  },
}));
