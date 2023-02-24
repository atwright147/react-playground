import classNames from 'classnames';
import { Button } from '../../components/Button/Button';
import { Checkbox } from '../../components/fields/Checkbox/Checkbox';
import { useTitle } from '../../hooks/title';
import { useTodoStore } from '../../stores/todos.store';
import { Uuid } from '../../types/uuid.type';

import styles from './TodosRoute.module.scss';

export const TodosRoute = (): JSX.Element => {
  const { add, todos, toggleDone, remove } = useTodoStore();
  useTitle('Todos');

  const handleChange = (id: Uuid): void => {
    toggleDone(id);
  }

  const handleRemove = (id: Uuid): void => {
    remove(id);
  }

  const handleSubmit = (values: any): void => {
    add(values.description);
  }

  return (
    <>
      <h1>Todos</h1>

      <div className={styles.container}>
        <ul className={styles.todos}>
          {todos.map((todo) => (
            <li className={styles.todo} key={todo.id}>
              <Checkbox
                label={todo.description}
                id={todo.id}
                name={todo.id}
                className={classNames({ done: todo.done })}
                onChange={() => handleChange(todo.id)}
                checked={todo.done}
              />

              <Button onClick={() => handleRemove(todo.id)}>Remove</Button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
