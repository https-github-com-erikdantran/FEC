import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import ProductGalleryListEntry from './ProductGalleryListEntry.jsx';
import ProductSelectSize from './ProductSelectSize.jsx';
import "react-image-gallery/styles/css/image-gallery.css";

const ProductGallery = (props) => {
  const [productGallery, setProductGallery] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [stylePrice, setStylePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');



  useEffect(() => {
    axios.get(`/api/products/${props.id}/styles`)
      .then(results => {
        setProductGallery(results.data);
        console.log('product results: ', results)
        if (props.id === 42367) {
          setImageList(sunglassImage)
          setStylePrice(results.data.results[0].original_price)
        } else {
          const imageListEntry = photoMapping(results.data.results[0].photos)
          setImageList(imageListEntry)
          setStylePrice(results.data.results[0].original_price)
        }
      })

    axios.get(`/api/products/${props.id}`)
      .then(results => {
        console.log('product overview results: ', results)
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

  const handleClickName = (e, imageList, stylePrice, salePrice) => {
    e.preventDefault();
    if (props.id === 42367) {
      setStylePrice(stylePrice)
      setSalePrice(salePrice)
      setImageList(sunglassImage)
    } else {
      setStylePrice(stylePrice)
      setSalePrice(salePrice)
      const imageListEntry = photoMapping(imageList)
      setImageList(imageListEntry)
      }
  }

  const sunglassImage = [{
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/'
  }]


  //console.log('imageList: ', imageList)

  return (
    <div>
      <div>
        reviews
      </div>
      <div>
        {props.productInfo.category}
      </div>
      <div>
        {props.productInfo.name}
      </div>
      <div>
        {salePrice ? '$' + salePrice + ' ' + '$' + stylePrice : '$' + stylePrice}
      </div>
      <div>
        <h4>Select Style</h4>
        <ul>
          {(productGallery.results || []).map((style, key) => {
            return <ProductGalleryListEntry key={style.style_id} style={style} handleClickName={handleClickName}/>
          })}
        </ul>
        <div>
          {productGallery ? <ImageGallery items={imageList} /> : null}
        </div>
      </div>
      <div>
        Select Size
        {(productGallery.results || []).map((style, key) => {
            return <ProductSelectSize key={style.style_id} style={style} />
          })}
      </div>
      <div>
        1
      </div>
      <div>
        add to bag
      </div>
      <div>
        favorite
      </div>
      <div>
      {props.productInfo.description}
      </div>
    </div>
  )
}

export default ProductGallery;