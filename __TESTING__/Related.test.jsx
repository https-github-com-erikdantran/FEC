import React from 'react';
import { render, waitFor, screen, StateMock, fireEvent } from '@testing-library/react';
import RelatedProductsList from '../client/src/components/RelatedProducts/RelatedProductsList.jsx';
import InfoPopUp from '../client/src/components/RelatedProducts/InfoPopUp.jsx';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

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
  id: 42371,
  campus: 'hr-lax',
  name: 'Pumped Up Kicks',
  slogan: 'Faster than a just about anything',
  description: 'The Pumped Up serves up crisp court style with a modern look. These shoes show off tennis-whites shades and are constructed with a supple leather upper and a classic rubber cupsole.',
  category: 'Kicks',
  default_price: '89.00',
  created_at: '2021-08-13T14:39:39.968Z',
  updated_at: '2021-08-13T14:39:39.968Z',
  features: [
    { feature: 'Sole', value: 'Rubber' },
    { feature: 'Material', value: 'FullControlSkin' },
    { feature: 'Mid-Sole', value: 'ControlSupport Arch Bridge' },
    { feature: 'Stitching', value: 'Double Stitch' }
  ],
  thumbnail_url: 'https://images.unsplash.com/photo-1477420143023-6a0e0b04b69a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
  url: 'https://images.unsplash.com/photo-1477420143023-6a0e0b04b69a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
  product_id: '42371',
  ratings: {},
  recommended: {},
  characteristics: {
    Size: { id: 142049, value: null },
    Width: { id: 142050, value: null },
    Comfort: { id: 142051, value: null },
    Quality: { id: 142052, value: null }
  }
},
{
  id: 42368,
  campus: 'hr-lax',
  name: 'Morning Joggers',
  slogan: 'Make yourself a morning person',
  description: "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
  category: 'Pants',
  default_price: '40.00',
  created_at: '2021-08-13T14:39:39.968Z',
  updated_at: '2021-08-13T14:39:39.968Z',
  features: [
    { feature: 'Fabric', value: '100% Cotton' },
    { feature: 'Cut', value: 'Skinny' }
  ],
  thumbnail_url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80',
  url: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
  product_id: '42368',
  ratings: { '1': '1', '3': '6', '4': '1', '5': '2' },
  recommended: { false: '2', true: '8' },
  characteristics: {
    Fit: { id: 142037, value: '3.0000000000000000' },
    Length: { id: 142038, value: '2.4000000000000000' },
    Comfort: { id: 142039, value: '3.0000000000000000' },
    Quality: { id: 142040, value: '3.2000000000000000' }
  }
}]

let currentProductInfo = { "id": 42370, "campus": "hr-lax", "name": "Heir Force Ones", "slogan": "A sneaker dynasty", "description": "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl", "category": "Kicks", "default_price": "99.00", "created_at": "2021-08-13T14:39:39.968Z", "updated_at": "2021-08-13T14:39:39.968Z", "features": [{ "feature": "Sole", "value": "Rubber" }, { "feature": "Material", "value": "FullControlSkin" }, { "feature": "Mid-Sole", "value": "ControlSupport Arch Bridge" }, { "feature": "Stitching", "value": "Double Stitch" }] }

const server = setupServer(
  rest.get(`/api/products/:product_id/related`, (req, res, ctx) => {
    return res(ctx.json(relatedProductInfo))
  }),
  rest.post(`/api/products/outfit`, (req, res, ctx) => {
    return res(ctx.json(outfitInfo))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// const renderComponent = (info) =>
//   render(
//     <StateMock state={{ info }}>
//       <RelatedProductsList />
//     </StateMock>
//   );

// test('checks state of component', async () => {
//   renderComponent(currentProductInfo)

//   await waitFor(() => {
//     let items = screen.getByText('A sneaker dynasty')
//     expect(items).toBeInTheDocument()
//   })
// })

test('checks if info is rendered into related product carousel', async () => {
  render(<RelatedProductsList current={currentProductInfo}/>)
  await waitFor(() => {
    let items = screen.getByText('YEasy 350')
    expect(items).toBeInTheDocument()
  })
})

test('checks if info is rendered into related product carousel', async () => {
  render(<RelatedProductsList current={currentProductInfo}/>)
  await waitFor(() => {
    let items = screen.getByText('Morning Joggers')
    expect(items).toBeInTheDocument()
  })
})

test('checks if pop up activates when a related product is clicked', async () => {
  render(<RelatedProductsList current={currentProductInfo}/>)

  await waitFor(() => {
    userEvent.click(screen.getAllByText('Summer Shoes')[0])
    let items = screen.getAllByText('FullControlSkin')[0]
    expect(items).toBeInTheDocument()
  })
})


// Can't test this function since it relies on parent hooks, not sure how to test all in one component
test('checks if button adds current product into outfit carousel', async () => {
  render(<RelatedProductsList current={currentProductInfo}/>)
  fireEvent.click(screen.getByText('+'))

  await waitFor(() => {

    let items = screen.getByText('Heir Force Ones')
    expect(items).toBeInTheDocument()
  })
})