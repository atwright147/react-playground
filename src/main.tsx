import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'normalize.css';

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

import './index.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'drag-and-drop',
        element: <DragAndDrop />,
      },
      {
        path: 'products',
        element: <Products />,
      },
      {
        path: 'todos',
        element: <TodosRoute />,
      },
      {
        path: 'starwars',
        element: <StarWarsRoute />,
      },
      {
        path: 'reactflow',
        element: <ReactFlowRoute />,
      },
      {
        path: 'components/accordion',
        element: <AccordionRoute />,
      },
      {
        path: 'components/button',
        element: <ButtonsRoute />,
      },
      {
        path: 'components/fields',
        element: <FieldsRoute />,
      },
      {
        path: 'components/form',
        element: <FormRoute />,
      },
      {
        path: 'components/popover',
        element: <PopoverRoute />,
      },
      {
        path: 'components/checkbox-tree',
        element: <CheckboxTreeRoute />,
      },
      {
        path: 'components/list-builder',
        element: <ListBuilderRoute />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
