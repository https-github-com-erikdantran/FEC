import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RelatedProductsList from '../RelatedProducts/RelatedProductsList.jsx';
import Reviews from '../Reviews/ReviewSection.jsx';

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
        <h2>Product page</h2>
        {/* Main Product Info */}


        {/* Related Products */}
        <RelatedProductsList id={props.id}/>


        {/* Q&A */}


        {/* Reviews */}
        <Reviews id={props.id}/>

      </div>
    )
}

export default ProductPage;