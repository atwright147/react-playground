import { FC, ReactNode } from 'react';
import { useDrag } from 'react-dnd'
import styles from './DraggableBox.module.scss';

interface Props {
  children?: ReactNode,
}

export const DraggableBox: FC<Props> = ({ children }): JSX.Element => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'box',
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()

      if (item && dropResult) {
        console.info('end', item, dropResult);
      }
    }
  }))

  return (
    <div
      ref={drag}
      className={styles.box}
    >
      {children}
    </div>
  )
}
