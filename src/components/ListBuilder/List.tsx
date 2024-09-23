import { type FC, useState } from 'react';
import type { Item } from './ListBuilder';

import { useListBuilderStore } from '../../stores/list-builder.store';
import styles from './List.module.scss';

interface Props {
  items: Item[];
  type: 'available' | 'selected';
}

export const List: FC<Props> = ({ items, type }): JSX.Element => {
  const [lastChecked, setLastChecked] = useState<number>();
  const { setAvailableChecked, removeAvailableChecked, setSelectedChecked, removeSelectedChecked, isChecked } = useListBuilderStore(
    (store) => ({
      setAvailableChecked: store.setAvailableChecked,
      removeAvailableChecked: store.removeAvailableChecked,
      setSelectedChecked: store.setSelectedChecked,
      removeSelectedChecked: store.removeSelectedChecked,
      isChecked: store.isChecked,
    }),
  );

  const handleChangeAvailable = (checked: boolean, items: Item[], index: number): void => {
    if (checked) {
      setAvailableChecked(items);
    } else {
      removeAvailableChecked(items);
    }
  };

  const handleChangeSelected = (checked: boolean, items: Item[], index: number): void => {
    if (checked) {
      setSelectedChecked(items);
    } else {
      removeSelectedChecked(items);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, item: Item, index: number): void => {
    const checkedItems: Item[] = [];

    if ((event.nativeEvent as PointerEvent).shiftKey && lastChecked !== undefined) {
      const start = Math.min(lastChecked, index);
      const end = Math.max(lastChecked, index);
      for (let i = start; i <= end; i++) {
        checkedItems.push(items[i]);
      }
    } else {
      checkedItems.push(item);
    }

    console.info(checkedItems);

    if (type === 'available') {
      handleChangeAvailable(event.target.checked, checkedItems, index);
    } else {
      handleChangeSelected(event.target.checked, checkedItems, index);
    }

    setLastChecked(index);
  };

  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li key={item.id} className={styles.listItem}>
          <input type="checkbox" id={item.id} onChange={(event) => handleChange(event, item, index)} checked={isChecked(item.id)} hidden />
          <label htmlFor={item.id} className={styles.label}>
            {item.name}
          </label>
        </li>
      ))}
    </ul>
  );
};
