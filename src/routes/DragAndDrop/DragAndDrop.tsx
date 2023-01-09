import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const DragAndDrop = (): JSX.Element => (
  <DndProvider backend={HTML5Backend}>
    <p>DragAndDrop works!</p>
  </DndProvider>
);  
