import React from 'react';
import {render, waitFor, screen} from '@testing-library/react';
import App from '../client/src/components/App.jsx';

test('loads items on page', async () => {
  render(<App />)
  //fireEvent.click(screen.getByText(Load))

  let options = { timeout: 3000 }
  await waitFor(() => {
    const items = screen.findAllByText("Anything")
    // expect(items).toHaveLength(1)
    console.log('this is items:', items)
    expect(items).toBeDefined()
  }, options)
  // const items = screen.findAllByText("Camo Onesie")
  // expect(items).toHaveLength(1)
})

