import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Elements } from "@stripe/react-stripe-js";

import App from "./App";
import { persistor, store } from "./store/store";
import { stripePromise } from "./utils/stripe/stripe.utils";

import "./index.scss";

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Elements stripe={stripePromise}>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </Elements>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);
