import { useTitle } from '../../hooks/title';
import { TodosProvider } from './TodosContext';
import { Todos } from './Todos';

export const TodosWithContextRoute = (): JSX.Element => {
  useTitle('Todos with Context');

  return (
    <TodosProvider>
      <Todos />
    </TodosProvider>
  );
};
