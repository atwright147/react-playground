import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { Uuid } from '../types/uuid.type';

export interface State {
  selected: Uuid[];
  addSelected: (id: Uuid[]) => void;
  removeSelected: (id: Uuid[]) => void;
  isSelected: (id: Uuid) => boolean;
  empty: () => void;
}

export const useCheckboxTreeStore = create<State>()(
  devtools(
    (set, get) => ({
      selected: [],
      addSelected: (ids: Uuid[]) => {
        set((state) => ({ selected: [...state.selected, ...ids] }));
      },
      removeSelected: (ids: Uuid[]) => {
        set((state) => ({ selected: state.selected.filter((id) => !ids.includes(id)) }));
      },
      isSelected: (id: Uuid) => get().selected.includes(id),
      empty: () => set({ selected: [] }),
    }),
    {
      name: 'CheckboxTreeStore',
      enabled: true,
    },
  ),
);
