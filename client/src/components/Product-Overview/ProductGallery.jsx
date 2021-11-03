import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import ProductGalleryListEntry from './ProductGalleryListEntry.jsx';
import "react-image-gallery/styles/css/image-gallery.css";

const ProductGallery = (props) => {
  const [productGallery, setProductGallery] = useState([]);
  const [styleName, setStyleName] = useState('');
  const [imageList, setImageList] = useState([]);


  useEffect(() => {
    axios.get(`/api/products/${props.id}/styles`)
      .then(results => {
        setProductGallery(results.data);
        console.log(results)
        const imageListEntry = photoMapping(results.data.results[0].photos)
        setImageList(imageListEntry)
      })
  }, []);

  const photoMapping = (photoList) => {
    const imageListEntry = [];
    photoList.map(item => {
      const singleImage = {original: item.url, thumbnail: item.thumbnail_url}
      imageListEntry.push(singleImage)
    })
    return imageListEntry
  }

  const handleClickName = (e, imageList) => {
    e.preventDefault();
    const imageListEntry = photoMapping(imageList)
    setImageList(imageListEntry)
  }

  console.log('imageList: ', imageList)

  return (
    <div>
      <div>
        <ul>
          {(productGallery.results || []).map((style, key) => {
            return <ProductGalleryListEntry key={style.style_id} style={style} handleClickName={handleClickName}/>
          })}
        </ul>
        <div>
          {productGallery ? <ImageGallery items={imageList} /> : null}
        </div>
      </div>
    </div>
  )
}

export default ProductGallery;