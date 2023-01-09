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

// Drag sources and drop targets only interact
// if they have the same string type.
// You may want to keep types in a separate file with
// the rest of your app's constants.
const itemTypes = {
  BOX: 'box'
}

function DraggableBox ({ dropped, setDropped }) {
  const [collectedProps, dragSourceRef, preview] = useDrag({
    item: { type: itemTypes.BOX },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      
      if (item && dropResult) {
        setDropped(true)
      }
    }
  })
  
  return (
    <div
      className="box"
      ref={dragSourceRef}
      style={{ backgroundColor: dropped ? 'lightsalmon' : 'salmon' }}
    >
      {dropped ? 'Yeah!' : 'Drag me'}
      <DragPreviewImage
        src="data:image/svg+xml;charset=UTF-8,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2222%22%20height%3D%2290%22%20viewBox%3D%220%200%2022%2090%22%20data-reactroot%3D%22%22%3E%3Cg%20fill%3D%22%23ffffff%22%20stroke%3D%22%23D818A5%22%20stroke-width%3D%222%22%3E%3Ccircle%20cy%3D%2211%22%20cx%3D%2211%22%20r%3D%2210%22%3E%3C%2Fcircle%3E%3Ccircle%20cy%3D%2241%22%20cx%3D%2211%22%20r%3D%2210%22%3E%3C%2Fcircle%3E%3Ccircle%20cy%3D%2271%22%20cx%3D%2211%22%20r%3D%2210%22%3E%3C%2Fcircle%3E%3C%2Fg%3E%3C%2Fsvg%3E"
        connect={preview}
      />
    </div>
  )
}

function DropBox () {
  const [{ canDrop, isOver }, dropRef] = useDrop({
    accept: itemTypes.BOX,
    collect: monitor => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver()
    })
  })
  
  const isActive = canDrop && isOver
  
  return (
    <div
      className="box"
      ref={dropRef}
      style={{ backgroundColor: 'gold' }}
    >
      {isActive ? 'Release to Drop' : 'Drag here'}
    </div>
  )
}

function ReactDndExample () {
  const [dropped, setDropped] = React.useState(false)
   
  return (
    <>
      <h1>React DnD example</h1>
      
      <DraggableBox dropped={dropped} setDropped={setDropped} />
 
      <DropBox />
    </>
  )  
}

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <ReactDndExample />
  </DndProvider>,
  document.getElementById('root')
)