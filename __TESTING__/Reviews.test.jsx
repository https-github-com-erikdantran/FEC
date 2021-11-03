import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Reviews from '../client/src/components/Reviews/ReviewSection.jsx';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

var reviewPage1 = {
  "product": "42366",
  "page": 0,
  "count": 4,
  "results": [
      {
          "review_id": 840809,
          "rating": 5,
          "summary": "dfsadfsdaf",
          "recommend": true,
          "response": null,
          "body": "dsafdsafsdaf",
          "date": "2021-09-14T00:00:00.000Z",
          "reviewer_name": "fake",
          "helpfulness": 0,
          "photos": []
      },
      {
          "review_id": 840812,
          "rating": 5,
          "summary": "still clothes",
          "recommend": true,
          "response": null,
          "body": "lalalala",
          "date": "2021-09-14T00:00:00.000Z",
          "reviewer_name": "dslakfjdlsakf",
          "helpfulness": 0,
          "photos": []
      },
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

var reviewPage2 = {
  "product": "42366",
  "page": 0,
  "count": 4,
  "results": [
      {
          "review_id": 841064,
          "rating": 5,
          "summary": "testing916",
          "recommend": true,
          "response": null,
          "body": "dslakjfsadjflkdsjf",
          "date": "2021-09-16T00:00:00.000Z",
          "reviewer_name": "testing916 sfa",
          "helpfulness": 2,
          "photos": []
      },
      {
          "review_id": 840808,
          "rating": 5,
          "summary": "i love this shirt",
          "recommend": true,
          "response": null,
          "body": "this shrit is so amazing its so sfot",
          "date": "2021-09-14T00:00:00.000Z",
          "reviewer_name": "bobby",
          "helpfulness": 0,
          "photos": []
      },
      {
          "review_id": 840807,
          "rating": 4,
          "summary": "this product has the consistency of sandpaper",
          "recommend": true,
          "response": null,
          "body": "I love sandpaper",
          "date": "2021-09-13T00:00:00.000Z",
          "reviewer_name": "sandpaperboy85",
          "helpfulness": 0,
          "photos": []
      },
      {
          "review_id": 840810,
          "rating": 5,
          "summary": "d",
          "recommend": true,
          "response": null,
          "body": "d",
          "date": "2021-09-14T00:00:00.000Z",
          "reviewer_name": "d",
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
    if (req.body.params.page === 2) {
      return res(ctx.json(reviewPage2))
    }
    return res(ctx.json(reviewPage1))
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
    let items = screen.getByText("dfsadfsdaf");
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
    expect(screen.getByTestId('stars')).toHaveStyle('width: 80%')
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

test('loads more reviews upon clicking the MORE REVIEWS button', async () => {
  render(<Reviews />)

  await waitFor(() => {
    userEvent.click(screen.getByText('MORE REVIEWS'))
    let items = screen.getByText('I\'m enjoying wearing these shades');
    expect(items).toBeInTheDocument()
  })
})

test('loads EVEN more reviews upon clicking the MORE REVIEWS button AGAIN', async () => {
  render(<Reviews />)

  await waitFor(() => {
    userEvent.click(screen.getByText('MORE REVIEWS'))
    userEvent.click(screen.getByText('MORE REVIEWS'))
    let items = screen.getByText('i love this shirt');
    expect(items).toBeInTheDocument()
  })
})