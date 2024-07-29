export interface Todo {
  id: string;
  description: string;
  done: boolean;
}

export const isTodo = (todo: any): todo is Todo => {
  return typeof todo.id === 'string' && typeof todo.description === 'string' && typeof todo.done === 'boolean';
};
