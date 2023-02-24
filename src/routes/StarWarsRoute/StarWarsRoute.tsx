import { useEffect } from 'react';
import { Button } from '../../components/Button/Button';
import { useTitle } from '../../hooks/title';
import { useStarWarsStore } from '../../stores/star-wars.store';
import { Uuid } from '../../types/uuid.type';

import styles from './StarWarsRoute.module.scss';

export const StarWarsRoute = (): JSX.Element => {
  const { people, init, hide } = useStarWarsStore();
  useTitle('Star Wars');

  const handleHide = (id: Uuid): void => {
    hide(id);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <h1>Star Wars People</h1>

      <div className={styles.container}>
        <ul className={styles.people}>
          {people.map((person) => (
            <li className={styles.person} key={person.name}>
              {person.name}
              <Button onClick={() => handleHide(person.name)}>Hide</Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
