import type { RouteObject } from 'react-router-dom';

import { AccordionRoute } from './routes/AccordionRoute/AccordionRoute';
import { ButtonsRoute } from './routes/ButtonsRoute/ButtonsRoute';
import { CheckboxTreeRoute } from './routes/CheckboxTree/CheckboxTreeRoute';
import { DragAndDrop } from './routes/DragAndDrop/DragAndDrop';
import { ErrorPage } from './routes/Error/Error';
import { FieldsRoute } from './routes/FieldsRoute/FieldsRoute';
import { FormRoute } from './routes/FormRoute/FormRoute';
import { Home } from './routes/Home/Home';
import { ListBuilderRoute } from './routes/ListBuilderRoute/ListBuilderRoute';
import { PopoverRoute } from './routes/PopoverRoute/PopoverRoute';
import { Products } from './routes/Products/Products';
import { ReactFlowRoute } from './routes/ReactFlowRoute/ReactFlowRoute';
import { Root } from './routes/Root/Root';
import { StarWarsRoute } from './routes/StarWarsRoute/StarWarsRoute';
import { TodosRoute } from './routes/Todos/TotosRoute';

export type NamedRouteObject = RouteObject & {
  name?: string;
  children?: NamedRouteObject[]; // Ensure that children are also of type NamedRouteObject
  path: string;
};

export const routes: NamedRouteObject[] = [
  {
    name: 'Root',
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        name: 'Home',
        path: '/',
        element: <Home />,
      },
      {
        name: 'Drag and Drop',
        path: 'drag-and-drop',
        element: <DragAndDrop />,
      },
      {
        name: 'Products',
        path: 'products',
        element: <Products />,
      },
      {
        name: 'Todos',
        path: 'todos',
        element: <TodosRoute />,
      },
      {
        name: 'Star Wars',
        path: 'starwars',
        element: <StarWarsRoute />,
      },
      {
        name: 'React Flow',
        path: 'reactflow',
        element: <ReactFlowRoute />,
      },
      {
        name: 'Accordion Component',
        path: 'components/accordion',
        element: <AccordionRoute />,
      },
      {
        name: 'Button Component',
        path: 'components/button',
        element: <ButtonsRoute />,
      },
      {
        name: 'Field Components',
        path: 'components/fields',
        element: <FieldsRoute />,
      },
      {
        name: 'Form Component',
        path: 'components/form',
        element: <FormRoute />,
      },
      {
        name: 'Popover Component',
        path: 'components/popover',
        element: <PopoverRoute />,
      },
      {
        name: 'Checkbox Tree Component',
        path: 'components/checkbox-tree',
        element: <CheckboxTreeRoute />,
      },
      {
        name: 'List Builder Component',
        path: 'components/list-builder',
        element: <ListBuilderRoute />,
      },
    ],
  },
];
