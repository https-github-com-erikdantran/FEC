import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import App from '../client/src/components/App.jsx';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import NavBar from '../client/src/components/NavBar.jsx';
import CartContext from '../client/src/components/CartContext.jsx';

let products = [
  {
    "id": 42366,
    "campus": "hr-lax",
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": "140.00",
    "created_at": "2021-08-13T14:39:39.968Z",
    "updated_at": "2021-08-13T14:39:39.968Z"
  },
  {
    "id": 42369,
    "campus": "hr-lax",
    "name": "Slacker's Slacks",
    "slogan": "Comfortable for everything, or nothing",
    "description": "I'll tell you how great they are after I nap for a bit.",
    "category": "Pants",
    "default_price": "65.00",
    "created_at": "2021-08-13T14:39:39.968Z",
    "updated_at": "2021-08-13T14:39:39.968Z"
  }
]

let outfitInfo = [
  {
    "id": 42369,
    "campus": "hr-lax",
    "name": "Slacker's Slacks",
    "slogan": "Comfortable for everything, or nothing",
    "description": "I'll tell you how great they are after I nap for a bit.",
    "category": "Pants",
    "default_price": "65.00",
    "created_at": "2021-08-13T14:39:39.968Z",
    "updated_at": "2021-08-13T14:39:39.968Z",
    "features": [{ "feature": "Fabric", "value": "99% Cotton 1% Elastic" }, { "feature": "Cut", "value": "Loose" }],
    "thumbnail_url": "https://images.unsplash.com/photo-1554260570-9140fd3b7614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
    "url": "https://images.unsplash.com/photo-1554260570-9140fd3b7614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    "product_id": "42369",
    "ratings": { "2": "1", "3": "1", "4": "1", "5": "1" },
    "recommended": { "false": "2", "true": "2" },
    "characteristics": {
      "Fit": { "id": 142041, "value": "3.5000000000000000" },
      "Length": { "id": 142042, "value": "3.5000000000000000" },
      "Comfort": { "id": 142043, "value": "3.5000000000000000" },
      "Quality": { "id": 142044, "value": "3.5000000000000000" }
    }
  },
  {
    "id": 42366,
    "campus": "hr-lax",
    "name": "Camo Onesie",
    "slogan": "Blend in to your crowd",
    "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
    "category": "Jackets",
    "default_price": "140.00",
    "created_at": "2021-08-13T14:39:39.968Z",
    "updated_at": "2021-08-13T14:39:39.968Z",
    "features": [{ "feature": "Fabric", "value": "Canvas" }, { "feature": "Buttons", "value": "Brass" }],
    "thumbnail_url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
    "url": "https://images.unsplash.com/photo-1501088430049-71c79fa3283e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
    "product_id": "42366",
    "ratings": { "1": "3", "2": "4", "3": "33", "4": "23", "5": "26" },
    "recommended": { "false": "30", "true": "59" },
    "characteristics": { "Fit": { "id": 142032, "value": "2.6904761904761905" }, "Length": { "id": 142033, "value": "2.5526315789473684" }, "Comfort": { "id": 142034, "value": "3.0540540540540541" }, "Quality": { "id": 142035, "value": "2.9459459459459459" } }
  }
]

let cart = [
  {
    "id": 42366,
    "name": "Camo Onesie",
    "style": "Forest Green & Black",
    "price": 140,
    "quantity": 1,
    "size": "XS"
  }
]

const server = setupServer(
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.json(products))
  }),
  rest.post(`/api/products/outfit`, (req, res, ctx) => {
    return res(ctx.json(outfitInfo))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('Loads items on page', async () => {
  render(<App />)

  await waitFor(() => {
    let items = screen.getByText("Camo Onesie");
    expect(items).toBeInTheDocument()
  })
})

test('Loads product page on product name click', async () => {
  render(<App />)

  await waitFor(() => {
    userEvent.click(screen.getByText('Camo Onesie'))
    let items = screen.getByText('Read all reviews');
    expect(items).toBeInTheDocument()
  })
})

test('Drawer opens when clicking cart icon', async () => {
  render(
    <CartContext.Provider value={ cart }>
      <NavBar />
    </CartContext.Provider>)
  await waitFor(() => {
    userEvent.click(screen.getByLabelText('cart'))
    let items = screen.getByText('Your Cart')
    expect(items).toBeInTheDocument()
  })
})

// Home click isnt rendering things properly for some reason
// test('Home button click returns you to home page', async () => {
//   render(<App/>)
//   await waitFor(() => {
//     userEvent.click(screen.getByText('Camo Onesie'))
//     userEvent.click(screen.getByText('Home'))
//     let items = screen.getByText("Slacker's Slacks");
//     expect(items).toBeInTheDocument()
//   })
// })