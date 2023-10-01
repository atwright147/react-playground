import { useContext } from 'react';
import classNames from 'classnames';
import { Button } from '../../components/Button/Button';
import { Checkbox } from '../../components/fields/Checkbox/Checkbox';
import { TodosContext } from './TodosContext';

import styles from './TodosWithContextRoute.module.scss';

export const Todos = (): JSX.Element => {
  const { todos, setTodos } = useContext(TodosContext);

  return (
    <>
      <h1>Todos</h1>
      <p>Use Context to manage state for todos.</p>

      <pre>{JSON.stringify(todos, null, 2)}</pre>

      <div className={styles.container}>
        <ul className={styles.todos}>
          {todos.map((todo) => (
            <li className={styles.todo} key={todo.id}>
              <Checkbox
                label={todo.description}
                id={todo.id}
                name={todo.id}
                className={classNames({ done: todo.done })}
                // onChange={() => handleChange(todo.id)}
                checked={todo.done}
              />

              {/* <Button onClick={() => handleRemove(todo.id)}>Remove</Button> */}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
