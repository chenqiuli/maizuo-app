import React from 'react';
import { createRoot } from "react-dom/client";
import App from "./MyApp";
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  // Provider 把store通过context上下文传递给App组件，是所有组件都能拿到store的值
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

