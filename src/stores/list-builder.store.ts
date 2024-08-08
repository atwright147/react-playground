import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import type { Item } from '../components/ListBuilder/ListBuilder';

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
}

export const useListBuilderStore = create<State>()(
  devtools(
    (set) => ({
      available: [],
      selected: [],
      availableChecked: [],
      selectedChecked: [],
      initAvailable: (items: Item[]) => {
        set({ available: items });
      },
      initSelected: (items: Item[]) => {
        set({ selected: items });
      },
      setAvailableChecked: (items: Item[]) => {
        set((state) => ({ availableChecked: [...state.availableChecked, ...items] }));
      },
      removeAvailableChecked: (items: Item[]) => {
        set((state) => ({ availableChecked: state.availableChecked.filter((item) => !items.includes(item)) }));
      },
      setSelectedChecked: (items: Item[]) => {
        set((state) => ({ selectedChecked: [...state.selectedChecked, ...items] }));
      },
      removeSelectedChecked: (items: Item[]) => {
        set((state) => ({ selectedChecked: state.selectedChecked.filter((item) => !items.includes(item)) }));
      },
      addAvailable: (items: Item[]) => {
        set((state) => ({
          available: [...state.available, ...state.selected.filter((item) => items.includes(item))],
          selected: state.selected.filter((item) => !items.includes(item)),
        }));
      },
      addSelected: (items: Item[]) => {
        set((state) => ({
          selected: [...state.selected, ...state.available.filter((item) => items.includes(item))],
          available: state.available.filter((item) => !items.includes(item)),
        }));
      },
    }),
    {
      name: 'ListBuilderStore',
      enabled: true,
    },
  ),
);
