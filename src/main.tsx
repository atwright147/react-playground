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
import { FormRoute } from './routes/FormRoute/FormRoute';

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
        path: 'components/accordion',
        element: <AccordionRoute />,
      },
      {
        path: 'components/button',
        element: <ButtonsRoute />,
      },
      {
        path: 'components/form',
        element: <FormRoute />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
