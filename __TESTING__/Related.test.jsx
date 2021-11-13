import React from 'react';
import { render, waitFor, screen, StateMock, fireEvent } from '@testing-library/react';
import RelatedProductsList from '../client/src/components/RelatedProducts/RelatedProductsList.jsx';
import App from '../client/src/components/App.jsx';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import OutfitContext from '../client/src/components/outfitContext';

let relatedProductInfo = [{
  id: 42374,
  campus: 'hr-lax',
  name: 'Summer Shoes',
  slogan: 'A risky call in the spring or fall',
  description: 'Low-top panelled buffed leather and mesh sneakers. Sizing embroidered in black at round toe. Tonal lace-up closure. Pull-loop and rubberized style name at padded tongue. Padded collar. Pull-loop at heel collar. Logo embroidered in black at outer side. Tonal treaded rubber sole. Tonal stitching.',
  category: 'Kicks',
  default_price: '59.00',
  created_at: '2021-08-13T14:39:39.968Z',
  updated_at: '2021-08-13T14:39:39.968Z',
  features: [
    { feature: 'Sole', value: 'Rubber' },
    { feature: 'Material', value: 'FullControlSkin' },
    { feature: 'Mid-Sole', value: 'ControlSupport Arch Bridge' },
    { feature: 'Stitching', value: 'Double Stitch' }
  ],
  thumbnail_url: 'https://images.unsplash.com/photo-1550338300-f9a475b50ba2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
  url: 'https://images.unsplash.com/photo-1550338300-f9a475b50ba2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1001&q=80',
  product_id: '42374',
  ratings: {},
  recommended: {},
  characteristics: {
    Size: { id: 142061, value: null },
    Width: { id: 142062, value: null },
    Comfort: { id: 142063, value: null },
    Quality: { id: 142064, value: null }
  }
},
{
  id: 42373,
  campus: 'hr-lax',
  name: 'YEasy 350',
  slogan: 'Just jumped over jumpman',
  description: 'These stretchy knit shoes show off asymmetrical lacing and a big sculpted rubber midsole. In a nod to adidas soccer heritage.',
  category: 'Kicks',
  default_price: '450.00',
  created_at: '2021-08-13T14:39:39.968Z',
  updated_at: '2021-08-13T14:39:39.968Z',
  features: [
    { feature: 'Sole', value: 'Rubber' },
    { feature: 'Material', value: 'FullControlSkin' },
    { feature: 'Stitching', value: 'Double Stitch' }
  ],
  thumbnail_url: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
  url: 'https://images.unsplash.com/photo-1551489186-cf8726f514f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  product_id: '42373',
  ratings: { '1': '1', '5': '2' },
  recommended: { true: '3' },
  characteristics: {
    Size: { id: 142057, value: null },
    Width: { id: 142058, value: null },
    Comfort: { id: 142059, value: null },
    Quality: { id: 142060, value: null }
  }
}]

let outfitInfo = [{
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
}]

let currentProductInfo = {
  "id": 42370,
  "campus": "hr-lax",
  "name": "Heir Force Ones",
  "slogan": "A sneaker dynasty",
  "description": "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
  "category": "Kicks",
  "default_price": "99.00",
  "created_at": "2021-08-13T14:39:39.968Z",
  "updated_at": "2021-08-13T14:39:39.968Z",
  "features": [{ "feature": "Sole", "value": "Rubber" }, { "feature": "Material", "value": "FullControlSkin" }, { "feature": "Mid-Sole", "value": "ControlSupport Arch Bridge" }, { "feature": "Stitching", "value": "Double Stitch" }]
}

let appStarterInfo = [{
  "id": 42370,
  "campus": "hr-lax",
  "name": "Heir Force Ones",
  "slogan": "A sneaker dynasty",
  "description": "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
  "category": "Kicks",
  "default_price": "99.00",
  "created_at": "2021-08-13T14:39:39.968Z",
  "updated_at": "2021-08-13T14:39:39.968Z"
}]

let currentFullInfo = {
  "id": 42370,
  "campus": "hr-lax",
  "name": "Heir Force Ones",
  "slogan": "A sneaker dynasty",
  "description": "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
  "category": "Kicks",
  "default_price": "99.00",
  "created_at": "2021-08-13T14:39:39.968Z",
  "updated_at": "2021-08-13T14:39:39.968Z",
  "features": [{ "feature": "Sole", "value": "Rubber" }, { "feature": "Material", "value": "FullControlSkin" }, { "feature": "Mid-Sole", "value": "ControlSupport Arch Bridge" }, { "feature": "Stitching", "value": "Double Stitch" }],
  "thumbnail_url": "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
  "url": "https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  "product_id": "42370",
  "ratings": { "1": "1", "2": "1", "3": "7", "4": "1", "5": "2" },
  "recommended": { "false": "6", "true": "6" },
  "characteristics": { "Size": { "id": 142045, "value": "2.7000000000000000" }, "Width": { "id": 142046, "value": "2.3000000000000000" }, "Comfort": { "id": 142047, "value": "3.7000000000000000" }, "Quality": { "id": 142048, "value": "3.3000000000000000" } }
}

const productChange = () => {
  console.log('hello')
}

const server = setupServer(
  rest.get(`/api/products/:product_id/related`, (req, res, ctx) => {
    return res(ctx.json(relatedProductInfo))
  }),
  rest.post(`/api/products/outfit`, (req, res, ctx) => {
    return res(ctx.json(outfitInfo))
  }),
  rest.get('/api/products', (req, res, ctx) => {
    return res(ctx.json(appStarterInfo))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('checks if info is rendered into related product carousel', async () => {
  render(<RelatedProductsList current={currentProductInfo} />)
  await waitFor(() => {
    let items = screen.getByText('YEasy 350')
    expect(items).toBeInTheDocument()
  })
})

test('checks if info is rendered into your outfits carousel', async () => {
  render(
    <OutfitContext.Provider value={outfitInfo}>
      <RelatedProductsList current={currentProductInfo} />
    </OutfitContext.Provider>)

  await waitFor(() => {
    let items = screen.getByText('Camo Onesie')
    expect(items).toBeInTheDocument()
  })
})

test('checks if pop up activates when a related product is clicked', async () => {
  render(<RelatedProductsList current={currentProductInfo} productChange={productChange}/>)
  await waitFor(() => {
    userEvent.click(screen.getAllByLabelText('comparison')[0])
    let items = screen.getAllByText('FullControlSkin')[0]
    expect(items).toBeInTheDocument()
  })
})

// Hard to test this since it relies on functions passed down from App
// test('checks if button adds current product into outfit carousel', async () => {
//   render(<RelatedProductsList current={currentProductInfo} />)
//   await waitFor(() => {
//     userEvent.click(screen.getByLabelText('addToOutfit'))
//     let newItems = screen.getByText('Heir Force Ones')
//     expect(newItems).toBeInTheDocument()
//   })
// })