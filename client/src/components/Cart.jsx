import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/material/Box';
import CartItem from './CartItem.jsx';
import Typography from '@mui/material/Typography';
import CartContext from './CartContext.jsx';

const Cart = (props) => {
  const items = useContext(CartContext);

  let total = 0;
  items.forEach(item => {
    total += item.price})

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