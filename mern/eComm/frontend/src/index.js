import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { AuthProvider } from './providers/authProvider';
import { store } from './store/store';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './apolloClient';
import { MapProvider } from "react-map-gl";
import { StripeProvider } from './providers/stripePaymentIntentProvider';

import 'mapbox-gl/dist/mapbox-gl.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient} >
      <AuthProvider>
        {/* <StripeProvider> */}
        <Provider store={store} >
          <MapProvider>
            <App />
          </MapProvider>
        </Provider>
        {/* </StripeProvider> */}
      </AuthProvider>
    </ApolloProvider>
  </React.StrictMode>
);

