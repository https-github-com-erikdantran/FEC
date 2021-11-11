import React from 'react';
import { render, waitFor, screen, cleanup, container } from '@testing-library/react';
import App from '../client/src/components/App.jsx';
import ProductGallery from '../client/src/components/Product-Overview/ProductGallery.jsx';
import ProductGalleryListEntry from '../client/src/components/Product-Overview/ProductGalleryListEntry.jsx';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ProductPage from '../client/src/components/Product-Overview/ProductPage.jsx';

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
            ],
          "skus": {
            "1471680": {
                "quantity": 14,
                "size": "7"
            },
        }
      }
  ]
}

var metaData = {
    "product_id": "42370",
    "ratings": {
        "1": "1",
        "2": "1",
        "3": "7",
        "4": "1",
        "5": "2"
    },
    "recommended": {
        "false": "6",
        "true": "6"
    },
    "characteristics": {
        "Size": {
            "id": 142045,
            "value": "2.6363636363636364"
        },
        "Width": {
            "id": 142046,
            "value": "2.2727272727272727"
        },
        "Comfort": {
            "id": 142047,
            "value": "3.7272727272727273"
        },
        "Quality": {
            "id": 142048,
            "value": "3.2727272727272727"
        }
    }
}


const server = setupServer(
  rest.get('/api/products/', (req, res, ctx) => {
    return res(ctx.json(productInfo))
  }),
  rest.get(`/api/products/:product_id/styles/`, (req, res, ctx) => {
    return res(ctx.json(productInfoStyle))
  }),
  rest.post(`/api/reviews/meta/`, (req, res, ctx) => {
    return res(ctx.json(metaData))
  }),
)


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('loads style name', async () => {
  render(<ProductGallery id={42370} productInfo={productInfo} />)

  await waitFor(() => {
    let items = screen.getByText('White & White');
    expect(items).toBeInTheDocument()
  })
})

test('loads default price', async () => {
  render(<ProductGallery id={42370} productInfo={productInfo}/>)

  await waitFor(() => {
    let items = screen.getByText('99.00', {exact: false});
    expect(items).toBeInTheDocument()
  })
})

test('loads category name', async () => {
  render(<ProductGallery id={42370} productInfo={productInfo}/>)

  await waitFor(() => {
    let items = screen.getByText('Kicks');
    expect(items).toBeInTheDocument()
  })
})

test('loads Read all reviews', async () => {
  render(<ProductGallery id={42370} productInfo={productInfo}/>)

  await waitFor(() => {
    let items = screen.getByText('Read all reviews');
    expect(items).toBeInTheDocument()
  })
})

test('loads Product Name Heir Force Ones', async () => {
  render(<ProductGallery id={42370} productInfo={productInfo}/>)

  await waitFor(() => {
    let items = screen.getByText('Heir Force Ones');
    expect(items).toBeInTheDocument()
  })
})

test('loads Product Description', async () => {
  render(<ProductGallery id={42370} productInfo={productInfo}/>)

  await waitFor(() => {
    let items = screen.getByText(`Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl`);
    expect(items).toBeInTheDocument()
  })
})

test('loads correct font-size for stars', async () => {
  render(<ProductGallery id={42370} productInfo={productInfo}/>)

  await waitFor(() => {
    expect(screen.getByTestId('stars')).toHaveStyle('font-size: 10pt')
  })
})

test('loads correct font-size for stars', async () => {
  render(<ProductGallery id={42370} productInfo={productInfo}/>)

  await waitFor(() => {
    expect(screen.getByTestId('starsWidth')).toHaveStyle('width: 64%')
  })
})




// test('select size and quantity', async () => {
//   render(<ProductGallery id={42370} productInfo={productInfo}/>)

//   await waitFor(() => {
//     userEvent.click(screen.getByTestId('testSize'))
//     userEvent.keyboard('{arrowdown}')
//     userEvent.keyboard('{enter}')
//     let items = screen.getByText('7.5');
//     expect(items).toBeInTheDocument()
//   })
// })




// test('select size and quantity', async () => {
//   render(<ProductGallery id={42370} productInfo={productInfo}/>)

//   await waitFor(() => {
//     userEvent.click(screen.getByTestId('testSize'))
//     expect(screen.getByLabelText('Select Size')).toBeChecked()
//   })
// })



