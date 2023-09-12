import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { HelmetProvider } from 'react-helmet-async';

import store from './store/index';
import App from './App';

const persistor = persistStore(store);
// eslint-disable-next-line no-undef
const container = document.getElementById('app');
const root = createRoot(container);

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <App />
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </HelmetProvider>,
);
