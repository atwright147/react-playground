import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import { FC, useState } from 'react';
import styles from './DragAndDrop.module.scss';
import classnames from 'classnames';

interface Item {
  id: number,
  name: string,
}

interface ItemCardProps extends Item {
  draggable?: boolean,
}

// custom type guard
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
const isItem = (item: any): item is Item => {
  return !!Object.values(item).length &&
    typeof item.id === 'number' &&
    typeof item.name === 'string';
}

// draggable
export const ItemCard: FC<ItemCardProps> = ({ id, name }): JSX.Element => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className={classnames(styles.itemCard, {
      [styles.isDragging]: isDragging,
    })} ref={dragRef}>
      {name}
    </div>
  )
}

const INITIAL_STOCK: ItemCardProps[] = [
  { id: 1, name: 'dog' },
  { id: 2, name: 'cat' },
  { id: 3, name: 'fish' },
  { id: 4, name: 'hamster' },
]

export const Basket = (): JSX.Element => {
  const [allItems, setAllItems] = useState<Item[]>([...INITIAL_STOCK]);
  const [stock, setStock] = useState<Item[]>([...INITIAL_STOCK]);
  const [basket, setBasket] = useState<Item[]>([]);
  const [{ isOver }, dropRef] = useDrop({
    accept: 'item',
    drop: (subject: Item) => {
      const itemToMove = allItems.find(item => item.id === subject.id);

      if (isItem(itemToMove)) {
        setBasket(prevState => ([ ...prevState, itemToMove ]));
        setStock(prevState => prevState.filter(prev => prev.id !== subject.id));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <>
      <div className={styles.stock}>
        {stock.map((item) => <ItemCard draggable key={item.id} id={item.id} name={item.name} />)}
      </div>

      <div className={styles.basket} ref={dropRef}>
        {basket.map((item) => <ItemCard key={item.id} id={item.id} name={item.name} />)}
        {isOver && <div>Drop Here!</div>}
      </div>
    </>
  )
}

export const DragAndDrop = (): JSX.Element => (
  <DndProvider backend={HTML5Backend}>
    <Basket />
  </DndProvider>
);
