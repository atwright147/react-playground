import type { FC } from 'react';
import './App.css';

interface Props {
  title: string;
}

export const App: FC<Props> = ({ title }) => (
  <div className="App">
    <h1>{title}</h1>
  </div>
);
