import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

import { Todo } from '../types/todo.type';
import { Uuid } from '../types/uuid.type';

export interface State {
  todos: Todo[],
  toggleDone: (id: Uuid) => void,
  add: (description: Todo['description']) => void,
  remove: (id: Uuid) => void,
  empty: () => void,
}

const initialTodos: Todo[] = [
  {
    id: uuidv4(),
    description: 'Lorem ipsum dolor sit amet',
    done: false,
  },
  {
    id: uuidv4(),
    description: 'Todo Number 2',
    done: true,
  },
];

export const useTodoStore = create<State>((set, get) => ({
  todos: initialTodos,
  toggleDone: (id) => {
    set((state) => ({
      todos: state.todos.map((todo) => (
        todo.id === id
          ? ({ ...todo, done: !todo.done } as Todo)
          : todo
      )),
    }));
  },
  add: (description) => {
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: uuidv4(),
          description,
          done: false,
        },
      ]
    }));
  },
  remove: (id) => {
    set((state) => {
      const todos = state.todos.filter((todo) => todo.id !== id);
      return { todos };
    });
  },
  empty: () => {
    // set((state: State) => {
    //   const todos = [];
    //   return { todos };
    // });
  },
}));
