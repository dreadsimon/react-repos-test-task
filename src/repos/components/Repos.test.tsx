import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Repos } from './Repos';
import {
  reposErrorMock,
  reposPagedResMock,
  reposResEmptyMock,
  reposResMock,
  reposResTestMock
} from '../../testing/repos-responses.mock';
import userEvent from '@testing-library/user-event';

test('User waits for data to be loaded', async () => {
  render(
    <MockedProvider mocks={reposResMock}>
      <Repos />
    </MockedProvider>
  );
  expect(await screen.findByTestId('loading-progress')).toBeInTheDocument();
});

test('When request fails', async () => {
  render(
    <MockedProvider mocks={[reposErrorMock]}>
      <Repos />
    </MockedProvider>
  );
  expect(await screen.findByText(/ERROR!/)).toBeInTheDocument();
});

test('User entering search phrase with search results (3)', async () => {
  render(
    <MockedProvider mocks={reposResMock}>
      <Repos />
    </MockedProvider>
  );
  const rows = await screen.findAllByRole('row');
  const cells = await screen.findAllByRole('cell');
  const text = await screen.findByText(/test3/);
  expect(text).toBeInTheDocument();
  expect(rows).toHaveLength(4);
  expect(cells).toHaveLength(9);
});

test('User can see pagination', async () => {
  render(
    <MockedProvider mocks={reposResMock}>
      <Repos />
    </MockedProvider>
  );
  const pag = await screen.findByTestId('table-pagination');
  const text = await screen.findByText(/1–3 of 3/i);
  expect(pag).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});

test('User sees information when there is no search results', async () => {
  render(
    <MockedProvider mocks={reposResEmptyMock}>
      <Repos />
    </MockedProvider>
  );

  const message = await screen.findByText(/No results for this Search Query./i);
  expect(message).toBeInTheDocument();
});

test('User sees results when entering search phrase', async () => {
  render(
    <MockedProvider mocks={reposResTestMock}>
      <Repos />
    </MockedProvider>
  );

  const input = await screen.findByLabelText(/search for/i);
  await userEvent.clear(input);
  await userEvent.type(input, 'test');
  const text = await screen.findByText(/test_repo/i);
  expect(text).toBeInTheDocument();
});

test('User change pagination page', async () => {
  render(
    <MockedProvider mocks={reposPagedResMock}>
      <Repos />
    </MockedProvider>
  );

  const button = await screen.findByLabelText(/Go to next page/i);
  await userEvent.click(button);
  const text = await screen.findByText(/11–20 of 20/i);
  expect(text).toBeInTheDocument();
});
