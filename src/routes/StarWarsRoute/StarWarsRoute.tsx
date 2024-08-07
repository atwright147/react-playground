import { useEffect } from 'react';
import { Button } from '../../components/Button/Button';
import { useTitle } from '../../hooks/title';
import { useStarWarsStore } from '../../stores/star-wars.store';
import type { Uuid } from '../../types/uuid.type';

import styles from './StarWarsRoute.module.scss';

export const StarWarsRoute = (): JSX.Element => {
  const { people, init, hide } = useStarWarsStore();
  useTitle('Star Wars');

  const handleHide = (id: Uuid): void => {
    hide(id);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <h1>Star Wars People</h1>
      <p>
        Demo of using{' '}
        <a href="https://docs.pmnd.rs/zustand/getting-started/introduction" target="_blank" rel="noreferrer noopener">
          Zustand
        </a>{' '}
        to manage server state and{' '}
        <a href="https://github.com/sindresorhus/ky#hooks" target="_blank" rel="noreferrer noopener">
          Ky.js Hooks
        </a>{' '}
        to control the state of a spinner.
      </p>

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
