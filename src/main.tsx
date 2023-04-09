import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Root } from './routes/Root/Root';
import { ErrorPage } from './routes/Error/Error';
import { Products } from './routes/Products/Products';
import { Home } from './routes/Home/Home';
import { DragAndDrop } from './routes/DragAndDrop/DragAndDrop';
import { AccordionRoute } from './routes/AccordionRoute/AccordionRoute';
import { ButtonsRoute } from './routes/ButtonsRoute/ButtonsRoute';
import { FieldsRoute } from './routes/FieldsRoute/FieldsRoute';
import { PopoverRoute } from './routes/PopoverRoute/PopoverRoute';
import { FormRoute } from './routes/FormRoute/FormRoute';
import { TodosRoute } from './routes/Todos/TotosRoute';
import { StarWarsRoute } from './routes/StarWarsRoute/StarWarsRoute';
import { ReactFlowRoute } from './routes/ReactFlowRoute/ReactFlowRoute';

import 'normalize.css';
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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
