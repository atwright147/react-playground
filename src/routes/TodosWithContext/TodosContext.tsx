import { ReactNode, createContext, useState } from 'react';

interface Todo {
  id: string;
  description: string;
  done: boolean;
}

interface ContextType {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

interface Props {
  children: ReactNode;
}

const initialState: ContextType = {
  todos: [],
  setTodos: () => {},
}

export const TodosContext = createContext<ContextType>(initialState);
TodosContext.displayName = 'TodosContext';

export const TodosProvider = ({ children }: Props): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: '1',
      description: 'Learn React',
      done: false,
    },
  ]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
}
