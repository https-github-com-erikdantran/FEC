import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import CartItem from './CartItem.jsx';
import Typography from '@mui/material/Typography';

// class Cart extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       items: [
//         {
//           'id': 42670,
//           'name': 'Camo Onesie',
//           'style': 'Forest Green & Black',
//           'price': 140.00,
//           'size': 'M'
//         },
//         {
//           'id': 42670,
//           'name': 'Camo Onesie',
//           'style': 'Forest Green & Black',
//           'price': 100.00,
//           'size': 'L'
//         }
//       ]
//     }
//   }

//   render() {
//     console.log(this.state.items)
//     return (
//       <div>
//         <Box sx={{ width: 400, textAlign: "left", padding: '20px' }}>
//           {this.state.items.map((item, i) => (<CartItem key={i} info={item} />))}
//         </Box>
//       </div>
//     )
//   }
// }

// export default Cart;

// each cart item needs id, product name, style name, price, quantity, and size

const Cart = (props) => {
  let current = [
    {
      id: 42670,
      name: 'Camo Onesie',
      style: 'Forest Green & Black',
      price: 140.00,
      quantity: 1,
      size: 'M'
    },
    {
      id: 42670,
      name: 'Camo Onesie',
      style: 'Forest Green & Black',
      price: 100.99,
      quantity: 2,
      size: 'L'
    }
  ]

  const [items, updateItems] = useState(current)
  let total = 0;
  items.forEach(item => (total += item.price))

  return (
    <Typography component="div">
      <Box sx={{ width: 400, paddingLeft: '40px', paddingRight: '40px', paddingTop: '20px' }}>
        <h2>Your Cart</h2>
        {items.map((item, i) => (<CartItem key={i} info={item} />))}
        <h3>Total: ${total}</h3>
      </Box>
    </Typography>
  )
}

export default Cart;