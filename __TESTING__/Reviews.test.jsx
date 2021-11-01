import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Reviews from '../client/src/components/Reviews/ReviewSection.jsx';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

var review = {
  "product": "42366",
  "page": 0,
  "count": 2,
  "results": [
      {
          "review_id": 820859,
          "rating": 3,
          "summary": "I'm enjoying wearing these shades",
          "recommend": true,
          "response": null,
          "body": "They are very dark. But that's good because I'm in very sunny spots",
          "date": "2021-09-10T00:00:00.000Z",
          "reviewer_name": "Drew",
          "helpfulness": 0,
          "photos": []
      },
      {
          "review_id": 780852,
          "rating": 4,
          "summary": "asdfsadfa",
          "recommend": false,
          "response": null,
          "body": "sadfsdfasfadsfassdafsagr4e2g24g24g24g24g24g24g24g24g24gsdfdsf",
          "date": "2021-08-17T00:00:00.000Z",
          "reviewer_name": "asdf",
          "helpfulness": 0,
          "photos": []
      }
  ]
}

var meta = {
  "product_id": "42366",
  "ratings": {
      "1": "3",
      "2": "3",
      "3": "15",
      "4": "12",
      "5": "20"
  },
  "recommended": {
      "false": "17",
      "true": "36"
  },
  "characteristics": {
      "Fit": {
          "id": 142032,
          "value": "2.4000000000000000"
      },
      "Length": {
          "id": 142033,
          "value": "2.5517241379310345"
      },
      "Comfort": {
          "id": 142034,
          "value": "3.1785714285714286"
      },
      "Quality": {
          "id": 142035,
          "value": "3.1071428571428571"
      }
  }
}


const server = setupServer(
  rest.post('/api/reviews/get', (req, res, ctx) => {
    return res(ctx.json(review))
  }),
  rest.post('/api/reviews/meta', (req, res, ctx) => {
    return res(ctx.json(meta))
  }),
)


beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('loads review on page', async () => {
  render(<Reviews />)

  await waitFor(() => {
    let items = screen.getByText("I'm enjoying wearing these shades");
    expect(items).toBeInTheDocument()
  })
})

test('loads metadata (review average) on page', async () => {
  render(<Reviews />)

  await waitFor(() => {
    let items = screen.getByText("3.8");
    expect(items).toBeInTheDocument()
  })
})

test('passes the correct width of stars to the star rating', async () => {
  render(<Reviews />)

  await waitFor(() => {
    expect(screen.getByTestId('stars')).toHaveStyle('width: 76%')
  })
})

test('renders the correct percentage of review recommendations', async () => {
  render(<Reviews />)

  await waitFor(() => {
    let items = screen.getByText("68% of reviews recommend this product");
    expect(items).toBeInTheDocument()
  })
})

test('displays product breakdown on page', async () => {
  render(<Reviews />)

  await waitFor(() => {
    let items = screen.getByText("Fit:");
    expect(items).toBeInTheDocument()
  })
})