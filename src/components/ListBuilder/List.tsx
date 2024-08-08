import type { FC } from 'react';
import type { Item } from './ListBuilder';

import { useListBuilderStore } from '../../stores/list-builder.store';
import styles from './List.module.scss';

interface Props {
  items: Item[];
  type: 'available' | 'selected';
}

export const List: FC<Props> = ({ items, type }): JSX.Element => {
  const { setAvailableChecked, removeAvailableChecked, setSelectedChecked, removeSelectedChecked } = useListBuilderStore((store) => ({
    setAvailableChecked: store.setAvailableChecked,
    removeAvailableChecked: store.removeAvailableChecked,
    setSelectedChecked: store.setSelectedChecked,
    removeSelectedChecked: store.removeSelectedChecked,
  }));

  const handleChangeAvailable = (event: React.ChangeEvent<HTMLInputElement>, item: Item): void => {
    if (event.target.checked) {
      setAvailableChecked([item]);
    } else {
      removeAvailableChecked([item]);
    }
  };

  const handleChangeSelected = (event: React.ChangeEvent<HTMLInputElement>, item: Item): void => {
    if (event.target.checked) {
      setSelectedChecked([item]);
    } else {
      removeSelectedChecked([item]);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, item: Item): void => {
    if (type === 'available') {
      handleChangeAvailable(event, item);
    } else {
      handleChangeSelected(event, item);
    }
  };

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.listItem}>
          <input type="checkbox" id={item.id} onChange={(event) => handleChange(event, item)} hidden />
          <label htmlFor={item.id} className={styles.label}>
            {item.name}
          </label>
        </li>
      ))}
    </ul>
  );
};
