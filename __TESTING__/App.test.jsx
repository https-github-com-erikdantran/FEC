import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../client/src/components/App.jsx';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const server = setupServer(
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.json([{
      "id": 1,
      "name": "Camo Onesie",
      "slogan": "Blend in to your crowd",
      "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
      "category": "Jackets",
      "default_price": "140"
    }]))
  }),
)


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('loads items on page', async () => {
  render(<App />)

  await waitFor(() => {
    let items = screen.getByText("Camo Onesie");
    expect(items).toBeInTheDocument()
  })
})

test('loads product page on product name click', async () => {
  render(<App />)

  await waitFor(() => {
    userEvent.click(screen.getByText('Camo Onesie'))
    let items = screen.getByText('Product page');
    expect(items).toBeInTheDocument()
  })
})