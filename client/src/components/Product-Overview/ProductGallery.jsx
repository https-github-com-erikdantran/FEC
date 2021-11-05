import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageGallery from 'react-image-gallery';
import ProductGalleryListEntry from './ProductGalleryListEntry.jsx';
import "react-image-gallery/styles/css/image-gallery.css";

const ProductGallery = (props) => {
  const [productGallery, setProductGallery] = useState([]);
  const [imageList, setImageList] = useState([]);


  useEffect(() => {
    axios.get(`/api/products/${props.id}/styles`)
      .then(results => {
        setProductGallery(results.data);
        if (props.id === 42367) {
          setImageList(sunglassImage)
        } else {
          const imageListEntry = photoMapping(results.data.results[0].photos)
          setImageList(imageListEntry)
        }
      })

    // axios.get(`/api/products/${props.id}`)
    //   .then(results => {
    //     console.log('all results: ', results)
    //   })
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
    if (props.id === 42367) {
      setImageList(sunglassImage)
    } else {
      const imageListEntry = photoMapping(imageList)
      setImageList(imageListEntry)
      }
  }

  const sunglassImage = [{
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/'
  }]



  return (
    <div>
      <div>
        reviews
      </div>
      <div>
        category
      </div>
      <div>
        product name
      </div>
      <div>
        product price
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
        select size
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
    </div>
  )
}

export default ProductGallery;