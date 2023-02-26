import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { client } from '../utils/api/api-client';
import { Person, SwapiResponse } from '../types/swapi.types';

export interface State {
  people: Person[],
  init: () => Promise<void>,
  hide: (name: string) => void,
}

const SWAPI_BASE_URL = 'https://swapi.dev/api';

const initialState: Person[] = [];

export const useStarWarsStore = create<State>()(
  devtools(
    (set, get) => ({
      people: initialState,
      init: async () => {
        const request = await client.get(`${SWAPI_BASE_URL}/people`);
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
    }),
  { enabled: true }),
);
