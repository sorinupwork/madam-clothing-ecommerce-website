import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { legacy_createStore as configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';

import { rootReducer } from '../../store/root-reducer';

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    store = configureStore(rootReducer, preloadedState),
    ...renderOptions
  } = {}
) {
  const Wrapper = ({ children }) => {
    return (
      <Provider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </Provider>
    );
  };

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}
