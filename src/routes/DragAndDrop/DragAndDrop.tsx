import { useDrop } from 'react-dnd';
import KeyboardBackend, { isKeyboardDragTrigger } from 'react-dnd-accessible-backend';
import { DndProvider, createTransition } from 'react-dnd-multi-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import { FC, useState } from 'react';
import styles from './DragAndDrop.module.scss';
import classnames from 'classnames';

const KeyboardTransition = createTransition("keydown", (event) => {
  if (!isKeyboardDragTrigger(event as KeyboardEvent)) return false;
  // This prevention keeps the first keyboard event from causing browser
  // bookmark shortcuts. This can't be done in the Backend because it only
  // receives a _cloned_ event _after_ this one has already propagated.
  event.preventDefault();
  return true;
});

const MouseTransition = createTransition("mousedown", (event) => {
  if (event.type.indexOf("touch") !== -1 || event.type.indexOf("mouse") === -1) return false;
  return true;
});

const DND_OPTIONS = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: "keyboard",
      backend: KeyboardBackend,
      context: { window, document },
      options: {
        announcerClassName: "announcer",
      },
      preview: true,
      transition: KeyboardTransition,
    },
  ],
};

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
    <div
      ref={dragRef}
      tabIndex={0}
      className={classnames(styles.itemCard, {
        [styles.isDragging]: isDragging,
      })
    }>
      {name}
    </div>
  )
}

const INITIAL_STOCK: ItemCardProps[] = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
];

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
      <h2>Stock</h2>
      <p>Press <code>Tab</code> to focus an item, then press <code>Ctrl+d</code> to &lsquo;pickup&rsquo; the item. Use the cursor key to actually drag the item</p>
      <div className={styles.stock}>
        {stock.map((item) => <ItemCard draggable key={item.id} id={item.id} name={item.name} />)}
      </div>

      <h2>Basket</h2>
      <div className={styles.basket} ref={dropRef}>
        {basket.map((item) => <ItemCard key={item.id} id={item.id} name={item.name} />)}
        {isOver && <div>Drop Here!</div>}
      </div>
    </>
  )
}

export const DragAndDrop = (): JSX.Element => (
  <DndProvider options={DND_OPTIONS}>
    <Basket />
  </DndProvider>
);
