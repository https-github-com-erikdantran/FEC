import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RelatedProductsList from '../RelatedProducts/RelatedProductsList.jsx';
import Reviews from '../Reviews/ReviewSection.jsx';
import ProductGallery from './ProductGallery.jsx';
import ClickTracker from '../ClickTracker.jsx';

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

  return (
    // keep this comment in, useful for changing pages on relted product click for later on
    // <div key={props.id}>
    <div>
      <h2>Product page</h2>
      {/* Main Product Info */}
      <ProductGallery id={props.id} productInfo={productInfo} addToCart={props.addToCart} />


      {/* Related Products */}
      <RelatedProductsList id={props.id} current={productInfo} setOutfit={props.handleOutfitChange} productChange={props.productChange} />


      {/* Q&A */}


      {/* Reviews */}
      <Reviews id={props.id || productInfo.id} name={productInfo.name} />
    </div>
  )
}

export default ProductPage;