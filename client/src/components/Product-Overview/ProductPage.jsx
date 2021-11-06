import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RelatedProductsList from '../RelatedProducts/RelatedProductsList.jsx';
import Reviews from '../Reviews/ReviewSection.jsx';
import ProductGallery from './ProductGallery.jsx';

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

  const [outfit, setOutfit] = useState([42369, 42366]);
  const handleOutfitAdd = (command, id) => {
    if (command === 'add') { setOutfit([...outfit, id]); }
    if (command === 'remove') { console.log('top')
    setOutfit(outfit.filter(index => id !== index)) }
  }


  return(
      <div>
        <h2>Product page</h2>
        {/* Main Product Info */}
        <ProductGallery id={props.id}/>


        {/* Related Products */}
        <RelatedProductsList id={props.id} current={productInfo} outfit={outfit} setOutfit={handleOutfitAdd}/>


        {/* Q&A */}


        {/* Reviews */}
        <Reviews id={props.id || productInfo.id} name={productInfo.name}/>

      </div>
    )
}

export default ProductPage;