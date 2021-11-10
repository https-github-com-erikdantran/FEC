import React, { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';

const CartItem = (props) => {

  return (
    <React.Fragment>
      <div>
        <h4>({props.info.size}) {props.info.name} - {props.info.style}</h4>
        <div style={{'textAlign': 'right'}}>x{props.info.quantity}</div>
        <div style={{'textAlign': 'right'}}>${props.info.price}</div>
      </div>
      <Divider />
    </React.Fragment>
  )
}

export default CartItem;