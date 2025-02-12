import { screen } from '@testing-library/react';

import Category from '../category.component';
import { renderWithProviders } from '../../../utils/test/test.utils';
import { useParams } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    category: 'mens',
  }),
}));

describe('Category tests', () => {
  test('It should render a Spinner if isLoading is true', () => {
    renderWithProviders(<Category />, {
      preloadedState: {
        categories: {
          isLoading: true,
          categories: [],
        },
      },
    });

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });
});
