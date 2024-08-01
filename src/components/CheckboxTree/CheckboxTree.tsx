import { type FC, useState } from 'react';

import { useCheckboxTreeStore } from '../../stores/checkboxtree.store';
import type { Uuid } from '../../types/uuid.type';
import { Checkbox } from '../fields/Checkbox/Checkbox';
import styles from './CheckboxTree.module.scss';

export interface Item {
  id: Uuid;
  name: string;
  children?: Item[];
}

interface Props {
  items: Item[];
}

export const CheckboxTree: FC<Props> = ({ items }): JSX.Element => {
  const { selected, addSelected, removeSelected, isSelected, empty } = useCheckboxTreeStore((store) => ({
    selected: store.selected,
    addSelected: store.addSelected,
    removeSelected: store.removeSelected,
    isSelected: store.isSelected,
    empty: store.empty,
  }));
  const [parentCheckedState, setParentCheckedState] = useState<Record<Uuid, boolean>>({});

  const handleParentChange = (event: React.ChangeEvent<HTMLInputElement>, parentId: Uuid): void => {
    const children = items.find((item) => item.id === parentId)?.children;

    if (event.target.checked) {
      setParentCheckedState((prev) => ({ ...prev, [parentId]: true }));
    } else {
      setParentCheckedState((prev) => ({ ...prev, [parentId]: false }));
    }

    if (children) {
      const ids = children.map((child) => child.id);
      if (event.target.checked) {
        addSelected(ids);
      } else {
        removeSelected(ids);
      }
    }
  };

  const hasAllChildrenChecked = (parentId: Uuid): boolean => {
    const children = items.find((item) => item.id === parentId)?.children;
    if (children) {
      const ids = children.map((child) => child.id);
      const checked = selected.filter((id) => ids.includes(id));
      return checked.length === ids.length;
    }
    return false;
  };

  const isIndeterminate = (parentId: Uuid): boolean => {
    const children = items.find((item) => item.id === parentId)?.children;
    if (children) {
      const ids = children.map((child) => child.id);
      const checked = selected.filter((id) => ids.includes(id));
      return checked.length > 0 && checked.length < ids.length;
    }
    return false;
  };

  const handleChildChange = (event: React.ChangeEvent<HTMLInputElement>, id: Uuid): void => {
    if (event.target.checked) {
      addSelected([id]);
    } else {
      removeSelected([id]);
    }
  };

  return (
    <>
      <pre>{JSON.stringify(selected.length)}</pre>

      <div className={styles.box}>
        {items.map((item) => (
          <div key={item.id} className={styles.group}>
            <div className={styles.field}>
              <Checkbox
                label={item.name}
                name={item.name}
                id={item.id}
                checked={hasAllChildrenChecked(item.id)}
                onChange={(event) => handleParentChange(event, item.id)}
                indeterminate={isIndeterminate(item.id)}
              />
              <label htmlFor={item.id}>{item.name}</label>
            </div>

            <div className={styles.children}>
              {item.children?.map((child) => (
                <div key={child.id} className={styles.field}>
                  <Checkbox
                    label={child.name}
                    name={child.name}
                    id={child.id}
                    checked={isSelected(child.id)}
                    onChange={(event) => handleChildChange(event, child.id)}
                  />
                  <label htmlFor={child.id}>{child.name}</label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};