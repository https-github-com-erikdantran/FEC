import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Reviews from '../client/src/components/Reviews/Reviews.jsx';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

var reviews = {
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

const server = setupServer(
  rest.post('/api/reviews/get', (req, res, ctx) => {
    return res(ctx.json(reviews))
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

