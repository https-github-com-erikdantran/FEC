import React, { useState, useEffect } from 'react';

const RelatedProduct = (props) => {
  return (
    <div>
      <p>{props.info.category}</p>
      <div>{props.info.name}</div>
      <p>${props.info.default_price}</p>
      <p>Reviews here</p>
      {/* <div><img src={props.info.thumbnail_url}/></div> */}
    </div>
  )
}

export default RelatedProduct;