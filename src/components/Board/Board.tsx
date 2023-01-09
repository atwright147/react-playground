import { FC, ReactNode } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import styles from './Board.module.scss';

interface Props {
  children: ReactNode,
}

export const Board: FC<Props> = ({ children }): JSX.Element => (
  <DndProvider backend={HTML5Backend}>
    <div className={styles.board}>
      {children}
    </div>
  </DndProvider>
);
