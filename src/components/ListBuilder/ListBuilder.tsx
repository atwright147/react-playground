import { type FC, useEffect } from 'react';

import { useListBuilderStore } from '../../stores/list-builder.store';
import type { Uuid } from '../../types/uuid.type';
import { List } from './List';
import styles from './ListBuilder.module.scss';

export interface Item {
  id: Uuid;
  name: string;
}

interface Props {
  availableItems: Item[];
  selectedItems: Item[];
}

export const ListBuilder: FC<Props> = ({ availableItems, selectedItems }): JSX.Element => {
  const { available, selected, availableChecked, selectedChecked, initAvailable, initSelected, addAvailable, addSelected } =
    useListBuilderStore((store) => ({
      available: store.available,
      selected: store.selected,
      availableChecked: store.availableChecked,
      selectedChecked: store.selectedChecked,
      initAvailable: store.initAvailable,
      initSelected: store.initSelected,
      addAvailable: store.addAvailable,
      addSelected: store.addSelected,
    }));

  // biome-ignore lint/correctness/useExhaustiveDependencies: only run once
  useEffect(() => {
    console.info('ListBuilder');
    initAvailable(availableItems);
    initSelected(selectedItems);
  }, []);

  const handleAdd = () => {
    addSelected(availableChecked);
  };

  const handleRemove = () => {
    addAvailable(selectedChecked);
  };

  return (
    <>
      <section className={styles.listBuilder}>
        <div className={styles.listWrapper}>
          <h2>Available</h2>
          <List items={available} type="available" />
        </div>

        <div className={styles.controls}>
          <button type="button" onClick={handleAdd}>
            Add
          </button>
          <button type="button" onClick={handleRemove}>
            Remove
          </button>
        </div>

        <div className={styles.listWrapper}>
          <h2>Selected</h2>
          <List items={selected} type="selected" />
        </div>
      </section>

      <hr />

      <details>
        <summary>Debug List</summary>
        <pre>{JSON.stringify({ available, selected }, null, 2)}</pre>
      </details>
    </>
  );
};
