import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import PageRoutes from './routes/PageRoutes';

import { Provider } from 'react-redux';
import store from './redux/store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PageRoutes />
    </Provider>
  </React.StrictMode>
);
