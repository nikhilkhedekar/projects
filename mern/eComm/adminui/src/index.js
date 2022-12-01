import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";

import './index.css';
import App from './App';
import { store } from "./store/store";
import 'mapbox-gl/dist/mapbox-gl.css';
import { BrowserRouter } from 'react-router-dom';
import { AdminAuthProvider } from './providers/AdminAuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AdminAuthProvider>
        <Provider store={store} >
          <App />
        </Provider>
      </AdminAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
