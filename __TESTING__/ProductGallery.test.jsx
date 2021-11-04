import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../client/src/components/App.jsx';
import ProductGallery from '../client/src/components/Product-Overview/ProductGallery.jsx';
import ProductGalleryListEntry from '../client/src/components/Product-Overview/ProductGalleryListEntry.jsx';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';


const server = setupServer(
  rest.get(`/api/products/42370/styles`, (req, res, ctx) => {
    return res(ctx.json([{
      product_id: "42370",
      results: [
        {
          'default?': true,
          "name": "White & White",
          "original_price": "99.99",
          "photos": [],
          "sale_price": null,
          "skus": [],
          "style_id": 253645
        }
      ]
    }]))
  }),
)


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('loads style name on product name click', async () => {
  render(<App />)
  render(<ProductGallery />)
  render(<ProductGalleryListEntry />)

  await waitFor(() => {
    userEvent.click(screen.getByText('Heir Force Ones'))
    let items = screen.getByText('White & White');
    expect(items).toBeInTheDocument()
  })
})

// test('loads style name', async () => {
//   render(<ProductGalleryListEntry />)

//   await waitFor(() => {
//     let items = screen.getByText("White & White");
//     expect(items).toBeInTheDocument()
//   })
// })

