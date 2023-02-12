import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import { FC, useState } from 'react';
import styles from './DragAndDrop.module.scss';
import classnames from 'classnames';

interface Pet {
  id: number,
  name: string,
}

interface PetCardProps extends Pet {
  draggable?: boolean,
}

// custom type guard
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
const isPet = (pet: any): pet is Pet => {
  return !!Object.values(pet).length &&
    typeof pet.id === 'number' &&
    typeof pet.name === 'string';
}

// draggable
export const PetCard: FC<PetCardProps> = ({ id, name }): JSX.Element => {
  const [{ isDragging }, dragRef] = useDrag({
    type: 'pet',
    item: { id, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className={classnames(styles.petCard, {
      [styles.isDragging]: isDragging,
    })} ref={dragRef}>
      {name}
    </div>
  )
}

const PETS: PetCardProps[] = [
  { id: 1, name: 'dog' },
  { id: 2, name: 'cat' },
  { id: 3, name: 'fish' },
  { id: 4, name: 'hamster' },
]

export const Basket = (): JSX.Element => {
  const [allPets, setAllPets] = useState<Pet[]>([...PETS]);
  const [filteredPets, setFilteredPets] = useState<Pet[]>([...PETS]);
  const [basket, setBasket] = useState<Pet[]>([]);
  const [{ isOver }, dropRef] = useDrop({
    accept: 'pet',
    drop: (item: Pet) => {
      const petToMove = allPets.find(pet => pet.id === item.id);

      if (isPet(petToMove)) {
        setBasket(prev => ([ ...prev, petToMove ]));
        setFilteredPets(prev => prev.filter(pet => pet.id !== item.id));
      }
      // setBasket((basket) => !basket.includes(item) ? [...basket, item] : basket);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <>
      <div className={styles.pets}>
        {
          filteredPets
            .map((pet) => <PetCard draggable key={pet.id} id={pet.id} name={pet.name} />)
        }
      </div>

      <div className={styles.basket} ref={dropRef}>
        {basket.map((pet) => <PetCard key={pet.id} id={pet.id} name={pet.name} />)}
        {isOver && <div>Drop Here!</div>}
      </div>

      <h1>Filtered Pets</h1>
      <pre>{JSON.stringify(filteredPets, null, 2)}</pre>
      <h1>Basket</h1>
      <pre>{JSON.stringify(basket, null, 2)}</pre>
    </>
  )
}

export const DragAndDrop = (): JSX.Element => (
  <DndProvider backend={HTML5Backend}>
    <Basket />
  </DndProvider>
);
