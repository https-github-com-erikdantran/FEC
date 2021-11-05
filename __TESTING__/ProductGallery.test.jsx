import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../client/src/components/App.jsx';
import ProductGallery from '../client/src/components/Product-Overview/ProductGallery.jsx';
import ProductGalleryListEntry from '../client/src/components/Product-Overview/ProductGalleryListEntry.jsx';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

var productInfo = {
  "id": 42370,
  "name": "Heir Force Ones",
  "slogan": "A sneaker dynasty",
  "description": "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
  "category": "Kicks",
  "default_price": "140"
}

var productInfoStyle = {
  "product_id": "42370",
  "results": [
      {
          "style_id": 253645,
          "name": "White & White",
          "original_price": "99.00",
          "sale_price": null,
          "default?": true,
          "photos": [
              {
                  "thumbnail_url": "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                  "url": "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
              },
            ]
      }
  ]
}

const server = setupServer(
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.json([productInfo]))
  }),
  rest.get(`/api/products/:product_id/styles`, (req, res, ctx) => {
    return res(ctx.json(productInfoStyle))
  }),
)


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('loads style name', async () => {
  render(<ProductGallery />)

  await waitFor(() => {
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

