import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Reviews from '../Reviews/Reviews.jsx';

function ProductPage(props) {
  const [productInfo, setProductInfo] = useState({})

  // the empty array below allows this useEffect to only be ran once
  useEffect(() => {
    getProductInfo(props.id)
  }, [])


  let getProductInfo = function (id) {
    axios.get(`/api/products/${id}`)
      .then(results => {
        setProductInfo(results.data)
      })
  }

  return(
      <div>
        product page
        {/* Main Product Info */}


        {/* Related Products */}


        {/* Q&A */}


        {/* Reviews */}
        <Reviews id={props.id}/>

      </div>
    )
}

export default ProductPage;