import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import App from './App';
import { GET_REPOSITORIES } from './repos/services/index';

const mockRes = [
  {
    request: {
      query: GET_REPOSITORIES,
      variables: { last: 10, search: 'in:public test' }
    },
    result: {
      data: {
        search: {
          nodes: [],
          pageInfo: {
            endCursor: null,
            startCursor: null
          },
          repositoryCount: 0
        }
      }
    }
  }
];

test('renders Header', () => {
  render(
    <MockedProvider mocks={mockRes}>
      <App />
    </MockedProvider>
  );
  const headerText = screen.getByText(/React Github Repositories/i);
  expect(headerText).toBeInTheDocument();
});
