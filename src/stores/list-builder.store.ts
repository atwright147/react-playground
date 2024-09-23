import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { Item } from '../components/ListBuilder/ListBuilder';
import type { Uuid } from '../types/uuid.type';

export interface State {
  available: Item[];
  selected: Item[];
  availableChecked: Item[];
  selectedChecked: Item[];
  initAvailable: (items: Item[]) => void;
  initSelected: (items: Item[]) => void;
  setAvailableChecked: (items: Item[]) => void;
  removeAvailableChecked: (items: Item[]) => void;
  setSelectedChecked: (items: Item[]) => void;
  removeSelectedChecked: (items: Item[]) => void;
  addAvailable: (items: Item[]) => void;
  addSelected: (items: Item[]) => void;
  isChecked: (id: Uuid) => boolean;
}

export const useListBuilderStore = create<State>()(
  devtools(
    (set, get) => ({
      available: [],
      selected: [],
      availableChecked: [],
      selectedChecked: [],
      initAvailable: (items) => {
        set({ available: items });
      },
      initSelected: (items) => {
        set({ selected: items });
      },
      setAvailableChecked: (items) => {
        set((state) => ({ availableChecked: [...state.availableChecked, ...items] }));
      },
      removeAvailableChecked: (items) => {
        set((state) => ({ availableChecked: state.availableChecked.filter((item) => !items.includes(item)) }));
      },
      setSelectedChecked: (items) => {
        set((state) => ({ selectedChecked: [...state.selectedChecked, ...items] }));
      },
      removeSelectedChecked: (items) => {
        set((state) => ({ selectedChecked: state.selectedChecked.filter((item) => !items.includes(item)) }));
      },
      addAvailable: (items) => {
        set((state) => ({
          available: [...state.available, ...state.selected.filter((item) => items.includes(item))],
          selected: state.selected.filter((item) => !items.includes(item)),
        }));
      },
      addSelected: (items) => {
        set((state) => ({
          selected: [...state.selected, ...state.available.filter((item) => items.includes(item))],
          available: state.available.filter((item) => !items.includes(item)),
        }));
      },
      isChecked: (id) => {
        return get().availableChecked.some((item) => item.id === id) || get().selectedChecked.some((item) => item.id === id);
      },
    }),
    {
      name: 'ListBuilderStore',
      enabled: true,
    },
  ),
);
